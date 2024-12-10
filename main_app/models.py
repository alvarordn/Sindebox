from django.db import models
import uuid
from django.utils import timezone

# Create your models here.
class EnergyData(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    energy_meter = models.FloatField(default=0)
    energy_gen = models.FloatField(default=0)
    energy_grid = models.FloatField(default=0)
    energy_dem = models.FloatField(default=0)
    energy_extra = models.FloatField(default=0)
    energy_self = models.FloatField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)
    