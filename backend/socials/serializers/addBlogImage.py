from rest_framework import serializers

from socials.models import BlogImage


class AddBlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ['blog', 'image']