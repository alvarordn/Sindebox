import sys
import os
import pandas as pd
import django

sys.path.append("C:/Users/Alvaro/Desktop/projects/Sindebox/sindebox/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sindebox.settings")
django.setup()

data = pd.read_excel('Datos5Min.xlsx')

for index, row in data.iterrows():
    anio = row['Año']
    mes = row['Mes']
    dia = row['Dia']
    hora = row['Hora']
    minuto = row['Min']
    meter = row['Meter (W)']
    gen = row['Generación (W)']
    grid = row['Consumo de red (W)']
    extra = row['Excedentes (W)']
    selfa = row['Autoconsumo (W)']
    data_n = {
        'meter': meter,
        'gen': gen,
        'grid': grid,
        'extra': extra,
        'selfa': selfa,
        'timestamp': str(anio) + '-' + str(mes) + '-' + str(dia) + ' ' + str(hora) + ':' + str(minuto) + ':00' 
        }  
    




from main_app.models import MiModelo