from django.contrib.auth.models import User
from tastypie.resources import ModelResource, Resource, ALL
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
        excludes = ['is_complete', 'deleted']
        resource_name = 'subtask'

class TaskResource(ModelResource):
    status = fields.CharField(attribute='status')
    subtasks = fields.ToManyField(SubTaskResource, attribute='subtasks', full=True)
    owner = fields.ForeignKey(UserResource, attribute='owner')
    class Meta:
        authentication = ApiKeyAuthentication()
        authorization = Authorization()
        queryset = Task.objects.all()
        excludes = ['is_complete', 'deleted']
        resource_name = 'task'
        filtering = {
            'title': ALL,
            'owner': ALL,
            'due_date': ALL
        }
    
    def conver_due_date_filter(self, filter_dict):
        '''
            Converts filter value for due date of the form:
                today, this week, next week, over due
            into a valid date range
        '''
        from datetime import date, timedelta
        import todoapi.date_utils as dtu
        value = filter_dict['due_date']
        del filter_dict['due_date']

        today = date.today()
        if value == 'today':
            filter_dict['due_date__exact'] = today
        elif value == 'this week':
            filter_dict['due_date__range'] = dtu.week_range(today)
        elif value == 'next week':
            filter_dict['due_date__range'] = dtu.week_range(today + timedelta(7))
        elif value == 'overdue':
            filter_dict['due_date__lt'] = today
        
    def obj_get_list(self, bundle, **kwargs):
        req_user = bundle.request.user
        
        filters = {}

        if hasattr(bundle.request, 'GET'):
            # Grab a mutable copy.
            filters = bundle.request.GET.copy()

        # Update with the provided kwargs.
        filters.update(kwargs)
        # update to filter by currently authorized user
        filters['owner'] = req_user

        # filter by due_date if needed
        # here custom processing is necessary since we expect
        # get params of the form due_date__range=today
        print('filters are ', filters)
        due_date_filter = 'due_date'
        if due_date_filter in filters:
            self.conver_due_date_filter(filters)

        print(filters)
        applicable_filters = self.build_filters(filters=filters)
        # print(applicable_filters)
        print(applicable_filters)

        try:
            objects = self.apply_filters(bundle.request, applicable_filters)
            return self.authorized_read_list(objects, bundle)
        except ValueError:
            raise Exception("Invalid resource lookup data provided (mismatched type).")


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
