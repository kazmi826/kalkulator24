#!/usr/bin/env python3
"""
Complete one-shot fix for calc.js
Strategy: 
1. Find the premature }; at line 1801
2. Remove it
3. Find runCalculator function  
4. Add proper }; before runCalculator
5. Fix all remaining syntax errors
"""
import subprocess, re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
print(f"Total lines: {len(lines)}")

# Step 1: Find and remove premature }; at line 1801
# and add it back before runCalculator
premature_pos = None
run_calc_pos = None

for i, line in enumerate(lines):
    if line.strip() == '};' and 1700 < i < 2000:
        # Check if next non-empty line is runCalculator
        for j in range(i+1, min(i+10, len(lines))):
            if lines[j].strip():
                if 'function runCalculator' in lines[j] or '// SMART CALCULATOR' in lines[j]:
                    premature_pos = i
                    print(f"Found premature }}; at line {i+1}")
                break

for i, line in enumerate(lines):
    if 'function runCalculator' in line:
        run_calc_pos = i
        print(f"Found runCalculator at line {i+1}")
        break

if premature_pos is not None:
    # Remove the premature };
    lines.pop(premature_pos)
    # Adjust run_calc_pos
    if run_calc_pos and run_calc_pos > premature_pos:
        run_calc_pos -= 1
    print(f"Removed premature }}; from line {premature_pos+1}")

# Step 2: Find where Calculators should actually close
# It should close just before runCalculator
# Add }; before runCalculator if not already there
if run_calc_pos:
    # Check lines before runCalculator
    prev_lines = [lines[run_calc_pos-i].strip() for i in range(1, 6)]
    print(f"Lines before runCalculator: {prev_lines}")
    
    has_closing = any(l == '};' for l in prev_lines[:3])
    if not has_closing:
        # Insert }; before runCalculator
        lines.insert(run_calc_pos, '')
        lines.insert(run_calc_pos, '};')
        print(f"Added }}; before runCalculator at line {run_calc_pos+1}")

# Step 3: Rebuild content and fix all remaining issues
content = '\n'.join(lines)

# Fix template literals that cause issues
# Replace backtick strings with safe versions
def safe_template(m):
    s = m.group(1)
    # Replace ${expr} with safe concatenation
    s = re.sub(r'\$\{([^}]+)\}', r"' + (\1) + '", s)
    return "'" + s + "'"

# Only fix template literals inside formula return statements
content = re.sub(r'desc:\s*`([^`]*)`', lambda m: "desc: '" + 
    re.sub(r'\$\{([^}]+)\}', r"' + (\1) + '", m.group(1)) + "'", content)

# Step 4: Fix missing commas between formulas
lines = content.split('\n')
fixed_commas = 0
for i in range(len(lines)-1):
    curr = lines[i].rstrip()
    next_stripped = lines[i+1].strip() if i+1 < len(lines) else ''
    
    if (curr.endswith('}') and 
        re.match(r'[a-zA-Z_][a-zA-Z0-9_]*\s*:', next_stripped) and
        '=>' in lines[i+1] if i+1 < len(lines) else False):
        lines[i] = curr + ','
        fixed_commas += 1

print(f"Fixed {fixed_commas} missing commas")
content = '\n'.join(lines)

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(content)

# Step 5: Test and fix remaining errors iteratively
print("\nTesting...")
for attempt in range(30):
    result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
    
    if 'SyntaxError' not in result.stderr:
        print(f"SUCCESS after {attempt} fixes!")
        break
    
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if not match:
        print("Unknown error:", result.stderr[:200])
        break
    
    ln = int(match.group(1))
    
    with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"Attempt {attempt+1}: Error at line {ln}")
    
    fixed = False
    # Add comma to line before error
    for check in range(max(0, ln-5), ln):
        line = lines[check].rstrip()
        next_l = lines[check+1].strip() if check+1 < len(lines) else ''
        if (line.endswith('}') or line.endswith('};')) and re.match(r'[a-zA-Z_]', next_l):
            if line.endswith('};'):
                lines[check] = line[:-1] + ',\n'
            else:
                lines[check] = line + ',\n'
            fixed = True
            print(f"  Fixed comma at line {check+1}")
            break
    
    if not fixed:
        # Force add comma to line before error
        i = ln - 2
        if i >= 0:
            line = lines[i].rstrip()
            if not line.endswith(',') and not line.endswith('{'):
                lines[i] = line + ',\n'
                fixed = True
                print(f"  Force fixed line {i+1}")
    
    if fixed:
        with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
            f.writelines(lines)

# Final test
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("\n✅ calc.js is VALID!")
    print("\nNow run:")
    print("git add assets/js/calc.js && git commit -m 'fix calc.js' && git push origin main")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print(f"\n❌ Still error at line {ln}")
    print(result.stderr[:200])
