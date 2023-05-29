from django.urls import path
from .views import ContactoCreateAPIView, ContactoUpdateAPIView, ContactoDetailAPIView, ContactoDeleteAPIView, DeudaListAPIView, DeudaCreateAPIView, DeudaUpdateAPIView

urlpatterns = [
    path('contact-views/', ContactoDetailAPIView.as_view()),
    path('contact-create/', ContactoCreateAPIView.as_view()),
    path('contact-delete/<int:pk>/', ContactoDeleteAPIView.as_view()),
    path('contact-update/<int:pk>/', ContactoUpdateAPIView.as_view()),

    path('deuda-views/', DeudaListAPIView.as_view()),
    path('deuda-create/', DeudaCreateAPIView.as_view()),
    path('deuda-update/<int:pk>/', DeudaUpdateAPIView.as_view()),

]
