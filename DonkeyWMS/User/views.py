from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from User.models import CustomUser

# Create your views here.
from rest_framework import permissions
from rest_framework_simplejwt import authentication

class TestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    def get(self, request, *args, **kwargs):
        return Response({'txt':"Get information successfully!"})

class CurrentUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    def get(self, request, *args, **kwargs):
        currentUser = CustomUser.objects.get(id=request.user.id)
        currentUserData = {
            'name': currentUser.username,
            'userid': currentUser.id,
            'email': currentUser.email,
        }
        return Response(currentUserData)


class UserOutLoginView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    def post(self, request, *args, **kwargs):
        return Response({'status':'out login success'})