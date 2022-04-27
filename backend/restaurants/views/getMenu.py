from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from restaurants.models import Food, Restaurant
from restaurants.serializers.getMenu import GetMenuSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class GetMenu(ListAPIView):
    model = Food
    serializer_class = GetMenuSerializer
    queryset = Food.objects.all()
    # pagination_class = OnePagesPagination

    # def get(self, request, *args, **kwargs):
    #     foods = Food.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"])).order_by('-price')
    #     serializer = GetMenuSerializer(foods, many=True)
    #     page = self.paginate_queryset(serializer.data)
    #     return self.get_paginated_response(page)

    def get_queryset(self):
        self.queryset = Food.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"]))
        return self.queryset
