#!/usr/bin/env python3
"""Direct fix for calc.js - add newlines between formulas on same line"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# The real problem: multiple formulas are concatenated on same line
# Split them apart

# Pattern: find formula_name: (i) => {...} followed immediately by another formula
# We need to add comma+newline between them

# Split all single-line formulas that are joined together
# Pattern: } followed by spaces then formula_name:
count = 0

def add_comma_newline(m):
    global count
    count += 1
    return '},\n  ' + m.group(1) + ':'

# Fix: } formula_name: -> },\n  formula_name:
new_content = re.sub(
    r'\}\s{2,}([a-zA-Z_][a-zA-Z0-9_]*)\s*:(?=\s*\(i\)\s*=>)',
    add_comma_newline,
    content
)

print(f"Fixed {count} same-line formulas")

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

# Test iteratively
max_attempts = 100
for attempt in range(max_attempts):
    result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
    
    if 'document is not defined' in result.stderr and 'SyntaxError' not in result.stderr:
        print(f"\n✅ SUCCESS! calc.js is valid after {attempt} additional fixes")
        break
    
    if 'SyntaxError' not in result.stderr and result.stderr == '':
        print(f"\n✅ SUCCESS!")
        break
        
    if 'SyntaxError' not in result.stderr:
        print(f"\n✅ No SyntaxError - OK!")
        break

    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if not match:
        print("Unknown error:", result.stderr[:100])
        break
    
    line_num = int(match.group(1))
    
    with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    fixed = False
    # Try to add comma to line before error
    for check in range(max(0, line_num-5), line_num):
        line = lines[check].rstrip()
        if line.endswith('}') or line.endswith('};'):
            next_content = lines[check+1].strip() if check+1 < len(lines) else ''
            if re.match(r'[a-zA-Z_][a-zA-Z0-9_]*\s*:', next_content):
                if line.endswith('};'):
                    lines[check] = line[:-1] + ',\n'
                else:
                    lines[check] = line + ',\n'
                print(f"Attempt {attempt+1}: Fixed comma at line {check+1}")
                fixed = True
                break
    
    if not fixed:
        # Force fix: add comma to line before error line
        i = line_num - 2  # line before error
        if i >= 0:
            line = lines[i].rstrip()
            if not line.endswith(','):
                lines[i] = line + ',\n'
                print(f"Attempt {attempt+1}: Force-added comma at line {i+1}")
                fixed = True
    
    if fixed:
        with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
            f.writelines(lines)
    else:
        print(f"Could not fix error at line {line_num}")
        for i in range(max(0, line_num-3), min(len(lines), line_num+2)):
            print(f"  {i+1}: {lines[i][:80]}")
        break

# Final check
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("\n✅ FINAL: calc.js is VALID!")
    print("\nRun these commands:")
    print("  git add assets/js/calc.js")
    print("  git commit -m 'fix all calc.js syntax errors'")  
    print("  git push origin main")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print(f"\n❌ Still error at line {ln}")
