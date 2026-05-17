// ============================================
// KALKULATOR24 — COMPLETE CALCULATOR FORMULAS
// Fresh clean version - no syntax errors
// ============================================

const Calculators = {

  bmi: (i) => { const w=+i.weight,h=+i.height; if(!w||!h) return null; const b=(w/((h/100)**2)).toFixed(1); const c=b<18.5?'Undervektig':b<25?'Normal vekt':b<30?'Overvektig':'Fedme'; return {value:b,unit:'BMI',desc:'Kategori: '+c}; },

  calories: (i) => { const w=+i.weight,h=+i.height,a=+i.age,g=i.gender; if(!w||!h||!a) return null; const bmr=g==='Mann'?88.362+(13.397*w)+(4.799*h)-(5.677*a):447.593+(9.247*w)+(3.098*h)-(4.330*a); const mult={'Stillesittende':1.2,'Lett aktiv':1.375,'Moderat aktiv':1.55,'Veldig aktiv':1.725,'Athlete':1.9}; const t=Math.round(bmr*(mult[i.activity]||1.55)); return {value:t,unit:'kcal/dag',desc:'BMR: '+Math.round(bmr)+' kcal'}; },

  idealweight: (i) => { const h=+i.height,g=i.gender; if(!h) return null; const id=g==='Mann'?50+2.3*((h/2.54)-60):45.5+2.3*((h/2.54)-60); return {value:Math.round(id),unit:'kg',desc:'Devine-formelen'}; },

  bodyfat: (i) => { const w=+i.weight,h=+i.height; if(!w||!h) return null; const bmi=w/((h/100)**2); const bf=(1.20*bmi)+(0.23*30)-5.4; return {value:Math.abs(bf).toFixed(1),unit:'%',desc:'Estimert fettprosent'}; },

  bmr: (i) => { const w=+i.weight,h=+i.height,a=+i.age,g=i.gender; if(!w||!h||!a) return null; const b=g==='Mann'?Math.round(88.362+(13.397*w)+(4.799*h)-(5.677*a)):Math.round(447.593+(9.247*w)+(3.098*h)-(4.330*a)); return {value:b,unit:'kcal/dag',desc:'Basalmetabolisme (Mifflin-St Jeor)'}; },

  tdee: (i) => { const w=+i.weight,h=+i.height,a=+i.age; if(!w||!h||!a) return null; const bmr=88.362+(13.397*w)+(4.799*h)-(5.677*a); const mult={'Stillesittende':1.2,'Lett aktiv':1.375,'Moderat aktiv':1.55,'Veldig aktiv':1.725}; const t=Math.round(bmr*(mult[i.activity]||1.55)); return {value:t,unit:'kcal/dag',desc:'Aktivitetsfaktor: '+(mult[i.activity]||1.55)}; },

  weightloss: (i) => { const c=+i.current,t=+i.target,d=+i.deficit; if(!c||!t||!d) return null; const weeks=Math.round(((c-t)*7700)/d/7); return {value:weeks,unit:'uker',desc:(c-t)+' kg med '+d+' kcal/dag underskudd'}; },

  water: (i) => { const w=+i.weight; if(!w) return null; const mult={'Lav':30,'Moderat':35,'Høy':40}; const ml=Math.round(w*(mult[i.activity]||35)); return {value:(ml/1000).toFixed(1),unit:'liter/dag',desc:ml+' ml daglig'}; },

  heartrate: (i) => { const a=+i.age; if(!a) return null; const max=220-a; return {value:Math.round(max*0.6)+'-'+Math.round(max*0.85),unit:'slag/min',desc:'Maks puls: '+max}; },

  protein: (i) => { const w=+i.weight; if(!w) return null; const mult={'Vedlikehold':0.8,'Muskelvekst':1.8,'Vekttap':1.2}; const g=Math.round(w*(mult[i.goal]||1.0)); return {value:g,unit:'g/dag',desc:(mult[i.goal]||1.0)+'g per kg'}; },

  pregnancy: (i) => { if(!i.lmp) return null; const d=new Date(i.lmp); d.setDate(d.getDate()+280); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'Estimert termindato'}; },

  bloodpressure: (i) => { const s=+i.systolic,d=+i.diastolic; if(!s||!d) return null; const cat=s<120&&d<80?'Normal':s<130&&d<80?'Forhøyet':s<140||d<90?'Stadium 1':'Stadium 2'; return {value:s+'/'+d,unit:'mmHg',desc:'Kategori: '+cat}; },

  sleep: (i) => { if(!i.wakeup) return null; const[h,m]=i.wakeup.split(':').map(Number); const times=[]; for(let c=1;c<=5;c++){let th=h,tm=m-(90*c); while(tm<0){th--;tm+=60;} if(th<0)th+=24; times.push(String(th).padStart(2,'0')+':'+String(tm).padStart(2,'0'));} return {value:times[1],unit:'',desc:'Søvnvinduer: '+times.join(', ')}; },

  bloodsugar: (i) => { const s=+i.sugar; if(!s) return null; const cat=s<4?'For lavt':s<=5.6?'Normalt':s<=6.9?'Forhøyet':'For høyt'; return {value:s,unit:'mmol/L',desc:'Status: '+cat}; },

  alcohol: (i) => { const w=+i.weight,u=+i.units,h=+i.hours; if(!w||!u) return null; const r=i.gender==='Mann'?0.68:0.55; const bac=((u*10)/(w*1000*r))-(0.015*(h||0)); return {value:Math.max(0,bac*1000).toFixed(2),unit:'promille',desc:bac>0.8?'Over grensen!':bac>0.2?'Påvirket':'Under grensen'}; },

  steps: (i) => { const s=+i.steps; if(!s) return null; const km=(s*0.762/1000).toFixed(2); const cal=Math.round(s*0.04); return {value:km,unit:'km',desc:'Kalorier: '+cal+' kcal'}; },

  pregnancy_week: (i) => { if(!i.lmp) return null; const d=new Date(i.lmp),t=new Date(); const weeks=Math.floor((t-d)/604800000); return {value:weeks,unit:'uker gravid',desc:'Termin om '+(40-weeks)+' uker'}; },

  waist_hip: (i) => { const w=+i.waist,h=+i.hip; if(!w||!h) return null; const r=(w/h).toFixed(2); return {value:r,unit:'ratio',desc:'WHR ratio'}; },

  loan: (i) => { const P=+i.amount,r=+i.rate/100/12,n=+i.years*12; if(!P||!r||!n) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:'Totalt: '+(m*n).toLocaleString('nb-NO')+' kr'}; },

  mortgage: (i) => { const P=(+i.price)-(+i.equity||0),r=+i.rate/100/12,n=+i.years*12; if(!P||!r||!n||P<0) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:'Lån: '+P.toLocaleString('nb-NO')+' kr'}; },

  interest: (i) => { const p=+i.principal,r=+i.rate/100,n=+i.years; if(!p||!r||!n) return null; const t=Math.round(p*Math.pow(1+r,n)); return {value:t.toLocaleString('nb-NO'),unit:'kr',desc:'Renter: '+(t-p).toLocaleString('nb-NO')+' kr'}; },

  savings: (i) => { const P=+i.initial,pmt=+i.monthly,r=+i.rate/100/12,n=+i.years*12; if(!r||!n) return null; const f=Math.round(P*Math.pow(1+r,n)+pmt*(Math.pow(1+r,n)-1)/r); return {value:f.toLocaleString('nb-NO'),unit:'kr',desc:'Etter '+i.years+' år'}; },

  vat: (i) => { const a=+i.amount,r=+i.rate; if(!a||!r) return null; const v=(a*r/100); return {value:Math.round(a+v).toLocaleString('nb-NO'),unit:'kr',desc:'MVA: '+Math.round(v).toLocaleString('nb-NO')+' kr'}; },

  hourly: (i) => { const a=+i.annual,h=+i.hours; if(!a||!h) return null; return {value:Math.round(a/(h*52)).toLocaleString('nb-NO'),unit:'kr/time',desc:'Basert på '+h+' t/uke'}; },

  tax: (i) => { const inc=+i.income; if(!inc) return null; const tax=Math.round(inc*0.22); return {value:tax.toLocaleString('nb-NO'),unit:'kr skatt',desc:'Netto: '+(inc-tax).toLocaleString('nb-NO')+' kr'}; },

  investment: (i) => { const a=+i.amount,r=+i.rate/100,n=+i.years; if(!a||!r||!n) return null; const f=Math.round(a*Math.pow(1+r,n)); return {value:f.toLocaleString('nb-NO'),unit:'kr',desc:'Gevinst: '+(f-a).toLocaleString('nb-NO')+' kr'}; },

  currency: (i) => { const rates={'NOK':1,'USD':0.094,'EUR':0.087,'GBP':0.074,'SEK':0.97,'DKK':0.65}; const a=+i.amount; if(!a) return null; const nok=a/(rates[i.from]||1); const res=(nok*(rates[i.to]||0.087)).toFixed(2); return {value:res,unit:i.to||'EUR',desc:a+' '+i.from+' = '+res+' '+i.to}; },

  pension: (i) => { const a=+i.age,s=+i.salary,sv=+i.savings; if(!a||!s) return null; const yrs=67-a; const future=Math.round((sv||0)*Math.pow(1.05,yrs)+(s*0.02*yrs*12)); return {value:Math.round(future/12).toLocaleString('nb-NO'),unit:'kr/mnd',desc:'Estimert pensjon ved 67 år'}; },

  net_salary: (i) => { const g=+i.gross||+i.salary; if(!g) return null; const tax=g*0.33; return {value:Math.round(g-tax).toLocaleString('nb-NO'),unit:'kr/mnd',desc:'Skatt: '+Math.round(tax).toLocaleString('nb-NO')+' kr'}; },

  holiday_pay: (i) => { const s=+i.salary||+i.annual; if(!s) return null; return {value:Math.round(s*0.102).toLocaleString('nb-NO'),unit:'kr',desc:'10.2% av årslønn'}; },

  tip: (i) => { const a=+i.amount,p=+i.percent||10; if(!a) return null; const tip=Math.round(a*p/100); return {value:tip.toLocaleString('nb-NO'),unit:'kr',desc:'Total: '+(a+tip).toLocaleString('nb-NO')+' kr'}; },

  discount: (i) => { const p=+i.price,d=+i.discount||+i.percent; if(!p||!d) return null; const save=Math.round(p*d/100); return {value:(p-save).toLocaleString('nb-NO'),unit:'kr',desc:'Spart: '+save.toLocaleString('nb-NO')+' kr'}; },

  roi: (i) => { const inv=+i.investment||+i.amount,ret=+i.returns||+i.revenue; if(!inv||!ret) return null; const r=((ret-inv)/inv*100).toFixed(1); return {value:r,unit:'%',desc:'Gevinst: '+(ret-inv).toLocaleString('nb-NO')+' kr'}; },

  stock: (i) => { const b=+i.buy_price||+i.buy,s=+i.sell_price||+i.sell,sh=+i.shares||1; if(!b||!s) return null; const profit=Math.round((s-b)*sh); const pct=((s-b)/b*100).toFixed(1); return {value:profit.toLocaleString('nb-NO'),unit:'kr',desc:pct+'% avkastning'}; },

  percent: (i) => { const v=+i.value,p=+i.percent; if(isNaN(v)||isNaN(p)) return null; const r=(v*p/100).toFixed(2); return {value:r,unit:'',desc:p+'% av '+v+' = '+r}; },

  sqrt: (i) => { const n=+i.number; if(isNaN(n)||n<0) return null; return {value:Math.sqrt(n).toFixed(6).replace(/\.?0+$/,''),unit:'',desc:'√'+n}; },

  power: (i) => { const b=+i.base,e=+i.exponent||+i.exp; if(isNaN(b)||isNaN(e)) return null; return {value:Math.pow(b,e).toLocaleString('nb-NO'),unit:'',desc:b+'^'+e}; },

  fraction: (i) => { const n1=+i.num1,d1=+i.den1,n2=+i.num2,d2=+i.den2; if(!d1||!d2) return null; const rn=n1*d2+n2*d1,rd=d1*d2; const g=(a,b)=>b?g(b,a%b):a; const gc=g(Math.abs(rn),Math.abs(rd)); return {value:(rn/gc)+'/'+(rd/gc),unit:'',desc:n1+'/'+d1+' + '+n2+'/'+d2}; },

  average: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(!nums.length) return null; return {value:(nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(2),unit:'',desc:nums.length+' tall'}; },

  log: (i) => { const n=+i.number,b=+i.base||10; if(!n||n<=0) return null; return {value:(Math.log(n)/Math.log(b)).toFixed(6).replace(/\.?0+$/,''),unit:'',desc:'log_'+b+'('+n+')'}; },

  factorial: (i) => { const n=+i.number||+i.n; if(isNaN(n)||n<0||n>20) return null; let f=1; for(let j=2;j<=n;j++) f*=j; return {value:f.toLocaleString('nb-NO'),unit:'',desc:n+'!'}; },

  prime: (i) => { const n=+i.number; if(!n||n<2) return null; let isPrime=true; for(let j=2;j<=Math.sqrt(n);j++) if(n%j===0){isPrime=false;break;} return {value:isPrime?'Primtall':'Ikke primtall',unit:'',desc:n+(isPrime?' er ':' er ikke ')+'et primtall'}; },

  gcd_calc: (i) => { const a=+i.num1||+i.a,b=+i.num2||+i.b; if(!a||!b) return null; const g=(a,b)=>b?g(b,a%b):a; return {value:g(Math.abs(a),Math.abs(b)),unit:'',desc:'GCD av '+a+' og '+b}; },

  lcm_calc: (i) => { const a=+i.num1||+i.a,b=+i.num2||+i.b; if(!a||!b) return null; const g=(a,b)=>b?g(b,a%b):a; return {value:Math.abs(a*b)/g(Math.abs(a),Math.abs(b)),unit:'',desc:'LCM av '+a+' og '+b}; },

  binary: (i) => { const n=+i.number; if(isNaN(n)) return null; return {value:Math.abs(Math.round(n)).toString(2),unit:'(binær)',desc:'Desimal: '+Math.round(n)}; },

  hex: (i) => { const n=+i.number; if(isNaN(n)) return null; return {value:Math.abs(Math.round(n)).toString(16).toUpperCase(),unit:'(hex)',desc:'Desimal: '+Math.round(n)}; },

  temperature: (i) => { const v=+i.value||+i.celsius; if(isNaN(v)) return null; const f=(v*9/5+32).toFixed(1); const k=(v+273.15).toFixed(1); return {value:v,unit:'°C',desc:'°F: '+f+' | K: '+k}; },

  celsius_to_fahrenheit: (i) => { const c=+i.celsius||+i.value; if(isNaN(c)) return null; return {value:(c*9/5+32).toFixed(1),unit:'°F',desc:c+'°C = '+(c*9/5+32).toFixed(1)+'°F'}; },

  fahrenheit_to_celsius: (i) => { const f=+i.fahrenheit||+i.value; if(isNaN(f)) return null; return {value:((f-32)*5/9).toFixed(1),unit:'°C',desc:f+'°F = '+((f-32)*5/9).toFixed(1)+'°C'}; },

  km_to_miles: (i) => { const k=+i.km||+i.value; if(!k) return null; return {value:(k*0.621371).toFixed(3),unit:'miles',desc:k+' km'}; },

  miles_to_km: (i) => { const m=+i.miles||+i.value; if(!m) return null; return {value:(m/0.621371).toFixed(3),unit:'km',desc:m+' miles'}; },

  kg_to_lbs: (i) => { const k=+i.kg||+i.value; if(!k) return null; return {value:(k*2.20462).toFixed(2),unit:'pund',desc:k+' kg'}; },

  lbs_to_kg: (i) => { const l=+i.lbs||+i.value; if(!l) return null; return {value:(l/2.20462).toFixed(2),unit:'kg',desc:l+' pund'}; },

  meter_to_feet: (i) => { const m=+i.meter||+i.value; if(!m) return null; return {value:(m*3.28084).toFixed(3),unit:'fot',desc:m+' m'}; },

  cm_to_inches: (i) => { const c=+i.cm||+i.value; if(!c) return null; return {value:(c/2.54).toFixed(2),unit:'tommer',desc:c+' cm'}; },

  liter_to_gallon: (i) => { const l=+i.liter||+i.value; if(!l) return null; return {value:(l*0.264172).toFixed(4),unit:'gallon',desc:l+' L'}; },

  ml_to_tsp: (i) => { const m=+i.ml||+i.value; if(!m) return null; return {value:(m/4.929).toFixed(2),unit:'teskje',desc:m+' ml'}; },

  area: (i) => { const l=+i.length,w=+i.width; if(!l||!w) return null; return {value:(l*w).toFixed(2),unit:'m²',desc:l+'×'+w+' m'}; },

  circle: (i) => { const r=+i.radius; if(!r) return null; return {value:(Math.PI*r*r).toFixed(2),unit:'m²',desc:'Omkrets: '+(2*Math.PI*r).toFixed(2)+' m'}; },

  triangle: (i) => { const b=+i.base,h=+i.height; if(!b||!h) return null; return {value:(0.5*b*h).toFixed(2),unit:'m²',desc:'½×'+b+'×'+h}; },

  pythagoras: (i) => { const a=+i.a,b=+i.b; if(!a||!b) return null; return {value:Math.sqrt(a*a+b*b).toFixed(4),unit:'',desc:'√('+a+'²+'+b+'²)'}; },

  volume: (i) => { const l=+i.length,w=+i.width,h=+i.height; if(!l||!w||!h) return null; return {value:(l*w*h).toFixed(2),unit:'m³',desc:l+'×'+w+'×'+h}; },

  sphere: (i) => { const r=+i.radius; if(!r) return null; return {value:(4/3*Math.PI*r**3).toFixed(2),unit:'m³',desc:'Overflate: '+(4*Math.PI*r**2).toFixed(2)+' m²'}; },

  cone: (i) => { const r=+i.radius,h=+i.height; if(!r||!h) return null; const l=Math.sqrt(r*r+h*h); return {value:(Math.PI*r*r*h/3).toFixed(2),unit:'m³',desc:'Overflate: '+(Math.PI*r*(r+l)).toFixed(2)+' m²'}; },

  cylinder: (i) => { const r=+i.radius,h=+i.height; if(!r||!h) return null; return {value:(Math.PI*r*r*h).toFixed(2),unit:'m³',desc:'Overflate: '+(2*Math.PI*r*(r+h)).toFixed(2)+' m²'}; },

  trapezoid: (i) => { const a=+i.a,b=+i.b,h=+i.height; if(!a||!b||!h) return null; return {value:((a+b)*h/2).toFixed(2),unit:'m²',desc:'('+a+'+'+b+')/2 × '+h}; },

  ellipse: (i) => { const a=+i.a,b=+i.b; if(!a||!b) return null; return {value:(Math.PI*a*b).toFixed(2),unit:'m²',desc:'π × '+a+' × '+b}; },

  age: (i) => { if(!i.birthdate) return null; const b=new Date(i.birthdate),t=new Date(); let y=t.getFullYear()-b.getFullYear(); if(t.getMonth()<b.getMonth()||(t.getMonth()===b.getMonth()&&t.getDate()<b.getDate()))y--; const days=Math.floor((t-b)/86400000); return {value:y,unit:'år',desc:days.toLocaleString('nb-NO')+' dager levd'}; },

  date_add: (i) => { if(!i.startdate||!i.days) return null; const d=new Date(i.startdate); d.setDate(d.getDate()+parseInt(i.days)); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'+'+i.days+' dager'}; },

  time_diff: (i) => { if(!i.start||!i.end) return null; const[sh,sm]=i.start.split(':').map(Number); const[eh,em]=i.end.split(':').map(Number); let mins=(eh*60+em)-(sh*60+sm); if(mins<0)mins+=1440; return {value:Math.floor(mins/60)+'t '+mins%60+'min',unit:'',desc:'Fra '+i.start+' til '+i.end}; },

  countdown: (i) => { if(!i.targetdate) return null; const t=new Date(i.targetdate),n=new Date(); const d=Math.ceil((t-n)/86400000); return {value:d>0?d:0,unit:'dager igjen',desc:t.toLocaleDateString('nb-NO')}; },

  speed: (i) => { const d=+i.distance,t=+i.time; if(!d||!t) return null; return {value:(d/t).toFixed(2),unit:'km/t',desc:d+' km på '+t+' timer'}; },

  energy: (i) => { const m=+i.mass,v=+i.velocity; if(!m||!v) return null; return {value:(0.5*m*v*v).toFixed(2),unit:'J',desc:'½×'+m+'×'+v+'²'}; },

  force: (i) => { const m=+i.mass,a=+i.acceleration; if(!m||!a) return null; return {value:(m*a).toFixed(2),unit:'N',desc:m+'kg × '+a+'m/s²'}; },

  ohm: (i) => { const v=+i.voltage||+i.v,r=+i.resistance||+i.r; if(!v||!r) return null; return {value:(v/r).toFixed(4),unit:'A',desc:'I = '+v+'V / '+r+'Ω'}; },

  wave: (i) => { const f=+i.frequency||+i.freq; if(!f) return null; return {value:(299792458/f).toFixed(2),unit:'m',desc:'c / f = 299792458 / '+f}; },

  pressure: (i) => { const f=+i.force,a=+i.area; if(!f||!a) return null; return {value:(f/a).toFixed(4),unit:'Pa',desc:'F/A = '+f+'/'+a}; },

  stddev: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(nums.length<2) return null; const avg=nums.reduce((a,b)=>a+b,0)/nums.length; return {value:Math.sqrt(nums.reduce((a,b)=>a+(b-avg)**2,0)/nums.length).toFixed(4),unit:'',desc:'Gjennomsnitt: '+avg.toFixed(2)}; },

  median: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)).sort((a,b)=>a-b); if(!nums.length) return null; const m=nums.length%2===0?(nums[nums.length/2-1]+nums[nums.length/2])/2:nums[Math.floor(nums.length/2)]; return {value:m,unit:'',desc:nums.length+' tall sortert'}; },

  food_calories: (i) => { const cal={'Eple (100g)':52,'Banan (100g)':89,'Kylling (100g)':165,'Laks (100g)':208,'Brød (100g)':265,'Ris (100g)':130,'Pasta (100g)':158,'Egg (1 stk)':78}; const base=cal[i.food]||100; const a=+i.amount||100; return {value:Math.round(base*(a/100)),unit:'kcal',desc:(i.food||'Mat')+' ('+a+'g)'}; },

  concrete: (i) => { const l=+i.length,w=+i.width,d=+i.depth||+i.height; if(!l||!w||!d) return null; return {value:(l*w*d).toFixed(2),unit:'m³',desc:l+'×'+w+'×'+d+' m'}; },

  paint: (i) => { const a=+i.area,c=+i.coats||1; if(!a) return null; return {value:Math.ceil(a*c/10),unit:'liter',desc:a+' m² med '+c+' strøk'}; },

  recipe: (i) => { const s=+i.servings,o=+i.original||4,a=+i.amount; if(!s||!a) return null; return {value:(a*s/o).toFixed(2),unit:'',desc:o+' → '+s+' porsjoner'}; },

  molality: (i) => { const mol=+i.moles,solvent=+i.solvent; if(!mol||!solvent) return null; return {value:(mol/solvent).toFixed(4),unit:'mol/kg',desc:mol+' mol / '+solvent+' kg'}; },

  concentration: (i) => { const mol=+i.moles,vol=+i.volume; if(!mol||!vol) return null; return {value:(mol/vol).toFixed(4),unit:'M (mol/L)',desc:mol+' mol / '+vol+' L'}; },

  ph_calc: (i) => { const h=+i.h_conc; if(!h||h<=0) return null; const ph=(-Math.log10(h)).toFixed(2); return {value:ph,unit:'pH',desc:'[H+] = '+h+' M | '+(+ph<7?'Sur':'Basisk')}; },

  molecular_weight: (i) => { const c=+i.carbon||0,h=+i.hydrogen||0,o=+i.oxygen||0; return {value:(c*12.011+h*1.008+o*15.999).toFixed(3),unit:'g/mol',desc:'C'+c+'H'+h+'O'+o}; },

  molarity: (i) => { const mol=+i.moles,vol=+i.volume; if(!mol||!vol) return null; return {value:(mol/vol).toFixed(4),unit:'M',desc:mol+' mol / '+vol+' L'}; },

  mol_calc: (i) => { const g=+i.grams,mm=+i.molar_mass; if(!g||!mm) return null; return {value:(g/mm).toFixed(4),unit:'mol',desc:g+'g / '+mm+'g/mol'}; },

  gram_to_mol: (i) => { const g=+i.grams,mm=+i.molar_mass; if(!g||!mm) return null; return {value:(g/mm).toFixed(4),unit:'mol',desc:g+'g ÷ '+mm+'g/mol'}; },

  percent_yield: (i) => { const actual=+i.actual,theoretical=+i.theoretical; if(!actual||!theoretical) return null; return {value:(actual/theoretical*100).toFixed(2),unit:'%',desc:actual+'g / '+theoretical+'g × 100'}; },

  half_life: (i) => { const n0=+i.initial,hl=+i.half_life,t=+i.time; if(!n0||!hl||!t) return null; const remaining=(n0*Math.pow(0.5,t/hl)).toFixed(4); return {value:remaining,unit:'',desc:'Henfallt: '+(n0-remaining).toFixed(4)}; },

  population_growth: (i) => { const p=+i.population,r=+i.growth_rate/100,n=+i.years; if(!p||!r||!n) return null; const future=Math.round(p*Math.pow(1+r,n)); return {value:future.toLocaleString('nb-NO'),unit:'personer',desc:'Økning: '+(future-p).toLocaleString('nb-NO')}; },

  dog_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+63); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'63 dager'}; },

  cat_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+65); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'65 dager'}; },

  sheep_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+147); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'147 dager'}; },

  goat_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+150); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'150 dager'}; },

  cow_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+283); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'283 dager'}; },

  horse_pregnancy: (i) => { if(!i.mating_date) return null; const d=new Date(i.mating_date); d.setDate(d.getDate()+340); return {value:d.toLocaleDateString('nb-NO'),unit:'',desc:'340 dager'}; },

  dog_age: (i) => { const a=+i.dog_age; if(!a) return null; const human=Math.round(a<=1?15:a<=2?24:24+(a-2)*5); return {value:human,unit:'menneskeår',desc:a+' hundeår'}; },

  cat_age: (i) => { const a=+i.cat_age; if(!a) return null; const human=a<=1?15:a<=2?24:Math.round(24+(a-2)*4); return {value:human,unit:'menneskeår',desc:a+' katteår'}; },

  chocolate_toxicity_dog: (i) => { const w=+i.weight,c=+i.chocolate; if(!w||!c) return null; const toxicity={'Melkesjokolade':44,'Mørk sjokolade':154,'Bakesjokolade':396,'Hvit sjokolade':0}; const theo=(toxicity[i.type]||44)*c/100; const per_kg=theo/w; return {value:theo.toFixed(1),unit:'mg teobromin',desc:per_kg.toFixed(1)+' mg/kg | '+(per_kg<20?'Minimal risiko':'Kontakt veterinær!')}; },

  dog_food: (i) => { const w=+i.weight; if(!w) return null; const multi={'Valp (under 1 år)':2,'Voksen (1-7 år)':1,'Senior (over 7 år)':0.8}; return {value:Math.round(w*0.02*(multi[i.age]||1)*1000),unit:'gram/dag',desc:'For '+w+' kg hund'}; },

  cat_calories: (i) => { const w=+i.weight; if(!w) return null; const rer=70*Math.pow(w,0.75); return {value:Math.round(rer*1.2),unit:'kcal/dag',desc:'RER: '+Math.round(rer)+' kcal'}; },

  kelly_criterion: (i) => { const p=+i.win_probability,b=+i.odds-1,bankroll=+i.bankroll; if(!p||!b||!bankroll) return null; const kelly=(b*p-(1-p))/b; const bet=kelly>0?Math.round(bankroll*kelly):0; return {value:bet.toLocaleString('nb-NO'),unit:'kr',desc:'Kelly: '+(kelly*100).toFixed(2)+'%'}; },

  poker_odds: (i) => { const outs=+i.outs,remaining=+i.cards_remaining||47; if(!outs) return null; return {value:(outs/remaining*100).toFixed(1),unit:'% equity',desc:outs+' outs av '+remaining+' kort'}; },

  odds_calc: (i) => { const odds=+i.decimal_odds,stake=+i.stake; if(!odds||!stake) return null; const payout=(stake*odds).toFixed(2); return {value:payout,unit:'kr',desc:'Fortjeneste: '+(+payout-stake).toFixed(2)+' kr'}; },

  parlay_calc: (i) => { const stake=+i.bet_amount; if(!stake) return null; const odds=[+i.odds1,+i.odds2,+i.odds3,+i.odds4].filter(o=>o>1); const combined=odds.reduce((a,b)=>a*b,1); const payout=(stake*combined).toFixed(2); return {value:payout,unit:'kr',desc:'Kombinert odds: '+combined.toFixed(2)}; },

  expected_value: (i) => { const win=+i.win_amount,wp=+i.win_probability/100,lose=+i.lose_amount; if(isNaN(win)||isNaN(wp)) return null; const ev=(win*wp)-(lose*(1-wp)); return {value:ev.toFixed(2),unit:'kr (EV)',desc:ev>0?'Positiv EV':'Negativ EV'}; },

  poisson_calc: (i) => { const lambda=+i.lambda,k=+i.k; if(!lambda||isNaN(k)) return null; const factorial=(n)=>{let f=1;for(let i=2;i<=n;i++)f*=i;return f;}; const prob=(Math.pow(lambda,k)*Math.exp(-lambda)/factorial(Math.round(k))*100).toFixed(4); return {value:prob,unit:'%',desc:'P(X='+k+') med λ='+lambda}; },

  football_odds: (i) => { const h=+i.home_odds,d=+i.draw_odds,a=+i.away_odds; if(!h||!d||!a) return null; const margin=((1/h+1/d+1/a-1)*100).toFixed(2); return {value:margin,unit:'% margin',desc:'Hjem: '+(1/h*100).toFixed(1)+'% | Borte: '+(1/a*100).toFixed(1)+'%'}; },

  roulette_odds: (i) => { const payouts={'Enkelt tall':35,'Rød/Sort':1,'Odde/Jevn':1,'Dusin':2,'Kolonne':2}; const payout=payouts[i.bet_type]||1; const stake=+i.stake||100; return {value:(stake*payout).toFixed(2),unit:'kr gevinst',desc:'House edge: 2.7%'}; },

  blackjack_strategy: (i) => { const s={'8':{'2':'H','3':'H','4':'H','5':'H','6':'H','7':'H','8':'H','9':'H','10':'H','A':'H'},'9':{'2':'H','3':'D','4':'D','5':'D','6':'D','7':'H','8':'H','9':'H','10':'H','A':'H'},'10':{'2':'D','3':'D','4':'D','5':'D','6':'D','7':'D','8':'D','9':'D','10':'H','A':'H'},'11':{'2':'D','3':'D','4':'D','5':'D','6':'D','7':'D','8':'D','9':'D','10':'D','A':'D'},'12':{'2':'H','3':'H','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'13':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'16':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'H','8':'H','9':'H','10':'H','A':'H'},'17':{'2':'S','3':'S','4':'S','5':'S','6':'S','7':'S','8':'S','9':'S','10':'S','A':'S'}}; const t={'H':'Trekk (Hit)','S':'Stå (Stand)','D':'Doble ned','SP':'Del (Split)'}; const action=s[i.player_hand]?.[i.dealer_card]||'H'; return {value:t[action]||action,unit:'',desc:'Hånd: '+i.player_hand+' mot: '+i.dealer_card}; },

  sleep_calc: (i) => { if(!i.wakeup_time) return null; const[h,m]=i.wakeup_time.split(':').map(Number); const cycles=+i.cycles||6; const totalMins=cycles*90+14; let bh=h,bm=m-totalMins; while(bm<0){bh--;bm+=60;} if(bh<0)bh+=24; return {value:String(bh).padStart(2,'0')+':'+String(bm).padStart(2,'0'),unit:'(leggetid)',desc:cycles+' sykluser × 90 min'}; },

  ev_savings: (i) => { const km=+i.km_per_year,fp=+i.fuel_price,ep=+i.electricity_price,fc=+i.fuel_consumption||7,ec=+i.ev_consumption||18; if(!km) return null; const fuel_cost=km/100*fc*fp; const ev_cost=km/100*ec*ep; return {value:Math.round(fuel_cost-ev_cost).toLocaleString('nb-NO'),unit:'kr/år spart',desc:'Bensin: '+Math.round(fuel_cost).toLocaleString('nb-NO')+'kr | Strøm: '+Math.round(ev_cost).toLocaleString('nb-NO')+'kr'}; },

  carbon_footprint: (i) => { const car=+i.car_km||0,fly=+i.flights||0,meat=+i.meat_kg||0,elec=+i.electricity_kwh||0; const total=(car*0.21/1000+fly*0.255+meat*52*6.61/1000+elec*12*0.017/1000).toFixed(2); return {value:total,unit:'tonn CO2/år',desc:(+total/2.5).toFixed(1)+' jordkloder'}; },

  fuel_cost: (i) => { const dist=+i.distance,cons=+i.consumption,price=+i.fuel_price; if(!dist||!cons||!price) return null; const liters=(dist/100*cons).toFixed(2); return {value:(+liters*price).toFixed(2),unit:'kr',desc:liters+' liter × '+price+' kr/L'}; },

  solar_calc: (i) => { const area=+i.roof_area,sun=+i.sunhours||4,price=+i.electricity_price||1.5; if(!area) return null; const kwh=Math.round(area*0.7*0.2*sun*365); return {value:kwh.toLocaleString('nb-NO'),unit:'kWh/år',desc:'Besparelse: '+Math.round(kwh*price).toLocaleString('nb-NO')+' kr/år'}; },

  aquarium_calc: (i) => { const l=+i.length,w=+i.width,h=+i.height,fish=+i.fish_size||5; if(!l||!w||!h) return null; const liters=(l*w*h/1000).toFixed(1); return {value:liters,unit:'liter',desc:'Maks ~'+Math.floor(+liters/fish)+' fisk'}; },

  vpd_calc: (i) => { const t=+i.temperature,rh=+i.humidity; if(isNaN(t)||!rh) return null; const svp=0.6108*Math.exp(17.27*t/(t+237.3)); const vpd=(svp*(1-rh/100)).toFixed(3); return {value:vpd,unit:'kPa (VPD)',desc:+vpd<0.4?'For lavt':+vpd<1.2?'Bra':'For høyt'}; },

  tile_calc: (i) => { const rl=+i.room_length,rw=+i.room_width,tl=+i.tile_length/100,tw=+i.tile_width/100,waste=+i.waste||10; if(!rl||!rw||!tl||!tw) return null; return {value:Math.ceil(rl*rw/(tl*tw)*(1+waste/100)),unit:'fliser',desc:rl*rw+' m² + '+waste+'% svinn'}; },

  concrete_calc: (i) => { const l=+i.length,w=+i.width,d=+i.depth; if(!l||!w||!d) return null; const vol=(l*w*d).toFixed(3); return {value:vol,unit:'m³',desc:Math.ceil(+vol/0.045)+' sekker (25kg)'}; },

  paint_calc: (i) => { const area=+i.area,coats=+i.coats||2,coverage=+i.coverage||10; if(!area) return null; const liters=(area*coats/coverage).toFixed(2); return {value:liters,unit:'liter',desc:Math.ceil(+liters/2.5)+' bokser (2.5L)'}; },

  floor_calc: (i) => { const l=+i.length,w=+i.width,waste=+i.waste||10,price=+i.price_per_m2||0; if(!l||!w) return null; const total=(l*w*(1+waste/100)).toFixed(2); return {value:total,unit:'m²',desc:price?(+total*price).toFixed(0)+' kr':''+l+'×'+w+' m²'}; },

  btu_calc: (i) => { const area=+i.area,height=+i.ceiling||2.4; if(!area) return null; const btu=Math.round(area*10.76*height/2.4); return {value:btu.toLocaleString('nb-NO'),unit:'BTU',desc:(btu/3412).toFixed(2)+' kW'}; },

  stair_calc: (i) => { const total=+i.total_height,step_h=+i.step_height||18; if(!total) return null; const steps=Math.round(total/step_h); return {value:steps,unit:'trinn',desc:'Trinnhøyde: '+(total/steps).toFixed(1)+'cm'}; },

  pool_calc: (i) => { const l=+i.length,w=+i.width,d=+i.depth; if(!l||!w||!d) return null; const vol=(l*w*d).toFixed(1); return {value:vol,unit:'m³ ('+Math.round(+vol*1000)+' liter)',desc:'Klor: ~'+(+vol*0.002).toFixed(2)+'kg'}; },

  chord_progression: (i) => { const key=i.key||'C'; const major={'C':['C','Dm','Em','F','G','Am','Bdim'],'G':['G','Am','Bm','C','D','Em','F#dim'],'D':['D','Em','F#m','G','A','Bm','C#dim'],'A':['A','Bm','C#m','D','E','F#m','G#dim'],'E':['E','F#m','G#m','A','B','C#m','D#dim'],'F':['F','Gm','Am','Bb','C','Dm','Edim']}; const chords=major[key]||major['C']; const prog_map={'I-IV-V-I':[0,3,4,0],'I-V-vi-IV':[0,4,5,3],'ii-V-I':[1,4,0]}; const indices=prog_map[i.progression]||[0,3,4,0]; return {value:indices.map(i=>chords[i]).join(' - '),unit:'',desc:'Toneart: '+key}; },

  delay_reverb: (i) => { const bpm=+i.bpm; if(!bpm) return null; const beat=60000/bpm; const mult={'Kvartnote':1,'Åttendedelsnote':0.5,'Halvnote':2}; const delay=(beat*(mult[i.note_value]||1)).toFixed(1); return {value:delay,unit:'ms (delay)',desc:'1 slag = '+beat.toFixed(1)+'ms'}; },

  band_calc: (i) => { const fee=+i.gig_fee,members=+i.members||4,expenses=+i.expenses||0; if(!fee) return null; return {value:Math.round((fee-expenses)/members).toLocaleString('nb-NO'),unit:'kr per person',desc:'Netto: '+(fee-expenses).toLocaleString('nb-NO')+' kr'}; },

  robux_tax: (i) => { const r=+i.robux_amount; if(!r) return null; const rate={'Kjøp':0,'Salg':0.30,'GamePass':0.30,'Klær':0.30}[i.transaction_type]||0.30; const after=Math.floor(r*(1-rate)); return {value:after.toLocaleString('nb-NO'),unit:'Robux',desc:'Avgift: '+(r-after).toLocaleString('nb-NO')+' Robux'}; },

  pokemon_calc: (i) => { const base=+i.base_stat,iv=+i.iv||0,ev=+i.ev||0,lvl=+i.level||50; if(!base) return null; const n={'Nøytral':1.0,'Positiv':1.1,'Negativ':0.9}[i.nature]||1.0; return {value:Math.floor(((2*base+iv+Math.floor(ev/4))*lvl/100+5)*n),unit:'(stat)',desc:'Base:'+base+' IV:'+iv+' EV:'+ev}; },

  dice_roll: (i) => { const n=+i.dice_count||1,s=+i.dice_sides||6; let total=0; const rolls=[]; for(let j=0;j<n;j++){const r=Math.floor(Math.random()*s)+1;rolls.push(r);total+=r;} return {value:total,unit:'('+n+'d'+s+')',desc:'Kast: '+rolls.join(', ')}; },

  love_calc: (i) => { if(!i.name1||!i.name2) return null; const combined=(i.name1+i.name2).toLowerCase(); let hash=0; for(let c of combined) hash=(hash*31+c.charCodeAt(0))%100; const score=Math.abs(hash)%100; return {value:score,unit:'% kjærlighet',desc:score>80?'Perfekt match!':score>60?'Bra kompatibilitet':'Kanskje venner?'}; },

  numerology: (i) => { if(!i.birthdate) return null; const digits=i.birthdate.replace(/-/g,'').split('').map(Number); let sum=digits.reduce((a,b)=>a+b,0); while(sum>9&&sum!==11&&sum!==22) sum=String(sum).split('').map(Number).reduce((a,b)=>a+b,0); return {value:sum,unit:'(livstall)',desc:'Numerologi livstallsverdi'}; },

  angel_number: (i) => { const n=String(i.number||'').replace(/\D/g,''); if(!n) return null; const meanings={'111':'Nye begynnelser','222':'Balanse','333':'Vekst','444':'Stabilitet','555':'Forandring','666':'Åndelig vekst','777':'Lykke','888':'Overflod','999':'Transformasjon','1111':'Portal åpner seg'}; return {value:n,unit:'(engelnummer)',desc:meanings[n]||'Se individuelle siffer'}; },

  imperial_to_metric: (i) => { const v=+i.value; if(!v) return null; const from=i.from||'miles'; const conversions={'miles':[v*1.60934,'km'],'feet':[v*0.3048,'m'],'inches':[v*2.54,'cm'],'pounds':[v*0.453592,'kg'],'gallons':[v*3.78541,'liter'],'fahrenheit':[(v-32)*5/9,'°C']}; const result=conversions[from]; return result?{value:result[0].toFixed(4),unit:result[1],desc:v+' '+from}:{value:v,unit:'',desc:'Ukjent enhet'}; },

  hours_to_days: (i) => { const h=+i.hours; if(!h) return null; return {value:(h/24).toFixed(4),unit:'dager',desc:h+' timer = '+(h/168).toFixed(4)+' uker'}; },

  psi_to_bar: (i) => { const p=+i.psi; if(!p) return null; return {value:(p*0.0689476).toFixed(4),unit:'bar',desc:p+' PSI'}; },

  celsius_to_kelvin: (i) => { const c=+i.celsius; if(isNaN(c)) return null; return {value:(c+273.15).toFixed(2),unit:'K',desc:c+'°C'}; },

  days_to_hours: (i) => { const d=+i.days; if(!d) return null; return {value:(d*24).toFixed(0),unit:'timer',desc:d+' dager = '+(d*1440)+' min'}; },

  density_calc: (i) => { const m=+i.mass,v=+i.volume; if(!m||!v) return null; return {value:(m/v).toFixed(6),unit:'g/ml',desc:'ρ = m/V'}; },

  speed_converter: (i) => { const v=+i.value; if(!v) return null; const toMs={'km/t':1/3.6,'m/s':1,'mph':0.44704,'knop':0.514444}; const ms=v*(toMs[i.from_unit]||1); const result=ms/(toMs[i.to_unit]||1); return {value:result.toFixed(4),unit:i.to_unit,desc:v+' '+i.from_unit}; },

  moon_phase: (i) => { if(!i.date) return null; const d=new Date(i.date); const known=new Date('2000-01-06'); const cycle=((d-known)/(1000*60*60*24))%29.53059; let phase=cycle<1.85?'Nymåne':cycle<7.38?'Tiltagende halvmåne':cycle<14.77?'Halvmåne':cycle<16.61?'Fullmåne':'Avtagende'; return {value:phase,unit:'',desc:'Dag '+Math.round(cycle)+' av 29.5'}; },

  birthday_calc: (i) => { if(!i.birthday) return null; const bd=new Date(i.birthday),now=new Date(); let age=now.getFullYear()-bd.getFullYear(); if(now.getMonth()<bd.getMonth()||(now.getMonth()===bd.getMonth()&&now.getDate()<bd.getDate()))age--; const next=new Date(now.getFullYear(),bd.getMonth(),bd.getDate()); if(next<now)next.setFullYear(next.getFullYear()+1); return {value:age,unit:'år',desc:'Neste bursdag om '+Math.ceil((next-now)/86400000)+' dager'}; },

  magnitude: (i) => { const x=+i.value1||0,y=+i.value2||0,z=+i.value3||0; return {value:Math.sqrt(x*x+y*y+z*z).toFixed(4),unit:'',desc:'√('+x+'²+'+y+'²+'+z+'²)'}; },

  zscore: (i) => { const x=+i.value,m=+i.mean,s=+i.std; if(!x||!m||!s) return null; return {value:((x-m)/s).toFixed(4),unit:'z-score',desc:'('+x+'-'+m+')/'+s}; },

  probability: (i) => { const f=+i.favorable,t=+i.total; if(!f||!t) return null; return {value:(f/t*100).toFixed(2),unit:'%',desc:f+' av '+t+' utfall'}; },

  variance: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(nums.length<2) return null; const avg=nums.reduce((a,b)=>a+b,0)/nums.length; return {value:(nums.reduce((a,b)=>a+(b-avg)**2,0)/nums.length).toFixed(4),unit:'',desc:'Gjennomsnitt: '+avg.toFixed(2)}; },

  mode_calc: (i) => { const nums=(i.numbers||'').split(',').map(n=>+n.trim()).filter(n=>!isNaN(n)); if(!nums.length) return null; const freq={}; nums.forEach(n=>freq[n]=(freq[n]||0)+1); const mode=Object.keys(freq).reduce((a,b)=>freq[a]>freq[b]?a:b); return {value:mode,unit:'(typetall)',desc:'Forekommer '+freq[mode]+' ganger'}; },

  nether_portal: (i) => { const ox=+i.overworld_x,oz=+i.overworld_z; if(isNaN(ox)||isNaN(oz)) return null; return {value:'X:'+Math.round(ox/8)+' Z:'+Math.round(oz/8),unit:'(Nether)',desc:'Overworld ('+ox+','+oz+')'}; },

  osrs_calc: (i) => { const curr=+i.current_xp,target=+i.target_level; if(!curr||!target) return null; const xp=[0,83,174,276,388,512,650,801,969,1154,1358,1584,1833,2107,2411,2746,3115,3523,3973,4470,5018,5624,6291,7028,7842,8740,9730,10824,12031,13363,14833,16456,18247,20224,22406,24815,27473,30408,33648,37224,41171,45529,50339,55589,61512,68000,75127,83014,91721,101333,112300,123660,136594,150872,166636,184040,203254,224466,247886,274294,303288,335240,370299,409511,452866,500000,552844,613047,680330,757132,843882,941022,1048576]; return {value:Math.max(0,(xp[Math.min(target-1,97)]||0)-curr).toLocaleString('nb-NO'),unit:'XP trengs',desc:'Mål: nivå '+target}; },

  elden_ring: (i) => { const lvl=+i.level; if(!lvl) return null; const runes=Math.round(0.02*Math.pow(lvl,3)+3.06*Math.pow(lvl,2)+105.6*lvl-895); return {value:runes.toLocaleString('nb-NO'),unit:'runer til neste',desc:'Nivå '+lvl}; },

  tv_distance: (i) => { const s=+i.tv_size; if(!s) return null; const res={'HD 720p':1.5,'Full HD 1080p':2.0,'4K UHD':3.0}; const factor=res[i.resolution]||2.0; return {value:(s*2.54*factor/100).toFixed(2)+'-'+(s*2.54*(factor+0.5)/100).toFixed(2),unit:'meter',desc:'Anbefalt sitteavstand'}; },

  roman_numeral: (i) => { const n=+i.number; if(!n||n<1||n>3999) return null; const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1]; const s=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']; let r='',num=n; v.forEach((val,idx)=>{while(num>=val){r+=s[idx];num-=val;}}); return {value:r,unit:'(romertall)',desc:n+' = '+r}; },

  gematria: (i) => { if(!i.word) return null; let sum=0; for(let c of i.word.toLowerCase()){const code=c.charCodeAt(0)-96;if(code>0&&code<=26)sum+=code;} let reduced=sum; while(reduced>9)reduced=String(reduced).split('').map(Number).reduce((a,b)=>a+b,0); return {value:sum,unit:'(gematria)',desc:'Redusert: '+reduced}; },

  working_days: (i) => { if(!i.start||!i.end) return null; const s=new Date(i.start),e=new Date(i.end); let days=0,cur=new Date(s); while(cur<=e){if(cur.getDay()!==0&&cur.getDay()!==6)days++;cur.setDate(cur.getDate()+1);} return {value:days,unit:'arbeidsdager',desc:'Fra '+s.toLocaleDateString('nb-NO')}; },

  retirement_countdown: (i) => { const a=+i.age; if(!a) return null; return {value:Math.max(0,67-a),unit:'år til pensjon',desc:'Pensjonsalder: 67 år'}; },

  time_duration: (i) => { if(!i.start_time||!i.end_time) return null; const[sh,sm]=i.start_time.split(':').map(Number); const[eh,em]=i.end_time.split(':').map(Number); let mins=(eh*60+em)-(sh*60+sm)-(+i.break_minutes||0); if(mins<0)mins+=1440; return {value:Math.floor(mins/60)+'t '+mins%60+'min',unit:'',desc:'Total: '+mins+' minutter'}; },

  day_counter: (i) => { if(!i.date1||!i.date2) return null; const d1=new Date(i.date1),d2=new Date(i.date2); const days=Math.abs(Math.ceil((d2-d1)/86400000)); return {value:days,unit:'dager',desc:Math.floor(days/7)+' uker og '+days%7+' dager'}; },

  countdown_timer: (i) => { if(!i.target_date) return null; const target=new Date(i.target_date),now=new Date(); const diff=target-now; if(diff<0) return {value:'Passert',unit:'',desc:''}; const days=Math.floor(diff/86400000); return {value:days+'d '+Math.floor((diff%86400000)/3600000)+'t',unit:'igjen',desc:target.toLocaleDateString('nb-NO')}; },

  hour_calc: (i) => { const h=+i.hours_per_day,days=+i.days,rate=+i.hourly_rate||0; if(!h||!days) return null; const total=h*days; return {value:total,unit:'timer',desc:rate>0?'Lønn: '+(total*rate).toLocaleString('nb-NO')+' kr':h+'t × '+days+' dager'}; },

  knee_to_height: (i) => { const k=+i.knee_height; if(!k) return null; const h_m=Math.round(k/0.285); const h_f=Math.round(k/0.268); return {value:h_m+' (Mann) / '+h_f+' (Kvinne)',unit:'cm høyde',desc:'Basert på knehøyde '+k+' cm'}; },

  generic: (i) => { const values=Object.values(i).filter(v=>v&&!isNaN(v)).map(Number); if(!values.length) return null; const sum=values.reduce((a,b)=>a+b,0); return {value:values.length===1?values[0]:sum.toLocaleString('nb-NO'),unit:'',desc:values.length>1?'Sum av '+values.length+' verdier':'Beregnet resultat'}; },

};

// ============================================
// SMART CALCULATOR RUNNER
// ============================================
function runCalculator(formula) {
  var inputs = {};
  document.querySelectorAll('.calc-input').forEach(function(el) {
    inputs[el.dataset.field] = el.value;
  });

  var box = document.getElementById('resultBox');
  var valEl = document.getElementById('resultValue');
  var descEl = document.getElementById('resultDesc');

  var calc = Calculators[formula];

  if (!calc) {
    var aliases = {
      'generic': Calculators.generic,
      'mortgage_advanced': Calculators.mortgage,
      'bodyfat_advanced': Calculators.bodyfat,
      'lbs_to_kg_advanced': Calculators.lbs_to_kg,
      'km_to_miles_advanced': Calculators.km_to_miles,
    };
    calc = aliases[formula] || Calculators.generic;
  }

  if (calc) {
    var result = calc(inputs);
    if (!result) { box.classList.remove('show'); return; }
    valEl.textContent = result.value + (result.unit ? ' ' + result.unit : '');
    descEl.textContent = result.desc || '';
    box.classList.add('show');
    return;
  }

  box.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.calc-input').forEach(function(el) {
    el.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        var btn = document.querySelector('.btn-calc');
        if (btn) btn.click();
      }
    });
  });
});
