from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_additionalattractionsinfo_is_tourist_attractions_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='SavedAttractions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.JSONField()),
            ],
        ),
    ]
