from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.management import call_command

from .models import SavedAttractions
from .serializer import SavedAttractionsSerializer

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import ToDo
from .serializer import ToDoSerializer

from .models import UserInput
from .serializer import UserInputSerializer

from .models import AdditionalAttractionsInfo
from .serializer import AdditionalAttractionsInfoSerializer


class ToDoView(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

class UserInputViewSet(viewsets.ModelViewSet):   #similar thing to this
    queryset = UserInput.objects.all()
    serializer_class = UserInputSerializer

class AdditionalAttractionsInfoViewSet(viewsets.ModelViewSet):
    queryset = AdditionalAttractionsInfo.objects.all()
    serializer_class = AdditionalAttractionsInfoSerializer

class SavedAttractionsViewSet(viewsets.ModelViewSet):
    queryset = SavedAttractions.objects.all()
    serializer_class = SavedAttractionsSerializer


class ResetDatabaseView(APIView):
    def post(self, request, *args, **kwargs):
        call_command('flush', '--no-input')
        call_command('migrate')
        return Response({"message": "Database wiped Success"}, status=status.HTTP_200_OK)
    
    def get(self, request, *args, **kwargs):
        call_command('flush', '--no-input')
        call_command('migrate')
        return Response({"message": "Database wiped Success"}, status=status.HTTP_200_OK)
    

# Create your views here.
