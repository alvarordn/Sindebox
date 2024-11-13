from django.shortcuts import render
from django.http import JsonResponse 
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import EnergyData
import json
from base64 import b64decode
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from .serializers import EnergyDataSerializer 


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def shelly_secure_post(request):
    data = json.loads(request.body)
    EnergyData.objects.create(
        energy_meter=data['meter'],
        energy_gen=data['gen'],
        energy_grid=data['grid'],
        energy_extra=data['extra'],
        energy_self=data['selfa'],
        timestamp=data['timestamp']
    )
    return JsonResponse({'status': 'success'})


@api_view(['GET'])
def getSmartMeterData(request, date_str):
    target_date = datetime.strptime(date_str, '%Y-%m-%d')
    start_of_day = datetime(target_date.year, target_date.month, target_date.day)
    end_of_day = start_of_day + timedelta(days=1)        
    energy_data = EnergyData.objects.filter(timestamp__gte=start_of_day, timestamp__lt=end_of_day)
    serializer = EnergyDataSerializer(energy_data, many=True)
    return Response(serializer.data)

