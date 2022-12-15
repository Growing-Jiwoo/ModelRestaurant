#views.py
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Modelrestaurant
from .serializers import ModelrestaurantSerializer
from rest_framework.parsers import JSONParser
# Create your views here.


@csrf_exempt
def Restaurant(request):
    if request.method == 'GET':
        query_set = Modelrestaurant.objects.all()
        serializer = ModelrestaurantSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)