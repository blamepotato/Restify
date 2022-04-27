from rest_framework import serializers
from socials.models import Blog


class GetRandomBlogsSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.get_name',
                                       read_only=True)
    logo = serializers.ImageField(source='restaurant.get_logo')
    num_likes = serializers.IntegerField()
    liked_users = serializers.ReadOnlyField()

    class Meta:
        model = Blog
        fields = '__all__'
