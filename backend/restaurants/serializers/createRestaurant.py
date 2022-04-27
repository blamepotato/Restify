from rest_framework import serializers

from restaurants.models import Restaurant


class CreateRestaurantSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.get_full.name', read_only=True)

    class Meta:
        model = Restaurant
        fields = ['restaurant_name', 'logo', 'address', 'owner', 'description', 'postal_code', 'phone_number']

    def create(self, validated_data):
        return super().create({**validated_data, **{'owner': self.context['request'].user}})


