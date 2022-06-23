from rest_framework import serializers
from apps.models import *


class GoodsCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = ('id', 'name', 'remark')


class GoodsUnitSerializers(serializers.ModelSerializer):
    class Meta:
        model = GoodsUnit
        fields = ('id', 'name', 'remark')
