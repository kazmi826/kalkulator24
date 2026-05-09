import json, os, time, requests

with open('config.json') as f:
    cfg = json.load(f)

with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

API_KEY = cfg['openrouter_key']
os.makedirs('../content', exist_ok=True)
tools = db['tools']

def generate_content(tool):
    prompt = f'''Skriv en komplett SEO-optimalisert artikkel paa norsk bokmaal om "{tool["title"]}". Minimum 1500 ord.

Seksjoner:
<h2>Hva er {tool["title"]}?</h2> (250 ord)
<h2>Hvorfor er dette viktig?</h2> (200 ord)
<h2>Slik bruker du {tool["title"]}</h2> (200 ord)
<h2>Formel og beregning</h2> (200 ord med eksempel)
<h2>Praktiske eksempler</h2> (250 ord)
<h2>Tips og raad</h2> (150 ord)
<h2>Vanlige feil</h2> (150 ord)
<h2>FAQ - 5 sporsmaol og svar</h2> (300 ord)

Bruk kun HTML: h2, h3, p, ul, li, strong. Ingen markdown. Ingen kode-blokker.
Keyword: "{tool["title"].lower()}" minst 8 ganger.'''

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kalkulator.no",
        "X-Title": "Kalkulator.no"
    }
    
    payload = {
        "model": "meta-llama/llama-3.3-70b-instruct:free",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 4000,
        "temperature": 0.7
    }
    
    def make_request():
        try:
            res = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            data = res.json()
            
            # Check for 429 rate limit error
            if 'error' in data and data['error'].get('code') == 429:
                print(f"  RATE LIMIT {tool['slug']} - retrying in 30s...")
                return None, 'rate_limit'
            
            if 'choices' not in data:
                print(f"  FAIL {tool['slug']} - {data}")
                return None, data
                
            content = data['choices'][0]['message']['content']
            return content, None
            
        except Exception as e:
            print(f"  FAIL {tool['slug']} - {e}")
            return None, str(e)
    
    # Try first request
    content, error = make_request()
    
    if content:
        words = len(content.split())
        with open(f"../content/{tool['slug']}.html", 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  OK {tool['slug']} - {words} words")
        return True
    
    # Retry logic for rate limit
    if error == 'rate_limit':
        time.sleep(30)
        print(f"  RETRY {tool['slug']}...")
        content, error = make_request()
        
        if content:
            words = len(content.split())
            with open(f"../content/{tool['slug']}.html", 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  OK {tool['slug']} - {words} words (retry)")
            return True
        else:
            print(f"  FAIL {tool['slug']} - retry failed")
            return False
    
    return False

print(f"\n{'='*50}")
print(f"  Generating {len(tools)} tools — OpenRouter")
print(f"  Model: llama-3.3-70b free")
print(f"{'='*50}\n")

success = 0
failed = 0

for i, tool in enumerate(tools):
    filepath = f"../content/{tool['slug']}.html"
    
    if os.path.exists(filepath):
        print(f"  SKIP [{i+1}/{len(tools)}] {tool['slug']}")
        continue
    
    print(f"  [{i+1}/{len(tools)}] {tool['title']}...")
    
    if generate_content(tool):
        success += 1
    else:
        failed += 1
    
    time.sleep(3)

print(f"\n{'='*50}")
print(f"  Done! Success: {success} | Failed: {failed}")
print(f"  Now run: python generate_site.py")
print(f"{'='*50}\n")
