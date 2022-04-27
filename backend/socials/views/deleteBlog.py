from django.core.exceptions import BadRequest
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from socials.models import Blog
from socials.serializers.deleteBlog import DeleteBlogSerializer


class DeleteBlogView(DestroyAPIView):
    serializer_class = DeleteBlogSerializer
    permission_class = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        blog = get_object_or_404(Blog, id=kwargs['blog_id'])
        if blog and blog.restaurant.owner != request.user:
            raise BadRequest('You do not have permission to delete this blog!')
        if blog:
            blog.delete()
            return Response(status.HTTP_204_NO_CONTENT)
