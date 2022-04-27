from rest_framework.generics import ListAPIView, get_object_or_404
from socials.models import Blog, BlogImage
from socials.serializers.getBlogImage import GetBlogImageSerializer


# class OnePagesPagination(PageNumberPagination):
#     page_size = 5
#     page_size_query_param = 'page_size'


class GetBlogImageView(ListAPIView):
    model = BlogImage
    serializer_class = GetBlogImageSerializer
    queryset = BlogImage.objects.all()
    # pagination_class = OnePagesPagination

    # def get(self, request, *args, **kwargs):
    #     images = BlogImage.objects.filter(blog=get_object_or_404(Blog, id=self.kwargs["blog_id"]))
    #     serializer = GetBlogImageSerializer(images, many=True)
    #     page = self.paginate_queryset(serializer.data)
    #     return self.get_paginated_response(page)

    def get_queryset(self):
        self.queryset = BlogImage.objects.filter(blog=get_object_or_404(Blog, id=self.kwargs["blog_id"]))
        return self.queryset
