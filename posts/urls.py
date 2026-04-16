from django.urls import path
from .views import gallery_view, ideas_view

urlpatterns = [
    path('gallery/', gallery_view, name="gallery"),
    path('sideas/', ideas_view, name="ideas"),
]