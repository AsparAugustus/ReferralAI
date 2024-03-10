from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os
from datetime import datetime, timedelta
from logging_handlers.logging import write_transcript_to_file, write_messages_to_file
from functions.chat_completion import gpt_send, get_summary, get_parsed, get_services
from functions.article_parse_chatgpt import scrap_and_parse_article_by_chatgpt
from prompts.constants import system_prompt, dummy_userInfo, dummy_articleURL, dummy_servicesJson, system_prompt_services, list_services

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)



@app.route('/test', methods=['GET'])
def test():
    return "It works!", 200

@app.route('/services', methods=['POST'])
def services():
        
        # Get the message from the request
        medical_info = request.json.get('medical_info')
        
    
        # Check if any of the required variables are null
        if medical_info is None:
            return jsonify({'error': 'medical_info is missing'}), 400
        
            # Check if medical_info is not None
        if medical_info:
            # Remove the 'articles' element if it exists
            medical_info.pop('articles', None)
            
            # Remove the 'articles_v3' element if it exists
            medical_info.pop('articles_v3', None)


        text_input = medical_info

        ## this is the part where messages are sent to chatgpt
        user_input = str(text_input)

        user_prompt = user_input  # User prompt from the request
        user_prompt_strip = user_prompt.strip()  # Remove leading and trailing whitespaces
        words = user_prompt_strip.split()  # Split into individual words
        num_tokens = len(words)  # Count the number of words
        num_tokens += sum([1 for word in words if not word.isspace()])  # Adjust for special characters

        print(num_tokens, "tokens")



        services_suitable = None
        total_tokens_used = None
        
        try:

            services_suitable = get_services(user_prompt)

        except Exception as e:
            print("Error:", str(e))
            write_messages_to_file("Error: " + str(e))

        print("services_suitable", services_suitable)


        write_transcript_to_file(services_suitable)


        return {'services_suitable': str(services_suitable), 'user_input': user_input}





@app.route('/refer', methods=['POST'])
def referral():
        
        # Get the message from the request
        summary = request.json.get('summary')
        locations = request.json.get('locations')
    
        # Check if any of the required variables are null
        if summary is None:
            return jsonify({'error': 'summary is missing'}), 400

        text_input = summary

        ## this is the part where messages are sent to chatgpt
        user_input = str(text_input)

        user_prompt = user_input  # User prompt from the request
        user_prompt_strip = user_prompt.strip()  # Remove leading and trailing whitespaces
        words = user_prompt_strip.split()  # Split into individual words
        num_tokens = len(words)  # Count the number of words
        num_tokens += sum([1 for word in words if not word.isspace()])  # Adjust for special characters

        print(num_tokens, "tokens")



        full_summary = None
        total_tokens_used = None
        
        try:

            full_summary = get_summary(user_prompt)

        except Exception as e:
            print("Error:", str(e))
            write_messages_to_file("Error: " + str(e))

        print("full_summary", full_summary)


        write_transcript_to_file(full_summary)


        return {'full_summary': str(full_summary), 'user_input': user_input}, 200





@app.route('/chatgpt', methods=['POST'])
def chat():
        
        # Get the message from the request
        user_info = request.json.get('user_info')
        articleURL = request.json.get('articleURL')
        list_of_services = request.json.get('list_of_services')

        
        
        # Fetch article content
        article = scrap_and_parse_article_by_chatgpt(articleURL)
   

    
        # Check if any of the required variables are null
        if user_info is None:
            return jsonify({'error': 'user_info is missing'}), 400
        elif article is None:
            return jsonify({'error': 'article is missing'}), 400
        elif list_of_services is None:
            return jsonify({'error': 'list_of_services is missing'}), 400
    


        text_input = {
        "userInfo": user_info,
        "article": article,
        "servicesJson": list_of_services
        }

        
        # print(text_input)



        ## this is the part where messages are sent to chatgpt
        user_input = str(text_input)
    

        # print(user_input, "user_input")

  
        user_prompt = user_input  # User prompt from the request
        user_prompt_strip = user_prompt.strip()  # Remove leading and trailing whitespaces
        words = user_prompt_strip.split()  # Split into individual words
        num_tokens = len(words)  # Count the number of words
        num_tokens += sum([1 for word in words if not word.isspace()])  # Adjust for special characters

        print(num_tokens, "tokens")



        full_summary = None
        total_tokens_used = None
        
        try:

            full_summary = get_summary(user_prompt)

        except Exception as e:
            print("Error:", str(e))
            write_messages_to_file("Error: " + str(e))

        print("full_summary", full_summary)


        write_transcript_to_file(full_summary)


        return {'full_summary': str(full_summary), 'user_input': user_input}, 200



@app.route('/chatgpt_local', methods=['POST'])
def chat_local():
        
        # Get the message from the request
        # user_info = request.json.get('user_info')
        # article = request.json.get('article')
        # list_of_services = request.json.get('list_of_services')

        user_info = dummy_userInfo


        article = scrap_and_parse_article_by_chatgpt(dummy_articleURL)
   


        list_of_services = dummy_servicesJson  
    
        # Check if any of the required variables are null
        if user_info is None:
            return jsonify({'error': 'user_info is missing'}), 400
        elif article is None:
            return jsonify({'error': 'article is missing'}), 400
        elif list_of_services is None:
            return jsonify({'error': 'list_of_services is missing'}), 400
    


        text_input = {
        "userInfo": user_info,
        "article": article,
        "servicesJson": list_of_services
        }

        
        # print(text_input)



        ## this is the part where messages are sent to chatgpt
        user_input = str(text_input)
    

        # print(user_input, "user_input")

  
        user_prompt = user_input  # User prompt from the request
        user_prompt_strip = user_prompt.strip()  # Remove leading and trailing whitespaces
        words = user_prompt_strip.split()  # Split into individual words
        num_tokens = len(words)  # Count the number of words
        num_tokens += sum([1 for word in words if not word.isspace()])  # Adjust for special characters

        print(num_tokens, "tokens")



        full_summary = None
        total_tokens_used = None
        
        try:

            full_summary = get_summary(user_prompt)

        except Exception as e:
            print("Error:", str(e))
            write_messages_to_file("Error: " + str(e))

        print("full_summary", full_summary)


        write_transcript_to_file(full_summary)


        return {'full_summary': str(full_summary), 'user_input': user_input}, 200


if __name__ == '__main__':
    app.run()