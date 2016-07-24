"""
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import UserViewSet
"""
from django.conf.urls import url
from . import views

##add 0616

from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import UserViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    url(r'^obtain-auth-token/$', csrf_exempt(obtain_auth_token)),
    url(r'^account/$', views.UserCreate.as_view(), name='account-create'),
    url(r'^account2/$',views.CreateUserView.as_view(),name='account-create2'),
    url(r'^account3/$',views.UserChangePassword.as_view()),


   # url(r'^account0/$', views.create_auth.as_view()),
]
