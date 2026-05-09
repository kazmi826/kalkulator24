import json, os, time
from groq import Groq

with open('config.json') as f:
    cfg = json.load(f)

with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

client = Groq(api_key=cfg['groq_api_key'])
os.makedirs('../content', exist_ok=True)
tools = db['tools']

def generate_content(tool):
    prompt = f'''Skriv en komplett SEO-optimalisert artikkel paa norsk om "{tool["title"]}". Minimum 2000 ord. Seksjoner: Hva er {tool["title"]}?, Hvorfor viktig?, Slik bruker du den, Formel og beregning, Praktiske eksempler, Tips og raad, Vanlige feil, FAQ med 5 sporsmaal. Bruk kun HTML: h2 h3 p ul li strong. Ingen markdown.'''
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=4000
        )
        content = completion.choices[0].message.content
        with open(f"../content/{tool['slug']}.html", 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  OK {tool['slug']} - {len(content.split())} words")
        return True
    except Exception as e:
        print(f"  FAIL {tool['slug']} - {e}")
        return False

print(f"Generating {len(tools)} tools with Groq...")
success = 0
for i, tool in enumerate(tools):
    if os.path.exists(f"../content/{tool['slug']}.html"):
        print(f"  SKIP [{i+1}] {tool['slug']}")
        continue
    print(f"  [{i+1}/{len(tools)}] {tool['title']}...")
    if generate_content(tool):
        success += 1
    time.sleep(0.5)
print(f"Done! {success} generated")
