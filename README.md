# Asyncer-Scraper-js
JS console scraper bot

# what is Asyncer-Scraper-js:
A simple JavaScript console scraper that asynchronously starts from the current page and continues up to the maximum number specified in the `asyncerScraper` function. This bot can navigate through all pagination pages and waits until each page has fully loaded (synchronized with the external page) before scraping the data. Optionally, you can set a random delay with a specified maximum number of seconds. The bot is designed to avoid errors and will not add any duplicated data, even if it runs multiple times on the same page or encounters duplicates on other pages. Please note that this is a complete console script; no libraries or servers are needed. Simply input it into the console, a Chrome extension, or use it with the Selenium `execute_script` method to retrieve your data. If using Selenium, you will need to return the data.
