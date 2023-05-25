from django.urls import path
from .views import ListCategoriesView, CreateCategory, DeleteCategory, ProductCreateView, ListProductsView, ListSearchView, DeleteProduct, ProductUpdateAPIView

urlpatterns = [
    path('categories-view/', ListCategoriesView.as_view()),
    path('category-create/', CreateCategory.as_view()),
    path('category-delete/<int:category_id>/', DeleteCategory.as_view()),


    path('products-view/', ListProductsView.as_view()),
    path('product-create/', ProductCreateView.as_view()),
    path('products-search/', ListSearchView.as_view()),
    path('products-delete/<int:product_id>/', DeleteProduct.as_view()),
    path('products-update/', ProductUpdateAPIView.as_view()),
]
