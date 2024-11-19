from django.core.management.base import BaseCommand
from main_app.models import EnergyData
import pandas as pd




class Command(BaseCommand):
    help = 'Registers the data from excel sheet'

    def handle(self, *args, **kwargs):
        data = pd.read_excel('Datos5Min.xlsx')        
        for index, row in data.iterrows():
            anio = row['Año']
            mes = row['Mes']
            dia = row['Dia']
            hora = row['Hora']
            minuto = row['Min']
            meter = row['Meter (W)']
            demand = row['Demanda (W)']
            gen = row['Generación (W)']
            grid = row['Consumo de red (W)']
            extra = row['Excedentes (W)']
            selfa = row['Autoconsumo (W)']
            EnergyData.objects.create(
                energy_meter=meter/12000,
                energy_gen=gen/12000,
                energy_dem=demand/12000,
                energy_grid=grid/12000,
                energy_extra=extra/12000,
                energy_self=selfa/12000,
                timestamp=str(anio) + '-' + str(mes) + '-' + str(dia) + ' ' + str(hora) + ':' + str(minuto) + ':00' 
            )            
        self.stdout.write(self.style.SUCCESS('All entries from excel have been included in EnergyData.'))

