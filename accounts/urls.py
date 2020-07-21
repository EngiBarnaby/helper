from django.urls import path
from .views import UserCreate, LoginView, Tasks, UsersList

urlpatterns = [
    path('user-create/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name="login"),
    path('tasks/', Tasks.as_view(), name="tasks"),
    path('users-list/', UsersList.as_view(), name='users-list'),
]