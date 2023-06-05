from django.shortcuts import render, get_object_or_404
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.products.models import Product, Category
from apps.products.serializers import ProductSerializer

from django.db.models import Q
from django.core.files.storage import default_storage


class ListCategoriesView(APIView):
    def get(self, request, format=None):
        seller = request.user
        categories = Category.objects.filter(seller=seller, parent=None)
        if categories.exists():
            result = []
            for category in categories:
                item = {}
                item['id'] = category.id
                item['name'] = category.name
                result.append(item)
            return Response({'categories': result}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No categories found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateCategory(APIView):
    def post(self, request):
        name = request.data.get('name')
        seller = request.user

        category = Category.objects.create(name=name, seller=seller)
        return Response({'message': 'Category created successfully.'}, status=status.HTTP_201_CREATED)


class DeleteCategory(APIView):
    def delete(self, request, category_id):
        category = Category.objects.filter(
            id=category_id, seller=request.user).first()
        if category:
            category.delete()
            return Response({'message': 'Category deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)


class ProductCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            name = data.get('name')
            photoFiles = request.FILES['photo']
            description = data.get('description')
            price = data.get('price')
            category_id = data.get('category')
        except:
            return Response({"Error": "Falta Datos"}, status=status.HTTP_404_NOT_FOUND)

        try:
            category = Category.objects.get(id=category_id)
        except:
            return Response({"Error": "Falta Datos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            Product.objects.create(
                name=name,
                photo=photoFiles,
                description=description,
                price=price,
                category=category,
                seller=user,
            )
            return Response({"Success": "Instancia Creada"}, status=status.HTTP_201_CREATED)
        except:
            return Response({"Error": "No se guardo correctamente la instancia"}, status=status.HTTP_400_BAD_REQUEST)


class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        try:
            sortBy = request.query_params.get('sortBy')
            if not (sortBy == 'date_created' or sortBy == 'prince' or sortBy == 'sold' or sortBy == 'name'):
                sortBy = 'date_created'
            order = request.query_params.get('order')
            limit = request.query_params.get('limit')

            if not limit:
                limit = 6
            try:
                limit = int(limit)
            except:
                return Response(
                    {'error': 'Limit must be an integer'},
                    status=status.HTTP_404_NOT_FOUND)

            if limit <= 0:
                limit = 6

            if order == 'desc':
                sortBy = '-' + sortBy
                # products = Product.objects.order_by(sortBy).all()[:int(limit)]
                products = Product.objects.filter(
                    seller=request.user).order_by(sortBy)[:limit]
            elif order == 'asc':
                # products = Product.objects.order_by(sortBy).all()[:int(limit)]
                products = Product.objects.filter(
                    seller=request.user).order_by(sortBy)[:limit]
            else:
                # products = Product.objects.order_by(sortBy).all()[:int(limit)]
                products = Product.objects.filter(
                    seller=request.user).order_by(sortBy)[:limit]

            products = ProductSerializer(products, many=True)

            return Response({'products': products}, status=status.HTTP_200_OK)

        except:
            return Response(
                {'error': 'No products to list'},
                status=status.HTTP_404_NOT_FOUND
            )


class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        search = data['search']

        if len(search) == 0:
            search_result = Product.objects.order_by('-date_created').all()
        else:
            search_result = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search))

        if category_id == 0:
            search_result = ProductSerializer(search_result, many=True)
            return Response(
                {'search_products': search_result.data},
                status=status.HTTP_200_OK)

        # Revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        category = Category.objects.get(id=category_id)

        if category:
            search_result = search_result.order_by(
                '-date_created').filter(category=category)

        search_result = ProductSerializer(search_result, many=True)
        return Response({'search_products': search_result.data}, status=status.HTTP_200_OK)


class DeleteProduct(APIView):
    def delete(self, request, product_id):
        product = Product.objects.filter(
            id=product_id, seller=request.user).first()
        if product:
            product.delete()
            return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'message': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)


class ProductUpdateAPIView(APIView):
    def put(self, request):

        try:
            user = self.request.user
            data = self.request.data

            id_product = data.get('id_product')

            name = data.get('name')
            description = data.get('description')
            price = data.get('price')
            category = data.get('category')
        except:
            return Response(
                {'error': 'Falta archivos'},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            product = Product.objects.filter(id=id_product, seller=user)
            try:

                if name != "":
                    product.name = name

                if description != "":
                    product.description = description

                if price != "":
                    product.price = price

                if category != "":
                    product.category = category

                try:
                    # Actualizar imagen de product
                    photo = request.FILES.get('photo')
                    if photo:
                        if product.photo:
                            default_storage.delete(photo.picture.path)

                        product.photo = photo

                    product.save()
                except:
                    return Response(
                        {'error': 'Esta mal las Imagens Error'},
                        status=status.HTTP_402_PAYMENT_REQUIRED
                    )

            except:
                return Response(
                    {'error': 'Something went wrong when updating profile'},
                    status=status.HTTP_507_INSUFFICIENT_STORAGE
                )

            #user_profile_serializer = UserProfileSerializer(user)
            #user_profile_data = user_profile_serializer.data

            return Response({"message": "Product updated successfully."}, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
