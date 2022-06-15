from rest_framework import serializers
from .models import *

class GoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = ('id', 'name', 'remark')
