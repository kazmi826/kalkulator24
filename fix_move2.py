#!/usr/bin/env python3
import subprocess, re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
print("Total lines: " + str(len(lines)))

calc_close = None
run_calc = None

for i, line in enumerate(lines):
    if line.strip() == '};' and 1700 < i < 2000:
        calc_close = i
        print("Calculators close at line " + str(i+1))
    if 'function runCalculator' in line and run_calc is None:
        run_calc = i
        print("runCalculator at line " + str(i+1))

if calc_close is None or run_calc is None:
    print("ERROR: Could not find positions!")
    exit()

# Extract orphaned formulas
orphaned = lines[calc_close+1:run_calc]
while orphaned and not orphaned[0].strip():
    orphaned.pop(0)
while orphaned and not orphaned[-1].strip():
    orphaned.pop()

print("Orphaned lines: " + str(len(orphaned)))

# Fix last formula before calc_close - ensure comma
last = lines[calc_close-1].rstrip()
if last.endswith('}') and not last.endswith('},'):
    lines[calc_close-1] = last + ','

# Fix last orphaned formula - ensure comma
if orphaned:
    last_o = orphaned[-1].rstrip()
    if last_o.endswith('}') and not last_o.endswith('},'):
        orphaned[-1] = last_o + ','

# Build new content
new_lines = (
    lines[:calc_close] +
    [''] +
    orphaned +
    [''] +
    ['};'] +
    [''] +
    lines[run_calc:]
)

new_content = '\n'.join(new_lines)

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("New total lines: " + str(len(new_lines)))
print("Testing...")

result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("SUCCESS - calc.js is VALID!")
    print("Run: git add assets/js/calc.js && git commit -m fix && git push origin main")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print("Error at line " + str(ln))
    lines2 = new_content.split('\n')
    for i in range(max(0,ln-3), min(len(lines2), ln+2)):
        print("  " + str(i+1) + ": " + lines2[i][:80])
    print(result.stderr[:300])
