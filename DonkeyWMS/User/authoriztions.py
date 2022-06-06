from .models import CustomUser
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # noinspection PyBroadException
        try:
            # 添加了一个手机验证，如果需要其他验证再加
            user = CustomUser.objects.get(Q(username=username) | Q(telephone=username)|Q(email=username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None

