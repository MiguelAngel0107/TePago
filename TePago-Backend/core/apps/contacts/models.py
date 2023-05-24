from django.db import models
from django.contrib.auth import get_user_model 
User = get_user_model()

def user_directory_path(instance, fielname):
    return 'users/photoContact/{}'.format(fielname)


class Contacto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    image = models.ManyToManyField('Image', blank=True, related_name='blog_post_images')

class Deuda(models.Model):
    contacto = models.ForeignKey(Contacto, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=7, decimal_places=2)
    fecha = models.DateField()
    descripcion = models.TextField()

class Image(models.Model):
    image = models.ImageField(upload_to=user_directory_path, blank=True, null=True)