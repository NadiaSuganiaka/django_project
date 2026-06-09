from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Photo

@require_POST
def save_photo(request):
    image = request.FILES.get('image')
    if not image:
        return JsonResponse({'error': 'no image'}, status=400)
    
    photo = Photo.objects.create(
        image=image,
        owner=request.user if request.user.is_authenticated else None
    )

    session_photos = request.session.get('pending_photos', [])
    session_photos.append(photo.id)
    request.session['pending_photos'] = session_photos

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'feed',
        {'type': 'new_photo'}
    )

    return JsonResponse({
        'status': 'ok',
        'photo_id': photo.id,
        'count': len(session_photos)
    })

def camera_view(request):
    request.session['pending_photos'] = []  # ← скидаємо при відкритті камери
    return render(request, 'photos/camera.html')