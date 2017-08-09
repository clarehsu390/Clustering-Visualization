# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# from django.core.urlresolvers import reverse
# from django.template.defaultfilters import slugify
from django.db import models

# Create your models here.

class Iris(models.Model):
    sepal_length = models.FloatField()
    sepal_width = models.FloatField()
    petal_length = models.FloatField()
    petal_width = models.FloatField()
    name = models.CharField(max_length=255)
