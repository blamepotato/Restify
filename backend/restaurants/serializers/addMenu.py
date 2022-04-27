from rest_framework import serializers

from restaurants.models import Food, Restaurant


class AddMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Food
        fields = ['food_name', 'price', 'description', 'category']

    def create(self, validated_data):
        x = Restaurant.objects.get(owner=self.context['request'].user)
        return super().create({**validated_data, **{'restaurant': x}})
