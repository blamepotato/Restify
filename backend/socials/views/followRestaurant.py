from django.core.exceptions import BadRequest
from rest_framework import status
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.generics import CreateAPIView, DestroyAPIView, \
    get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurants.models import Restaurant
from socials.models import Follow, Notification
from socials.serializers.followRestaurantSerializer import \
    FollowRestaurantSerializer


class FollowRestaurantView(CreateAPIView):
    serializer_class = FollowRestaurantSerializer
    permission_class = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        curr_restaurant = get_object_or_404(Restaurant, restaurant_name=kwargs[
            'restaurant_name'])
        if Follow.objects.filter(user=self.request.user,
                                 restaurant=curr_restaurant).exists():
            raise BadRequest("You already followed this restaurant")

        Notification.objects.create(user=self.request.user, name=self.request.user.username, TargetUser=curr_restaurant.owner, action="follow", Target="rest", target_id=curr_restaurant.id)
        return super().post(request, *args, **kwargs)


class UnFollowRestaurantView(DestroyAPIView):
    serializer_class = FollowRestaurantSerializer
    permission_class = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        curr_restaurant = get_object_or_404(Restaurant, restaurant_name=kwargs[
            'restaurant_name'])

        try:
            follow = Follow.objects.get(user=self.request.user, restaurant=curr_restaurant)
        except:
            raise BadRequest("You have not followed this restaurant")

        follow.delete()
        return Response(status.HTTP_204_NO_CONTENT)
