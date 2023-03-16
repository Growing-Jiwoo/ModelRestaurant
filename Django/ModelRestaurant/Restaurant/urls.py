from rest_framework import routers
from .views import UserViewSet, RestaurantList, RestaurantDetail
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('Restaurant/', RestaurantList.as_view(), name='restaurant-list'),
    path('Restaurant/<int:pk>/', RestaurantDetail.as_view(), name='restaurant-detail'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]