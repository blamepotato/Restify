from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination

from restaurants.models import Restaurant
from socials.models import Blog
from socials.serializers.getBlog import GetBlogSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class GetBlogView(ListAPIView):
    model = Blog
    serializer_class = GetBlogSerializer
    queryset = Blog.objects.all()
    pagination_class = OnePagesPagination

    def get(self, request, *args, **kwargs):
        blogs = Blog.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"]))
        serializer = GetBlogSerializer(blogs, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)

