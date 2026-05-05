from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from photos.models import Photo
from .models import Post, Idea
from django.contrib.auth.decorators import login_required

@login_required
def gallery_view(request):
    posts = Post.objects.filter(author=request.user).prefetch_related('photos').order_by('-created_at')
    
    return render(request, 'posts/gallery.html', {'posts': posts})

def ideas_view(request):
    ideas = Idea.objects.select_related('photo').order_by('-created_at')
    print('IDEAS:', ideas)
    return render(request, 'posts/ideas.html', {'ideas': ideas})

def preview(request):
    ids = request.session.get('pending_photos', [])
    photos = Photo.objects.filter(id__in=ids)
    return render(request, 'posts/preview.html', {'photos': photos})

@require_POST
def delete_from_preview(request, photo_id):
    ids = request.session.get('pending_photos', [])
    ids = [i for i in ids if i != photo_id]
    request.session['pending_photos'] = ids
    Photo.objects.filter(id=photo_id).delete()
    return JsonResponse({'status': 'ok'})

@login_required
@require_POST
def create_post(request):
    ids = request.session.get('pending_photos', [])
    if not ids:
        return JsonResponse({'error': 'no photos'}, status=400)

    post = Post.objects.create(
        author=request.user if request.user.is_authenticated else None
    )
    post.photos.set(ids)
    post.save()

    del request.session['pending_photos']

    return JsonResponse({'status': 'ok', 'redirect': '/posts/gallery/'})

@login_required
@require_POST
def delete_post(request, post_id):
    post = Post.objects.get(id=post_id)
    post.delete()
    return JsonResponse({'status': 'ok'})