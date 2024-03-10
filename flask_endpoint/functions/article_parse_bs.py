from bs4 import BeautifulSoup

import re

def extract_article_content(html_content):
    """
    Extracts the text content of the article from the given HTML content.
    
    Args:
    - html_content (str): The HTML content containing the article.
    
    Returns:
    - str: The first 5000 characters of the text content of the article, with only words (no symbols).
    """
    try:
        # Remove HTML tags
        clean_html = re.sub(r'<[^>]*>', '', html_content)
        
        # Remove non-word characters
        clean_text = re.sub(r'[^\w\s]', '', clean_html)
        
        # Return only the first 5000 characters
        return clean_text[:5000]
    except Exception as e:
        return f"Error: {str(e)}"