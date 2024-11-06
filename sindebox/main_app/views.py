from django.shortcuts import render
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from .models import EnergyData
import json
import hmac
import hashlib
from django.utils.encoding import force_bytes
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


def verify_hmac(request_body, provided_signature, secret_key):
    expected_signature = hmac.new(
        force_bytes(secret_key),
        msg=force_bytes(request_body),
        digestmod=hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, provided_signature)

@csrf_exempt  
@api_view(['POST'])
def my_shelly(request):
    request_body = request.body.decode('utf-8')
    provided_signature = request.headers.get('X-Signature')  

    if not verify_hmac(request_body, provided_signature, settings.SHELLY_SECRET_KEY):
        return HttpResponseForbidden("Invalid HMAC signature")

    data = json.loads(request_body)
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

