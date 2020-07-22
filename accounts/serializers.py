from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from api.serializers import TaskSerializer

class UserSerializer(serializers.ModelSerializer):

    tasks = TaskSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'tasks',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user