from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def register(request):
    if request.method != 'POST':
        form = UserCreationForm()
        return render(request, 'accounts/register.html', {'form': form})

    form = UserCreationForm(request.POST)

    if not form.is_valid():
        return render(request, 'accounts/register.html', {'form': form})

    user = form.save()
    login(request, user)
    
    username = form.cleaned_data.get('username')
    messages.success(request, f'Акаунт {username} успішно створено!')
    
    return redirect('profile')

@login_required
def profile(request):
    return render(request, "accounts/profile.html", { "user": request.user })