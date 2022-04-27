from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import UpdateAPIView, get_object_or_404, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated


from restaurants.models import Restaurant
from restaurants.serializers.updateRestaurant import UpdateRestaurantSerializer


class UpdateRestaurant(RetrieveAPIView, UpdateAPIView):
    serializer_class = UpdateRestaurantSerializer
    permission_class = [IsAuthenticated]

    def get_object(self):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        return get_object_or_404(Restaurant, owner=self.request.user)

