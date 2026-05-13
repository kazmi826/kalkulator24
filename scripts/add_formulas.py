#!/usr/bin/env python3
"""
Add new formulas to calc.js
"""

new_formulas = """
  robux_tax: (i) => {
    const r=+i.robux_amount;
    if(!r) return null;
    const tax={'Kjøp':0,'Salg':0.30,'GamePass':0.30,'Klær':0.30};
    const rate=tax[i.transaction_type]||0.30;
    const after=Math.floor(r*(1-rate));
    const fee=r-after;
    return {value:after.toLocaleString('nb-NO'), unit:'Robux (etter skatt)', desc:'Avgift: '+fee.toLocaleString('nb-NO')+' Robux ('+(rate*100)+'%)'};
  },
  devex_calc: (i) => {
    const r=+i.robux_amount;
    if(!r) return null;
    const rate=0.0035;
    const usd=(r*rate).toFixed(2);
    const nok=(+usd*10.5).toFixed(2);
    const min=100000;
    const eligible=r>=min?'Kvalifisert ✓':'Trenger '+(min-r).toLocaleString('nb-NO')+' mer Robux';
    return {value:usd, unit:'USD', desc:'≈ '+nok+' NOK | '+eligible};
  },
  pokemon_calc: (i) => {
    const base=+i.base_stat, iv=+i.iv||0, ev=+i.ev||0, lvl=+i.level||50;
    if(!base) return null;
    const nature_mult={'Nøytral':1.0,'Positiv':1.1,'Negativ':0.9};
    const n=nature_mult[i.nature]||1.0;
    const stat=Math.floor(((2*base+iv+Math.floor(ev/4))*lvl/100+5)*n);
    return {value:stat, unit:'(stat verdi)', desc:'Base:'+base+' IV:'+iv+' EV:'+ev+' Nivå:'+lvl};
  },
  persona_fusion: (i) => {
    const l1=+i.persona1_level, l2=+i.persona2_level;
    if(!l1||!l2) return null;
    const result_level=Math.floor((l1+l2)/2)+1;
    return {value:result_level, unit:'(resultat nivå)', desc:'('+l1+'+'+l2+')/2+1 | Arcana: '+i.arcana};
  },
  kelly_criterion: (i) => {
    const p=+i.win_probability, b=+i.odds-1, bankroll=+i.bankroll;
    if(!p||!b||!bankroll) return null;
    const kelly=((b*p-(1-p))/b);
    const bet=kelly>0?Math.round(bankroll*kelly):0;
    return {value:bet.toLocaleString('nb-NO'), unit:'kr (anbefalt innsats)', desc:'Kelly%: '+(kelly*100).toFixed(2)+'% | '+(kelly<=0?'Negativ edge — ikke spill':'Positiv edge ✓')};
  },
  poker_odds: (i) => {
    const outs=+i.outs, remaining=+i.cards_remaining||47, pot=+i.pot_size, call=+i.call_amount;
    if(!outs) return null;
    const equity=(outs/remaining*100).toFixed(1);
    const pot_odds=call&&pot?(call/(pot+call)*100).toFixed(1):null;
    const profitable=pot_odds?+equity>+pot_odds:null;
    return {value:equity, unit:'% equity', desc:pot_odds?'Pot odds: '+pot_odds+'% | '+(profitable?'Lønnsomt ✓':'Ikke lønnsomt'):'Basert på '+outs+' outs'};
  },
  parlay_calc: (i) => {
    const stake=+i.bet_amount;
    if(!stake) return null;
    const odds=[+i.odds1,+i.odds2,+i.odds3,+i.odds4].filter(o=>o>1);
    if(!odds.length) return null;
    const combined=odds.reduce((a,b)=>a*b,1);
    const payout=(stake*combined).toFixed(2);
    const profit=(+payout-stake).toFixed(2);
    return {value:payout, unit:'kr (utbetaling)', desc:'Kombinert odds: '+combined.toFixed(2)+' | Fortjeneste: '+profit+' kr'};
  },
  expected_value: (i) => {
    const win=+i.win_amount, wp=+i.win_probability/100, lose=+i.lose_amount, lp=+i.lose_probability/100;
    if(isNaN(win)||isNaN(wp)) return null;
    const ev=(win*wp)-(lose*(lp||1-wp));
    return {value:ev.toFixed(2), unit:'kr (EV)', desc:ev>0?'Positiv EV ✓':'Negativ EV'};
  },
  poisson_calc: (i) => {
    const lambda=+i.lambda, k=+i.k;
    if(!lambda||isNaN(k)) return null;
    const factorial=(n)=>{let f=1;for(let i=2;i<=n;i++)f*=i;return f;};
    const prob=(Math.pow(lambda,k)*Math.exp(-lambda)/factorial(Math.round(k))*100).toFixed(4);
    return {value:prob, unit:'% sannsynlighet', desc:'P(X='+k+') med λ='+lambda};
  },
  odds_calc: (i) => {
    const odds=+i.decimal_odds, stake=+i.stake;
    if(!odds||!stake) return null;
    const payout=(stake*odds).toFixed(2);
    const profit=(+payout-stake).toFixed(2);
    const implied=(1/odds*100).toFixed(2);
    return {value:payout, unit:'kr (utbetaling)', desc:'Fortjeneste: '+profit+' kr | Implisitt: '+implied+'%'};
  },
  football_odds: (i) => {
    const h=+i.home_odds, d=+i.draw_odds, a=+i.away_odds;
    if(!h||!d||!a) return null;
    const margin=((1/h+1/d+1/a-1)*100).toFixed(2);
    const h_prob=(1/h*100).toFixed(1), d_prob=(1/d*100).toFixed(1), a_prob=(1/a*100).toFixed(1);
    return {value:margin, unit:'% margin', desc:'Hjem: '+h_prob+'% | Uavgjort: '+d_prob+'% | Borte: '+a_prob+'%'};
  },
  trifecta_calc: (i) => {
    const n=+i.horses, stake=+i.stake||1;
    if(!n||n<3) return null;
    const combos=n*(n-1)*(n-2);
    return {value:combos.toLocaleString('nb-NO'), unit:'kombinasjoner', desc:'Total kostnad: '+(combos*stake).toFixed(2)+' kr'};
  },
  round_robin: (i) => {
    const n=+i.selections, stake=+i.stake||100;
    if(!n||n<2) return null;
    const factorial=(x)=>{let f=1;for(let i=2;i<=x;i++)f*=i;return f;};
    let total=0;
    for(let k=2;k<=n;k++) total+=factorial(n)/(factorial(k)*factorial(n-k));
    return {value:total, unit:'kombinasjoner', desc:'Total innsats: '+(total*stake).toLocaleString('nb-NO')+' kr'};
  },
  arbitrage_calc: (i) => {
    const o1=+i.odds1, o2=+i.odds2, total=+i.total_stake;
    if(!o1||!o2||!total) return null;
    const arb=(1/o1+1/o2);
    const profit=arb<1?(total/arb-total).toFixed(2):null;
    return {value:arb<1?profit:'Ingen arb mulighet', unit:arb<1?'kr garantert':'', desc:'Margin: '+((1-arb)*100).toFixed(2)+'% | '+( arb<1?'Arb funnet! ✓':'Ingen mulighet')};
  },
  sports_parlay: (i) => {
    const stake=+i.stake;
    if(!stake) return null;
    const odds=[+i.odds1,+i.odds2,+i.odds3].filter(o=>o>1);
    const combined=odds.reduce((a,b)=>a*b,1);
    const payout=(stake*combined).toFixed(2);
    return {value:payout, unit:'kr (utbetaling)', desc:'Kombinert: '+combined.toFixed(2)+' | '+odds.length+' kamper'};
  },
  roulette_odds: (i) => {
    const payouts={'Enkelt tall':35,'Rød/Sort':1,'Odde/Jevn':1,'Dusin':2,'Kolonne':2,'Split':17,'Tre tall':11,'Fire tall':8,'Seks tall':5};
    const probs={'Enkelt tall':2.7,'Rød/Sort':48.6,'Odde/Jevn':48.6,'Dusin':32.4,'Kolonne':32.4,'Split':5.4,'Tre tall':8.1,'Fire tall':10.8,'Seks tall':16.2};
    const payout=payouts[i.bet_type]||1;
    const prob=probs[i.bet_type]||2.7;
    const stake=+i.stake||100;
    const win=(stake*payout).toFixed(2);
    const ev=(stake*prob/100*payout-stake*(1-prob/100)).toFixed(2);
    return {value:win, unit:'kr (gevinst)', desc:'Sannsynlighet: '+prob+'% | EV: '+ev+' kr'};
  },
  blackjack_strategy: (i) => {
    const s={'8':{'2':'H','3':'H','4':'H','5':'H','6':'H','7':'H','8':'H','9':'H','10':'H','A':'H'},'9':{'2':'H','3':'D','4':'D','5':'D','6':'D','7':'H','8':'H','9':'H','10':'H','A':'H'},'10':{'2':'D','3':'D','4':'D','5':'D','6':'D','7':'D','8':'D','9':'D','10':'H','A':'H'},'11':{'2':'D','3':'D','4':'D','5':'D','6':'D','7':'D','8':'D','9':'D','10':'D','A':'D'},'12':{'2':'H','3':'H','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'13':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'14':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'15':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'16':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'17':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'S','8':'S','9':'S','10':'S','A':'S'},'A+6':{'2':'H','3':'D','4':'D','5':'D','6':'D','7':'H','8':'H','9':'H','10':'H','A':'H'},'A+7':{'2':'S','3':'D','4':'D','5':'D','6':'D','7':'S','8':'S','9':'H','10':'H','A':'H'},'A+8':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'S','8':'S','9':'S','10':'S','A':'S'}};
    const t={'H':'Trekk (Hit)','S':'Stå (Stand)','D':'Doble ned','SP':'Del (Split)'};
    const action=s[i.player_hand]?.[i.dealer_card]||'H';
    return {value:t[action]||action, unit:'', desc:'Hånd: '+i.player_hand+' mot dealer: '+i.dealer_card};
  },"""

# Read calc.js
with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if already added
if 'robux_tax' in content:
    print("Formulas already exist in calc.js!")
else:
    # Find the closing }; of Calculators object
    insert_pos = content.rfind('};')
    if insert_pos == -1:
        print("ERROR: Could not find closing }; in calc.js")
    else:
        new_content = content[:insert_pos] + new_formulas + '\n' + content[insert_pos:]
        with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Formulas added to calc.js!")

print("Done!")
