from django.urls import path
from .views import CustomTokenRefreshView, UserRegistrationView,UserLoginView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('refresh_token/', CustomTokenRefreshView.as_view(), name='generate-new-acesstoekn'),
]
