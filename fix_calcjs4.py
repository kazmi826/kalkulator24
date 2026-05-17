#!/usr/bin/env python3
"""Fix problematic formulas in calc.js"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix the kostnad_ai_bildegenerering formula
# Replace template literals with string concatenation
def fix_template_literals(content):
    # Find all template literals that contain colons and fix them
    # Replace `...${...}...` with string concatenation
    
    # Simple approach: find the problematic formula and replace it
    old_formula = re.search(
        r'kostnad_ai_bildegenerering:\s*\(i\)\s*=>.*?(?=\n\s+[a-zA-Z_][a-zA-Z0-9_]*\s*:|\n\};)',
        content, re.DOTALL
    )
    
    if old_formula:
        print(f"Found formula at pos {old_formula.start()}")
        # Replace with simple working formula
        new_formula = """kostnad_ai_bildegenerering: (i) => {
    if (!i.antall_bilder || !i.modell || !i.opplosning || !i.antall_genereringer) return null;
    const bilder = +i.antall_bilder;
    const gen = +i.antall_genereringer || 1;
    const priser = {'DALL-E 3': 0.04, 'Midjourney': 0.03, 'Stable Diffusion': 0.01};
    const pris = priser[i.modell] || 0.04;
    const total = (bilder * gen * pris).toFixed(2);
    const nok = (+total * 10.5).toFixed(2);
    return {value: total, unit: 'USD', desc: 'NOK: ' + nok + ' | ' + bilder + ' bilder x ' + gen + ' gen x $' + pris};
  },"""
        content = content[:old_formula.start()] + new_formula + '\n  ' + content[old_formula.end():]
    else:
        print("Formula not found with regex, trying direct search...")
        
    return content

content = fix_template_literals(content)

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(content)

# Test
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)

if 'SyntaxError' not in result.stderr:
    print("OK - No syntax errors!")
else:
    # Find next error
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if match:
        line_num = int(match.group(1))
        lines = content.split('\n')
        print(f"Error at line {line_num}:")
        for i in range(max(0, line_num-3), min(len(lines), line_num+2)):
            print(f"  {i+1}: {lines[i][:100]}")
    print(result.stderr[:300])
