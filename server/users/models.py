from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Website_User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    username = models.CharField(max_length=30, unique=True, blank=False)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    address = models.CharField(max_length=30, blank=True)
    seller = models.BooleanField(blank=False)

    groups = models.ManyToManyField(Group, related_name='website_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='website_user_set', blank=True)

    def __str__(self):
        return self.username
