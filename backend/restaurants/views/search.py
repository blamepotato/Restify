from django.db.models import Count
from rest_framework.generics import ListAPIView
from restaurants.models import Food, Restaurant
from restaurants.serializers.search import SearchSerializer
from rest_framework.pagination import PageNumberPagination


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class SearchView(ListAPIView):
    # https://stackoverflow.com/questions/45589644/django-order-by-desc
    # https://stackoverflow.com/questions/29587382/how-to-add-an-model-instance-to-a-django-queryset
    # https://stackoverflow.com/questions/431628/how-can-i-combine-two-or-more-querysets-in-a-django-view
    # https://stackoverflow.com/questions/61660934/how-to-pass-a-queryset-instance-to-serializer
    serializer_class = SearchSerializer
    pagination_class = OnePagesPagination

    def get_queryset(self):
        search_term = self.request.GET['search']
        self.queryset = Restaurant.objects.all().filter(restaurant_name__icontains=search_term) | \
                        Restaurant.objects.all().filter(address__icontains=search_term)
        selected_food = Food.objects.all().filter(
            food_name__icontains=search_term)
        for food in selected_food:
            self.queryset |= Restaurant.objects.filter(
                restaurant_name=food.restaurant.restaurant_name)
        return self.queryset.annotate(follower_num=Count('followers')).order_by('-follower_num')
