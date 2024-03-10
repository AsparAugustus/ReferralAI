from openai import OpenAI
import os
from logging_handlers.logging import write_transcript_to_file
import json
from prompts.constants import system_prompt, system_prompt_article, system_prompt_location, system_prompt_services,list_services

from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()

# Create OpenAI client
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)
def gpt_send(system_prompt, user_prompt):

    # create the messages list with the system prompt and user prompt
    messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": user_prompt}
    ]

    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo-16k", messages=messages, n=1, temperature=0)

        # response = response
        # data = json.loads(response)
        # print(json.dumps(data, indent=4))  # Use indent=4 for 4-space indentation

        assistant_reply = response.choices[0].message.content


        print(assistant_reply, "assistant_reply")

        write_transcript_to_file(assistant_reply)

        # print("assistant_reply:", assistant_reply)
        # print("openai_tokens_used:", openai_tokens_used)
        return str(assistant_reply)
    except Exception as e:
        print("Error:", str(e))
        return str(assistant_reply)
        # Handle the error as per your requirement
    
def get_summary(user_prompt):
    return gpt_send(system_prompt, user_prompt)

def get_parsed(user_prompt):
    return gpt_send(system_prompt_article, user_prompt)

def get_locations(user_prompt):
    return gpt_send(system_prompt_location, user_prompt)

def get_services(user_prompt):


    edited_sys_prompt = f"""Below is a list of all the relevant medical information of a patient. 
    I want you to give me a list of medical departments from a list of departments below that may be relevant to this. 
    Order the departments by diseases that are most emergency ones, and also the most likely, limited to 5.

    List answers per line only repeating service name, separated by a newline. 
    You are allowed to give multiple answers from the list. Keep in mind that service name can vary.

    List of available departments and services:

    {list_services} 

    List answers per line only repeating service name, separated by a newline. 

    Medical information of patient:
    
    {user_prompt}"""




    return gpt_send(edited_sys_prompt, user_prompt)