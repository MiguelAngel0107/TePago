from django.db import models
from datetime import datetime
from django.contrib.auth import get_user_model 
User = get_user_model()

def user_directory_path(instance, fielname):
    return 'users/photoContact/{}'.format(fielname)


class Contacto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    
    ## Datos Opcionales
    direccion = models.CharField(max_length=400, blank=True, null=True)
    image = models.OneToOneField('Image', blank=True, null=True, on_delete=models.SET_NULL, related_name='contacto')
    correo_electronico = models.EmailField(blank=True, null=True)
    fecha_cumpleanos = models.DateField(blank=True, null=True)
    redes_sociales = models.CharField(max_length=200, blank=True, null=True)
    notas = models.TextField(blank=True, null=True)
    

class Deuda(models.Model):
    PENDIENTE = 'pendiente'
    PAGADA = 'pagada'
    CANCELADA = 'cancelada'
    
    ESTADO_CHOICES = [
        (PENDIENTE, 'Pendiente'),
        (PAGADA, 'Pagada'),
        (CANCELADA, 'Cancelada'),
    ]

    contacto = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=7, decimal_places=2)
    date_created = models.DateTimeField(default=datetime.now)
    estado = models.CharField(max_length=100, choices=ESTADO_CHOICES, default=PENDIENTE)

    ## Datos Opcionales
    descripcion = models.TextField(null=True, blank=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)

class Image(models.Model):
    image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)