import requests
from bs4 import BeautifulSoup
from functions.chat_completion import gpt_send
from functions.article_parse_bs import extract_article_content

import requests
from bs4 import BeautifulSoup
import re


# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options

# def fetch_article_content(url):
#     chrome_options = webdriver.ChromeOptions()
#     chrome_options.add_argument("--headless")  # Set headless mode
#     chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration (optional)
    
#     driver = webdriver.Chrome(options=chrome_options)  # You may need to specify the path to your chromedriver executable
#     driver.get(url)
#     # Wait for dynamic content to load (you may need to adjust the waiting time)
#     driver.implicitly_wait(10)
#     # Get the fully rendered HTML after dynamic content has loaded
#     html_content = driver.page_source
#     driver.quit()
    
#     soup = BeautifulSoup(html_content, 'html.parser')
#     article_containers = soup.find_all(class_=re.compile(r'article-bodystyle__BodyContainer.*'))
#     if article_containers:
#         article_text = ''
#         for container in article_containers:
#             article_text += container.get_text(separator='\n', strip=True) + '\n\n'
#         return article_text.strip()
#     else:
#         print("No article content found.")
#         return None
    



def scrap_and_parse_article_by_chatgpt(url):
    # Manually fetching the web content of the page using the URL
    try:
        response = requests.get(url)
        if response.status_code == 200:
            article = response.text
            article_content = extract_article_content(article)

            print(len(article), "length")

            print(len(article_content), "length article_content")
            print(article_content, "article_content")
        else:
            print("Failed to fetch article content. Status code:", response.status_code)
            return
    except Exception as e:
        print("Failed to fetch article content:", str(e))
        return

    # Proceed if article content is retrieved
    if article_content:
        # Extracting the last word after the last '/' in the URL
        keyword = url.split('/')[-1]

        # Constructing the system prompt
        system_prompt = f"Read the entire webpage and return only information about '{keyword}' in a JSON format, omit everything else that's not related. Be very strict about this. Be very short and concise."

        # Sending request to ChatGPT
        response = gpt_send(system_prompt, article_content)

        # Print the response from ChatGPT
        print(response, "article chatgpt content")
        return response
    else:
        print("Failed to fetch article content.")



def scrap_article(url):
    article_url = url
    article_content = scrap_and_parse_article_by_chatgpt(article_url)
    
    return article_content

