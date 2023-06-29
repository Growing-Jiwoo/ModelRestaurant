from rest_framework import routers
from .views import UserViewSet, RestaurantList, RestaurantDetail, ModelrestaurantUpdateView, ModelrestaurantListView, Top3RestaurantsByGugun, UserSignupAPIView
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('Restaurant/', RestaurantList.as_view(), name='restaurant-list'),
    path('restaurants/top3', RestaurantList.as_view(), name='top_3_restaurants'),
    path('Restaurant/<int:pk>/', RestaurantDetail.as_view(), name='restaurant-detail'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('addViewCnt', ModelrestaurantUpdateView.as_view(), name='modelrestaurant-update'),
    path('rankData', ModelrestaurantListView.as_view()),
    path('top3', Top3RestaurantsByGugun.as_view(), name='top3'),
    path('signup', UserSignupAPIView.as_view(), name='user-signup'),
]