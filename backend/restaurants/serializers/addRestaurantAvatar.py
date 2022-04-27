from rest_framework import serializers

from restaurants.models import RestaurantImage


class AddRestaurantAvatarSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.get_name', read_only=True)

    class Meta:
        model = RestaurantImage
        fields = ['restaurant', 'image']

    def create(self, validated_data):
        return super().create({**validated_data, **{'restaurant': self.context['request'].user.restaurant}})
