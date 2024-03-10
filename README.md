## Referral AI

This project uses the Healthily DOT platform API combined with Large Language Model (LLM) prompts and a Directory of Services (DOS) to match users with appropriate healthcare services based on their symptoms.

### Inspiration

The Healthily sample widget was used as inspiration to acquire symptoms and diagnoses from a user. (https://github.com/YourMD/healthily-symptom-checker-sample)

### Matching Symptoms with Services

ChatGPT, a Large Language Model (LLM), was used to match user symptoms with available healthcare services retrieved from the "Directory of Services (DOS)" provided by the UK government API (https://www.api.gov.uk/nd/directory-of-healthcare-services-service-search-api/).

The final page of the sample widget was upgraded to display a list of relevant services that match the user's symptoms and possible causes.

## Project Details

**Building a Service List:**

* We built a valuable list containing all the names of available services, extracted from the DOS database.

**Challenges of Matching Services:**

* The DOS often lacks clear or complete information about the specific treatments offered by each clinic. This makes it difficult to match users with the most suitable healthcare department within a clinic.

**Bridging the Gap with LLM Prompts:**

* We engineered a custom LLM prompt to bridge this gap. This prompt allows us to match symptoms and possible causes generated by the Healthily API with service names retrieved from the DoS.

![referralAI_screenshot](https://github.com/AsparAugustus/ReferralAI/assets/50379729/f4e1ba8a-778d-4c36-8193-a65c7d9c9e76)


Example LLM Prompt:

The following code snippet demonstrates an example of prompt engineering:

```python
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
```


You can find a full example of this prompt engineering in the following file:

https://github.com/AsparAugustus/ReferralAI/blob/main/flask_endpoint/functions/chat_completion.py

```
Example List of Available Services:

* Accident and emergency services
* Adult Mental Illness
* Aerobics
* Alcohol Addiction support
* Alcohol addiction - support for family and friends
... (and more)
```

## Further Development

* We plan to utilize the matched "service names" to find nearby organizations based on proximity. These locations can then be displayed on a map for a visual aid to users.
* Fine tuning LLM model using Articles database could potentially improve performance
