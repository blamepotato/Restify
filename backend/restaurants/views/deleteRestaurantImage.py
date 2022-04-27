from django.http import QueryDict
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurants.models import RestaurantImage
from restaurants.serializers.deleteRestaurantImage import \
    DeleteRestaurantImageSerializer


class DeleteRestaurantImageView(DestroyAPIView):
    serializer_class = DeleteRestaurantImageSerializer
    permission_class = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        if self.request.user.is_anonymous:
            raise AuthenticationFailed()

        if 'image' not in request.data:
            return Response('Please provide a image to delete',
                            status.HTTP_400_BAD_REQUEST)
        restaurantImage = get_object_or_404(RestaurantImage,
                                            restaurant=self.request.user.restaurant,
                                            image=request.data['image'])
        if restaurantImage:
            restaurantImage.delete()
            return Response(status.HTTP_204_NO_CONTENT)
