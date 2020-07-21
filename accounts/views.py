from django.contrib.auth import authenticate
from django.shortcuts import render
from django.contrib.auth.models import User

from api.models import Task
from api.serializers import TaskSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer

class UserCreate(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class Tasks(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class UsersList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = ()
    permission_classes = ()

# def