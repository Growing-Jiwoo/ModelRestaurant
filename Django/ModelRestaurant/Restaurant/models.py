from django.db import models


class Modelrestaurant(models.Model):
    bsnsnm = models.CharField(db_column='bsnsNm', max_length=20, blank=True, null=True)  # Field name made lowercase.
    tel = models.CharField(max_length=20, blank=True, null=True)
    menu = models.CharField(max_length=20, blank=True, null=True)
    bsnscond = models.CharField(db_column='bsnsCond', max_length=20, blank=True, null=True)  # Field name made lowercase.
    lat = models.CharField(max_length=20, blank=True, null=True)
    lon = models.CharField(max_length=20, blank=True, null=True)
    gugun = models.CharField(max_length=50, blank=True, null=True)
    addrroad = models.CharField(db_column='addrRoad', max_length=100, blank=True, null=True)  # Field name made lowercase.
    addrjibun = models.CharField(db_column='addrJibun', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'modelrestaurant'
