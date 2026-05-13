#!/usr/bin/env python3
"""Add formulas for time, ecology, construction and music tools"""

new_formulas = """
  time_elapsed: (i) => {
    if(!i.start_date||!i.end_date) return null;
    const start=new Date(i.start_date+(i.start_time?'T'+i.start_time:''));
    const end=new Date(i.end_date+(i.end_time?'T'+i.end_time:''));
    const diff=end-start;
    if(diff<0) return {value:'Ugyldig', unit:'', desc:'Sluttdato er før startdato'};
    const days=Math.floor(diff/86400000);
    const hrs=Math.floor((diff%86400000)/3600000);
    const mins=Math.floor((diff%3600000)/60000);
    return {value:days+'d '+hrs+'t '+mins+'min', unit:'(tidsforløp)', desc:'Totalt: '+(diff/3600000).toFixed(2)+' timer'};
  },
  travel_time: (i) => {
    const dist=+i.distance, speed=+i.speed||100, stops=+i.stops||0;
    if(!dist||!speed) return null;
    const drive_mins=(dist/speed*60).toFixed(0);
    const total_mins=+drive_mins+stops;
    const h=Math.floor(total_mins/60), m=total_mins%60;
    return {value:h+'t '+m+'min', unit:'(total reisetid)', desc:'Kjøretid: '+drive_mins+'min | Stopp: '+stops+'min | '+dist+'km @ '+speed+'km/t'};
  },
  adjusted_age: (i) => {
    const actual=+i.actual_age, premature=+i.weeks_premature;
    if(!actual) return null;
    const adjusted=Math.max(0,actual-premature);
    return {value:adjusted, unit:'uker (justert alder)', desc:'Faktisk: '+actual+' uker - '+premature+' uker for tidlig = '+adjusted+' uker'};
  },
  military_time: (i) => {
    const t=(i.time_input||'').trim();
    if(!t) return null;
    let result;
    if(t.includes('AM')||t.includes('PM')){
      const parts=t.replace(/AM|PM/g,'').trim().split(':');
      let h=+parts[0], m=+(parts[1]||0);
      if(t.includes('PM')&&h!==12) h+=12;
      if(t.includes('AM')&&h===12) h=0;
      result=String(h).padStart(2,'0')+String(m).padStart(2,'0')+' (militær)';
    } else {
      const parts=t.split(':');
      let h=+parts[0], m=+(parts[1]||0);
      const ampm=h<12?'AM':'PM';
      const h12=h%12||12;
      result=h12+':'+String(m).padStart(2,'0')+' '+ampm+' (standard)';
    }
    return {value:result, unit:'', desc:'Konvertert fra: '+t};
  },
  timezone_calc: (i) => {
    if(!i.local_time) return null;
    const [h,m]=i.local_time.split(':').map(Number);
    const from=+i.from_offset||0, to=+i.to_offset||0;
    const diff=to-from;
    let nh=((h+diff)%24+24)%24, nm=m;
    return {value:String(nh).padStart(2,'0')+':'+String(nm).padStart(2,'0'), unit:'(måltidssone)', desc:'UTC+'+from+' → UTC+'+to+' | Diff: '+diff+' timer'};
  },
  moon_phase: (i) => {
    if(!i.date) return null;
    const d=new Date(i.date);
    const known=new Date('2000-01-06');
    const diff=(d-known)/(1000*60*60*24);
    const cycle=diff%29.53059;
    let phase;
    if(cycle<1.85) phase='Nymåne 🌑';
    else if(cycle<7.38) phase='Tiltagende halvmåne 🌒';
    else if(cycle<9.22) phase='Halvmåne 🌓';
    else if(cycle<14.77) phase='Tiltagende måne 🌔';
    else if(cycle<16.61) phase='Fullmåne 🌕';
    else if(cycle<22.15) phase='Avtagende måne 🌖';
    else if(cycle<23.99) phase='Halvmåne 🌗';
    else phase='Avtagende halvmåne 🌘';
    return {value:phase, unit:'', desc:'Dag '+Math.round(cycle)+' av 29.5 i månedssyklus'};
  },
  age_gap: (i) => {
    if(!i.birth1||!i.birth2) return null;
    const d1=new Date(i.birth1), d2=new Date(i.birth2);
    const diff=Math.abs(d1-d2);
    const years=(diff/31536000000).toFixed(1);
    const months=Math.round(diff/2592000000);
    const older=d1<d2?'Person 1':'Person 2';
    return {value:years, unit:'år aldersforskjell', desc:months+' måneder | '+older+' er eldst'};
  },
  stopwatch_calc: (i) => {
    const dist=+i.distance;
    if(!dist) return null;
    const h=+i.time_hours||0, m=+i.time_minutes||0, s=+i.time_seconds||0;
    const total_secs=h*3600+m*60+s;
    if(!total_secs) return null;
    const pace_secs=total_secs/dist;
    const pace_m=Math.floor(pace_secs/60), pace_s=Math.round(pace_secs%60);
    const speed=(dist/total_secs*3600).toFixed(2);
    return {value:pace_m+':'+String(pace_s).padStart(2,'0'), unit:'min/km (tempo)', desc:'Hastighet: '+speed+' km/t | Total tid: '+h+'t '+m+'min '+s+'sek'};
  },
  date_calculator: (i) => {
    if(!i.start_date) return null;
    const start=new Date(i.start_date);
    const days=+i.days||0;
    const result=new Date(start);
    if(i.operation==='Legg til dager') result.setDate(result.getDate()+days);
    else result.setDate(result.getDate()-days);
    return {value:result.toLocaleDateString('nb-NO',{weekday:'long',day:'numeric',month:'long',year:'numeric'}), unit:'', desc:(i.operation||'Legg til')+' '+days+' dager'};
  },
  legal_date: (i) => {
    if(!i.start_date) return null;
    const start=new Date(i.start_date);
    const days=+i.days||30;
    let cur=new Date(start), added=0;
    if(i.type==='Virkedager'){
      while(added<days){cur.setDate(cur.getDate()+1);if(cur.getDay()!==0&&cur.getDay()!==6)added++;}
    } else {
      cur.setDate(cur.getDate()+days);
    }
    return {value:cur.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'(juridisk frist)', desc:days+' '+i.type?.toLowerCase()+' fra '+start.toLocaleDateString('nb-NO')};
  },
  time_to_decimal: (i) => {
    const h=+i.hours||0, m=+i.minutes||0, s=+i.seconds||0;
    const dec=(h+m/60+s/3600).toFixed(6);
    return {value:dec, unit:'desimaltimer', desc:h+'t '+m+'min '+s+'sek = '+dec+' timer'};
  },
  ev_savings: (i) => {
    const km=+i.km_per_year, fp=+i.fuel_price, ep=+i.electricity_price;
    const fc=+i.fuel_consumption||7, ec=+i.ev_consumption||18;
    if(!km) return null;
    const fuel_cost=km/100*fc*fp;
    const ev_cost=km/100*ec*ep;
    const savings=(fuel_cost-ev_cost).toFixed(0);
    const co2_saved=(km/100*fc*2.31).toFixed(0);
    return {value:parseFloat(savings).toLocaleString('nb-NO'), unit:'kr/år spart', desc:'Bensin: '+Math.round(fuel_cost).toLocaleString('nb-NO')+'kr | Strøm: '+Math.round(ev_cost).toLocaleString('nb-NO')+'kr | CO2: '+co2_saved+'kg spart'};
  },
  ev_charging: (i) => {
    const cap=+i.battery_capacity, curr=+i.current_charge, target=+i.target_charge;
    const power=+i.charger_power||11, price=+i.electricity_cost||1.5;
    if(!cap) return null;
    const kwh_needed=cap*(target-curr)/100;
    const time_hrs=(kwh_needed/power).toFixed(2);
    const cost=(kwh_needed*price).toFixed(2);
    const h=Math.floor(+time_hrs), m=Math.round((+time_hrs%1)*60);
    return {value:h+'t '+m+'min', unit:'(ladetid)', desc:kwh_needed.toFixed(1)+'kWh | Kostnad: '+cost+' kr | '+power+'kW lader'};
  },
  carbon_footprint: (i) => {
    const car=+i.car_km||0, fly=+i.flights||0, meat=+i.meat_kg||0, elec=+i.electricity_kwh||0;
    const car_co2=car*0.21/1000;
    const fly_co2=fly*0.255;
    const meat_co2=meat*52*6.61/1000;
    const elec_co2=elec*12*0.017/1000;
    const total=(car_co2+fly_co2+meat_co2+elec_co2).toFixed(2);
    const earths=(+total/2.5).toFixed(1);
    return {value:total, unit:'tonn CO₂/år', desc:'Bil:'+car_co2.toFixed(1)+'t | Fly:'+fly_co2.toFixed(1)+'t | Mat:'+meat_co2.toFixed(1)+'t | '+earths+' jordkloder'};
  },
  fuel_cost: (i) => {
    const dist=+i.distance, cons=+i.consumption, price=+i.fuel_price;
    if(!dist||!cons||!price) return null;
    const liters=(dist/100*cons).toFixed(2);
    const cost=(+liters*price).toFixed(2);
    return {value:cost, unit:'kr', desc:liters+' liter × '+price+' kr/L | '+dist+'km @ '+cons+'L/100km'};
  },
  car_carbon: (i) => {
    const dist=+i.distance, cons=+i.consumption||7;
    if(!dist) return null;
    const co2_per_l={'Bensin':2.31,'Diesel':2.68,'Hybrid':1.5,'Elektrisk':0.05};
    const co2=(dist/100*cons*(co2_per_l[i.fuel_type]||2.31)/1000).toFixed(3);
    return {value:co2, unit:'tonn CO₂/år', desc:i.fuel_type+' | '+dist+'km | '+co2+'t = '+(+co2*1000).toFixed(0)+'kg CO₂'};
  },
  solar_calc: (i) => {
    const area=+i.roof_area, sun=+i.sunhours||4, price=+i.electricity_price||1.5;
    if(!area) return null;
    const usable_area=area*0.7;
    const kwh_per_day=usable_area*0.2*sun;
    const kwh_per_year=(kwh_per_day*365).toFixed(0);
    const savings=(+kwh_per_year*price).toFixed(0);
    return {value:kwh_per_year, unit:'kWh/år', desc:'Besparelse: '+parseFloat(savings).toLocaleString('nb-NO')+' kr/år | '+usable_area.toFixed(0)+'m² aktiv flate'};
  },
  mileage_calc: (i) => {
    const fuel=+i.fuel_used, dist=+i.distance;
    if(!fuel||!dist) return null;
    const per100=(fuel/dist*100).toFixed(2);
    const km_per_l=(dist/fuel).toFixed(2);
    return {value:per100, unit:'L/100km', desc:km_per_l+' km/L | '+dist+'km på '+fuel+'L'};
  },
  flight_carbon: (i) => {
    const dist=+i.distance, trips=+i.trips||1;
    if(!dist) return null;
    const mult={'Økonomi':1,'Business':2.9,'Første klasse':4};
    const m=mult[i.class]||1;
    const co2=(dist*0.255*trips*m/1000).toFixed(3);
    return {value:co2, unit:'tonn CO₂', desc:i.class+' | '+trips+' tur(er) | '+dist+'km | '+co2+'t CO₂'};
  },
  aquarium_calc: (i) => {
    const l=+i.length, w=+i.width, h=+i.height, fish=+i.fish_size||5;
    if(!l||!w||!h) return null;
    const liters=(l*w*h/1000).toFixed(1);
    const fish_count=Math.floor(+liters/fish);
    return {value:liters, unit:'liter', desc:'Maks ~'+fish_count+' fisk ('+fish+'cm) | '+l+'×'+w+'×'+h+'cm'};
  },
  vpd_calc: (i) => {
    const t=+i.temperature, rh=+i.humidity, lt_diff=+i.leaf_temp_diff||2;
    if(isNaN(t)||!rh) return null;
    const leaf_t=t-lt_diff;
    const svp_air=0.6108*Math.exp(17.27*t/(t+237.3));
    const svp_leaf=0.6108*Math.exp(17.27*leaf_t/(leaf_t+237.3));
    const vpd=(svp_leaf-svp_air*rh/100).toFixed(3);
    const status=+vpd<0.4?'For lavt':+vpd<0.8?'Vegetativ (bra) ✓':+vpd<1.2?'Generativ (bra) ✓':+vpd<1.6?'Stress':' For høyt ⚠️';
    return {value:vpd, unit:'kPa (VPD)', desc:status+' | T:'+t+'°C RH:'+rh+'%'};
  },
  hvac_load: (i) => {
    const area=+i.area, height=+i.ceiling_height||2.4;
    if(!area) return null;
    const ins_mult={'Dårlig':1.5,'Standard':1.0,'God':0.7,'Utmerket':0.5};
    const clim_mult={'Kaldt (Nord-Norge)':1.4,'Moderat (Midt-Norge)':1.2,'Mildt (Sør-Norge)':1.0};
    const base=area*height*0.04*(ins_mult[i.insulation]||1.0)*(clim_mult[i.climate]||1.2);
    const btu=Math.round(base*3412);
    const kw=base.toFixed(2);
    return {value:kw, unit:'kW (varme/kjøl)', desc:btu.toLocaleString('nb-NO')+' BTU | '+area+'m² × '+height+'m | '+i.insulation};
  },
  insulation_calc: (i) => {
    const area=+i.area, thick=+i.thickness;
    if(!area||!thick) return null;
    const r_per_mm={'Glassvatt':0.036,'Steinull':0.034,'Cellulose':0.040,'EPS':0.031,'XPS':0.029};
    const r_val=(thick/(r_per_mm[i.type]||0.036)).toFixed(2);
    const m3=(area*thick/1000).toFixed(2);
    return {value:r_val, unit:'m²K/W (R-verdi)', desc:m3+'m³ '+i.type+' | '+area+'m² × '+thick+'mm'};
  },
  tile_calc: (i) => {
    const rl=+i.room_length, rw=+i.room_width, tl=+i.tile_length/100, tw=+i.tile_width/100;
    const waste=+i.waste||10;
    if(!rl||!rw||!tl||!tw) return null;
    const area=rl*rw;
    const tiles=Math.ceil(area/(tl*tw)*(1+waste/100));
    const boxes=Math.ceil(tiles/10);
    return {value:tiles, unit:'fliser', desc:area.toFixed(1)+'m² | +'+waste+'% svinn | Ca '+boxes+' esker (10 stk)'};
  },
  deck_calc: (i) => {
    const l=+i.length, w=+i.width, bw=+i.board_width/100, gap=+i.gap/1000;
    if(!l||!w||!bw) return null;
    const boards=Math.ceil(w/(bw+gap));
    const total_length=(boards*l).toFixed(1);
    const area=(l*w).toFixed(1);
    return {value:boards, unit:'planker', desc:total_length+'m total lengde | '+area+'m² terrasse'};
  },
  wallpaper_calc: (i) => {
    const perim=+i.room_perimeter, height=+i.ceiling_height||2.4;
    const dw=+i.doors_windows||0, rl=+i.roll_length||10, rw=+i.roll_width/100||0.53;
    if(!perim) return null;
    const wall_area=perim*height-(dw*2);
    const strips_per_roll=Math.floor(rl/height);
    const rolls=Math.ceil(wall_area/rw/strips_per_roll*1.1);
    return {value:rolls, unit:'ruller', desc:wall_area.toFixed(1)+'m² veggflate | '+strips_per_roll+' baner per rull'};
  },
  foundation_calc: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth, wt=+i.wall_thickness||0.2;
    if(!l||!w||!d) return null;
    const perimeter=2*(l+w);
    const vol=(perimeter*wt*d).toFixed(2);
    return {value:vol, unit:'m³ betong', desc:'Perimetergrunnmur: '+perimeter+'m × '+wt+'m × '+d+'m'};
  },
  roof_angle: (i) => {
    const rise=+i.rise, span=+i.span;
    if(!rise||!span) return null;
    const pitch=rise/30;
    const angle=(Math.atan(pitch)*180/Math.PI).toFixed(1);
    const rafter_length=(Math.sqrt(Math.pow(span/2,2)+Math.pow(span/2*pitch,2))).toFixed(2);
    return {value:angle, unit:'grader', desc:'Stigning: '+pitch.toFixed(2)+':1 | Sparrelengde ca: '+rafter_length+'m'};
  },
  concrete_calc: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth;
    if(!l||!w||!d) return null;
    const vol=(l*w*d).toFixed(3);
    const bags=Math.ceil(+vol/0.045);
    return {value:vol, unit:'m³', desc:bags+' sekker (25kg) | '+l+'×'+w+'×'+d+'m'};
  },
  paint_calc: (i) => {
    const area=+i.area, coats=+i.coats||2, coverage=+i.coverage||10;
    if(!area) return null;
    const liters=(area*coats/coverage).toFixed(2);
    const cans=Math.ceil(+liters/2.5);
    return {value:liters, unit:'liter', desc:cans+' bokser (2.5L) | '+area+'m² × '+coats+' strøk'};
  },
  fence_calc_adv: (i) => {
    const l=+i.length, h=+i.height, spacing=+i.post_spacing||2.5, rails=+i.rails||2;
    if(!l) return null;
    const posts=Math.ceil(l/spacing)+1;
    const rail_length=(l*rails).toFixed(0);
    return {value:posts, unit:'stolper', desc:rail_length+'m grinder | '+l+'m gjerde | '+spacing+'m mellomrom'};
  },
  floor_calc: (i) => {
    const l=+i.length, w=+i.width, waste=+i.waste||10, price=+i.price_per_m2||0;
    if(!l||!w) return null;
    const area=l*w;
    const total=area*(1+waste/100);
    const cost=price?(total*price).toFixed(0):null;
    return {value:total.toFixed(2), unit:'m²', desc:(cost?'Kostnad: '+parseFloat(cost).toLocaleString('nb-NO')+' kr | ':'')+area.toFixed(2)+'m² + '+waste+'% svinn'};
  },
  btu_calc: (i) => {
    const area=+i.area, height=+i.ceiling||2.4, windows=+i.windows||1;
    if(!area) return null;
    const climate_mult={'Kaldt':1.4,'Moderat':1.1,'Varmt':0.9};
    const btu=Math.round(area*10.76*height/2.4*(climate_mult[i.climate]||1.1)+(windows*1000));
    const kw=(btu/3412).toFixed(2);
    return {value:btu.toLocaleString('nb-NO'), unit:'BTU', desc:kw+' kW | '+area+'m² | '+i.climate};
  },
  sqm_calculator: (i) => {
    const l=+i.length, w=+i.width;
    if(!l||!w) return null;
    let area;
    if(i.shape==='Trekant') area=(l*w/2).toFixed(2);
    else if(i.shape==='Sirkel') area=(Math.PI*(l/2)**2).toFixed(2);
    else if(i.shape==='Trapez') area=((l+w)/2*w).toFixed(2);
    else area=(l*w).toFixed(2);
    return {value:area, unit:'m²', desc:i.shape+': '+l+'×'+w+'m'};
  },
  rafter_calc: (i) => {
    const span=+i.span, pitch=+i.pitch, overhang=+i.overhang||0;
    if(!span||!pitch) return null;
    const run=span/2;
    const angle=pitch*Math.PI/180;
    const rafter=(run/Math.cos(angle)+overhang).toFixed(3);
    return {value:rafter, unit:'meter (sparrelengde)', desc:'Spenvidde: '+span+'m | Takvinkel: '+pitch+'° | Utstikk: '+overhang+'m'};
  },
  stair_calc: (i) => {
    const total=+i.total_height, step_h=+i.step_height||18, tread=+i.tread_depth||28;
    if(!total) return null;
    const steps=Math.round(total/step_h);
    const actual_h=(total/steps).toFixed(1);
    const total_run=(steps*tread/100).toFixed(2);
    return {value:steps, unit:'trinn', desc:'Trinnhøyde: '+actual_h+'cm | Total lengde: '+total_run+'m | 2R+T='+(2*+actual_h+tread)+'cm (ideal 60-65)'};
  },
  sand_calc: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth/100;
    if(!l||!w||!d) return null;
    const m3=(l*w*d).toFixed(3);
    const tonnes=(+m3*1.6).toFixed(2);
    return {value:m3, unit:'m³', desc:tonnes+' tonn | '+l+'×'+w+'m × '+i.depth+'cm dybde'};
  },
  asphalt_calc: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth/100;
    if(!l||!w||!d) return null;
    const m3=(l*w*d).toFixed(3);
    const tonnes=(+m3*2.4).toFixed(2);
    return {value:tonnes, unit:'tonn asfalt', desc:m3+' m³ | '+l+'×'+w+'m × '+i.depth+'cm tykkelse'};
  },
  brick_calc_adv: (i) => {
    const l=+i.wall_length, h=+i.wall_height;
    if(!l||!h) return null;
    const area=l*h;
    const bricks_per_m2={'Standard 228x108x63mm':50,'Halvstein 228x108x30mm':100,'Lecastein 400x200x200mm':12.5};
    const count=Math.ceil(area*(bricks_per_m2[i.brick_length]||50)*1.05);
    return {value:count.toLocaleString('nb-NO'), unit:'stein', desc:area.toFixed(1)+'m² | +5% svinn | '+i.brick_length};
  },
  pool_calc: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth;
    if(!l||!w||!d) return null;
    let vol;
    if(i.shape==='Oval') vol=(l*w*d*0.785).toFixed(1);
    else if(i.shape==='Sirkel') vol=(Math.PI*(l/2)**2*d).toFixed(1);
    else vol=(l*w*d).toFixed(1);
    const chlorine=(+vol*0.002).toFixed(2);
    return {value:vol, unit:'m³ ('+Math.round(+vol*1000)+' liter)', desc:'Klor: ~'+chlorine+'kg | pH: 7.2-7.6 anbefalt'};
  },
  chord_progression: (i) => {
    const key=i.key||'C', mode=i.mode||'Dur (Ionisk)', prog=i.progression||'I-IV-V-I';
    const major_chords={'C':['C','Dm','Em','F','G','Am','Bdim'],'D':['D','Em','F#m','G','A','Bm','C#dim'],'E':['E','F#m','G#m','A','B','C#m','D#dim'],'F':['F','Gm','Am','Bb','C','Dm','Edim'],'G':['G','Am','Bm','C','D','Em','F#dim'],'A':['A','Bm','C#m','D','E','F#m','G#dim'],'B':['B','C#m','D#m','E','F#','G#m','A#dim']};
    const chords=major_chords[key]||major_chords['C'];
    const prog_map={'I-IV-V-I':[0,3,4,0],'I-V-vi-IV':[0,4,5,3],'ii-V-I':[1,4,0],'I-vi-IV-V':[0,5,3,4],'I-IV-vi-V':[0,3,5,4]};
    const indices=prog_map[prog]||[0,3,4,0];
    const result=indices.map(i=>chords[i]).join(' - ');
    return {value:result, unit:'', desc:'Toneart: '+key+' '+mode+' | Progresjon: '+prog};
  },
  vocal_range: (i) => {
    const low=i.lowest_note||'C3', high=i.highest_note||'C5';
    const voice_types=[
      {type:'Bass',range:'E2-E4'},{type:'Baryton',range:'G2-G4'},{type:'Tenor',range:'C3-C5'},
      {type:'Mezzosopran',range:'A3-A5'},{type:'Sopran',range:'C4-C6'},{type:'Alt',range:'F3-F5'}
    ];
    const notes=['C2','D2','E2','F2','G2','A2','B2','C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
    const semitones=notes.indexOf(high)-notes.indexOf(low);
    const octaves=(semitones/12).toFixed(1);
    return {value:low+' til '+high, unit:'(rekkevidde)', desc:semitones+' halvtoner | '+octaves+' oktaver | '+low+'-'+high};
  },
  delay_reverb: (i) => {
    const bpm=+i.bpm;
    if(!bpm) return null;
    const beat_ms=60000/bpm;
    const note_mult={'Helnote':4,'Halvnote':2,'Kvartnote':1,'Åttendedelsnote':0.5,'Sekstendedelsnote':0.25,'Triol':0.333};
    const mult=note_mult[i.note_value]||1;
    const delay=(beat_ms*mult).toFixed(1);
    const reverb_pre=(beat_ms*0.1).toFixed(0);
    return {value:delay, unit:'ms (delay)', desc:'Pre-delay: '+reverb_pre+'ms | 1 slag = '+beat_ms.toFixed(1)+'ms | BPM: '+bpm};
  },
  guitar_tension: (i) => {
    const gauge=+i.string_gauge, scale=+i.scale||648;
    if(!gauge||!scale) return null;
    const unit_weight=gauge*gauge*0.000039*0.00254;
    const standard_freq={'Standard E':329.63,'Drop D':293.66,'DADGAD':293.66,'Open G':196,'Open D':146.83,'Half step down':311.13};
    const freq=standard_freq[i.tuning]||329.63;
    const tension=(unit_weight*(2*scale/1000*freq)**2).toFixed(2);
    return {value:tension, unit:'N (Newton)', desc:i.tuning+' | '+gauge+'mm streng | '+scale+'mm mensur'};
  },
  band_calc: (i) => {
    const fee=+i.gig_fee, members=+i.members||4, expenses=+i.expenses||0;
    if(!fee) return null;
    const net=fee-expenses;
    const per_member=(net/members).toFixed(0);
    return {value:parseFloat(per_member).toLocaleString('nb-NO'), unit:'kr per person', desc:'Honorar: '+fee.toLocaleString('nb-NO')+'kr - Utgifter: '+expenses.toLocaleString('nb-NO')+'kr = '+net.toLocaleString('nb-NO')+'kr netto'};
  },"""

with open('../assets/js/calc.js', 'r', encoding='utf-8') as f:
    content = f.read()

if 'time_elapsed' in content:
    print("Formulas already exist!")
else:
    insert_pos = content.rfind('};')
    if insert_pos == -1:
        print("ERROR: Could not find }; in calc.js")
    else:
        new_content = content[:insert_pos] + new_formulas + '\n' + content[insert_pos:]
        with open('../assets/js/calc.js', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("All formulas added!")

print("Done!")
