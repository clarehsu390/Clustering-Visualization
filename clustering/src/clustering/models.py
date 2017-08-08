from django.db import models

class Iris(models.Model):
    sepal_length = models.FloatField()
    sepal_width = models.FloatField()
    petal_length = models.Floatfield()
    petal_width = models.Floatfield
    name = models.CharField()