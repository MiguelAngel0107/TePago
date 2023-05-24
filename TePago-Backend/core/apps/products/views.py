from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Category



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
        category = Category.objects.filter(id=category_id, seller=request.user).first()
        if category:
            category.delete()
            return Response({'message': 'Category deleted successfully.'})
        return Response({'message': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)
