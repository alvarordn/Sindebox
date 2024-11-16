from django.http import JsonResponse 
from .models import EnergyData
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from .serializers import EnergyDataSerializer 
from django.db.models import Sum
from django.db.models.functions import TruncDate

@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
def getDailySmartMeterData(request, date_str):
    target_date = datetime.strptime(date_str, '%Y-%m-%d')
    start_of_day = datetime(target_date.year, target_date.month, target_date.day)
    end_of_day = start_of_day + timedelta(days=1)        
    energy_data = EnergyData.objects.filter(timestamp__gte=start_of_day, timestamp__lt=end_of_day)
    serializer = EnergyDataSerializer(energy_data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMonthlySmartMeterData(request, date_str):
    target_date = datetime.strptime(date_str, '%Y-%m')
    energy_data = EnergyData.objects.filter(timestamp__year=target_date.year, timestamp__month=target_date.month)
    aggregated_data = energy_data.annotate(
        date_only=TruncDate('timestamp')
    ).values('date_only').annotate(
        total_energy_meter=Sum('energy_meter'),
        total_energy_self=Sum('energy_self'),
        total_energy_gen=Sum('energy_gen'),
        total_energy_grid=Sum('energy_grid'),
        total_energy_extra=Sum('energy_extra')
    ).order_by('date_only')
    
    result = []
    for data in aggregated_data:
        result.append({
            'timestamp': data['date_only'],  # Only the date, no time
            'energy_meter': data['total_energy_meter'],
            'energy_self': data['total_energy_self'],
            'energy_gen': data['total_energy_gen'],
            'energy_grid': data['total_energy_grid'],
            'energy_extra': data['total_energy_extra']
        })

    return Response(result)


@api_view(['GET'])
def getyearlySmartMeterData(request, date_str):
    target_date = datetime.strptime(date_str, '%Y')
    energy_data = EnergyData.objects.filter(timestamp__year=target_date.year)
    aggregated_data = energy_data.annotate(
        date_only=TruncDate('timestamp')
    ).values('date_only').annotate(
        total_energy_meter=Sum('energy_meter'),
        total_energy_self=Sum('energy_self'),
        total_energy_gen=Sum('energy_gen'),
        total_energy_grid=Sum('energy_grid'),
        total_energy_extra=Sum('energy_extra')
    ).order_by('date_only')
    
    result = []
    for data in aggregated_data:
        result.append({
            'timestamp': data['date_only'],  # Only the date, no time
            'energy_meter': data['total_energy_meter'],
            'energy_self': data['total_energy_self'],
            'energy_gen': data['total_energy_gen'],
            'energy_grid': data['total_energy_grid'],
            'energy_extra': data['total_energy_extra']
        })

    return Response(result)