from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant, RestaurantImage
from restaurants.serializers.addRestaurantAvatar import AddRestaurantAvatarSerializer


class AddRestaurantAvatar(CreateAPIView):
    serializer_class = AddRestaurantAvatarSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        try:
            Restaurant.objects.get(owner=self.request.user)
            return super().post(request, *args, **kwargs)
        except Restaurant.DoesNotExist:
            raise APIException("You don't have a restaurant yet")
