from rest_framework import serializers
from apps.models import *
from User.serializers import UserSerializer
from User.models import CustomUser
import pprint


class GoodsCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = ('id', 'name', 'remark')


class GoodsUnitSerializers(serializers.ModelSerializer):
    class Meta:
        model = GoodsUnit
        fields = ('id', 'name', 'remark')


class WarehouseSerializers(serializers.ModelSerializer):
    manager = serializers.SerializerMethodField()
    class Meta:
        model = Warehouse
        fields = ('id','number', 'name', 'remark', 'manager', 'phone', 'address')
    
    def get_manager(self, obj):
        return {'id':obj.manager.id, 'username': obj.manager.username}

    def create(self, validated_data):
        requestData=self.context["request"].data
        manager = CustomUser.objects.get(id=requestData["manager"])
        return Warehouse.objects.create(manager=manager, **validated_data)


class GoodsSerializers(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()
    warehouse = serializers.SerializerMethodField()
    
    class Meta:
        model = Goods
        fields = ('id','number', 'name', 
                'category', 'unit', 'warehouse', 
                'spec', 'price', 'batch', 'remark', 'quantity')
    
    def get_category(self, obj):
        return {'id':obj.category.id, 'name': obj.category.name}

    def get_unit(self, obj):
        return {'id':obj.unit.id, 'name': obj.unit.name}

    def get_warehouse(self, obj):
        return {'id':obj.warehouse.id, 'name': obj.warehouse.name}

    def create(self, validated_data):
        requestData=self.context["request"].data
        pprint.pprint(requestData)
        category = GoodsCategory.objects.get(id=requestData["category"])
        unit = GoodsUnit.objects.get(id=requestData["unit"])
        warehouse = Warehouse.objects.get(id=requestData["warehouse"])
        return Goods.objects.create(category=category, unit=unit, warehouse=warehouse, **validated_data)


class StockWaterSerializers(serializers.ModelSerializer):
    handler = serializers.SerializerMethodField()
    goods = serializers.SerializerMethodField()
    class Meta:
        model = StockWater
        fields = ('id','goods', 'handler', 'changeValue', 'remark', 'stockType')
    
    def get_handler(self, obj):
        return {'id':obj.handler.id, 'username': obj.handler.username}

    def get_goods(self, obj):
        return {'id':obj.goods.id, 'name': obj.goods.name, 'quantity': obj.goods.quantity}

    def create(self, validated_data):
        requestData=self.context["request"].data
        goods = Goods.objects.get(id=requestData["goods"])
        if validated_data['stockType'] == 'stockIn':
            goods.quantity = str(int(goods.quantity)+int(validated_data['changeValue']))
            goods.save()
        
        if validated_data['stockType'] == 'stockOut':
            goods.quantity = str(int(goods.quantity)-int(validated_data['changeValue']))
            goods.save()
        currentUser = self.context['request'].user
        handler = CustomUser.objects.get(id=currentUser.id)
        return StockWater.objects.create(handler=handler, goods=goods, **validated_data)

