from rest_framework import serializers

from restaurants.models import Restaurant
from socials.models import Blog


class DeleteBlogSerializer(serializers.ModelSerializer):
    restaurants = serializers.CharField(source='restaurant.get_name', read_only=True)

    class Meta:
        model = Blog
        field = '__all__'

    def create(self, validated_data):
        return super().create({**validated_data, **{'restaurant': Restaurant.objects.get(owner=self.context['request'].user)}})
