from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from restaurants.models import Restaurant, Food
from restaurants.serializers.addMenu import AddMenuSerializer
from socials.models import Follow, Notification


class AddMenu(CreateAPIView):
    serializer_class = AddMenuSerializer
    permission_class = [IsAuthenticated]
    queryset = Food.objects.all()

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        # https://stackoverflow.com/questions/3090302/how-do-i-get-the-object-if-it-exists-or-none-if-it-does-not-exist-in-django
        try:
            Restaurant.objects.get(owner=self.request.user)

            rest = Restaurant.objects.get(owner=self.request.user)
            follows = Follow.objects.filter(restaurant=rest)
            for follower in follows:
                Notification.objects.create(user=self.request.user,
                                            name=self.request.user.restaurant.restaurant_name,
                                            TargetUser=follower.user,
                                            action="update", Target="menu",
                                            target_id=follower.user.id)

            return super().post(request, *args, **kwargs)
        except Restaurant.DoesNotExist:
            raise APIException("You don't have a restaurant yet")
