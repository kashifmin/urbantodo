from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    STATUSES = (
        ('P', 'Pending'),
        ('C', 'Complete'),
    )
    title = models.CharField(max_length=240)
    task_status = models.CharField(max_length=1, choices=STATUSES)
    due_date = models.DateField()
    
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def status(self):
        try:
            subtasks = SubTask.objects.filter(parent=self)
            for i in subtasks:
                if i.task_status == 'Pending':
                    return 'Pending'
        except Exception:
            return self.task_status

    @property
    def subtasks(self):
        try:
            subtasks = SubTask.objects.filter(parent=self)
            return subtasks
        except Exception:
            return []

class SubTask(models.Model):
    STATUSES = (
        ('P', 'Pending'),
        ('C', 'Complete'),
    )
    title = models.CharField(max_length=240)
    status = models.CharField(max_length=1, choices=STATUSES)

    parent = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

