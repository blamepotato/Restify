from django.core.exceptions import BadRequest
from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.generics import UpdateAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurants.models import Food, Restaurant
from restaurants.serializers.editMenu import EditMenuSerializer
from socials.models import Follow, Notification


class EditMenu(UpdateAPIView):
    serializer_class = EditMenuSerializer
    permission_class = [IsAuthenticated]
    queryset = Food.objects

    # https://stackoverflow.com/questions/60258388/how-to-update-multiple-objects-in-django-rest-framework
    def get_food(self, f_id):
        try:
            food = Food.objects.get(id=f_id)
            if food.restaurant.owner != self.request.user:
                raise BadRequest('You do not have permission to edit!')
            return food
        except (Food.DoesNotExist, ValidationError):
            raise BadRequest("Food does not exist")

    def put(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()

        restaurant = None
        try:
            restaurant = Restaurant.objects.get(owner=self.request.user)
        except Restaurant.DoesNotExist:
            raise BadRequest('You do not have a restaurant yet!')

        data = request.data
        instances = []

        Food.objects.filter(restaurant=restaurant).delete()

        for temp_dict in data:

            food_name = "Cannot Be Empty"
            price = 0
            description = ""
            category = "Breakfast"
            if 'food_name' in temp_dict and temp_dict['food_name'] != "":
                food_name = temp_dict['food_name']
            if 'price' in temp_dict and temp_dict['price'] != "":
                price = temp_dict['price']
            if 'description' in temp_dict:
                description = temp_dict['description']
            if 'category' in temp_dict:
                category = temp_dict['category']

            try:
                obj = Food.objects.create(food_name=food_name, restaurant=restaurant, price=price, description=description, category=category)
                obj.save()
            except IntegrityError:
                raise BadRequest('Your foods name need to be unique!')
            except ValueError:
                raise BadRequest('Inappropriate data format!')
            instances.append(obj)

        serializer = EditMenuSerializer(instances, many=True)

        rest = Restaurant.objects.get(owner=self.request.user)
        follows = Follow.objects.filter(restaurant=rest)
        for follower in follows:
            Notification.objects.create(user=self.request.user, name=self.request.user.restaurant.restaurant_name, TargetUser=follower.user, action="update", Target="menu", target_id=follower.user.id)

        return Response(serializer.data)
