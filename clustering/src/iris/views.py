# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from .models import Iris

import json


# Create your views here.


def index(request):
    iris = Iris.objects.values("petal_width", "petal_length", "sepal_length", "sepal_width", "name")
    iris_list = json.dumps(list(iris))
    context = {'iris_list': iris_list}
    return render(request,'iris/index.html', context)
