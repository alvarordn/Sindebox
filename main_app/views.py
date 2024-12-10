from django.http import JsonResponse 
from .models import EnergyData
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta, time
from .serializers import EnergyDataSerializer 
from django.db.models import Sum
from django.db.models.functions import TruncDate, TruncMonth

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
        total_energy_dem=Sum('energy_dem'),
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
            'energy_dem': data['total_energy_dem'],
            'energy_grid': data['total_energy_grid'],
            'energy_extra': data['total_energy_extra']
        })

    return Response(result)


@api_view(['GET'])
def getyearlySmartMeterData(request, date_str):
    target_date = datetime.strptime(date_str, '%Y')
    energy_data = EnergyData.objects.filter(timestamp__year=target_date.year)
    
    aggregated_data = energy_data.annotate(
        month_only=TruncMonth('timestamp')
    ).values('month_only').annotate(
        total_energy_meter=Sum('energy_meter'),
        total_energy_self=Sum('energy_self'),
        total_energy_gen=Sum('energy_gen'),
        total_energy_dem=Sum('energy_dem'),
        total_energy_grid=Sum('energy_grid'),
        total_energy_extra=Sum('energy_extra')
    ).order_by('month_only')
    
    result = []
    for data in aggregated_data:
        result.append({
            'month': data['month_only'].month,  #
            'energy_meter': data['total_energy_meter'],
            'energy_self': data['total_energy_self'],
            'energy_gen': data['total_energy_gen'],
            'energy_dem': data['total_energy_dem'],
            'energy_grid': data['total_energy_grid'],
            'energy_extra': data['total_energy_extra']
        })

    return Response(result)


@api_view(['GET'])
def getCustomSmartMeterData(request, date_str1, date_str2):
    start_date = datetime.strptime(date_str1, '%Y-%m-%d')
    end_date = datetime.strptime(date_str2, '%Y-%m-%d')
    end_date = datetime.combine(end_date, time.max)
    energy_data = EnergyData.objects.filter(timestamp__range=(start_date, end_date))
    aggregated_data = energy_data.annotate(
        date_only=TruncDate('timestamp')
    ).values('date_only').annotate(
        total_energy_meter=Sum('energy_meter'),
        total_energy_self=Sum('energy_self'),
        total_energy_gen=Sum('energy_gen'),
        total_energy_dem=Sum('energy_dem'),
        total_energy_grid=Sum('energy_grid'),
        total_energy_extra=Sum('energy_extra')
    ).order_by('date_only')
    
    result = []
    for data in aggregated_data:
        result.append({
            'timestamp': data['date_only'],  
            'energy_meter': data['total_energy_meter'],
            'energy_self': data['total_energy_self'],
            'energy_gen': data['total_energy_gen'],
            'energy_dem': data['total_energy_dem'],
            'energy_grid': data['total_energy_grid'],
            'energy_extra': data['total_energy_extra']
        })

    return Response(result)

@api_view(['GET'])
def getsummary(request):    
    total_energy_gen = EnergyData.objects.aggregate(total_energy_gen=Sum('energy_gen'))
    result = {
        'total_energy_gen': total_energy_gen['total_energy_gen'] or 0,
        'carbon': 0.00012283503255*total_energy_gen['total_energy_gen'] or 0,
        'co2': 0.000463855421686747*total_energy_gen['total_energy_gen'] or 0,
        'trees': total_energy_gen['total_energy_gen']/55.3 or 0
    }    
    return Response(result)

@api_view(['GET'])
def getrt(request):    
    latest_entry = EnergyData.objects.latest('timestamp')
    energy_data = EnergyData.objects.filter(timestamp__year=latest_entry.timestamp.year, 
                                            timestamp__month=latest_entry.timestamp.month, 
                                            timestamp__day=latest_entry.timestamp.day)
    aggregated_data = energy_data.annotate(
        date_only=TruncDate('timestamp')
    ).values('date_only').annotate(
        energy_self=Sum('energy_self'),
        energy_gen=Sum('energy_gen'),
        energy_dem=Sum('energy_dem'),
    ).order_by('date_only')
    
    latest_gen = latest_entry.energy_gen
    latest_dem = latest_entry.energy_dem
    latest_grid = latest_entry.energy_grid
    
    response_data = aggregated_data[0] if aggregated_data else {}    
    response_data.update({
        'genrt': latest_gen,
        'demrt': latest_dem,
        'gridrt': latest_grid
    })
    
    return Response(response_data)