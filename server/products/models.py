from django.db import models
from users.models import Website_User

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    seller = models.ForeignKey(Website_User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
