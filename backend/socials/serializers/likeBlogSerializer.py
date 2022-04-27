from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from restaurants.models import Restaurant
from socials.models import Blog, BlogLike, Follow, RestaurantLike


class LikeBlogSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    blog = serializers.CharField(read_only=True)
    num_likes = serializers.IntegerField(source="blog.num_likes", read_only=True)

    class Meta:
        model = BlogLike
        fields = '__all__'

    def create(self, validated_data):
        # https://stackoverflow.com/questions/49491705/how-to-modify-get-queryset-result-value
        curr_blog = get_object_or_404(Blog,
                                      id=self.context.get(
                                          'request').parser_context.get(
                                          'kwargs').get(
                                          'blog_id'))
        curr_user = self.context['request'].user
        return super().create(
            {**validated_data, **{'blog': curr_blog},
             **{'user': curr_user}})
