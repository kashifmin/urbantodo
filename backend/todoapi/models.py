from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=240)
    is_complete = models.BooleanField(default=False)
    due_date = models.DateField()
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def status(self):
        try:
            subtasks = SubTask.objects.filter(parent=self)
            for i in subtasks:
                if not i.is_complete:
                    return 'Pending'
            return 'Complete'
        except Exception:
            return 'Complete' if self.is_complete else 'Pending'

    @property
    def subtasks(self):
        try:
            subtasks = SubTask.objects.filter(parent=self)
            return subtasks
        except Exception:
            return []

class SubTask(models.Model):
    title = models.CharField(max_length=240)
    is_complete = models.BooleanField(default=False)

    parent = models.ForeignKey(Task, on_delete=models.CASCADE)

    @property
    def status(self):
        return 'Complete' if self.is_complete else 'Pending'

    def __str__(self):
        return self.title

