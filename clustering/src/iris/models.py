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


class Pca(models.Model):
  x = models.FloatField()
  y = models.FloatField()
  z = models.FloatField()
  label = models.CharField(max_length=255)

import csv
import os
# self.objects.all().delete()

# with open(os.path.join(os.path.dirname(__file__), 'iris.csv')) as f:
#     reader = csv.reader(f)
#     header = next(reader)
#     Iris.objects.bulk_create([Iris(sepal_length = row[0], 
#     sepal_width = row[1],
#     petal_length = row[2],
#     petal_width = row[3],
#     name = row[4]
#     ) for row in reader])
<<<<<<< Updated upstream
=======


  # def import_db(request): 
  #   f = open('../../iris.csv', 'r')  
  #   for line in f:
  #     line = line.split('!')
  #     tmp = Person.objects.create()
  #     tmp.PersonID = line[0]
  #     tmp.FirstName = line[1]
  #     tmp.LastName = line[2]
  #     tmp.Address = line[3]
  #     tmp.save()

  #   f.close()
>>>>>>> Stashed changes
