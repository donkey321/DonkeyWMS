from rest_framework.viewsets import ModelViewSet
from apps.serializers import GoodsCategorySerializers, GoodsUnitSerializers
from apps.models import GoodsCategory,GoodsUnit
from rest_framework import permissions
from rest_framework_simplejwt import authentication

class GoodsCategoryView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    queryset = GoodsCategory.objects.all()
    serializer_class = GoodsCategorySerializers

class GoodsUnitView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    queryset = GoodsUnit.objects.all()
    serializer_class = GoodsUnitSerializers