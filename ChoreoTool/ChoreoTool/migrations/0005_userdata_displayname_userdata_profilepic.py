# Generated by Django 4.0.2 on 2022-02-10 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ChoreoTool', '0004_alter_spotifytoken_refresh_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='displayName',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='userdata',
            name='profilePic',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
