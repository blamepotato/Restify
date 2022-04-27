
from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, get_object_or_404

from accounts.models import User
from accounts.serializers.userSerializer import UserSerializer


class GetUserView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(User, username=self.kwargs['username'])