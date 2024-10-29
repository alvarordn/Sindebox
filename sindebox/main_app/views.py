from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import EnergyData
import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def my_secure_view(request):
    data = request.data
    return Response({"message": "Datos recibidos correctamente"})


def main_view(request):
    # if request.method == 'POST':
    #     data = json.loads(request.body)
    #     EnergyData.objects.create(
    #         voltage=data['voltage'],
    #         current=data['current'],
    #         power=data['power']
    #     )
    #     return JsonResponse({'status': 'success'})
    return render(request, 'main_app/main_view.html')

def datos(request):
    return render(request, 'main_app/datos.html', {'datos': EnergyData.objects.all() })

def dato(request, pk):
    for i in EnergyData.objects.all():
        if str(i.id) == pk:            
            EnergyObj = i
            break
    return render(request, 'main_app/dato.html', {'dato': EnergyData})

