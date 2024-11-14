from django.core.management.base import BaseCommand
from main_app.models import EnergyData

class Command(BaseCommand):
    help = 'Deletes all entries in the EnergyData model'

    def handle(self, *args, **kwargs):
        EnergyData.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('All entries in EnergyData have been deleted.'))