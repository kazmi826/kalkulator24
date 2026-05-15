#!/usr/bin/env python3
"""Fix syntax error in calc.js"""

with open('assets/js/calc.js', encoding='utf-8') as f:
    lines = f.readlines()

print("Line 93-97:")
for i, l in enumerate(lines[92:97], 93):
    print(f"{i}: {l}", end='')

# Fix line 95 - remove the extra '"' at the end
for i, line in enumerate(lines):
    if "toFixed(4)'\"\"'}" in line:
        print(f"\nFound bad line {i+1}: {line.strip()}")
        lines[i] = line.replace("toFixed(4)'\"\"'}", "toFixed(4)+' mm'}")
        print(f"Fixed to: {lines[i].strip()}")

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("\nDone! Now testing...")
import subprocess
result = subprocess.run(['node', '-e', "require('./assets/js/calc.js'); console.log('OK')"], 
                      capture_output=True, text=True)
print("Output:", result.stdout)
print("Error:", result.stderr[:200] if result.stderr else "None")
