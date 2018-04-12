from django_cron import CronJobBase, Schedule
from todoapi.models import Task
from safedelete.models import HARD_DELETE
from datetime import date, timedelta


class DeleteTasksJob(CronJobBase):
    RUN_EVERY_MINS = 24*60 # every 24 hours

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'todoapi.delete_tasks'    # a unique code

    def do(self):
        before_30_days = date.today() + timedelta(-30)
        # hard delete all soft deleted tasks
        delete_count = 0
        for t in Task.objects.deleted_only().filter(due_date__lte=before_30_days):
            t.delete(force_policy=HARD_DELETE)
            delete_count += 1
        print('Deleted', delete_count, 'tasks on', str(date.today()))