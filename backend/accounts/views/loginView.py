from django.contrib.auth import login, authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import User
from accounts.serializers.userSerializer import LoginSerializer


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        if 'username' not in request.data:
            return Response('Username is Required', status.HTTP_400_BAD_REQUEST)
        if 'password' not in request.data:
            return Response('Password is Required', status.HTTP_400_BAD_REQUEST)
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if not user:
            message = "Wrong username or password"
            return Response(message)
        token = Token.objects.get_or_create(user=user)
        if token:
            login(request, user)

            restaurant_name = "" if not hasattr(user, 'restaurant') else user.restaurant.restaurant_name
            json = {"token": token[0].key, "username": username, "restaurant": restaurant_name}
            return Response(json, status=status.HTTP_200_OK)
