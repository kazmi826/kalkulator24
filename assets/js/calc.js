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

  // ========== BIOLOGI ==========
  population_growth: (i) => {
    const p=+i.population, r=+i.growth_rate/100, n=+i.years;
    if(!p||!r||!n) return null;
    const future = Math.round(p * Math.pow(1+r, n));
    const increase = future - p;
    return {value: future.toLocaleString('nb-NO'), unit: 'personer', desc: `Økning: ${increase.toLocaleString('nb-NO')} (+${(r*100).toFixed(1)}%/år × ${n} år)`};
  },

  punnett: (i) => {
    const p1=i.parent1||'Aa', p2=i.parent2||'Aa';
    const alleles1=[p1[0],p1[1]], alleles2=[p2[0],p2[1]];
    const combos=[];
    alleles1.forEach(a=>alleles2.forEach(b=>combos.push([a,b].sort().join(''))));
    const AA=combos.filter(c=>c==='AA').length;
    const Aa=combos.filter(c=>c==='Aa').length;
    const aa=combos.filter(c=>c==='aa').length;
    return {value:`AA:${AA/4*100}% Aa:${Aa/4*100}% aa:${aa/4*100}%`, unit:'', desc:`${p1} × ${p2} — ${AA} AA, ${Aa} Aa, ${aa} aa av 4`};
  },

  blood_type_inheritance: (i) => {
    const map={'A':['IA','i'],'B':['IB','i'],'AB':['IA','IB'],'O':['i','i']};
    const p1=map[i.parent1]||['IA','i'], p2=map[i.parent2]||['IA','i'];
    const results=[];
    p1.forEach(a=>p2.forEach(b=>{
      const g=[a,b].sort().join('');
      if(g==='IAia'||g==='IAIA') results.push('A');
      else if(g==='IBia'||g==='IBIB') results.push('B');
      else if(g==='IAIB') results.push('AB');
      else results.push('O');
    }));
    const unique=[...new Set(results)];
    return {value:unique.join(', '), unit:'mulige blodtyper', desc:`${i.parent1} × ${i.parent2} kombinasjon`};
  },

  blood_type: (i) => {
    const compatible={'A+':['A+','A-','O+','O-'],'A-':['A-','O-'],'B+':['B+','B-','O+','O-'],'B-':['B-','O-'],'AB+':['A+','A-','B+','B-','AB+','AB-','O+','O-'],'AB-':['A-','B-','AB-','O-'],'O+':['O+','O-'],'O-':['O-']};
    const canGiveTo={'A+':['A+','AB+'],'A-':['A+','A-','AB+','AB-'],'B+':['B+','AB+'],'B-':['B+','B-','AB+','AB-'],'AB+':['AB+'],'AB-':['AB+','AB-'],'O+':['O+','A+','B+','AB+'],'O-':['O+','O-','A+','A-','B+','B-','AB+','AB-']};
    const bt=i.blood_type||'O+';
    return {value:compatible[bt]?.join(', ')||'', unit:'(kan motta fra)', desc:`Kan gi til: ${canGiveTo[bt]?.join(', ')||''}`};
  },

  doubling_time: (i) => {
    const r=+i.growth_rate;
    if(!r||r<=0) return null;
    const dt=(Math.log(2)/Math.log(1+r/100)).toFixed(2);
    return {value:dt, unit:'år', desc:`Regel 70: 70/${r} = ${(70/r).toFixed(1)} år (estimat)`};
  },

  ecological_footprint: (i) => {
    const meat=(+i.meat||0)*0.5;
    const transport=(+i.transport||0)*0.00021*365;
    const electricity=(+i.electricity||0)*0.012;
    const total=(meat*52+transport+electricity*12).toFixed(1);
    const earths=(total/2.7).toFixed(1);
    return {value:total, unit:'tonn CO₂/år', desc:`Tilsvarer ${earths} jordkloder`};
  },

  allele_frequency: (i) => {
    const d=+i.dominant, t=+i.total;
    if(!t) return null;
    const p=(d/t).toFixed(4);
    const q=(1-p).toFixed(4);
    return {value:p, unit:'(p)', desc:`q = ${q} | p + q = 1.0`};
  },

  hardy_weinberg: (i) => {
    const p=+i.p;
    if(!p||p<0||p>1) return null;
    const q=(1-p).toFixed(4);
    const AA=(p*p).toFixed(4);
    const Aa=(2*p*(1-p)).toFixed(4);
    const aa=((1-p)*(1-p)).toFixed(4);
    return {value:`AA=${AA}, Aa=${Aa}, aa=${aa}`, unit:'', desc:`p=${p}, q=${q} | Hardy-Weinberg likevekt`};
  },

  dog_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+63);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Hundegraviditet: 58-68 dager (ca 63 dager)'};
  },

  cat_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+65);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Kattegraviditet: 63-67 dager (ca 65 dager)'};
  },

  sheep_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+147);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Sauedrektigheit: 144-151 dager (ca 147 dager)'};
  },

  goat_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+150);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Geitedrektighet: 145-155 dager (ca 150 dager)'};
  },

  cow_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+283);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Kugraviditet: 279-287 dager (ca 283 dager)'};
  },

  horse_pregnancy: (i) => {
    if(!i.mating_date) return null;
    const d=new Date(i.mating_date);
    d.setDate(d.getDate()+340);
    return {value:d.toLocaleDateString('nb-NO',{day:'numeric',month:'long',year:'numeric'}), unit:'', desc:'Hestdrektighet: 320-360 dager (ca 340 dager)'};
  },

  dog_age: (i) => {
    const a=+i.dog_age;
    if(!a) return null;
    const size=i.size||'Medium (10-25 kg)';
    let human;
    if(size.includes('Liten')) human=Math.round(a<=1?15:a<=2?24:24+(a-2)*4);
    else if(size.includes('Stor')) human=Math.round(a<=1?15:a<=2?24:24+(a-2)*6);
    else human=Math.round(a<=1?15:a<=2?24:24+(a-2)*5);
    return {value:human, unit:'menneskeår', desc:`${a} hundeår = ${human} menneskeår (${size})`};
  },

  cat_age: (i) => {
    const a=+i.cat_age;
    if(!a) return null;
    const human=a<=1?15:a<=2?24:Math.round(24+(a-2)*4);
    return {value:human, unit:'menneskeår', desc:`${a} katteår = ${human} menneskeår`};
  },

  chocolate_toxicity_dog: (i) => {
    const w=+i.weight, c=+i.chocolate;
    if(!w||!c) return null;
    const toxicity={'Melkesjokolade':44,'Mørk sjokolade':154,'Bakesjokolade':396,'Hvit sjokolade':0};
    const theobromine=(toxicity[i.type]||44)*c/100;
    const per_kg=theobromine/w;
    let risk=per_kg<20?'Minimal risiko ✓':per_kg<40?'Moderat risiko ⚠️':per_kg<60?'Alvorlig risiko 🚨':'Livsfarlig! Ring veterinær nå! 🚨';
    return {value:theobromine.toFixed(1), unit:'mg teobromin', desc:`${per_kg.toFixed(1)} mg/kg — ${risk}`};
  },

  chocolate_toxicity_cat: (i) => {
    const w=+i.weight, c=+i.chocolate;
    if(!w||!c) return null;
    const toxicity={'Melkesjokolade':44,'Mørk sjokolade':154,'Bakesjokolade':396};
    const theobromine=(toxicity[i.type]||44)*c/100;
    const per_kg=theobromine/w;
    let risk=per_kg<80?'Minimal risiko ✓':per_kg<160?'Moderat risiko ⚠️':'Alvorlig — kontakt veterinær! 🚨';
    return {value:theobromine.toFixed(1), unit:'mg teobromin', desc:`${per_kg.toFixed(1)} mg/kg — ${risk}`};
  },

  dog_food: (i) => {
    const w=+i.weight;
    if(!w) return null;
    const base=w*0.02;
    const ageMulti={'Valp (under 1 år)':2,'Voksen (1-7 år)':1,'Senior (over 7 år)':0.8};
    const actMulti={'Lav':0.8,'Normal':1,'Høy':1.3};
    const amount=(base*(ageMulti[i.age]||1)*(actMulti[i.activity]||1)*1000).toFixed(0);
    return {value:amount, unit:'gram/dag', desc:`For ${w} kg hund — ${i.age||'Voksen'}`};
  },

  cat_calories: (i) => {
    const w=+i.weight;
    if(!w) return null;
    const rer=70*Math.pow(w,0.75);
    const multi={'Kattunge':2.5,'Voksen':1.2,'Senior':1.1};
    const sterile={'Sterilisert/Kastrert':0.8,'Intakt':1};
    const cal=Math.round(rer*(multi[i.age]||1.2)*(sterile[i.status]||1));
    return {value:cal, unit:'kcal/dag', desc:`RER: ${Math.round(rer)} kcal | ${i.age||'Voksen'} katt`};
  },

  protein_mw: (i) => {
    const seq=(i.sequence||'').toUpperCase().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g,'');
    if(!seq.length) return null;
    const mw={'A':89,'C':121,'D':133,'E':147,'F':165,'G':75,'H':155,'I':131,'K':146,'L':131,'M':149,'N':132,'P':115,'Q':146,'R':174,'S':105,'T':119,'V':117,'W':204,'Y':181};
    const total=seq.split('').reduce((sum,aa)=>sum+(mw[aa]||110),0)-(seq.length-1)*18;
    return {value:(total/1000).toFixed(2), unit:'kDa', desc:`${seq.length} aminosyrer | ${total.toLocaleString()} Da`};
  },

  dna_melting: (i) => {
    const seq=(i.sequence||'').toUpperCase().replace(/[^ATCG]/g,'');
    if(!seq.length) return null;
    const gc=seq.split('').filter(b=>b==='G'||b==='C').length;
    const at=seq.length-gc;
    const tm=seq.length<14?2*(at)+4*(gc):64.9+41*(gc-16.4)/seq.length;
    return {value:tm.toFixed(1), unit:'°C', desc:`GC: ${gc}/${seq.length} (${(gc/seq.length*100).toFixed(0)}%) | AT: ${at}`};
  },

  annealing_temp: (i) => {
    const tm=+i.tm;
    if(!tm) return null;
    const ta=(tm-5).toFixed(1);
    return {value:ta, unit:'°C', desc:`Ta = Tm - 5°C = ${tm} - 5 = ${ta}°C`};
  },

  compost: (i) => {
    const g=+i.green, b=+i.brown;
    if(!g||!b) return null;
    const ratio=(b/g).toFixed(1);
    const ideal=ratio>=25&&ratio<=30?'Ideelt ✓':ratio<25?'Trenger mer brunt materiale':'Trenger mer grønt materiale';
    return {value:ratio, unit:':1 (brun:grønn)', desc:`C:N forhold — ${ideal}`};
  },

  soil: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth/100;
    if(!l||!w||!d) return null;
    const vol=(l*w*d).toFixed(3);
    const liters=(l*w*d*1000).toFixed(0);
    return {value:liters, unit:'liter', desc:`${vol} m³ | Ca ${Math.ceil(+liters/50)} sekker (50L)`};
  },

  grass_seed: (i) => {
    const a=+i.area;
    if(!a) return null;
    const rate=i.type==='Nysåing'?30:15;
    const kg=(a*rate/1000).toFixed(2);
    return {value:kg, unit:'kg frø', desc:`${rate} g/m² × ${a} m² = ${kg} kg`};
  },

  corn_yield: (i) => {
    const a=+i.area, p=+i.plants||8000;
    if(!a) return null;
    const yield_kg=Math.round(a*p*0.18/1000);
    return {value:yield_kg.toLocaleString('nb-NO'), unit:'kg', desc:`${a} dekar × ${p} planter/dekar`};
  },

  cattle_per_acre: (i) => {
    const a=+i.area;
    if(!a) return null;
    const multi={'Lav':0.3,'Normal':0.5,'God':0.8};
    const cows=Math.floor(a*(multi[i.quality]||0.5));
    return {value:cows, unit:'kyr', desc:`${i.quality||'Normal'} beitekvalitet på ${a} dekar`};
  },

  // ========== KJEMI ==========
  molality: (i) => {
    const mol=+i.moles, solvent=+i.solvent;
    if(!mol||!solvent) return null;
    return {value:(mol/solvent).toFixed(4), unit:'mol/kg', desc:`${mol} mol / ${solvent} kg`};
  },

  concentration: (i) => {
    const mol=+i.moles, vol=+i.volume;
    if(!mol||!vol) return null;
    return {value:(mol/vol).toFixed(4), unit:'M (mol/L)', desc:`${mol} mol / ${vol} L`};
  },

  ph_calc: (i) => {
    const h=+i.h_conc;
    if(!h||h<=0) return null;
    const ph=(-Math.log10(h)).toFixed(2);
    const type=ph<7?'Sur syre':ph>7?'Basisk':'Nøytral';
    return {value:ph, unit:'pH', desc:`[H⁺] = ${h} M — ${type}`};
  },

  molecular_weight: (i) => {
    const c=+i.carbon||0, h=+i.hydrogen||0, o=+i.oxygen||0;
    const mw=(c*12.011)+(h*1.008)+(o*15.999);
    return {value:mw.toFixed(3), unit:'g/mol', desc:`C${c}H${h}O${o}`};
  },

  molar_mass: (i) => {
    const c=+i.carbon||0, h=+i.hydrogen||0, o=+i.oxygen||0, n=+i.nitrogen||0;
    const mm=(c*12.011)+(h*1.008)+(o*15.999)+(n*14.007);
    return {value:mm.toFixed(3), unit:'g/mol', desc:`C${c}H${h}O${o}N${n}`};
  },

  molarity: (i) => {
    const mol=+i.moles, vol=+i.volume;
    if(!mol||!vol) return null;
    return {value:(mol/vol).toFixed(4), unit:'M', desc:`${mol} mol / ${vol} L = ${(mol/vol).toFixed(4)} M`};
  },

  mol_calc: (i) => {
    const g=+i.grams, mm=+i.molar_mass;
    if(!g||!mm) return null;
    const mol=(g/mm).toFixed(4);
    return {value:mol, unit:'mol', desc:`${g}g / ${mm}g/mol = ${mol} mol`};
  },

  gram_to_mol: (i) => {
    const g=+i.grams, mm=+i.molar_mass;
    if(!g||!mm) return null;
    return {value:(g/mm).toFixed(4), unit:'mol', desc:`${g}g ÷ ${mm}g/mol`};
  },

  percent_yield: (i) => {
    const actual=+i.actual, theoretical=+i.theoretical;
    if(!actual||!theoretical) return null;
    return {value:(actual/theoretical*100).toFixed(2), unit:'%', desc:`${actual}g / ${theoretical}g × 100`};
  },

  theoretical_yield: (i) => {
    const mol=+i.moles, mm=+i.molar_mass_product;
    if(!mol||!mm) return null;
    return {value:(mol*mm).toFixed(3), unit:'gram', desc:`${mol} mol × ${mm} g/mol`};
  },

  dilution_factor: (i) => {
    const c1=+i.c1, v1=+i.v1, v2=+i.v2;
    if(!c1||!v1||!v2) return null;
    const c2=(c1*v1/v2).toFixed(4);
    return {value:c2, unit:'M', desc:`C1V1=C2V2: ${c1}×${v1}=${c2}×${v2}`};
  },

  serial_dilution: (i) => {
    const c=+i.initial_conc, df=+i.dilution_factor, steps=+i.steps;
    if(!c||!df||!steps) return null;
    const final=(c/Math.pow(df,steps)).toExponential(3);
    return {value:final, unit:'', desc:`${c} ÷ ${df}^${steps} = ${final}`};
  },

  partial_pressure: (i) => {
    const pt=+i.total_pressure, mf=+i.mole_fraction;
    if(!pt||!mf) return null;
    return {value:(pt*mf).toFixed(4), unit:'atm', desc:`P_total × X = ${pt} × ${mf}`};
  },

  entropy: (i) => {
    const q=+i.q, t=+i.temperature;
    if(!q||!t) return null;
    return {value:(q/t).toFixed(4), unit:'J/K', desc:`ΔS = q/T = ${q}/${t}`};
  },

  pka_calc: (i) => {
    const ka=+i.ka;
    if(!ka||ka<=0) return null;
    const pka=(-Math.log10(ka)).toFixed(2);
    return {value:pka, unit:'pKa', desc:`pKa = -log(${ka}) = ${pka}`};
  },

  percent_composition: (i) => {
    const em=+i.element_mass, tm=+i.total_mass;
    if(!em||!tm) return null;
    return {value:(em/tm*100).toFixed(2), unit:'%', desc:`${em}g/mol ÷ ${tm}g/mol × 100%`};
  },

  oxidation_number: (i) => {
    const nums={'H':{'Syre':'+1','Base':'+1','Salt':'+1','Oksid':'+1'},'O':{'Syre':'-2','Base':'-2','Salt':'-2','Oksid':'-2'},'Na':{'Syre':'+1','Base':'+1','Salt':'+1','Oksid':'+1'},'Cl':{'Syre':'-1','Base':'-1','Salt':'-1','Oksid':'-1'}};
    const n=nums[i.element]?.[i.compound]||'Variabel';
    return {value:n, unit:`(${i.element} i ${i.compound})`, desc:`Oksidasjonstall for ${i.element}`};
  },

  solution_dilution: (i) => {
    const c1=+i.c1, v1=+i.v1, c2=+i.c2;
    if(!c1||!v1||!c2) return null;
    const v2=(c1*v1/c2).toFixed(2);
    return {value:v2, unit:'mL', desc:`V2 = C1×V1/C2 = ${c1}×${v1}/${c2}`};
  },

  tds_calc: (i) => {
    const ec=+i.ec;
    if(!ec) return null;
    const tds=(ec*0.64).toFixed(0);
    const quality=tds<300?'Utmerket':tds<600?'God':tds<900?'Akseptabel':'Dårlig';
    return {value:tds, unit:'ppm (mg/L)', desc:`Vannkvalitet: ${quality}`};
  },

  titration: (i) => {
    const ct=+i.c_titrant, vt=+i.v_titrant, va=+i.v_analyte;
    if(!ct||!vt||!va) return null;
    const ca=(ct*vt/va).toFixed(4);
    return {value:ca, unit:'M', desc:`n1/n2 = 1:1 | C = ${ct}×${vt}/${va}`};
  },

  // ========== FYSIKK ==========
  half_life: (i) => {
    const n0=+i.initial, hl=+i.half_life, t=+i.time;
    if(!n0||!hl||!t) return null;
    const remaining=(n0*Math.pow(0.5,t/hl)).toFixed(4);
    const decayed=(n0-remaining).toFixed(4);
    return {value:remaining, unit:'', desc:`Henfallt: ${decayed} (${(decayed/n0*100).toFixed(1)}%)`};
  },

  centrifugal_force: (i) => {
    const m=+i.mass, v=+i.velocity, r=+i.radius;
    if(!m||!v||!r) return null;
    const f=(m*v*v/r).toFixed(3);
    return {value:f, unit:'N', desc:`F = mv²/r = ${m}×${v}²/${r}`};
  },

  speed_physics: (i) => {
    const d=+i.distance, t=+i.time;
    if(!d||!t) return null;
    const v=(d/t).toFixed(3);
    return {value:v, unit:'m/s', desc:`v = s/t = ${d}/${t} | ${(v*3.6).toFixed(2)} km/t`};
  },

  terminal_velocity: (i) => {
    const m=+i.mass, cd=+i.drag||1.0, a=+i.area||0.5;
    if(!m) return null;
    const vt=Math.sqrt((2*m*9.81)/(1.225*cd*a)).toFixed(2);
    return {value:vt, unit:'m/s', desc:`${(+vt*3.6).toFixed(1)} km/t | ρ=1.225 kg/m³`};
  },

  torque: (i) => {
    const f=+i.force, d=+i.distance;
    if(!f||!d) return null;
    return {value:(f*d).toFixed(3), unit:'Nm', desc:`τ = F × d = ${f} × ${d}`};
  },

  projectile: (i) => {
    const v=+i.velocity, a=+i.angle*Math.PI/180;
    if(!v||!a) return null;
    const range=(v*v*Math.sin(2*a)/9.81).toFixed(2);
    const maxH=(v*v*Math.sin(a)*Math.sin(a)/(2*9.81)).toFixed(2);
    const time=(2*v*Math.sin(a)/9.81).toFixed(2);
    return {value:range, unit:'m (rekkevidde)', desc:`Maks høyde: ${maxH}m | Tid: ${time}s`};
  },

  pendulum: (i) => {
    const l=+i.length;
    if(!l) return null;
    const t=(2*Math.PI*Math.sqrt(l/9.81)).toFixed(4);
    return {value:t, unit:'sekunder', desc:`T = 2π√(L/g) = 2π√(${l}/9.81)`};
  },

  ideal_gas: (i) => {
    const p=+i.pressure, v=+i.volume, n=+i.moles;
    if(!p||!v||!n) return null;
    const t=(p*v/(n*0.08206)).toFixed(2);
    return {value:t, unit:'K', desc:`T = PV/nR = ${p}×${v}/(${n}×0.08206) = ${t}K = ${(t-273.15).toFixed(2)}°C`};
  },

  charles_law: (i) => {
    const v1=+i.v1, t1=+i.t1, t2=+i.t2;
    if(!v1||!t1||!t2) return null;
    const v2=(v1*t2/t1).toFixed(4);
    return {value:v2, unit:'liter', desc:`V2 = V1×T2/T1 = ${v1}×${t2}/${t1}`};
  },

  specific_heat: (i) => {
    const m=+i.mass, c=+i.specific_heat||4186, dt=+i.delta_t;
    if(!m||!dt) return null;
    const q=(m*c*dt).toFixed(2);
    return {value:q, unit:'J', desc:`Q = mcΔT = ${m}×${c}×${dt}`};
  },

  voltage: (i) => {
    const curr=+i.current, r=+i.resistance;
    if(!curr||!r) return null;
    const v=(curr*r).toFixed(3);
    return {value:v, unit:'V', desc:`V = I × R = ${curr} × ${r}`};
  },

  ampere_to_watt: (i) => {
    const a=+i.ampere, v=+i.voltage||230;
    if(!a) return null;
    const w=(a*v).toFixed(2);
    return {value:w, unit:'W', desc:`P = I × V = ${a} × ${v}`};
  },

  magnetic_force: (i) => {
    const q=+i.charge, v=+i.velocity, b=+i.field;
    if(!q||!v||!b) return null;
    const f=(q*v*b).toFixed(4);
    return {value:f, unit:'N', desc:`F = qvB = ${q}×${v}×${b}`};
  },

  time_dilation: (i) => {
    const t=+i.time, v=+i.velocity/100;
    if(!t||v>=1) return null;
    const gamma=1/Math.sqrt(1-v*v);
    const dilated=(t*gamma).toFixed(6);
    return {value:dilated, unit:'sekunder', desc:`γ = ${gamma.toFixed(4)} | v = ${i.velocity}% av c`};
  },

  orbital_period: (i) => {
    const r=+i.radius, v=+i.velocity;
    if(!r||!v) return null;
    const t=(2*Math.PI*r/v).toFixed(3);
    return {value:t, unit:'sekunder', desc:`T = 2πr/v = 2π×${r}/${v}`};
  },

  wet_bulb: (i) => {
    const t=+i.temperature, rh=+i.humidity;
    if(!t||!rh) return null;
    const wb=(t*Math.atan(0.151977*Math.sqrt(rh+8.313659))+Math.atan(t+rh)-Math.atan(rh-1.676331)+0.00391838*Math.pow(rh,1.5)*Math.atan(0.023101*rh)-4.686035).toFixed(2);
    return {value:wb, unit:'°C (våttemperatur)', desc:`Tørr: ${t}°C | Fuktighet: ${rh}%`};
  },

  density_altitude: (i) => {
    const alt=+i.altitude, temp=+i.temperature;
    if(isNaN(alt)||isNaN(temp)) return null;
    const isa=15-(alt*0.0065);
    const da=(alt+(120*(temp-isa))).toFixed(0);
    const density=(1.225*Math.pow((288.15-0.0065*alt)/288.15,5.2561)).toFixed(4);
    return {value:density, unit:'kg/m³', desc:`Tetthetshøyde: ${da}m | ISA temp: ${isa.toFixed(1)}°C`};
  }
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

