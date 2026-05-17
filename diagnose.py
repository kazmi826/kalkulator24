#!/usr/bin/env python3
"""Permanent fix - find exact problem and fix it"""
import subprocess
import re

with open('assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the exact problem area
lines = content.split('\n')

# Show lines 2643-2648
print("=== PROBLEM AREA ===")
for i in range(2642, 2650):
    print(f"Line {i+1} (len={len(lines[i])}): {lines[i][:120]}")
    print(f"  ENDS WITH: {repr(lines[i][-5:])}")
    print()

# Check if line 2644 (ai_energy_usage) properly ends
line_2644 = lines[2643]  # 0-indexed
line_2645 = lines[2644]  # ai_skaleringskostnader
line_2646 = lines[2645]  # kostnad_ai_bildegenerering start

print(f"\nLine 2644 ends: {repr(line_2644[-20:])}")
print(f"Line 2645 ends: {repr(line_2645[-20:])}")
