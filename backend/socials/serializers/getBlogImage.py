from rest_framework import serializers

from socials.models import BlogImage


class GetBlogImageSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.get_name',
                                       read_only=True)

    class Meta:
        model = BlogImage
        fields = '__all__'
