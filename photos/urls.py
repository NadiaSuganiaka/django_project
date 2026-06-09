from django.urls import path
from .views import camera_view, save_photo

urlpatterns = [
   path('', camera_view, name='camera'),
   path('save/', save_photo, name="save_photo")
]

