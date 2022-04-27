from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from socials.serializers.getRandomBlogs import GetRandomBlogsSerializer
from socials.models import Blog


class OnePagesPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'


class GetRandomBlogs(ListAPIView):
    model = Blog
    serializer_class = GetRandomBlogsSerializer
    queryset = Blog.objects.all()
    pagination_class = OnePagesPagination

    def get(self, request, *args, **kwargs):
        blogs = Blog.objects.all().order_by('?')
        serializer = GetRandomBlogsSerializer(blogs, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)

