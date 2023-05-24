from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from social_django.utils import psa

from django.http import HttpResponse

class GoogleAuthAPIView(APIView):
    @psa()
    def post(self, request):
        backend = request.data.get('backend', 'google')
        strategy = request.backend.strategy
        token = request.data.get('access_token')

        try:
            user = request.backend.do_auth(token)
            if user:
                strategy.session_set('auth_user_id', user.id)
                strategy.session_set('auth_user_backend', user.backend)

                return Response({'detail': 'Autenticación exitosa.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': 'Error al autenticar con Google.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Error al autenticar con Google.'}, status=status.HTTP_400_BAD_REQUEST)


def ActivateAccount(request, uid, token):
    # Realiza las operaciones que desees con las cadenas de texto
    response = f"Parámetros recibidos: {uid}, {token}"
    return HttpResponse(response)
