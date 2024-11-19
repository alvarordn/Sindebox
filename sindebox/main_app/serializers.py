from rest_framework import serializers
from .models import EnergyData

class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyData
        fields = ['id', 'energy_meter', 'energy_gen', 'energy_dem', 'energy_grid', 'energy_extra', 'energy_self', 'timestamp']
