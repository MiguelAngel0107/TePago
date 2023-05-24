from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from social_django.utils import psa

from django.http import HttpResponse
import requests


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
    response = """<html>
<head>
    <title>Mensaje de activación de cuenta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
            margin: 0;
            padding: 40px;
        }
        
        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        p {
            color: #666666;
            font-size: 18px;
        }
        
        .message-box {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
        
        .close-message {
            color: #999999;
            font-size: 14px;
            margin-top: 20px;
        }
        
        .close-message:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
    <script>
        function closeWindow() {
            console.log("Hola")
            window.close();
        }
    </script>
</head>
<body>
    <div class="message-box">
        <h1>Regresa a tu app</h1>
        <p>Se activo tu cuenta satisfactoriamente</p>
        <p class="close-message" onclick="closeWindow()">Puede cerrar esta ventana</p>
    </div>
</body>
</html>"""
    responseError = """<html>
<head>
    <title>Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            text-align: center;
            margin: 0;
            padding: 40px;
        }
        
        h1 {
            color: #ff0000;
            font-size: 24px;
            margin-bottom: 20px;
        }
        
        p {
            color: #333333;
            font-size: 18px;
        }
        
        .error-box {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="error-box">
        <h1>Error</h1>
        <p>Se ha producido un error en la aplicacion.</p>
    </div>
</body>
</html>""" 
    
    try:
        url = "http://localhost:8000/auth/users/activation/"
        data = {
            "uid": uid,
            "token": token
        }
        res = requests.post(url, data=data)
        if res.status_code == 200:
            pass
        else:
            return HttpResponse(responseError, content_type="text/html")
    except:
        return HttpResponse(responseError, content_type="text/html")


    return HttpResponse(response, content_type="text/html")
