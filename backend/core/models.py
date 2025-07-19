from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=120, blank=True)
    avatar = models.URLField(blank=True, default="")
