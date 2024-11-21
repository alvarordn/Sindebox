from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/secure/', views.shelly_secure_post, name='shelly_secure_post'),
    path('api/getdailydata/<str:date_str>/', views.getDailySmartMeterData, name='getDailySmartMeterData'),
    path('api/getmonthlydata/<str:date_str>/', views.getMonthlySmartMeterData, name='getMonthlySmartMeterData'),
    path('api/getyearlydata/<str:date_str>/', views.getyearlySmartMeterData, name='getyearlySmartMeterData'),
    path('api/getcustomdata/<str:date_str1>/<str:date_str2>/', views.getCustomSmartMeterData, name='getCustomSmartMeterData'),
    path('api/getsummary/', views.getsummary, name='getsummary'),
    path('api/getrt/', views.getrt, name='getrt'),
]
