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

# def basic_auth(request):
#     auth_header = request.headers.get('Authorization', None)
#     if auth_header is None or not auth_header.startswith('Basic '):
#         return None, None        
#     auth_value = auth_header[6:]  
#     decoded_value = b64decode(auth_value).decode('utf-8')  
#     username, password = decoded_value.split(':')
#     return username, password

# @csrf_exempt
# def my_shelly(request):
#     username, password = basic_auth(request)
#     if username is None or password is None:
#         return HttpResponse('no credentials')
#     if username != "sindetec" or password != "macarena":
#         return HttpResponse('Invalid credentials')
#     try:
#         request_body = request.body.decode('utf-8')
#         data = json.loads(request_body)
#     except (json.JSONDecodeError, UnicodeDecodeError) as e:
#         return HttpResponse('Invalid JSON')
#     data = json.loads(request.body)
#     EnergyData.objects.create(
#         voltage=data['voltage'],
#         current=data['current'],
#         power=data['power']
#     )
#     return HttpResponse('success')

#     # if request.method == 'POST':
#     #     data = json.loads(request.body)
#     #     EnergyData.objects.create(
#     #         voltage=data['voltage'],
#     #         current=data['current'],
#     #         power=data['power']
#     #     )
#     #     return JsonResponse({'status': 'success'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shelly_secure_post(request):
    data = json.loads(request.body)
    EnergyData.objects.create(
        voltage=data['voltage'],
        current=data['current'],
        power=data['power']
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


# def main_view(request):
#     return render(request, 'main_app/main_view.html')

# def datos(request):
#     return render(request, 'main_app/datos.html', {'datos': EnergyData.objects.all() })

# def dato(request, pk):
#     for i in EnergyData.objects.all():
#         if str(i.id) == pk:            
#             EnergyObj = i
#             break
#     return render(request, 'main_app/dato.html', {'dato': EnergyObj})

