# Generated by Django 5.1.2 on 2024-11-19 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_remove_energydata_current_remove_energydata_power_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='energydata',
            name='energy_dem',
            field=models.FloatField(default=0),
        ),
    ]
