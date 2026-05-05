from django.urls import path
from .views import gallery_view, ideas_view, preview, delete_from_preview, create_post, delete_post

urlpatterns = [
    path('gallery/', gallery_view, name="gallery"),
    path('ideas/', ideas_view, name="ideas"),
    path('preview/', preview, name='preview'),
    path('preview/delete/<int:photo_id>/', delete_from_preview, name='delete_from_preview'),
    path('create/', create_post, name='create_post'),
    path('<int:post_id>/delete/', delete_post, name='delete_post'),
]