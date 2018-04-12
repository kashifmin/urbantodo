from django.contrib import admin
from todoapi.models import Task, SubTask
from safedelete.admin import SafeDeleteAdmin, highlight_deleted

@admin.register(Task)
class TaskAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "title", "due_date", "status") + SafeDeleteAdmin.list_display
    list_filter = ('due_date', ) + SafeDeleteAdmin.list_filter

@admin.register(SubTask)
class SubTaskAdmin(SafeDeleteAdmin):
    list_display = (highlight_deleted, "title", "status") + SafeDeleteAdmin.list_display
    list_filter = SafeDeleteAdmin.list_filter

