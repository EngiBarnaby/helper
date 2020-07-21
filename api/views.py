from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, permissions

from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
def apiOverView(request):
    api_url = {
        "All tasks": 'api/all-tasks/',
        "Task details": 'api/task-detail/pk/',
        'Create task': 'api/task-create/',
        'Update task': 'api/task-update/',
    }
    return Response(api_url)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response("Задание удалено")

# from .serializers import TodoSerializer
# from todos.models import Todo  # remove


# class TodoViewSet(viewsets.ModelViewSet):
#     # queryset = Task.objects.all()  # remove
#     serializer_class = TaskSerializer
#     permission_classes = [permissions.IsAuthenticated]  # added
#
#     def get_queryset(self):  # added
#         return self.request.user.todos.all()
#
#     def perform_create(self, serializer):  # added
#         serializer.save(owner=self.request.user)