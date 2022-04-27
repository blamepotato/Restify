from rest_framework import serializers

from restaurants.models import Restaurant


class SearchSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.get_full_name')

    class Meta:
        model = Restaurant
        fields = '__all__'
