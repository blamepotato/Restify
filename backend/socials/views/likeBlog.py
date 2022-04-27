from django.core.exceptions import BadRequest
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import CreateAPIView, DestroyAPIView, \
    get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from socials.models import Blog, BlogLike, Notification
from socials.serializers.likeBlogSerializer import LikeBlogSerializer


class LikeBlogView(CreateAPIView):
    serializer_class = LikeBlogSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        curr_blog = get_object_or_404(Blog, id=kwargs[
            'blog_id'])
        if BlogLike.objects.filter(user=self.request.user,
                                   blog=curr_blog).exists():
            raise BadRequest("You already liked this blog")
        Notification.objects.create(user=self.request.user, name=self.request.user.username,
                                    TargetUser=curr_blog.restaurant.owner,
                                    action="like", Target="blog",
                                    target_id=curr_blog.id)
        return super().post(request, *args, **kwargs)


class UnLikeBlogView(DestroyAPIView):
    serializer_class = LikeBlogSerializer
    permission_class = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        curr_blog = get_object_or_404(Blog, id=kwargs[
            'blog_id'])

        try:
            like = BlogLike.objects.get(user=self.request.user, blog=curr_blog)
        except:
            raise BadRequest("You have not liked this blog")

        like.delete()
        return Response(status.HTTP_204_NO_CONTENT)
