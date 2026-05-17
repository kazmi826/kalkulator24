#!/usr/bin/env python3
"""Master fix for all calc.js syntax errors"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original size: {len(content)} chars")
original = content

# ============================================================
# FIX 1: Remove all template literals - replace with string concat
# Template literals with ${} cause issues in some contexts
# ============================================================
def fix_template_literals(content):
    count = 0
    # Find template literals in formula return statements
    # Pattern: `...${expr}...` -> '...' + expr + '...'
    
    def replace_template(m):
        nonlocal count
        template = m.group(0)
        # Skip if it's a simple template without colons after ${}
        if '}: ' not in template and "}')" not in template:
            return template
        
        # Convert template literal to string concatenation
        result = template[1:-1]  # Remove backticks
        
        # Replace ${expr} with ' + expr + '
        result = re.sub(r'\$\{([^}]+)\}', r"' + \1 + '", result)
        result = "'" + result + "'"
        
        # Clean up empty strings
        result = result.replace("'' + ", "").replace(" + ''", "")
        count += 1
        return result
    
    # Find backtick strings
    new_content = re.sub(r'`[^`]*`', replace_template, content)
    print(f"Fixed {count} template literals")
    return new_content

content = fix_template_literals(content)

# ============================================================
# FIX 2: Add missing commas between formulas
# ============================================================
def fix_missing_commas(content):
    lines = content.split('\n')
    fixed = 0
    
    for i in range(len(lines) - 1):
        curr = lines[i].rstrip()
        next_stripped = lines[i+1].strip()
        
        # Current line ends with } (formula end)
        # Next line starts with formula_name: (i) =>
        if (curr.endswith('}') and 
            re.match(r'[a-zA-Z_][a-zA-Z0-9_]*\s*:\s*\(i\)\s*=>', next_stripped)):
            lines[i] = curr + ','
            fixed += 1
        
        # Current line ends with }; (should be },)
        elif (curr.endswith('};') and 
              re.match(r'[a-zA-Z_][a-zA-Z0-9_]*\s*:\s*\(i\)\s*=>', next_stripped)):
            lines[i] = curr[:-1] + ','
            fixed += 1
    
    print(f"Fixed {fixed} missing commas")
    return '\n'.join(lines)

content = fix_missing_commas(content)

# ============================================================
# FIX 3: Fix formulas on same line (no newline between them)
# ============================================================
def fix_same_line_formulas(content):
    # Pattern: }  formula_name: (i) => on same line
    fixed = re.sub(
        r'\}\s{2,}([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*\(i\)\s*=>',
        r'},\n  \1: (i) =>',
        content
    )
    count = len(re.findall(r'},\n  [a-zA-Z]', fixed)) - len(re.findall(r'},\n  [a-zA-Z]', content))
    print(f"Fixed same-line formulas")
    return fixed

content = fix_same_line_formulas(content)

# ============================================================
# FIX 4: Fix specific problematic formulas
# ============================================================
def fix_specific_formulas(content):
    # Replace kostnad_ai_bildegenerering with clean version
    pattern = r'kostnad_ai_bildegenerering:\s*\(i\)\s*=>\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}(?:\s*,)?'
    
    new_formula = """kostnad_ai_bildegenerering: (i) => {
    if (!i.antall_bilder || !i.modell) return null;
    const bilder = +i.antall_bilder;
    const gen = +i.antall_genereringer || 1;
    const priser = {'DALL-E 3': 0.04, 'Midjourney': 0.03, 'Stable Diffusion': 0.01, 'Adobe Firefly': 0.02};
    const pris = priser[i.modell] || 0.04;
    const total = (bilder * gen * pris).toFixed(2);
    const nok = (+total * 10.5).toFixed(2);
    const anbefaling = +total > 10 ? 'Vurder færre genereringer' : 'Rimelig kostnad';
    return {value: total, unit: 'USD', desc: 'NOK: ' + nok + ' kr | ' + bilder + ' bilder | ' + anbefaling};
  },"""
    
    result = re.sub(pattern, new_formula, content, flags=re.DOTALL)
    if result != content:
        print("Fixed kostnad_ai_bildegenerering formula")
    return result

content = fix_specific_formulas(content)

# ============================================================
# Save and test iteratively
# ============================================================
with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(content)

# Test loop - fix errors one by one
max_attempts = 20
attempt = 0

while attempt < max_attempts:
    attempt += 1
    result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
    
    if 'SyntaxError' not in result.stderr and 'ReferenceError: document' in result.stderr:
        print(f"\n✅ calc.js is VALID! (attempt {attempt})")
        print("document is not defined = normal in Node.js, means no JS errors!")
        break
    elif 'SyntaxError' not in result.stderr and result.stderr == '':
        print(f"\n✅ calc.js is VALID! (attempt {attempt})")
        break
    
    # Find error line
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if not match:
        print("Unknown error:")
        print(result.stderr[:200])
        break
    
    line_num = int(match.group(1))
    lines = content.split('\n')
    
    print(f"Attempt {attempt}: Error at line {line_num}")
    
    # Show context
    for i in range(max(0, line_num-3), min(len(lines), line_num+1)):
        print(f"  {i+1}: {lines[i][:80]}")
    
    # Try to fix: add comma before problematic line
    if line_num > 1:
        prev_line = lines[line_num-2].rstrip()
        curr_line = lines[line_num-1].strip()
        
        # If previous line ends with } and current is formula
        if prev_line.endswith('}') and re.match(r'[a-zA-Z_].*:\s*\(i\)\s*=>', curr_line):
            lines[line_num-2] = prev_line + ','
            content = '\n'.join(lines)
            with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Fixed: added comma at line {line_num-1}")
            continue
        
        # If line has template literal colon issue
        if '}: ' in prev_line or curr_line.startswith('}'):
            # Try removing semicolon and adding comma
            if prev_line.endswith('};'):
                lines[line_num-2] = prev_line[:-1] + ','
            elif prev_line.endswith('}'):
                lines[line_num-2] = prev_line + ','
            content = '\n'.join(lines)
            with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Fixed: line {line_num-1}")
            continue
    
    print("Could not auto-fix this error")
    break

print(f"\nFinal check:")
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("✅ SUCCESS - No syntax errors!")
    print("Now run: git add . && git commit -m 'fix calcjs' && git push")
else:
    print("❌ Still has errors - manual fix needed")
    print(result.stderr[:300])
