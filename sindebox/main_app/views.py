from django.shortcuts import render
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from .models import EnergyData
import json
from django.conf import settings
from urllib.parse import urlparse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@csrf_exempt
@api_view(['POST'])
def my_shelly(request):
    url = request.build_absolute_uri()
    
    parsed_url = urlparse(url)
    auth = parsed_url.netloc.split('@')[0]  
    
    if ':' not in auth:
        return HttpResponseForbidden("No authentication credentials found in URL")    
    username, password = auth.split(':')

    if username != 'sindetec' or password != settings.SHELLY_PASSWORD:
        return HttpResponseForbidden("Invalid authentication credentials")

    try:
        request_body = request.body.decode('utf-8')
        data = json.loads(request_body)
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        return HttpResponseForbidden(f"Invalid JSON or encoding: {str(e)}")

    EnergyData.objects.create(
        voltage=data.get('voltage', 0),
        current=data.get('current', 0),
        power=data.get('power', 0)
    )

    return JsonResponse({'status': 'success'})

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

