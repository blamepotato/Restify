from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    avatar = models.ImageField(upload_to='user_avatar', null=True, blank=True)
    birthday = models.DateTimeField(null=True, blank=True)
    phone_number = models.CharField(max_length=11, null=True, blank=True)

    @property
    def following(self):
        return self.followings.all().count()

    @property
    def number_of_comments(self):
        return self.comments.all().count()

    @property
    def restaurant_likes(self):
        return self.liked_restaurants.all().count()

    @property
    def blog_likes(self):
        return self.liked_blogs.all().count()

    @property
    def restaurant_name(self):
        if self.restaurant:
            return self.restaurant.restaurant_name
        return ""

    @property
    def followed_restaurant(self):
        followed_restaurant = []
        for follow in self.followings.all():
            followed_restaurant.append(follow.restaurant.restaurant_name)
        return followed_restaurant

    def __str__(self):
        return self.username

    def get_name(self):
        return self.username
