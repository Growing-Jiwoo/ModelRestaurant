#views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework_jwt.settings import api_settings
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Modelrestaurant
from .serializers import ModelrestaurantSerializer, UserSerializer
from rest_framework import status
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .authentication import authenticate_request

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
            payload = authenticate_request(request)
            restaurants = Modelrestaurant.objects.all()
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ModelrestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

class RestaurantDetail(APIView):

    def get(self, request, pk):
        try:
            payload = authenticate_request(request)
            restaurant = Modelrestaurant.objects.get(pk=pk)
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

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

class ModelrestaurantUpdateView(APIView):
    def put(self, request):
        id_counts = request.data.get('viewCnt', {})
        for id, count in id_counts.items():
            obj = Modelrestaurant.objects.filter(id=id).first()
            if obj is not None:
                obj.viewcnt += count
                obj.save()
        return Response({'message': f'View count updated for {len(id_counts)} items.'})

class ModelrestaurantListView(APIView):
    def get(self, request):
        try:
            payload = authenticate_request(request)
            restaurants = Modelrestaurant.objects.values('id', 'bsnsnm', 'viewcnt').order_by('-viewcnt')[:3]
        except AuthenticationFailed as e:
            return Response(e.detail, status=e.status_code)
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(restaurants)

class Top3RestaurantsByGugun(APIView):
    def get(self, request):
        gugun = request.query_params.get('gugun')
        print(gugun)
        if not gugun:
            return Response({'error': 'gugun parameter is missing.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            restaurants = Modelrestaurant.objects.filter(gugun=gugun).order_by('-viewcnt')[:3]
        except Modelrestaurant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ModelrestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)