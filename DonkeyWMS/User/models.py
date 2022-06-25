from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, telephone, username, password, **extra_fields):
        # if not telephone:
        #     raise ValueError('The given telephone must be set')
        if not username:
            raise ValueError('The given username must be set')
        if not password:
            raise ValueError('The given password must be set')

        user = self.model(telephone=telephone, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, telephone, username, password=None, **extra_fields):
        """
        创建普通用户
        """
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_staff', True)
        return self._create_user(telephone, username, password, **extra_fields)

    def create_superuser(self, telephone, username, password, **extra_fields):
        """
        创建超级用户
        """
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(telephone, username, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    重写django的User
    """
    telephone = models.CharField(unique=True, max_length=11, verbose_name="手机号码")
    email = models.EmailField(unique=True, max_length=100, verbose_name='邮箱', null=True)
    username = models.CharField(unique=True, max_length=100, verbose_name="用户名")
    avatar = models.CharField(max_length=200, verbose_name='头像链接')
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name='加入时间')
    is_active = models.BooleanField(default=True, verbose_name="是否可用")
    is_staff = models.BooleanField(default=False, verbose_name="是否可以登录admin")

    objects = UserManager()

    EMAIL_FIELD = 'email'
    # 定义登录的校验字段，默认为username
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['telephone','email']

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
