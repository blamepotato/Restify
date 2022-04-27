from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from restaurants.models import Restaurant
from socials.models import Blog


class AddBlogSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content']

    def create(self, validated_data):
        return super().create({**validated_data,
                               **{'restaurant': get_object_or_404(Restaurant, owner=self.context['request'].user)}})
