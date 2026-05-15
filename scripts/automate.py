#!/usr/bin/env python3
"""
KALKULATOR24 - Complete Automation System
Reads keywords from CSV, generates tools with DeepSeek API,
adds formulas, generates content, builds site and deploys.

Usage: python automate.py keywords.csv
"""

import json, os, re, time, sys, subprocess
from openai import OpenAI

# ===== CONFIG =====
with open('config.json', encoding='utf-8') as f:
    cfg = json.load(f)

client = OpenAI(
    api_key=cfg['deepseek_api_key'],
    base_url="https://api.deepseek.com"
)

VALID_CATEGORIES = [
    'helse', 'finans', 'matematikk', 'konvertering', 'geometri',
    'tid', 'fysikk', 'statistikk', 'mat', 'bygg', 'vitenskap',
    'kjemi', 'underholdning', 'krypto', 'spill', 'odds',
    'okologi', 'bolig', 'musikk', 'teknologi', 'ki'
]

# ===== LOAD DATABASE =====
def load_db():
    with open('tools_database.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def save_db(db):
    with open('tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)

# ===== READ KEYWORDS =====
def read_keywords(csv_file):
    keywords = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        for line in f:
            kw = line.strip().replace('\r', '')
            if kw and not kw.lower() in VALID_CATEGORIES:
                keywords.append(kw)
    return keywords

# ===== GENERATE TOOL WITH DEEPSEEK =====
def generate_tool(keyword, existing_slugs):
    prompt = f"""You are an expert Norwegian calculator tool developer.

Create a complete, advanced calculator tool for: "{keyword}"

Return ONLY valid JSON (no markdown, no backticks):
{{
  "slug": "norwegian-url-slug",
  "title": "Norwegian Title Kalkulator",
  "category": "one of: helse/finans/matematikk/konvertering/geometri/tid/fysikk/statistikk/mat/bygg/vitenskap/kjemi/underholdning/krypto/spill/odds/okologi/bolig/musikk/teknologi/ki",
  "description": "Short Norwegian description max 100 chars",
  "keywords": "norwegian seo keywords comma separated",
  "formula": "unique_formula_name_snake_case",
  "inputs": [
    {{"id": "field_id", "label": "Norwegian Label", "type": "number", "placeholder": "example"}},
    {{"id": "field_id2", "label": "Norwegian Label 2", "type": "select", "options": ["Option1", "Option2"]}}
  ],
  "js_formula": "formula_name: (i) => {{ /* complete working JS */ return {{value: result, unit: 'unit', desc: 'description'}}; }},"
}}

CRITICAL REQUIREMENTS:
1. Formula must be mathematically/scientifically CORRECT
2. Input field IDs must EXACTLY match what js_formula uses (i.field_id)
3. js_formula must return {{value, unit, desc}} object
4. Show multiple results in desc (e.g. "Result1: X | Result2: Y")
5. Add validation (if(!input) return null)
6. Norwegian labels and descriptions
7. Advanced: include comparisons, health warnings, benchmarks in desc
8. Return ONLY the JSON object, nothing else"""

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
            temperature=0.1
        )
        raw = response.choices[0].message.content.strip()
        
        # Clean markdown if present
        if '```' in raw:
            parts = raw.split('```')
            for part in parts:
                if part.startswith('json'):
                    raw = part[4:].strip()
                    break
                elif '{' in part:
                    raw = part.strip()
                    break
        
        tool = json.loads(raw)
        
        # Validate required fields
        required = ['slug', 'title', 'category', 'description', 'formula', 'inputs', 'js_formula']
        for field in required:
            if field not in tool:
                print(f"  ⚠️ Missing field: {field}")
                return None
        
        # Fix category if invalid
        if tool['category'] not in VALID_CATEGORIES:
            tool['category'] = 'konvertering'
        
        # Ensure slug is unique
        if tool['slug'] in existing_slugs:
            tool['slug'] = tool['slug'] + '-kalkulator'
        
        # Remove js_formula from tool data (goes to calc.js separately)
        js_formula = tool.pop('js_formula', '')
        
        return tool, js_formula
        
    except json.JSONDecodeError as e:
        print(f"  ❌ JSON error: {e}")
        return None
    except Exception as e:
        print(f"  ❌ API error: {e}")
        return None

# ===== ADD FORMULA TO CALC.JS =====
def add_formula_to_calcjs(formula_name, js_formula):
    with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    if formula_name + ':' in content:
        return True  # Already exists
    
    # Find insertion point
    insert_pos = content.rfind('};')
    if insert_pos == -1:
        return False
    
    formula_block = '\n  ' + js_formula.strip() + '\n'
    new_content = content[:insert_pos] + formula_block + content[insert_pos:]
    
    with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

# ===== GENERATE CONTENT =====
def generate_content(tool):
    content_path = f'../content/{tool["slug"]}.html'
    if os.path.exists(content_path):
        return True  # Already exists
    
    prompt = f'''Skriv SEO-artikkel paa norsk om "{tool["title"]}". Ca 1200 ord.
Seksjoner: Hva er det, Hvorfor viktig, Slik bruker du, Formel med eksempel, Praktiske eksempler, Tips, FAQ 5 sporsmaol.
Kun HTML: h2 h3 p ul li strong. Keyword "{tool["title"].lower()}" 8 ganger.'''
    
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=3000,
            temperature=0.7
        )
        content = response.choices[0].message.content
        with open(content_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"  ⚠️ Content error: {e}")
        return False

