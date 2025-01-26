import asyncio
import json
from openai import OpenAI

YOUR_API_KEY = ""

async def get_json_country(input):
    user_input = input
    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. Provide a response in **strict JSON format only and get the image links from the unsplash API**. "
                    "Your task is to provide a list of top tourist attractions in a given city. "
                    "For each attraction, provide its name, a long description of at least 5 sentences, its address and a link to an image. "
                    "The JSON should be in the following format:\n"
                    "[\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"link_to_image\": \"\"},\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"link_to_image\": \"\"}\n"
                    "]\n"
                    "Ensure the descriptions are concise and informative, and the image links are actual links of those places pulled from the web."
        },
        {
            "role": "user",
            "content": f"Generate a JSON object of top tourist attractions in {user_input}."
        }
    ]
    
    client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
    )

    assistant_response = response.choices[0].message.content

    json_data = json.loads(assistant_response.strip())

    output_file = "../frontend/public/tourist_attractions.json"

    with open(output_file, "w") as json_file:
        json.dump(json_data, json_file, indent=4)
        print(f"JSON data has been written to '{output_file}'")


async def get_json_resturant(input):
    user_input = input

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. Provide a response in **strict JSON format only and get the image links from the unsplash API double match name of location and address**. "
                    "Your task is to provide a list of top-rated restaurants in a given city. "
                    "For each restaurant, provide its name, a long description of at least 3 sentences including what type of food it serves, its address, its approximate cost per person, and a link to an image. "
                    "The JSON should be in the following format:\n"
                    "[\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"},\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"}\n"
                    "]\n"
                    "Ensure the descriptions are concise and informative, and the image links are actual links of those places pulled from the web."
        },
        {
            "role": "user",
            "content": f"Generate a JSON object of top-rated restaurants in {user_input}."
        }
    ]
    
    client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
    )

    assistant_response = response.choices[0].message.content

    json_data = json.loads(assistant_response.strip())

    output_file = "../frontend/public/resturants.json"

    with open(output_file, "w") as json_file:
        json.dump(json_data, json_file, indent=4)
        print(f"JSON data has been written to '{output_file}'")




def get_json_country_specific(country, additional):

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. Provide a response in **strict JSON format only and get the image links from the unsplash API**. "
                    "Your task is to provide a list of top tourist attractions in a given city. "
                    "For each attraction, provide its name, a long description of atleast 5 sentences, its address, and a link to an image. "
                    "The JSON should be in the following format:\n"
                    "[\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"link_to_image\": \"\"},\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"link_to_image\": \"\"}\n"
                    "]\n"
                    "Ensure the descriptions are concise and informative, and the image links are actual links of those places pulled from the web."
        },
        {
            "role": "user",
            "content": f"Generate a JSON object of top tourist attractions in {country} with a focus on {additional}."
        }
    ]
    
    client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

    # chat completion without streaming
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
    )

    # Extract the assistant's response content
    assistant_response = response.choices[0].message.content

    json_data = json.loads(assistant_response.strip())

    # Fixed filename to overwrite on every run
    output_file = "../frontend/public/tourist_attractions.json"

    with open(output_file, "w") as json_file:
        json.dump(json_data, json_file, indent=4)
        print(f"JSON data has been written to '{output_file}'")

def get_json_resturant_additional(country, additional):


    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. Provide a response in **strict JSON format only and get the image links from the unsplash API double match name of location and address**. "
                    "Your task is to provide a list of top rated resturants in a given city. "
                    "For each resturant, provide its name, a long description of atleast 3 sentences including what type of food it serves, its address, its approximate cost per person, and a link to an image. "
                    "The JSON should be in the following format:\n"
                    "[\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"},\n"
                    "  {\"name\": \"\", \"description\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"}\n"
                    "]\n"
                    "Ensure the descriptions are concise and informative, and the image links are actual links of those places pulled from the web."
        },
        {
            "role": "user",
            "content": f"Generate a JSON object of top rated resturants in {country} that also fit this criteria {additional}."
        }
    ]
    
    client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

    # chat completion without streaming
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
    )

    # Extract the assistant's response content
    assistant_response = response.choices[0].message.content

    json_data = json.loads(assistant_response.strip())

    # Fixed filename to overwrite on every run
    output_file = "../frontend/public/resturants.json"

    with open(output_file, "w") as json_file:
        json.dump(json_data, json_file, indent=4)
        print(f"JSON data has been written to '{output_file}'")


def get_itinerary(country, names, images):
    

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. Provide a response in **strict JSON format only**. "
                    "Your task is for each name given in that list, provide its website, its address, its approximate cost per person or cost per ticket."
                    "The JSON should be in the following format:\n"
                    "[\n"
                    "  {\"name\": \"\", \"website\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"},\n"
                    "  {\"name\": \"\", \"website\": \"\", \"address\": \"\", \"price\": \"\", \"link_to_image\": \"\"}\n"
                    "]\n"
                    "The links of the images will be given in order in a seperate list"
        },
        {
            "role": "user",
            "content": f"Generate a JSON object for these locations {names} that have these images {images}."
        }
    ]
    
    client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

    # chat completion without streaming
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
    )

    # Extract the assistant's response content
    assistant_response = response.choices[0].message.content

    json_data = json.loads(assistant_response.strip())

    # Fixed filename to overwrite on every run
    output_file = "../frontend/public/itinerary.json"

    with open(output_file, "w") as json_file:
        json.dump(json_data, json_file, indent=4)
        print(f"JSON data has been written to '{output_file}'")

