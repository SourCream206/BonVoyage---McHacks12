from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'todos', views.ToDoView, 'todo')
router.register(r'user-input', views.UserInputViewSet, basename='user-input') #its going to be used from api/, so same as this
router.register(r'additional', views.AdditionalAttractionsInfoViewSet, basename="additional-info")
router.register(r'saved-attractions', views.SavedAttractionsViewSet, basename='saved-attractions')


urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
    path('reset-db/', views.ResetDatabaseView.as_view(), name="reset-database"),
]
