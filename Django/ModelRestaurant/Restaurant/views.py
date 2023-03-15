#views.py
from .models import Modelrestaurant
from .serializers import ModelrestaurantSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from .models import User
from .serializers import UserSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Modelrestaurant.objects.all()
    serializer_class = ModelrestaurantSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username, password=password).first()
        if user:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token})
        else:
            return Response({'error': 'Invalid credentials'}, status=400)