from django.contrib.auth import authenticate
from django.shortcuts import render
from django.contrib.auth.models import User

from api.serializers import TaskSerializer

from rest_framework import generics, status
from rest_framework.decorators import api_view
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
        user_id = user.id
        if user:
            return Response({"token": user.auth_token.key,"id": user_id})
        else:
            return Response({"error": "Нет доступа"}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = ()

    def post(self, request,):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        user_id = user.id
        if user:
            return Response({"token": user.auth_token.key,"id": user_id})
        else:
            return Response({"error": "Нет доступа"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def UsertaskList(request, username):
    user = User.objects.get(username=username)
    userTasks = user.tasks.all()
    serializer = TaskSerializer(userTasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def GetUserData(request):
    username = request.user.username
    return Response(username)

class UsersList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = ()
    permission_classes = ()
