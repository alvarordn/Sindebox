from django.shortcuts import render
from django.http import JsonResponse
from .models import EnergyData
import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_secure_view(request):
    data = json.loads(request.body)
    EnergyData.objects.create(
        voltage=data['voltage'],
        current=data['current'],
        power=data['power']
    )
    return JsonResponse({'status': 'success'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_shelly(request):
    data = json.loads(request.body)
    EnergyData.objects.create(
        voltage=data['voltage'],
        current=data['current'],
        power=data['power']
    )
    return JsonResponse({'status': 'success'})

def main_view(request):
    return render(request, 'main_app/main_view.html')

def datos(request):
    return render(request, 'main_app/datos.html', {'datos': EnergyData.objects.all() })

def dato(request, pk):
    for i in EnergyData.objects.all():
        if str(i.id) == pk:            
            EnergyObj = i
            break
    return render(request, 'main_app/dato.html', {'dato': EnergyObj})

