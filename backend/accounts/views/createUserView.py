from rest_framework.generics import CreateAPIView

from accounts.models import User
from accounts.serializers.userSerializer import CreateUserSerializer


class CreateUserView(CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()