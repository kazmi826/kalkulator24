import json, os, time, anthropic

with open('config.json') as f:
    cfg = json.load(f)
with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

client = anthropic.Anthropic(api_key=cfg['claude_api_key'])
os.makedirs('../content', exist_ok=True)
tools = db['tools']

def generate(tool):
    prompt = f'''Skriv SEO-artikkel paa norsk om "{tool["title"]}". Ca 1200 ord. Seksjoner: Hva er det, Hvorfor viktig, Slik bruker du, Formel med eksempel, Praktiske eksempler, Tips, FAQ 5 sporsmaol. Kun HTML: h2 h3 p ul li strong. Keyword "{tool["title"].lower()}" 8 ganger.'''
    try:
        msg = client.messages.create(model="claude-haiku-4-5", max_tokens=3000, messages=[{"role":"user","content":prompt}])
        content = msg.content[0].text
        with open(f"../content/{tool['slug']}.html", 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  OK {tool['slug']} - {len(content.split())} words")
        return True
    except Exception as e:
        print(f"  FAIL {tool['slug']} - {e}")
        return False

success = 0
for i, tool in enumerate(tools):
    if os.path.exists(f"../content/{tool['slug']}.html"):
        print(f"  SKIP [{i+1}/{len(tools)}] {tool['slug']}")
        continue
    print(f"  [{i+1}/{len(tools)}] {tool['title']}...")
    if generate(tool): success += 1
    time.sleep(0.3)
print(f"Done! {success} generated")
