from django.contrib.auth.models import User
from tastypie.resources import ModelResource, Resource
from tastypie.authorization import Authorization
from tastypie import fields
from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication
from tastypie.models import ApiKey
from todoapi.models import Task, SubTask
from django.conf.urls import url


class UserResource(ModelResource):
    class Meta:
        authentication = ApiKeyAuthentication()
        authorization = Authorization()
        queryset = User.objects.all()
        fields = ['email', 'username', 'first_name', 'last_name']
        resource_name = 'user'
    

class SubTaskResource(ModelResource):
    status = fields.CharField(attribute='status')
    class Meta:
        authentication = ApiKeyAuthentication()
        authorization = Authorization()
        queryset = SubTask.objects.all()
        excludes = ['is_complete']
        resource_name = 'subtask'

class TaskResource(ModelResource):
    status = fields.CharField(attribute='status')
    subtasks = fields.ToManyField(SubTaskResource, attribute='subtasks', full=True)
    owner = fields.ForeignKey(UserResource, attribute='owner')
    class Meta:
        authentication = ApiKeyAuthentication()
        authorization = Authorization()
        queryset = Task.objects.all()
        excludes = ['is_complete']
        resource_name = 'task'

    def obj_get_list(self, bundle, **kwargs):
        req_user = bundle.request.user
        try:
            tasks = Task.objects.filter(owner=req_user)
            return tasks
        except:
            return []

    def obj_create(self, bundle, **kwargs):
        bundle.data['owner'] = '/api/v1/user/%s/' % bundle.request.user.id
        print(bundle.data)
        super().obj_create(bundle)
 
class AuthResource(Resource):
    key = fields.CharField(attribute='key')
    user = fields.ForeignKey(UserResource, 'user', full=True)
    
    class Meta:
        authentication = BasicAuthentication()
        allowed_methods = ['get']
        
    def obj_get_list(self, request=None, **kwargs):
        pass
    
    def obj_get(self, request=None, **kwargs):
        req_user = kwargs['bundle'].request.user

        try:
            res = ApiKey.objects.get(user=req_user)
            res.key = None
            res.save()
        except ApiKey.DoesNotExist:
            res = ApiKey.objects.create(user=req_user)


        return res
    
    def prepend_urls(self):
        # URL example: http://127.0.0.1:8000/my_app_name/api/v1/auth/login/
        return [
            url(r'^(?P<resource_name>%s)/login' % self._meta.resource_name, self.wrap_view('dispatch_detail'), name='api_dispatch_detail'),
        ]
