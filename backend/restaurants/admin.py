from django.contrib import admin

# Register your models here.
from restaurants.models import Restaurant, Food, RestaurantImage

admin.site.register(Restaurant)
admin.site.register(Food)
admin.site.register(RestaurantImage)



