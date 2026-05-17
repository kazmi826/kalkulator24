#!/usr/bin/env python3
"""
Generate missing formulas using DeepSeek API
Adds them properly to calc.js with correct syntax
"""
import json, time, re, subprocess
from openai import OpenAI

with open('config.json', encoding='utf-8') as f:
    cfg = json.load(f)

with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

client = OpenAI(api_key=cfg['deepseek_api_key'], base_url="https://api.deepseek.com")

def get_missing_formulas():
    with open('../assets/js/calc.js', encoding='utf-8') as f:
        js = f.read()
    missing = []
    seen = set()
    for tool in db['tools']:
        formula = tool.get('formula', '')
        if formula and formula not in js and formula not in seen:
            missing.append(tool)
            seen.add(formula)
    return missing

def generate_formula(tool):
    inputs_desc = ', '.join([inp['id'] for inp in tool.get('inputs', [])])
    prompt = f"""Write a JavaScript calculator formula for: "{tool['title']}"
Formula name: {tool['formula']}
Input fields: {inputs_desc}
Category: {tool['category']}

Return ONLY this exact format (one line, no newlines inside):
{tool['formula']}: (i) => {{ if(!i.{tool['inputs'][0]['id'] if tool.get('inputs') else 'value'}) return null; const result = /* calculation */; return {{value: result, unit: 'unit', desc: 'description'}}; }},

Requirements:
- Mathematically correct formula
- Use i.fieldname to access inputs (e.g. i.{tool['inputs'][0]['id'] if tool.get('inputs') else 'value'})
- Return object with value, unit, desc
- NO template literals (no backticks)
- Use string concatenation with + for desc
- Single line only
- End with }},
- Norwegian units and descriptions"""

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.1
        )
        formula_code = response.choices[0].message.content.strip()
        
        # Clean up
        if '```' in formula_code:
            formula_code = re.sub(r'```[a-z]*\n?', '', formula_code).strip()
        
        # Ensure it starts with formula name
        if not formula_code.startswith(tool['formula']):
            # Try to find it
            match = re.search(r'(' + re.escape(tool['formula']) + r'\s*:\s*\(i\).*)', formula_code)
            if match:
                formula_code = match.group(1)
        
        # Ensure ends with },
        formula_code = formula_code.strip()
        if formula_code.endswith('}'):
            formula_code += ','
        elif formula_code.endswith('};'):
            formula_code = formula_code[:-1] + ','
        
        return formula_code
    except Exception as e:
        print(f"  API error: {e}")
        return None

def add_formula_to_calcjs(formula_code):
    with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the closing }; of Calculators object
    # Insert before the last }; 
    insert_pos = content.rfind('};')
    if insert_pos == -1:
        return False
    
    new_content = content[:insert_pos] + '\n  ' + formula_code + '\n' + content[insert_pos:]
    
    with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def test_calcjs():
    result = subprocess.run(['node', '../assets/js/calc.js'], capture_output=True, text=True, encoding='utf-8', errors='replace')
    return 'SyntaxError' not in result.stderr

def restore_calcjs(backup):
    with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
        f.write(backup)

# Main
missing = get_missing_formulas()
print(f"Missing formulas: {len(missing)}")

batch_size = int(input("How many to generate? (e.g. 50): ") or "50")
missing = missing[:batch_size]

success = 0
failed = 0

for i, tool in enumerate(missing):
    print(f"\n[{i+1}/{len(missing)}] {tool['title']} -> {tool['formula']}")
    
    # Backup current calc.js
    with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
        backup = f.read()
    
    formula_code = generate_formula(tool)
    if not formula_code:
        print(f"  SKIP - could not generate")
        failed += 1
        continue
    
    print(f"  Generated: {formula_code[:80]}...")
    
    # Add to calc.js
    add_formula_to_calcjs(formula_code)
    
    # Test
    if test_calcjs():
        print(f"  OK - added successfully")
        success += 1
    else:
        print(f"  FAIL - syntax error, reverting")
        restore_calcjs(backup)
        failed += 1
    
    time.sleep(0.3)

print(f"\n{'='*50}")
print(f"Done! Success: {success} | Failed: {failed}")
print(f"Missing remaining: {len(get_missing_formulas())}")
print(f"\nNow run:")
print(f"  git add ../assets/js/calc.js")
print(f"  git commit -m 'add {success} new formulas'")
print(f"  git push origin main")
