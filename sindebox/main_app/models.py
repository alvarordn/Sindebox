from django.db import models
import uuid
from django.utils import timezone

# Create your models here.
class EnergyData(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    voltage = models.FloatField(default=0)
    current = models.FloatField(default=0)
    power = models.FloatField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)
    