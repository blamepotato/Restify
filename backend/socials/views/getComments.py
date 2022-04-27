from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from restaurants.models import Restaurant
from socials.models import Blog, Comment
from socials.serializers.getBlog import GetBlogSerializer
from socials.serializers.getComments import GetCommentsSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class GetCommentsView(ListAPIView):
    model = Comment
    serializer_class = GetCommentsSerializer
    queryset = Comment.objects.all()
    pagination_class = OnePagesPagination

    def get(self, request, *args, **kwargs):
        comments = Comment.objects.filter(restaurant=get_object_or_404(Restaurant, restaurant_name=self.kwargs["restaurant_name"]))
        serializer = GetCommentsSerializer(comments, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)

