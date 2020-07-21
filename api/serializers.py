from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    class Meta:
        model = Task
        fields = '__all__'
