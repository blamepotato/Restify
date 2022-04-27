from django.urls import path

from socials.views.addBlog import AddBlog
from socials.views.addBlogImage import AddBlogImage
from socials.views.addComment import AddCommentView
from socials.views.addNotification import AddNotificationView
from socials.views.deleteBlog import DeleteBlogView
from socials.views.feed import FeedView
from socials.views.followRestaurant import FollowRestaurantView, \
    UnFollowRestaurantView
from socials.views.getBlog import GetBlogView
from socials.views.getBlogImage import GetBlogImageView
from socials.views.getComments import GetCommentsView
from socials.views.getNotification import GetNotificationView
from socials.views.likeBlog import LikeBlogView, UnLikeBlogView
from socials.views.likeRestaurant import LikeRestaurantView, \
    UnLikeRestaurantView
from socials.views.getRandomBlogs import GetRandomBlogs

app_name = 'socials'

urlpatterns = [
    path('follow/<str:restaurant_name>/', FollowRestaurantView.as_view(), name='follow_restaurant'),
    path('unfollow/<str:restaurant_name>/', UnFollowRestaurantView.as_view(), name='unfollow_restaurant'),
    path('get_blog/<str:restaurant_name>/', GetBlogView.as_view(), name='get_blog'),
    path('add_blog/', AddBlog.as_view(), name='add_blog'),
    path('like_restaurant/<str:restaurant_name>/', LikeRestaurantView.as_view(), name='like_restaurant'),
    path('unlike_restaurant/<str:restaurant_name>/', UnLikeRestaurantView.as_view(), name='unlike_restaurant'),
    path('like_blog/<int:blog_id>/', LikeBlogView.as_view(), name='like_blog'),
    path('unlike_blog/<int:blog_id>/', UnLikeBlogView.as_view(), name='unlike_blog'),
    path('get_comments/<str:restaurant_name>/', GetCommentsView.as_view(), name='get_comments'),
    path('comment/<str:restaurant_name>/', AddCommentView.as_view(), name='add_comment'),
    path('add_notification/', AddNotificationView.as_view(), name='add_notification'),
    path('add_blog_image/', AddBlogImage.as_view(), name='add_blog_image'),
    path('get_blog_image/<int:blog_id>/', GetBlogImageView.as_view(), name='get_blog_image'),
    path('get_notification/', GetNotificationView.as_view(), name='add_notification'),
    path('feed/', FeedView.as_view(), name='feed'),
    path('delete_blog/<int:blog_id>/', DeleteBlogView.as_view(), name='delete_blog'),
    path('get_random_blogs/', GetRandomBlogs.as_view(), name='get_random_blogs')
]
