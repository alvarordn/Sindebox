from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('', views.main_view, name='main_view'),
    # path('datos/', views.datos, name='datos'),
    # path('dato/<str:pk>/', views.dato, name='dato'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/secure/', views.shelly_secure_post, name='shelly_secure_post'),
    path('api/getdata/<str:date_str>/', views.getSmartMeterData, name='getSmartMeterData'),
]
