#!/usr/bin/env python3
"""Fix premature }; closing the Calculators object at line 1786"""
import subprocess

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print(f"\nLine 1784-1788:")
for i in range(1783, 1788):
    print(f"  {i+1}: {repr(lines[i][:80])}")

# Line 1786 (index 1785) is the premature };
# Check what it looks like
line_1786 = lines[1785].strip()
print(f"\nLine 1786: {repr(line_1786)}")

if line_1786 == '};':
    # Remove this premature closing brace
    # But we need to make sure the formula before it ends with comma
    prev_line = lines[1784].rstrip()
    print(f"Line 1785: {repr(prev_line[-30:])}")
    
    # Remove line 1786
    lines.pop(1785)
    print("Removed premature }; at line 1786")
    
    # Also check line 3600 (now 3599 after removal)
    # Find new position of second };
    for i, line in enumerate(lines):
        if line.strip() == '};' and i > 1500:
            print(f"\nFound second }}; at line {i+1}")
            print(f"Context around it:")
            for j in range(max(0,i-3), min(len(lines), i+4)):
                print(f"  {j+1}: {repr(lines[j][:80])}")
            break

with open('assets/js/calc.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)

# Test
import subprocess
result = subprocess.run(['node', 'assets/js/calc.js'], capture_output=True, text=True)
if 'SyntaxError' not in result.stderr:
    print("\n✅ SUCCESS - calc.js is valid!")
    print("\nNow run:")
    print("  git add assets/js/calc.js")
    print("  git commit -m 'fix calc.js premature closing brace'")
    print("  git push origin main")
else:
    import re
    match = re.search(r'calc\.js:(\d+)', result.stderr)
    ln = int(match.group(1)) if match else 0
    print(f"\n❌ Still error at line {ln}")
    print(result.stderr[:300])
