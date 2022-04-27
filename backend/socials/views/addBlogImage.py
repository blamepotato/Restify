from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from socials.models import Blog
from socials.serializers.addBlogImage import AddBlogImageSerializer


class AddBlogImage(CreateAPIView):
    serializer_class = AddBlogImageSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        blog = get_object_or_404(Blog, id=request.data['blog'])
        if blog.restaurant.owner != request.user:
            return Response(status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)
