#!/usr/bin/env python3
"""Fix calc.js syntax errors - missing commas between formulas"""
import re
import subprocess

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original size: {len(content)} chars")

# Find all formula definitions and ensure they have commas
# Pattern: },\n  formulaName: or };\n  formulaName: (missing comma)

# Fix 1: Missing comma before formula name
# When a formula ends with }  and next line starts with a formula name
fixed = re.sub(r'\}\s*\n(\s+)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'},\n\1\2:', content)

if fixed != content:
    print(f"Fixed missing commas")
    content = fixed

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.write(content)

# Test with node
result = subprocess.run(
    ['node', '-e', "var c=require('fs').readFileSync('assets/js/calc.js','utf8'); eval('(function(){'+c+'})()'); console.log('OK')"],
    capture_output=True, text=True, cwd='.'
)

if 'OK' in result.stdout or 'document is not defined' in result.stderr:
    print("✅ calc.js is valid!")
else:
    print("❌ Still has errors:")
    print(result.stderr[:500])
    
    # Try to find the error line
    lines = content.split('\n')
    for i, line in enumerate(lines):
        # Check for formula without preceding comma
        if re.match(r'\s+[a-zA-Z_][a-zA-Z0-9_]*\s*:\s*\(i\)\s*=>', line):
            prev_line = lines[i-1].strip() if i > 0 else ''
            if prev_line and not prev_line.endswith(',') and not prev_line.endswith('{'):
                print(f"  Possible issue at line {i+1}: {line.strip()[:50]}")
                print(f"  Previous line: {prev_line[:50]}")
