from rest_framework import serializers

from .models import Task
# from accounts.serializers import UserSerializer

class TaskSerializer(serializers.ModelSerializer):

    # owner = serializers.SlugRelatedField(slug_field='username', read_only=True)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    class Meta:
        model = Task
        fields = '__all__'
