from django.urls import path
from .views import GoogleAuthAPIView

urlpatterns = [
    path('google-auth/', GoogleAuthAPIView.as_view(), name='google-auth'),
]
