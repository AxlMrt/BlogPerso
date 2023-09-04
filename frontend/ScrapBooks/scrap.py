import re
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd
import time

url = 'https://www.amazon.fr/gp/bestsellers/2023/books/ref=zg_bsar_cal_ye'

def get_url(link):
  response = requests.get(link)
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  
  books_container = soup.find_all('div', { 'class': 'p13n-sc-uncoverable-faceout' })

  books_link = []

  for child in books_container:
    books_link.append(child.a['href'])

  return books_link

def get_book_data(link):
  driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
  driver.get(link)

  for _ in range(1):
      driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
      time.sleep(1)

  html = driver.page_source
  soup = BeautifulSoup(html, 'html.parser')

  data = {}

  nb_pages = soup.find('div', { 'id': 'rpi-attribute-book_details-fiona_pages' }).getText().strip()
  publication_year = soup.find('div', { 'id': 'rpi-attribute-book_details-publication_date' }).getText().strip()
  publisher = soup.find('div', { 'id': 'rpi-attribute-book_details-publisher' }).getText().strip().split()

  data['title'] = soup.find('span', { 'id': 'productTitle' }).getText().strip()
  data['author'] = re.sub("[\(\[].*?[\)\]]", "", soup.find('span', { 'class': 'author notFaded' }).getText()).strip()
  data['description'] = re.sub("En lire plus", "", soup.find('div', { 'id': 'bookDescription_feature_div' }).getText()).strip()
  data['year'] = re.sub("[^0-9]", "", publication_year)
  data['page'] = re.sub("[^0-9]", "", nb_pages)
  data['publisher'] = publisher[-1]
  data['photo'] = soup.find('img', { 'id': 'imgBlkFront' }).get('src') 

  return data

master_list = []
  
for book_link in get_url(url)[:5]:
  print(book_link)
  master_list.append(get_book_data(f'https://amazon.fr{book_link}'))

df = pd.DataFrame(master_list)
df.to_json('bestseller.json', orient='records')
