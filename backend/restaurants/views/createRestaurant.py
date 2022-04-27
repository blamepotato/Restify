from django.core.exceptions import BadRequest
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant
from restaurants.serializers.createRestaurant import CreateRestaurantSerializer


class CreateRestaurant(CreateAPIView):
    serializer_class = CreateRestaurantSerializer
    permission_class = [IsAuthenticated]
    queryset = Restaurant.objects.all()

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        # https://stackoverflow.com/questions/3090302/how-do-i-get-the-object-if-it-exists-or-none-if-it-does-not-exist-in-django
        try:
            Restaurant.objects.get(owner=self.request.user)
            raise BadRequest("You already has a restaurant")
        except Restaurant.DoesNotExist:
            return super().post(request, *args, **kwargs)
