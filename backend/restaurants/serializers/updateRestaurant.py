from rest_framework import serializers

from restaurants.models import Restaurant


class UpdateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['restaurant_name', 'address', 'description', 'postal_code', 'phone_number', 'logo']
