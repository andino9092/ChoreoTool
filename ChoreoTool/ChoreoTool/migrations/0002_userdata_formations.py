# Generated by Django 4.0.1 on 2022-02-02 06:45

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ChoreoTool', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spotifyId', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Formations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('formations', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=2), size=None), size=None)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ChoreoTool.userdata')),
            ],
        ),
    ]
