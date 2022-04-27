from rest_framework import serializers

from restaurants.models import RestaurantImage


class GetRestaurantImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = RestaurantImage
        fields = ["image"]
