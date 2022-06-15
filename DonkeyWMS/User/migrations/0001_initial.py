# Generated by Django 4.0 on 2022-06-15 14:42

import User.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('telephone', models.CharField(max_length=11, unique=True, verbose_name='手机号码')),
                ('email', models.EmailField(max_length=100, null=True, unique=True, verbose_name='邮箱')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='用户名')),
                ('avatar', models.CharField(max_length=200, verbose_name='头像链接')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='加入时间')),
                ('is_active', models.BooleanField(default=True, verbose_name='是否可用')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', User.models.UserManager()),
            ],
        ),
    ]
