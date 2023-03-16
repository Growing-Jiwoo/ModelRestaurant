#views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework_jwt.settings import api_settings
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Modelrestaurant
from .serializers import ModelrestaurantSerializer
from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import jwt
from django.conf import settings

class IsTokenValid(BasePermission):
    authentication_classes = (JSONWebTokenAuthentication)

    def has_permission(self, request, view):
        try:
            return request.user.is_authenticated
        except AuthenticationFailed:
            return False

class RestaurantList(APIView):

    def get(self, request):
        try:
            token = request.headers.get('Authorization', '').split()[1]
            request.auth = token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            restaurants = Modelrestaurant.objects.all()
        except jwt.ExpiredSignatureError:
            return Response({'error': '토큰 만료'}, status=status.HTTP_401_UNAUTHORIZED)
        except (jwt.DecodeError, jwt.InvalidTokenError):
            return Response({'error': '잘못된 토큰'}, status=status.HTTP_401_UNAUTHORIZED)
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except IndexError:
            return Response({'error': '토큰이 없음'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ModelrestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

class RestaurantDetail(APIView):

    def get(self, request, pk):
        try:
            token = request.headers.get('Authorization', '').split()[1]
            request.auth = token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            restaurant = Modelrestaurant.objects.get(pk=pk)
        except jwt.ExpiredSignatureError:
            return Response({'error': '토큰 만료'}, status=status.HTTP_401_UNAUTHORIZED)
        except (jwt.DecodeError, jwt.InvalidTokenError):
            return Response({'error': '잘못된 토큰'}, status=status.HTTP_401_UNAUTHORIZED)
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except IndexError:
            return Response({'error': '토큰이 없음'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ModelrestaurantSerializer(restaurant)
        return Response(serializer.data)

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