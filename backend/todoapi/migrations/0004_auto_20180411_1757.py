# Generated by Django 2.0.4 on 2018-04-11 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapi', '0003_auto_20180411_0641'),
    ]

    operations = [
        migrations.AddField(
            model_name='subtask',
            name='deleted',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='deleted',
            field=models.DateTimeField(editable=False, null=True),
        ),
    ]
