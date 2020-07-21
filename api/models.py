from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    text = models.CharField(max_length=200,blank=True, null=True)
    done = models.BooleanField(default=False, blank=True, null=True)
    owner = models.ForeignKey(User, related_name='todos', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.text

# class CustomUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     email = models.EmailField()
#     date_created = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.user


