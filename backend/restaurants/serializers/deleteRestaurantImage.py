from rest_framework import serializers

from restaurants.models import RestaurantImage, Restaurant


class DeleteRestaurantImageSerializer(serializers.ModelSerializer):
    restaurants = serializers.CharField(source='restaurant.get_name', read_only=True)

    class Meta:
        model = RestaurantImage
        field = ['restaurant', 'image']

    def create(self, validated_data):
        return super().create({**validated_data, **{'restaurant': Restaurant.objects.get(owner=self.context['request'].user)}})
