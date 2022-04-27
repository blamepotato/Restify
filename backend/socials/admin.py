from django.contrib import admin

from socials.models import Blog, BlogImage, BlogLike, Comment, Follow, \
    RestaurantLike, Notification

admin.site.register(Blog)
admin.site.register(BlogImage)
admin.site.register(RestaurantLike)
admin.site.register(BlogLike)
admin.site.register(Follow)
admin.site.register(Comment)
admin.site.register(Notification)
