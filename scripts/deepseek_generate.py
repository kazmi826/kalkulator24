import json, os, time
from openai import OpenAI

with open('config.json') as f:
    cfg = json.load(f)
with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

client = OpenAI(api_key=cfg['deepseek_api_key'], base_url='https://api.deepseek.com')
os.makedirs('../content', exist_ok=True)
tools = db['tools']

def generate(tool):
    prompt = f'Skriv SEO-artikkel paa norsk om "{tool["title"]}". Ca 1200 ord. Seksjoner: Hva er det, Hvorfor viktig, Slik bruker du, Formel med eksempel, Praktiske eksempler, Tips, FAQ 5 sporsmaol. Kun HTML: h2 h3 p ul li strong. Keyword "{tool["title"].lower()}" 8 ganger.'
    try:
        response = client.chat.completions.create(model='deepseek-chat', messages=[{'role':'user','content':prompt}], max_tokens=3000, temperature=0.7)
        content = response.choices[0].message.content
        with open(f'../content/{tool["slug"]}.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  OK {tool["slug"]} - {len(content.split())} words')
        return True
    except Exception as e:
        print(f'  FAIL {tool["slug"]} - {e}')
        return False

success = 0
for i, tool in enumerate(tools):
    if os.path.exists(f'../content/{tool["slug"]}.html'):
        print(f'  SKIP [{i+1}/{len(tools)}] {tool["slug"]}')
        continue
    print(f'  [{i+1}/{len(tools)}] {tool["title"]}...')
    if generate(tool): success += 1
    time.sleep(0.5)
print(f'Done! {success} generated')
