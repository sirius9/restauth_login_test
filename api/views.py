"""
from django.contrib.auth.models import User
from rest_framework import viewsets, response, permissions
from .serializers import UserSerializer
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from serializers import UserSerializer,UserSerializer0,UserSerializer1
from rest_framework.authtoken.models import Token

##add0616
from django.contrib.auth.models import User
from rest_framework import viewsets, response, permissions
##add 0621
from rest_framework import permissions
from rest_framework.generics import CreateAPIView



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return response.Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)


class UserRegiSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    Permission_clases = (permissions.IsAuthenticated,)

## add singup 0620


class UserCreate(APIView):

    #creates user.


    def post(self, request): #format= 'json'

        serializer = UserSerializer0(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


## add new 0621_new adad


class CreateUserView(CreateAPIView):

    model = User
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer0


## add  new 0701 add change_password

class UserChangePassword(APIView):

    def patch(self, request):
       serialized = UserSerializer(data=request.DATA)
       if serialized.is_valid():
           serialized.save()
           return Response(status=status.HTTP_205_RESET_CONTENT)
       else:
           return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)



