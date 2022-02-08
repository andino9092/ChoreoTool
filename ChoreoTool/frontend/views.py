from django.shortcuts import render

def index(request, *args, **kwargs):
    print(request.session.session_key)
    return render(request, 'index.html')