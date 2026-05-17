#!/usr/bin/env python3
"""Fix template literal in calc.js line 2646"""
import re
import subprocess

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix line 2646 - replace backtick template literal
line = lines[2645]
print("Original line has backtick:", '`' in line)

if '`' in line:
    # Replace entire backtick string with simple concatenation
    new_desc = "desc: 'Kostnad: ' + totalKostnad.toFixed(0) + ' NOK | Strom: ' + stromkostnad.toFixed(0) + ' NOK | Sky: ' + skykostnad.toFixed(0) + ' NOK | Tid: ' + (treningTimer/24).toFixed(1) + ' dager | CO2: ' + co2Utslipp.toFixed(0) + ' kg'"
    line = re.sub(r'desc:\s*`[^`]*`', new_desc, line)
    lines[2645] = line
    print("Fixed!")
else:
    print("No backtick found on line 2646")

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

# Test
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("SUCCESS - No syntax errors!")
else:
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if match:
        ln = int(match.group(1))
        print(f"Still error at line {ln}:")
        for i in range(max(0,ln-3), min(len(lines), ln+1)):
            print(f"  {i+1}: {lines[i][:80]}")
