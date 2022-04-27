from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from restaurants.models import Restaurant
from socials.models import Follow, RestaurantLike


class LikeRestaurantSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    restaurant = serializers.CharField(read_only=True)

    class Meta:
        model = RestaurantLike
        fields = '__all__'

    def create(self, validated_data):
        # https://stackoverflow.com/questions/49491705/how-to-modify-get-queryset-result-value
        curr_restaurant = get_object_or_404(Restaurant,
                                            restaurant_name=self.context.get('request').parser_context.get('kwargs').get(
                                                'restaurant_name'))
        curr_user = self.context['request'].user
        return super().create(
            {**validated_data, **{'restaurant': curr_restaurant},
             **{'user': curr_user}})

