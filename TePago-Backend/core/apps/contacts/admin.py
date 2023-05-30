from django.contrib import admin
from .models import Contacto, Deuda, Image


class ContactoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'telefono',
                    'direccion', 'correo_electronico']

class DeudaAdmin(admin.ModelAdmin):
    list_display = ['id', 'contacto', 'monto', 'date_created', 'estado']


admin.site.register(Contacto, ContactoAdmin)
admin.site.register(Deuda, DeudaAdmin)
admin.site.register(Image)
