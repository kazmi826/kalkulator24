#!/usr/bin/env python3
"""Fix }; }, pattern in calc.js"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix: "}; }," should be "}; }," -> the inner }; is return statement end
# The outer }, is the formula end - this is actually CORRECT
# 
# Real problem: line 2646 ends with "}; }," but line 2647 starts new formula
# So line 2646 ALREADY has comma - but something before it is wrong
#
# Let's check: does line 2645 (ai_energy_usage) properly close?
# It ends with "}; }," which means return {value...}; } (formula end), (comma)
# This looks correct!
#
# But node says error at 2647... Let me check if Calculators object is broken

# Find the Calculators object opening
calc_start = content.find('const Calculators = {')
if calc_start == -1:
    calc_start = content.find('var Calculators = {')
if calc_start == -1:
    calc_start = content.find('Calculators = {')

print(f"Calculators object starts at char: {calc_start}")
print(f"Context: {content[calc_start:calc_start+50]}")

# Check if there's a stray }; before line 2647 that closes Calculators prematurely
lines = content.split('\n')

# Check for }; on its own line (which would close Calculators object)
problem_lines = []
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped == '};' and i > 100:  # Not at start
        problem_lines.append((i+1, line))

print(f"\nFound {len(problem_lines)} standalone '}}' lines:")
for ln, line in problem_lines[:10]:
    print(f"  Line {ln}: {repr(line)}")
    # Show context
    if ln > 2640 and ln < 2660:
        print(f"  *** This is in problem area! ***")

# The fix: find runCalculator function and check what's before it
run_calc_pos = content.find('function runCalculator')
if run_calc_pos > 0:
    # Get 200 chars before runCalculator
    before = content[run_calc_pos-200:run_calc_pos]
    print(f"\nBefore runCalculator:\n{before}")
    
    # The Calculators object should end with }; right before runCalculator
    # Find the closing }; of Calculators
    last_formula_end = content.rfind('},', 0, run_calc_pos)
    closing = content[last_formula_end:last_formula_end+50]
    print(f"\nLast formula ending: {repr(closing)}")

# Check lines 2644-2647 character by character
print("\n=== DETAILED LINE ANALYSIS ===")
for i in [2643, 2644, 2645, 2646]:
    line = lines[i]
    print(f"Line {i+1}: ends={repr(line[-10:])}, has_backtick={'`' in line}")
