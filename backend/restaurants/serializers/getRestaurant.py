from rest_framework import serializers

from restaurants.models import Restaurant


class GetRestaurantSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.get_full_name')

    class Meta:
        model = Restaurant
        fields = ['restaurant_name', 'phone_number', 'address', 'owner', 'description', 'postal_code', 'num_follower', 'num_like',  'num_blog', 'logo', 'liked_users', 'followed_users']
