from django.db import models
from django.contrib.auth.models import User
from safedelete.models import SafeDeleteModel, SOFT_DELETE_CASCADE
from safedelete.managers import SafeDeleteManager, DELETED_ONLY_VISIBLE, DELETED_INVISIBLE, DELETED_VISIBLE
# Create your models here.


class Task(SafeDeleteModel):
    title = models.CharField(max_length=240)
    is_complete = models.BooleanField(default=False)
    due_date = models.DateField()
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    _safedelete_policy = SOFT_DELETE_CASCADE

    def __str__(self):
        return self.title

    @property
    def status(self):
        subtasks = SubTask.objects.filter(parent=self)
        if len(subtasks) == 0:
            return 'Complete' if self.is_complete else 'Pending'
        for i in subtasks:
            if not i.is_complete:
                return 'Pending'
        return 'Complete'
        
    @status.setter
    def status(self, value):
        self.is_complete = True if value == 'Complete' else False
        

    @property
    def subtasks(self):
        try:
            subtasks = SubTask.objects.filter(parent=self)
            return subtasks
        except Exception:
            return []

class SubTask(SafeDeleteModel):
    title = models.CharField(max_length=240)
    is_complete = models.BooleanField(default=False)

    parent = models.ForeignKey(Task, on_delete=models.CASCADE)

    @property
    def status(self):
        return 'Complete' if self.is_complete else 'Pending'

    @status.setter
    def status(self, value):
        self.is_complete = True if value == 'Complete' else False

    def __str__(self):
        return self.title
