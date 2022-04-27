from rest_framework.generics import RetrieveAPIView, get_object_or_404

from restaurants.models import Restaurant
from restaurants.serializers.getRestaurant import GetRestaurantSerializer


class GetRestaurant(RetrieveAPIView):
    serializer_class = GetRestaurantSerializer

    def get_object(self):
        return get_object_or_404(Restaurant, restaurant_name=self.kwargs['restaurant_name'])
