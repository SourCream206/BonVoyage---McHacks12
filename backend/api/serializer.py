from rest_framework import serializers
from .models import ToDo
from .models import UserInput
from .models import AdditionalAttractionsInfo
from .models import SavedAttractions


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('id', 'title', 'description', 'completed')

class UserInputSerializer(serializers.ModelSerializer):  #same format as this
    class Meta:
        model = UserInput
        fields = ['id', 'text']

class SavedAttractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedAttractions
        fields = ['id', 'data']

class AdditionalAttractionsInfoSerializer(serializers.ModelSerializer):
    isTouristAttractionsActive = serializers.BooleanField(
        source='is_tourist_attractions_active')
    class Meta:
        model = AdditionalAttractionsInfo
        fields = ['id', 'text', 'isTouristAttractionsActive']
        
class SavedAttractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedAttractions
        fields = ['id', 'data']