#!/usr/bin/env python3
import os

content_dir = '../content'
fixed = 0

skip_starts = [
    'here is', 'here are', 'below is', 'the following',
    'this article', 'i have', 'note:', 'her er', 'nedenfor',
    'denne artikkelen', 'artikkelen er', 'artikkelen inneholder',
    'under finner', 'her finner', 'jeg har', 'se nedenfor',
    'following is', 'below you'
]

for filename in os.listdir(content_dir):
    if not filename.endswith('.html'):
        continue
    filepath = os.path.join(content_dir, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        clean_lines = []
        for line in lines:
            s = line.strip().lower()
            if s.startswith('`'):
                continue
            skip = any(s.startswith(x) for x in skip_starts)
            if not skip:
                clean_lines.append(line)
        
        new = '\n'.join(clean_lines).strip()
        if new != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new)
            fixed += 1
    except Exception as e:
        print('Error: ' + filename + ' - ' + str(e))

print('Fixed: ' + str(fixed) + ' files')
