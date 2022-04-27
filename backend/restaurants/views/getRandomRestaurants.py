from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from restaurants.models import Food, Restaurant
from restaurants.serializers.getRandomRestaurants import \
    GetRandomRestaurantsSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'


class GetRandomRestaurants(ListAPIView):
    model = Restaurant
    serializer_class = GetRandomRestaurantsSerializer
    queryset = Restaurant.objects.all()
    pagination_class = OnePagesPagination

    def get(self, request, *args, **kwargs):
        rests = Restaurant.objects.all().order_by('?')
        serializer = GetRandomRestaurantsSerializer(rests, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)
