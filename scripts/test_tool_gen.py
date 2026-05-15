#!/usr/bin/env python3
"""Test tool generation with DeepSeek API"""

import json
from openai import OpenAI

with open('config.json', encoding='utf-8') as f:
    cfg = json.load(f)

client = OpenAI(
    api_key=cfg['deepseek_api_key'],
    base_url="https://api.deepseek.com"
)

def generate_tool(keyword):
    prompt = f"""You are an expert Norwegian calculator tool developer.

Create a complete calculator tool for this keyword: "{keyword}"

Return ONLY a valid JSON object with this exact structure:
{{
  "slug": "url-friendly-slug-in-norwegian",
  "title": "Norwegian title",
  "category": "one of: helse, finans, matematikk, konvertering, geometri, tid, fysikk, statistikk, mat, bygg, vitenskap, kjemi, underholdning, krypto, spill, odds, okologi, bolig, musikk",
  "description": "Short Norwegian description (max 100 chars)",
  "keywords": "norwegian seo keywords",
  "formula": "formula_name_in_english_snake_case",
  "inputs": [
    {{"id": "field_name", "label": "Norwegian label", "type": "number", "placeholder": "example value"}},
    {{"id": "field_name2", "label": "Norwegian label 2", "type": "select", "options": ["Option1", "Option2"]}}
  ],
  "js_formula": "formula_name: (i) => {{ const x=+i.field_name; if(!x) return null; const result=(x*2).toFixed(2); return {{value:result, unit:'enheter', desc:'Beregnet: '+result}}; }},"
}}

Requirements:
- Tool must be mathematically accurate
- Use correct scientific/mathematical formulas
- inputs must have correct field IDs matching the js_formula
- js_formula must be complete working JavaScript
- Norwegian language throughout
- Advanced: show multiple results in desc field
- Return ONLY the JSON, no other text"""

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000,
        temperature=0.1  # Low temperature for accuracy
    )
    
    return response.choices[0].message.content

# Test with one keyword
keyword = "solinnfall kalkulator"
print(f"Testing with: {keyword}")
print("-" * 50)

result = generate_tool(keyword)
print(result)
print("-" * 50)

# Try to parse JSON
try:
    # Clean up markdown if present
    clean = result.strip()
    if clean.startswith('```'):
        clean = clean.split('```')[1]
        if clean.startswith('json'):
            clean = clean[4:]
    clean = clean.strip()
    
    tool = json.loads(clean)
    print("\n✅ Valid JSON!")
    print(f"Title: {tool.get('title')}")
    print(f"Formula: {tool.get('formula')}")
    print(f"Inputs: {len(tool.get('inputs', []))} fields")
    print(f"JS Formula length: {len(tool.get('js_formula', ''))} chars")
    
    # Test if JS formula looks valid
    js = tool.get('js_formula', '')
    if 'return {value:' in js or "return {value:" in js:
        print("✅ JS formula has return value")
    else:
        print("⚠️ JS formula might be incomplete")
        
except json.JSONDecodeError as e:
    print(f"\n❌ JSON parse error: {e}")
    print("Raw output needs cleaning")