# ===== MAIN AUTOMATION =====
def main():
    csv_file = sys.argv[1] if len(sys.argv) > 1 else 'keywords.csv'
    batch_size = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    
    if not os.path.exists(csv_file):
        print(f"❌ File not found: {csv_file}")
        return
    
    keywords = read_keywords(csv_file)
    print(f"\n{'='*50}")
    print(f"  KALKULATOR24 AUTOMATION SYSTEM")
    print(f"  Keywords: {len(keywords)}")
    print(f"  Batch size: {batch_size}")
    print(f"{'='*50}\n")
    
    db = load_db()
    existing_slugs = [t['slug'] for t in db['tools']]
    
    # Add new categories if needed
    new_cats = {
        'teknologi': {"name": "Teknologi", "icon": "💻"},
        'ki': {"name": "Kunstig Intelligens", "icon": "🤖"}
    }
    for k, v in new_cats.items():
        if k not in db['categories']:
            db['categories'][k] = v
            print(f"Added category: {k}")
    
    added_tools = 0
    failed = 0
    skipped = 0
    
    for i, keyword in enumerate(keywords[:batch_size]):
        print(f"\n[{i+1}/{min(batch_size, len(keywords))}] {keyword}...")
        
        # Check if already exists
        slug_check = keyword.lower().replace(' ', '-').replace('æ','ae').replace('ø','o').replace('å','a')
        if any(slug_check in s for s in existing_slugs):
            print(f"  SKIP — already exists")
            skipped += 1
            continue
        
        # Generate tool
        result = generate_tool(keyword, existing_slugs)
        if not result:
            print(f"  ❌ Failed to generate")
            failed += 1
            time.sleep(1)
            continue
        
        tool, js_formula = result
        
        # Add formula to calc.js
        if js_formula:
            if add_formula_to_calcjs(tool['formula'], js_formula):
                print(f"  ✅ Formula added: {tool['formula']}")
            else:
                print(f"  ⚠️ Formula add failed")
        
        # Add tool to database
        db['tools'].append(tool)
        existing_slugs.append(tool['slug'])
        added_tools += 1
        print(f"  ✅ Tool added: {tool['slug']}")
        
        # Generate content
        if generate_content(tool):
            print(f"  ✅ Content generated")
        
        # Save database after each tool
        save_db(db)
        
        time.sleep(0.5)  # Rate limiting
    
    print(f"\n{'='*50}")
    print(f"  DONE!")
    print(f"  Added: {added_tools} tools")
    print(f"  Failed: {failed}")
    print(f"  Skipped: {skipped}")
    print(f"  Total tools: {len(db['tools'])}")
    print(f"{'='*50}\n")
    
    if added_tools > 0:
        print("Now regenerating site...")
        subprocess.run(['python', 'generate_site.py'], check=True)
        
        print("Committing to git...")
        os.chdir('..')
        subprocess.run(['git', 'add', '.'], check=True)
        subprocess.run(['git', 'commit', '-m', f'auto: add {added_tools} new tools'], check=True)
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)
        print("✅ Deployed!")

if __name__ == '__main__':
    main()
