#!/usr/bin/env python3
with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip() == '};' and 100 < i < 3500:
        print('Line ' + str(i+1) + ': STANDALONE }; found')
        print('  Prev: ' + repr(lines[i-1][:60]))
        print('  Next: ' + repr(lines[i+1][:60]))
        print()
