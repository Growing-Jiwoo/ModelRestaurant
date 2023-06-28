# Generated by Django 3.2 on 2022-12-15 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Modelrestaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bsnsnm', models.CharField(blank=True, db_column='bsnsNm', max_length=20, null=True)),
                ('tel', models.CharField(blank=True, max_length=20, null=True)),
                ('menu', models.CharField(blank=True, max_length=20, null=True)),
                ('bsnscond', models.CharField(blank=True, db_column='bsnsCond', max_length=20, null=True)),
                ('lat', models.CharField(blank=True, max_length=20, null=True)),
                ('lon', models.CharField(blank=True, max_length=20, null=True)),
                ('gugun', models.CharField(blank=True, max_length=50, null=True)),
                ('addrroad', models.CharField(blank=True, db_column='addrRoad', max_length=100, null=True)),
                ('addrjibun', models.CharField(blank=True, db_column='addrJibun', max_length=100, null=True)),
            ],
            options={
                'db_table': 'modelrestaurant',
                'managed': False,
            },
        ),
    ]
