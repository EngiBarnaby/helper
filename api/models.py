from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    text = models.CharField(max_length=200,blank=True, null=True)
    done = models.BooleanField(default=False, blank=True, null=True)
    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.text


