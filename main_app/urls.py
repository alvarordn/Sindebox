from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('secure/', views.shelly_secure_post, name='shelly_secure_post'),
    path('getdailydata/<str:date_str>/', views.getDailySmartMeterData, name='getDailySmartMeterData'),
    path('getmonthlydata/<str:date_str>/', views.getMonthlySmartMeterData, name='getMonthlySmartMeterData'),
    path('getyearlydata/<str:date_str>/', views.getyearlySmartMeterData, name='getyearlySmartMeterData'),
    path('getcustomdata/<str:date_str1>/<str:date_str2>/', views.getCustomSmartMeterData, name='getCustomSmartMeterData'),
    path('getsummary/', views.getsummary, name='getsummary'),
    path('getrt/', views.getrt, name='getrt'),
]
