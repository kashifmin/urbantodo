from django.contrib import admin
from todoapi.models import Task, SubTask

# Register your models here.
admin.site.register([Task, SubTask])
