#!/usr/bin/env python3
"""Comprehensive fix for calc.js - fix all syntax errors from automation"""
import re
import subprocess

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original size: {len(content)} chars")

# The main issue: formulas are on same line without comma separator
# Pattern: },\n  next_formula: should be },\n  next_formula:
# But automation added them as:
# ...return {...}; }\n  next_formula: (i) => {
# Missing comma after closing }

# Fix: Add comma after } that precedes a formula name
# Pattern: "} \n  formula_name:" -> "},\n  formula_name:"

# Step 1: Fix formulas that end with } and next line starts with formula
fixed_content = re.sub(
    r'(\})\s*\n(\s{2,4})([a-zA-Z_][a-zA-Z0-9_]*)\s*:(\s*\(i\)\s*=>)',
    r'\1,\n\2\3:\4',
    content
)

# Step 2: Fix formulas ending with }; that should end with },
fixed_content = re.sub(
    r'(\})\s*;\s*\n(\s{2,4})([a-zA-Z_][a-zA-Z0-9_]*)\s*:(\s*\(i\)\s*=>)',
    r'\1,\n\2\3:\4',
    fixed_content
)

# Step 3: Fix comment lines between formulas
fixed_content = re.sub(
    r'(\})\s*,?\s*\n(\s*//[^\n]*)\n(\s{2,4})([a-zA-Z_][a-zA-Z0-9_]*)\s*:(\s*\(i\)\s*=>)',
    r'\1,\n\2\n\3\4:\5',
    fixed_content
)

changes = len(content) != len(fixed_content) or content != fixed_content
print(f"Changes made: {changes}")

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

# Test
result = subprocess.run(
    ['node', 'assets/js/calc.js'],
    capture_output=True, text=True
)

if 'SyntaxError' not in result.stderr:
    print("✅ No syntax errors!")
else:
    # Find first error
    lines = result.stderr.split('\n')
    for line in lines[:5]:
        print(line)
    
    # Find problem line
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    if match:
        line_num = int(match.group(1))
        content_lines = fixed_content.split('\n')
        print(f"\nProblem around line {line_num}:")
        for i in range(max(0, line_num-3), min(len(content_lines), line_num+2)):
            print(f"  {i+1}: {content_lines[i][:80]}")
