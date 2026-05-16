import json

with open('tools_database.json', encoding='utf-8') as f:
    db = json.load(f)

fixes = {
    'cone': 'cone',
    'ai_energy_usage_calculator': 'generic',
    'nedre_kvartil_formel': 'median',
    'harmonisk_gjennomsnitt_formel': 'average',
    'invers_cosekant_formel': 'generic',
    'vektor_magnitude_formel': 'magnitude',
    'vektorprojeksjon_formel': 'generic',
    'gjennomsnittsverdisetning_formel': 'average',
    'elkjop_pant_kalkulator': 'generic',
}

fixed = 0
for tool in db['tools']:
    formula = tool.get('formula', '')
    if formula in fixes:
        tool['formula'] = fixes[formula]
        fixed += 1
        print('Fixed: ' + tool['slug'])

with open('tools_database.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print('Done! Fixed ' + str(fixed) + ' formulas')
