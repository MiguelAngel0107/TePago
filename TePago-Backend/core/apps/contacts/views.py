from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Contacto, Deuda
from .serializers import ContactoSerializer, DeudaSerializer
from rest_framework import status


class ContactoCreateAPIView(APIView):
    def post(self, request):
        try:
            nombre = request.data.get('name')
            telefono = request.data.get('telefono')
            direccion = request.data.get('direccion', None)
            print(request.data)
            Contacto.objects.create(
                usuario=request.user, nombre=nombre, telefono=telefono)

            return Response({"message": "Contacto creado exitosamente."}, status=status.HTTP_201_CREATED)
        except:
            return Response({'error': ''}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContactoUpdateAPIView(APIView):
    def put(self, request):    
        pk = request.data.get('id_contacto')
        contacto = get_object_or_404(Contacto, pk=pk, usuario=request.user)
        serializer = ContactoSerializer(contacto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=400)


class ContactoDetailAPIView(APIView):
    def get(self, request):
        contactos = Contacto.objects.filter(usuario=request.user)
        serializer = ContactoSerializer(contactos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactoDeleteAPIView(APIView):
    def delete(self, request):
        pk = request.data.get('id_contacto')
        contacto = get_object_or_404(Contacto, pk=pk, usuario=request.user)
        contacto.delete()
        return Response({"message": "Contacto deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class DeudaListAPIView(APIView):
    def post(self, request):
        id_contact = request.data.get('id_contact')
        deudas = Deuda.objects.filter(contacto=id_contact)
        serializer = DeudaSerializer(deudas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeudaCreateAPIView(APIView):
    def post(self, request):
        id_contact = request.data.get('id_contact')

        contacto = get_object_or_404(
            Contacto, pk=id_contact, usuario=request.user)

        monto = request.data.get('monto')
        fecha = request.data.get('fecha')
        descripcion = request.data.get('descripcion')

        deuda = Deuda(contacto=contacto, monto=monto,
                      fecha=fecha, descripcion=descripcion)
        deuda.save()

        return Response({"message": "Deuda creada exitosamente."}, status=status.HTTP_201_CREATED)


class DeudaUpdateAPIView(APIView):
    def put(self, request, contacto_pk, deuda_pk):
        contacto = get_object_or_404(
            Contacto, pk=contacto_pk, usuario=request.user)
        deuda = get_object_or_404(Deuda, pk=deuda_pk, contacto=contacto)

        monto = request.data.get('monto', deuda.monto)
        fecha = request.data.get('fecha', deuda.fecha)
        descripcion = request.data.get('descripcion', deuda.descripcion)

        deuda.monto = monto
        deuda.fecha = fecha
        deuda.descripcion = descripcion
        deuda.save()

        return Response({"message": "Deuda actualizada exitosamente."})
