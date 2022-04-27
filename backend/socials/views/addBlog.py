from django.core.exceptions import BadRequest
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant
from socials.models import Blog, Follow, Notification
from socials.serializers.addBlog import AddBlogSerializer


class AddBlog(CreateAPIView):
    serializer_class = AddBlogSerializer
    permission_class = [IsAuthenticated]
    queryset = Blog.objects.all()

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        # https://stackoverflow.com/questions/3090302/how-do-i-get-the-object-if-it-exists-or-none-if-it-does-not-exist-in-django
        try:
            Restaurant.objects.get(owner=request.user)
            rest = Restaurant.objects.get(owner=self.request.user)
            follows = Follow.objects.filter(restaurant=rest)
            for follower in follows:
                Notification.objects.create(user=self.request.user, name=self.request.user.restaurant.restaurant_name, TargetUser=follower.user, action="make", Target="new_blog", target_id=follower.user.id)
            return super().post(request, *args, **kwargs)
        except Restaurant.DoesNotExist:
            raise BadRequest('You don\'t have a restaurant yet!')
