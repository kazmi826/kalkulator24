#!/usr/bin/env python3
"""Final fix - restructure calc.js properly"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find Calculators object start
calc_start = content.find('const Calculators = {')

# Find runCalculator function
run_calc = content.find('function runCalculator')

# Find the }; that closes Calculators (should be just before runCalculator)
# Get everything between Calculators start and runCalculator
calc_section = content[calc_start:run_calc]

print(f"Calculators section length: {len(calc_section)}")
print(f"Last 100 chars of calc section:\n{repr(calc_section[-100:])}")

# Count opening and closing braces to find where Calculators should end
depth = 0
calc_end_pos = calc_start
i = calc_start

# Skip 'const Calculators = {'
i = content.find('{', calc_start) + 1
depth = 1

while i < run_calc and depth > 0:
    c = content[i]
    if c == '{':
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0:
            calc_end_pos = i
            break
    i += 1

print(f"\nCalculators closes at position: {calc_end_pos}")
print(f"Context: {repr(content[calc_end_pos-20:calc_end_pos+50])}")

# Find line number of calc_end_pos
line_num = content[:calc_end_pos].count('\n') + 1
print(f"That's around line: {line_num}")

# Now fix: make sure Calculators properly closes before runCalculator
# Get all formulas
formulas_content = content[content.find('{', calc_start)+1:calc_end_pos]

# Get everything after Calculators
after_calc = content[calc_end_pos+1:]

# Find the runCalculator function in after_calc
run_func_pos = after_calc.find('function runCalculator')

# Get any extra stuff between calc end and runCalculator
between = after_calc[:run_func_pos]
print(f"\nBetween Calculators end and runCalculator:\n{repr(between[:200])}")

# Remove any stray }; from between
between_clean = re.sub(r'^\s*\};\s*\n', '', between, flags=re.MULTILINE)

# Reconstruct
new_content = (
    content[:calc_start] +
    'const Calculators = {' +
    formulas_content +
    '\n};\n\n' +
    between_clean +
    after_calc[run_func_pos:]
)

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

# Test
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("\n✅ SUCCESS - calc.js is VALID!")
    print("\nRun:")
    print("  git add assets/js/calc.js")
    print("  git commit -m 'fix calc.js structure'")
    print("  git push origin main")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print(f"\n❌ Error at line {ln}:")
    print(result.stderr[:300])
    
    lines = new_content.split('\n')
    for i in range(max(0,ln-3), min(len(lines), ln+2)):
        print(f"  {i+1}: {lines[i][:80]}")
