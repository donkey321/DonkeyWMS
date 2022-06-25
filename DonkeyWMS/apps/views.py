from rest_framework.viewsets import ModelViewSet
from apps.serializers import *
from apps.models import *
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

class WarehouseView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializers

class GoodsView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializers

class StockWaterView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]
    queryset = StockWater.objects.all()
    serializer_class = StockWaterSerializers
