#!/usr/bin/env python3
"""
Move all formulas that are outside Calculators object back inside it.
The }; at line 1801 closes Calculators prematurely.
Everything after line 1801 and before runCalculator needs to go inside.
"""
import subprocess, re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
print(f"Total lines: {len(lines)}")

# Find key positions
calc_close = None  # The premature }; 
run_calc = None    # function runCalculator

for i, line in enumerate(lines):
    if line.strip() == '};' and 1700 < i < 2000:
        calc_close = i
        print(f"Calculators }; at line {i+1}")
    if 'function runCalculator' in line and run_calc is None:
        run_calc = i
        print(f"runCalculator at line {i+1}")

if calc_close is None or run_calc is None:
    print("ERROR: Could not find key positions!")
    exit()

# Extract the "orphaned" formulas (between calc_close and run_calc)
# These need to go INSIDE Calculators
orphaned_start = calc_close + 1
orphaned_end = run_calc

orphaned = lines[orphaned_start:orphaned_end]
print(f"\nOrphaned formulas: lines {orphaned_start+1} to {orphaned_end}")
print(f"First orphaned line: {orphaned[0][:60] if orphaned else 'NONE'}")
print(f"Last orphaned line: {orphaned[-1][:60] if orphaned else 'NONE'}")

# Get the line just before calc_close (last formula in Calculators)
last_formula_line = lines[calc_close - 1].rstrip()
print(f"\nLast formula line: {repr(last_formula_line[-30:])}")

# Make sure last formula ends with comma
if last_formula_line.endswith('}'):
    lines[calc_close - 1] = last_formula_line + ','
elif last_formula_line.endswith('},'):
    pass  # Already has comma
    
# Clean orphaned lines - remove leading/trailing empty lines
while orphaned and not orphaned[0].strip():
    orphaned.pop(0)
while orphaned and not orphaned[-1].strip():
    orphaned.pop()

# Reconstruct:
# 1. Everything up to (not including) calc_close
# 2. Orphaned formulas (with proper comma handling)
# 3. }; (proper close of Calculators)
# 4. Empty lines + runCalculator onwards

# Make sure orphaned formulas end with comma for last one
if orphaned:
    last_orphan = orphaned[-1].rstrip()
    if last_orphan.endswith('}') and not last_orphan.endswith('},'):
        orphaned[-1] = last_orphan + ','
    print(f"Last orphaned: {repr(orphaned[-1][-30:])}")

# Build new content
new_lines = (
    lines[:calc_close] +          # Everything inside Calculators
    [''] +                          # Empty line
    orphaned +                      # Orphaned formulas (now inside)
    [''] +                          # Empty line
    ['};'] +                        # Close Calculators
    [''] +                          # Empty line
    lines[run_calc:]                # runCalculator and rest
)

new_content = '\n'.join(new_lines)

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nNew total lines: {len(new_lines)}")
print("Testing...")

# Test
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("✅ SUCCESS - calc.js is VALID!")
    print("\nRun:")
    print("git add assets/js/calc.js && git commit -m 'fix calc.js' && git push origin main")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print(f"❌ Error at line {ln}:")
    lines2 = new_content.split('\n')
    for i in range(max(0,ln-3), min(len(lines2), ln+2)):
        print(f"  {i+1}: {lines2[i][:80]}")
    print(result.stderr[:200])
