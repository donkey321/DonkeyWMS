# Generated by Django 4.0 on 2022-06-25 03:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0002_goods_warehouse'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='quantity',
            field=models.CharField(default='0', max_length=16, verbose_name='数量'),
        ),
    ]
