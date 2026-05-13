import json
with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)
with open('../assets/js/calc.js', encoding='utf-8') as f:
    js = f.read()
missing = []
for t in db['tools']:
    formula = t.get('formula', '')
    if formula and formula not in js:
        missing.append(t['slug'] + ' -> ' + formula)
print('Missing formulas:', len(missing))
for m in missing:
    print(' ', m)
