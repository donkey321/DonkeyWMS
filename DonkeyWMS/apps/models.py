from django.db import models

# Create your models here.
class GoodsCategory(models.Model):
    """产品分类"""
    name = models.CharField(max_length=64, verbose_name='名称', unique=True)
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')

class GoodsUnit(models.Model):
    """产品单位"""
    name = models.CharField(max_length=64, verbose_name='名称', unique=True)
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')

class Warehouse(models.Model):
     """仓库"""
     number = models.CharField(max_length=32, verbose_name="编号")
     name = models.CharField(max_length=64, verbose_name='仓库', unique=True)
     remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')
     manager = models.ForeignKey('User.CustomUser', on_delete=models.CASCADE, related_name='warehouses')
     phone = models.CharField(max_length=32, null=True, blank=True, verbose_name="电话")
     address = models.CharField(max_length=256, null=True, blank=True, verbose_name="地址")



class Goods(models.Model):
    """产品"""
    number = models.CharField(max_length=32, verbose_name='编号')
    name = models.CharField(max_length=64, verbose_name='名称')

    category = models.ForeignKey('GoodsCategory', on_delete=models.SET_NULL, null=True,
                          related_name='goods_set', verbose_name='产品分类')
    unit = models.ForeignKey('GoodsUnit', on_delete=models.SET_NULL, null=True,
                      related_name='goods_set', verbose_name='产品单位')
    warehouse = models.ForeignKey('Warehouse', on_delete=models.SET_NULL, null=True,
                    related_name="goods_set", verbose_name="所在仓库")

    spec = models.CharField(max_length=64, null=True, blank=True, verbose_name='规格')

    price = models.FloatField(verbose_name='销售价')

    batch = models.CharField(max_length=64, null=True, blank=True, verbose_name='批次号')

    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')

    quantity = models.CharField(max_length=16, default='0', verbose_name='数量')


class StockWater(models.Model):
    """库存流水"""
    goods = models.ForeignKey("Goods", on_delete=models.CASCADE,
                related_name='stockwater', verbose_name="商品")
    handler = models.ForeignKey('User.CustomUser', on_delete=models.CASCADE, related_name='stockwater')
    changeValue = models.CharField(max_length=16, verbose_name="变化数量")
    remark = models.CharField(max_length=256, null=True, blank=True, verbose_name='备注')
    stockType = models.CharField(max_length=8, choices=(('stockIn','入库'),('stockOut','出库')),verbose_name='流水类型')
