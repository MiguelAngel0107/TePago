from django.urls import path
from .views import ListCategoriesView, CreateCategory, DeleteCategory

urlpatterns = [
    path('categories-view/', ListCategoriesView.as_view()),
    path('categories-create/', CreateCategory.as_view()),
    path('categories-delete/', DeleteCategory.as_view()),
    
]