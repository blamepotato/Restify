from rest_framework import serializers

from socials.models import Blog


class GetBlogSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.get_name',
                                       read_only=True)
    liked_users = serializers.ReadOnlyField()
    num_likes = serializers.IntegerField()

    class Meta:
        model = Blog
        fields = '__all__'
