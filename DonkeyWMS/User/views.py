from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response

# Create your views here.
from rest_framework import permissions
from rest_framework_simplejwt import authentication

class TestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    def get(self, request, *args, **kwargs):
        return Response({'txt':"Get information successfully!"})

