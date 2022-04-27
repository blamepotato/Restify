from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from accounts.models import User
from socials.models import Notification


class AddNotificationSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    TargetUser = serializers.CharField(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        return super().create({**validated_data, **{'user': self.context['request'].user,
                                                    'TargetUser': get_object_or_404(User, username=self.context['request'].data['target_user_name'])}})
