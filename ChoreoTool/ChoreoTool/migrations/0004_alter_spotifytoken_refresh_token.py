# Generated by Django 4.0.1 on 2022-02-02 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ChoreoTool', '0003_alter_spotifytoken_refresh_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(default='12', max_length=150),
            preserve_default=False,
        ),
    ]
