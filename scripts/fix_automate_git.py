# Fix git push in automate.py - ignore errors
import re

with open('automate.py', 'r', encoding='utf-8') as f:
    content = f.read()

old = """        print("Committing to git...")
        os.chdir('..')
        subprocess.run(['git', 'add', '.'], check=True)
        subprocess.run(['git', 'commit', '-m', f'auto: add {added_tools} new tools'], check=True)
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)
        print("✅ Deployed!")"""

new = """        print("Committing to git...")
        os.chdir('..')
        subprocess.run(['git', 'add', '.'])
        subprocess.run(['git', 'commit', '-m', f'auto: add {added_tools} new tools'])
        result = subprocess.run(['git', 'push', 'origin', 'main'])
        if result.returncode == 0:
            print("✅ Pushed to GitHub!")
        else:
            print("⚠️ Push failed - run manually: git push origin main")
        print("✅ Done!")"""

if old in content:
    content = content.replace(old, new)
    with open('automate.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed!")
else:
    print("Pattern not found - already fixed or different version")
