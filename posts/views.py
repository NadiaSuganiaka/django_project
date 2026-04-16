from django.shortcuts import render

def gallery_view(request):
    return render(request, 'posts/gallery.html')

def ideas_view(request):
    return render(request, 'posts/ideas.html')
