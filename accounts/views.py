from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .forms import UserRegisterForm

def register(request):
    if request.method != 'POST':
        form = UserRegisterForm()
        return render(request, 'accounts/register.html', {'form': form})

    form = UserRegisterForm(request.POST)

    if not form.is_valid():
        return render(request, 'accounts/register.html', {'form': form})

    user = form.save()
    login(request, user)
    
    username = form.cleaned_data.get('username')
    messages.success(request, f'Акаунт {username} успішно створено!')
    
    return redirect('home')