#!/usr/bin/env python3
"""Clean all content files - remove markdown intro lines"""
import os

content_dir = '../content'
fixed = 0

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
            stripped = line.strip()
            # Remove markdown code blocks
            if stripped.startswith('```'):
                continue
            # Remove intro lines
            skip = False
            for x in ['here is', 'here are', 'below is', 'the following', 
                      'this article', 'i have written', 'note:', 
                      'i have created', 'below you will', 'the article']:
                if stripped.lower().startswith(x):
                    skip = True
                    break
            if skip:
                continue
            clean_lines.append(line)
        
        new_content = '\n'.join(clean_lines).strip()
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed += 1
    except Exception as e:
        print('Error on ' + filename + ': ' + str(e))

print('Fixed ' + str(fixed) + ' content files')
