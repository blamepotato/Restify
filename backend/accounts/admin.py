from django.conf import settings
from django.contrib import admin

# Register your models here.
from accounts.models import User


class UserAdmin(admin.ModelAdmin):
    model = User


admin.site.register(User, UserAdmin)
