from django.urls import path
from .views import UserCreate, LoginView, UsersList, UsertaskList, GetUserData

urlpatterns = [
    path('user-create/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name="login"),
    path('users-list/', UsersList.as_view(), name='users-list'),
    path('user-tasks/<str:username>/', UsertaskList, name='user-tasks'),
    path('get-data/', GetUserData, name='get-data'),
]