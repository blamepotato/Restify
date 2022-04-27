from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import CreateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant
from socials.models import Notification
from socials.serializers.addCommentSerializer import AddCommentSerializer


class AddCommentView(CreateAPIView):
    serializer_class = AddCommentSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        restaurant = get_object_or_404(Restaurant, restaurant_name=kwargs['restaurant_name'])
        Notification.objects.create(user=self.request.user, name=self.request.user.username, TargetUser=restaurant.owner, action="comment", Target="rest", target_id=restaurant.id)
        return super().post(request, *args, **kwargs)
