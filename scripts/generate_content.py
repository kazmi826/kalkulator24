import json, os, time, requests

with open('config.json') as f:
    cfg = json.load(f)

with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

API_KEY = cfg['gemini_api_key']
os.makedirs('../content', exist_ok=True)

def generate_content(tool):
    print(f"  Calling API...")
    
    prompt = f"""Skriv en komplett SEO-optimalisert artikkel på norsk bokmål om "{tool['title']}".

KRAV:
- Minimum 2000 ord
- Inkluder disse seksjonene med H2/H3 overskrifter:

1. Hva er {tool['title']}? (300 ord - detaljert forklaring)
2. Hvorfor er dette viktig? (200 ord - fordeler og bruksområder)  
3. Slik bruker du {tool['title']} (200 ord - steg-for-steg guide)
4. Formel og beregning (200 ord - matematisk forklaring med eksempel)
5. Praktiske eksempler (300 ord - 3 reelle eksempler med tall)
6. Tips og råd fra eksperter (200 ord - profesjonelle tips)
7. Vanlige feil å unngå (150 ord - feilberegninger folk gjør)
8. {tool['title']} i Norge (150 ord - norsk kontekst og standarder)
9. Relaterte kalkulatorer og verktøy (100 ord)
10. Ofte stilte spørsmål (300 ord - 5 spørsmål med detaljerte svar)

SEO KRAV:
- Hovedkeyword "{tool['title'].lower()}" brukes 8-10 ganger naturlig
- LSI keywords: {tool.get('keywords', '')}
- Inkluder tall, statistikk og fakta
- Strukturert med bullet points og tabeller der det passer
- Engasjerende og informativt språk
- Svar på "People Also Ask" spørsmål

LLM OPTIMALISERING:
- Svar direkte på vanlige spørsmål
- Inkluder definisjoner
- Bruk eksempler med konkrete tall
- Inkluder sammenligninger
- Strukturer som kan brukes som featured snippets

Bruk kun HTML tagger: <h2>, <h3>, <p>, <ul>, <li>, <ol>, <table>, <tr>, <td>, <th>, <strong>, <em>
Ikke bruk markdown. Ikke bruk <!DOCTYPE> eller <html> tags."""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 2048
        }
    }
    
    def make_request():
        try:
            res = requests.post(url, json=payload, timeout=30)
            data = res.json()
            
            # Check if response has candidates
            if 'candidates' not in data:
                print(f"  ❌ No 'candidates' in response for {tool['slug']}")
                print(f"  Full response: {json.dumps(data, indent=2)}")
                
                # Save error response to file
                with open('errors.txt', 'a', encoding='utf-8') as f:
                    f.write(f"\n\n=== ERROR: {tool['slug']} ===\n")
                    f.write(f"Response: {json.dumps(data, indent=2)}\n")
                    f.write(f"Status: {res.status_code}\n")
                
                return None, data
            
            content = data['candidates'][0]['content']['parts'][0]['text']
            return content, None
            
        except Exception as e:
            print(f"  ❌ Request failed for {tool['slug']}: {e}")
            return None, str(e)
    
    # Try first request
    content, error = make_request()
    
    if content:
        filepath = f"../content/{tool['slug']}.html"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✓ {tool['slug']} ({len(content.split())} words)")
        return True
    
    # Retry logic
    print(f"  🔄 Retrying {tool['slug']} in 10 seconds...")
    time.sleep(10)
    
    content, error = make_request()
    
    if content:
        filepath = f"../content/{tool['slug']}.html"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✓ {tool['slug']} ({len(content.split())} words) - retry successful")
        return True
    else:
        print(f"  ✗ {tool['slug']} - Failed after retry")
        
        # Save error to file
        with open('errors.txt', 'a', encoding='utf-8') as f:
            f.write(f"\n\n=== FAILED: {tool['slug']} ===\n")
            f.write(f"Error: {error}\n")
        
        return False

# Generate content for all tools
tools = db['tools']
print(f"\n🚀 Generating content for {len(tools)} tools...\n")

success = 0
for i, tool in enumerate(tools):
    filepath = f"../content/{tool['slug']}.html"
    
    # Skip if already generated
    if os.path.exists(filepath):
        print(f"  ⏭ {tool['slug']} (already exists)")
        continue
    
    print(f"[{i+1}/{len(tools)}] Generating: {tool['title']}")
    
    if generate_content(tool):
        success += 1
    
    # Wait 3 seconds between requests to avoid rate limiting
    time.sleep(3)

print(f"\n✅ Done! {success} content files generated")
print(f"📂 Saved in: content/ folder")
print(f"\nNow run: python generate_site.py")
