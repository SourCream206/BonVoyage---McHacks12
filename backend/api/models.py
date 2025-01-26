from django.db import models
import json
import asyncio
from django.db.models.signals import post_save
from django.dispatch import receiver
from .perplexity import *

class ToDo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class UserInput(models.Model): #take this as a reference, only need to get the name from jSon
    text = models.TextField()

    def __str__(self):
        return self.text

class SavedAttractions(models.Model):
    data = models.JSONField()

    def __str__(self):
        return f"Saved Attractions: {len(self.data)} items"

class AdditionalAttractionsInfo(models.Model):
    text = models.TextField()
    is_tourist_attractions_active = models.BooleanField(default=True)

    def __str__(self):
        return self.text

class SavedAttractions(models.Model):
    data = models.JSONField()

    def __str__(self):
        return f"Saved Attractions: {len(self.data)} items"

    
@receiver(post_save, sender=ToDo)
def save_toDo_to_json(sender, instance, **kwargs):
    todos = ToDo.objects.all().values()
    todos_list = list(todos)
    with open('todos.json', 'w') as file:
        json.dump(todos_list, file, indent = 4)

@receiver(post_save, sender=UserInput)
async def handle_user_input_save(sender, instance, created, **kwargs):
    user_input_text = instance.text

    await asyncio.gather(
        get_json_country(user_input_text),
        get_json_resturant(user_input_text)
    )

@receiver(post_save, sender=AdditionalAttractionsInfo)
def handle_additional_information(sender, instance, **kwargs):

    country = UserInput.objects.order_by('-id').first()
    additional = instance.text

    if instance.is_tourist_attractions_active:
        get_json_country_specific(country, additional)
    else:
        get_json_resturant_additional(country, additional)


@receiver(post_save, sender=SavedAttractions)
def save_saved_attractions_to_json(sender, instance, **kwargs):
    with open('saved_itinerary.json', 'w') as file:
        json.dump(instance.data, file, indent=4)

    with open('saved_itinerary.json', 'r') as file:
        data = json.load(file)

    names = [item['name'] for item in data]
    images = [item['link_to_image'] for item in data]

    print(names)

    country = UserInput.objects.order_by('-id').first()


    get_itinerary(country, names, images)
    

    



# Create your models here.
