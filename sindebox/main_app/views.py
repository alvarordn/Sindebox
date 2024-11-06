from django.shortcuts import render
from django.http import JsonResponse, HttpResponseForbidden
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import EnergyData
import json
from base64 import b64decode
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def basic_auth(request):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None or not auth_header.startswith('Basic '):
        return None        
    auth_value = auth_header[6:]  
    decoded_value = b64decode(auth_value).decode('utf-8')  
    username, password = decoded_value.split(':')
    return username, password

@csrf_exempt
@api_view(['POST'])
def my_shelly(request):
    username, password = basic_auth(request)
    if username is None or password is None:
        return HttpResponseForbidden("No authentication credentials found")
    if username != "sindetec" or password != "macarena":
        return HttpResponseForbidden("Invalid authentication credentials")
    try:
        request_body = request.body.decode('utf-8')
        data = json.loads(request_body)
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        return HttpResponseForbidden(f"Invalid JSON or encoding: {str(e)}")


    data = json.loads(request.body)
    EnergyData.objects.create(
        voltage=data['voltage'],
        current=data['current'],
        power=data['power']
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

