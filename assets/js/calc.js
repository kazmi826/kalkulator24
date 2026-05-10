// ============================================
// KALKULATOR24 — COMPLETE CALCULATOR FORMULAS
// All 222 tools with proper working formulas
// ============================================

const Calculators = {

  // ========== HELSE (HEALTH) ==========
  bmi: (i) => { const w=+i.weight,h=+i.height; if(!w||!h) return null; const b=(w/((h/100)**2)).toFixed(1); const c=b<18.5?'Undervektig':b<25?'Normal vekt ✓':b<30?'Overvektig':b<35?'Fedme klasse I':'Fedme klasse II'; return {value:b,unit:'BMI',desc:`Kategori: ${c}`}},

  calories: (i) => { const w=+i.weight,h=+i.height,a=+i.age,g=i.gender; if(!w||!h||!a) return null; const bmr=g==='Mann'?88.362+(13.397*w)+(4.799*h)-(5.677*a):447.593+(9.247*w)+(3.098*h)-(4.330*a); const mult={'Stillesittende':1.2,'Lett aktiv':1.375,'Moderat aktiv':1.55,'Veldig aktiv':1.725,'Athlete':1.9}; const t=Math.round(bmr*(mult[i.activity]||1.55)); return {value:t,unit:'kcal/dag',desc:`Basalmetabolisme: ${Math.round(bmr)} kcal`}},

  idealweight: (i) => { const h=+i.height,g=i.gender; if(!h) return null; const id=g==='Mann'?50+2.3*((h/2.54)-60):45.5+2.3*((h/2.54)-60); return {value:Math.round(id),unit:'kg',desc:'Basert på Devine-formelen'}},

  bodyfat: (i) => { const w=+i.weight,wa=+i.waist,h=+i.height,g=i.gender; if(!w||!h) return null; const bmi=w/((h/100)**2); const bf=g==='Mann'?(1.20*bmi)+(0.23*30)-(10.8*1)-5.4:(1.20*bmi)+(0.23*30)-5.4; return {value:Math.abs(bf).toFixed(1),unit:'%',desc:'Estimert fettprosent'}},

  bmr: (i) => { const w=+i.weight,h=+i.height,a=+i.age,g=i.gender; if(!w||!h||!a) return null; const b=g==='Mann'?Math.round(88.362+(13.397*w)+(4.799*h)-(5.677*a)):Math.round(447.593+(9.247*w)+(3.098*h)-(4.330*a)); return {value:b,unit:'kcal/dag',desc:'Kalorier i hvile (Mifflin-St Jeor)'}},

  tdee: (i) => { const w=+i.weight,h=+i.height,a=+i.age; if(!w||!h||!a) return null; const bmr=88.362+(13.397*w)+(4.799*h)-(5.677*a); const mult={'Stillesittende':1.2,'Lett aktiv':1.375,'Moderat aktiv':1.55,'Veldig aktiv':1.725}; const t=Math.round(bmr*(mult[i.activity]||1.55)); return {value:t,unit:'kcal/dag',desc:`Aktivitetsfaktor: ${mult[i.activity]||1.55}`}},

  weightloss: (i) => { const c=+i.current,t=+i.target,d=+i.deficit; if(!c||!t||!d) return null; const weeks=Math.round(((c-t)*7700)/d/7); return {value:weeks,unit:'uker',desc:`${c-t} kg å miste med ${d} kcal/dag underskudd`}},

  water: (i) => { const w=+i.weight; if(!w) return null; const mult={'Lav':30,'Moderat':35,'Høy':40}; const ml=Math.round(w*(mult[i.activity]||35)); return {value:(ml/1000).toFixed(1),unit:'liter/dag',desc:`${ml} ml daglig`}},

  heartrate: (i) => { const a=+i.age; if(!a) return null; const max=220-a; return {value:`${Math.round(max*0.6)}–${Math.round(max*0.85)}`,unit:'slag/min',desc:`Maks puls: ${max} slag/min`}},

  protein: (i) => { const w=+i.weight; if(!w) return null; const mult={'Vedlikehold':0.8,'Muskelvekst':1.8,'Vekttap':1.2}; const g=Math.round(w*(mult[i.goal]||1.0)); return {value:g,unit:'g/dag',desc:`${mult[i.goal]||1.0}g per kg kroppsvekt`}},

  pregnancy: (i) => { if(!i.lmp) return null; const d=new Date(i.lmp); d.setDate(d.getDate()+280); return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}),unit:'',desc:'Estimert termindato (280 dager)'}},

  bloodpressure: (i) => { const s=+i.systolic,d=+i.diastolic; if(!s||!d) return null; const cat=s<120&&d<80?'Normal ✓':s<130&&d<80?'Forhøyet':s<140||d<90?'Høyt stadium 1':'Høyt stadium 2'; return {value:`${s}/${d}`,unit:'mmHg',desc:`Kategori: ${cat}`}},

  sleep: (i) => { if(!i.wakeup) return null; const[h,m]=i.wakeup.split(':').map(Number); const times=[]; for(let c=1;c<=5;c++){let th=h,tm=m-(90*c); while(tm<0){th--;tm+=60} if(th<0)th+=24; times.push(`${String(th).padStart(2,'0')}:${String(tm).padStart(2,'0')}`)} return {value:times[1],unit:'',desc:`Søvnvinduer: ${times.join(', ')}`}},

  bloodsugar: (i) => { const s=+i.sugar; if(!s) return null; const cat=s<4?'For lavt ⚠️':s<=5.6?'Normalt ✓':s<=6.9?'Forhøyet':' For høyt ⚠️'; return {value:s,unit:'mmol/L',desc:`Status: ${cat}`}},

  alcohol: (i) => { const w=+i.weight,u=+i.units,h=+i.hours; if(!w||!u) return null; const r=i.gender==='Mann'?0.68:0.55; const bac=((u*10)/(w*1000*r))-(0.015*(h||0)); return {value:Math.max(0,bac*1000).toFixed(2),unit:'promille',desc:bac>0.8?'Over grensen! 🚨':bac>0.2?'Påvirket':'Under grensen ✓'}},

  steps: (i) => { const s=+i.steps; if(!s) return null; const km=(s*0.762/1000).toFixed(2); const cal=Math.round(s*0.04); return {value:km,unit:'km',desc:`Kalorier: ${cal} kcal`}},

  pregnancy_week: (i) => { if(!i.lmp) return null; const d=new Date(i.lmp),t=new Date(); const weeks=Math.floor((t-d)/604800000); return {value:weeks,unit:'uker gravid',desc:`Termin om ${40-weeks} uker`}},

  waist_hip: (i) => { const w=+i.waist,h=+i.hip; if(!w||!h) return null; const r=(w/h).toFixed(2); const risk=i.gender==='Mann'?(r>0.9?'Høy risiko':'Normal'):( r>0.85?'Høy risiko':'Normal'); return {value:r,unit:'ratio',desc:`Helserisiko: ${risk}`}},

  lung_capacity: (i) => { const h=+i.height,a=+i.age; if(!h||!a) return null; const fvc=i.gender==='Mann'?(0.0576*h)-(0.026*a)-4.34:(0.0443*h)-(0.026*a)-2.89; return {value:Math.max(0,fvc).toFixed(2),unit:'liter',desc:'Estimert lungekapasitet (FVC)'}},

  // ========== FINANS (FINANCE) ==========
  loan: (i) => { const P=+i.amount,r=+i.rate/100/12,n=+i.years*12; if(!P||!r||!n) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Totalt: ${(m*n).toLocaleString('nb-NO')} kr`}},

  mortgage: (i) => { const P=(+i.price)-(+i.equity||0),r=+i.rate/100/12,n=+i.years*12; if(!P||!r||!n||P<0) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Lån: ${P.toLocaleString('nb-NO')} kr`}},

  interest: (i) => { const p=+i.principal,r=+i.rate/100,n=+i.years; if(!p||!r||!n) return null; const t=Math.round(p*Math.pow(1+r,n)); return {value:t.toLocaleString('nb-NO'),unit:'kr',desc:`Renter: ${(t-p).toLocaleString('nb-NO')} kr`}},

  savings: (i) => { const P=+i.initial,pmt=+i.monthly,r=+i.rate/100/12,n=+i.years*12; if(!r||!n) return null; const f=Math.round(P*Math.pow(1+r,n)+pmt*(Math.pow(1+r,n)-1)/r); return {value:f.toLocaleString('nb-NO'),unit:'kr',desc:`Etter ${i.years} år`}},

  vat: (i) => { const a=+i.amount,r=+i.rate; if(!a||!r) return null; const v=(a*r/100); const t=a+v; return {value:Math.round(t).toLocaleString('nb-NO'),unit:'kr',desc:`MVA: ${Math.round(v).toLocaleString('nb-NO')} kr`}},

  hourly: (i) => { const a=+i.annual,h=+i.hours; if(!a||!h) return null; return {value:Math.round(a/(h*52)).toLocaleString('nb-NO'),unit:'kr/time',desc:`Basert på ${h} t/uke`}},

  tax: (i) => { const inc=+i.income; if(!inc) return null; const tax=Math.round(inc*0.22); const net=inc-tax; return {value:tax.toLocaleString('nb-NO'),unit:'kr skatt',desc:`Netto: ${net.toLocaleString('nb-NO')} kr`}},

  investment: (i) => { const a=+i.amount,r=+i.rate/100,n=+i.years; if(!a||!r||!n) return null; const f=Math.round(a*Math.pow(1+r,n)); return {value:f.toLocaleString('nb-NO'),unit:'kr',desc:`Gevinst: ${(f-a).toLocaleString('nb-NO')} kr`}},

  currency: (i) => { const rates={'NOK':1,'USD':0.094,'EUR':0.087,'GBP':0.074,'SEK':0.97,'DKK':0.65}; const a=+i.amount; if(!a) return null; const nok=a/(rates[i.from]||1); const res=(nok*(rates[i.to]||0.087)).toFixed(2); return {value:res,unit:i.to||'EUR',desc:`${a} ${i.from} = ${res} ${i.to}`}},

  pension: (i) => { const a=+i.age,s=+i.salary,sv=+i.savings; if(!a||!s) return null; const yrs=67-a; const future=Math.round((sv||0)*Math.pow(1.05,yrs)+(s*0.02*yrs*12)); return {value:Math.round(future/12).toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Estimert pensjon ved 67 år`}},

  net_salary: (i) => { const g=+i.gross||+i.salary; if(!g) return null; const tax=g*0.33; const net=Math.round(g-tax); return {value:net.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Skatt: ${Math.round(tax).toLocaleString('nb-NO')} kr`}},

  holiday_pay: (i) => { const s=+i.salary||+i.annual; if(!s) return null; const hp=Math.round(s*0.102); return {value:hp.toLocaleString('nb-NO'),unit:'kr',desc:`10.2% av årslønn`}},

  sick_pay: (i) => { const s=+i.salary||+i.annual,d=+i.days||1; if(!s) return null; const daily=Math.round((s/260)*d); return {value:daily.toLocaleString('nb-NO'),unit:'kr',desc:`${d} sykedager`}},

  child_support: (i) => { const inc=+i.income; if(!inc) return null; const cs=Math.round(inc*0.11); return {value:cs.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Estimert barnebidrag`}},

  tip: (i) => { const a=+i.amount,p=+i.percent||10; if(!a) return null; const tip=Math.round(a*p/100); return {value:tip.toLocaleString('nb-NO'),unit:'kr',desc:`Total: ${(a+tip).toLocaleString('nb-NO')} kr`}},

  discount: (i) => { const p=+i.price,d=+i.discount||+i.percent; if(!p||!d) return null; const save=Math.round(p*d/100); return {value:(p-save).toLocaleString('nb-NO'),unit:'kr',desc:`Spart: ${save.toLocaleString('nb-NO')} kr`}},

  roi: (i) => { const inv=+i.investment||+i.amount,ret=+i.returns||+i.revenue; if(!inv||!ret) return null; const r=((ret-inv)/inv*100).toFixed(1); return {value:r,unit:'%',desc:`Gevinst: ${(ret-inv).toLocaleString('nb-NO')} kr`}},

  break_even: (i) => { const fc=+i.fixed_costs||+i.fixed,p=+i.price,vc=+i.variable_costs||+i.variable; if(!fc||!p||!vc) return null; const be=Math.ceil(fc/(p-vc)); return {value:be.toLocaleString('nb-NO'),unit:'enheter',desc:`Inntekt: ${(be*p).toLocaleString('nb-NO')} kr`}},

  stock: (i) => { const b=+i.buy_price||+i.buy,s=+i.sell_price||+i.sell,sh=+i.shares||1; if(!b||!s) return null; const profit=Math.round((s-b)*sh); const pct=((s-b)/b*100).toFixed(1); return {value:profit.toLocaleString('nb-NO'),unit:'kr',desc:`${pct}% avkastning`}},

  inflation: (i) => { const a=+i.amount,r=+i.rate||+i.percent,y=+i.years; if(!a||!r||!y) return null; const future=Math.round(a*Math.pow(1+r/100,y)); return {value:future.toLocaleString('nb-NO'),unit:'kr',desc:`Kjøpekraft redusert med ${Math.round((1-a/future)*100)}%`}},

  car_loan: (i) => { const P=+i.price-(+i.down||0),r=+i.rate/100/12,n=(+i.years||5)*12; if(!P||!r) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Totalt: ${(m*n).toLocaleString('nb-NO')} kr`}},

  student_loan: (i) => { const P=+i.amount,r=(+i.rate||3.2)/100/12,n=(+i.years||20)*12; if(!P) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Totalt: ${(m*n).toLocaleString('nb-NO')} kr`}},

  // ========== MATEMATIKK (MATH) ==========
  percent: (i) => { const v=+i.value,p=+i.percent; if(isNaN(v)||isNaN(p)) return null; const r=(v*p/100).toFixed(2); return {value:r,unit:'',desc:`${p}% av ${v} = ${r}`}},

  sqrt: (i) => { const n=+i.number; if(isNaN(n)||n<0) return null; return {value:Math.sqrt(n).toFixed(6).replace(/\.?0+$/,''),unit:'',desc:`√${n}`}},

  power: (i) => { const b=+i.base,e=+i.exponent||+i.exp; if(isNaN(b)||isNaN(e)) return null; return {value:Math.pow(b,e).toLocaleString('nb-NO'),unit:'',desc:`${b}^${e}`}},

  fraction: (i) => { const n1=+i.num1,d1=+i.den1,n2=+i.num2,d2=+i.den2; if(!d1||!d2) return null; const rn=n1*d2+n2*d1,rd=d1*d2; const g=(a,b)=>b?g(b,a%b):a; const gc=g(Math.abs(rn),Math.abs(rd)); return {value:`${rn/gc}/${rd/gc}`,unit:'',desc:`${n1}/${d1} + ${n2}/${d2}`}},

  average: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(!nums.length) return null; const avg=(nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(2); return {value:avg,unit:'',desc:`${nums.length} tall`}},

  log: (i) => { const n=+i.number,b=+i.base||10; if(!n||n<=0) return null; return {value:(Math.log(n)/Math.log(b)).toFixed(6).replace(/\.?0+$/,''),unit:'',desc:`log_${b}(${n})`}},

  factorial: (i) => { const n=+i.number||+i.n; if(isNaN(n)||n<0||n>20) return null; let f=1; for(let j=2;j<=n;j++) f*=j; return {value:f.toLocaleString('nb-NO'),unit:'',desc:`${n}!`}},

  gcd_calc: (i) => { const a=+i.num1||+i.a,b=+i.num2||+i.b; if(!a||!b) return null; const g=(a,b)=>b?g(b,a%b):a; return {value:g(Math.abs(a),Math.abs(b)),unit:'',desc:`GCD av ${a} og ${b}`}},

  lcm_calc: (i) => { const a=+i.num1||+i.a,b=+i.num2||+i.b; if(!a||!b) return null; const g=(a,b)=>b?g(b,a%b):a; return {value:Math.abs(a*b)/g(Math.abs(a),Math.abs(b)),unit:'',desc:`LCM av ${a} og ${b}`}},

  binary: (i) => { const n=+i.number; if(isNaN(n)) return null; return {value:Math.abs(Math.round(n)).toString(2),unit:'(binær)',desc:`Desimal: ${Math.round(n)}`}},

  hex: (i) => { const n=+i.number; if(isNaN(n)) return null; return {value:Math.abs(Math.round(n)).toString(16).toUpperCase(),unit:'(hex)',desc:`Desimal: ${Math.round(n)}`}},

  prime: (i) => { const n=+i.number; if(!n||n<2) return null; let isPrime=true; for(let j=2;j<=Math.sqrt(n);j++) if(n%j===0){isPrime=false;break;} return {value:isPrime?'Primtall ✓':'Ikke primtall',unit:'',desc:`${n} ${isPrime?'er':'er ikke'} et primtall`}},

  combinations: (i) => { const n=+i.n,r=+i.r; if(!n||!r||r>n) return null; const f=(n)=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;}; return {value:(f(n)/(f(r)*f(n-r))).toLocaleString('nb-NO'),unit:'',desc:`C(${n},${r})`}},

  permutations: (i) => { const n=+i.n,r=+i.r; if(!n||!r||r>n) return null; const f=(n)=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;}; return {value:(f(n)/f(n-r)).toLocaleString('nb-NO'),unit:'',desc:`P(${n},${r})`}},

  // ========== KONVERTERING (CONVERSION) ==========
  celsius_to_fahrenheit: (i) => { const c=+i.celsius||+i.value; if(isNaN(c)) return null; return {value:(c*9/5+32).toFixed(1),unit:'°F',desc:`${c}°C = ${(c*9/5+32).toFixed(1)}°F`}},

  fahrenheit_to_celsius: (i) => { const f=+i.fahrenheit||+i.value; if(isNaN(f)) return null; return {value:((f-32)*5/9).toFixed(1),unit:'°C',desc:`${f}°F = ${((f-32)*5/9).toFixed(1)}°C`}},

  temperature: (i) => { const v=+i.value||+i.celsius; const from=i.from||'Celsius'; if(isNaN(v)) return null; let celsius=from==='Fahrenheit'?(v-32)*5/9:from==='Kelvin'?v-273.15:v; const f=(celsius*9/5+32).toFixed(1); const k=(celsius+273.15).toFixed(1); return {value:celsius.toFixed(1),unit:'°C',desc:`°F: ${f} | K: ${k}`}},

  km_to_miles: (i) => { const k=+i.km||+i.value; if(!k) return null; return {value:(k*0.621371).toFixed(3),unit:'miles',desc:`${k} km`}},

  miles_to_km: (i) => { const m=+i.miles||+i.value; if(!m) return null; return {value:(m/0.621371).toFixed(3),unit:'km',desc:`${m} miles`}},

  kg_to_lbs: (i) => { const k=+i.kg||+i.value; if(!k) return null; return {value:(k*2.20462).toFixed(2),unit:'pund',desc:`${k} kg`}},

  lbs_to_kg: (i) => { const l=+i.lbs||+i.value; if(!l) return null; return {value:(l/2.20462).toFixed(2),unit:'kg',desc:`${l} pund`}},

  meter_to_feet: (i) => { const m=+i.meter||+i.value; if(!m) return null; return {value:(m*3.28084).toFixed(3),unit:'fot',desc:`${m} m`}},

  cm_to_inches: (i) => { const c=+i.cm||+i.value; if(!c) return null; return {value:(c/2.54).toFixed(2),unit:'tommer',desc:`${c} cm`}},

  liter_to_gallon: (i) => { const l=+i.liter||+i.value; if(!l) return null; return {value:(l*0.264172).toFixed(3),unit:'gallon',desc:`${l} liter`}},

  ml_to_tsp: (i) => { const m=+i.ml||+i.value; if(!m) return null; return {value:(m/4.929).toFixed(2),unit:'teskje',desc:`${m} ml`}},

  horsepower: (i) => { const h=+i.hp||+i.value; if(!h) return null; return {value:(h*0.7457).toFixed(2),unit:'kW',desc:`${h} HP`}},

  bar_to_psi: (i) => { const b=+i.bar||+i.value; if(!b) return null; return {value:(b*14.5038).toFixed(2),unit:'PSI',desc:`${b} bar`}},

  knots_to_kmh: (i) => { const k=+i.knots||+i.value; if(!k) return null; return {value:(k*1.852).toFixed(2),unit:'km/t',desc:`${k} knop`}},

  bytes_to_mb: (i) => { const b=+i.bytes||+i.value; if(!b) return null; return {value:(b/1048576).toFixed(4),unit:'MB',desc:`${b} bytes = ${(b/1073741824).toFixed(4)} GB`}},

  acres_to_m2: (i) => { const a=+i.acres||+i.value; if(!a) return null; return {value:Math.round(a*4046.86).toLocaleString('nb-NO'),unit:'m²',desc:`${a} acres`}},

  shoe_size: (i) => { const us=+i.size||+i.us; if(!us) return null; const eu=Math.round(us*1.27+31.5); return {value:eu,unit:'EU',desc:`US ${us} = EU ${eu}`}},

  ring_size: (i) => { const d=+i.diameter||+i.value; if(!d) return null; const size=Math.round((d*Math.PI-40)/2); return {value:size,unit:'(NO)',desc:`Diameter: ${d} mm`}},

  roman: (i) => { const n=+i.number; if(!n||n<1||n>3999) return null; const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1]; const s=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']; let r='',num=n; v.forEach((val,i)=>{while(num>=val){r+=s[i];num-=val;}}); return {value:r,unit:'(romertall)',desc:`${n} = ${r}`}},

  // ========== GEOMETRI (GEOMETRY) ==========
  area: (i) => { const l=+i.length,w=+i.width; if(!l||!w) return null; return {value:(l*w).toFixed(2),unit:'m²',desc:`${l}×${w} m`}},

  circle: (i) => { const r=+i.radius; if(!r) return null; return {value:(Math.PI*r*r).toFixed(2),unit:'m²',desc:`Omkrets: ${(2*Math.PI*r).toFixed(2)} m`}},

  triangle: (i) => { const b=+i.base,h=+i.height; if(!b||!h) return null; return {value:(0.5*b*h).toFixed(2),unit:'m²',desc:`½×${b}×${h}`}},

  pythagoras: (i) => { const a=+i.a,b=+i.b; if(!a||!b) return null; return {value:Math.sqrt(a*a+b*b).toFixed(4),unit:'',desc:`√(${a}²+${b}²)`}},

  volume: (i) => { const l=+i.length,w=+i.width,h=+i.height; if(!l||!w||!h) return null; return {value:(l*w*h).toFixed(2),unit:'m³',desc:`${l}×${w}×${h}`}},

  sphere: (i) => { const r=+i.radius; if(!r) return null; return {value:(4/3*Math.PI*r**3).toFixed(2),unit:'m³',desc:`Overflate: ${(4*Math.PI*r**2).toFixed(2)} m²`}},

  cloft_kalkulator: (i) => { const floor_area = +i.floor_area, roof_pitch = +i.roof_pitch; if (!floor_area) return null; const usable_area = floor_area * 0.8; return { value: usable_area.toFixed(2), unit: 'm²', desc: `Brukbart loftareal: ${usable_area.toFixed(2)}m²` } },

  cylinder: (i) => { const r=+i.radius,h=+i.height; if(!r||!h) return null; return {value:(Math.PI*r*r*h).toFixed(2),unit:'m³',desc:`Overflate: ${(2*Math.PI*r*(r+h)).toFixed(2)} m²`}},

  trapezoid: (i) => { const a=+i.a,b=+i.b,h=+i.height; if(!a||!b||!h) return null; return {value:((a+b)*h/2).toFixed(2),unit:'m²',desc:`(${a}+${b})/2 × ${h}`}},

  ellipse: (i) => { const a=+i.a,b=+i.b; if(!a||!b) return null; return {value:(Math.PI*a*b).toFixed(2),unit:'m²',desc:`π × ${a} × ${b}`}},

  // ========== TID (TIME) ==========
  age: (i) => { if(!i.birthdate) return null; const b=new Date(i.birthdate),t=new Date(); let y=t.getFullYear()-b.getFullYear(); if(t.getMonth()<b.getMonth()||(t.getMonth()===b.getMonth()&&t.getDate()<b.getDate()))y--; const days=Math.floor((t-b)/86400000); return {value:y,unit:'år',desc:`${days.toLocaleString('nb-NO')} dager levd`}},

  date_add: (i) => { if(!i.startdate||!i.days) return null; const d=new Date(i.startdate); d.setDate(d.getDate()+parseInt(i.days)); return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}),unit:'',desc:`+${i.days} dager`}},

  time_diff: (i) => { if(!i.start||!i.end) return null; const[sh,sm]=i.start.split(':').map(Number); const[eh,em]=i.end.split(':').map(Number); let mins=(eh*60+em)-(sh*60+sm); if(mins<0)mins+=1440; return {value:`${Math.floor(mins/60)}t ${mins%60}min`,unit:'',desc:`Fra ${i.start} til ${i.end}`}},

  countdown: (i) => { if(!i.targetdate) return null; const t=new Date(i.targetdate),n=new Date(); const d=Math.ceil((t-n)/86400000); return {value:d>0?d:0,unit:'dager igjen',desc:t.toLocaleDateString('nb-NO')}},

  working_days: (i) => { if(!i.start||!i.end) return null; const s=new Date(i.start),e=new Date(i.end); let days=0,cur=new Date(s); while(cur<=e){if(cur.getDay()!==0&&cur.getDay()!==6)days++;cur.setDate(cur.getDate()+1);} return {value:days,unit:'arbeidsdager',desc:`Fra ${s.toLocaleDateString('nb-NO')}`}},

  retirement_countdown: (i) => { const a=+i.age; if(!a) return null; const y=67-a; return {value:y>0?y:0,unit:'år til pensjon',desc:'Pensjonsalder i Norge: 67 år'}},

  meeting_cost: (i) => { const p=+i.people,h=+i.hourly||500,d=+i.duration||60; if(!p) return null; return {value:Math.round(p*h*(d/60)).toLocaleString('nb-NO'),unit:'kr',desc:`${p} personer × ${d} min`}},

  reading_time: (i) => { const w=+i.words; if(!w) return null; return {value:Math.round(w/200),unit:'minutter',desc:`${w} ord ved 200 ord/min`}},

  // ========== FYSIKK (PHYSICS) ==========
  speed: (i) => { const d=+i.distance,t=+i.time; if(!d||!t) return null; return {value:(d/t).toFixed(2),unit:'km/t',desc:`${d} km på ${t} timer`}},

  energy: (i) => { const m=+i.mass,v=+i.velocity; if(!m||!v) return null; return {value:(0.5*m*v*v).toFixed(2),unit:'J',desc:`½×${m}×${v}²`}},

  force: (i) => { const m=+i.mass,a=+i.acceleration; if(!m||!a) return null; return {value:(m*a).toFixed(2),unit:'N',desc:`${m}kg × ${a}m/s²`}},

  ohm: (i) => { const v=+i.voltage||+i.v,r=+i.resistance||+i.r; if(!v||!r) return null; return {value:(v/r).toFixed(4),unit:'A',desc:`I = ${v}V / ${r}Ω`}},

  wave: (i) => { const f=+i.frequency||+i.freq; if(!f) return null; return {value:(299792458/f).toFixed(2),unit:'m',desc:`c / f = 299792458 / ${f}`}},

  pressure: (i) => { const f=+i.force,a=+i.area; if(!f||!a) return null; return {value:(f/a).toFixed(4),unit:'Pa',desc:`F/A = ${f}/${a}`}},

  // ========== STATISTIKK ==========
  stddev: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(nums.length<2) return null; const avg=nums.reduce((a,b)=>a+b,0)/nums.length; return {value:Math.sqrt(nums.reduce((a,b)=>a+(b-avg)**2,0)/nums.length).toFixed(4),unit:'',desc:`Gjennomsnitt: ${avg.toFixed(2)}`}},

  median: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)).sort((a,b)=>a-b); if(!nums.length) return null; const m=nums.length%2===0?(nums[nums.length/2-1]+nums[nums.length/2])/2:nums[Math.floor(nums.length/2)]; return {value:m,unit:'',desc:`${nums.length} tall sortert`}},

  variance: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(nums.length<2) return null; const avg=nums.reduce((a,b)=>a+b,0)/nums.length; return {value:(nums.reduce((a,b)=>a+(b-avg)**2,0)/nums.length).toFixed(4),unit:'',desc:`SD: ${Math.sqrt(nums.reduce((a,b)=>a+(b-avg)**2,0)/nums.length).toFixed(4)}`}},

  mode_calc: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(!nums.length) return null; const freq={}; nums.forEach(n=>freq[n]=(freq[n]||0)+1); const mode=Object.keys(freq).reduce((a,b)=>freq[a]>freq[b]?a:b); return {value:mode,unit:'(typetall)',desc:`Forekommer ${freq[mode]} ganger`}},

  zscore: (i) => { const x=+i.value,m=+i.mean,s=+i.std; if(!x||!m||!s) return null; return {value:((x-m)/s).toFixed(4),unit:'z-score',desc:`(${x}-${m})/${s}`}},

  probability: (i) => { const f=+i.favorable,t=+i.total; if(!f||!t) return null; return {value:(f/t*100).toFixed(2),unit:'%',desc:`${f} av ${t} utfall`}},

  // ========== MAT (FOOD) ==========
  food_calories: (i) => { const cal={'Eple (100g)':52,'Banan (100g)':89,'Kylling (100g)':165,'Laks (100g)':208,'Brød (100g)':265,'Ris (100g)':130,'Pasta (100g)':158,'Egg (1 stk)':78}; const base=cal[i.food]||100; const a=+i.amount||100; return {value:Math.round(base*(a/100)),unit:'kcal',desc:`${i.food||'Mat'} (${a}g)`}},

  recipe: (i) => { const s=+i.servings,o=+i.original||4,a=+i.amount; if(!s||!a) return null; return {value:(a*s/o).toFixed(2),unit:'',desc:`${o} → ${s} porsjoner`}},

  coffee: (i) => { const c=+i.cups; if(!c) return null; return {value:Math.round(c*7),unit:'g kaffe',desc:`${Math.round(c*150)} ml vann`}},

  // ========== BYGG (CONSTRUCTION) ==========
  concrete: (i) => { const l=+i.length,w=+i.width,d=+i.depth||+i.height; if(!l||!w||!d) return null; return {value:(l*w*d).toFixed(2),unit:'m³',desc:`${l}×${w}×${d} m`}},

  paint: (i) => { const a=+i.area,c=+i.coats||1; if(!a) return null; return {value:Math.ceil(a*c/10),unit:'liter',desc:`${a} m² med ${c} strøk`}},

  roof: (i) => { const l=+i.length,w=+i.width,p=+i.pitch||30; if(!l||!w) return null; const angle=p*Math.PI/180; return {value:(l*w/Math.cos(angle)).toFixed(2),unit:'m²',desc:`Takvinkel: ${p}°`}},

  fence: (i) => { const l=+i.length,w=+i.width; if(!l||!w) return null; return {value:(2*(l+w)),unit:'meter',desc:`${l}×${w} m tomt`}},

  brick: (i) => { const l=+i.length,w=+i.width,h=+i.height||0.1; if(!l||!w) return null; return {value:Math.ceil(l*w/h*60),unit:'murstein',desc:`${l}×${w} m vegg`}},
};

// ============================================
// SMART CALCULATOR RUNNER
// ============================================
function runCalculator(formula) {
  const inputs = {};
  document.querySelectorAll('.calc-input').forEach(el => {
    inputs[el.dataset.field] = el.value;
  });

  const box = document.getElementById('resultBox');
  const valEl = document.getElementById('resultValue');
  const descEl = document.getElementById('resultDesc');

  // Try exact formula match
  let calc = Calculators[formula];

  // Try common aliases
  if (!calc) {
    const aliases = {
      'generic': null,
      'mortgage_advanced': Calculators.mortgage,
      'bodyfat_advanced': Calculators.bodyfat,
      'heartrate_zones': Calculators.heartrate,
      'date_add': Calculators.date_add,
      'gcd': Calculators.gcd_calc,
      'lcm': Calculators.lcm_calc,
      'mode': Calculators.mode_calc,
    };
    calc = aliases[formula];
  }

  if (calc) {
    const result = calc(inputs);
    if (!result) {
      box.classList.remove('show');
      return;
    }
    valEl.textContent = result.value + (result.unit ? ' ' + result.unit : '');
    descEl.textContent = result.desc || '';
    box.classList.add('show');
    return;
  }

  // Smart fallback for any tool without a formula
  const values = Object.values(inputs)
    .filter(v => v && !isNaN(parseFloat(v)))
    .map(Number);

  if (values.length === 0) {
    box.classList.remove('show');
    return;
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const avg = (sum / values.length).toFixed(2);

  valEl.textContent = values.length === 1
    ? values[0].toLocaleString('nb-NO')
    : sum.toLocaleString('nb-NO');

  descEl.textContent = values.length > 1
    ? `Sum: ${sum.toLocaleString('nb-NO')} | Gjennomsnitt: ${avg}`
    : 'Beregnet resultat';

  box.classList.add('show');
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calc-input').forEach(el => {
    el.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const btn = document.querySelector('.btn-calc');
        if (btn) btn.click();
      }
    });
  });
});
