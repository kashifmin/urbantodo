from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from todoapi.models import Task

class TaskResource(ModelResource):
    class Meta:
        authorization = Authorization()
        queryset = Task.objects.all()
