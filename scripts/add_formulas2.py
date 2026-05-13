#!/usr/bin/env python3
"""Add new formulas for odds and time tools"""

new_formulas = """
  texas_holdem: (i) => {
    const outs=+i.outs;
    if(!outs) return null;
    const street=i.street||'Flop (2 kort igjen)';
    const cards=street.includes('Flop')?2:1;
    const equity=cards===2?(1-(((47-outs)/47)*((46-outs)/46))*100).toFixed(1):(outs/46*100).toFixed(1);
    return {value:equity, unit:'% equity', desc:'Rule of '+( cards===2?'4':'2')+': '+( outs*(cards===2?4:2))+'% (estimat)'};
  },
  baccarat_calc: (i) => {
    const edges={'Spiller':1.24,'Banker':1.06,'Uavgjort':14.36};
    const payouts={'Spiller':1,'Banker':0.95,'Uavgjort':8};
    const stake=+i.stake||100;
    const edge=edges[i.bet_type]||1.24;
    const payout=payouts[i.bet_type]||1;
    const ev=(-edge/100*stake).toFixed(2);
    return {value:(stake*payout).toFixed(2), unit:'kr (gevinst ved vinn)', desc:'Husfordel: '+edge+'% | EV: '+ev+' kr per runde'};
  },
  risk_of_ruin: (i) => {
    const wr=+i.win_rate/100, br=+i.bankroll, bet=+i.bet_size;
    if(!wr||!br||!bet) return null;
    const lr=1-wr;
    const units=br/bet;
    const ror=Math.pow(lr/wr,units)*100;
    return {value:Math.min(100,ror).toFixed(2), unit:'% risiko', desc:'Bankroll: '+units.toFixed(0)+' enheter | '+( ror<1?'Lav risiko ✓':ror<10?'Moderat risiko':'Høy risiko ⚠️')};
  },
  implied_probability: (i) => {
    const type=i.odds_type, val=i.odds_value;
    if(!val) return null;
    let prob;
    if(type==='Desimal'){prob=(1/parseFloat(val)*100).toFixed(2);}
    else if(type==='Amerikansk'){const v=parseFloat(val);prob=v>0?(100/(v+100)*100).toFixed(2):(Math.abs(v)/(Math.abs(v)+100)*100).toFixed(2);}
    else{const parts=val.split('/');prob=parts.length===2?(parseFloat(parts[1])/(parseFloat(parts[0])+parseFloat(parts[1]))*100).toFixed(2):'?';}
    return {value:prob, unit:'% implisert sannsynlighet', desc:'Odds: '+val+' ('+type+')'};
  },
  omaha_poker: (i) => {
    const outs=+i.outs, street=i.street||'Flop', pot=+i.pot, call=+i.call;
    if(!outs) return null;
    const equity=street==='Flop'?(outs*4).toFixed(1):(outs*2).toFixed(1);
    const pot_odds=call&&pot?(call/(pot+call)*100).toFixed(1):null;
    return {value:equity, unit:'% equity (estimat)', desc:pot_odds?'Pot odds: '+pot_odds+'% | '+(+equity>+pot_odds?'Lønnsomt ✓':'Ikke lønnsomt'):'Rule of '+(street==='Flop'?'4':'2')};
  },
  bingo_odds: (i) => {
    const cards=+i.cards, players=+i.players, calls=+i.calls;
    if(!cards||!players) return null;
    const total_cards=cards*players;
    const win_prob=(cards/total_cards*100).toFixed(2);
    const bingo_prob=(calls>=15?(cards/total_cards*(calls/75)*100).toFixed(2):((calls/75)*100).toFixed(2));
    return {value:win_prob, unit:'% vinnersannsynlighet', desc:'Sannsynlighet for bingo etter '+calls+' tall: ~'+bingo_prob+'%'};
  },
  blackjack_house_edge: (i) => {
    let edge=0.5;
    const decks=+i.decks||6;
    edge+=decks===1?-0.17:decks===2?-0.06:0;
    if(i.soft17==='Trekk') edge+=0.22;
    if(i.double==='9-11 kun') edge+=0.25;
    if(i.double==='10-11 kun') edge+=0.18;
    return {value:edge.toFixed(2), unit:'% husfordel', desc:'Med '+decks+' kortstokker | '+( edge<0.5?'Gunstige regler ✓':'Standard regler')};
  },
  sports_futures: (i) => {
    const stake=+i.stake, odds=+i.odds, prob=+i.probability/100;
    if(!stake||!odds) return null;
    const payout=(stake*odds).toFixed(2);
    const ev=(stake*prob*odds-stake).toFixed(2);
    const implied=(1/odds*100).toFixed(1);
    return {value:payout, unit:'kr (utbetaling)', desc:'Implisert: '+implied+'% | Din estimat: '+i.probability+'% | EV: '+ev+' kr'};
  },
  roulette_bet: (i) => {
    const payouts={'Enkelt tall (35:1)':35,'Rød/Sort (1:1)':1,'Odde/Jevn (1:1)':1,'Dusin (2:1)':2,'Kolonne (2:1)':2,'Split (17:1)':17,'Street (11:1)':11,'Corner (8:1)':8,'Line (5:1)':5};
    const payout=payouts[i.bet_type]||1;
    const stake=+i.bet_amount||100, sessions=+i.sessions||1;
    const win=(stake*payout).toFixed(2);
    const expected_loss=(stake*sessions*2.7/100).toFixed(2);
    return {value:win, unit:'kr (gevinst ved vinn)', desc:'Forventet tap over '+sessions+' runder: '+expected_loss+' kr'};
  },
  straight_bet: (i) => {
    const stake=+i.stake, odds=+i.odds;
    if(!stake||!odds) return null;
    const result=i.result||'Vant';
    const payout=result==='Vant'?(stake*odds).toFixed(2):result==='Push'?stake.toFixed(2):'0.00';
    const profit=result==='Vant'?(stake*odds-stake).toFixed(2):result==='Push'?'0.00':(-stake).toFixed(2);
    return {value:payout, unit:'kr (utbetaling)', desc:'Fortjeneste: '+profit+' kr | Status: '+result};
  },
  sleep_calc: (i) => {
    if(!i.wakeup_time) return null;
    const [h,m]=i.wakeup_time.split(':').map(Number);
    const cycles=+i.cycles||6;
    const totalMins=cycles*90+14;
    let bh=h, bm=m-totalMins;
    while(bm<0){bh--;bm+=60;}
    if(bh<0) bh+=24;
    return {value:String(bh).padStart(2,'0')+':'+String(bm).padStart(2,'0'), unit:'(leggetid)', desc:cycles+' sykluser × 90 min + 14 min innsovning = '+Math.round(totalMins/60*10)/10+'t søvn'};
  },
  uptime_calc: (i) => {
    const up=+i.uptime_percent;
    if(!up) return null;
    const downtime_pct=(100-up)/100;
    const periods={'Per dag':1440,'Per uke':10080,'Per måned':43200,'Per år':525600};
    const period_mins=periods[i.period]||525600;
    const downtime_mins=(period_mins*downtime_pct).toFixed(1);
    const downtime_hrs=(downtime_mins/60).toFixed(2);
    return {value:up+'%', unit:'oppetid', desc:'Nedetid: '+downtime_mins+' min ('+downtime_hrs+'t) per '+i.period?.toLowerCase()};
  },
  workdays_calc: (i) => {
    if(!i.start_date||!i.end_date) return null;
    const start=new Date(i.start_date), end=new Date(i.end_date);
    let days=0, cur=new Date(start);
    while(cur<=end){if(cur.getDay()!==0&&cur.getDay()!==6)days++;cur.setDate(cur.getDate()+1);}
    const total=Math.ceil((end-start)/86400000)+1;
    return {value:days, unit:'arbeidsdager', desc:'Totalt: '+total+' dager | Helgedager: '+(total-days)};
  },
  flight_time: (i) => {
    const dist=+i.distance, speed=+i.speed||900, tz=+i.timezone_diff||0;
    if(!dist) return null;
    const flight_hrs=(dist/speed).toFixed(2);
    const arrival_hrs=(+flight_hrs+tz).toFixed(2);
    return {value:flight_hrs, unit:'timer (flytid)', desc:'Faktisk ankomst (med tidssone): '+arrival_hrs+'t | Avstand: '+dist+'km'};
  },
  deadline_calc: (i) => {
    if(!i.start_date) return null;
    const start=new Date(i.start_date);
    let days=+i.days||30;
    let cur=new Date(start);
    if(i.skip_weekends==='Ja'){
      let added=0;
      while(added<days){cur.setDate(cur.getDate()+1);if(cur.getDay()!==0&&cur.getDay()!==6)added++;}
    } else {
      cur.setDate(cur.getDate()+days);
    }
    return {value:cur.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'(frist)', desc:days+' '+(i.skip_weekends==='Ja'?'arbeidsdager':'kalenderdager')};
  },
  half_birthday: (i) => {
    if(!i.birthday) return null;
    const bd=new Date(i.birthday);
    const half=new Date(bd);
    half.setDate(half.getDate()+183);
    return {value:half.toLocaleDateString('nb-NO',{day:'numeric',month:'long'}), unit:'(halv bursdag)', desc:'Halvveis til neste bursdag!'};
  },
  unix_time: (i) => {
    const ts=+i.unix_timestamp;
    if(!ts) return null;
    const date=new Date(ts*1000);
    const now=Math.floor(Date.now()/1000);
    return {value:date.toLocaleString('nb-NO'), unit:'', desc:'Unix: '+ts+' | Nu: '+now+' | Diff: '+(ts-now)+'s'};
  },
  time_duration: (i) => {
    if(!i.start_time||!i.end_time) return null;
    const [sh,sm]=i.start_time.split(':').map(Number);
    const [eh,em]=i.end_time.split(':').map(Number);
    let mins=(eh*60+em)-(sh*60+sm);
    if(mins<0) mins+=1440;
    mins-=(+i.break_minutes||0);
    const h=Math.floor(mins/60), m=mins%60;
    return {value:h+'t '+m+'min', unit:'', desc:'Total: '+mins+' minutter | '+h+' timer og '+m+' minutter'};
  },
  chronological_age: (i) => {
    if(!i.birthdate) return null;
    const bd=new Date(i.birthdate);
    const target=i.target_date?new Date(i.target_date):new Date();
    let years=target.getFullYear()-bd.getFullYear();
    let months=target.getMonth()-bd.getMonth();
    let days=target.getDate()-bd.getDate();
    if(days<0){months--;days+=30;}
    if(months<0){years--;months+=12;}
    const total_days=Math.floor((target-bd)/86400000);
    return {value:years+'år '+months+'mnd '+days+'d', unit:'', desc:'Totalt: '+total_days.toLocaleString('nb-NO')+' dager | '+Math.floor(total_days/7).toLocaleString('nb-NO')+' uker'};
  },
  time_calc: (i) => {
    if(!i.start_time) return null;
    const [h,m]=i.start_time.split(':').map(Number);
    const add_h=+i.add_hours||0, add_m=+i.add_minutes||0;
    let total_m=h*60+m+add_h*60+add_m;
    total_m=((total_m%1440)+1440)%1440;
    const nh=Math.floor(total_m/60), nm=total_m%60;
    return {value:String(nh).padStart(2,'0')+':'+String(nm).padStart(2,'0'), unit:'', desc:'Start: '+i.start_time+' + '+add_h+'t '+add_m+'min'};
  },
  minutes_to_decimal: (i) => {
    const h=+i.hours||0, m=+i.minutes||0;
    const dec=(h+m/60).toFixed(4);
    return {value:dec, unit:'desimaltimer', desc:h+'t '+m+'min = '+dec+' timer'};
  },
  business_days_calc: (i) => {
    if(!i.start_date) return null;
    const start=new Date(i.start_date);
    const bd=+i.business_days||5;
    let cur=new Date(start), added=0;
    while(added<bd){cur.setDate(cur.getDate()+1);if(cur.getDay()!==0&&cur.getDay()!==6)added++;}
    return {value:cur.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:bd+' forretningsdager fra '+start.toLocaleDateString('nb-NO')};
  },
  weekday_calc: (i) => {
    if(!i.date) return null;
    const d=new Date(i.date);
    const days=['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'];
    const day=days[d.getDay()];
    const week=Math.ceil((d-new Date(d.getFullYear(),0,1))/604800000);
    return {value:day, unit:'', desc:'Uke '+week+' | '+d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'})};
  },
  decimal_to_time: (i) => {
    const dec=+i.decimal_hours;
    if(isNaN(dec)) return null;
    const h=Math.floor(dec), m=Math.round((dec-h)*60);
    return {value:h+'t '+m+'min', desc:dec+' timer = '+h+' timer og '+m+' minutter', unit:''};
  },
  birthday_calc: (i) => {
    if(!i.birthday) return null;
    const bd=new Date(i.birthday), now=new Date();
    let age=now.getFullYear()-bd.getFullYear();
    if(now.getMonth()<bd.getMonth()||(now.getMonth()===bd.getMonth()&&now.getDate()<bd.getDate()))age--;
    const next=new Date(now.getFullYear(),bd.getMonth(),bd.getDate());
    if(next<now) next.setFullYear(next.getFullYear()+1);
    const days_until=Math.ceil((next-now)/86400000);
    return {value:age, unit:'år', desc:'Neste bursdag om '+days_until+' dager ('+next.toLocaleDateString('nb-NO',{day:'numeric',month:'long'})+')'};
  },
  pluto_time: (i) => {
    const earth_years=+i.age;
    if(!earth_years) return null;
    const pluto_year=247.94;
    const pluto_age=(earth_years/pluto_year).toFixed(4);
    return {value:pluto_age, unit:'Pluto-år', desc:earth_years+' jordår = '+pluto_age+' Pluto-år | 1 Pluto-år = '+pluto_year+' jordår'};
  },
  hour_calc: (i) => {
    const hpd=+i.hours_per_day, days=+i.days, rate=+i.hourly_rate||0;
    if(!hpd||!days) return null;
    const total=hpd*days;
    const pay=(total*rate).toFixed(2);
    return {value:total, unit:'timer totalt', desc:rate>0?'Lønn: '+parseFloat(pay).toLocaleString('nb-NO')+' kr':hpd+' timer × '+days+' dager'};
  },
  elapsed_time: (i) => {
    if(!i.past_date) return null;
    const past=new Date(i.past_date+(i.past_time?'T'+i.past_time:''));
    const now=new Date();
    const diff=now-past;
    const days=Math.floor(diff/86400000);
    const hours=Math.floor((diff%86400000)/3600000);
    const mins=Math.floor((diff%3600000)/60000);
    return {value:days+'d '+hours+'t '+mins+'min', unit:'(forløpt tid)', desc:'Siden: '+past.toLocaleDateString('nb-NO')};
  },
  countdown_timer: (i) => {
    if(!i.target_date) return null;
    const target=new Date(i.target_date+(i.target_time?'T'+i.target_time:''));
    const now=new Date();
    const diff=target-now;
    if(diff<0) return {value:'Passert', unit:'', desc:'Dato har passert'};
    const days=Math.floor(diff/86400000);
    const hours=Math.floor((diff%86400000)/3600000);
    const mins=Math.floor((diff%3600000)/60000);
    return {value:days+'d '+hours+'t '+mins+'min', unit:'igjen', desc:'Til: '+target.toLocaleDateString('nb-NO')};
  },
  time_difference: (i) => {
    if(!i.time1||!i.time2) return null;
    const [h1,m1]=i.time1.split(':').map(Number);
    const [h2,m2]=i.time2.split(':').map(Number);
    let diff=(h2*60+m2)-(h1*60+m1);
    if(diff<0) diff+=1440;
    const h=Math.floor(diff/60), m=diff%60;
    return {value:h+'t '+m+'min', unit:'', desc:i.time1+' → '+i.time2+' = '+diff+' minutter'};
  },
  day_counter: (i) => {
    if(!i.date1||!i.date2) return null;
    const d1=new Date(i.date1), d2=new Date(i.date2);
    const days=Math.abs(Math.ceil((d2-d1)/86400000));
    const weeks=Math.floor(days/7);
    return {value:days, unit:'dager', desc:weeks+' uker og '+(days%7)+' dager | '+Math.round(days/30.44)+' måneder'};
  },
  sleep_cycle: (i) => {
    if(!i.sleep_time) return null;
    const [h,m]=i.sleep_time.split(':').map(Number);
    const cycle=+i.cycle_length||90;
    const results=[];
    for(let c=1;c<=6;c++){
      let wh=h, wm=m+cycle*c+14;
      while(wm>=60){wh++;wm-=60;}
      wh=wh%24;
      results.push(String(wh).padStart(2,'0')+':'+String(wm).padStart(2,'0'));
    }
    return {value:results[4], unit:'(anbefalt 5 sykluser)', desc:'Alle: '+results.join(', ')};
  },
  decimal_to_minutes: (i) => {
    const dec=+i.decimal;
    if(isNaN(dec)) return null;
    const total_mins=Math.round(dec*60);
    const h=Math.floor(total_mins/60), m=total_mins%60;
    return {value:total_mins, unit:'minutter totalt', desc:dec+' timer = '+h+'t '+m+'min = '+total_mins+' min'};
  },
  min_to_hrs_mins: (i) => {
    const total=+i.total_minutes;
    if(!total) return null;
    const h=Math.floor(total/60), m=total%60;
    return {value:h+'t '+m+'min', unit:'', desc:total+' minutter = '+h+' timer og '+m+' minutter = '+(total/60).toFixed(2)+' desimaltimer'};
  },"""

with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if already added
if 'texas_holdem' in content:
    print("Formulas already exist!")
else:
    insert_pos = content.rfind('};')
    if insert_pos == -1:
        print("ERROR: Could not find closing }; in calc.js")
    else:
        new_content = content[:insert_pos] + new_formulas + '\n' + content[insert_pos:]
        with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("All formulas added to calc.js!")

print("Done!")
