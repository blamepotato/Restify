from rest_framework import serializers
from socials.models import Comment


class GetCommentsSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(source='restaurant.get_name',
                                       read_only=True)

    user = serializers.CharField(source='user.get_name', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

