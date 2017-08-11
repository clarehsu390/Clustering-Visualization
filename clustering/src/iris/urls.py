
from django.conf.urls import url 

from . import views 


urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^favicon.ico', views.index, name='index'),
]