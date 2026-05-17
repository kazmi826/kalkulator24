#!/usr/bin/env python3
"""Fix all calc.js errors iteratively"""
import subprocess
import re

def test_calcjs():
    result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
    if 'SyntaxError' not in result.stderr:
        return None  # No error
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    return int(match.group(1)) if match else None

def fix_line(lines, line_num):
    """Try to fix error at given line number"""
    i = line_num - 1  # 0-indexed
    
    # Check lines before error
    for check in range(max(0, i-5), i):
        line = lines[check].rstrip()
        next_line = lines[check+1].strip() if check+1 < len(lines) else ''
        
        # If line ends with } or }; and next is a formula
        if (line.endswith('}') or line.endswith('};')) and re.match(r'[a-zA-Z_]', next_line):
            if line.endswith('};'):
                lines[check] = line[:-1] + ',\n'
            elif line.endswith('}'):
                lines[check] = line + ',\n'
            print(f"  Fixed line {check+1}: added comma")
            return True
    
    # Also fix backticks on error line area
    for check in range(max(0, i-5), i+1):
        if '`' in lines[check]:
            lines[check] = re.sub(r'`([^`]*)`', lambda m: "'" + m.group(1).replace("'", '"').replace('${', "' + ").replace('}', " + '") + "'", lines[check])
            print(f"  Fixed backtick on line {check+1}")
            return True
    
    return False

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print("Starting iterative fix...\n")

max_attempts = 50
attempt = 0

while attempt < max_attempts:
    attempt += 1
    error_line = test_calcjs()
    
    if error_line is None:
        print(f"\n✅ SUCCESS after {attempt-1} fixes!")
        break
    
    print(f"Attempt {attempt}: Error at line {error_line}")
    
    if not fix_line(lines, error_line):
        print(f"  Could not auto-fix line {error_line}")
        # Show context
        for i in range(max(0, error_line-4), min(len(lines), error_line+1)):
            print(f"    {i+1}: {lines[i][:80]}")
        
        # Last resort: if line has formula without preceding comma, add it
        i = error_line - 1
        if i > 0:
            prev = lines[i-1].rstrip()
            if not prev.endswith(',') and not prev.endswith('{'):
                lines[i-1] = prev + ',\n'
                print(f"  Last resort: added comma to line {i}")
    
    with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
        f.writelines(lines)

# Final test
error_line = test_calcjs()
if error_line is None:
    print("\n✅ calc.js is VALID!")
    print("\nNow run:")
    print("  git add assets/js/calc.js")
    print("  git commit -m 'fix all calc.js errors'")
    print("  git push origin main")
else:
    print(f"\n❌ Still error at line {error_line}")
    for i in range(max(0, error_line-3), min(len(lines), error_line+2)):
        print(f"  {i+1}: {lines[i][:80]}")
