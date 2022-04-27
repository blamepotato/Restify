from rest_framework import serializers

from socials.models import Notification


class GetNotificationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.get_full_name', read_only=True)
    restaurant = serializers.CharField(source='restaurant.get_name',
                                       read_only=True)
    TargetUser = serializers.CharField(source='TargetUser.get_full_name', read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
