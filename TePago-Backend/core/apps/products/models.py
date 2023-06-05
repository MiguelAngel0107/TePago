from django.db import models
from datetime import datetime
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()


class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(
        max_length=255,
    )
    
    def __str__(self):
        return self.name


class Product(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/%Y/%m/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name
