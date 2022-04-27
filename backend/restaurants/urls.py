from django.urls import path

from restaurants.views.addRestaurantAvatar import AddRestaurantAvatar
from restaurants.views.createRestaurant import CreateRestaurant
from restaurants.views.deleteRestaurantImage import DeleteRestaurantImageView
from restaurants.views.editMenu import EditMenu
from restaurants.views.getMenu import GetMenu
from restaurants.views.getRestaurant import GetRestaurant
from restaurants.views.getRestaurantImage import GetRestaurantImageView
from restaurants.views.search import SearchView
from restaurants.views.updateRestaurant import UpdateRestaurant
from restaurants.views.addMenu import AddMenu
from restaurants.views.getRandomRestaurants import GetRandomRestaurants

app_name = 'restaurants'
urlpatterns = [
    path('create/', CreateRestaurant.as_view(), name='create_restaurant'),
    path('get/<str:restaurant_name>/', GetRestaurant.as_view(), name='get_restaurant'),
    path('update/', UpdateRestaurant.as_view(), name='update_restaurant'),
    path('add_image/', AddRestaurantAvatar.as_view(), name='add_image'),
    path('add_menu/', AddMenu.as_view(), name='add_menu'),
    path('get_menu/<str:restaurant_name>/', GetMenu.as_view(), name='get_menu'),
    path('edit_menu/', EditMenu.as_view(), name='edit_menu'),
    path('search/', SearchView.as_view(), name='search_restaurant'),
    path('delete_avatar/', DeleteRestaurantImageView.as_view(), name='deleteImage'),
    path('get_image/<str:restaurant_name>/', GetRestaurantImageView.as_view(), name='get_image'),
    path('get_random_rests/', GetRandomRestaurants.as_view(), name='get_random_rests')
]
