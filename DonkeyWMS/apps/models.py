from django.db import models

# Create your models here.
class GoodsCategory(models.Model):
    """产品分类"""
    name = models.CharField(max_length=64, verbose_name='名称', unique=True)
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')

class GoodsUnit(models.Model):
    """产品单位"""
    name = models.CharField(max_length=64, verbose_name='名称')
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')

class Goods(models.Model):
    """产品"""
    number = models.CharField(max_length=32, verbose_name='编号')
    name = models.CharField(max_length=64, verbose_name='名称')

    category = models.ForeignKey('GoodsCategory', on_delete=models.SET_NULL, null=True,
                          related_name='goods_set', verbose_name='产品分类')
    unit = models.ForeignKey('GoodsUnit', on_delete=models.SET_NULL, null=True,
                      related_name='goods_set', verbose_name='产品单位')
    spec = models.CharField(max_length=64, null=True, blank=True, verbose_name='规格')

    price = models.FloatField(verbose_name='销售价')

    batch = models.CharField(max_length=64, null=True, blank=True, verbose_name='批次号')

    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')
