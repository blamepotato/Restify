from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from socials.models import Blog, Notification
from socials.serializers.getNotification import GetNotificationSerializer


class OnePagesPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class GetNotificationView(ListAPIView):
    model = Blog
    serializer_class = GetNotificationSerializer
    queryset = Notification.objects.all()
    pagination_class = OnePagesPagination
    permission_class = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()
        notifications = Notification.objects.filter(TargetUser=request.user).order_by('-created_at')
        serializer = GetNotificationSerializer(notifications, many=True)
        page = self.paginate_queryset(serializer.data)
        return self.get_paginated_response(page)

