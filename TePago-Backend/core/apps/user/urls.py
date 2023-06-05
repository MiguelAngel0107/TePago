from django.urls import path
from .views import GoogleAuthAPIView, ActivateAccount

urlpatterns = [
    path('google-auth/', GoogleAuthAPIView.as_view(), name='google-auth'),
    path('activate/<str:uid>/<str:token>/', ActivateAccount)
]
