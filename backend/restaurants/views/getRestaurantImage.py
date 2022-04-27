from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination

from restaurants.models import RestaurantImage, Restaurant
from restaurants.serializers.getRestaurantImage import \
    GetRestaurantImageSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class GetRestaurantImageView(ListAPIView):
    model = RestaurantImage
    serializer_class = GetRestaurantImageSerializer
    queryset = RestaurantImage.objects
    #pagination_class = OnePagesPagination

    # def get(self, request, *args, **kwargs):
    #     images = RestaurantImage.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"]))
    #     serializer = GetRestaurantImageSerializer(images, many=True)
    #     page = self.paginate_queryset(serializer.data)
    #     return self.get_paginated_response(page)

    def get_queryset(self):
        self.queryset = RestaurantImage.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"]))
        return self.queryset
