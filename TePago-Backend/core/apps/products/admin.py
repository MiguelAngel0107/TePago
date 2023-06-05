from django.contrib import admin
from .models import Category, Product


class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
    )
    list_display_links = (
        'id',
        'name',
    )
    search_fields = (
        'name',
    )
    list_per_page = 25


admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category',
                    'price', 'sold', )
    list_display_links = ('id', 'name', )
    list_filter = ('category', )
    list_editable = ('price',)
    search_fields = ('name', 'description', )
    list_per_page = 25


admin.site.register(Product, ProductAdmin)
