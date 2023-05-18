from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, access_code, password=None, **extra_fields):
        if not access_code:
            raise ValueError('User must have an access_code address')

        user = self.model(access_code=access_code, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, access_code, password, **extra_fields):
        user = self.create_user(access_code, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    access_code = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'access_code'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.access_code