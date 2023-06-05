from rest_framework import serializers
from .models import Contacto, Deuda

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'

class DeudaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deuda
        fields = '__all__'