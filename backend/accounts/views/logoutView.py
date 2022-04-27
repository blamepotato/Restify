from django.contrib.auth import logout
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class LogoutView(GenericAPIView):
    permission_class = [IsAuthenticated,]

    def post(self, request):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        request.user.auth_token.delete()
        logout(request)
        return Response('User Logged out successfully')
