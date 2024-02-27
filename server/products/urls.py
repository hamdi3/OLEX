import statistics
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from server import settings
from .views import ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

