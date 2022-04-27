from django.db import models

from accounts.models import User
from restaurants.models import Restaurant


class Blog(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE, related_name='blogs')
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' - ' + self.restaurant.restaurant_name

    @property
    def logo(self):
        return self.restaurant.logo

    @property
    def num_likes(self):
        return self.blog_likes.all().count()

    @property
    def liked_users(self):
        users = []
        for blog_like in self.blog_likes.all():
            users.append(blog_like.user.username)
        return users


class BlogImage(models.Model):
    blog = models.ForeignKey(to=Blog, on_delete=models.CASCADE, related_name='avatar')
    image = models.ImageField(upload_to='blog_image', blank=True, null=True)

    def __str__(self):
        return 'image ' + str(self.pk) + " of " + self.blog.title


class RestaurantLike(models.Model):
    user = models.ForeignKey('accounts.User', related_name='liked_restaurants', on_delete=models.CASCADE)
    restaurant = models.ForeignKey('restaurants.Restaurant', related_name='restaurant_likes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'User ' + self.user.username + " liked  restaurant " + self.restaurant.restaurant_name


class BlogLike(models.Model):
    user = models.ForeignKey('accounts.User', related_name='liked_blogs', on_delete=models.CASCADE)
    blog = models.ForeignKey('socials.Blog', related_name='blog_likes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'User ' + self.user.username + " liked  blog " + self.blog.title


class Follow(models.Model):
    user = models.ForeignKey('accounts.User', related_name='followings', on_delete=models.CASCADE)
    restaurant = models.ForeignKey('restaurants.Restaurant', related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'User ' + self.user.username + " followed  restaurant " + self.restaurant.restaurant_name


class Comment(models.Model):
    user = models.ForeignKey('accounts.User', related_name='comments', on_delete=models.CASCADE)
    restaurant = models.ForeignKey('restaurants.Restaurant', related_name='comments', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)

    def __str__(self):
        return 'User ' + self.user.username + " commented on  restaurant " + self.restaurant.restaurant_name


class Notification(models.Model):
    user = models.ForeignKey(to=User, related_name='notification', on_delete=models.CASCADE)
    name = models.CharField(default="Impossible", max_length=200)
    # https://stackoverflow.com/questions/48040008/django-restrict-data-that-can-be-given-to-model-field
    action = models.CharField(
        max_length=10,
        choices=(
            ("like", "Liked"),
            ("follow", "Followed"),
            ("comment", "Commented"),
            ("update", "Updated"),
            ("make", "Made")
        )
    )
    TargetUser = models.ForeignKey(to=User, related_name='getnotification', on_delete=models.CASCADE)
    # https://stackoverflow.com/questions/48040008/django-restrict-data-that-can-be-given-to-model-field
    Target = models.CharField(
        max_length=10,
        choices=(
            ("blog", "Blog"),
            ("rest", "Restaurant"),
            ("new_blog", "New Blog"),
            ("menu", "Menu")
        )
    )
    target_id = models.IntegerField(default=-1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.action == 'like' or self.action == 'comment' or self.action == 'follow':
            return self.user.username + " " + self.action + " " + self.TargetUser.username + "'s " + self.Target
        elif self.action == 'make':
            return self.user.restaurant.restaurant_name + " " + self.action + " a " + self.Target
        else:
            return self.user.restaurant.restaurant_name + " " + self.action + " their " + self.Target
