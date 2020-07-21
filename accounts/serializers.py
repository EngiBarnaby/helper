from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from api.models import Task

class UserSerializer(serializers.ModelSerializer):

    todos = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'todos',)
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