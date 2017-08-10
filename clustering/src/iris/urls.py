
from django.conf.urls import url 

from .import views 

urlpattens = [
	url(r'^$', views.index, name='index'),
]