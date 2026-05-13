#!/usr/bin/env python3
"""
Add new tools to tools_database.json directly
"""
import json

# Load existing database
with open('tools_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Add new category
if 'odds' not in db['categories']:
    db['categories']['odds'] = {"name": "Odds og Statistikk", "icon": "🎲"}
    print("Added 'odds' category")

# New tools to add
new_tools = [
    {"slug":"robux-skatt-kalkulator","title":"Robux Skatte Kalkulator","category":"spill","description":"Beregn Robux avgift ved kjøp og salg","formula":"robux_tax","keywords":"robux skatt kalkulator roblox","inputs":[{"id":"robux_amount","label":"Robux beløp","type":"number","placeholder":"1000"},{"id":"transaction_type","label":"Transaksjonstype","type":"select","options":["Kjøp","Salg","GamePass","Klær"]}]},
    {"slug":"devex-kalkulator","title":"DevEx Kalkulator","category":"spill","description":"Beregn DevEx utbetaling fra Robux","formula":"devex_calc","keywords":"devex kalkulator robux usd","inputs":[{"id":"robux_amount","label":"Robux beløp","type":"number","placeholder":"100000"}]},
    {"slug":"pokemon-kalkulator","title":"Pokemon Kalkulator","category":"spill","description":"Beregn Pokemon statistikker og styrke","formula":"pokemon_calc","keywords":"pokemon kalkulator stat iv ev","inputs":[{"id":"base_stat","label":"Grunnstat","type":"number","placeholder":"100"},{"id":"iv","label":"IV (0-31)","type":"number","placeholder":"31"},{"id":"ev","label":"EV (0-252)","type":"number","placeholder":"252"},{"id":"level","label":"Nivå","type":"number","placeholder":"50"},{"id":"nature","label":"Nature","type":"select","options":["Nøytral","Positiv","Negativ"]}]},
    {"slug":"persona5-fusjon","title":"Persona 5 Fusjonskalkulator","category":"spill","description":"Beregn Persona fusjon resultat","formula":"persona_fusion","keywords":"persona 5 fusjon kalkulator arcana","inputs":[{"id":"persona1_level","label":"Persona 1 nivå","type":"number","placeholder":"20"},{"id":"persona2_level","label":"Persona 2 nivå","type":"number","placeholder":"25"},{"id":"arcana","label":"Arcana","type":"select","options":["Fool","Magician","Priestess","Emperor","Hierophant","Lovers","Chariot","Justice","Hermit","Fortune","Strength","Hanged","Death","Temperance","Devil","Tower","Star","Moon","Sun","Judgement","World"]}]},
    {"slug":"kelly-kriterium-kalkulator","title":"Kelly Kriterium Kalkulator","category":"odds","description":"Beregn optimal innsats med Kelly kriteriet","formula":"kelly_criterion","keywords":"kelly kriterium kalkulator bankroll management","inputs":[{"id":"win_probability","label":"Vinnersannsynlighet (0-1)","type":"number","placeholder":"0.55"},{"id":"odds","label":"Desimalodds","type":"number","placeholder":"2.0"},{"id":"bankroll","label":"Bankroll (kr)","type":"number","placeholder":"10000"}]},
    {"slug":"poker-odds-kalkulator","title":"Poker Odds Kalkulator","category":"odds","description":"Beregn poker odds og pot odds","formula":"poker_odds","keywords":"poker odds kalkulator outs equity","inputs":[{"id":"outs","label":"Antall outs","type":"number","placeholder":"9"},{"id":"cards_remaining","label":"Kort igjen","type":"number","placeholder":"47"},{"id":"pot_size","label":"Pott størrelse (kr)","type":"number","placeholder":"500"},{"id":"call_amount","label":"Call beløp (kr)","type":"number","placeholder":"100"}]},
    {"slug":"parlay-kalkulator","title":"Parlay Kalkulator","category":"odds","description":"Beregn parlay utbetaling og kombinert odds","formula":"parlay_calc","keywords":"parlay kalkulator kombinert odds","inputs":[{"id":"bet_amount","label":"Innsats (kr)","type":"number","placeholder":"100"},{"id":"odds1","label":"Odds 1","type":"number","placeholder":"1.8"},{"id":"odds2","label":"Odds 2","type":"number","placeholder":"2.1"},{"id":"odds3","label":"Odds 3","type":"number","placeholder":"1.6"},{"id":"odds4","label":"Odds 4","type":"number","placeholder":"0"}]},
    {"slug":"forventet-verdi-kalkulator","title":"Forventet Verdi Kalkulator","category":"odds","description":"Beregn forventet verdi (EV) for en hendelse","formula":"expected_value","keywords":"forventet verdi kalkulator EV statistikk","inputs":[{"id":"win_amount","label":"Gevinst (kr)","type":"number","placeholder":"200"},{"id":"win_probability","label":"Vinnersannsynlighet (%)","type":"number","placeholder":"55"},{"id":"lose_amount","label":"Tap (kr)","type":"number","placeholder":"100"},{"id":"lose_probability","label":"Tapssannsynlighet (%)","type":"number","placeholder":"45"}]},
    {"slug":"poisson-kalkulator","title":"Poisson Kalkulator","category":"odds","description":"Beregn Poisson sannsynlighetsfordeling","formula":"poisson_calc","keywords":"poisson kalkulator sannsynlighet fordeling","inputs":[{"id":"lambda","label":"Gjennomsnittlig rate (λ)","type":"number","placeholder":"2.5"},{"id":"k","label":"Antall hendelser (k)","type":"number","placeholder":"3"}]},
    {"slug":"odds-kalkulator","title":"Odds Kalkulator","category":"odds","description":"Beregn utbetaling og implisitt sannsynlighet","formula":"odds_calc","keywords":"odds kalkulator utbetaling sannsynlighet","inputs":[{"id":"decimal_odds","label":"Desimalodds","type":"number","placeholder":"2.5"},{"id":"stake","label":"Innsats (kr)","type":"number","placeholder":"100"}]},
    {"slug":"fotball-odds-kalkulator","title":"Fotball Odds Kalkulator","category":"odds","description":"Beregn fotball odds og bookmaker margin","formula":"football_odds","keywords":"fotball odds kalkulator margin sannsynlighet","inputs":[{"id":"home_odds","label":"Hjemmeodds","type":"number","placeholder":"2.1"},{"id":"draw_odds","label":"Uavgjortodds","type":"number","placeholder":"3.4"},{"id":"away_odds","label":"Borteodds","type":"number","placeholder":"3.8"},{"id":"stake","label":"Innsats (kr)","type":"number","placeholder":"100"}]},
    {"slug":"trifecta-kalkulator","title":"Trifecta Kalkulator","category":"odds","description":"Beregn trifecta kombinasjoner og kostnad","formula":"trifecta_calc","keywords":"trifecta kalkulator hesteveddeløp kombinasjoner","inputs":[{"id":"horses","label":"Antall hester","type":"number","placeholder":"8"},{"id":"stake","label":"Innsats per kombinasjon (kr)","type":"number","placeholder":"10"}]},
    {"slug":"runde-robin-kalkulator","title":"Runde Robin Kalkulator","category":"odds","description":"Beregn runde robin kombinasjoner","formula":"round_robin","keywords":"runde robin kalkulator kombinasjoner betting","inputs":[{"id":"selections","label":"Antall valg","type":"number","placeholder":"4"},{"id":"stake","label":"Innsats per kombinasjon (kr)","type":"number","placeholder":"50"}]},
    {"slug":"arbitrasje-kalkulator","title":"Arbitrasjekalkulator","category":"odds","description":"Finn arbitrasjemuligheter mellom bookmakers","formula":"arbitrage_calc","keywords":"arbitrasje kalkulator sure bet odds","inputs":[{"id":"odds1","label":"Odds 1","type":"number","placeholder":"2.1"},{"id":"odds2","label":"Odds 2","type":"number","placeholder":"2.05"},{"id":"total_stake","label":"Total innsats (kr)","type":"number","placeholder":"1000"}]},
    {"slug":"sports-parlay-kalkulator","title":"Sports Parlay Kalkulator","category":"odds","description":"Beregn sports parlay utbetaling","formula":"sports_parlay","keywords":"sports parlay kalkulator odds utbetaling","inputs":[{"id":"stake","label":"Innsats (kr)","type":"number","placeholder":"100"},{"id":"odds1","label":"Kamp 1 odds","type":"number","placeholder":"1.9"},{"id":"odds2","label":"Kamp 2 odds","type":"number","placeholder":"2.2"},{"id":"odds3","label":"Kamp 3 odds","type":"number","placeholder":"1.7"}]},
    {"slug":"roulette-odds-kalkulator","title":"Roulette Odds Kalkulator","category":"odds","description":"Beregn roulette odds og utbetaling","formula":"roulette_odds","keywords":"roulette odds kalkulator sannsynlighet","inputs":[{"id":"bet_type","label":"Spilltype","type":"select","options":["Enkelt tall","Rød/Sort","Odde/Jevn","Dusin","Kolonne","Split","Tre tall","Fire tall","Seks tall"]},{"id":"stake","label":"Innsats (kr)","type":"number","placeholder":"100"}]},
    {"slug":"blackjack-strategi-kalkulator","title":"Blackjack Strategi Kalkulator","category":"odds","description":"Finn optimal blackjack strategi","formula":"blackjack_strategy","keywords":"blackjack strategi kalkulator grunnleggende","inputs":[{"id":"player_hand","label":"Din hånd","type":"select","options":["8","9","10","11","12","13","14","15","16","17","18","19","20","A+2","A+3","A+4","A+5","A+6","A+7","A+8"]},{"id":"dealer_card","label":"Dealers synlige kort","type":"select","options":["2","3","4","5","6","7","8","9","10","A"]}]}
]

# Check which tools already exist
existing_slugs = [t['slug'] for t in db['tools']]
added = 0
for tool in new_tools:
    if tool['slug'] not in existing_slugs:
        db['tools'].append(tool)
        added += 1
        print(f"  Added: {tool['slug']}")
    else:
        print(f"  Skipped (exists): {tool['slug']}")

# Save
with open('tools_database.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"\nDone! Added {added} new tools. Total: {len(db['tools'])} tools")
