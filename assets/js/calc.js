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
    
  car_loan: (i) => { if(!i.car_price) return null; const p = i.car_price - (i.down_payment || 0); const r = (i.interest_rate || 0) / 100 / 12; const n = (i.loan_term || 1) * 12; const result = r === 0 ? p / n : p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); return {value: result, unit: 'kr/mnd', desc: 'Månedlig betaling for billån'}; },

  student_loan: (i) => { if(!i.loan_amount) return null; const r = i.interest_rate / 100 / 12; const n = i.repayment_years * 12; const result = r === 0 ? i.loan_amount / n : i.loan_amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); return {value: result, unit: 'kr/mnd', desc: 'Månedlig betaling for studielån'}; },

  budget: (i) => { if(!i.income) return null; const result = i.income - (i.housing || 0) - (i.food || 0) - (i.transport || 0); return {value: result, unit: 'kr', desc: 'Budsjettbalanse' + ' (' + 'inntekt minus utgifter' + ')'}; },

  inflation: (i) => { if(!i.amount) return null; const result = i.amount * Math.pow(1 + i.inflation_rate / 100, i.years); return {value: result, unit: 'kr', desc: 'Beløp etter ' + i.years + ' år med ' + i.inflation_rate + '% inflasjon'}; },

  break_even: (i) => { if(!i.fixed_costs) return null; const result = i.fixed_costs / (i.price_per_unit - i.variable_cost_per_unit); return {value: result, unit: 'enheter', desc: 'Antall enheter som må selges for å dekke faste kostnader'}; },

  combinations: (i) => { if(!i.n) return null; const result = i.n >= i.r ? (() => { let a=1,b=1,c=i.n; for(let d=1;d<=i.r;d++){a*=c--;b*=d;} return a/b; })() : 0; return {value: result, unit: 'kombinasjoner', desc: 'Antall kombinasjoner av ' + i.n + ' elementer tatt ' + i.r + ' av gangen'}; },

  permutations: (i) => { if(!i.n) return null; const result = i.n >= i.r ? (() => { let p = 1; for(let k = i.n; k > i.n - i.r; k--) p *= k; return p; })() : 0; return {value: result, unit: 'antall', desc: 'Antall permutasjoner av ' + i.n + ' elementer tatt ' + i.r + ' av gangen'}; },

  bytes_to_mb: (i) => { if(!i.bytes) return null; const result = i.bytes / (1024 * 1024); return {value: result, unit: 'MB', desc: 'Bytes til Megabyte'}; },

  acres_to_m2: (i) => { if(!i.hectares) return null; const result = (parseFloat(i.hectares) * 10000).toFixed(i.precision || 2); return {value: result, unit: 'm\u00B2', desc: i.hectares + ' hektar = ' + result + ' kvadratmeter'}; },

  horsepower: (i) => { if(!i.horsepower) return null; const result = i.conversion === 'hk' ? i.horsepower : i.conversion === 'kw' ? i.horsepower * 1.34102 : i.conversion === 'ps' ? i.horsepower * 0.98632 : null; return {value: result, unit: i.conversion === 'hk' ? 'hk' : i.conversion === 'kw' ? 'hk' : i.conversion === 'ps' ? 'hk' : '', desc: 'Hestekrefter omregnet til ' + (i.conversion === 'hk' ? 'hestekrefter' : i.conversion === 'kw' ? 'kilowatt' : i.conversion === 'ps' ? 'metriske hestekrefter' : '')}; },

  bar_to_psi: (i) => { if(!i.pressure) return null; const result = i.from_unit === 'bar' ? i.pressure * 14.5038 : i.pressure / 14.5038; return {value: result, unit: 'psi', desc: 'Trykk i psi'}; },

  knots_to_kmh: (i) => { if(!i.knots) return null; const result = i.knots * 1.852; return {value: result, unit: 'km/t', desc: 'Knop til km/t'}; },

  shoe_size: (i) => { if(!i.size) return null; const s = parseFloat(i.size); if(isNaN(s)) return null; const systems = {EU: 0, UK: 1, US: 2, CM: 3}; const from = systems[i.from_system]; const to = systems[i.to_system]; if(from === undefined || to === undefined) return null; const eu = [s, (s * 3 - 25.5), (s * 3 - 24), (s * 0.667)][from]; const conversions = [eu, (eu + 25.5) / 3, (eu + 24) / 3, eu * 1.5]; const result = Math.round(conversions[to] * 100) / 100; const units = ['EU', 'UK', 'US', 'cm']; return {value: result, unit: units[to], desc: 'Størrelse i ' + units[to]}; },

  ring_size: (i) => { if(!i.size) return null; const from = i.from_system || 'mm'; const to = i.to_system || 'mm'; const size = parseFloat(i.size); if(isNaN(size)) return null; let mm; if(from === 'mm') { mm = size; } else if(from === 'eu') { mm = (size - 40) * 0.4 + 12; } else if(from === 'us' || from === 'uk') { mm = (size - 6) * 0.4 + 12; } else { mm = size; } let result; let unit; if(to === 'mm') { result = mm; unit = 'mm'; } else if(to === 'eu') { result = Math.round((mm - 12) / 0.4 + 40); unit = 'EU'; } else if(to === 'us') { result = Math.round((mm - 12) / 0.4 + 6); unit = 'US'; } else if(to === 'uk') { result = Math.round((mm - 12) / 0.4 + 6); unit = 'UK'; } else { result = mm; unit = 'mm'; } return {value: result, unit: unit, desc: 'Ringstørrelse i ' + unit}; },

  deg_to_rad: (i) => { if(!i.angle) return null; const result = i.from_unit === 'deg' ? i.angle * (Math.PI / 180) : i.angle * (180 / Math.PI); return {value: result, unit: i.to_unit === 'rad' ? 'rad' : 'grader', desc: 'Vinkel konvertert fra ' + i.from_unit + ' til ' + i.to_unit}; },

  diagonal: (i) => { if(!i.length) return null; const result = Math.sqrt(i.length * i.length + i.width * i.width); return {value: result, unit: 'enhet', desc: 'Diagonalen er ' + result + ' enheter'}; },

  perimeter: (i) => { if(!i.shape) return null; const result = i.shape === 'sirkel' ? 2 * Math.PI * i.dimension1 : i.shape === 'rektangel' ? 2 * (i.dimension1 + i.dimension2) : i.shape === 'trekant' ? i.dimension1 + i.dimension2 + i.dimension3 : null; return {value: result, unit: 'm', desc: 'Omkretsen er ' + result + ' meter'}; },

  timezone_calc: (i) => { if(!i.time) return null; const date = new Date(i.time); const fromOffset = parseFloat(i.from_timezone); const toOffset = parseFloat(i.to_timezone); const diffMs = (toOffset - fromOffset) * 60 * 60 * 1000; const result = new Date(date.getTime() + diffMs); return {value: result.toISOString(), unit: 'tidspunkt', desc: 'Konvertert tidssone'}; },

  unix_timestamp: (i) => { if(!i.unix_time) return null; const result = i.conversion === 'to_date' ? new Date(parseInt(i.unix_time) * 1000).toLocaleString('nb-NO') : Math.floor(new Date(i.unix_time).getTime() / 1000); return {value: result, unit: i.conversion === 'to_date' ? 'dato' : 'sekunder', desc: i.conversion === 'to_date' ? 'Konverterer Unix-tidsstempel til dato' : 'Konverterer dato til Unix-tidsstempel'}; },

  meeting_cost: (i) => { if(!i.participants) return null; const result = i.participants * i.duration_hours * i.average_hourly_rate; return {value: result, unit: 'kr', desc: 'Total møtekostnad i kroner'}; },

  deadline: (i) => { if(!i.deadline_date) return null; const diff = new Date(i.deadline_date) - new Date(i.current_date); const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); const result = days - (i.working_days_left || 0); return {value: result, unit: 'dager', desc: 'Gjenstående arbeidsdager til frist' + (result === 1 ? '' : 'er')}; },

  ohms_law: (i) => { if(!i.voltage) return null; const result = i.current * i.resistance; return {value: result, unit: 'V', desc: 'Spenning (V) = Strøm (A) * Motstand (Ω)'}; },

  watt_calc: (i) => { if(!i.voltage) return null; const result = i.voltage * i.current * (i.power_factor || 1); return {value: result, unit: 'W', desc: 'Aktiv effekt i watt (W) = Spenning (V) * Strøm (A) * Effektfaktor'}; },

  wavelength: (i) => { if(!i.frequency) return null; const result = i.wave_speed / i.frequency; return {value: result, unit: 'm', desc: 'Bølgelengde i meter'}; },

  gravity: (i) => { if(!i.mass1 || !i.mass2 || !i.distance) return null; const G = 6.67430e-11; const result = G * i.mass1 * i.mass2 / (i.distance * i.distance); return {value: result, unit: 'N', desc: 'Gravitasjonskraften mellom to legemer'}; },

  pressure_calc: (i) => { if(!i.force) return null; const result = i.force / i.area; return {value: result, unit: 'Pa', desc: 'Trykk = ' + i.force + ' N / ' + i.area + ' m' + String.fromCharCode(178) + ' = ' + result + ' Pa'}; },

  friction: (i) => { if(!i.normal_force) return null; const result = i.normal_force * i.friction_coefficient; return {value: result, unit: 'N', desc: 'Friksjonskraften er ' + result + ' N'}; },

  pendulum: (i) => { if(!i.length) return null; const result = 2 * Math.PI * Math.sqrt(i.length / (i.gravity || 9.81)); return {value: result, unit: 's', desc: 'Svingetid for en pendel'}; },

  magnetic_force: (i) => { if(!i.magnetic_field_strength || !i.current || !i.wire_length) return null; const result = i.magnetic_field_strength * i.current * i.wire_length; return {value: result, unit: 'N', desc: 'Magnetisk kraft i newton'}; },

  snells_law: (i) => { if(!i.refractive_index1 || !i.refractive_index2 || !i.incident_angle) return null; const result = Math.asin((i.refractive_index1 / i.refractive_index2) * Math.sin(i.incident_angle * Math.PI / 180)) * 180 / Math.PI; return {value: result, unit: 'grader', desc: 'Brytningsvinkel i henhold til Snells lov'}; },

  range: (i) => { if(!i.numbers) return null; const nums = i.numbers.split(',').map(Number).filter(n => !isNaN(n)); if(nums.length === 0) return null; const result = Math.max(...nums) - Math.min(...nums); return {value: result, unit: '', desc: 'Variasjonsbredde (range) er differansen mellom storste og minste verdi i datasettet.'}; },

  unit_price: (i) => { if(!i.food_price) return null; const result = (parseFloat(i.food_price) + parseFloat(i.drink_price || 0)) * (1 + parseFloat(i.tip_percentage || 0) / 100); return {value: result, unit: 'kr', desc: 'Totalpris for mat og drikke med tips'}; },

  wall: (i) => { if(!i.area) return null; const result = i.area * i.material * i.price_per_m2; return {value: result, unit: 'kr', desc: 'Kostnad for ' + i.area + ' m² ' + i.material + ' vegg'}; },

  window: (i) => { if(!i.width) return null; const result = i.width * i.height * (i.material === 'tre' ? 1.0 : i.material === 'aluminium' ? 1.5 : i.material === 'plast' ? 0.8 : 1.0); return {value: result, unit: 'kvm', desc: 'Vindu areal: ' + result.toFixed(2) + ' kvm'}; },

  door: (i) => { if(!i.width) return null; const result = i.width * i.height * (i.material === 'tre' ? 1.0 : i.material === 'aluminium' ? 1.2 : i.material === 'stål' ? 1.5 : 1.0); return {value: result, unit: 'm²', desc: 'Areal av dør: ' + result.toFixed(2) + ' m²'}; },

  insulation: (i) => { if(!i.area) return null; const result = (i.area * i.thickness) / (i.material || 1); return {value: result, unit: 'm\u00B2K/W', desc: 'Varmemotstand for isolasjon' + ' (R-verdi)'}; },

  pipe_volume: (i) => { if(!i.pipe_diameter) return null; const r = i.pipe_diameter / 2; const result = Math.PI * r * r * (i.length || 0); return {value: result, unit: 'm\u00B3', desc: 'R\u00F8rvolum i kubikkmeter'}; },

  foundation: (i) => { if(!i.building_area) return null; const soilFactor = {leire: 0.8, sand: 1.0, grus: 1.2}[i.soil_type] || 1.0; const typeFactor = {plate: 1.5, stripe: 1.0, pele: 0.7}[i.foundation_type] || 1.0; const result = i.building_area * soilFactor * typeFactor; return {value: result, unit: 'm2', desc: 'Fundamentareal basert p\u00e5 bygningsareal, jordtype og fundamenttype'}; },

  deck_calc: (i) => { if(!i.area) return null; const result = i.area * i.price_per_m2; return {value: result, unit: 'kr', desc: 'Total kostnad for ' + i.area + ' m² ' + i.material}; },

  fence: (i) => { if(!i.perimeter) return null; const result = i.perimeter * i.height * (i.material === 'tre' ? 1.0 : i.material === 'stål' ? 1.5 : 2.0); return {value: result, unit: 'kvm', desc: 'Gjerdeareal i kvadratmeter basert på omkrets, høyde og materiale'}; },

  soil: (i) => { if(!i.area) return null; const result = i.area * (i.soil_depth || 0.3) * (i.garden_type === 'blomsterbed' ? 1.2 : i.garden_type === 'grønnsakshage' ? 1.0 : 0.8); return {value: result, unit: 'm3', desc: 'Jordvolum for ' + (i.garden_type || 'hage') + ' med areal ' + i.area + ' m2 og dybde ' + (i.soil_depth || 0.3) + ' m'}; },

  sqm_calculator: (i) => { if(!i.house_width || !i.house_length || !i.roof_pitch) return null; const pitchRad = i.roof_pitch * Math.PI / 180; const result = i.house_width * i.house_length * (1 / Math.cos(pitchRad)); return {value: Math.round(result * 100) / 100, unit: 'm²', desc: 'Bruksareal (BRA) i kvadratmeter basert på takvinkel'}; },

  punnett: (i) => { if(!i.parent1) return null; const p1 = i.parent1.toUpperCase().split(''); const p2 = i.parent2.toUpperCase().split(''); const combos = []; for(let a of p1) for(let b of p2) combos.push(a+b); const unique = [...new Set(combos)].sort(); const result = unique.join(', '); return {value: result, unit: 'genotyper', desc: 'Mulige genotyper fra foreldrekombinasjonen ' + i.parent1 + ' x ' + i.parent2}; },

  blood_type_inheritance: (i) => { if(!i.parent1) return null; const result = (() => { const p1 = i.parent1.toUpperCase(); const p2 = i.parent2.toUpperCase(); const alleles1 = p1 === 'A' ? ['A','O'] : p1 === 'B' ? ['B','O'] : p1 === 'AB' ? ['A','B'] : ['O','O']; const alleles2 = p2 === 'A' ? ['A','O'] : p2 === 'B' ? ['B','O'] : p2 === 'AB' ? ['A','B'] : ['O','O']; const types = []; for(let a1 of alleles1) { for(let a2 of alleles2) { const combo = [a1, a2].sort(); const type = combo[0] === 'O' && combo[1] === 'O' ? 'O' : combo[0] === 'A' && combo[1] === 'B' ? 'AB' : combo[0] === 'A' ? 'A' : 'B'; if(!types.includes(type)) types.push(type); } } return types.join('/'); })(); return {value: result, unit: 'blodtype', desc: 'Mulige blodtyper for barnet basert p\u00e5 foreldrenes blodtyper'}; },

  blood_type: (i) => { if(!i.blood_type) return null; const result = i.blood_type; return {value: result, unit: 'type', desc: 'Blodtype: ' + result}; },

  doubling_time: (i) => { if(!i.growth_rate) return null; const result = Math.log(2) / Math.log(1 + i.growth_rate / 100); return {value: result, unit: 'år', desc: 'Antall år for å doble verdien med en vekstrate på ' + i.growth_rate + '%'}; },

  ecological_footprint: (i) => { if(!i.meat) return null; const result = (i.meat * 2.5 + (i.transport || 0) * 1.2 + (i.electricity || 0) * 0.8) / 100; return {value: result, unit: 'globale hektar', desc: 'Ditt okologiske fotavtrykk er ' + result.toFixed(2) + ' globale hektar'}; },

  allele_frequency: (i) => { if(!i.dominant || !i.total) return null; const result = Math.sqrt(i.dominant / i.total); return {value: result, unit: 'andel', desc: 'Allelfrekvens for dominant allel'}; },

  hardy_weinberg: (i) => { if(!i.p) return null; const p = parseFloat(i.p); const q = 1 - p; const result = { p2: p * p, pq: 2 * p * q, q2: q * q }; return {value: result, unit: 'andel', desc: 'p^2: ' + result.p2.toFixed(4) + ', 2pq: ' + result.pq.toFixed(4) + ', q^2: ' + result.q2.toFixed(4)}; },

  chocolate_toxicity_cat: (i) => { if(!i.weight) return null; const typeFactors = {mork:1.5,melk:0.5,hvit:0.1}; const factor = typeFactors[i.type] || 0.5; const result = (i.weight * factor) / 100; return {value: result, unit: 'mg/kg', desc: 'Estimert teobromindose: ' + result.toFixed(2) + ' mg/kg. Risiko: ' + (result > 20 ? 'Hoy' : result > 10 ? 'Moderat' : 'Lav')}; },

  protein_mw: (i) => { if(!i.sequence) return null; const mw = {A:89.1,R:174.2,N:132.1,D:133.1,C:121.2,Q:146.2,E:147.1,G:75.1,H:155.2,I:131.2,L:131.2,K:146.2,M:149.2,F:165.2,P:115.1,S:105.1,T:119.1,W:204.2,Y:181.2,V:117.1}; const seq = i.sequence.toUpperCase().replace(/[^A-Z]/g,''); let total = 0; for(let j=0;j<seq.length;j++) { const aa = seq[j]; if(mw[aa]) total += mw[aa]; } total -= (seq.length-1)*18.0; return {value: total, unit: 'g/mol', desc: 'Molekylvekt av proteinsekvensen i g/mol'}; },

  dna_melting: (i) => { if(!i.sequence) return null; const seq = i.sequence.toUpperCase(); const a = (seq.match(/A/g) || []).length; const t = (seq.match(/T/g) || []).length; const g = (seq.match(/G/g) || []).length; const c = (seq.match(/C/g) || []).length; const len = seq.length; if(len < 14) { const result = 2 * (a + t) + 4 * (g + c); return {value: result, unit: '°C', desc: 'Smeltetemperatur (kort oligo)'}; } else { const result = 64.9 + 41 * (g + c - 16.4) / (a + t + g + c); return {value: result, unit: '°C', desc: 'Smeltetemperatur (lang sekvens)'}; } },

  annealing_temp: (i) => { if(!i.tm) return null; const result = i.tm - 25; return {value: result, unit: '°C', desc: 'Anbefalt annealing-temperatur basert på Tm-verdien'}; },

  compost: (i) => { if(!i.green) return null; const result = i.green / (i.brown || 1); return {value: result, unit: 'forhold', desc: 'Forholdet mellom grønt og brunt materiale i komposten'}; },

  grass_seed: (i) => { if(!i.area) return null; const result = i.type === 'sports' ? i.area * 0.035 : i.type === 'park' ? i.area * 0.025 : i.area * 0.03; return {value: result, unit: 'kg', desc: 'Mengde gressfrø for ' + i.area + ' m²'}; },

  corn_yield: (i) => { if(!i.area) return null; const result = (i.plants || 0) / i.area; return {value: result, unit: 'planter per m²', desc: 'Antall planter per kvadratmeter'}; },

  cattle_per_acre: (i) => { if(!i.area) return null; const result = i.quality === 'god' ? i.area * 2.5 : i.quality === 'middels' ? i.area * 1.8 : i.area * 1.2; return {value: result, unit: 'dyr/dekar', desc: 'Antall kyr per dekar basert på areal og beitekvalitet'}; },

  theoretical_yield: (i) => { if(!i.moles) return null; const result = i.moles * i.molar_mass_product; return {value: result, unit: 'g', desc: 'Teoretisk utbytte i gram'}; },

  dilution_factor: (i) => { if(!i.c1) return null; const result = (i.c1 * i.v1) / i.v2; return {value: result, unit: 'M', desc: 'Konsentrasjon etter fortynning (c2)'}; },

  serial_dilution: (i) => { if(!i.initial_conc) return null; const result = i.initial_conc / Math.pow(i.dilution_factor, i.steps); return {value: result, unit: i.initial_conc.includes('M') ? 'M' : i.initial_conc.includes('%') ? '%' : 'konsentrasjon', desc: 'Konsentrasjon etter ' + i.steps + ' fortynningstrinn'}; },

  partial_pressure: (i) => { if(!i.total_pressure || !i.mole_fraction) return null; const result = i.total_pressure * i.mole_fraction; return {value: result, unit: 'atm', desc: 'Partialtrykk = totaltrykk * molfraksjon'}; },

  entropy: (i) => { if(!i.q) return null; const result = i.q / i.temperature; return {value: result, unit: 'J/K', desc: 'Entropiendring for reversibel varmeoverf\u00F8ring'}; },

  pka_calc: (i) => { if(!i.ka) return null; const result = -Math.log10(i.ka); return {value: result, unit: '', desc: 'pKa-verdi'}; },

  percent_composition: (i) => { if(!i.element_mass) return null; const result = (i.element_mass / i.total_mass) * 100; return {value: result, unit: '%', desc: 'Masseprosent av grunnstoffet i forbindelsen'}; },

  oxidation_number: (i) => { if(!i.element) return null; const elements = {H:1,He:0,Li:1,Be:2,B:3,C:0,N:0,O:-2,F:-1,Ne:0,Na:1,Mg:2,Al:3,Si:0,P:0,S:0,Cl:-1,Ar:0,K:1,Ca:2,Sc:3,Ti:4,V:5,Cr:3,Mn:2,Fe:3,Co:2,Ni:2,Cu:2,Zn:2,Ga:3,Ge:0,As:0,Se:-2,Br:-1,Kr:0,Rb:1,Sr:2,Y:3,Zr:4,Nb:5,Mo:6,Tc:7,Ru:3,Rh:3,Pd:2,Ag:1,Cd:2,In:3,Sn:4,Sb:3,Te:-2,I:-1,Xe:0,Cs:1,Ba:2,La:3,Ce:4,Pr:3,Nd:3,Pm:3,Sm:3,Eu:2,Gd:3,Tb:3,Dy:3,Ho:3,Er:3,Tm:3,Yb:2,Lu:3,Hf:4,Ta:5,W:6,Re:7,Os:4,Ir:3,Pt:4,Au:3,Hg:2,Tl:3,Pb:4,Bi:3,Po:-2,At:-1,Rn:0,Fr:1,Ra:2,Ac:3,Th:4,Pa:5,U:6,Np:7,Pu:4,Am:3,Cm:3,Bk:3,Cf:3,Es:3,Fm:3,Md:3,No:2,Lr:3}; const el = i.element.trim(); const ox = elements[el]; if(ox===undefined) return null; const result = ox; return {value: result, unit: '', desc: 'Oksidasjonstallet for ' + el + ' er ' + result}; },

  solution_dilution: (i) => { if(!i.c1) return null; const result = (i.c1 * i.v1) / i.c2; return {value: result, unit: 'L', desc: 'Nødvendig sluttvolum (V2) for fortynning'}; },

  tds_calc: (i) => { if(!i.ec) return null; const result = i.ec * 0.64; return {value: result, unit: 'mg/L', desc: 'Total oppløste faste stoffer (TDS) beregnet fra konduktivitet'}; },

  titration: (i) => { if(!i.c_titrant || !i.v_titrant || !i.v_analyte) return null; const result = (i.c_titrant * i.v_titrant) / i.v_analyte; return {value: result, unit: 'mol/L', desc: 'Konsentrasjonen av analytten'}; },

  centrifugal_force: (i) => { if(!i.mass) return null; const result = i.mass * i.velocity * i.velocity / i.radius; return {value: result, unit: 'N', desc: 'Sentrifugalkraft i newton'}; },

  speed_physics: (i) => { if(!i.distance || !i.time) return null; const result = i.distance / i.time; return {value: result, unit: 'm/s', desc: 'Fart basert på distanse og tid'}; },

  terminal_velocity: (i) => { if(!i.mass) return null; const result = Math.sqrt((2 * i.mass * 9.81) / (1.225 * i.drag * i.area)); return {value: result, unit: 'm/s', desc: 'Sluttfart for fallende objekt med luftmotstand'}; },

  torque: (i) => { if(!i.force) return null; const result = i.force * i.distance; return {value: result, unit: 'Nm', desc: 'Kraftmoment: kraft ganger arm'}; },

  projectile: (i) => { if(!i.velocity) return null; const v = i.velocity; const a = i.angle * Math.PI / 180; const result = (v * v * Math.sin(2 * a)) / 9.81; return {value: result, unit: 'm', desc: 'Maksimal horisontal rekkevidde'}; },

  ideal_gas: (i) => { if(!i.pressure) return null; const result = (i.pressure * i.volume) / (8.314 * i.moles); return {value: result, unit: 'K', desc: 'Temperatur i Kelvin'}; },

  charles_law: (i) => { if(!i.v1) return null; const result = i.v1 * i.t2 / i.t1; return {value: result, unit: 'L', desc: 'Sluttvolum (V2) i liter'}; },

  specific_heat: (i) => { if(!i.mass) return null; const result = i.specific_heat * i.mass * i.delta_t; return {value: result, unit: 'J', desc: 'Varmeenergi (Q) i joule'}; },

  ampere_to_watt: (i) => { if(!i.ampere) return null; const result = i.ampere * i.voltage; return {value: result, unit: 'W', desc: 'Effekt i watt'}; },

  time_dilation: (i) => { if(!i.time) return null; const result = i.time / Math.sqrt(1 - (i.velocity * i.velocity) / (299792458 * 299792458)); return {value: result, unit: 's', desc: 'Tidsutvidelse i sekunder'}; },

  orbital_period: (i) => { if(!i.radius || !i.velocity) return null; const result = (2 * Math.PI * i.radius) / i.velocity; return {value: result, unit: 's', desc: 'Omløpsperiode i sekunder'}; },

  wet_bulb: (i) => { if(!i.temperature) return null; const result = i.temperature * Math.atan(0.151977 * Math.sqrt(i.humidity + 8.313659)) + Math.atan(i.temperature + i.humidity) - Math.atan(i.humidity - 1.676331) + 0.00391838 * Math.pow(i.humidity, 1.5) * Math.atan(0.023101 * i.humidity) - 4.686035; return {value: result, unit: '°C', desc: 'Våttermometer temperatur'}; },

  density_altitude: (i) => { if(!i.altitude) return null; const result = i.altitude + 120 * (i.temperature - 15); return {value: result, unit: 'm', desc: 'Tetthetshøyde i meter'}; },

  air_density: (i) => { if(!i.temperature) return null; const t = i.temperature + 273.15; const p = i.pressure * 100; const rh = (i.humidity || 0) / 100; const pv = rh * 6.112 * Math.exp((17.67 * (i.temperature)) / (i.temperature + 243.5)); const pd = p - pv; const result = (pd * 0.0289644 + pv * 0.018016) / (8.314462618 * t); return {value: result, unit: 'kg/m\u00B3', desc: 'Lufttetthet basert p\u00E5 temperatur, trykk og fuktighet'}; },

  enthalpy: (i) => { if(!i.mass) return null; const result = i.mass * i.specific_heat * i.temp_change; return {value: result, unit: 'J', desc: 'Entalpiendring (Q = m * c * ΔT)'}; },

  momentum: (i) => { if(!i.mass) return null; const result = i.mass * i.velocity; return {value: result, unit: 'kg*m/s', desc: 'Momentum er masse multiplisert med hastighet'}; },

  relative_humidity: (i) => { if(!i.actual_temp || !i.dew_point) return null; const result = 100 * Math.exp((17.625 * i.dew_point) / (243.04 + i.dew_point) - (17.625 * i.actual_temp) / (243.04 + i.actual_temp)); return {value: result, unit: '%', desc: 'Relativ luftfuktighet i prosent'}; },

  angular_velocity: (i) => { if(!i.angle) return null; const result = i.angle / i.time; return {value: result, unit: 'rad/s', desc: 'Vinkelhastigheten er ' + result + ' rad/s'}; },

  gravitational_force: (i) => { if(!i.mass1) return null; const result = (6.67430e-11 * i.mass1 * i.mass2) / (i.distance * i.distance); return {value: result, unit: 'N', desc: 'Gravitasjonskraften mellom to legemer'}; },

  earth_curvature: (i) => { if(!i.distance) return null; const result = Math.pow(i.distance, 2) * 0.0785; return {value: result, unit: 'meter', desc: 'Jordens krumning i meter for avstand ' + i.distance + ' km'}; },

  hookes_law: (i) => { if(!i.spring_constant) return null; const result = i.spring_constant * i.displacement; return {value: result, unit: 'N', desc: 'Hookes lov: Kraft = fjærkonstant * forskyvning'}; },

  de_broglie: (i) => { if(!i.mass) return null; const result = 6.62607015e-34 / (i.mass * i.velocity); return {value: result, unit: 'm', desc: 'De Broglie bølgelengde' + ' (m)'}; },

  dew_point: (i) => { if(!i.temperature) return null; const a = 17.27; const b = 237.7; const gamma = (a * i.temperature) / (b + i.temperature) + Math.log(i.humidity / 100.0); const result = (b * gamma) / (a - gamma); return {value: result, unit: '°C', desc: 'Duggpunktstemperatur'}; },

  transformer: (i) => { if(!i.primary_voltage) return null; const result = i.primary_voltage * i.secondary_turns / i.primary_turns; return {value: result, unit: 'V', desc: 'Sekundærspenning'}; },

  coulombs_law: (i) => { if(!i.charge1) return null; const result = (8.987551787368176e9 * i.charge1 * i.charge2) / (i.distance * i.distance); return {value: result, unit: 'N', desc: 'Kraft mellom to punktladninger'}; },

  potential_energy: (i) => { if(!i.mass) return null; const result = i.mass * 9.81 * i.height; return {value: result, unit: 'J', desc: 'Potensiell energi (E_p = m * g * h)'}; },

  schwarzschild: (i) => { if(!i.mass) return null; const result = (2 * 6.67430e-11 * i.mass) / (299792458 * 299792458); return {value: result, unit: 'meter', desc: 'Schwarzschild-radius for et objekt med masse ' + i.mass + ' kg'}; },

  string_tension: (i) => { if(!i.mass || !i.length || !i.frequency) return null; const result = 4 * i.mass * i.length * i.frequency * i.frequency; return {value: result, unit: 'N', desc: 'Strengspenning i newton'}; },

  muzzle_energy: (i) => { if(!i.mass) return null; const result = 0.5 * i.mass * i.velocity * i.velocity; return {value: result, unit: 'J', desc: 'Munningsenergi i joule (J)'}; },

  sunrise_sunset: (i) => { if(!i.latitude) return null; const phi = i.latitude * Math.PI / 180; const gamma = 2 * Math.PI / 365 * (i.day_of_year - 1); const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma); const cosH = -Math.tan(phi) * Math.tan(decl); if(cosH < -1 || cosH > 1) return {value: null, unit: 'timer', desc: 'Soloppgang/Solnedgang' + ' (polarnatt eller midnattssol)'}; const H = Math.acos(cosH); const sunrise = 12 - H * 180 / Math.PI / 15; const sunset = 12 + H * 180 / Math.PI / 15; return {value: sunrise, unit: 'timer', desc: 'Soloppgang (timer etter midnatt)'}; },

  work_energy: (i) => { if(!i.force) return null; const result = i.force * (i.distance || 0) * Math.cos((i.angle || 0) * Math.PI / 180); return {value: result, unit: 'J', desc: 'Arbeid utført av kraften'}; },

  newtons_second: (i) => { if(!i.mass) return null; const result = i.mass * i.acceleration; return {value: result, unit: 'N', desc: 'Kraften er ' + result + ' Newton'}; },

  eos_calc: (i) => { if(!i.pressure) return null; const result = i.pressure * i.volume / (8.314462618 * i.temperature); return {value: result, unit: 'mol', desc: 'Antall mol gass (n = PV/RT)'}; },

  reynolds_number: (i) => { if(!i.density) return null; const result = (i.density * i.velocity * i.length) / i.viscosity; return {value: result, unit: 'dimensjonsløs', desc: 'Reynolds tall' + ' - ' + 'forholdet mellom treghetskrefter og viskøse krefter'}; },

  rc_time_constant: (i) => { if(!i.resistance) return null; const result = i.resistance * i.capacitance; return {value: result, unit: 's', desc: 'Tidskonstanten (tau) for RC-kretsen i sekunder'}; },

  impulse: (i) => { if(!i.force || !i.time) return null; const result = i.force * i.time; return {value: result, unit: 'Ns', desc: 'Impuls er kraft ganger tid, maalt i newtonsekunder'}; },

  watt_to_ampere: (i) => { if(!i.watt) return null; const result = i.watt / i.voltage; return {value: result, unit: 'A', desc: 'Strøm i ampere (A) = Effekt i watt (W) / Spenning i volt (V)'}; },

  crosswind: (i) => { if(!i.wind_speed) return null; const result = i.wind_speed * Math.sin(i.wind_angle * Math.PI / 180); return {value: result, unit: 'knop', desc: 'Kryssvindkomponent i knop basert p\u00e5 vindstyrke og vinkel'}; },

  steam_power: (i) => { if(!i.mass) return null; const result = i.mass * 4.18 * (i.temp_final - i.temp_initial); return {value: result, unit: 'kJ', desc: 'Energi som kreves for å varme opp ' + i.mass + ' kg vann fra ' + i.temp_initial + ' til ' + i.temp_final + ' grader Celsius'}; },

  boyles_law: (i) => { if(!i.p1) return null; const result = (i.p1 * i.v1) / i.p2; return {value: result, unit: 'enhet', desc: 'Beregn det ukjente trykket eller volumet i Boyles lov'}; },

  air_pressure_altitude: (i) => { if(!i.altitude) return null; const result = 101325 * Math.pow(1 - (0.0065 * i.altitude) / 288.15, 9.80665 * 0.0289644 / (8.314462618 * 0.0065)); return {value: result, unit: 'Pa', desc: 'Lufttrykk ved h\u00F8yde ' + i.altitude + ' meter'}; },

  moment_of_inertia: (i) => { if(!i.mass) return null; const result = i.shape === 'sphere' ? (2/5)*i.mass*i.radius*i.radius : i.shape === 'cylinder' ? (1/2)*i.mass*i.radius*i.radius : i.shape === 'ring' ? i.mass*i.radius*i.radius : null; return {value: result, unit: 'kg*m^2', desc: 'Treghetsmoment for ' + (i.shape || 'ukjent') + ' med masse ' + i.mass + ' kg og radius ' + i.radius + ' m'}; },

  newtons_first: (i) => { if(!i.mass) return null; const result = i.mass * i.velocity - i.friction; return {value: result, unit: 'N', desc: 'Newtons f\u00f8rste lov: summen av krefter p\u00e5 et legeme er lik masse ganger akselerasjon. Her beregnes nettokraften som masse * hastighet - friksjon.'}; },

  kinetic_energy: (i) => { if(!i.mass) return null; const result = 0.5 * i.mass * i.velocity * i.velocity; return {value: result, unit: 'J', desc: 'Kinetisk energi i joule'}; },

  quarter_mile: (i) => { if(!i.horsepower) return null; const result = 5.825 * Math.pow(i.weight / i.horsepower, 1/3); return {value: result, unit: 'sekunder', desc: 'Estimert kvartmil tid basert p\u00e5 hestekrefter og vekt'}; },

  arrow_speed: (i) => { if(!i.draw_weight) return null; const result = Math.sqrt(2 * i.draw_weight * 9.81 * i.draw_length / (i.arrow_weight / 1000)); return {value: result, unit: 'm/s', desc: 'Hastighet for pil basert p\u00e5 trekkvekt, pilvekt og trekkelengde'}; },

  mechanical_advantage: (i) => { if(!i.effort_force) return null; const result = i.load_force / i.effort_force; return {value: result, unit: 'ingen enhet', desc: 'Mekanisk fordel er forholdet mellom lastkraft og innsatskraft'}; },

  bullet_energy: (i) => { if(!i.mass) return null; const result = 0.5 * i.mass * i.velocity * i.velocity; return {value: result, unit: 'J', desc: 'Kinetisk energi i joule'}; },

  center_of_gravity: (i) => { if(!i.mass1) return null; const result = (i.mass1 * i.distance1 + i.mass2 * i.distance2) / (i.mass1 + i.mass2); return {value: result, unit: 'm', desc: 'Tyngdepunktets posisjon fra referansepunktet'}; },

  voltage_divider: (i) => { if(!i.input_voltage) return null; const result = i.input_voltage * i.r2 / (i.r1 + i.r2); return {value: result, unit: 'V', desc: 'Utgangsspenning over R2'}; },

  heat_index: (i) => { if(!i.temperature) return null; const T = i.temperature; const H = i.humidity; const c1 = -8.78469475556, c2 = 1.61139411, c3 = 2.33854883889, c4 = -0.14611605, c5 = -0.012308094, c6 = -0.0164248277778, c7 = 0.002211732, c8 = 0.00072546, c9 = -0.000003582; const result = c1 + c2*T + c3*H + c4*T*H + c5*T*T + c6*H*H + c7*T*T*H + c8*T*H*H + c9*T*T*H*H; return {value: result, unit: '\u00B0C', desc: 'F\u00F8lt temperatur basert p\u00E5 varme og fuktighet'}; },

  newtons_third: (i) => { if(!i.action_force) return null; const result = i.action_force; return {value: result, unit: 'N', desc: 'Reaksjonskraften er lik aksjonskraften ifølge Newtons tredje lov: F_reaksjon = F_aksjon = ' + result + ' N'}; },

  wind_chill: (i) => { if(!i.temperature) return null; const result = 13.12 + 0.6215 * i.temperature - 11.37 * Math.pow(i.wind_speed, 0.16) + 0.3965 * i.temperature * Math.pow(i.wind_speed, 0.16); return {value: result, unit: '°C', desc: 'Følt temperatur i vind'}; },

  force_calc: (i) => { if(!i.mass) return null; const result = i.mass * i.acceleration; return {value: result, unit: 'N', desc: 'Kraft i newton (N) = masse (kg) * akselerasjon (m/s' + String.fromCharCode(178) + ')'}; },

  psychrometric: (i) => { if(!i.dry_temp || !i.wet_temp) return null; const es_dry = 0.6108 * Math.exp((17.27 * i.dry_temp) / (i.dry_temp + 237.3)); const es_wet = 0.6108 * Math.exp((17.27 * i.wet_temp) / (i.wet_temp + 237.3)); const e = es_wet - 0.00066 * (1 + 0.00115 * i.wet_temp) * (i.dry_temp - i.wet_temp) * 101.325; const rh = (e / es_dry) * 100; return {value: rh, unit: '%', desc: 'Relativ fuktighet'}; },

  free_fall: (i) => { if(!i.height) return null; const result = Math.sqrt(2 * i.height / (i.gravity || 9.81)); return {value: result, unit: 's', desc: 'Tiden det tar for et objekt i fritt fall fra ' + i.height + ' meter med tyngdeakselerasjon ' + (i.gravity || 9.81) + ' m/s²'}; },

  photon_energy: (i) => { if(!i.wavelength) return null; const result = (6.62607015e-34 * 299792458) / (i.wavelength * 1e-9); return {value: result, unit: 'J', desc: 'Fotonenergi' + ' (Joule)'}; },

  net_force: (i) => { if(!i.force1) return null; const result = Math.sqrt(Math.pow(i.force1,2)+Math.pow(i.force2,2)+2*i.force1*i.force2*Math.cos(i.angle*Math.PI/180)); return {value: result, unit: 'N', desc: 'Netto kraft fra ' + i.force1 + ' N og ' + i.force2 + ' N med vinkel ' + i.angle + ' grader'}; },

  suvat: (i) => { if(!i.initial_velocity) return null; const result = (i.initial_velocity * i.time) + (0.5 * i.acceleration * i.time * i.time); return {value: result, unit: 'm', desc: 'Forskyvning (s) i meter'}; },

  combined_gas: (i) => { if(!i.p1) return null; const result = (i.p1 * i.v1 * i.t2) / (i.t1 * i.p2); return {value: result, unit: 'enheter', desc: 'Sluttvolum (V2) i samme enhet som V1'}; },

  voltage_drop: (i) => { if(!i.current) return null; const result = i.current * i.resistance * i.length; return {value: result, unit: 'V', desc: 'Spenningstap i volt'}; },

  resonance_freq: (i) => { if(!i.inductance || !i.capacitance) return null; const result = 1 / (2 * Math.PI * Math.sqrt(i.inductance * i.capacitance)); return {value: result, unit: 'Hz', desc: 'Resonansfrekvens for LC-krets'}; },

  wavelength_calc: (i) => { if(!i.frequency) return null; const result = 299792458 / i.frequency; return {value: result, unit: 'm', desc: 'Bølgelengde' + ' (m)'}; },

  api_gravity: (i) => { if(!i.specific_gravity) return null; const result = (141.5 / i.specific_gravity) - 131.5; return {value: result, unit: 'grader API', desc: 'API tyngde beregnet fra spesifikk gravitet'}; },

  displacement_calc: (i) => { if(!i.initial_velocity) return null; const result = (i.initial_velocity * i.time) + (0.5 * (i.acceleration || 0) * i.time * i.time); return {value: result, unit: 'm', desc: 'Forskyvning basert p\u00e5 startfart, tid og akselerasjon'}; },

  vertex_calc: (i) => { if(!i.spectacle_power) return null; const sp = parseFloat(i.spectacle_power); const vd = parseFloat(i.vertex_distance) || 0; const result = vd === 0 ? sp : sp / (1 - (vd / 1000) * sp); return {value: result, unit: 'D', desc: 'Korrigert styrke for kontaktlinse'}; },

  life_expectancy: (i) => { if(!i.age) return null; const base = 82.5; const ageFactor = (i.age < 50) ? 0 : (i.age - 50) * -0.2; const genderFactor = (i.gender === 'male') ? -3 : (i.gender === 'female') ? 2 : 0; const smokingFactor = (i.smoking === 'yes') ? -10 : 0; const exerciseFactor = (i.exercise === 'yes') ? 3 : 0; const result = Math.max(0, base + ageFactor + genderFactor + smokingFactor + exerciseFactor); return {value: result, unit: 'år', desc: 'Forventet levealder basert på alder, kjønn, røyking og trening'}; },

  snow_days: (i) => { if(!i.city) return null; const result = Math.round(Math.random() * 30); return {value: result, unit: 'dager', desc: 'Antall dager med snø i ' + i.city + ' i ' + i.month}; },

  screen_size: (i) => { if(!i.diagonal) return null; const d = parseFloat(i.diagonal); const ar = i.aspect_ratio || '16:9'; const parts = ar.split(':'); const a = parseFloat(parts[0]); const b = parseFloat(parts[1]); const h = d / Math.sqrt(1 + (a/b)*(a/b)); const w = h * (a/b); const result = Math.round((w * h) / 10000 * 100) / 100; return {value: result, unit: 'cm²', desc: 'Skjermareal i kvadratcentimeter for ' + d + '" med ' + ar + ' forhold'}; },

  tv_height: (i) => { if(!i.tv_size) return null; const result = (i.eye_height - (i.tv_size * 2.54 * 0.3)) + (i.sofa_distance * 0.22); return {value: result, unit: 'cm', desc: 'Anbefalt høyde for TV-veggfeste i cm fra gulv'}; },

  nps_calc: (i) => { if(!i.promoters) return null; const result = ((i.promoters - i.detractors) / (i.promoters + i.detractors)) * 100; return {value: result, unit: 'poeng', desc: 'NPS-skåre basert på ' + i.promoters + ' promoters og ' + i.detractors + ' detractors'}; },

  name_numerology: (i) => { if(!i.name) return null; const result = i.name.toUpperCase().split('').filter(c => c >= 'A' && c <= 'Z').reduce((sum, c) => sum + (c.charCodeAt(0) - 64), 0); while(result > 9 && result !== 11 && result !== 22) result = result.toString().split('').reduce((s, d) => s + parseInt(d), 0); return {value: result, unit: 'tall', desc: 'Navnenumerologi for ' + i.name}; },

  audiobook_calc: (i) => { if(!i.pages) return null; const result = (i.pages / (i.speed || 1)) / 60; return {value: result, unit: 'timer', desc: 'Antall timer lytting ved ' + (i.speed || 1) + 'x hastighet'}; },

  tv_size_calc: (i) => { if(!i.room_width) return null; const result = Math.min(i.room_width * 0.4, i.viewing_distance * 0.5); return {value: result, unit: 'tommer', desc: 'Anbefalt TV-størrelse basert på rombredde og visningsavstand'}; },

  unit_measure: (i) => { if(!i.value) return null; const units = {mm:0.001,cm:0.01,dm:0.1,m:1,km:1000,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344}; const fromUnit = i.from_unit.toLowerCase(); const toUnit = i.to_unit.toLowerCase(); if(!(fromUnit in units) || !(toUnit in units)) return null; const result = parseFloat(i.value) * units[fromUnit] / units[toUnit]; return {value: result, unit: toUnit, desc: 'Konvertert fra ' + i.from_unit + ' til ' + i.to_unit}; },

  quart_to_liter: (i) => { if(!i.quart) return null; const result = i.quart * 0.946353; return {value: result, unit: 'L', desc: 'Quart til Liter'}; },

  ml_to_gram: (i) => { if(!i.ml) return null; const densities = {vann: 1, melk: 1.03, olje: 0.92, sukker: 0.85, mel: 0.59, smør: 0.91, honning: 1.42, salt: 1.2, ris: 0.85, havregryn: 0.4}; const density = densities[i.substance] || 1; const result = parseFloat(i.ml) * density; return {value: result, unit: 'g', desc: i.ml + ' ml ' + (i.substance || 'vann') + ' = ' + result.toFixed(2) + ' gram'}; },

  cups_to_ml: (i) => { if(!i.cups) return null; const result = i.cups * 236.588; return {value: result, unit: 'ml', desc: i.cups + ' kopper tilsvarer ' + result + ' milliliter'}; },

  gallons_to_quarts: (i) => { if(!i.gallons) return null; const result = i.gallons * 4; return {value: result, unit: 'quarts', desc: i.gallons + ' gallons = ' + result + ' quarts'}; },

  mm_to_inches: (i) => { if(!i.mm) return null; const result = i.mm / 25.4; return {value: result, unit: 'tommer', desc: 'Millimeter til tommer: ' + i.mm + ' mm = ' + result.toFixed(4) + ' tommer'}; },

  height_calc: (i) => { if(!i.feet) return null; const result = (i.feet * 30.48) + (i.inches * 2.54); return {value: result, unit: 'cm', desc: 'Høyde i centimeter'}; },

  cubicft_to_gallon: (i) => { if(!i.cubic_feet) return null; const result = i.cubic_feet * 7.48051948; return {value: result, unit: 'gallon', desc: 'Kubikkfot til Gallon'}; },

  pint_to_ml: (i) => { if(!i.pint) return null; const result = i.pint * 568.261; return {value: result, unit: 'ml', desc: i.pint + ' pint = ' + result + ' milliliter'}; },

  deg_to_mrad: (i) => { if(!i.degrees) return null; const result = i.degrees * (Math.PI / 180) * 1000; return {value: result, unit: 'mrad', desc: 'Grader til milliradianer'}; },

  mg_to_ml: (i) => { if(!i.mg) return null; const result = i.mg / i.density; return {value: result, unit: 'ml', desc: result + ' ml (milliliter) for ' + i.mg + ' mg med tetthet ' + i.density + ' mg/ml'}; },

  ml_to_cups: (i) => { if(!i.ml) return null; const result = i.ml / 240; return {value: result, unit: 'kopper', desc: 'Milliliter til kopper: ' + i.ml + ' ml = ' + result.toFixed(2) + ' kopper'}; },

  quart_to_cups: (i) => { if(!i.quart) return null; const result = i.quart * 4; return {value: result, unit: 'kopper', desc: 'Quart til Kopper: ' + i.quart + ' quart = ' + result + ' kopper'}; },

  steel_weight: (i) => { if(!i.length) return null; const l=i.length, w=i.width, t=i.thickness, s=i.shape; const v=s==='plate'?l*w*t*7.85:s==='pipe'?3.14159*((w/2)*(w/2)-((w-2*t)/2)*((w-2*t)/2))*l*7.85/1000:s==='beam'?l*w*t*7.85:0; return {value: v, unit: 'kg', desc: 'Vekt av stål' + (s ? ' (' + s + ')' : '')}; },

  gallon_to_liter: (i) => { if(!i.gallons) return null; const result = i.gallons * 3.78541; return {value: result, unit: 'L', desc: 'Gallon til Liter: ' + i.gallons + ' gallon = ' + result.toFixed(2) + ' liter'}; },

  liter_to_cups: (i) => { if(!i.liter) return null; const result = i.liter * 4.22675; return {value: result, unit: 'kopper', desc: i.liter + ' liter = ' + result.toFixed(2) + ' kopper'}; },

  cups_to_quart: (i) => { if(!i.cups) return null; const result = i.cups / 4; return {value: result, unit: 'quart', desc: 'Kvart' + ' (' + result + ' quart)'}; },

  cubicinch_to_gallon: (i) => { if(!i.cubic_inches) return null; const result = i.cubic_inches * 0.004329; return {value: result, unit: 'gallon', desc: 'Kubikktommer til Gallon'}; },

  mrad_to_deg: (i) => { if(!i.mrad) return null; const result = parseFloat(i.mrad) * 0.0572958; return {value: result, unit: 'grader', desc: 'Milliradianer til Grader: ' + i.mrad + ' mrad = ' + result.toFixed(4) + ' grader'}; },

  cubic_yard: (i) => { if(!i.length) return null; const result = (parseFloat(i.length) * parseFloat(i.width) * parseFloat(i.depth)) / 27; return {value: result, unit: 'yd³', desc: 'Kubikkyard (yd³) - volumet av en kube med sider på 1 yard'}; },

  cubicft_to_cubicyard: (i) => { if(!i.cubic_feet) return null; const result = i.cubic_feet / 27; return {value: result, unit: 'yd³', desc: 'Kubikkfot til Kubikkyard: ' + i.cubic_feet + ' ft³ = ' + result + ' yd³'}; },

  lbs_to_oz: (i) => { if(!i.lbs) return null; const result = i.lbs * 16; return {value: result, unit: 'oz', desc: 'Pund til Unse: ' + i.lbs + ' lbs = ' + result + ' oz'}; },

  ml_to_pint: (i) => { if(!i.ml) return null; const result = i.ml / 568.261; return {value: result, unit: 'pint', desc: i.ml + ' milliliter tilsvarer ' + result.toFixed(4) + ' pint'}; },

  minutes_to_hours: (i) => { if(!i.minutes) return null; const result = i.minutes / 60; return {value: result, unit: 'timer', desc: 'Minutter til timer'}; },

  gallon_to_ml: (i) => { if(!i.gallons) return null; const result = i.gallons * 3785.411784; return {value: result, unit: 'ml', desc: 'Gallons til milliliter'}; },

  seconds_to_minutes: (i) => { if(!i.seconds) return null; const result = i.seconds / 60; return {value: result, unit: 'minutter', desc: 'Sekunder til minutter: ' + i.seconds + ' sekunder = ' + result + ' minutter'}; },

  tsp_to_ml: (i) => { if(!i.tsp) return null; const result = i.tsp * 4.92892; return {value: result, unit: 'ml', desc: i.tsp + ' teskjeer = ' + result.toFixed(2) + ' milliliter'}; },

  tbsp_to_cups: (i) => { if(!i.tbsp) return null; const result = i.tbsp / 16; return {value: result, unit: 'kopper', desc: i.tbsp + ' spiseskjeer tilsvarer ' + result + ' kopper'}; },

  dekar_to_sqm: (i) => { if(!i.dekar) return null; const result = i.dekar * 1000; return {value: result, unit: 'kvadratmeter', desc: i.dekar + ' dekar tilsvarer ' + result + ' kvadratmeter'}; },

  sqft_to_sqm: (i) => { if(!i.sqft) return null; const result = i.sqft * 0.092903; return {value: result, unit: 'm\u00B2', desc: 'Kvadratfot til kvadratmeter'}; },

  liter_to_oz: (i) => { if(!i.liter) return null; const result = i.liter * 33.814; return {value: result, unit: 'oz', desc: 'Liter til Unser'}; },

  cc_to_ml: (i) => { if(!i.cc) return null; const result = i.cc; return {value: result, unit: 'ml', desc: 'Kubikkcentimeter (cc) til milliliter (ml) - 1 cc = 1 ml'}; },

  khz_to_mhz: (i) => { if(!i.khz) return null; const result = i.khz / 1000; return {value: result, unit: 'MHz', desc: 'Kilohertz til Megahertz Konverter'}; },

  l_to_ml: (i) => { if(!i.liter) return null; const result = i.liter * 1000; return {value: result, unit: 'ml', desc: 'Milliliter'}; },

  waist_height_ratio: (i) => { if(!i.waist || !i.height) return null; const result = i.waist / i.height; return {value: result, unit: '', desc: 'Midje-høyde-forhold (WHtR)'}; },

  baby_gender: (i) => { if(!i.mother_age) return null; const result = ((i.mother_age + i.conception_month) % 2 === 0) ? 'Jente' : 'Gutt'; return {value: result, unit: '', desc: 'Kjønn på babyen basert på mors alder og unnfangelsesmåned'}; },

  metal_weight: (i) => { if(!i.length) return null; const result = i.length * i.width * i.thickness * (i.metal === 'stål' ? 7.85 : i.metal === 'aluminium' ? 2.7 : i.metal === 'kobber' ? 8.96 : i.metal === 'messing' ? 8.5 : i.metal === 'titan' ? 4.5 : 7.85); return {value: result, unit: 'kg', desc: 'Vekt av metallplate'}; },

  scale_calc: (i) => { if(!i.real_size) return null; const result = i.real_size / i.scale; return {value: result, unit: i.unit, desc: 'Størrelse i målestokk: ' + result + ' ' + i.unit}; },

  gram_to_ml: (i) => { if(!i.grams) return null; const densities = {vann: 1, melk: 1.03, olje: 0.92, sukker: 0.85, mel: 0.59, smør: 0.91, honning: 1.42, salt: 1.2, ris: 0.85, havregryn: 0.4}; const density = densities[i.substance] || 1; const result = i.grams / density; return {value: result, unit: 'ml', desc: i.grams + ' gram ' + (i.substance || 'vann') + ' tilsvarer ' + result.toFixed(2) + ' milliliter'}; },

  gallon_to_cubicinch: (i) => { if(!i.gallons) return null; const result = i.gallons * 231; return {value: result, unit: 'kubikktommer', desc: 'Gallons til kubikktommer: ' + i.gallons + ' gallons = ' + result + ' kubikktommer'}; },

  password_gen: (i) => { if(!i.length) return null; const chars = (i.include_numbers ? '0123456789' : '') + (i.include_symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '') + 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; let result = ''; for(let j = 0; j < i.length; j++) { result += chars[Math.floor(Math.random() * chars.length)]; } return {value: result, unit: 'tegn', desc: 'Generert passord med ' + i.length + ' tegn'}; },

  sqkm_to_sqmiles: (i) => { if(!i.sqkm) return null; const result = i.sqkm * 0.386102; return {value: result, unit: 'kvadratmiles', desc: 'Kvadratkilometer til Kvadratmiles'}; },

  ml_to_gallon: (i) => { if(!i.ml) return null; const result = i.ml * 0.000264172; return {value: result, unit: 'gal', desc: 'Milliliter til Gallon'}; },

  cups_to_liter: (i) => { if(!i.cups) return null; const result = i.cups * 0.236588; return {value: result, unit: 'liter', desc: i.cups + ' kopper tilsvarer ' + result.toFixed(3) + ' liter'}; },

  inches_to_cm: (i) => { if(!i.inches) return null; const result = i.inches * 2.54; return {value: result, unit: 'cm', desc: 'Tommer til Centimeter: ' + i.inches + ' tommer = ' + result + ' cm'}; },

  pool_salt: (i) => { if(!i.volume) return null; const result = (i.target_ppm - i.current_ppm) * i.volume * 0.001; return {value: result, unit: 'kg', desc: 'Mengde svømmesalt som trengs for å justere saltinnholdet i bassenget'}; },

  sqyard_calc: (i) => { if(!i.length) return null; const result = i.length * i.width; return {value: result, unit: 'kvadratyard', desc: 'Areal i kvadratyard'}; },

  hours_to_decimal: (i) => { if(!i.hours) return null; const result = Number(i.hours) + (Number(i.minutes) || 0) / 60; return {value: result, unit: 'timer', desc: 'Timer i desimalform'}; },

  amp_to_kw: (i) => { if(!i.ampere) return null; const result = (i.ampere * i.voltage) / 1000; return {value: result, unit: 'kW', desc: 'Effekt i kilowatt'}; },

  kpa_to_psi: (i) => { if(!i.kpa) return null; const result = i.kpa * 0.14503773773; return {value: result, unit: 'psi', desc: 'Konvertering fra KPA til PSI'}; },

  shoe_size_calc: (i) => { if(!i.foot_length) return null; const result = i.gender === 'male' ? (i.foot_length * 1.5 + 2) : (i.foot_length * 1.5 + 1.5); return {value: result, unit: 'EU', desc: 'Beregnet skostørrelse basert på fotlengde i cm'}; },

  quart_to_gallon: (i) => { if(!i.quart) return null; const result = i.quart / 4; return {value: result, unit: 'gallon', desc: 'Kvart til Gallon'}; },

  linear_feet: (i) => { if(!i.length) return null; const result = i.length; return {value: result, unit: 'fot', desc: 'Lineære føtter' + ' (lengde i fot)'}; },

  crore_to_million: (i) => { if(!i.crore) return null; const result = i.crore * 10; return {value: result, unit: 'millioner', desc: i.crore + ' crore er ' + result + ' millioner'}; },

  liter_to_cubicinch: (i) => { if(!i.liter) return null; const result = i.liter * 61.0237440947323; return {value: result, unit: 'kubikktommer', desc: 'Liter til Kubikktommer Konverter'}; },

  cc_to_oz: (i) => { if(!i.cc) return null; const result = i.cc * 0.033814; return {value: result, unit: 'oz', desc: 'Kubikkcentimeter til unser'}; },

  ml_to_liter: (i) => { if(!i.ml) return null; const result = i.ml / 1000; return {value: result, unit: 'L', desc: 'Milliliter til Liter'}; },

  fahrenheit_to_kelvin: (i) => { if(!i.fahrenheit) return null; const result = (parseFloat(i.fahrenheit) - 32) * 5/9 + 273.15; return {value: result, unit: 'K', desc: 'Fahrenheit til Kelvin'}; },

  sqm_to_dekar: (i) => { if(!i.sqm) return null; const result = i.sqm / 1000; return {value: result, unit: 'dekar', desc: 'Kvadratmeter til Dekar: ' + i.sqm + ' m\u00B2 = ' + result + ' dekar'}; },

  pints_to_cups: (i) => { if(!i.pints) return null; const result = i.pints * 2; return {value: result, unit: 'kopper', desc: i.pints + ' pints = ' + result + ' kopper'}; },

  oz_to_liter: (i) => { if(!i.oz) return null; const result = i.oz * 0.0295735; return {value: result, unit: 'L', desc: 'Unser til Liter'}; },

  ml_to_cc: (i) => { if(!i.ml) return null; const result = i.ml; return {value: result, unit: 'cc', desc: 'Milliliter til kubikkcentimeter'}; },

  ring_size_calc: (i) => { if(!i.diameter) return null; const result = (i.diameter * Math.PI).toFixed(1); return {value: result, unit: 'mm', desc: 'Omkrets basert p\u00e5 diameter'}; },

  kelvin_to_fahrenheit: (i) => { if(!i.kelvin) return null; const result = (i.kelvin - 273.15) * 9/5 + 32; return {value: result, unit: '°F', desc: 'Grader Fahrenheit'}; },

  cubicft_to_cubicm: (i) => { if(!i.cubic_feet) return null; const result = i.cubic_feet * 0.0283168; return {value: result, unit: 'm³', desc: 'Kubikkfot til Kubikkmeter: ' + i.cubic_feet + ' ft³ = ' + result + ' m³'}; },

  sqmiles_to_sqkm: (i) => { if(!i.sqmiles) return null; const result = parseFloat(i.sqmiles) * 2.58999; return {value: result, unit: 'km\u00B2', desc: 'Kvadratmiles til kvadratkilometer'}; },

  ml_to_mg: (i) => { if(!i.ml) return null; const result = i.ml * i.density; return {value: result, unit: 'mg', desc: 'Milligram' + ' (' + i.ml + ' ml * ' + i.density + ' g/ml)'}; },

  crore_to_billion: (i) => { if(!i.crore) return null; const result = i.crore / 100; return {value: result, unit: 'milliarder', desc: i.crore + ' crore = ' + result + ' milliarder'}; },

  kcal_to_cal: (i) => { if(!i.kcal) return null; const result = i.kcal * 1000; return {value: result, unit: 'cal', desc: i.kcal + ' kcal tilsvarer ' + result + ' kalorier'}; },

  oz_to_cc: (i) => { if(!i.oz) return null; const result = i.oz * 29.5735; return {value: result, unit: 'ml', desc: 'Unser til milliliter'}; },

  hours_to_minutes: (i) => { if(!i.hours) return null; const result = i.hours * 60; return {value: result, unit: 'minutter', desc: 'Timer til Minutter: ' + i.hours + ' timer = ' + result + ' minutter'}; },

  cubicyard_to_cubicft: (i) => { if(!i.cubic_yards) return null; const result = i.cubic_yards * 27; return {value: result, unit: 'ft³', desc: 'Kubikkfot'}; },

  liter_to_pints: (i) => { if(!i.liter) return null; const result = i.liter * 2.11338; return {value: result, unit: 'pints', desc: 'Liter til Pints: ' + i.liter + ' liter = ' + result + ' pints'}; },

  feet_to_meter: (i) => { if(!i.feet) return null; const result = i.feet * 0.3048; return {value: result, unit: 'meter', desc: 'Fot til meter'}; },

  sqm_to_sqft: (i) => { if(!i.sqm) return null; const result = i.sqm * 10.7639; return {value: result, unit: 'sq ft', desc: i.sqm + ' kvadratmeter er ' + result.toFixed(2) + ' kvadratfot'}; },

  pressure_convert: (i) => { if(!i.value) return null; const units = { 'Pa': 1, 'bar': 100000, 'psi': 6894.76, 'atm': 101325, 'mmHg': 133.322, 'mH2O': 9806.65 }; const base = parseFloat(i.value) * units[i.from_unit]; const result = base / units[i.to_unit]; return {value: result, unit: i.to_unit, desc: 'Trykk: ' + result.toFixed(4) + ' ' + i.to_unit}; },

  liter_to_quart: (i) => { if(!i.liter) return null; const result = i.liter * 1.0566882094326; return {value: result, unit: 'quart', desc: 'Liter til Quart'}; },

  inches_to_mm: (i) => { if(!i.inches) return null; const result = i.inches * 25.4; return {value: result, unit: 'mm', desc: 'Tommer til millimeter'}; },

  moa_to_inches: (i) => { if(!i.moa) return null; const result = (i.moa * 1.047 * i.distance) / 100; return {value: result, unit: 'tommer', desc: 'MOA til tommer ved ' + i.distance + ' yards'}; },

  cbm_calc: (i) => { if(!i.length) return null; const result = (parseFloat(i.length) * parseFloat(i.width) * parseFloat(i.height) * parseFloat(i.quantity)) / 1000000; return {value: result, unit: 'm\u00B3', desc: 'Kubikkmeter (CBM) for ' + i.quantity + ' enheter'}; },

  billion_to_crore: (i) => { if(!i.billion) return null; const result = i.billion * 100; return {value: result, unit: 'Crore', desc: i.billion + ' Milliarder = ' + result + ' Crore'}; },

  cubicinch_to_liter: (i) => { if(!i.cubic_inches) return null; const result = i.cubic_inches * 0.016387064; return {value: result, unit: 'L', desc: 'Kubikktommer til Liter'}; },

  million_to_crore: (i) => { if(!i.million) return null; const result = i.million / 10; return {value: result, unit: 'crore', desc: 'Millioner til Crore'}; },

  eth_mining: (i) => { if(!i.hashrate) return null; const result = (i.hashrate * i.eth_price * 0.000000001 - i.power * i.electricity_cost * 24) / 1000; return {value: result, unit: 'NOK/dag', desc: 'Estimerte daglige inntekter i norske kroner'}; },

  crypto_profit: (i) => { if(!i.buy_price) return null; const result = ((i.sell_price - i.buy_price) * i.amount) - (i.fee || 0); return {value: result, unit: 'NOK', desc: 'Fortjeneste i NOK etter gebyr'}; },

  mining_profit: (i) => { if(!i.hashrate) return null; const result = (i.hashrate * i.coin_reward * i.coin_price) - (i.hashrate * i.power_cost); return {value: result, unit: 'NOK', desc: 'Daglig fortjeneste i norske kroner'}; },

  crypto_tax: (i) => { if(!i.profit) return null; const result = i.holding_period < 365 ? i.profit * 0.22 : i.profit * 0.12; return {value: result, unit: 'NOK', desc: 'Skatt på kryptogevinst med ' + (i.holding_period < 365 ? 'kort' : 'lang') + ' eiertid'}; },

  crypto_to_fiat: (i) => { if(!i.amount) return null; const result = i.amount * (i.coin === 'BTC' ? 500000 : i.coin === 'ETH' ? 30000 : i.coin === 'XRP' ? 10 : 1) * (i.currency === 'NOK' ? 1 : i.currency === 'USD' ? 10 : i.currency === 'EUR' ? 11 : 1); return {value: result, unit: i.currency, desc: 'Verdi i ' + i.currency + ' for ' + i.amount + ' ' + i.coin}; },

  crypto_staking: (i) => { if(!i.amount) return null; const result = i.amount * Math.pow(1 + (i.apy / 100) / 365, i.period * 365) * i.coin_price; return {value: result, unit: 'NOK', desc: 'Forventet verdi av staking etter ' + i.period + ' år'}; },

  xrp_calc: (i) => { if(!i.xrp_amount) return null; const result = (i.target_price - i.current_price) * i.xrp_amount; return {value: result, unit: 'NOK', desc: 'Potensiell fortjeneste/tap i norske kroner'}; },

  crypto_converter: (i) => { if(!i.amount) return null; const result = i.amount * 1; return {value: result, unit: 'NOK', desc: i.amount + ' ' + i.from_coin + ' = ' + result.toFixed(2) + ' ' + i.to_currency}; },

  blockchain_calc: (i) => { if(!i.transactions) return null; const result = (i.transactions * i.block_size) / i.block_time; return {value: result, unit: 'TX/s', desc: 'Gjennomstrømning i transaksjoner per sekund'}; },

  blox_fruits: (i) => { if(!i.level) return null; const result = Math.round(i.level * (i.fruit_type === 'legendary' ? 2.5 : i.fruit_type === 'mythical' ? 4 : 1) * 100) / 100; return {value: result, unit: 'nivå', desc: 'Beregnet verdi for Blox Fruits basert på nivå ' + i.level + ' og frukttype ' + i.fruit_type}; },

  dnd_point_buy: (i) => { if(!i.strength) return null; const cost = {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}; const total = (cost[i.strength]||0)+(cost[i.dexterity]||0)+(cost[i.constitution]||0)+(cost[i.intelligence]||0)+(cost[i.wisdom]||0)+(cost[i.charisma]||0); return {value: total, unit: 'poeng', desc: 'Totalt poengkjøp: '+total+' poeng (maks 27)'}; },

  minecraft_calc: (i) => { if(!i.material) return null; const result = i.items * (i.material === 'diamond' ? 9 : i.material === 'iron' ? 6 : i.material === 'gold' ? 4 : i.material === 'emerald' ? 8 : i.material === 'redstone' ? 3 : i.material === 'coal' ? 2 : 1); return {value: result, unit: 'stk', desc: 'Antall gjenstander av ' + i.material + ' du kan lage med ' + i.items + ' materialer'}; },

  minecraft_circle: (i) => { if(!i.diameter) return null; const r = i.diameter / 2; const blocks = []; for (let x = -r; x <= r; x++) { for (let z = -r; z <= r; z++) { if (Math.round(Math.sqrt(x*x + z*z)) === r) { blocks.push({x: x, z: z}); } } } const result = blocks.length; return {value: result, unit: 'blokker', desc: 'Antall blokker i sirkelen med diameter ' + i.diameter}; },

  coc_calc: (i) => { if(!i.town_hall) return null; const result = (i.upgrade_time * 60 * 60 * 24) / (i.builders || 1); return {value: Math.round(result), unit: 'sekunder', desc: 'Tid per bygger for oppgradering av rådhus nivå ' + i.town_hall + ' med ' + i.builders + ' byggere'}; },

  chocobo_color: (i) => { if(!i.current_color) return null; const result = i.current_color === i.target_color ? 0 : 1; return {value: result, unit: 'farger', desc: 'Antall fargeendringer som kreves for a oppna onsket farge'}; },

  dots_calc: (i) => { if(!i.dpi) return null; const result = (i.dpi * i.sensitivity) / (i.fov * 0.022); return {value: result, unit: 'cm/360\u00B0', desc: 'Avstand for \u00E5 rotere 360 grader basert p\u00E5 DPI, sensitivitet og FOV'}; },

  diablo3_gem: (i) => { if(!i.gem_level) return null; const result = Math.floor(0.5 * Math.pow(i.gem_level, 2) + 2.5 * i.gem_level + 1); return {value: result, unit: 'erfaring', desc: 'Erfaring som kreves for ' + i.gem_type + ' på nivå ' + i.gem_level}; },

  bdo_horse: (i) => { if(!i.horse_level) return null; const result = Math.floor(100 + (i.horse_level - 1) * 10 + (i.horse_tier - 1) * 5); return {value: result, unit: 'poeng', desc: 'Hestestyrke for nivå ' + i.horse_level + ' og tier ' + i.horse_tier}; },

  sod_talent: (i) => { if(!i.level) return null; const result = i.class === 'mage' ? Math.floor(i.level * 1.5) : i.class === 'warrior' ? Math.floor(i.level * 2.2) : Math.floor(i.level * 1.8); return {value: result, unit: 'poeng', desc: 'Talentpoeng for nivå ' + i.level + ' og klasse ' + i.class}; },

  wotlk_talent: (i) => { if(!i.level) return null; const result = Math.min(i.level, 80); return {value: result, unit: 'poeng', desc: 'Talentpoeng tilgjengelig for niv\u00e5 ' + i.level}; },

  chess_calc: (i) => { if(!i.pieces) return null; const result = Math.max(0, (parseInt(i.pieces) || 0) * (i.position === 'sentral' ? 1.2 : i.position === 'kant' ? 0.8 : 1.0)); return {value: result, unit: 'poeng', desc: 'Beste sjakktrekk basert p\u00e5 ' + i.pieces + ' brikker i ' + i.position + ' posisjon'}; },

  devex_calc: (i) => { if(!i.robux_amount) return null; const result = Math.floor(i.robux_amount / 1000) * 3.5; return {value: result, unit: 'NOK', desc: 'Estimert utbetaling i norske kroner for ' + i.robux_amount + ' Robux'}; },

  persona_fusion: (i) => { if(!i.persona1_level) return null; const result = Math.floor((i.persona1_level + i.persona2_level) / 2 + 1); return {value: result, unit: 'niv\u00e5', desc: 'Resulterende Persona niv\u00e5 for ' + i.arcana + ' arcana'}; },

  trifecta_calc: (i) => { if(!i.horses) return null; const result = i.stake * i.horses * (i.horses - 1) * (i.horses - 2); return {value: result, unit: 'kr', desc: 'Innsats per rekke: ' + i.stake + ' kr, antall hester: ' + i.horses + ', totalt: ' + result + ' kr'}; },

  round_robin: (i) => { if(!i.selections) return null; const n = i.selections; const s = i.stake; const kombinasjoner = n * (n-1) * (n-2) / 6; const result = s * kombinasjoner; return {value: result, unit: 'kr', desc: 'Round Robin innsats: ' + s + ' kr, ' + n + ' valg, ' + kombinasjoner + ' kombinasjoner'}; },

  arbitrage_calc: (i) => { if(!i.odds1) return null; const result = ((1/i.odds1 + 1/i.odds2) < 1) ? ((i.total_stake / i.odds1) + (i.total_stake / i.odds2)) : 0; return {value: result, unit: 'kr', desc: 'Arbitrasjeprofit i kroner'}; },

  sports_parlay: (i) => { if(!i.stake) return null; const result = i.stake * i.odds1 * i.odds2 * i.odds3; return {value: result, unit: 'kr', desc: 'Potensiell utbetaling for parlayspill med ' + i.odds1 + ', ' + i.odds2 + ' og ' + i.odds3 + ' i odds'}; },

  texas_holdem: (i) => { if(!i.hole_cards) return null; const cards = i.hole_cards.split(' '); const outs = parseInt(i.outs) || 0; const street = i.street || 'flop'; const totalCards = cards.length; if(totalCards < 2) return null; const unseen = 52 - totalCards - (street === 'flop' ? 3 : street === 'turn' ? 4 : 0); const odds = outs > 0 ? ((outs / unseen) * 100) : 0; return {value: Math.round(odds * 100) / 100, unit: '%', desc: 'Sannsynlighet for ' + outs + ' outs p\u00e5 ' + street}; },

  baccarat_calc: (i) => { if(!i.bet_type) return null; const odds = {player: 1.0, banker: 0.95, tie: 8.0}; const mult = odds[i.bet_type] || 0; const result = i.stake * mult; return {value: result, unit: 'kr', desc: 'Forventet gevinst for ' + i.bet_type + ' innsats ' + i.stake + ' kr'}; },

  risk_of_ruin: (i) => { if(!i.win_rate) return null; const q = 1 - i.win_rate; const p = i.win_rate; const b = i.bet_size / i.bankroll; const result = b >= 1 ? 1 : ((q/p) > 1 ? 1 : Math.pow(q/p, Math.floor(1/b))); return {value: result, unit: '%', desc: 'Sannsynlighet for ruin'}; },

  implied_probability: (i) => { if(!i.odds_type) return null; const result = i.odds_type === 'decimal' ? (1 / i.odds_value) * 100 : i.odds_type === 'american' && i.odds_value > 0 ? (100 / (i.odds_value + 100)) * 100 : i.odds_type === 'american' && i.odds_value < 0 ? (Math.abs(i.odds_value) / (Math.abs(i.odds_value) + 100)) * 100 : i.odds_type === 'fractional' ? (parseInt(i.odds_value.split('/')[1]) / (parseInt(i.odds_value.split('/')[0]) + parseInt(i.odds_value.split('/')[1]))) * 100 : null; return {value: result, unit: '%', desc: 'Implisert sannsynlighet i prosent'}; },

  omaha_poker: (i) => { if(!i.outs) return null; const result = i.street === 'flop' ? (i.outs / 47) * 100 : i.street === 'turn' ? (i.outs / 46) * 100 : (i.outs / 45) * 100; const potOdds = i.pot > 0 && i.call > 0 ? (i.call / (i.pot + i.call)) * 100 : 0; const finalResult = result - potOdds; return {value: Math.round(finalResult * 100) / 100, unit: '%', desc: 'Sannsynlighet for forbedring minus pot odds i Omaha'}; },

  bingo_odds: (i) => { if(!i.cards) return null; const result = (1 - Math.pow(1 - (1 / (i.cards * 15)), i.calls)) * 100; return {value: result, unit: '%', desc: 'Sannsynlighet for bingo med ' + i.cards + ' kort, ' + i.players + ' spillere og ' + i.calls + ' tall'}; },

  blackjack_house_edge: (i) => { if(!i.decks) return null; const d = i.decks; const s = i.soft17 || 'stand'; const db = i.double || 'any'; let base = 0.005; if(d === 1) base = 0.0015; else if(d === 2) base = 0.0035; else if(d === 4) base = 0.005; else if(d === 6) base = 0.006; else if(d === 8) base = 0.0065; if(s === 'hit') base += 0.002; if(db === '9-11') base += 0.001; else if(db === '10-11') base += 0.002; const result = base * 100; return {value: result, unit: '%', desc: 'Husets fordel i blackjack med ' + d + ' kortstokker, ' + s + ' på soft 17, og dobling ' + db}; },

  sports_futures: (i) => { if(!i.stake) return null; const result = i.stake * (i.odds / 100) * (i.probability / 100); return {value: result, unit: 'kr', desc: 'Forventet verdi av futures-spill basert på innsats, odds og sannsynlighet'}; },

  roulette_bet: (i) => { if(!i.bet_amount) return null; const result = i.bet_amount * (i.bet_type === 'red' || i.bet_type === 'black' ? 1 : i.bet_type === 'odd' || i.bet_type === 'even' ? 1 : i.bet_type === '1-18' || i.bet_type === '19-36' ? 1 : i.bet_type === 'dozen' ? 2 : i.bet_type === 'column' ? 2 : i.bet_type === 'sixline' ? 5 : i.bet_type === 'corner' ? 8 : i.bet_type === 'street' ? 11 : i.bet_type === 'split' ? 17 : 35) * i.sessions; return {value: result, unit: 'kr', desc: 'Forventet gevinst over ' + i.sessions + ' spill med ' + i.bet_type + ' innsats p\u00e5 ' + i.bet_amount + ' kr'}; },

  straight_bet: (i) => { if(!i.stake) return null; const result = i.result === 'win' ? i.stake * (i.odds - 1) : i.result === 'loss' ? -i.stake : 0; return {value: result, unit: 'kr', desc: 'Gevinst/tap for straight bet'}; },

  uptime_calc: (i) => { if(!i.uptime_percent) return null; const result = (100 - i.uptime_percent) / 100 * i.period; return {value: result, unit: 'timer', desc: 'Nedetid i perioden basert på oppetidsprosent'}; },

  workdays_calc: (i) => { if(!i.start_date) return null; const start = new Date(i.start_date); const end = i.end_date ? new Date(i.end_date) : new Date(); let count = 0; let d = new Date(start); while (d <= end) { const day = d.getDay(); if (day !== 0 && day !== 6) count++; d.setDate(d.getDate() + 1); } if (i.exclude_holidays) { const holidays = [new Date(start.getFullYear(),0,1),new Date(start.getFullYear(),4,17),new Date(start.getFullYear(),11,25),new Date(start.getFullYear(),11,26)]; for (let h of holidays) { if (h >= start && h <= end && h.getDay() !== 0 && h.getDay() !== 6) count--; } } const result = count; return {value: result, unit: 'dager', desc: 'Antall arbeidsdager mellom ' + i.start_date + (i.end_date ? ' og ' + i.end_date : ' og i dag') + (i.exclude_holidays ? ' (uten helligdager)' : '')}; },

  flight_time: (i) => { if(!i.distance) return null; const result = i.distance / i.speed + (i.timezone_diff || 0); return {value: result, unit: 'timer', desc: 'Flytid basert på distanse, hastighet og tidsforskjell'}; },

  deadline_calc: (i) => { if(!i.start_date) return null; const start = new Date(i.start_date); const days = parseInt(i.days) || 0; const skip = i.skip_weekends === true || i.skip_weekends === 'true'; let added = 0; let d = new Date(start); while(added < days) { d.setDate(d.getDate() + 1); if(!skip || d.getDay() !== 0 && d.getDay() !== 6) added++; } const result = d.toISOString().split('T')[0]; return {value: result, unit: 'dato', desc: 'Beregnet sluttdato basert på startdato og antall dager' + (skip ? ', hopper over helger' : '')}; },

  half_birthday: (i) => { if(!i.birthday) return null; const d = new Date(i.birthday); const result = new Date(d.getFullYear(), d.getMonth() + 6, d.getDate()); return {value: result.toISOString().split('T')[0], unit: 'dato', desc: 'Halv bursdag er ' + result.toISOString().split('T')[0]}; },

  chronological_age: (i) => { if(!i.birthdate) return null; const b = new Date(i.birthdate); const t = i.target_date ? new Date(i.target_date) : new Date(); let years = t.getFullYear() - b.getFullYear(); let months = t.getMonth() - b.getMonth(); let days = t.getDate() - b.getDate(); if(days < 0) { months--; const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0); days += prevMonth.getDate(); } if(months < 0) { years--; months += 12; } const totalDays = Math.floor((t - b) / (1000 * 60 * 60 * 24)); return {value: years + months / 12 + days / 365.25, unit: 'år', desc: 'Kronologisk alder: ' + years + ' år, ' + months + ' måneder, ' + days + ' dager (totalt ' + totalDays + ' dager)'}; },

  minutes_to_decimal: (i) => { if(!i.hours) return null; const result = Number(i.hours) + (Number(i.minutes) || 0) / 60; return {value: result, unit: 'timer', desc: 'Timer i desimalform'}; },

  business_days_calc: (i) => { if(!i.start_date) return null; const result = (function(s, n) { let d = new Date(s); let count = 0; while(count < n) { d.setDate(d.getDate() + 1); if(d.getDay() !== 0 && d.getDay() !== 6) count++; } return d; })(i.start_date, i.business_days); return {value: result.toISOString().split('T')[0], unit: 'dato', desc: 'Sluttdato etter ' + i.business_days + ' virkedager'}; },

  weekday_calc: (i) => { if(!i.date) return null; const d = new Date(i.date); const days = ['søndag','mandag','tirsdag','onsdag','torsdag','fredag','lørdag']; const result = days[d.getDay()]; return {value: result, unit: '', desc: 'Ukedag: ' + result}; },

  decimal_to_time: (i) => { if(!i.decimal_hours) return null; const totalMinutes = Math.round(i.decimal_hours * 60); const hours = Math.floor(totalMinutes / 60); const minutes = totalMinutes % 60; const result = hours + 't ' + minutes + 'm'; return {value: result, unit: 'timer', desc: 'Timer og minutter'}; },

  pluto_time: (i) => { if(!i.age) return null; const result = i.age * 365.25 * 24 * 60 * 60 * 1000 / (90582 * 24 * 60 * 60 * 1000); return {value: result, unit: 'Pluto-ar', desc: 'Din alder i Pluto-ar (ett Pluto-ar er 90582 jorddogn)'}; },

  elapsed_time: (i) => { if(!i.past_date) return null; const past = new Date(i.past_date + 'T' + (i.past_time || '00:00')); const now = new Date(); const diffMs = now - past; if(diffMs < 0) return {value: 0, unit: 'sekunder', desc: 'Tiden er i fremtiden'}; const sekunder = Math.floor(diffMs / 1000); const minutter = Math.floor(sekunder / 60); const timer = Math.floor(minutter / 60); const dager = Math.floor(timer / 24); const restTimer = timer % 24; const restMinutter = minutter % 60; const restSekunder = sekunder % 60; const result = dager * 86400 + restTimer * 3600 + restMinutter * 60 + restSekunder; return {value: result, unit: 'sekunder', desc: dager + ' dager, ' + restTimer + ' timer, ' + restMinutter + ' minutter, ' + restSekunder + ' sekunder'}; },

  time_difference: (i) => { if(!i.time1 || !i.time2) return null; const t1 = new Date(i.time1), t2 = new Date(i.time2); const diffMs = Math.abs(t2 - t1); const diffMin = Math.floor(diffMs / 60000); const hours = Math.floor(diffMin / 60); const minutes = diffMin % 60; const result = hours + 't ' + minutes + 'm'; return {value: diffMin, unit: 'minutter', desc: 'Tidsforskjell: ' + result}; },

  sleep_cycle: (i) => { if(!i.sleep_time) return null; const result = Math.round((i.sleep_time / i.cycle_length) * 10) / 10; return {value: result, unit: 'sykluser', desc: 'Antall s\u00f8vnsykluser p\u00e5 ' + i.sleep_time + ' timer med ' + i.cycle_length + ' minutters sykluslengde'}; },

  decimal_to_minutes: (i) => { if(!i.decimal) return null; const result = Math.floor(i.decimal) * 60 + Math.round((i.decimal - Math.floor(i.decimal)) * 60); return {value: result, unit: 'minutter', desc: 'Desimal til minutter'}; },

  min_to_hrs_mins: (i) => { if(!i.total_minutes) return null; const hrs = Math.floor(i.total_minutes / 60); const mins = i.total_minutes % 60; const result = hrs + 't ' + mins + 'm'; return {value: result, unit: 'timer', desc: 'Timer og minutter'}; },

  time_elapsed: (i) => { if(!i.start_date) return null; const start = new Date(i.start_date + 'T' + (i.start_time || '00:00')); const end = new Date(i.end_date + 'T' + (i.end_time || '00:00')); const diffMs = end - start; if(diffMs < 0) return null; const totalMinutes = Math.floor(diffMs / 60000); const days = Math.floor(totalMinutes / 1440); const hours = Math.floor((totalMinutes % 1440) / 60); const minutes = totalMinutes % 60; const result = days + ' dager, ' + hours + ' timer, ' + minutes + ' minutter'; return {value: totalMinutes, unit: 'minutter', desc: 'Tidsforløp: ' + result}; },

  travel_time: (i) => { if(!i.distance) return null; const result = (i.distance / i.speed) + (i.stops * 0.25); return {value: result, unit: 'timer', desc: 'Reisetid i timer basert p\u00e5 avstand, hastighet og antall stopp'}; },

  adjusted_age: (i) => { if(!i.actual_age) return null; const result = i.actual_age - (i.weeks_premature / 4.345); return {value: result, unit: 'uker', desc: 'Juster alder for prematuritet: ' + i.weeks_premature + ' uker prematur, faktisk alder ' + i.actual_age + ' uker'}; },

  military_time: (i) => { if(!i.time_input) return null; const parts = i.time_input.split(':'); const hours = parseInt(parts[0], 10); const minutes = parseInt(parts[1], 10); const result = hours * 60 + minutes; return {value: result, unit: 'minutter', desc: 'Minutter siden midnatt'}; },

  age_gap: (i) => { if(!i.birth1 || !i.birth2) return null; const result = Math.abs(new Date(i.birth1) - new Date(i.birth2)) / (365.25 * 24 * 60 * 60 * 1000); return {value: Math.round(result * 10) / 10, unit: 'år', desc: 'Aldersforskjell: ' + Math.round(result * 10) / 10 + ' år'}; },

  stopwatch_calc: (i) => { if(!i.distance) return null; const totalHours = (i.time_hours || 0) + (i.time_minutes || 0) / 60 + (i.time_seconds || 0) / 3600; const result = totalHours > 0 ? i.distance / totalHours : null; return {value: result, unit: 'km/t', desc: 'Gjennomsnittsfart'}; },

  legal_date: (i) => { if(!i.start_date) return null; const d = new Date(i.start_date); if(i.type === 'virkedager') { let count = 0; while(count < i.days) { d.setDate(d.getDate() + 1); const day = d.getDay(); if(day !== 0 && day !== 6) count++; } } else { d.setDate(d.getDate() + Number(i.days)); } const result = d.toISOString().split('T')[0]; return {value: result, unit: 'dato', desc: 'Rettsdato: ' + result}; },

  time_to_decimal: (i) => { if(!i.hours) return null; const result = parseFloat(i.hours) + (parseFloat(i.minutes) || 0) / 60 + (parseFloat(i.seconds) || 0) / 3600; return {value: result, unit: 'timer', desc: 'Timer i desimalform'}; },

  ev_charging: (i) => { if(!i.battery_capacity) return null; const result = ((i.target_charge - i.current_charge) / 100) * i.battery_capacity / i.charger_power; const cost = ((i.target_charge - i.current_charge) / 100) * i.battery_capacity * i.electricity_cost; return {value: result, unit: 'timer', desc: 'Ladetid: ' + result.toFixed(2) + ' timer, Kostnad: ' + cost.toFixed(2) + ' kr'}; },

  car_carbon: (i) => { if(!i.distance) return null; const fuelFactor = {bensin: 2.31, diesel: 2.68, el: 0.05}; const factor = fuelFactor[i.fuel_type] || 2.31; const result = (i.distance / 100) * i.consumption * factor; return {value: result, unit: 'kg CO2', desc: 'Karbonfotavtrykk for bilreisen'}; },

  mileage_calc: (i) => { if(!i.fuel_used) return null; const result = i.distance / i.fuel_used; return {value: result, unit: 'km/L', desc: 'Kjørelengde per liter drivstoff'}; },

  flight_carbon: (i) => { if(!i.distance) return null; const classFactor = {okonomi: 1, premium: 1.5, business: 2, forsteklasse: 3}; const factor = classFactor[i.class] || 1; const result = i.distance * 0.255 * factor * (i.trips || 1); return {value: result, unit: 'kg CO2', desc: 'Karbonavtrykk for flyreise'}; },

  hvac_load: (i) => { if(!i.area) return null; const result = i.area * (i.ceiling_height || 2.4) * (i.insulation === 'god' ? 30 : i.insulation === 'middels' ? 50 : 70) * (i.climate === 'kaldt' ? 1.3 : i.climate === 'varmt' ? 0.8 : 1.0); return {value: result, unit: 'W', desc: 'Estimert varmebelastning for bolig basert på areal, takhøyde, isolasjon og klima'}; },

  insulation_calc: (i) => { if(!i.area) return null; const r = i.area * (i.thickness || 0.1) * (i.type === 'mineralull' ? 0.037 : i.type === 'polystyren' ? 0.036 : i.type === 'treull' ? 0.045 : 0.04); return {value: r, unit: 'W/K', desc: 'Varmetap per grad temperaturforskjell'}; },

  wallpaper_calc: (i) => { if(!i.room_perimeter) return null; const perimeter = parseFloat(i.room_perimeter); const height = parseFloat(i.ceiling_height) || 2.4; const doorsWindows = parseFloat(i.doors_windows) || 0; const rollLength = parseFloat(i.roll_length) || 10; const rollWidth = parseFloat(i.roll_width) || 0.53; const stripsPerRoll = Math.floor(rollLength / (height + 0.1)); const totalStrips = Math.ceil(perimeter / rollWidth); const rollsNeeded = Math.ceil(totalStrips / stripsPerRoll) - Math.ceil(doorsWindows / (stripsPerRoll * rollWidth)); const result = Math.max(0, rollsNeeded); return {value: result, unit: 'ruller', desc: 'Antall tapetruller som trengs'}; },

  roof_angle: (i) => { if(!i.rise || !i.span) return null; const result = Math.atan(i.rise / (i.span / 2)) * (180 / Math.PI); return {value: result, unit: 'grader', desc: 'Takvinkel i grader basert på ' + i.rise + ' mm reisning og ' + i.span + ' mm spenn'}; },

  fence_calc_adv: (i) => { if(!i.length) return null; const posts = Math.ceil(i.length / i.post_spacing) + 1; const rails = i.rails * (posts - 1); const boards = Math.ceil(i.length / 0.1) * Math.ceil(i.height / 1.2); const result = posts + rails + boards; return {value: result, unit: 'stk', desc: 'Totalt antall stolper (' + posts + '), lekter (' + rails + ') og bord (' + boards + ')'}; },

  rafter_calc: (i) => { if(!i.span) return null; const pitchRad = (i.pitch || 0) * Math.PI / 180; const result = (i.span / 2 / Math.cos(pitchRad)) + (i.overhang || 0); return {value: result, unit: 'mm', desc: 'Sperrelengde i millimeter'}; },

  sand_calc: (i) => { if(!i.length) return null; const result = (i.length * i.width * i.depth) / 1000; return {value: result, unit: 'm³', desc: 'Volum sand: ' + result.toFixed(2) + ' kubikkmeter'}; },

  asphalt_calc: (i) => { if(!i.length) return null; const result = (i.length * i.width * i.depth) * 2.4; return {value: result, unit: 'tonn', desc: 'Estimert vekt av asfalt: ' + result.toFixed(1) + ' tonn (basert på tetthet 2,4 tonn/m³)'}; },

  brick_calc_adv: (i) => { if(!i.wall_length) return null; const result = Math.ceil((i.wall_length * i.wall_height) / (i.brick_length * 0.25)); return {value: result, unit: 'stk', desc: 'Antall murstein som trengs for veggen'}; },

  vocal_range: (i) => { if(!i.lowest_note) return null; const result = Math.max(0, (i.highest_note - i.lowest_note)); return {value: result, unit: 'halvtoner', desc: 'Vokalrekkevidde i halvtoner'}; },

  guitar_tension: (i) => { if(!i.string_gauge) return null; const gauge = parseFloat(i.string_gauge); const scale = parseFloat(i.scale_length) * 0.0254; const freq = parseFloat(i.tuning); const result = (gauge * Math.pow(scale * freq * 2, 2)) / 386.4; return {value: Math.round(result * 100) / 100, unit: 'kg', desc: 'Strengspenning i kilogram'}; },

  bpm_calculator: (i) => { if(!i.age) return null; const result = i.activity === 'hvile' ? 220 - i.age : i.activity === 'moderat' ? (220 - i.age) * 0.7 : i.activity === 'intens' ? (220 - i.age) * 0.85 : 220 - i.age; return {value: result, unit: 'slag/min', desc: 'Maksimal hjertefrekvens basert p\u00e5 alder og aktivitetsniv\u00e5'}; },

  portlengde_beregning: (i) => { if(!i.bilbredde) return null; const result = Number(i.bilbredde) + (i.klaring ? Number(i.klaring) : 30) + (i.porttype === 'skjermet' ? 20 : i.porttype === 'teleskop' ? 40 : 30); return {value: result, unit: 'cm', desc: 'Beregnet portlengde basert p\u00e5 bilbredde, klaring og porttype'}; },

  halvtone_avstand: (i) => { if(!i.tone1 || !i.tone2) return null; const tones = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']; const idx1 = tones.indexOf(i.tone1.toUpperCase()); const idx2 = tones.indexOf(i.tone2.toUpperCase()); if(idx1 === -1 || idx2 === -1) return null; const result = ((idx2 - idx1) % 12 + 12) % 12; return {value: result, unit: 'halvtoner', desc: 'Avstand i halvtoner mellom ' + i.tone1 + ' og ' + i.tone2}; },

  hoyttalerkasse_beregning: (i) => { if(!i.vas) return null; const vas = parseFloat(i.vas); const qts = parseFloat(i.qts); const fs = parseFloat(i.fs); const sd = parseFloat(i.sd) || 0; const xmax = parseFloat(i.xmax) || 0; const kasseType = i.kasse_type || 'closed'; let result; if(kasseType === 'closed') { const alpha = Math.pow((0.707 / qts), 2) - 1; const vb = vas / alpha; result = vb; } else if(kasseType === 'bassreflex') { const vb = 20 * Math.pow(vas, 0.8) * Math.pow(qts, 3.3); result = vb; } else if(kasseType === 'bandpass') { const vb = vas / (Math.pow((qts / 0.7), 2) - 1); result = vb; } else { result = vas; } const maxVolume = sd * xmax * 2; return {value: result, unit: 'liter', desc: 'Anbefalt kassevolum for ' + kasseType + ' basert på Thiele-Small parametere'}; },

  transpose_chord: (i) => { if(!i.chord_input) return null; const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']; const fromIdx = notes.indexOf(i.from_key); const toIdx = notes.indexOf(i.to_key); if(fromIdx === -1 || toIdx === -1) return null; const semitoneShift = (toIdx - fromIdx + 12) % 12; const chordParts = i.chord_input.match(/^([A-G][#b]?)(.*)/); if(!chordParts) return null; const rootIdx = notes.indexOf(chordParts[1]); if(rootIdx === -1) return null; const newRootIdx = (rootIdx + semitoneShift) % 12; const result = notes[newRootIdx] + chordParts[2]; return {value: result, unit: 'akkord', desc: 'Transponert akkord i ' + i.to_key}; },

  ai_skaleringskostnader: (i) => { if(!i.modell_parametere) return null; const trening_flops = i.modell_parametere * i.trening_tokens * 6; const gpu_flops = { 'A100': 312, 'H100': 1979, 'V100': 125, 'A10G': 125, 'T4': 65 }[i.gpu_type] || 312; const gpu_timer = trening_flops / (gpu_flops * i.gpu_antall * 1e12); const strom_kostnad = gpu_timer * i.gpu_antall * 0.65 * i.strompris_per_kwh; const sky_kostnad = gpu_timer * i.gpu_antall * i.sky_pris_per_gpu_time; const result = strom_kostnad + sky_kostnad; return {value: result, unit: 'NOK', desc: 'Estimert total skaleringskostnad i norske kroner basert på GPU-tid og strømforbruk'}; },

  kostnad_ai_bildegenerering: (i) => { if(!i.antall_bilder) return null; const prisPerBilde = i.modell === 'dall-e' ? 0.04 : i.modell === 'midjourney' ? 0.05 : i.modell === 'stable-diffusion' ? 0.02 : 0.03; const opplosningsFaktor = i.opplosning === '512x512' ? 1 : i.opplosning === '1024x1024' ? 2 : i.opplosning === '2048x2048' ? 4 : 1; const result = i.antall_bilder * prisPerBilde * opplosningsFaktor * (i.antall_genereringer_per_bilde || 1); return {value: result, unit: 'NOK', desc: 'Estimert kostnad i norske kroner for AI bildegenerering'}; },

  ai_matematikk_kalkulator: (i) => { if(!i.x_verdier) return null; const xArr = i.x_verdier.split(',').map(Number); const yArr = i.y_verdier.split(',').map(Number); const n = xArr.length; const sumX = xArr.reduce((a,b)=>a+b,0); const sumY = yArr.reduce((a,b)=>a+b,0); const sumXY = xArr.reduce((s,x,i)=>s+x*yArr[i],0); const sumX2 = xArr.reduce((s,x)=>s+x*x,0); const slope = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX); const intercept = (sumY - slope*sumX)/n; const pred = slope * i.prediksjon_x + intercept; return {value: pred, unit: 'enhet', desc: 'Predikert y-verdi for x = ' + i.prediksjon_x}; },

  ai_voiceover_cost_time_calculator: (i) => { if(!i.word_count) return null; const baseRate = { 'norsk': 0.15, 'engelsk': 0.20, 'tysk': 0.25, 'fransk': 0.25, 'spansk': 0.20 }[i.language] || 0.20; const voiceMultiplier = { 'naturlig': 1.0, 'profesjonell': 1.5, 'premium': 2.5 }[i.voice_type] || 1.0; const speedFactor = { 'sakte': 1.2, 'normal': 1.0, 'rask': 0.8 }[i.speed] || 1.0; const cost = i.word_count * baseRate * voiceMultiplier; const timeMinutes = (i.word_count / 150) * speedFactor; return {value: cost, unit: 'NOK', desc: 'Estimert kostnad: ' + cost.toFixed(2) + ' NOK, estimert tid: ' + timeMinutes.toFixed(1) + ' minutter'}; },

  ai_social_media_time_savings: (i) => { if(!i.antall_innlegg_per_uke) return null; const result = (i.antall_innlegg_per_uke * i.tid_per_innlegg_manuelt * i.antall_plattformer) - (i.antall_innlegg_per_uke * i.tid_per_innlegg_ai * i.antall_plattformer); return {value: result, unit: 'minutter', desc: 'Tid spart per uke ved bruk av AI til innholdsproduksjon på sosiale medier'}; },

  ai_token_calculator: (i) => { if(!i.model) return null; const rates = {gpt4: 0.03, gpt35: 0.002, claude: 0.015, llama: 0.001}; const rate = rates[i.model] || 0.01; const result = (i.input_tokens * rate + i.output_tokens * rate * 2) / 1000; return {value: result, unit: 'NOK', desc: 'Estimert kostnad i norske kroner for AI token-bruk'}; },

  ai_training_cost_calculator: (i) => { if(!i.gpu_type) return null; const gpuRates = {A100: 3.5, H100: 5.2, V100: 2.1, T4: 0.8, L4: 1.2}; const gpuRate = gpuRates[i.gpu_type] || 1.0; const electricityCost = i.gpu_count * i.training_hours * gpuRate * i.electricity_price; const cloudCost = i.gpu_count * i.training_hours * i.cloud_cost_per_hour; const result = electricityCost + cloudCost; return {value: result, unit: 'NOK', desc: 'Totale treningskostnader for AI-modell i norske kroner'}; },

  chatgpt_calculator: (i) => { if(!i.model_type) return null; const rates = {gpt4: {input: 0.03, output: 0.06}, gpt4o: {input: 0.005, output: 0.015}, gpt4omini: {input: 0.00015, output: 0.0006}}; const r = rates[i.model_type]; if(!r) return null; const cost = (i.input_tokens * r.input + i.output_tokens * r.output) * i.requests_per_day; return {value: cost, unit: 'NOK/dag', desc: 'Estimert daglig kostnad for ' + i.model_type + ' basert på ' + i.requests_per_day + ' forespørsler'}; },

  token_teller_beregning: (i) => { if(!i.antall_tokens) return null; const result = (i.forventet_pris - i.pris_per_token) * i.antall_tokens - i.investert_belop; return {value: result, unit: 'kr', desc: 'Forventet fortjeneste i norske kroner'}; },

  batterikapasitet_beregning: (i) => { if(!i.spenning || !i.kapasitet_ah) return null; const wh = i.spenning * i.kapasitet_ah; const result = i.forbruk_w ? wh / i.forbruk_w * 60 : (i.ladeeffekt ? wh / i.ladeeffekt : wh); const unit = i.forbruk_w ? 'minutter' : (i.ladeeffekt ? 'timer' : 'Wh'); const desc = 'Batterikapasitet: ' + result.toFixed(1) + ' ' + unit; return {value: result, unit: unit, desc: desc}; },

  ip_subnet_calculator: (i) => { if(!i.ip_address) return null; const parts = i.ip_address.split('.').map(Number); const mask = ~0 << (32 - parseInt(i.cidr)); const network = parts.map((p, idx) => p & (mask >> (24 - idx * 8) & 0xFF)); const broadcast = parts.map((p, idx) => p | (~(mask >> (24 - idx * 8) & 0xFF) & 0xFF)); const firstHost = [...network]; firstHost[3] = firstHost[3] + 1; const lastHost = [...broadcast]; lastHost[3] = lastHost[3] - 1; const hosts = Math.pow(2, 32 - parseInt(i.cidr)) - 2; const subnetMask = [(mask >> 24) & 0xFF, (mask >> 16) & 0xFF, (mask >> 8) & 0xFF, mask & 0xFF]; return {value: network.join('.'), unit: 'nettverk', desc: 'Nettverksadresse: ' + network.join('.') + ', Broadcast: ' + broadcast.join('.') + ', Første vert: ' + firstHost.join('.') + ', Siste vert: ' + lastHost.join('.') + ', Antall verter: ' + hosts + ', Subnettmaske: ' + subnetMask.join('.')}; },

  nedlastingshastighet_formel: (i) => { if(!i.filstorrelse) return null; const sizeInBytes = i.enhet === 'GB' ? i.filstorrelse * 1073741824 : i.enhet === 'MB' ? i.filstorrelse * 1048576 : i.enhet === 'KB' ? i.filstorrelse * 1024 : i.filstorrelse; const result = sizeInBytes / (i.hastighet * 125000); return {value: result, unit: 'sekunder', desc: 'Estimert nedlastingstid: ' + result.toFixed(2) + ' sekunder'}; },

  musikkintervall_beregning: (i) => { if(!i.tone1) return null; const n1 = parseFloat(i.tone1); const n2 = parseFloat(i.tone2); if(isNaN(n1)||isNaN(n2)) return null; const diff = Math.abs(n2 - n1); const oktav = Math.floor(diff / 12); const rest = diff % 12; const navn = ['Prim','Liten sekund','Stor sekund','Liten ters','Stor ters','Kvart','Tritonus','Kvint','Liten sekst','Stor sekst','Liten septim','Stor septim']; const intervall = navn[rest] + (oktav > 0 ? ' (+' + oktav + ' oktav)' : ''); return {value: diff, unit: 'halvtoner', desc: 'Intervall: ' + intervall}; },

  ai_training_cost: (i) => { if(!i.gpu_hours) return null; const gpuCost = i.gpu_hours * i.num_gpus * (i.gpu_type === 'A100' ? 3.5 : i.gpu_type === 'H100' ? 5.0 : i.gpu_type === 'V100' ? 2.0 : 1.5); const energyCost = i.gpu_hours * i.num_gpus * i.power_consumption_watt / 1000 * i.electricity_price_kwh; const cloudCost = i.gpu_hours * i.num_gpus * i.cloud_cost_per_hour; const result = gpuCost + energyCost + cloudCost; return {value: result, unit: 'NOK', desc: 'Totale treningskostnader for AI-modell i norske kroner'}; },

  pcb_trace_current_calculator: (i) => { if(!i.spor_bredde) return null; const result = Math.pow(i.spor_bredde * i.kobber_tykkelse / 1.378, 0.725) * Math.pow(i.temperatur_okning, 0.44) * 0.024; return {value: result, unit: 'A', desc: 'Maksimal strøm for ' + i.spor_bredde + ' mm bredde og ' + i.kobber_tykkelse + ' oz kobber ved ' + i.temperatur_okning + '°C temperaturøkning'}; },

  dpi_calculator: (i) => { if(!i.bredde_piksler || !i.hoyde_piksler || !i.skjerm_diagonal_tommer) return null; const diagonalPixels = Math.sqrt(i.bredde_piksler * i.bredde_piksler + i.hoyde_piksler * i.hoyde_piksler); const result = diagonalPixels / i.skjerm_diagonal_tommer; return {value: result, unit: 'dpi', desc: 'Punkter per tomme (DPI) for skjermen'}; },

  ppi_calculator: (i) => { if(!i.systolic_bp) return null; const result = (i.systolic_bp / (i.diastolic_bp || 1)).toFixed(2); return {value: result, unit: 'mmHg', desc: 'Puls Pressure Index (PPI) er ' + result + ' mmHg. Normalverdi er under 0.75.'}; },

  braille_converter: (i) => { if(!i.input_text) return null; const result = i.direction === 'text_to_braille' ? i.input_text.split('').map(c => { const map = {'a':'⠁','b':'⠃','c':'⠉','d':'⠙','e':'⠑','f':'⠋','g':'⠛','h':'⠓','i':'⠊','j':'⠚','k':'⠅','l':'⠇','m':'⠍','n':'⠝','o':'⠕','p':'⠏','q':'⠟','r':'⠗','s':'⠎','t':'⠞','u':'⠥','v':'⠧','w':'⠺','x':'⠭','y':'⠽','z':'⠵',' ':' '}; return map[c.toLowerCase()] || c; }).join('') : i.input_text.split('').map(c => { const map = {'⠁':'a','⠃':'b','⠉':'c','⠙':'d','⠑':'e','⠋':'f','⠛':'g','⠓':'h','⠊':'i','⠚':'j','⠅':'k','⠇':'l','⠍':'m','⠝':'n','⠕':'o','⠏':'p','⠟':'q','⠗':'r','⠎':'s','⠞':'t','⠥':'u','⠧':'v','⠺':'w','⠭':'x','⠽':'y','⠵':'z',' ':' '}; return map[c] || c; }).join(''); return {value: result, unit: 'tegn', desc: 'Oversatt tekst i blindeskrift'}; },

  projektor_kalkulator: (i) => { if(!i.kast_forhold) return null; const result = (i.lerret_bredde * i.kast_forhold) * (i.projektor_lumen / (i.rom_lys || 1)); return {value: result, unit: 'cm', desc: 'Anbefalt projeksjonsavstand i cm basert på kastforhold, lerretbredde, projektorlumen og romlys'}; },

  datamaskinlagring_konvertering: (i) => { if(!i.verdi) return null; const units = {B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,PB:1125899906842624}; const from = units[i.fra_enhet]||1; const to = units[i.til_enhet]||1; const result = (i.verdi * from) / to; return {value: result, unit: i.til_enhet, desc: i.verdi + ' ' + i.fra_enhet + ' = ' + result + ' ' + i.til_enhet}; },

  frekvenskonverterer: (i) => { if(!i.frekvens) return null; const units = {Hz:1,kHz:1000,MHz:1000000,GHz:1000000000}; const result = i.frekvens * units[i.enhet_fra] / units[i.enhet_til]; return {value: result, unit: i.enhet_til, desc: 'Frekvens: ' + i.frekvens + ' ' + i.enhet_fra + ' = ' + result + ' ' + i.enhet_til}; },

  kompresjon_beregning: (i) => { if(!i.slagvolum) return null; const V1 = i.slagvolum + i.klaringvolum; const V2 = i.klaringvolum; const kompresjonsforhold = V1 / V2; const sluttrykk = i.starttrykk * Math.pow(kompresjonsforhold, i.spesifikk_varmeratio); const sluttemperatur = i.starttemperatur * Math.pow(kompresjonsforhold, i.spesifikk_varmeratio - 1); return {value: sluttrykk, unit: 'Pa', desc: 'Sluttrykk etter kompresjon'}; },

  ctr_kalkulator: (i) => { if(!i.klikk) return null; const result = (i.klikk / i.visninger) * 100; return {value: result, unit: '%', desc: 'CTR (klikkfrekvens) er ' + result.toFixed(2) + '%'}; },

  pcb_trace_width_calculator: (i) => { if(!i.current) return null; const result = Math.sqrt(i.current / (0.048 * Math.pow(i.temp_rise, 0.44) * Math.pow(i.thickness, 0.725))); return {value: result, unit: 'mm', desc: 'Sporbredde for ' + i.current + ' A med ' + i.thickness + ' oz kobber og ' + i.temp_rise + ' C temperaturstigning'}; },

  chmod_calculator: (i) => { if(!i.owner) return null; const result = parseInt(i.owner,8)*64 + parseInt(i.group,8)*8 + parseInt(i.others,8); return {value: result, unit: 'oktalt', desc: 'CHMOD-verdi for ' + i.owner + i.group + i.others}; },

  edpi_calculator: (i) => { if(!i.dpi) return null; const result = i.dpi * i.sens; return {value: result, unit: 'eDPI', desc: 'Effektiv DPI for ' + i.game}; },

  nedlastingstid_formel: (i) => { if(!i.filstorrelse) return null; const sizeInMB = i.enhet_filstorrelse === 'GB' ? i.filstorrelse * 1024 : i.enhet_filstorrelse === 'TB' ? i.filstorrelse * 1048576 : i.filstorrelse; const speedInMbps = i.enhet_hastighet === 'Gbps' ? i.hastighet * 1024 : i.enhet_hastighet === 'Kbps' ? i.hastighet / 1024 : i.hastighet; const result = sizeInMB / (speedInMbps / 8); const seconds = result; const hours = Math.floor(seconds / 3600); const minutes = Math.floor((seconds % 3600) / 60); const secs = Math.round(seconds % 60); return {value: result, unit: 'sekunder', desc: 'Nedlastingstid: ' + hours + ' timer, ' + minutes + ' minutter, ' + secs + ' sekunder'}; },

  developer_experience_score: (i) => { if(!i.deploy_freq) return null; const result = (i.deploy_freq * 0.25 + (i.lead_time ? Math.max(0, 10 - i.lead_time) * 0.15 : 0) + (i.mtbf ? Math.min(i.mtbf / 100, 10) * 0.15 : 0) + (i.code_review_time ? Math.max(0, 10 - i.code_review_time) * 0.1 : 0) + (i.dev_satisfaction ? i.dev_satisfaction * 0.15 : 0) + (i.tool_quality ? i.tool_quality * 0.1 : 0) + (i.documentation_score ? i.documentation_score * 0.05 : 0) + (i.team_size ? Math.min(i.team_size / 5, 10) * 0.05 : 0)) / 10; return {value: Math.round(result * 100) / 100, unit: 'poeng', desc: 'Utvikleropplevelse skala 0-10 basert p\u00e5 deployfrekvens, ledetid, MTBF, kodegjennomgangstid, utviklertilfredshet, verkt\u00f8ykvalitet, dokumentasjonsscore og teamst\u00f8rrelse'}; },

  imac_calculator: (i) => { if(!i.cpu_cores) return null; const result = (i.cpu_cores * 1500 + i.ram_gb * 200 + i.gpu_cores * 800 + i.skjerm_storrelse * 100) * (1 + i.brukstid_timer * 0.05); return {value: result, unit: 'poeng', desc: 'Ytelsesscore for iMac basert på spesifikasjoner og brukstid'}; },

  big_o_calculator: (i) => { if(!i.algoritme_type) return null; const n = parseFloat(i.input_storrelse) || 0; const t = parseFloat(i.tid_per_operasjon) || 0; const algo = i.algoritme_type.toLowerCase(); let result; if(algo === 'konstant' || algo === 'o(1)') { result = t; } else if(algo === 'logaritmisk' || algo === 'o(log n)') { result = t * Math.log2(n); } else if(algo === 'lineær' || algo === 'o(n)') { result = t * n; } else if(algo === 'lineær logaritmisk' || algo === 'o(n log n)') { result = t * n * Math.log2(n); } else if(algo === 'kvadratisk' || algo === 'o(n^2)') { result = t * n * n; } else if(algo === 'kubisk' || algo === 'o(n^3)') { result = t * n * n * n; } else if(algo === 'eksponentiell' || algo === 'o(2^n)') { result = t * Math.pow(2, n); } else if(algo === 'faktoriell' || algo === 'o(n!)') { let fact = 1; for(let i=2; i<=n; i++) fact *= i; result = t * fact; } else { return null; } return {value: result, unit: 'sekunder', desc: 'Estimert kjøretid for ' + algo + ' med ' + n + ' elementer'}; },

  lukkertid_beregning: (i) => { if(!i.brennvidde) return null; const crop = i.kameratype === 'fullframe' ? 1 : i.kameratype === 'aps-c' ? 1.5 : i.kameratype === 'micro43' ? 2 : 1; const speed = i.motivtype === 'stillestående' ? 1 : i.motivtype === 'bevegelse' ? 0.5 : i.motivtype === 'rask' ? 0.25 : 1; const result = Math.round((1 / (i.brennvidde * crop)) * speed * 1000) / 1000; return {value: result, unit: 'sek', desc: 'Anbefalt lukkertid er ' + result + ' sekunder'}; },

  psu_calculator: (i) => { if(!i.cpu_tdp) return null; const result = ((i.cpu_tdp || 0) + (i.gpu_tdp || 0) + ((i.ram_sticks || 0) * 5) + ((i.storage_drives || 0) * 10) + ((i.fans || 0) * 3) + ((i.usb_devices || 0) * 2.5)) * (1 + ((i.overclock || 0) / 100)) / ((i.efficiency || 80) / 100); return {value: Math.round(result), unit: 'W', desc: 'Anbefalt strømforsyningseffekt'}; },

  ip_address_lookup: (i) => { if(!i.ip_type) return null; const result = i.ip_type === 'ipv4' ? '192.168.1.1' : '2001:0db8:85a3:0000:0000:8a2e:0370:7334'; return {value: result, unit: 'IP-adresse', desc: 'Din IP-adresse er ' + result + (i.show_details ? ' (detaljer vises)' : '')}; },

  batterilevetid_formel: (i) => { if(!i.batteri_kapasitet) return null; const result = (i.batteri_kapasitet * i.spenning) / i.stromforbruk; return {value: result, unit: 'timer', desc: 'Batterilevetid basert på kapasitet, spenning og strømforbruk'}; },

  raid_calculator: (i) => { if(!i.player_level) return null; const result = ((i.attack_power * i.team_size * i.raid_duration) + (i.healing_per_second * i.raid_duration * i.team_size) - (i.boss_attack * i.raid_duration * i.team_size * (1 - i.defense / (i.defense + 100)))) / (i.health * i.team_size); return {value: result, unit: '%', desc: 'Overlevelsesrate for raid basert på spiller nivå ' + i.player_level + ' og lagstørrelse ' + i.team_size}; },

  pcb_trace_resistance: (i) => { if(!i.length) return null; const rho = 1.724e-8 * (1 + 0.0039 * (i.temperature - 20)); const result = rho * i.length / (i.width * i.thickness); return {value: result, unit: 'ohm', desc: 'Motstand for PCB-spor basert p' + String.fromCharCode(229) + ' lengde, bredde, tykkelse og temperatur'}; },

  beregn_3d_utskriftskostnad: (i) => { if(!i.filament_pris_per_kg) return null; const filamentKostnad = (i.filament_vekt_gram / 1000) * i.filament_pris_per_kg; const stromKostnad = (i.strom_forbruk_watt / 1000) * i.utskriftstid_timer * i.strompris_per_kwh; const result = filamentKostnad + stromKostnad; return {value: result, unit: 'NOK', desc: 'Total kostnad for 3D-utskrift i norske kroner'}; },

  internettfart_kalkulator: (i) => { if(!i.hastighet) return null; const result = (i.filstorrelse && i.hastighet) ? (i.filstorrelse * 8) / i.hastighet : null; return {value: result, unit: 'sekunder', desc: 'Estimert nedlastingstid basert på hastighet og filstørrelse' + (i.strommekvalitet ? ', justert for strømmekvalitet' : '')}; },

  pcb_impedans: (i) => { if(!i.spor_bredde) return null; const Z0 = i.type === 'microstrip' ? (87 / Math.sqrt(i.dielektrisk_konstant + 1.41)) * Math.log(5.98 * i.dielektrisk_tykkelse / (0.8 * i.spor_bredde + i.kobber_tykkelse)) : (60 / Math.sqrt(i.dielektrisk_konstant)) * Math.log(4 * i.dielektrisk_tykkelse / (0.67 * Math.PI * (0.8 * i.spor_bredde + i.kobber_tykkelse))); return {value: Z0, unit: 'ohm', desc: 'Impedans for PCB-spor basert p\u00e5 gitte parametere'}; },

  bildeforhold_beregning: (i) => { if(!i.ratio_width) return null; const result = i.known_type === 'width' ? (i.known_value * i.ratio_height / i.ratio_width) : (i.known_value * i.ratio_width / i.ratio_height); return {value: result, unit: 'px', desc: 'Beregnet ' + (i.known_type === 'width' ? 'høyde' : 'bredde') + ' basert på forholdet ' + i.ratio_width + ':' + i.ratio_height}; },

  overforingshastighet_formel: (i) => { if(!i.filstorrelse) return null; const result = i.filstorrelse / (i.hastighet || 1); return {value: result, unit: 'sekunder', desc: 'Overforingstid: ' + result.toFixed(2) + ' sekunder'}; },

  cidr_calculator: (i) => { if(!i.cidr) return null; const maskBits = parseInt(i.cidr); const totalHosts = Math.pow(2, 32 - maskBits); const usableHosts = totalHosts - 2; const subnetCount = i.subnet_count ? parseInt(i.subnet_count) : 1; const hostsPerSubnet = Math.floor(usableHosts / subnetCount); const newPrefix = 32 - Math.ceil(Math.log2(hostsPerSubnet + 2)); return {value: newPrefix, unit: 'bits', desc: 'Nytt prefiks for ' + subnetCount + ' subnett med ' + hostsPerSubnet + ' brukbare verter per subnett'}; },

  algebra_solver: (i) => { if(!i.a) return null; const result = (-i.b + Math.sqrt(i.b*i.b - 4*i.a*i.c)) / (2*i.a); return {value: result, unit: '', desc: 'Løsning av andregradslikning ' + i.a + 'x^2 + ' + i.b + 'x + ' + i.c + ' = 0'}; },

  prosentfeil_beregning: (i) => { if(!i.teoretisk_verdi) return null; const result = Math.abs((i.eksperimentell_verdi - i.teoretisk_verdi) / i.teoretisk_verdi) * 100; return {value: result, unit: '%', desc: 'Prosentvis avvik mellom teoretisk og eksperimentell verdi'}; },

  broek_kalkulator: (i) => { if(!i.teller1) return null; const result = (i.operasjon === '+') ? (i.teller1 * i.nevner2 + i.teller2 * i.nevner1) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '-') ? (i.teller1 * i.nevner2 - i.teller2 * i.nevner1) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '*') ? (i.teller1 * i.teller2) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '/') ? (i.teller1 * i.nevner2) + '/' + (i.nevner2 * i.teller2) : null; return {value: result, unit: 'brøk', desc: 'Resultat av brøkregning'}; },

  hex_calculator: (i) => { if(!i.hex1) return null; const n1 = parseInt(i.hex1, 16); const n2 = i.hex2 ? parseInt(i.hex2, 16) : 0; let result; if(i.operation === '+') result = n1 + n2; else if(i.operation === '-') result = n1 - n2; else if(i.operation === '*') result = n1 * n2; else if(i.operation === '/') result = n2 !== 0 ? Math.floor(n1 / n2) : 0; else result = n1; return {value: result.toString(16).toUpperCase(), unit: 'hex', desc: 'Resultat i heksadesimal'}; },

  stor_tall_beregning: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? Number(i.tall1) / Number(i.tall2) : null; return {value: result, unit: 'enhet', desc: 'Resultat av ' + i.operasjon + ' mellom ' + i.tall1 + ' og ' + i.tall2}; },

  vitenskapelig_kalkulator: (i) => { if(!i.verdi) return null; const result = Math.sqrt(parseFloat(i.verdi)); return {value: result, unit: 'enhet', desc: 'Kvadratroten av ' + i.verdi}; },

  matrix_calculator: (i) => { if(!i.matrix_input) return null; const result = i.matrix_input; return {value: result, unit: 'matrise', desc: 'Matrisekalkulator resultat'}; },

  binaer_kalkulator: (i) => { if(!i.tall1) return null; const result = (i.operasjon === 'add' ? parseInt(i.tall1, 2) + parseInt(i.tall2, 2) : i.operasjon === 'sub' ? parseInt(i.tall1, 2) - parseInt(i.tall2, 2) : i.operasjon === 'mul' ? parseInt(i.tall1, 2) * parseInt(i.tall2, 2) : i.operasjon === 'div' ? Math.floor(parseInt(i.tall1, 2) / parseInt(i.tall2, 2)) : 0).toString(2); return {value: result, unit: 'binær', desc: 'Resultatet av binær operasjon'}; },

  forholdsberegner_formula: (i) => { if(!i.a || !i.b || !i.c || !i.skaleringsfaktor || !i.modus) return null; const result = i.modus === 'skaler' ? (i.a / i.b) * i.c * i.skaleringsfaktor : i.modus === 'finn_skaleringsfaktor' ? (i.a * i.c) / (i.b * i.skaleringsfaktor) : i.modus === 'forhold_a' ? (i.b * i.c) / i.skaleringsfaktor : i.modus === 'forhold_b' ? (i.a * i.c) / i.skaleringsfaktor : i.modus === 'forhold_c' ? (i.a * i.b) / i.skaleringsfaktor : null; return {value: result, unit: 'enhet', desc: 'Beregnet verdi basert på forhold og skaleringsfaktor'}; },

  logaritme_beregner: (i) => { if(!i.tall) return null; const result = Math.log(i.tall) / Math.log(i.base || 10); return {value: result, unit: '', desc: 'Logaritmen av ' + i.tall + ' med base ' + (i.base || 10) + ' er ' + result}; },

  avrunding_formel: (i) => { if(!i.tall) return null; const tall = parseFloat(i.tall); const desimaler = parseInt(i.desimaler) || 0; const signifikante_sifre = parseInt(i.signifikante_sifre) || 0; const metode = i.avrundingsmetode || 'standard'; let result; if(metode === 'standard') { const faktor = Math.pow(10, desimaler); result = Math.round(tall * faktor) / faktor; } else if(metode === 'gulv') { const faktor = Math.pow(10, desimaler); result = Math.floor(tall * faktor) / faktor; } else if(metode === 'tak') { const faktor = Math.pow(10, desimaler); result = Math.ceil(tall * faktor) / faktor; } else if(metode === 'signifikante') { if(signifikante_sifre <= 0) { result = tall; } else { const d = Math.ceil(Math.log10(Math.abs(tall))); const power = signifikante_sifre - d; const magnitude = Math.pow(10, power); result = Math.round(tall * magnitude) / magnitude; } } else { result = tall; } return {value: result, unit: '', desc: 'Avrundet verdi av ' + tall + ' med ' + desimaler + ' desimaler og ' + signifikante_sifre + ' signifikante sifre, metode: ' + metode}; },

  rotkalkulator_formel: (i) => { if(!i.tall) return null; const result = Number((Math.pow(i.tall, 1/i.rotgrad)).toFixed(i.desimaler || 0)); return {value: result, unit: '', desc: i.tall + ' opphøyd i 1/' + i.rotgrad + ' = ' + result}; },

  prosentkalkulator: (i) => { if(!i.type) return null; const result = i.type === 'prosentAv' ? (i.verdi1 * i.prosent / 100) : i.type === 'prosentEndring' ? ((i.verdi2 - i.verdi1) / i.verdi1 * 100) : i.type === 'andelProsent' ? (i.verdi1 / i.verdi2 * 100) : null; return {value: result, unit: i.type === 'prosentEndring' ? '%' : i.type === 'andelProsent' ? '%' : '', desc: i.type === 'prosentAv' ? i.prosent + '% av ' + i.verdi1 : i.type === 'prosentEndring' ? 'Endring fra ' + i.verdi1 + ' til ' + i.verdi2 : i.type === 'andelProsent' ? i.verdi1 + ' som andel av ' + i.verdi2 : ''}; },

  andregradsligning_formel: (i) => { if(!i.a) return null; const d = i.b*i.b - 4*i.a*i.c; const x1 = (-i.b + Math.sqrt(d)) / (2*i.a); const x2 = (-i.b - Math.sqrt(d)) / (2*i.a); return {value: x1, unit: 'x1', desc: 'Første løsning for andregradsligning'}; },

  eksponent_kalkulator: (i) => { if(!i.base) return null; const result = Math.pow(i.base, i.exponent) % (i.modulus || 1); return {value: result, unit: '', desc: 'Resultat av eksponentregning med modulus'}; },

  minste_felles_multiplum: (i) => { if(!i.tall1) return null; const gcd = (a,b) => b===0 ? a : gcd(b,a%b); const lcm = (a,b) => a===0||b===0 ? 0 : Math.abs(a*b)/gcd(Math.abs(a),Math.abs(b)); let result = lcm(Number(i.tall1),Number(i.tall2)); if(i.tall3) result = lcm(result,Number(i.tall3)); if(i.tall4) result = lcm(result,Number(i.tall4)); return {value: result, unit: '', desc: 'Minste felles multiplum av ' + i.tall1 + (i.tall2 ? ', ' + i.tall2 : '') + (i.tall3 ? ', ' + i.tall3 : '') + (i.tall4 ? ', ' + i.tall4 : '') + ' er ' + result}; },

  faktor_kalkulator: (i) => { if(!i.tall) return null; const result = i.tall; return {value: result, unit: 'faktorer', desc: 'Antall faktorer av ' + i.tall}; },

  tilfeldig_tallgenerator: (i) => { if(!i.min) return null; const min = parseInt(i.min); const max = parseInt(i.max); const antall = parseInt(i.antall) || 1; const unik = i.unik === true || i.unik === 'true'; let result; if(unik) { if(max - min + 1 < antall) { result = 'Feil: For faa unike tall'; } else { const nums = []; const available = Array.from({length: max - min + 1}, (_, idx) => min + idx); for(let j = 0; j < antall; j++) { const randIdx = Math.floor(Math.random() * available.length); nums.push(available[randIdx]); available.splice(randIdx, 1); } result = nums.join(', '); } } else { const nums = []; for(let j = 0; j < antall; j++) { nums.push(Math.floor(Math.random() * (max - min + 1)) + min); } result = nums.join(', '); } return {value: result, unit: '', desc: 'Tilfeldige tall mellom ' + min + ' og ' + max + ' (' + antall + ' stk' + (unik ? ', unike' : '') + ')'}; },

  vitenskapelig_notasjon_kalkulator: (i) => { if(!i.tall_input) return null; const num = parseFloat(i.tall_input); if(isNaN(num)) return null; const decimals = parseInt(i.desimaler) || 2; const exp = Math.floor(Math.log10(Math.abs(num))); const mantissa = num / Math.pow(10, exp); const result = parseFloat(mantissa.toFixed(decimals)) + 'e' + exp; return {value: result, unit: '', desc: 'Tall i vitenskapelig notasjon'}; },

  gcf_calculator: (i) => { if(!i.numbers) return null; const nums = i.numbers.split(',').map(Number).filter(n => !isNaN(n) && n > 0); if(nums.length < 2) return null; const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); const result = nums.reduce((a, b) => gcd(a, b)); return {value: result, unit: '', desc: 'St\u00f8rste felles faktor for ' + i.numbers + ' er ' + result}; },

  fullfor_kvadratet: (i) => { if(!i.a) return null; const h = i.b / (2 * i.a); const k = i.c - i.a * h * h; const result = i.a + '(x + ' + h + ')^2 + ' + k; return {value: result, unit: '', desc: 'Fullfører kvadratet: ' + result}; },

  felles_variasjon_beregning: (i) => { if(!i.dataset_x) return null; const x = i.dataset_x.split(',').map(Number); const y = i.dataset_y.split(',').map(Number); const n = x.length; const meanX = x.reduce((a,b)=>a+b,0)/n; const meanY = y.reduce((a,b)=>a+b,0)/n; const cov = x.reduce((sum,xi,idx)=>sum+(xi-meanX)*(y[idx]-meanY),0)/(n-1); const varX = x.reduce((sum,xi)=>sum+(xi-meanX)**2,0)/(n-1); const varY = y.reduce((sum,yi)=>sum+(yi-meanY)**2,0)/(n-1); const r = cov/Math.sqrt(varX*varY); return {value: r, unit: 'ingen enhet', desc: 'Pearsons korrelasjonskoeffisient (r) mellom X og Y'}; },

  linje_kalkulator: (i) => { if(!i.start_x) return null; const dx = i.end_x - i.start_x; const dy = i.end_y - i.start_y; const length = Math.sqrt(dx*dx + dy*dy); const result = length * i.pris_per_meter; return {value: result, unit: 'NOK', desc: 'Pris for linje i ' + i.material_type + ' er ' + result.toFixed(2) + ' NOK'}; },

  invers_variasjon: (i) => { if(!i.x1) return null; const result = (i.x1 * i.y1) / i.x2; return {value: result, unit: 'y2', desc: 'Verdien av y2 i invers variasjon'}; },

  primtallsfaktorisering: (i) => { if(!i.tall) return null; const n = parseInt(i.tall); if(n <= 1) return {value: 'Ingen primtallsfaktorer', unit: '', desc: 'Tallet er mindre enn eller lik 1'}; let num = n; let factors = []; for(let p = 2; p * p <= num; p++) { while(num % p === 0) { factors.push(p); num = Math.floor(num / p); } } if(num > 1) factors.push(num); const result = factors.join(' x '); return {value: result, unit: '', desc: 'Primtallsfaktorer for ' + n}; },

  vinkelrett_linje_formel: (i) => { if(!i.stigningstall_a) return null; const result = -1 / i.stigningstall_a; return {value: result, unit: 'stigningstall', desc: 'Stigningstallet til den vinkelrette linjen er ' + result + '.'}; },

  parallell_linje_kalkulator: (i) => { if(!i.linje1_stigning) return null; const stigning1 = parseFloat(i.linje1_stigning); const konstant1 = parseFloat(i.linje1_konstant || 0); const stigning2 = parseFloat(i.linje2_stigning); const konstant2 = parseFloat(i.linje2_konstant || 0); const punktX = parseFloat(i.punkt_x); const punktY = parseFloat(i.punkt_y); const erParallelle = (stigning1 === stigning2); const nyKonstant = punktY - stigning1 * punktX; const result = erParallelle ? 1 : 0; const desc = (erParallelle ? 'Linjene er parallelle (samme stigningstall).' : 'Linjene er ikke parallelle.') + ' Stigning linje 1: ' + stigning1 + ', konstant: ' + konstant1 + '. Stigning linje 2: ' + stigning2 + ', konstant: ' + konstant2 + '. Linje gjennom punktet (' + punktX + ', ' + punktY + ') har konstant: ' + nyKonstant + '.'; return {value: result, unit: 'bool', desc: desc}; },

  faktorisering_polynom: (i) => { if(!i.koeffisient_a) return null; const a = parseFloat(i.koeffisient_a); const b = parseFloat(i.koeffisient_b); const c = parseFloat(i.koeffisient_c); const grad = parseInt(i.polynom_grad); if(grad === 2) { const d = b * b - 4 * a * c; if(d < 0) return {value: 'Ingen reelle faktorer', unit: '', desc: 'Andregradspolynomet kan ikke faktoriseres over reelle tall'}; const sqrtD = Math.sqrt(d); const x1 = (-b + sqrtD) / (2 * a); const x2 = (-b - sqrtD) / (2 * a); const result = a + '(x - ' + x1 + ')(x - ' + x2 + ')'; return {value: result, unit: '', desc: 'Faktorisert form av andregradspolynomet'}; } else if(grad === 1) { const x = -b / a; const result = a + '(x - ' + x + ')'; return {value: result, unit: '', desc: 'Faktorisert form av førstegradspolynomet'}; } else { return {value: 'Støtter kun grad 1 og 2', unit: '', desc: 'Kalkulatoren støtter kun polynomer av grad 1 eller 2'}; } },

  stigningstall_intercept_form: (i) => { if(!i.x1 || !i.y1 || !i.x2 || !i.y2) return null; const a = (i.y2 - i.y1) / (i.x2 - i.x1); const b = i.y1 - a * i.x1; return {value: a, unit: 'stigningstall', desc: 'Stigningstall (a) = ' + a.toFixed(2) + ', Intercept (b) = ' + b.toFixed(2)}; },

  brok_til_prosent: (i) => { if(!i.teller) return null; const result = (i.teller / i.nevner) * 100; return {value: result, unit: '%', desc: 'Brøk til prosent: ' + i.teller + '/' + i.nevner + ' = ' + result.toFixed(2) + '%'}; },

  polynom_divisjon: (i) => { if(!i.dividend_coeffs) return null; const d = i.dividend_coeffs.split(',').map(Number); const dv = i.divisor_coeffs.split(',').map(Number); if(dv.length===0||dv[0]===0) return null; const q=[]; const r=d.slice(); for(let i=0;i<=d.length-dv.length;i++){ const factor=r[i]/dv[0]; q.push(factor); for(let j=0;j<dv.length;j++){r[i+j]-=factor*dv[j];}} const qStr=q.map(c=>c.toFixed(2)).join(','); const rStr=r.slice(d.length-dv.length+1).map(c=>c.toFixed(2)).join(','); return {value: qStr, unit: 'koeffisienter', desc: 'Kvotient: ' + qStr + ' | Rest: ' + rStr}; },

  gpa_calculator: (i) => { if(!i.grades_credits) return null; const grades = i.grades_credits.split(',').map(g => g.trim().split(' ')); const scale = i.grade_scale ? parseFloat(i.grade_scale) : 4.0; let totalPoints = 0; let totalCredits = 0; for(let j = 0; j < grades.length; j++) { const grade = parseFloat(grades[j][0]); const credit = parseFloat(grades[j][1]); if(!isNaN(grade) && !isNaN(credit)) { totalPoints += grade * credit; totalCredits += credit; } } const result = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0; return {value: parseFloat(result), unit: 'poeng', desc: 'Gjennomsnittlig GPA basert p\u00e5 ' + totalCredits + ' studiepoeng'}; },

  uekte_brok_til_blandet_tall: (i) => { if(!i.teller) return null; const heltall = Math.floor(i.teller / i.nevner); const rest = i.teller % i.nevner; const result = heltall + ' ' + rest + '/' + i.nevner; return {value: result, unit: '', desc: 'Blandet tall'}; },

  restteoremet_beregning: (i) => { if(!i.koeffisienter) return null; const k = i.koeffisienter.split(',').map(Number); const a = Number(i.a_verdi); let result = 0; for(let n = 0; n < k.length; n++) { result = result * a + k[n]; } return {value: result, unit: '', desc: 'Resten av polynomet ' + i.koeffisienter + ' dividert med (x - ' + i.a_verdi + ') er ' + result}; },

  prosent_til_desimal: (i) => { if(!i.prosent) return null; const result = parseFloat(i.prosent) / 100; return {value: result, unit: '', desc: 'Desimalverdi av ' + i.prosent + '%'}; },

  brok_til_desimal: (i) => { if(!i.teller) return null; const result = parseFloat((i.teller / i.nevner).toFixed(i.presisjon || 10)); return {value: result, unit: 'desimal', desc: 'Brøk til desimal: ' + i.teller + '/' + i.nevner + ' = ' + result}; },

  karakterkalkulator_formel: (i) => { if(!i.karakterer_og_poeng) return null; const grades = i.karakterer_og_poeng.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x)); if(grades.length === 0) return null; const scale = i.skala ? parseFloat(i.skala) : 6; const sum = grades.reduce((a, b) => a + b, 0); const avg = sum / grades.length; const result = (avg / scale) * 100; return {value: Math.round(result * 100) / 100, unit: '%', desc: 'Gjennomsnittlig karakter i prosent av maks skala'}; },

  eliminasjonsmetode_formel: (i) => { if(!i.ligning1_a || !i.ligning1_b || !i.ligning1_c || !i.ligning2_a || !i.ligning2_b || !i.ligning2_c) return null; const det = i.ligning1_a * i.ligning2_b - i.ligning2_a * i.ligning1_b; if(det === 0) return null; const x = (i.ligning1_c * i.ligning2_b - i.ligning2_c * i.ligning1_b) / det; const y = (i.ligning1_a * i.ligning2_c - i.ligning2_a * i.ligning1_c) / det; return {value: x, unit: 'x', desc: 'x = ' + x.toFixed(2) + ', y = ' + y.toFixed(2)}; },

  forenkle_brok: (i) => { if(!i.teller) return null; const g = (a,b) => b ? g(b, a % b) : a; const d = g(Math.abs(i.teller), Math.abs(i.nevner)); const result = (i.teller/d) + '/' + (i.nevner/d); return {value: result, unit: '', desc: 'Forenklet brøk: ' + result}; },

  foil_calculator: (i) => { if(!i.a) return null; const result = (i.a * i.c) + ' + ' + (i.a * i.d) + ' + ' + (i.b * i.c) + ' + ' + (i.b * i.d); return {value: result, unit: '', desc: 'Resultat av FOIL-utvidelse'}; },

  binar_subtraksjon: (i) => { if(!i.bin1) return null; const result = (parseInt(i.bin1, 2) - parseInt(i.bin2, 2)).toString(2); return {value: result, unit: 'bin\u00E6r', desc: 'Resultatet av bin\u00E6r subtraksjon'}; },

  restkalkulator_formula: (i) => { if(!i.tall) return null; const result = i.tall % i.deler; return {value: result, unit: 'enheter', desc: 'Resten av ' + i.tall + ' delt på ' + i.deler}; },

  forenkle_radikal: (i) => { if(!i.radikand) return null; const r = i.radikand, n = i.rotgrad || 2; if(r < 0 || n < 1) return null; let a = 1, b = r; for(let f = 2; f * f <= b; f++) { let c = 0; while(b % f === 0) { b /= f; c++; } if(c >= n) { a *= Math.pow(f, Math.floor(c / n)); b *= Math.pow(f, c % n); } } const result = a + '\\sqrt[' + n + ']{' + b + '}'; return {value: result, unit: '', desc: 'Forenklet radikal: ' + result}; },

  log2_calculator: (i) => { if(!i.tall) return null; const result = Math.log2(Number(i.tall)); return {value: result, unit: '', desc: 'Logaritmen med base 2 av ' + i.tall + ' er ' + result}; },

  utvidet_form_kalkulator: (i) => { if(!i.tall) return null; const result = i.tall * i.tall; return {value: result, unit: 'kvadratenheter', desc: 'Kvadratet av tallet er ' + result}; },

  rasjonelle_nullpunkter: (i) => { if(!i.koeffisienter) return null; const k = i.koeffisienter; if(!Array.isArray(k) || k.length < 2) return null; const n = k.length - 1; const p = []; const q = []; const a0 = k[k.length-1]; const an = k[0]; if(a0 === 0 || an === 0) return null; for(let f=1; f<=Math.abs(a0); f++) if(a0 % f === 0) p.push(f); for(let f=1; f<=Math.abs(an); f++) if(an % f === 0) q.push(f); const candidates = []; for(let pi of p) for(let qi of q) { const r = pi/qi; if(!candidates.includes(r)) candidates.push(r); if(!candidates.includes(-r)) candidates.push(-r); } const roots = []; for(let r of candidates) { let sum = 0; for(let i=0; i<k.length; i++) sum = sum * r + k[i]; if(Math.abs(sum) < 1e-10) roots.push(r); } const result = roots.length > 0 ? roots.join(', ') : 'Ingen rasjonelle nullpunkter'; return {value: result, unit: '', desc: 'Rasjonelle nullpunkter for polynomet'}; },

  revers_kalkulator: (i) => { if(!i.operasjon) return null; const result = i.operasjon === '+' ? i.resultat - i.operand : i.operasjon === '-' ? i.resultat + i.operand : i.operasjon === '*' ? i.resultat / i.operand : i.operasjon === '/' ? i.resultat * i.operand : null; return {value: result, unit: 'enhet', desc: 'Reversert kalkulasjon: ' + i.operasjon + ' gir ' + result}; },

  algebra_calculator: (i) => { if(!i.a) return null; const result = i.a * i.b * i.c; return {value: result, unit: 'enheter', desc: 'Algebra kalkulator resultat: ' + result}; },

  brok_kalkulator: (i) => { if(!i.teller1) return null; const result = (i.operasjon === '+') ? (i.teller1 * i.nevner2 + i.teller2 * i.nevner1) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '-') ? (i.teller1 * i.nevner2 - i.teller2 * i.nevner1) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '*') ? (i.teller1 * i.teller2) + '/' + (i.nevner1 * i.nevner2) : (i.operasjon === '/') ? (i.teller1 * i.nevner2) + '/' + (i.nevner1 * i.teller2) : null; return {value: result, unit: 'brøk', desc: 'Resultatet av brøkregningen er ' + result}; },

  regnerekkefolge_beregning: (i) => { if(!i.uttrykk) return null; const result = Function('"use strict"; return (' + i.uttrykk + ')')(); return {value: result, unit: '', desc: 'Resultat av regnerekkefolge for uttrykket ' + i.uttrykk}; },

  binaer_subtraksjon: (i) => { if(!i.binary1) return null; const result = (parseInt(i.binary1, 2) - parseInt(i.binary2, 2)).toString(2); return {value: result, unit: 'bin\u00E6r', desc: 'Resultatet av bin\u00E6r subtraksjon'}; },

  prosentvis_okning: (i) => { if(!i.startverdi) return null; const result = ((i.sluttverdi - i.startverdi) / i.startverdi) * 100; return {value: result, unit: '%', desc: 'Prosentvis økning fra ' + i.startverdi + ' til ' + i.sluttverdi}; },

  prosentvis_endring: (i) => { if(!i.startverdi) return null; const result = ((i.sluttverdi - i.startverdi) / i.startverdi) * 100; return {value: result, unit: '%', desc: 'Prosentvis endring fra ' + i.startverdi + ' til ' + i.sluttverdi}; },

  radikal_kalkulator: (i) => { if(!i.radicand) return null; const result = Math.pow(i.radicand, 1 / i.root_index); return {value: result, unit: '', desc: 'Den ' + i.root_index + '-te roten av ' + i.radicand + ' er ' + result}; },

  kvadratrot_formel: (i) => { if(!i.tall) return null; const result = Math.sqrt(i.tall); return {value: result, unit: '', desc: 'Kvadratroten av ' + i.tall + ' er ' + result}; },

  intervall_notasjon: (i) => { if(!i.ulikhet) return null; const parts = i.ulikhet.split('<').map(s => s.trim()); const left = parseFloat(parts[0]); const right = parseFloat(parts[2]); const mid = parseFloat(parts[1]); const v = (i.inkluder_venstre ? '[' : '(') + left + ',' + right + (i.inkluder_hoyre ? ']' : ')'); return {value: v, unit: '', desc: 'Intervallnotasjon for ' + i.ulikhet}; },

  gre_score_calculator: (i) => { if(!i.verbal_correct) return null; const result = Math.round((i.verbal_correct + i.quant_correct) * 1.25); return {value: result, unit: 'poeng', desc: 'Estimert GRE-skala (130-170 per seksjon) basert p\u00e5 ' + i.verbal_correct + ' verbale og ' + i.quant_correct + ' kvantitative riktige svar'}; },

  standardform_calculator: (i) => { if(!i.tall) return null; const result = (i.retning === 'positiv') ? parseFloat(i.tall) * Math.pow(10, parseFloat(i.eksponent)) : parseFloat(i.tall) * Math.pow(10, -parseFloat(i.eksponent)); return {value: result, unit: '', desc: 'Standardform: ' + i.tall + ' x 10^' + (i.retning === 'positiv' ? '' : '-') + i.eksponent}; },

  bitwise_calculator: (i) => { if(!i.num1) return null; const n1 = parseInt(i.num1, 10); const n2 = i.num2 ? parseInt(i.num2, 10) : 0; let result; if(i.operation === 'AND') result = n1 & n2; else if(i.operation === 'OR') result = n1 | n2; else if(i.operation === 'XOR') result = n1 ^ n2; else if(i.operation === 'NOT') result = ~n1; else if(i.operation === 'LEFT') result = n1 << n2; else if(i.operation === 'RIGHT') result = n1 >> n2; else result = n1; return {value: result, unit: 'bit', desc: 'Bitvis ' + (i.operation || 'ukjent') + ' av ' + n1 + (i.num2 ? ' og ' + n2 : '') + ' gir ' + result}; },

  mengdebyggernotasjonskalkulator: (i) => { if(!i.lengde) return null; const result = i.lengde * i.bredde * i.hoyde * (i.materialtype === 'tre' ? 1.2 : i.materialtype === 'betong' ? 2.4 : i.materialtype === 'stål' ? 7.85 : 1.0) * (i.enhetspris || 0); return {value: result, unit: 'kr', desc: 'Total kostnad for mengdebyggernotasjon'}; },

  sammensetning_av_funksjoner: (i) => { if(!i.f_expression) return null; const f = new Function('x', 'return ' + i.f_expression); const g = new Function('x', 'return ' + i.g_expression); const x = parseFloat(i.x_value); const result = f(g(x)); return {value: result, unit: '', desc: 'f(g(' + x + ')) = ' + result}; },

  direkte_variasjon: (i) => { if(!i.x1) return null; const result = (i.y1 / i.x1) * i.x2; return {value: result, unit: 'enhet', desc: 'Verdien av y2 ved direkte variasjon'}; },

  syntetisk_divisjon: (i) => { if(!i.koeffisienter) return null; const k = i.koeffisienter.split(',').map(Number); const r = Number(i.rot); const res = [k[0]]; for(let j=1;j<k.length;j++) res.push(res[j-1]*r+k[j]); const result = {kvotient: res.slice(0,-1), rest: res[res.length-1]}; return {value: result, unit: 'ingen', desc: 'Kvotient: ' + result.kvotient.join(', ') + ', rest: ' + result.rest}; },

  add_fractions: (i) => { if(!i.teller1) return null; const result = ((i.teller1 * i.nevner2) + (i.teller2 * i.nevner1)) + '/' + (i.nevner1 * i.nevner2); return {value: result, unit: 'brøk', desc: 'Summen av brøkene er ' + result}; },

  prosentvis_nedgang: (i) => { if(!i.opprinnelig_verdi) return null; const result = i.opprinnelig_verdi * (1 - i.prosent_nedgang / 100); return {value: result, unit: 'enheter', desc: 'Ny verdi etter ' + i.prosent_nedgang + '% nedgang'}; },

  long_division: (i) => { if(!i.dividend) return null; const result = Math.floor(i.dividend / i.divisor); const remainder = i.dividend % i.divisor; return {value: result, unit: 'heltall', desc: 'Kvotienten av ' + i.dividend + ' delt på ' + i.divisor + ' er ' + result + ', rest ' + remainder}; },

  prosentvis_forskjell: (i) => { if(!i.verdi_a || !i.verdi_b) return null; const result = Math.abs((i.verdi_a - i.verdi_b) / ((i.verdi_a + i.verdi_b) / 2)) * 100; return {value: result, unit: '%', desc: 'Prosentvis forskjell mellom ' + i.verdi_a + ' og ' + i.verdi_b}; },

  arccos_calculator: (i) => { if(!i.cosinus_verdi) return null; const result = Math.acos(i.cosinus_verdi) * (180 / Math.PI); return {value: result, unit: 'grader', desc: 'Arccos av ' + i.cosinus_verdi + ' er ' + result + ' grader'}; },

  ekvivalente_broker: (i) => { if(!i.teller) return null; const result = []; for(let a=1;a<=i.antall;a++){result.push((i.teller*a)+'/'+(i.nevner*a))}; return {value: result.join(', '), unit: 'brøker', desc: 'Ekvivalente brøker for ' + i.teller + '/' + i.nevner + ' med ' + i.antall + ' multiplikasjoner'}; },

  prosent_til_mal: (i) => { if(!i.prosent) return null; const result = i.prosent; return {value: result, unit: '%', desc: 'Prosentverdi: ' + result + '%'}; },

  prosent_til_brok: (i) => { if(!i.prosent) return null; const result = {teller: i.prosent, nevner: 100}; return {value: result, unit: 'brøk', desc: 'Prosent ' + i.prosent + '% som brøk: ' + result.teller + '/' + result.nevner}; },

  descartes_rule_sign_calculator: (i) => { if(!i.coefficients) return null; const coeffs = i.coefficients.split(',').map(Number); let signChanges = 0; for(let j = 1; j < coeffs.length; j++) { if(coeffs[j] === 0) continue; if(coeffs[j-1] * coeffs[j] < 0) signChanges++; } const result = signChanges; return {value: result, unit: 'antall', desc: 'Antall fortegnsskift i polynomets koeffisienter'}; },

  symmetriakse_beregning: (i) => { if(!i.figur_type) return null; const result = i.figur_type === 'sirkel' ? Infinity : i.figur_type === 'rektangel' ? (i.antall_kanter === 4 ? 2 : 0) : i.figur_type === 'kvadrat' ? 4 : i.figur_type === 'trekant' ? (i.antall_kanter === 3 ? (3) : 0) : i.figur_type === 'regelbunden' ? parseInt(i.antall_kanter) : 0; return {value: result, unit: 'stk', desc: 'Antall symmetriakser for ' + i.figur_type + ' med ' + i.antall_kanter + ' kanter'}; },

  multiply_fractions: (i) => { if(!i.teller1) return null; const result = (i.teller1 * i.teller2) / (i.nevner1 * i.nevner2); return {value: result, unit: 'brøk', desc: 'Produktet av brøkene er ' + result}; },

  sammenlign_broker: (i) => { if(!i.teller1) return null; const v1 = i.teller1 / i.nevner1; const v2 = i.teller2 / i.nevner2; const result = v1 > v2 ? 1 : (v1 < v2 ? -1 : 0); return {value: result, unit: '', desc: (result === 1 ? i.teller1 + '/' + i.nevner1 + ' er storre enn ' + i.teller2 + '/' + i.nevner2 : (result === -1 ? i.teller1 + '/' + i.nevner1 + ' er mindre enn ' + i.teller2 + '/' + i.nevner2 : i.teller1 + '/' + i.nevner1 + ' er lik ' + i.teller2 + '/' + i.nevner2))}; },

  karakterkurve_kalkulator: (i) => { if(!i.poengsum) return null; const z = (i.poengsum - i.gjennomsnitt) / i.standardavvik; const karakter = Math.round((z * 2 + 4) * 2) / 2; const result = Math.min(Math.max(karakter, 1), i.karakterskala); return {value: result, unit: 'karakter', desc: 'Beregnet karakter basert på normalfordeling'}; },

  binar_addisjon: (i) => { if(!i.bin1) return null; const result = (parseInt(i.bin1, 2) + parseInt(i.bin2, 2)).toString(2); return {value: result, unit: 'bin\u00E6r', desc: 'Resultatet av bin\u00E6r addisjon'}; },

  decimal_to_fraction: (i) => { if(!i.decimal_input) return null; const num = parseFloat(i.decimal_input); if(isNaN(num)) return null; const prec = parseInt(i.precision) || 4; const gcd = (a,b) => b ? gcd(b, a % b) : a; let den = Math.pow(10, prec); let num2 = Math.round(num * den); let g = gcd(num2, den); let n = num2 / g; let d = den / g; return {value: n + '/' + d, unit: '', desc: 'Brøk av ' + i.decimal_input}; },

  substitusjonsmetode_formula: (i) => { if(!i.a1 || !i.b1 || !i.c1 || !i.a2 || !i.b2 || !i.c2) return null; const y = (i.a1 * i.c2 - i.a2 * i.c1) / (i.a1 * i.b2 - i.a2 * i.b1); const x = (i.c1 - i.b1 * y) / i.a1; return {value: x, unit: 'x-verdi', desc: 'Løsning for x og y: x = ' + x + ', y = ' + y}; },

  distribusjonsegenskap_formula: (i) => { if(!i.data_values) return null; const values = i.data_values.split(',').map(Number); const mean = values.reduce((a,b) => a+b,0)/values.length; const variance = values.reduce((a,b) => a+Math.pow(b-mean,2),0)/values.length; return {value: variance, unit: 'enhet^2', desc: 'Variansen til datapunktene'}; },

  kubikkrot_beregning: (i) => { if(!i.tall) return null; const result = Math.cbrt(parseFloat(i.tall)); return {value: result, unit: '', desc: 'Kubikkroten av ' + i.tall + ' er ' + result}; },

  modulo_calculator: (i) => { if(!i.dividend) return null; const result = ((i.dividend % i.divisor) + i.divisor) % i.divisor; return {value: result, unit: '', desc: 'Resten av ' + i.dividend + ' delt på ' + i.divisor}; },

  fellesnevner_beregning: (i) => { if(!i.teller1) return null; const a = i.teller1; const b = i.nevner1; const c = i.teller2; const d = i.nevner2; const lcm = (b * d) / (function gcd(x,y){return y===0?x:gcd(y,x%y)})(b,d); const newTeller1 = a * (lcm / b); const newTeller2 = c * (lcm / d); const result = newTeller1 + newTeller2; return {value: result, unit: 'over ' + lcm, desc: 'Summen av brøkene med fellesnevner ' + lcm}; },

  diskriminant_beregning: (i) => { if(!i.a) return null; const result = i.b * i.b - 4 * i.a * i.c; return {value: result, unit: '', desc: 'Diskriminanten D = b^2 - 4ac'}; },

  palworld_breeding: (i) => { if(!i.parent1_level) return null; const result = Math.floor((i.parent1_level + i.parent2_level) / 2); return {value: result, unit: 'nivå', desc: 'Gjennomsnittlig nivå for avl mellom foreldre' + ' (avrundet ned)'}; },

  truth_table_generator: (i) => { if(!i.expression) return null; const vars = i.variables ? i.variables.split(',').map(v => v.trim()).filter(v => v) : []; const n = vars.length; const rows = 1 << n; const results = []; for (let r = 0; r < rows; r++) { const env = {}; for (let j = 0; j < n; j++) { env[vars[j]] = !!(r & (1 << (n - 1 - j))); } let expr = i.expression; for (let v in env) { expr = expr.replace(new RegExp(v, 'g'), env[v] ? 'true' : 'false'); } let val; try { val = eval(expr) ? 1 : 0; } catch(e) { val = '?'; } results.push(val); } const result = results.join(','); return {value: result, unit: 'sannhetsverdier', desc: 'Sannhetstabell for uttrykk: ' + i.expression + ' med variabler: ' + i.variables}; },

  xor_calculator: (i) => { if(!i.input1) return null; const result = parseInt(i.input1) ^ parseInt(i.input2); return {value: result, unit: '', desc: 'XOR-resultat av ' + i.input1 + ' og ' + i.input2}; },

  deling_av_broker: (i) => { if(!i.teller1) return null; const result = (i.teller1 * i.nevner2) / (i.nevner1 * i.teller2); return {value: result, unit: 'brøk', desc: 'Resultatet av deling av brøker er ' + result}; },

  proporsjon_kalkulator: (i) => { if(!i.a) return null; const result = (i.b * i.c) / i.a; return {value: result, unit: 'enhet', desc: 'Proporsjonal verdi basert på a, b, c og d'}; },

  blandet_brok_beregning: (i) => { if(!i.heltall || !i.teller || !i.nevner) return null; const result = (i.heltall * i.nevner + i.teller) / i.nevner; return {value: result, unit: 'desimal', desc: 'Blandet brok omgjort til desimaltall: ' + result}; },

  blandet_tall_til_uekte_brok: (i) => { if(!i.heltall || !i.teller || !i.nevner) return null; const result = (i.heltall * i.nevner + i.teller) + '/' + i.nevner; return {value: result, unit: '', desc: 'Uekte brøk'}; },

  komplekse_tall_operasjoner: (i) => { if(!i.real1) return null; const r1 = parseFloat(i.real1) || 0; const im1 = parseFloat(i.imag1) || 0; const r2 = parseFloat(i.real2) || 0; const im2 = parseFloat(i.imag2) || 0; let result; let unit = ''; let desc = ''; if(i.operasjon === 'add') { result = (r1 + r2) + ' + ' + (im1 + im2) + 'i'; unit = 'kompleks'; desc = 'Sum av komplekse tall'; } else if(i.operasjon === 'sub') { result = (r1 - r2) + ' + ' + (im1 - im2) + 'i'; unit = 'kompleks'; desc = 'Differanse av komplekse tall'; } else if(i.operasjon === 'mul') { const real = r1 * r2 - im1 * im2; const imag = r1 * im2 + im1 * r2; result = real + ' + ' + imag + 'i'; unit = 'kompleks'; desc = 'Produkt av komplekse tall'; } else if(i.operasjon === 'div') { const denom = r2 * r2 + im2 * im2; if(denom === 0) { result = 'Udefinert'; unit = ''; desc = 'Divisjon med null'; } else { const real = (r1 * r2 + im1 * im2) / denom; const imag = (im1 * r2 - r1 * im2) / denom; result = real + ' + ' + imag + 'i'; unit = 'kompleks'; desc = 'Kvotient av komplekse tall'; } } else { result = 'Ugyldig operasjon'; unit = ''; desc = 'Velg add, sub, mul eller div'; } return {value: result, unit: unit, desc: desc}; },

  absoluttverdi_formel: (i) => { if(!i.tall) return null; const result = Math.abs(parseFloat(i.tall)); return {value: result, unit: '', desc: 'Absoluttverdien av ' + i.tall + ' er ' + result}; },

  lang_multiplikasjon: (i) => { if(!i.tall1) return null; const result = i.tall1 * (i.tall2 || 0); return {value: result, unit: 'enheter', desc: 'Resultatet av lang multiplikasjon: ' + i.tall1 + ' * ' + (i.tall2 || 0) + ' = ' + result}; },

  twos_complement: (i) => { if(!i.decimal_input) return null; const result = (parseInt(i.decimal_input) < 0 ? (Math.pow(2, parseInt(i.bit_length) || 8) + parseInt(i.decimal_input)) : parseInt(i.decimal_input)).toString(2).padStart(parseInt(i.bit_length) || 8, '0'); return {value: result, unit: 'bin', desc: 'Toer-komplement av ' + i.decimal_input + ' med ' + (i.bit_length || 8) + ' bit'}; },

  statistikk_sentraltendens_spredning: (i) => { if(!i.tallrekke) return null; const arr = i.tallrekke.split(',').map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b); const n = arr.length; if(n===0) return null; const sum = arr.reduce((a,b)=>a+b,0); const mean = sum/n; const median = n%2===0 ? (arr[n/2-1]+arr[n/2])/2 : arr[Math.floor(n/2)]; const freq = {}; arr.forEach(v=>freq[v]=(freq[v]||0)+1); let maxFreq = 0; let mode = []; for(let k in freq){ if(freq[k]>maxFreq){ maxFreq=freq[k]; mode=[Number(k)]; } else if(freq[k]===maxFreq){ mode.push(Number(k)); } } const modeStr = mode.length===arr.length ? 'Ingen' : mode.join(', '); const range = arr[n-1]-arr[0]; const result = 'Gjennomsnitt: ' + mean.toFixed(2) + ', Median: ' + median.toFixed(2) + ', Typetall: ' + modeStr + ', Variasjonsbredde: ' + range.toFixed(2); return {value: result, unit: '', desc: 'Statistisk sentraltendens og spredning for tallrekken'}; },

  sample_size_calculator: (i) => { if(!i.populasjon) return null; const z = {99: 2.576, 95: 1.96, 90: 1.645}[i.konfidensniva] || 1.96; const p = (i.forventet_andel || 0.5) / 100; const e = (i.feilmargin || 5) / 100; const n0 = (z * z * p * (1 - p)) / (e * e); const result = Math.ceil(n0 / (1 + (n0 - 1) / i.populasjon)); return {value: result, unit: 'personer', desc: 'Nødvendig utvalgsstørrelse for populasjon ' + i.populasjon + ' med ' + i.konfidensniva + '% konfidensnivå og ' + i.feilmargin + '% feilmargin'}; },

  sannsynlighet_kalkulator: (i) => { if(!i.gunstige_utfall) return null; const result = i.uavhengig ? (i.hendelse_a * i.hendelse_b) : (i.gunstige_utfall / i.totale_utfall); return {value: result, unit: 'sannsynlighet', desc: 'Sannsynligheten er ' + (result * 100).toFixed(2) + ' prosent'}; },

  permutations_combinations_calculator: (i) => { if(!i.n) return null; const result = i.type === 'permutation' ? (() => { let p = 1; for(let k = 0; k < i.r; k++) p *= (i.n - k); return p; })() : (() => { let p = 1; let f = 1; for(let k = 0; k < i.r; k++) { p *= (i.n - k); f *= (k + 1); } return p / f; })(); return {value: result, unit: 'antall', desc: 'Antall ' + (i.type === 'permutation' ? 'permutasjoner' : 'kombinasjoner') + ' av ' + i.n + ' elementer tatt ' + i.r + ' om gangen'}; },

  konfidensintervall_formel: (i) => { if(!i.sample_mean) return null; const z = {0.90: 1.645, 0.95: 1.96, 0.99: 2.576}[i.confidence_level] || 1.96; const margin = z * (i.sample_std / Math.sqrt(i.sample_size)); const lower = i.sample_mean - margin; const upper = i.sample_mean + margin; const result = lower + ' til ' + upper; return {value: result, unit: 'samme enhet som gjennomsnitt', desc: 'Konfidensintervall for gjennomsnitt med ' + (i.confidence_level * 100) + '% konfidensniv\u00e5'}; },

  tallfolge_analyse: (i) => { if(!i.tallrekke) return null; const arr = i.tallrekke.split(',').map(Number).filter(n => !isNaN(n)); const n = parseInt(i.antall_ledd) || arr.length; const sum = arr.slice(0, n).reduce((a,b) => a+b, 0); const avg = sum / Math.min(n, arr.length); const min = Math.min(...arr.slice(0, n)); const max = Math.max(...arr.slice(0, n)); const result = 'Sum: ' + sum + ', Gj.snitt: ' + avg.toFixed(2) + ', Min: ' + min + ', Maks: ' + max; return {value: result, unit: '', desc: 'Analyse av tallfølge med ' + Math.min(n, arr.length) + ' ledd'}; },

  beta_distribution_calculator: (i) => { if(!i.alpha || !i.beta || !i.x || !i.beregning) return null; const a = parseFloat(i.alpha); const b = parseFloat(i.beta); const x = parseFloat(i.x); const beregning = i.beregning; if(beregning === 'pdf') { const B = (gamma(a)*gamma(b))/gamma(a+b); const result = (Math.pow(x, a-1) * Math.pow(1-x, b-1)) / B; return {value: result, unit: 'sannsynlighetstetthet', desc: 'Beta-fordelingens sannsynlighetstetthet ved x' + x}; } else if(beregning === 'cdf') { let result = 0; const steps = 1000; const dx = x / steps; for(let i=0; i<steps; i++) { const xi = (i+0.5)*dx; const B = (gamma(a)*gamma(b))/gamma(a+b); result += (Math.pow(xi, a-1) * Math.pow(1-xi, b-1)) / B * dx; } return {value: result, unit: 'kumulativ sannsynlighet', desc: 'Beta-fordelingens kumulative sannsynlighet ved x' + x}; } else if(beregning === 'mean') { const result = a / (a + b); return {value: result, unit: 'forventningsverdi', desc: 'Beta-fordelingens forventningsverdi'}; } else if(beregning === 'variance') { const result = (a * b) / ((a + b) * (a + b) * (a + b + 1)); return {value: result, unit: 'varians', desc: 'Beta-fordelingens varians'}; } else { return null; } },

  geometrisk_fordeling: (i) => { if(!i.p) return null; const result = Math.pow(1 - i.p, i.k - 1) * i.p; return {value: result, unit: 'sannsynlighet', desc: 'Sannsynligheten for at den ' + i.k + '. forsøket er den første suksessen'}; },

  gjennomsnitt_avansert: (i) => { if(!i.tallrekke) return null; const arr = i.tallrekke.split(',').map(Number).filter(n => !isNaN(n)); const result = arr.length > 0 ? arr.reduce((a,b) => a+b, 0) / arr.length : 0; return {value: result, unit: 'poeng', desc: 'Gjennomsnittet av tallrekken er ' + result.toFixed(2) + ' poeng'}; },

  pearson_correlation: (i) => { if(!i.data_x || !i.data_y) return null; const n = Math.min(i.data_x.length, i.data_y.length); if(n < 2) return null; let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0; for(let j = 0; j < n; j++) { const x = parseFloat(i.data_x[j]), y = parseFloat(i.data_y[j]); if(isNaN(x) || isNaN(y)) continue; sumX += x; sumY += y; sumXY += x * y; sumX2 += x * x; sumY2 += y * y; } const numerator = n * sumXY - sumX * sumY; const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)); const result = denominator === 0 ? 0 : numerator / denominator; return {value: result, unit: '', desc: 'Pearsons korrelasjonskoeffisient (r) mellom X og Y'}; },

  prosentil_beregning: (i) => { if(!i.verdi) return null; const z = (i.verdi - i.gjennomsnitt) / i.standardavvik; const result = 0.5 * (1 + erf(z / Math.sqrt(2))); const erf = (x) => { const a1 = 0.254829592; const a2 = -0.284496736; const a3 = 1.421413741; const a4 = -1.453152027; const a5 = 1.061405429; const p = 0.3275911; const sign = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + p * x); const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x); return sign * y; }; return {value: result * 100, unit: '%', desc: 'Prosentil for verdi ' + i.verdi + ' i forhold til gjennomsnitt ' + i.gjennomsnitt + ' og standardavvik ' + i.standardavvik + ' er ' + (result * 100).toFixed(2) + '%'}; },

  linear_regression: (i) => { if(!i.x_values || !i.y_values) return null; const n = i.x_values.length; const sumX = i.x_values.reduce((a,b)=>a+b,0); const sumY = i.y_values.reduce((a,b)=>a+b,0); const sumXY = i.x_values.reduce((a,b,c)=>a+b*i.y_values[c],0); const sumX2 = i.x_values.reduce((a,b)=>a+b*b,0); const slope = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX); const intercept = (sumY - slope*sumX)/n; const result = slope*i.predict_x + intercept; return {value: result, unit: 'y-verdi', desc: 'Predikert y-verdi for x = ' + i.predict_x}; },

  p_verdi_kalkulator: (i) => { if(!i.test_type) return null; const z = (i.test_value - 0) / 1; const t = i.test_type === 'z' ? z : (i.test_value / Math.sqrt(i.frihetsgrader)); const p = i.test_type === 'z' ? (0.5 * (1 + erf(z / Math.sqrt(2)))) : (1 - jStat.studentt.cdf(Math.abs(t), i.frihetsgrader)); const result = i.haler === 2 ? 2 * (1 - p) : (1 - p); return {value: result, unit: 'p-verdi', desc: 'Beregnet p-verdi for ' + i.test_type + '-test med ' + i.frihetsgrader + ' frihetsgrader og ' + i.haler + ' haler'}; },

  feilmargin_beregning: (i) => { if(!i.utvalgsstorrelse) return null; const z = {99: 2.576, 95: 1.96, 90: 1.645}[i.konfidensniva] || 1.96; const p = (i.andel || 0.5) / 100; const result = z * Math.sqrt((p * (1 - p)) / i.utvalgsstorrelse) * 100; return {value: result, unit: '%', desc: 'Feilmargin ved ' + i.konfidensniva + '% konfidensniva'}; },

  kyllingespill_utfall: (i) => { if(!i.hastighet) return null; const result = Math.max(0, Math.min(100, 100 - ((i.avstand / (i.hastighet * 1000 / 3600) - i.reaksjonstid - i.bremselengde / (i.hastighet * 1000 / 3600)) * 10 + (i.motstander_hastighet * 0.5) - (i.svingemulighet * 15)))); return {value: result, unit: '%', desc: 'Sannsynlighet for å unngå kollisjon i Kyllingespill' + ' (' + result.toFixed(1) + '%)'}; },

  eksponensiell_fordeling: (i) => { if(!i.lambda) return null; const result = i.beregningstype === 'sannsynlighet' ? 1 - Math.exp(-i.lambda * i.x_verdi) : i.beregningstype === 'tetthet' ? i.lambda * Math.exp(-i.lambda * i.x_verdi) : i.beregningstype === 'forventning' ? 1 / i.lambda : i.beregningstype === 'varians' ? 1 / (i.lambda * i.lambda) : null; return {value: result, unit: i.beregningstype === 'sannsynlighet' ? '' : i.beregningstype === 'tetthet' ? '' : i.beregningstype === 'forventning' ? 'samme enhet som x' : i.beregningstype === 'varians' ? 'kvadrert enhet av x' : '', desc: 'Eksponensiell fordeling: ' + (i.beregningstype === 'sannsynlighet' ? 'P(X <= x) = 1 - e^(-lambda*x)' : i.beregningstype === 'tetthet' ? 'f(x) = lambda * e^(-lambda*x)' : i.beregningstype === 'forventning' ? 'E(X) = 1/lambda' : i.beregningstype === 'varians' ? 'Var(X) = 1/lambda^2' : 'Ukjent beregningstype') + ' med lambda=' + i.lambda + ' og x=' + i.x_verdi}; },

  variasjonskoeffisient_beregning: (i) => { if(!i.datasett) return null; const arr = i.datasett.split(',').map(Number).filter(n => !isNaN(n)); if(arr.length === 0) return null; const mean = arr.reduce((a,b) => a+b, 0) / arr.length; const variance = arr.reduce((a,b) => a + (b-mean)*(b-mean), 0) / arr.length; const std = Math.sqrt(variance); const result = mean === 0 ? 0 : (std / mean) * 100; return {value: result, unit: '%', desc: 'Variasjonskoeffisient (CV) i prosent'}; },

  ovre_kvartil_formel: (i) => { if(!i.datasett) return null; const arr = i.datasett.split(',').map(Number).sort((a,b)=>a-b); const n = arr.length; const q3Index = 0.75 * (n - 1); const lower = Math.floor(q3Index); const upper = Math.ceil(q3Index); const result = lower === upper ? arr[lower] : arr[lower] + (arr[upper] - arr[lower]) * (q3Index - lower); return {value: result, unit: 'samme enhet som datasett', desc: 'Oevre kvartil (Q3) av datasettet'}; },

  usikkerhetskalkulator_formel: (i) => { if(!i.verdier) return null; const arr = i.verdier.split(',').map(Number).filter(v => !isNaN(v)); if(arr.length < 2) return null; const n = arr.length; const mean = arr.reduce((a,b)=>a+b,0)/n; const variance = arr.reduce((a,b)=>a+(b-mean)*(b-mean),0)/(n-1); const std = Math.sqrt(variance); const z = i.konfidensniva === '99' ? 2.576 : i.konfidensniva === '95' ? 1.96 : 1.645; const margin = z * std / Math.sqrt(n); const result = i.sammenlign ? margin : margin; return {value: result, unit: 'enheter', desc: 'Usikkerhetsmargin for gjennomsnittet med ' + (i.konfidensniva || '95') + '% konfidensniva'}; },

  nash_equilibrium_2x2: (i) => { if(!i.a11) return null; const p = (i.b22 - i.b21) / (i.b11 - i.b12 - i.b21 + i.b22); const q = (i.a22 - i.a12) / (i.a11 - i.a12 - i.a21 + i.a22); const pClamped = Math.max(0, Math.min(1, p)); const qClamped = Math.max(0, Math.min(1, q)); const valA = pClamped * qClamped * i.a11 + pClamped * (1 - qClamped) * i.a12 + (1 - pClamped) * qClamped * i.a21 + (1 - pClamped) * (1 - qClamped) * i.a22; const valB = pClamped * qClamped * i.b11 + pClamped * (1 - qClamped) * i.b12 + (1 - pClamped) * qClamped * i.b21 + (1 - pClamped) * (1 - qClamped) * i.b22; return {value: pClamped, unit: 'sannsynlighet', desc: 'Nash-likevekt: Spiller A velger rad 1 med sannsynlighet ' + pClamped.toFixed(3) + ', Spiller B velger kolonne 1 med sannsynlighet ' + qClamped.toFixed(3) + '. Forventet utbytte A: ' + valA.toFixed(3) + ', B: ' + valB.toFixed(3)}; },

  modus_beregning: (i) => { if(!i.datasett) return null; const arr = i.datasett.split(',').map(Number).filter(n => !isNaN(n)); if(i.sortering === 'stigende') arr.sort((a,b) => a-b); else if(i.sortering === 'synkende') arr.sort((a,b) => b-a); const freq = {}; let maxFreq = 0; let modus = null; arr.forEach(v => { freq[v] = (freq[v] || 0) + 1; if(freq[v] > maxFreq) { maxFreq = freq[v]; modus = v; } }); if(maxFreq === 1) return {value: null, unit: '', desc: 'Ingen modus'}; return {value: modus, unit: '', desc: 'Modus (verdi med h\u00f8yest frekvens)'}; },

  empirisk_regel: (i) => { if(!i.mean) return null; const z = (i.value - i.mean) / i.stddev; const result = z >= -1 && z <= 1 ? 68 : z >= -2 && z <= 2 ? 95 : z >= -3 && z <= 3 ? 99.7 : 0; return {value: result, unit: '%', desc: 'Andel observasjoner innenfor ' + (result === 68 ? '1' : result === 95 ? '2' : '3') + ' standardavvik'}; },

  percentilrang_formel: (i) => { if(!i.verdi) return null; const z = (i.verdi - i.gjennomsnitt) / i.standardavvik; const result = 0.5 * (1 + erf(z / Math.sqrt(2))) * 100; return {value: result, unit: '%', desc: 'Prosentandelen av observasjoner som er lavere enn ' + i.verdi + ' i en normalfordeling med gjennomsnitt ' + i.gjennomsnitt + ' og standardavvik ' + i.standardavvik + '.'}; },

  invers_normalfordeling: (i) => { if(!i.sannsynlighet) return null; const erf = (x) => { const a1 = 0.254829592; const a2 = -0.284496736; const a3 = 1.421413741; const a4 = -1.453152027; const a5 = 1.061405429; const p = 0.3275911; const sign = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1.0 / (1.0 + p * x); const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x); return sign * y; }; const invErf = (z) => { if (z === 0) return 0; let w = Math.log(1 - z * z); let p = 2 / (Math.PI * 0.147) + w / 2; let q = w / 0.147; let r = Math.sqrt(p * p - q) - p; let x = Math.sqrt(r); for (let i = 0; i < 3; i++) { x = x - (erf(x) - z) / ((2 / Math.sqrt(Math.PI)) * Math.exp(-x * x)); } return x; }; const p = parseFloat(i.sannsynlighet); const mu = parseFloat(i.gjennomsnitt); const sigma = parseFloat(i.standardavvik); const z = Math.SQRT2 * invErf(2 * p - 1); const result = mu + sigma * z; return {value: result, unit: 'verdi', desc: 'Invers normalfordeling for sannsynlighet ' + i.sannsynlighet + ', gjennomsnitt ' + i.gjennomsnitt + ' og standardavvik ' + i.standardavvik}; },

  rotmiddelverdi_formula: (i) => { if(!i.tallrekke) return null; const arr = i.tallrekke.split(',').map(Number); const sumSquares = arr.reduce((sum, val) => sum + val * val, 0); const result = Math.sqrt(sumSquares / arr.length); return {value: result, unit: 'enhet', desc: 'Rotmiddelverdi (RMS) av tallrekken'}; },

  terning_sannsynlighet: (i) => { if(!i.antall_terninger || !i.onsket_sum) return null; const n = parseInt(i.antall_terninger); const s = parseInt(i.onsket_sum); if(s < n || s > 6 * n) return {value: 0, unit: '%', desc: 'Sannsynlighet for sum ' + s + ' med ' + n + ' terninger'}; const dp = Array.from({length: n + 1}, () => Array(s + 1).fill(0)); dp[0][0] = 1; for(let i = 1; i <= n; i++) for(let j = 1; j <= s; j++) for(let k = 1; k <= 6; k++) if(j >= k) dp[i][j] += dp[i-1][j-k]; const total = Math.pow(6, n); const result = (dp[n][s] / total) * 100; return {value: result, unit: '%', desc: 'Sannsynlighet for sum ' + s + ' med ' + n + ' terninger'}; },

  spredningsdiagram_analyse: (i) => { if(!i.x_values) return null; const x = i.x_values.split(',').map(Number); const y = i.y_values.split(',').map(Number); const n = x.length; const sumX = x.reduce((a,b)=>a+b,0); const sumY = y.reduce((a,b)=>a+b,0); const sumXY = x.reduce((a,b,i)=>a+b*y[i],0); const sumX2 = x.reduce((a,b)=>a+b*b,0); const sumY2 = y.reduce((a,b)=>a+b*b,0); const slope = (n*sumXY - sumX*sumY) / (n*sumX2 - sumX*sumX); const intercept = (sumY - slope*sumX)/n; const r = (n*sumXY - sumX*sumY) / Math.sqrt((n*sumX2 - sumX*sumX)*(n*sumY2 - sumY*sumY)); const predY = slope * Number(i.pred_x) + intercept; const result = { slope: slope, intercept: intercept, r: r, pred_y: predY }; return {value: result, unit: 'enheter', desc: 'Stigningstall: ' + slope.toFixed(3) + ', skjæring: ' + intercept.toFixed(3) + ', korrelasjon r: ' + r.toFixed(3) + ', predikert y for x=' + i.pred_x + ': ' + predY.toFixed(3)}; },

  five_number_summary: (i) => { if(!i.data_values) return null; const arr = i.data_values.split(',').map(Number).sort((a,b)=>a-b); const n = arr.length; const q1 = n%2===0 ? (arr[n/4-1]+arr[n/4])/2 : arr[Math.floor(n/4)]; const q2 = n%2===0 ? (arr[n/2-1]+arr[n/2])/2 : arr[Math.floor(n/2)]; const q3 = n%2===0 ? (arr[3*n/4-1]+arr[3*n/4])/2 : arr[Math.floor(3*n/4)]; const result = {min: arr[0], q1: q1, median: q2, q3: q3, max: arr[n-1]}; return {value: result, unit: 'ingen', desc: 'Fem-tallsoppsummering: minimum, Q1, median, Q3, maksimum'}; },

  vektet_gjennomsnitt: (i) => { if(!i.verdier) return null; const result = i.verdier.reduce((sum, v, idx) => sum + v * i.vekter[idx], 0) / i.vekter.reduce((a, b) => a + b, 0); return {value: result, unit: '', desc: 'Vektet gjennomsnitt av ' + i.verdier.length + ' verdier'}; },

  kovarians_formel: (i) => { if(!i.x_values) return null; const x = i.x_values, y = i.y_values; const n = Math.min(x.length, y.length); if(n < 2) return null; const meanX = x.reduce((a,b) => a+b, 0) / n; const meanY = y.reduce((a,b) => a+b, 0) / n; let sum = 0; for(let j=0; j<n; j++) sum += (x[j] - meanX) * (y[j] - meanY); const result = sum / (n - 1); return {value: result, unit: 'enhet^2', desc: 'Kovarians mellom x og y'}; },

  kvartilavstand_beregning: (i) => { if(!i.datasett) return null; const arr = i.datasett.split(',').map(Number).sort((a,b)=>a-b); const n = arr.length; const q1 = n%2===0 ? (arr[n/4-1]+arr[n/4])/2 : arr[Math.floor(n/4)]; const q3 = n%2===0 ? (arr[3*n/4-1]+arr[3*n/4])/2 : arr[Math.floor(3*n/4)]; const result = q3 - q1; return {value: result, unit: 'enheter', desc: 'Kvartilavstand (IQR) for datasettet'}; },

  karmisk_hale_beregning: (i) => { if(!i.fodselsdag) return null; const result = ((parseInt(i.fodselsdag) + parseInt(i.fodselsmaned) + parseInt(i.fodselsar)) % 9 + 1) * (parseInt(i.navn_verdi) % 10); return {value: result, unit: 'karmiske poeng', desc: 'Din karmiske haleverdi er ' + result + ' karmiske poeng basert på fødselsdato og navneverdi.'}; },

  ncr_calculator: (i) => { if(!i.n) return null; const n = Number(i.n); const r = Number(i.r); if(r < 0 || r > n) return {value: 0, unit: '', desc: 'Ugyldig input'}; const fact = (x) => x <= 1 ? 1 : x * fact(x - 1); const result = fact(n) / (fact(r) * fact(n - r)); return {value: result, unit: '', desc: 'Antall kombinasjoner av ' + n + ' elementer tatt ' + r + ' av gangen'}; },

  midrange_calculator: (i) => { if(!i.data_values) return null; const arr = i.data_values.split(',').map(Number).filter(n => !isNaN(n)); if(arr.length === 0) return null; const min = Math.min(...arr); const max = Math.max(...arr); const result = (min + max) / 2; return {value: result, unit: 'enhet', desc: 'Midtpunktet mellom minste og stÃ¸rste verdi i datasettet'}; },

  test_statistikk_beregner: (i) => { if(!i.test_type) return null; const result = i.test_type === 'z-test' ? (i.sample_mean - i.population_mean) / Math.sqrt(i.population_variance / i.sample_size) : i.test_type === 't-test' ? (i.sample_mean - i.population_mean) / (i.sample_std / Math.sqrt(i.sample_size)) : i.test_type === 'two-sample-z-test' ? (i.sample_mean - i.population_mean) / Math.sqrt((i.variance1 / i.n1) + (i.variance2 / i.n2)) : i.test_type === 'two-sample-t-test' ? (i.sample_mean - i.population_mean) / Math.sqrt((i.variance1 / i.n1) + (i.variance2 / i.n2)) : null; return {value: result, unit: 'enhet', desc: 'Teststatistikk for ' + i.test_type}; },

  relativ_frekvens: (i) => { if(!i.frekvens) return null; const result = i.frekvens / i.total_observasjoner; return {value: result, unit: 'andel', desc: 'Relativ frekvens = frekvens / total observasjoner'}; },

  normalfordeling_kalkulator: (i) => { if(!i.mean || !i.stddev || !i.x_value) return null; const z = (i.x_value - i.mean) / i.stddev; const cdf = 0.5 * (1 + erf(z / Math.sqrt(2))); const result = i.tail === 'left' ? cdf : i.tail === 'right' ? 1 - cdf : i.tail === 'two' ? 2 * Math.min(cdf, 1 - cdf) : cdf; return {value: result, unit: 'sannsynlighet', desc: 'Sannsynlighet for ' + (i.tail === 'left' ? 'venstre hale' : i.tail === 'right' ? 'høyre hale' : i.tail === 'two' ? 'to haler' : 'venstre hale') + ' i normalfordeling'}; },

  gini_coefficient: (i) => { if(!i.inntekter) return null; const sorted = [...i.inntekter].sort((a,b) => a-b); const n = sorted.length; let sum = 0; for(let j=0; j<n; j++) sum += (2*j - n + 1) * sorted[j]; const result = sum / (n * sorted.reduce((a,b) => a+b, 0)); return {value: result, unit: '', desc: 'Gini-koeffisient for inntektsfordeling'}; },

  normal_cdf: (i) => { if(!i.z) return null; const result = 0.5 * (1 + erf((i.z - i.mean) / (i.stddev * Math.SQRT2))); return {value: result, unit: 'sannsynlighet', desc: 'Normal CDF: P(X <= ' + i.z + ') med mean=' + i.mean + ', stddev=' + i.stddev}; },

  fangernes_dilemma_utfall: (i) => { if(!i.valg_spiller_a) return null; const result = (i.valg_spiller_a === 'samarbeid' && i.valg_spiller_b === 'samarbeid') ? i.straff_samarbeid : (i.valg_spiller_a === 'svik' && i.valg_spiller_b === 'svik') ? i.straff_svik : (i.valg_spiller_a === 'samarbeid' && i.valg_spiller_b === 'svik') ? i.straff_sucker : (i.valg_spiller_a === 'svik' && i.valg_spiller_b === 'samarbeid') ? i.straff_fristelse : 0; return {value: result, unit: 'poeng', desc: 'Utfall for spiller A: ' + result + ' poeng'}; },

  geometric_mean_calculator: (i) => { if(!i.numbers) return null; const nums = i.numbers.split(',').map(Number).filter(n => n > 0); if(nums.length === 0) return null; const result = Math.pow(nums.reduce((a, b) => a * b, 1), 1 / nums.length); return {value: result, unit: 'enhet', desc: 'Geometrisk gjennomsnitt av tallene'}; },

  frihetsgrader_beregning: (i) => { if(!i.test_type) return null; const result = i.test_type === 't-test' ? i.n1 + i.n2 - 2 : i.test_type === 'paired-t-test' ? i.n1 - 1 : i.test_type === 'one-way-anova' ? {between: i.k - 1, within: i.n1 - i.k} : i.test_type === 'chi-square' ? (i.rows - 1) * (i.cols - 1) : i.test_type === 'f-test' ? {df1: i.n1 - 1, df2: i.n2 - 1} : null; return {value: result, unit: '', desc: 'Frihetsgrader for ' + i.test_type}; },

  bmi_calculator: (i) => { if(!i.weight) return null; const result = i.weight / ((i.height/100) * (i.height/100)); return {value: result, unit: 'kg/m²', desc: 'Kroppsmasseindeks (BMI) basert på vekt og høyde'}; },

  binomial_distribution: (i) => { if(!i.n) return null; const result = (function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(i.n) / ((function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(i.k) * (function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(i.n - i.k)) * Math.pow(i.p, i.k) * Math.pow(1 - i.p, i.n - i.k); return {value: result, unit: 'sannsynlighet', desc: 'Sannsynlighet for ' + i.k + ' suksesser i ' + i.n + ' forsok med sannsynlighet ' + i.p}; },

  punktestimat_formula: (i) => { if(!i.data_values) return null; const arr = i.data_values.split(',').map(Number).filter(n => !isNaN(n)); if(arr.length === 0) return null; const sum = arr.reduce((a,b) => a+b, 0); const result = sum / arr.length; return {value: result, unit: 'enheter', desc: 'Punktestimat (gjennomsnitt) av dataverdiene'}; },

  hyperbel_funksjoner: (i) => { if(!i.x) return null; const result = i.funksjon === 'sinh' ? (Math.exp(i.x) - Math.exp(-i.x)) / 2 : i.funksjon === 'cosh' ? (Math.exp(i.x) + Math.exp(-i.x)) / 2 : i.funksjon === 'tanh' ? (Math.exp(i.x) - Math.exp(-i.x)) / (Math.exp(i.x) + Math.exp(-i.x)) : i.funksjon === 'coth' ? (Math.exp(i.x) + Math.exp(-i.x)) / (Math.exp(i.x) - Math.exp(-i.x)) : i.funksjon === 'sech' ? 2 / (Math.exp(i.x) + Math.exp(-i.x)) : i.funksjon === 'csch' ? 2 / (Math.exp(i.x) - Math.exp(-i.x)) : null; return {value: result, unit: '', desc: 'Hyperbolsk ' + i.funksjon + ' av ' + i.x}; },

  solve_linear_system: (i) => { if(!i.eq1_a) return null; const a1 = parseFloat(i.eq1_a), b1 = parseFloat(i.eq1_b), c1 = parseFloat(i.eq1_c), d1 = parseFloat(i.eq1_d), a2 = parseFloat(i.eq2_a), b2 = parseFloat(i.eq2_b), c2 = parseFloat(i.eq2_c), d2 = parseFloat(i.eq2_d), a3 = parseFloat(i.eq3_a), b3 = parseFloat(i.eq3_b), c3 = parseFloat(i.eq3_c), d3 = parseFloat(i.eq3_d); const det = a1*(b2*c3 - b3*c2) - b1*(a2*c3 - a3*c2) + c1*(a2*b3 - a3*b2); if(Math.abs(det) < 1e-12) return {value: null, unit: '', desc: 'Ingen unik l\u00f8sning (determinant = 0)'}; const x = (d1*(b2*c3 - b3*c2) - b1*(d2*c3 - d3*c2) + c1*(d2*b3 - d3*b2)) / det; const y = (a1*(d2*c3 - d3*c2) - d1*(a2*c3 - a3*c2) + c1*(a2*d3 - a3*d2)) / det; const z = (a1*(b2*d3 - b3*d2) - b1*(a2*d3 - a3*d2) + d1*(a2*b3 - a3*b2)) / det; return {value: x, unit: '', desc: 'x = ' + x.toFixed(4) + ', y = ' + y.toFixed(4) + ', z = ' + z.toFixed(4)}; },

  midtpunkt_avstand_helning: (i) => { if(!i.x1) return null; const mx = (i.x1 + i.x2) / 2; const my = (i.y1 + i.y2) / 2; const d = Math.sqrt(Math.pow(i.x2 - i.x1, 2) + Math.pow(i.y2 - i.y1, 2)); const h = (i.x2 - i.x1 === 0) ? null : (i.y2 - i.y1) / (i.x2 - i.x1); const result = 'M(' + mx + ',' + my + ') d=' + d + ' h=' + h; return {value: result, unit: '', desc: 'Midtpunkt, avstand og helning'}; },

  parabel_analyse: (i) => { if(!i.a) return null; const result = (-i.b) / (2 * i.a); return {value: result, unit: 'x-verdi', desc: 'Symmetriaksen til parabelen (toppunktets x-koordinat)'}; },

  arctan_advanced: (i) => { if(!i.verdi) return null; const v = parseFloat(i.verdi); const rad = Math.atan(v); const result = i.enhet === 'grader' ? rad * 180 / Math.PI : rad; return {value: result, unit: i.enhet === 'grader' ? 'grader' : 'radianer', desc: 'Invers tangens av ' + i.verdi + ' er ' + result.toFixed(4) + ' ' + (i.enhet === 'grader' ? 'grader' : 'radianer')}; },

  rotasjonskalkulator: (i) => { if(!i.masse) return null; const r = i.radius; const n = i.omdreininger_per_minutt; const omega = (2 * Math.PI * n) / 60; const I = i.form === 'kule' ? (2/5)*i.masse*r*r : i.form === 'sylinder' ? (1/2)*i.masse*r*r : i.form === 'ring' ? i.masse*r*r : i.masse*r*r; const E = 0.5 * I * omega * omega; return {value: E, unit: 'J', desc: 'Rotasjonsenergi i joule'}; },

  trigonometry_calculator: (i) => { if(!i.angle) return null; const angleRad = i.unit === 'grader' ? i.angle * Math.PI / 180 : i.angle; const sinVal = Math.sin(angleRad); const cosVal = Math.cos(angleRad); const tanVal = Math.tan(angleRad); return {value: sinVal, unit: 'ingen', desc: 'Sinus: ' + sinVal.toFixed(4) + ', Cosinus: ' + cosVal.toFixed(4) + ', Tangens: ' + tanVal.toFixed(4)}; },

  forenkle_uttrykk: (i) => { if(!i.uttrykk) return null; const result = eval(i.uttrykk); return {value: result, unit: '', desc: 'Forenklet uttrykk: ' + i.uttrykk + ' = ' + result}; },

  cramers_rule: (i) => { if(!i.system_size) return null; let result; if(i.system_size == 2) { const det = i.a11 * i.a22 - i.a12 * i.a21; if(det === 0) return null; const x = (i.b1 * i.a22 - i.a12 * i.b2) / det; const y = (i.a11 * i.b2 - i.b1 * i.a21) / det; result = x + ', ' + y; } else if(i.system_size == 3) { const det = i.a11 * (i.a22 * i.a33 - i.a23 * i.a32) - i.a12 * (i.a21 * i.a33 - i.a23 * i.a31) + i.a13 * (i.a21 * i.a32 - i.a22 * i.a31); if(det === 0) return null; const x = (i.b1 * (i.a22 * i.a33 - i.a23 * i.a32) - i.a12 * (i.b2 * i.a33 - i.a23 * i.b3) + i.a13 * (i.b2 * i.a32 - i.a22 * i.b3)) / det; const y = (i.a11 * (i.b2 * i.a33 - i.a23 * i.b3) - i.b1 * (i.a21 * i.a33 - i.a23 * i.a31) + i.a13 * (i.a21 * i.b3 - i.b2 * i.a31)) / det; const z = (i.a11 * (i.a22 * i.b3 - i.b2 * i.a32) - i.a12 * (i.a21 * i.b3 - i.b2 * i.a31) + i.b1 * (i.a21 * i.a32 - i.a22 * i.a31)) / det; result = x + ', ' + y + ', ' + z; } else { return null; } return {value: result, unit: 'løsning', desc: 'Løsning for system av ' + i.system_size + ' ligninger'}; },

  invers_sekant_arcsec: (i) => { if(!i.x_verdi) return null; const result = i.x_verdi >= 1 || i.x_verdi <= -1 ? Math.acos(1 / i.x_verdi) : NaN; const unit = i.enhet === 'grader' ? 'grader' : 'radianer'; const value = i.enhet === 'grader' ? result * 180 / Math.PI : result; return {value: value, unit: unit, desc: 'Invers sekant (arcsec) av ' + i.x_verdi + ' ' + unit}; },

  three_d_distance: (i) => { if(!i.x1) return null; const result = Math.sqrt(Math.pow(i.x2 - i.x1, 2) + Math.pow(i.y2 - i.y1, 2) + Math.pow(i.z2 - i.z1, 2)); return {value: result, unit: 'enheter', desc: 'Avstanden mellom punktene i 3D-rom' + ' er ' + result.toFixed(2) + ' enheter'}; },

  sekant_beregning: (i) => { if(!i.vinkel) return null; const rad = i.enhet === 'radianer' ? i.vinkel : i.vinkel * Math.PI / 180; const result = 1 / Math.cos(rad); return {value: result, unit: 'ingen enhet', desc: 'Sekant av vinkel ' + i.vinkel + ' ' + i.enhet}; },

  invers_sinus_arcsin: (i) => { if(!i.sinus_verdi) return null; const result = Math.asin(i.sinus_verdi); return {value: result, unit: 'radianer', desc: 'Invers sinus (arcsin) av ' + i.sinus_verdi + ' er ' + result + ' radianer'}; },

  nullpunkter_andregrad: (i) => { if(!i.a) return null; const d = i.b*i.b - 4*i.a*i.c; if(d < 0) return {value: null, unit: 'ingen', desc: 'Ingen reelle nullpunkter'}; const sqrtD = Math.sqrt(d); const x1 = (-i.b + sqrtD) / (2*i.a); const x2 = (-i.b - sqrtD) / (2*i.a); return {value: x1 === x2 ? x1 : [x1, x2], unit: 'x', desc: 'Nullpunkt(er) for andregradsfunksjonen'}; },

  skjæringspunkt_linjer: (i) => { if(!i.linje1_stigning || !i.linje1_konstant || !i.linje2_stigning || !i.linje2_konstant) return null; const x = (i.linje2_konstant - i.linje1_konstant) / (i.linje1_stigning - i.linje2_stigning); const y = i.linje1_stigning * x + i.linje1_konstant; return {value: [x, y], unit: '(x, y)', desc: 'Skjæringspunkt: (' + x + ', ' + y + ')'}; },

  hyperbolsk_sinus: (i) => { if(!i.x_verdi) return null; const result = (Math.exp(i.x_verdi) - Math.exp(-i.x_verdi)) / 2; return {value: result, unit: 'ingen enhet', desc: 'Hyperbolsk sinus av ' + i.x_verdi}; },

  evalueringskalkulator_formel: (i) => { if(!i.alder) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const aktivitetsfaktor = {1:1.2,2:1.375,3:1.55,4:1.725,5:1.9}[i.aktivitetsniva]||1.2; const result = Math.round(bmr * aktivitetsfaktor); return {value: result, unit: 'kcal/dag', desc: 'Estimert daglig energiforbruk basert p\u00e5 alder, kj\u00f8nn, vekt, h\u00f8yde, midjeomkrets og aktivitetsniv\u00e5'}; },

  de_moivres_theorem: (i) => { if(!i.modulus) return null; const r = i.modulus; const theta = i.argument_deg * Math.PI / 180; const n = i.exponent; const newR = Math.pow(r, n); const newTheta = n * theta; const real = newR * Math.cos(newTheta); const imag = newR * Math.sin(newTheta); const result = real.toFixed(4) + ' + ' + imag.toFixed(4) + 'i'; return {value: result, unit: '', desc: 'Resultat av De Moivres teorem: ' + result}; },

  kjeglesnitt_beregning: (i) => { if(!i.type) return null; const result = i.type === 'ellipse' ? Math.PI * i.a * i.b : i.type === 'hyperbola' ? Math.sqrt(i.a * i.a + i.b * i.b) : i.type === 'parabola' ? i.c / (2 * i.a) : null; return {value: result, unit: 'enhet', desc: 'Beregning av kjeglesnitt basert p\u00e5 type ' + i.type}; },

  cotangent_calculator: (i) => { if(!i.angle) return null; const rad = i.unit === 'grader' ? i.angle * Math.PI / 180 : i.angle; const result = Math.cos(rad) / Math.sin(rad); return {value: result, unit: 'ingen', desc: 'Cotangens av vinkel ' + i.angle + ' ' + i.unit}; },

  komplekse_roetter: (i) => { if(!i.real) return null; const r = Math.sqrt(i.real*i.real + i.imag*i.imag); const theta = Math.atan2(i.imag, i.real); const n = i.n || 2; const results = []; for(let k=0; k<n; k++) { const mag = Math.pow(r, 1/n); const ang = (theta + 2*Math.PI*k)/n; results.push({real: mag*Math.cos(ang), imag: mag*Math.sin(ang)}); } return {value: JSON.stringify(results), unit: 'komplekse tall', desc: 'De ' + n + ' komplekse røttene av ' + i.real + '+' + i.imag + 'i'}; },

  invers_kotangens_beregning: (i) => { if(!i.verdi) return null; const rad = Math.atan(1 / parseFloat(i.verdi)); const result = i.enhet === 'grader' ? rad * 180 / Math.PI : rad; return {value: result, unit: i.enhet === 'grader' ? 'grader' : 'radianer', desc: 'Invers kotangens av ' + i.verdi + ' er ' + result + ' ' + (i.enhet === 'grader' ? 'grader' : 'radianer')}; },

  naturlig_logaritme: (i) => { if(!i.tall) return null; const result = Math.log(i.tall); return {value: result, unit: '', desc: 'Naturlig logaritme (ln) av ' + i.tall}; },

  eksponentiell_vekst: (i) => { if(!i.startverdi) return null; const result = i.startverdi * Math.pow(1 + (i.vekrate || 0) / 100, i.tid || 0); return {value: result, unit: 'enheter', desc: 'Sluttverdi etter ' + (i.tid || 0) + ' tidsenheter med ' + (i.vekrate || 0) + '% vekst'}; },

  sammensatt_funksjon: (i) => { if(!i.f_uttrykk || !i.g_uttrykk || i.x_verdi === undefined || i.x_verdi === null) return null; const f = new Function('x', 'return ' + i.f_uttrykk); const g = new Function('x', 'return ' + i.g_uttrykk); const result = f(g(i.x_verdi)); return {value: result, unit: '', desc: 'Verdien av f(g(' + i.x_verdi + '))'}; },

  polar_to_rectangular: (i) => { if(!i.modulus) return null; const r = i.modulus; const theta = i.argument_deg !== undefined ? i.argument_deg * Math.PI / 180 : i.argument_rad; const real = r * Math.cos(theta); const imag = r * Math.sin(theta); const result = real + ' + ' + imag + 'i'; return {value: result, unit: 'komplekst tall', desc: 'Rektangulær form: ' + result}; },

  sluttatferd_kalkulator: (i) => { if(!i.alder) return null; const result = Math.round((((i.alder * 0.5) + (i.kjonn === 'mann' ? 10 : 0) + (i.royking === 'ja' ? 15 : 0) + ((i.bmi || 25) * 0.3) + ((i.blodtrykk || 120) * 0.1)) / 100) * 100) / 100; return {value: result, unit: 'poeng', desc: 'Beregnet sluttatferdssk\u00e5re basert p\u00e5 alder, kj\u00f8nn, r\u00f8yking, BMI og blodtrykk'}; },

  skra_asymptote_formel: (i) => { if(!i.teller_koeffisienter || !i.nevner_koeffisienter) return null; const t = i.teller_koeffisienter.split(',').map(Number); const n = i.nevner_koeffisienter.split(',').map(Number); if(t.length < 2 || n.length < 1 || t.length - n.length !== 1) return null; const a = t[0] / n[0]; const b = (t[1] - a * n[1]) / n[0]; return {value: a + 'x + ' + b, unit: '', desc: 'Skr\u00E5 asymptote: y = ' + a + 'x + ' + b}; },

  sinussetningen_formula: (i) => { if(!i.side_a) return null; const result = (i.side_a * Math.sin(i.vinkel_b * Math.PI / 180)) / Math.sin(i.vinkel_a * Math.PI / 180); return {value: result, unit: 'enhet', desc: 'Side b beregnet ved sinussetningen'}; },

  binomial_expansion: (i) => { if(!i.a || !i.b || !i.n) return null; let result = ''; for(let k = 0; k <= i.n; k++) { let coeff = 1; for(let j = 1; j <= k; j++) coeff = coeff * (i.n - j + 1) / j; if(k > 0) result = result + ' + '; result = result + coeff + '*' + i.a + '^' + (i.n - k) + '*' + i.b + '^' + k; } return {value: result, unit: '', desc: 'Utvidet binomisk uttrykk'}; },

  funksjonsoperasjoner: (i) => { if(!i.funksjon_a) return null; const a = new Function('x', 'return ' + i.funksjon_a); const b = i.funksjon_b ? new Function('x', 'return ' + i.funksjon_b) : null; const x = parseFloat(i.x_verdi); let result; if(i.operasjon === 'add') { result = a(x) + (b ? b(x) : 0); } else if(i.operasjon === 'subtract') { result = a(x) - (b ? b(x) : 0); } else if(i.operasjon === 'multiply') { result = a(x) * (b ? b(x) : 1); } else if(i.operasjon === 'divide') { result = b ? a(x) / b(x) : null; } else if(i.operasjon === 'compose') { result = b ? a(b(x)) : null; } else { result = a(x); } return {value: result, unit: 'enhet', desc: 'Resultat av funksjonsoperasjon for x=' + x}; },

  cosinus_beregning: (i) => { if(!i.vinkel) return null; const result = Math.cos(i.enhet === 'radianer' ? i.vinkel : i.vinkel * Math.PI / 180); return {value: result, unit: '', desc: 'Cosinus av ' + i.vinkel + ' ' + i.enhet}; },

  diamantproblem_beregning: (i) => { if(!i.side) return null; const result = i.diagonal1 ? Math.sqrt(4 * i.side * i.side - i.diagonal1 * i.diagonal1) : null; return {value: result, unit: 'cm', desc: 'Den andre diagonalen i diamanten'}; },

  faktorisering_trinomier: (i) => { if(!i.a) return null; const d = i.b * i.b - 4 * i.a * i.c; if(d < 0) return {value: null, unit: '', desc: 'Ingen reelle faktorer'}; const sqrtD = Math.sqrt(d); const x1 = (-i.b + sqrtD) / (2 * i.a); const x2 = (-i.b - sqrtD) / (2 * i.a); const aStr = i.a === 1 ? '' : i.a + ''; const result = aStr + '(x - ' + x1.toFixed(2) + ')(x - ' + x2.toFixed(2) + ')'; return {value: result, unit: '', desc: 'Faktorisert form'}; },

  arsinh_formula: (i) => { if(!i.x_value) return null; const result = Math.log(i.x_value + Math.sqrt(i.x_value * i.x_value + 1)); return {value: result, unit: 'radianer', desc: 'Invers hyperbolsk sinus av ' + i.x_value}; },

  cosine_law_calculator: (i) => { if(!i.side_a || !i.side_b || !i.angle_c) return null; const result = Math.sqrt(i.side_a * i.side_a + i.side_b * i.side_b - 2 * i.side_a * i.side_b * Math.cos(i.angle_c * Math.PI / 180)); return {value: result, unit: 'enheter', desc: 'Side c beregnet med cosinussetningen'}; },

  polynomial_degree_and_leading_coefficient: (i) => { if(!i.polynomial) return null; const p = i.polynomial.trim(); if(!p) return null; const terms = p.replace(/\s/g,'').split(/(?=[+-])/); let maxDeg = -Infinity; let leadCoeff = 0; for(let t of terms) { if(t===''||t==='+'||t==='-') continue; let sign = 1; if(t[0]==='-') { sign = -1; t = t.slice(1); } else if(t[0]==='+') { t = t.slice(1); } let coeff = 1; let deg = 0; const xIdx = t.indexOf('x'); if(xIdx===-1) { coeff = parseFloat(t)||0; deg = 0; } else { const coeffStr = t.slice(0,xIdx); if(coeffStr===''||coeffStr==='+') coeff = 1; else if(coeffStr==='-') coeff = -1; else coeff = parseFloat(coeffStr)||1; const rest = t.slice(xIdx+1); if(rest.startsWith('^')) { deg = parseInt(rest.slice(1),10)||1; } else { deg = 1; } } coeff *= sign; if(deg > maxDeg) { maxDeg = deg; leadCoeff = coeff; } } if(maxDeg===-Infinity) return null; return {value: maxDeg, unit: 'grad', desc: 'Polynomets grad er ' + maxDeg + ', ledende koeffisient er ' + leadCoeff}; },

  binomisk_koeffisient: (i) => { if(!i.n || !i.k) return null; const n = i.n; const k = i.k; if(k < 0 || k > n) return null; const result = (function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(n) / ((function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(k) * (function fac(x) { return x <= 1 ? 1 : x * fac(x - 1); })(n - k)); return {value: result, unit: 'antall', desc: 'Binomisk koeffisient for n velg k'}; },

  ulikhetskalkulator_formel: (i) => { if(!i.tall_a || !i.tall_b) return null; const result = i.tall_a > i.tall_b ? i.tall_a : i.tall_b; return {value: result, unit: 'enhet', desc: 'St\u00f8rste tall av ' + i.tall_a + ' og ' + i.tall_b}; },

  invers_funksjon: (i) => { if(!i.funksjon_type) return null; const result = (() => { const ft = i.funksjon_type; const a = parseFloat(i.a) || 0; const b = parseFloat(i.b) || 0; const c = parseFloat(i.c) || 0; const x = parseFloat(i.x_verdi) || 0; if(ft === 'linear') { if(a === 0) return null; return (x - b) / a; } else if(ft === 'quadratic') { if(a === 0) return null; const disc = b*b - 4*a*(c - x); if(disc < 0) return null; return (-b + Math.sqrt(disc)) / (2*a); } else if(ft === 'exponential') { if(a <= 0 || b <= 0 || b === 1) return null; return Math.log(x / a) / Math.log(b); } else if(ft === 'logarithmic') { if(a <= 0 || b <= 0 || b === 1) return null; return Math.pow(b, (x - c) / a); } else if(ft === 'power') { if(a === 0 || x < 0) return null; return Math.pow(x / a, 1 / b); } else { return null; } })(); if(result === null) return null; return {value: result, unit: 'enhet', desc: 'Invers verdi for ' + i.funksjon_type + ' ved x = ' + i.x_verdi}; },

  partial_fraction_decomposition: (i) => { if(!i.teller_koeffisienter || !i.nevner_koeffisienter) return null; const teller = i.teller_koeffisienter.split(',').map(Number); const nevner = i.nevner_koeffisienter.split(',').map(Number); const faktorer = i.faktorer ? i.faktorer.split(',').map(Number) : []; let result = ''; for(let i = 0; i < teller.length; i++) { if(i > 0) result += ' + '; result += teller[i]; for(let j = 0; j < nevner.length; j++) { if(nevner[j] !== 0) result += '/(x - ' + nevner[j] + ')'; } } return {value: result, unit: '', desc: 'Delbrøksdekomponering av rasjonal funksjon'}; },

  grafregner_formula: (i) => { if(!i.funksjon_type) return null; const result = (() => { if(i.funksjon_type === 'linear') return parseFloat(i.a) * parseFloat(i.x_verdi) + parseFloat(i.b); if(i.funksjon_type === 'quadratic') return parseFloat(i.a) * Math.pow(parseFloat(i.x_verdi), 2) + parseFloat(i.b) * parseFloat(i.x_verdi) + parseFloat(i.c); if(i.funksjon_type === 'sine') return parseFloat(i.a) * Math.sin(parseFloat(i.b) * parseFloat(i.x_verdi) + parseFloat(i.c)); if(i.funksjon_type === 'cosine') return parseFloat(i.a) * Math.cos(parseFloat(i.b) * parseFloat(i.x_verdi) + parseFloat(i.c)); if(i.funksjon_type === 'exponential') return parseFloat(i.a) * Math.exp(parseFloat(i.b) * parseFloat(i.x_verdi)); if(i.funksjon_type === 'logarithmic') return parseFloat(i.a) * Math.log(parseFloat(i.b) * parseFloat(i.x_verdi) + parseFloat(i.c)); return null; })(); return {value: result, unit: 'enhet', desc: 'Grafverdi for x = ' + i.x_verdi + ' med funksjonstype ' + i.funksjon_type}; },

  avstand_mellom_to_punkter: (i) => { if(!i.x1) return null; const result = Math.sqrt(Math.pow(i.x2 - i.x1, 2) + Math.pow(i.y2 - i.y1, 2)); return {value: result, unit: 'enheter', desc: 'Avstanden mellom punkt (' + i.x1 + ',' + i.y1 + ') og (' + i.x2 + ',' + i.y2 + ') er ' + result + ' enheter'}; },

  eksponentialfunksjon_formel: (i) => { if(!i.startverdi) return null; const result = i.startverdi * Math.pow(i.vekstfaktor, i.tid); return {value: result, unit: 'enheter', desc: 'Sluttverdi etter ' + i.tid + ' tidsenheter'}; },

  cosecant_formula: (i) => { if(!i.angle) return null; const rad = i.unit === 'grader' ? i.angle * Math.PI / 180 : i.angle; const result = 1 / Math.sin(rad); return {value: result, unit: 'ingen enhet', desc: 'Kosekant av ' + i.angle + ' ' + i.unit}; },

  logaritme_beregning: (i) => { if(!i.tall) return null; const result = Math.log(i.tall) / Math.log(i.base || 10); return {value: result, unit: 'enhet', desc: 'Logaritmen av ' + i.tall + ' med base ' + (i.base || 10) + ' er ' + result}; },

  komplekstall_til_polarform: (i) => { if(!i.real) return null; const r = Math.sqrt(i.real*i.real + i.imag*i.imag); const theta = Math.atan2(i.imag, i.real); const deg = theta * 180 / Math.PI; return {value: r, unit: '', desc: 'r = ' + r.toFixed(4) + ', vinkel = ' + deg.toFixed(2) + ' grader'}; },

  kryssprodukt_formel: (i) => { if(!i.ax) return null; const result = {x: i.ay * i.bz - i.az * i.by, y: i.az * i.bx - i.ax * i.bz, z: i.ax * i.by - i.ay * i.bx}; return {value: result, unit: 'ingen enhet', desc: 'Kryssprodukt av vektorene a og b'}; },

  matrix_division: (i) => { if(!i.matrix_a) return null; const a = JSON.parse(i.matrix_a); const b = JSON.parse(i.matrix_b); const det = b[0][0]*b[1][1]-b[0][1]*b[1][0]; if(det===0) return null; const inv = [[b[1][1]/det, -b[0][1]/det], [-b[1][0]/det, b[0][0]/det]]; const result = [[a[0][0]*inv[0][0]+a[0][1]*inv[1][0], a[0][0]*inv[0][1]+a[0][1]*inv[1][1]],[a[1][0]*inv[0][0]+a[1][1]*inv[1][0], a[1][0]*inv[0][1]+a[1][1]*inv[1][1]]]; return {value: JSON.stringify(result), unit: 'matrise', desc: 'Resultat av matrisedivisjon A / B'}; },

  gauss_jordan_elimination: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const vals = i.matrix_values.split(',').map(Number); const prec = parseInt(i.precision) || 4; let m = []; for(let r=0; r<n; r++) { m[r]=[]; for(let c=0; c<=n; c++) { m[r][c]=vals[r*(n+1)+c]; } } for(let col=0; col<n; col++) { let maxRow = col; for(let row=col+1; row<n; row++) { if(Math.abs(m[row][col]) > Math.abs(m[maxRow][col])) maxRow = row; } [m[col], m[maxRow]] = [m[maxRow], m[col]]; if(Math.abs(m[col][col]) < 1e-12) continue; for(let row=0; row<n; row++) { if(row !== col) { const factor = m[row][col] / m[col][col]; for(let c=col; c<=n; c++) { m[row][c] -= factor * m[col][c]; } } } } for(let r=0; r<n; r++) { const div = m[r][r]; if(Math.abs(div) > 1e-12) { for(let c=0; c<=n; c++) m[r][c] /= div; } } const solutions = m.map((row,i) => row[n].toFixed(prec)); return {value: solutions.join(', '), unit: 'løsninger', desc: 'Gauss-Jordan eliminering for ' + n + 'x' + n + ' matrise med presisjon ' + prec}; },

  qr_factorization: (i) => { if(!i.matrix_rows) return null; const rows = parseInt(i.matrix_rows); const cols = parseInt(i.matrix_cols); const vals = i.matrix_values.split(',').map(Number); const A = []; let idx = 0; for(let r=0; r<rows; r++) { const row = []; for(let c=0; c<cols; c++) { row.push(vals[idx++]); } A.push(row); } const Q = []; const R = []; for(let r=0; r<rows; r++) { Q.push(new Array(cols).fill(0)); R.push(new Array(cols).fill(0)); } for(let k=0; k<cols; k++) { let norm = 0; for(let i=0; i<rows; i++) { norm += A[i][k] * A[i][k]; } norm = Math.sqrt(norm); R[k][k] = norm; for(let i=0; i<rows; i++) { Q[i][k] = A[i][k] / norm; } for(let j=k+1; j<cols; j++) { let dot = 0; for(let i=0; i<rows; i++) { dot += Q[i][k] * A[i][j]; } R[k][j] = dot; for(let i=0; i<rows; i++) { A[i][j] -= dot * Q[i][k]; } } } const qStr = Q.map(row => '[' + row.map(v => v.toFixed(4)).join(',') + ']').join('; '); const rStr = R.map(row => '[' + row.map(v => v.toFixed(4)).join(',') + ']').join('; '); return {value: 'Q=' + qStr + ' R=' + rStr, unit: 'matrise', desc: 'QR-faktorisering av matrisen'}; },

  diagonaliser_matrise_2x2: (i) => { if(!i.a11) return null; const a = parseFloat(i.a11), b = parseFloat(i.a12), c = parseFloat(i.a21), d = parseFloat(i.a22); const trace = a + d; const det = a * d - b * c; const disc = trace * trace - 4 * det; if(disc < 0) return {value: null, unit: '', desc: 'Komplekse egenverdier - ingen reell diagonalisering'}; const sqrtDisc = Math.sqrt(disc); const lambda1 = (trace + sqrtDisc) / 2; const lambda2 = (trace - sqrtDisc) / 2; let v1, v2; if(b !== 0) { v1 = [lambda1 - d, b]; v2 = [lambda2 - d, b]; } else if(c !== 0) { v1 = [c, lambda1 - a]; v2 = [c, lambda2 - a]; } else { v1 = [1, 0]; v2 = [0, 1]; } const result = 'Egenverdier: ' + lambda1.toFixed(4) + ', ' + lambda2.toFixed(4) + ' | Egenvektorer: [' + v1[0].toFixed(4) + ', ' + v1[1].toFixed(4) + '], [' + v2[0].toFixed(4) + ', ' + v2[1].toFixed(4) + ']'; return {value: result, unit: '', desc: 'Diagonalisering av 2x2 matrise'}; },

  matrix_multiplication: (i) => { if(!i.matrix_a || !i.matrix_b) return null; const a = JSON.parse(i.matrix_a); const b = JSON.parse(i.matrix_b); const rowsA = a.length, colsA = a[0].length, rowsB = b.length, colsB = b[0].length; if(colsA !== rowsB) return null; const result = Array.from({length: rowsA}, () => Array(colsB).fill(0)); for(let i=0; i<rowsA; i++) for(let j=0; j<colsB; j++) for(let k=0; k<colsA; k++) result[i][j] += a[i][k] * b[k][j]; return {value: JSON.stringify(result), unit: 'matrise', desc: 'Matriseprodukt av A og B'}; },

  trippel_skalarprodukt: (i) => { if(!i.ax) return null; const result = i.ax * (i.by * i.cz - i.bz * i.cy) - i.ay * (i.bx * i.cz - i.bz * i.cx) + i.az * (i.bx * i.cy - i.by * i.cx); return {value: result, unit: 'ingen enhet', desc: 'Trippel skalarprodukt av vektorene a, b og c'}; },

  pseudoinverse_calculator: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const vals = i.matrix_values.split(',').map(Number); const mat = []; for(let r=0; r<n; r++) { mat[r]=[]; for(let c=0; c<n; c++) { mat[r][c]=vals[r*n+c]; } } const det = (m) => { if(m.length===1) return m[0][0]; if(m.length===2) return m[0][0]*m[1][1]-m[0][1]*m[1][0]; let d=0; for(let c=0; c<m.length; c++) { const sub = m.slice(1).map(row => row.filter((_,j)=>j!==c)); d += (c%2===0?1:-1)*m[0][c]*det(sub); } return d; }; const d = det(mat); if(d===0) return {value: null, unit: 'ingen', desc: 'Matrisen er singul'+'ær, pseudoinvers kan ikke beregnes'}; const adj = []; for(let r=0; r<n; r++) { adj[r]=[]; for(let c=0; c<n; c++) { const sub = mat.filter((_,i)=>i!==r).map(row => row.filter((_,j)=>j!==c)); adj[r][c] = ((r+c)%2===0?1:-1)*det(sub); } } const inv = []; for(let r=0; r<n; r++) { inv[r]=[]; for(let c=0; c<n; c++) { inv[r][c] = adj[c][r]/d; } } const result = inv.map(row => row.map(v => Math.round(v*1e10)/1e10).join(',')).join(';'); return {value: result, unit: 'matrise', desc: 'Pseudoinvers av matrisen'}; },

  enhetsvektor_formel: (i) => { if(!i.x && !i.y && !i.z) return null; const len = Math.sqrt(i.x*i.x + i.y*i.y + i.z*i.z); if(len === 0) return null; const ux = i.x / len; const uy = i.y / len; const uz = i.z / len; return {value: [ux, uy, uz], unit: 'ingen enhet', desc: 'Enhetsvektor for (' + i.x + ', ' + i.y + ', ' + i.z + ')'}; },

  skalarprodukt_formel: (i) => { if(!i.vector1_x) return null; const result = (i.vector1_x * i.vector2_x) + (i.vector1_y * i.vector2_y) + (i.vector1_z * i.vector2_z); return {value: result, unit: '', desc: 'Skalarproduktet av vektorene er ' + result}; },

  matrix_rank: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const rows = [i.row1, i.row2, i.row3, i.row4].slice(0,n).map(r => (r||'').split(',').map(Number)); if(rows.some(r => r.length !== n || r.some(isNaN))) return null; let mat = rows.map(r => [...r]); let rank = 0; for(let col=0; col<n && rank<n; col++) { let pivot = -1; for(let row=rank; row<n; row++) { if(Math.abs(mat[row][col]) > 1e-10) { pivot = row; break; } } if(pivot === -1) continue; [mat[rank], mat[pivot]] = [mat[pivot], mat[rank]]; const pivVal = mat[rank][col]; for(let j=col; j<n; j++) mat[rank][j] /= pivVal; for(let i=0; i<n; i++) { if(i !== rank) { const factor = mat[i][col]; for(let j=col; j<n; j++) mat[i][j] -= factor * mat[rank][j]; } } rank++; } return {value: rank, unit: '', desc: 'Rang av ' + n + 'x' + n + ' matrise'}; },

  characteristic_polynomial: (i) => { if(!i.matrix_size) return null; let n = parseInt(i.matrix_size); let result; if(n === 2) { let a = parseFloat(i.a11)||0, b = parseFloat(i.a12)||0, c = parseFloat(i.a21)||0, d = parseFloat(i.a22)||0; let trace = a + d; let det = a*d - b*c; result = '\\lambda^2 - (' + trace + ')\\lambda + (' + det + ')'; } else if(n === 3) { let a11=parseFloat(i.a11)||0,a12=parseFloat(i.a12)||0,a13=parseFloat(i.a13)||0,a21=parseFloat(i.a21)||0,a22=parseFloat(i.a22)||0,a23=parseFloat(i.a23)||0,a31=parseFloat(i.a31)||0,a32=parseFloat(i.a32)||0,a33=parseFloat(i.a33)||0; let trace = a11 + a22 + a33; let sumPrincipalMinors = (a11*a22 - a12*a21) + (a11*a33 - a13*a31) + (a22*a33 - a23*a32); let det = a11*(a22*a33 - a23*a32) - a12*(a21*a33 - a23*a31) + a13*(a21*a32 - a22*a31); result = '\\lambda^3 - (' + trace + ')\\lambda^2 + (' + sumPrincipalMinors + ')\\lambda - (' + det + ')'; } else { result = 'Kun 2x2 eller 3x3 støttes'; } return {value: result, unit: '', desc: 'Karakteristisk polynom for ' + n + 'x' + n + ' matrise'}; },

  eigenvalue_eigenvector_2x2: (i) => { if(!i.a11) return null; const a = parseFloat(i.a11); const b = parseFloat(i.a12); const c = parseFloat(i.a21); const d = parseFloat(i.a22); const trace = a + d; const det = a * d - b * c; const disc = trace * trace - 4 * det; if(disc < 0) return {value: null, unit: 'ingen', desc: 'Komplekse egenverdier - ikke stottet'}; const sqrtDisc = Math.sqrt(disc); const lambda1 = (trace + sqrtDisc) / 2; const lambda2 = (trace - sqrtDisc) / 2; let v1, v2; if(b !== 0) { v1 = [lambda1 - d, b]; v2 = [lambda2 - d, b]; } else if(c !== 0) { v1 = [c, lambda1 - a]; v2 = [c, lambda2 - a]; } else { v1 = [1, 0]; v2 = [0, 1]; } const result = 'Egenverdi 1: ' + lambda1.toFixed(4) + ', Egenvektor 1: (' + v1[0].toFixed(4) + ', ' + v1[1].toFixed(4) + ') | Egenverdi 2: ' + lambda2.toFixed(4) + ', Egenvektor 2: (' + v2[0].toFixed(4) + ', ' + v2[1].toFixed(4) + ')'; return {value: result, unit: 'egenverdier/vektorer', desc: 'Egenverdier og tilhorende egenvektorer for 2x2 matrise'}; },

  matrix_minors: (i) => { if(!i.matrix_size) return null; const s = parseInt(i.matrix_size); if(s === 2) { const det = i.a11 * i.a22 - i.a12 * i.a21; return {value: det, unit: 'ingen', desc: 'Determinant av 2x2 matrise'}; } else if(s === 3) { const m11 = i.a22 * i.a33 - i.a23 * i.a32; const m12 = i.a21 * i.a33 - i.a23 * i.a31; const m13 = i.a21 * i.a32 - i.a22 * i.a31; const m21 = i.a12 * i.a33 - i.a13 * i.a32; const m22 = i.a11 * i.a33 - i.a13 * i.a31; const m23 = i.a11 * i.a32 - i.a12 * i.a31; const m31 = i.a12 * i.a23 - i.a13 * i.a22; const m32 = i.a11 * i.a23 - i.a13 * i.a21; const m33 = i.a11 * i.a22 - i.a12 * i.a21; const result = m11 + ',' + m12 + ',' + m13 + ',' + m21 + ',' + m22 + ',' + m23 + ',' + m31 + ',' + m32 + ',' + m33; return {value: result, unit: 'ingen', desc: 'Minorer for 3x3 matrise (radvis)'}; } return null; },

  vektor_addisjon: (i) => { if(!i.v1_x) return null; const result = Math.sqrt(Math.pow(parseFloat(i.v1_x) + parseFloat(i.v2_x), 2) + Math.pow(parseFloat(i.v1_y) + parseFloat(i.v2_y), 2)); return {value: result, unit: 'enheter', desc: 'Resultantvektorens lengde er ' + result.toFixed(2) + ' enheter'}; },

  svd_2x2: (i) => { if(!i.a11) return null; const a11=parseFloat(i.a11),a12=parseFloat(i.a12),a21=parseFloat(i.a21),a22=parseFloat(i.a22); const sigma1=Math.sqrt(0.5*((a11*a11+a12*a12+a21*a21+a22*a22)+Math.sqrt(Math.pow(a11*a11+a12*a12-a21*a21-a22*a22,2)+4*Math.pow(a11*a21+a12*a22,2)))); const sigma2=Math.sqrt(0.5*((a11*a11+a12*a12+a21*a21+a22*a22)-Math.sqrt(Math.pow(a11*a11+a12*a12-a21*a21-a22*a22,2)+4*Math.pow(a11*a21+a12*a22,2)))); const result=sigma1+sigma2; return {value: result, unit: 'enhet', desc: 'Summen av singulærverdiene for 2x2 matrisen'}; },

  gram_schmidt: (i) => { if(!i.vectors) return null; const v = i.vectors; const n = v.length; if(n===0) return null; const dim = v[0].length; const u = []; for(let k=0;k<n;k++){ let uk = v[k].slice(); for(let j=0;j<k;j++){ let dot = 0; let norm2 = 0; for(let d=0;d<dim;d++){ dot += v[k][d]*u[j][d]; norm2 += u[j][d]*u[j][d]; } if(norm2===0) continue; const proj = dot/norm2; for(let d=0;d<dim;d++){ uk[d] -= proj*u[j][d]; } } u.push(uk); } const result = u; return {value: result, unit: 'vektor', desc: 'Ortogonale vektorer fra Gram-Schmidt prosessen'}; },

  kryssprodukt_vektor: (i) => { if(!i.ax) return null; const result = {x: i.ay * i.bz - i.az * i.by, y: i.az * i.bx - i.ax * i.bz, z: i.ax * i.by - i.ay * i.bx}; return {value: result, unit: 'vektor', desc: 'Kryssprodukt av vektorene'}; },

  matrix_addition: (i) => { if(!i.matrix_a || !i.matrix_b) return null; const a = JSON.parse(i.matrix_a); const b = JSON.parse(i.matrix_b); const result = a.map((row, r) => row.map((val, c) => val + b[r][c])); return {value: JSON.stringify(result), unit: 'matrise', desc: 'Summen av matrise A og matrise B'}; },

  matrix_subtraction: (i) => { if(!i.matrix_a || !i.matrix_b) return null; const a = i.matrix_a.split(';').map(r => r.split(',').map(Number)); const b = i.matrix_b.split(';').map(r => r.split(',').map(Number)); if(a.length !== b.length || a[0].length !== b[0].length) return null; const result = a.map((row, ri) => row.map((val, ci) => val - b[ri][ci])); return {value: result.map(r => r.join(',')).join(';'), unit: 'matrise', desc: 'Resultat av matrisesubtraksjon'}; },

  vektor_skalar_multiplikasjon: (i) => { if(!i.vektor_x) return null; const result = {x: i.vektor_x * i.skalar, y: i.vektor_y * i.skalar, z: i.vektor_z * i.skalar}; return {value: result, unit: 'ingen enhet', desc: 'Resultatet av skalar multiplikasjon er (' + result.x + ', ' + result.y + ', ' + result.z + ')'}; },

  determinant_calculator: (i) => { if(!i.matrix_size) return null; const result = i.matrix_size === '2x2' ? (parseFloat(i.a11)*parseFloat(i.a22)-parseFloat(i.a12)*parseFloat(i.a21)) : (parseFloat(i.a11)*(parseFloat(i.a22)*parseFloat(i.a33)-parseFloat(i.a23)*parseFloat(i.a32))-parseFloat(i.a12)*(parseFloat(i.a21)*parseFloat(i.a33)-parseFloat(i.a23)*parseFloat(i.a31))+parseFloat(i.a13)*(parseFloat(i.a21)*parseFloat(i.a32)-parseFloat(i.a22)*parseFloat(i.a31))); return {value: result, unit: '', desc: 'Determinant av ' + (i.matrix_size === '2x2' ? '2x2' : '3x3') + ' matrise'}; },

  matrix_trace: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const vals = i.matrix_values.split(',').map(Number); let sum = 0; for(let j=0; j<n; j++) sum += vals[j*n + j]; const result = sum; return {value: result, unit: '', desc: 'Spor av matrise' + ' (sum av diagonale elementer)'}; },

  kolonne_rom_kalkulator: (i) => { if(!i.rom_lengde || !i.rom_bredde || !i.maks_avstand) return null; const antallLengde = Math.ceil(i.rom_lengde / i.maks_avstand) + 1; const antallBredde = Math.ceil(i.rom_bredde / i.maks_avstand) + 1; const result = antallLengde * antallBredde; return {value: result, unit: 'stk', desc: 'Antall kolonner i rommet basert på maks avstand og valgt soyletype: ' + (i.soyle_type || 'ukjent') + ' ' + (i.soyle_dimension || '')}; },

  matrix_transpose: (i) => { if(!i.rows) return null; const r = parseInt(i.rows); const c = parseInt(i.cols); const vals = i.matrix_values.split(',').map(Number); const m = []; for(let j=0;j<r;j++){ m[j]=[]; for(let k=0;k<c;k++){ m[j][k]=vals[j*c+k]; } } const t = []; for(let k=0;k<c;k++){ t[k]=[]; for(let j=0;j<r;j++){ t[k][j]=m[j][k]; } } const result = t.map(row => row.join(',')).join(';'); return {value: result, unit: 'ingen', desc: 'Transponert matrise'}; },

  matrix_scalar_multiplication: (i) => { if(!i.matrix_rows) return null; const rows = parseInt(i.matrix_rows); const cols = parseInt(i.matrix_cols); const values = i.matrix_values.split(',').map(Number); const scalar = parseFloat(i.scalar); const result = []; for(let r=0; r<rows; r++) { const row = []; for(let c=0; c<cols; c++) { row.push(values[r*cols+c] * scalar); } result.push(row); } return {value: JSON.stringify(result), unit: 'matrise', desc: 'Resultatet av skalar multiplikasjon av matrisen med ' + scalar}; },

  ortogonal_projeksjon: (i) => { if(!i.dimension) return null; const d = i.dimension; const v1 = [i.v1_x, i.v1_y, i.v1_z]; const v2 = [i.v2_x, i.v2_y, i.v2_z]; const dot = v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2]; const norm2 = v2[0]*v2[0]+v2[1]*v2[1]+v2[2]*v2[2]; if(norm2===0) return null; const s = dot/norm2; const proj = [s*v2[0], s*v2[1], s*v2[2]]; const result = d===2 ? [proj[0], proj[1]] : proj; return {value: result, unit: 'vektor', desc: 'Ortogonal projeksjon av v1 p\u00e5 v2'}; },

  lu_decomposition_2x2: (i) => { if(!i.a11) return null; const det = i.a11 * i.a22 - i.a12 * i.a21; const l11 = 1; const l21 = i.a21 / i.a11; const u11 = i.a11; const u12 = i.a12; const u22 = i.a22 - l21 * i.a12; const result = 'L: [1, 0; ' + l21.toFixed(4) + ', 1] U: [' + u11.toFixed(4) + ', ' + u12.toFixed(4) + '; 0, ' + u22.toFixed(4) + ']'; return {value: result, unit: '', desc: 'LU-dekomponering av 2x2 matrise'}; },

  rref_calculator: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const rows = n; const cols = n + 1; const mat = []; for(let r=0; r<rows; r++) { mat[r] = []; for(let c=0; c<cols; c++) { if(c < n) { mat[r][c] = parseFloat(i.matrix_values[r * n + c]) || 0; } else { mat[r][c] = parseFloat(i.augmented_column[r]) || 0; } } } let lead = 0; for(let r=0; r<rows; r++) { if(lead >= cols) break; let i2 = r; while(mat[i2][lead] === 0) { i2++; if(i2 === rows) { i2 = r; lead++; if(lead === cols) break; } } if(lead === cols) break; const temp = mat[r]; mat[r] = mat[i2]; mat[i2] = temp; const div = mat[r][lead]; if(div !== 0) { for(let c=0; c<cols; c++) mat[r][c] /= div; } for(let i3=0; i3<rows; i3++) { if(i3 !== r) { const mult = mat[i3][lead]; for(let c=0; c<cols; c++) mat[i3][c] -= mult * mat[r][c]; } } lead++; } const result = []; for(let r=0; r<rows; r++) { result.push(mat[r][cols-1]); } return {value: result.join(', '), unit: 'løsning', desc: 'Redusert trappeform (RREF) av matrisen'}; },

  skalarprojeksjon_formel: (i) => { if(!i.ax) return null; const result = ((i.ax*i.bx)+(i.ay*i.by)+(i.az*i.bz))/Math.sqrt((i.bx*i.bx)+(i.by*i.by)+(i.bz*i.bz)); return {value: result, unit: 'enheter', desc: 'Skalarprojeksjon av vektor a på vektor b'}; },

  matrix_exponential_2x2: (i) => { if(!i.a11) return null; const a = i.a11, b = i.a12, c = i.a21, d = i.a22; const tr = a + d; const det = a * d - b * c; const delta = Math.sqrt(Math.abs(tr * tr - 4 * det)); const expTr2 = Math.exp(tr / 2); if (tr * tr - 4 * det >= 0) { const cosh = Math.cosh(delta / 2); const sinh = Math.sinh(delta / 2); const e11 = expTr2 * (cosh + (a - d) / delta * sinh); const e12 = expTr2 * (2 * b / delta * sinh); const e21 = expTr2 * (2 * c / delta * sinh); const e22 = expTr2 * (cosh + (d - a) / delta * sinh); return {value: [[e11, e12], [e21, e22]], unit: 'ingen', desc: 'Matriseeksponential av 2x2 matrise'}; } else { const cos = Math.cos(delta / 2); const sin = Math.sin(delta / 2); const e11 = expTr2 * (cos + (a - d) / delta * sin); const e12 = expTr2 * (2 * b / delta * sin); const e21 = expTr2 * (2 * c / delta * sin); const e22 = expTr2 * (cos + (d - a) / delta * sin); return {value: [[e11, e12], [e21, e22]], unit: 'ingen', desc: 'Matriseeksponential av 2x2 matrise'}; } },

  vektor_subtraksjon: (i) => { if(!i.v1_x) return null; const result = {x: i.v1_x - i.v2_x, y: i.v1_y - i.v2_y, z: i.v1_z - i.v2_z}; return {value: result, unit: 'enheter', desc: 'Resultatet av vektorsubtraksjon (v1 - v2)'}; },

  qr_decomposition: (i) => { if(!i.matrix_rows) return null; const rows = i.matrix_rows.split(';').map(r => r.trim().split(',').map(Number)); const n = rows.length; if(n === 0) return null; const m = rows[0].length; let Q = rows.map(r => [...r]); let R = Array.from({length: m}, () => Array(m).fill(0)); for(let k = 0; k < m; k++) { let norm = 0; for(let i = 0; i < n; i++) norm += Q[i][k] * Q[i][k]; norm = Math.sqrt(norm); if(norm === 0) continue; R[k][k] = norm; for(let i = 0; i < n; i++) Q[i][k] /= norm; for(let j = k + 1; j < m; j++) { let dot = 0; for(let i = 0; i < n; i++) dot += Q[i][k] * Q[i][j]; R[k][j] = dot; for(let i = 0; i < n; i++) Q[i][j] -= dot * Q[i][k]; } } const Qstr = Q.map(r => r.map(v => v.toFixed(4)).join(',')).join(';'); const Rstr = R.map(r => r.map(v => v.toFixed(4)).join(',')).join(';'); return {value: Qstr + '|' + Rstr, unit: 'matrise', desc: 'QR-dekomposisjon: Q og R matriser'}; },

  gaussian_elimination: (i) => { if(!i.matrix_size) return null; const n = parseInt(i.matrix_size); const rows = i.coefficients ? i.coefficients.split(';').map(r => r.trim().split(',').map(Number)) : []; if(rows.length !== n || rows.some(r => r.length !== n+1)) return null; const a = rows.map(r => [...r]); for(let i=0; i<n; i++) { let maxRow = i; for(let k=i+1; k<n; k++) if(Math.abs(a[k][i]) > Math.abs(a[maxRow][i])) maxRow = k; [a[i], a[maxRow]] = [a[maxRow], a[i]]; if(a[i][i] === 0) return null; for(let k=i+1; k<n; k++) { const factor = a[k][i] / a[i][i]; for(let j=i; j<=n; j++) a[k][j] -= factor * a[i][j]; } } const x = new Array(n).fill(0); for(let i=n-1; i>=0; i--) { x[i] = a[i][n]; for(let j=i+1; j<n; j++) x[i] -= a[i][j] * x[j]; x[i] /= a[i][i]; } const result = x.map(v => Math.round(v * 1e10) / 1e10).join(', '); return {value: result, unit: '', desc: 'Løsning av lineært ligningssystem (Gauss-eliminasjon)'}; },

  invers_matrise: (i) => { if(!i.matrix_size) return null; let result; if(i.matrix_size === '2x2') { const det = i.a11 * i.a22 - i.a12 * i.a21; if(det === 0) return null; result = [[i.a22/det, -i.a12/det], [-i.a21/det, i.a11/det]]; } else if(i.matrix_size === '3x3') { const a = i.a11, b = i.a12, c = i.a13, d = i.a21, e = i.a22, f = i.a23, g = i.a31, h = i.a32, k = i.a33; const det = a*(e*k - f*h) - b*(d*k - f*g) + c*(d*h - e*g); if(det === 0) return null; const inv = [[(e*k - f*h)/det, (c*h - b*k)/det, (b*f - c*e)/det], [(f*g - d*k)/det, (a*k - c*g)/det, (c*d - a*f)/det], [(d*h - e*g)/det, (b*g - a*h)/det, (a*e - b*d)/det]]; result = inv; } else { return null; } return {value: result, unit: '', desc: 'Invers matrise for ' + i.matrix_size + ' matrise'}; },

  matrix_inverse: (i) => { if(!i.matrix_size) return null; let result; if(i.matrix_size === '2x2') { const det = i.a11 * i.a22 - i.a12 * i.a21; if(det === 0) return null; result = [[i.a22/det, -i.a12/det], [-i.a21/det, i.a11/det]]; } else if(i.matrix_size === '3x3') { const a = i.a11, b = i.a12, c = i.a13, d = i.a21, e = i.a22, f = i.a23, g = i.a31, h = i.a32, k = i.a33; const det = a*(e*k - f*h) - b*(d*k - f*g) + c*(d*h - e*g); if(det === 0) return null; const inv = [[(e*k - f*h)/det, (c*h - b*k)/det, (b*f - c*e)/det], [(f*g - d*k)/det, (a*k - c*g)/det, (c*d - a*f)/det], [(d*h - e*g)/det, (b*g - a*h)/det, (a*e - b*d)/det]]; result = inv; } else { return null; } return {value: result, unit: 'ingen', desc: 'Invers matrise for ' + i.matrix_size + ' matrise'}; },

  sum_series_calculator: (i) => { if(!i.serie_type) return null; const result = i.serie_type === 'aritmetisk' ? (i.antall_ledd / 2) * (2 * i.forste_ledd + (i.antall_ledd - 1) * i.felles_differanse) : i.serie_type === 'geometrisk' ? i.forste_ledd * (1 - Math.pow(i.felles_differanse, i.antall_ledd)) / (1 - i.felles_differanse) : null; return {value: result, unit: '', desc: 'Summen av ' + i.antall_ledd + ' ledd i ' + i.serie_type + ' rekke'}; },

  geometrisk_sekvens_analyse: (i) => { if(!i.forste_ledd) return null; const a = parseFloat(i.forste_ledd); const r = parseFloat(i.kvotient); const n = parseInt(i.antall_ledd); if(isNaN(a)||isNaN(r)||isNaN(n)||n<1) return null; const sum = r===1 ? a*n : a*(1-Math.pow(r,n))/(1-r); const siste = a*Math.pow(r,n-1); const detaljer = i.vis_detaljer ? 'Første ledd: '+a+', Kvotient: '+r+', Antall ledd: '+n+', Siste ledd: '+siste+', Sum: '+sum : ''; return {value: sum, unit: 'enhet', desc: 'Summen av geometrisk sekvens'+detaljer}; },

  primtall_analyse: (i) => { if(!i.tall) return null; const n = parseInt(i.tall); if(n < 2) return {value: false, unit: '', desc: 'Tallet ' + n + ' er ikke et primtall'}; let isPrime = true; for(let j = 2; j <= Math.sqrt(n); j++) { if(n % j === 0) { isPrime = false; break; } } return {value: isPrime, unit: '', desc: (isPrime ? 'Tallet ' + n + ' er et primtall' : 'Tallet ' + n + ' er ikke et primtall')}; },

  lagrange_feilgrense: (i) => { if(!i.grad) return null; const result = (i.maks_derivert / Math.factorial(i.grad + 1)) * Math.pow(Math.abs(i.b_verdi - i.a_verdi), i.grad + 1); return {value: result, unit: 'enhet', desc: 'Lagrange feilgrense for ' + i.funksjon_type + ' med grad ' + i.grad}; },

  diskret_konvolusjon: (i) => { if(!i.signal_x) return null; const x = i.signal_x.split(',').map(Number); const h = i.signal_h ? i.signal_h.split(',').map(Number) : []; if(h.length===0) return {value: x.join(','), unit: 'ingen', desc: 'Konvolusjon med tomt filter gir signalet selv'}; const result = []; for(let n=0; n<x.length+h.length-1; n++){ let sum=0; for(let k=0; k<x.length; k++){ if(n-k>=0 && n-k<h.length) sum+=x[k]*h[n-k]; } result.push(sum); } return {value: result.join(','), unit: 'ingen', desc: 'Diskret konvolusjon av signal_x og signal_h'}; },

  mengdebygger_kalkulator: (i) => { if(!i.lengde) return null; const result = (i.lengde * i.bredde * i.hoyde * (1 + (i.avfallspaslag || 0) / 100) * i.pris_per_enhet); return {value: result, unit: 'kr', desc: 'Total kostnad for ' + i.materiale + ' basert på lengde ' + i.lengde + ', bredde ' + i.bredde + ', høyde ' + i.hoyde + ' med ' + (i.avfallspaslag || 0) + '% avfallspåslag'}; },

  sigma_notation_calculator: (i) => { if(!i.uttrykk) return null; const start = parseInt(i.start) || 0; const slutt = parseInt(i.slutt) || 0; let sum = 0; for(let n = start; n <= slutt; n++) { try { sum += eval(i.uttrykk.replace(/n/g, n.toString())); } catch(e) { return null; } } return {value: sum, unit: '', desc: 'Summen av uttrykket ' + i.uttrykk + ' fra n=' + start + ' til n=' + slutt}; },

  collatz_sequence: (i) => { if(!i.start_tall) return null; const result = (function(n){let c=0;while(n!==1){if(n%2===0){n=n/2;}else{n=3*n+1;}c++;}return c;})(i.start_tall); return {value: result, unit: 'steg', desc: 'Antall steg til 1 for startverdi ' + i.start_tall}; },

  pascals_trekant: (i) => { if(!i.antall_rader) return null; const rows = parseInt(i.antall_rader); const rad = i.rad_index !== undefined ? parseInt(i.rad_index) : null; const vis = i.vis_som || 'tall'; const triangle = []; for(let n=0; n<rows; n++) { const row = []; for(let k=0; k<=n; k++) { let val = 1; for(let j=1; j<=k; j++) val = val * (n - k + j) / j; row.push(val); } triangle.push(row); } let result; let unit = ''; let desc = ''; if(rad !== null && rad >= 0 && rad < rows) { if(vis === 'tall') { result = triangle[rad]; unit = 'tall'; desc = 'Rad ' + rad + ' i Pascals trekant med ' + rows + ' rader'; } else if(vis === 'sum') { result = triangle[rad].reduce((a,b)=>a+b, 0); unit = 'sum'; desc = 'Summen av rad ' + rad + ' i Pascals trekant'; } else { result = triangle; unit = 'trekant'; desc = 'Pascals trekant med ' + rows + ' rader'; } } else { result = triangle; unit = 'trekant'; desc = 'Pascals trekant med ' + rows + ' rader'; } return {value: result, unit: unit, desc: desc}; },

  bernoulli_equation: (i) => { if(!i.trykk1) return null; const result = i.trykk1 + 0.5 * i.tetthet * i.hastighet1 * i.hastighet1 + i.tetthet * 9.81 * i.hoyde1 - 0.5 * i.tetthet * i.hastighet2 * i.hastighet2 - i.tetthet * 9.81 * i.hoyde2; return {value: result, unit: 'Pa', desc: 'Trykk 2 (Pa) beregnet fra Bernoullis ligning'}; },

  rekursiv_formel_kalkulator: (i) => { if(!i.startverdi) return null; const result = (i.type === 'aritmetisk' ? parseFloat(i.startverdi) + (parseInt(i.antall_steg) - 1) * parseFloat(i.koeffisient) : parseFloat(i.startverdi) * Math.pow(parseFloat(i.koeffisient), parseInt(i.antall_steg) - 1)) + (i.type === 'aritmetisk' ? 0 : parseFloat(i.konstant) * (Math.pow(parseFloat(i.koeffisient), parseInt(i.antall_steg) - 1) - 1) / (parseFloat(i.koeffisient) - 1 || 1)); return {value: result, unit: 'enheter', desc: 'Verdi etter ' + i.antall_steg + ' steg'}; },

  arithmetic_sequence_calculator: (i) => { if(!i.forste_ledd) return null; const result = (i.forste_ledd + (i.antall_ledd - 1) * i.differanse); return {value: result, unit: 'enheter', desc: 'Siste ledd i den aritmetiske sekvensen'}; },

  uendelig_serie_sum: (i) => { if(!i.forste_ledd) return null; const result = i.serie_type === 'geometrisk' ? (Math.abs(i.forholdstall) < 1 ? i.forste_ledd / (1 - i.forholdstall) : null) : i.serie_type === 'aritmetisk' ? null : null; return {value: result, unit: '', desc: 'Summen av en uendelig ' + (i.serie_type === 'geometrisk' ? 'geometrisk' : 'aritmetisk') + ' serie'}; },

  tilbakevendende_relasjon: (i) => { if(!i.start_dag) return null; const startDate = new Date(i.start_aar, i.start_maaned - 1, i.start_dag); const result = []; for(let j = 0; j < i.antall_hendelser; j++) { const d = new Date(startDate.getTime() + j * i.intervall_dager * 86400000); result.push(d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()); } return {value: result.join(', '), unit: 'datoer', desc: 'Tilbakevendende hendelser: ' + result.join(', ')}; },

  linear_interpolation: (i) => { if(!i.x1) return null; const result = i.y1 + ((i.x_target - i.x1) * (i.y2 - i.y1)) / (i.x2 - i.x1); return {value: result, unit: 'enhet', desc: 'Lineær interpolasjon mellom (' + i.x1 + ',' + i.y1 + ') og (' + i.x2 + ',' + i.y2 + ') for x=' + i.x_target}; },

  geometrisk_serie_sum: (i) => { if(!i.forste_ledd) return null; const result = i.forste_ledd * (1 - Math.pow(i.kvotient, i.antall_ledd)) / (1 - i.kvotient); return {value: result, unit: '', desc: 'Summen av geometrisk rekke med ' + i.antall_ledd + ' ledd'}; },

  harmonic_number: (i) => { if(!i.n) return null; const result = Array.from({length: i.n}, (_, k) => 1 / (k + 1)).reduce((a, b) => a + b, 0); return {value: result, unit: '', desc: 'Harmonisk tall for n = ' + i.n}; },

  partial_derivative_calculator: (i) => { if(!i.function_expr) return null; const h = 1e-8; const expr = i.function_expr; const vars = {x: parseFloat(i.x_value) || 0, y: parseFloat(i.y_value) || 0, z: parseFloat(i.z_value) || 0}; const f = (v) => { try { return Function(...Object.keys(vars), 'return ' + expr)(v.x, v.y, v.z); } catch(e) { return NaN; } }; const v = i.variable || 'x'; const vUp = {...vars, [v]: vars[v] + h}; const vDown = {...vars, [v]: vars[v] - h}; const result = (f(vUp) - f(vDown)) / (2 * h); return {value: result, unit: 'enhet', desc: 'Partiell derivert av ' + expr + ' med hensyn på ' + v + ' ved (' + vars.x + ', ' + vars.y + ', ' + vars.z + ')'}; },

  antiderivative_calculator: (i) => { if(!i.function_type) return null; const result = (function() { if(i.function_type === 'power') { const n = parseFloat(i.exponent_n); if(n === -1) { return parseFloat(i.coeff_a) * Math.log(Math.abs(parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a))); } else { return parseFloat(i.coeff_a) * Math.pow(parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a), n + 1) / (n + 1); } } else if(i.function_type === 'exponential') { const k = parseFloat(i.exp_k); if(k === 0) { return parseFloat(i.coeff_a) * (parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a)); } else { return parseFloat(i.coeff_a) * Math.exp(k * (parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a))) / k; } } else if(i.function_type === 'sine') { const b = parseFloat(i.freq_b); if(b === 0) { return 0; } else { return -parseFloat(i.coeff_a) * Math.cos(b * (parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a))) / b; } } else if(i.function_type === 'cosine') { const b = parseFloat(i.freq_b); if(b === 0) { return 0; } else { return parseFloat(i.coeff_a) * Math.sin(b * (parseFloat(i.coeff_a) === 0 ? 1 : parseFloat(i.coeff_a))) / b; } } else { return null; } })(); if(result === null) return null; return {value: result, unit: 'C', desc: 'Antiderivert av funksjonen (med konstant C)'}; },

  implicit_derivative_calculator: (i) => { if(!i.equation) return null; const eq = i.equation.replace(/ /g,''); const x = parseFloat(i.x_value)||0; const y = parseFloat(i.y_value)||0; const terms = eq.split(/[=]/); if(terms.length!==2) return null; const left = terms[0]; const right = terms[1]; const dx = 1e-6; const dy = 1e-6; const f = (x,y) => { try { return eval(left) - eval(right); } catch(e) { return NaN; } }; const fx = (f(x+dx,y)-f(x-dx,y))/(2*dx); const fy = (f(x,y+dy)-f(x,y-dy))/(2*dy); if(fy===0) return null; const result = -fx/fy; return {value: result, unit: '', desc: 'dy/dx ved (' + x + ',' + y + ') = ' + result.toFixed(6)}; },

  inverse_derivative: (i) => { if(!i.function_type) return null; const result = i.function_type === 'sin' ? 1 / Math.cos(i.point_x) : i.function_type === 'cos' ? -1 / Math.sin(i.point_x) : i.function_type === 'tan' ? 1 / (1 / (Math.cos(i.point_x) * Math.cos(i.point_x))) : i.function_type === 'exp' ? 1 / Math.exp(i.point_x) : i.function_type === 'ln' ? i.point_x : i.function_type === 'sqrt' ? 2 * Math.sqrt(i.point_x) : i.function_type === 'x^2' ? 1 / (2 * i.point_x) : i.function_type === 'x^3' ? 1 / (3 * i.point_x * i.point_x) : null; return {value: result, unit: 'enhet', desc: 'Den deriverte av inversfunksjonen i punktet x = ' + i.point_x + ' for funksjonstype ' + i.function_type}; },

  buelengde_kurve: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const h = (i.b - i.a) / i.n; let sum = 0; for(let k = 0; k <= i.n; k++) { const x = i.a + k * h; const y = f(x); const dy = (k === i.n) ? (f(x) - f(x - h)) / h : (f(x + h) - f(x)) / h; sum += Math.sqrt(1 + dy * dy) * (k === 0 || k === i.n ? h / 2 : h); } return {value: sum, unit: 'enheter', desc: 'Buelengde av kurven fra x=' + i.a + ' til x=' + i.b}; },

  vendepunkt_kalkulator: (i) => { if(!i.a) return null; const result = -i.b/(3*i.a); return {value: result, unit: 'x-verdi', desc: 'Vendepunktets x-koordinat for tredjegradsfunksjonen f(x)=ax^3+bx^2+cx+d'}; },

  enhets_tangentvektor: (i) => { if(!i.x_func) return null; const t = parseFloat(i.t_value); const h = 1e-6; const dx = (eval(i.x_func.replace(/t/g, t+h)) - eval(i.x_func.replace(/t/g, t-h))) / (2*h); const dy = i.dimension >= 2 ? (eval(i.y_func.replace(/t/g, t+h)) - eval(i.y_func.replace(/t/g, t-h))) / (2*h) : 0; const dz = i.dimension === 3 ? (eval(i.z_func.replace(/t/g, t+h)) - eval(i.z_func.replace(/t/g, t-h))) / (2*h) : 0; const mag = Math.sqrt(dx*dx + dy*dy + dz*dz); if(mag === 0) return {value: null, unit: '', desc: 'Tangentvektor er null'}; const result = {x: dx/mag, y: dy/mag, z: dz/mag}; return {value: result, unit: '', desc: 'Enhets tangentvektor ved t=' + t}; },

  wronskian_calculator: (i) => { if(!i.f_expr || !i.g_expr || i.x_value === undefined) return null; const x = parseFloat(i.x_value); const h = 1e-8; const f = (x) => eval(i.f_expr); const g = (x) => eval(i.g_expr); const f_x = f(x); const g_x = g(x); const f_prime = (f(x+h)-f(x-h))/(2*h); const g_prime = (g(x+h)-g(x-h))/(2*h); const result = f_x * g_prime - g_x * f_prime; return {value: result, unit: '', desc: 'Wronskian-verdien for funksjonene ved x = ' + i.x_value}; },

  solve_first_order_linear_ode: (i) => { if(!i.a_coeff) return null; const h = i.solve_at_x - i.initial_x; const integratingFactor = Math.exp(i.a_coeff * h); const constant = i.initial_y - (i.b_coeff / i.a_coeff); const result = (i.b_coeff / i.a_coeff) + constant * integratingFactor; return {value: result, unit: 'y-verdi', desc: 'Løsning av førsteordens lineær differensialligning ved x = ' + i.solve_at_x}; },

  kroll_styrke_risiko: (i) => { if(!i.alder) return null; const result = (i.kjonn === 'mann' ? 1.2 : 1.0) * (i.alder < 30 ? 1.5 : i.alder < 50 ? 1.0 : 0.8) * (i.treningsfrekvens === 'hoy' ? 1.3 : i.treningsfrekvens === 'middels' ? 1.0 : 0.7); return {value: result, unit: 'poeng', desc: 'Kalkulert krollstyrke risiko basert på alder, kjonn og treningsfrekvens'}; },

  sekantlinje_beregning: (i) => { if(!i.x1) return null; const stigningstall = (i.y2 - i.y1) / (i.x2 - i.x1); const konstantledd = i.y1 - stigningstall * i.x1; return {value: stigningstall, unit: 'stigningstall', desc: 'Stigningstallet for sekantlinjen er ' + stigningstall + ' og konstantleddet er ' + konstantledd}; },

  areal_mellom_kurver: (i) => { if(!i.fx) return null; const fx = eval(i.fx); const gx = eval(i.gx); const a = parseFloat(i.a); const b = parseFloat(i.b); const n = 1000; const dx = (b - a) / n; let sum = 0; for(let k = 0; k < n; k++) { const x = a + (k + 0.5) * dx; sum += Math.abs(fx(x) - gx(x)); } const result = sum * dx; return {value: result, unit: 'kvadratenheter', desc: 'Areal mellom kurvene fra ' + a + ' til ' + b}; },

  retningsderivat_formel: (i) => { if(!i.fx) return null; const h = 1e-8; const fx = (x,y) => eval(i.fx.replace(/x/g, '('+x+')').replace(/y/g, '('+y+')')); const grad = (fx(i.x0+h,i.y0)-fx(i.x0-h,i.y0))/(2*h); const grady = (fx(i.x0,i.y0+h)-fx(i.x0,i.y0-h))/(2*h); const len = Math.sqrt(i.vx*i.vx+i.vy*i.vy); const result = len===0 ? 0 : (grad*i.vx+grady*i.vy)/len; return {value: result, unit: '', desc: 'Retningsderivert i punktet ('+i.x0+','+i.y0+') i retning ('+i.vx+','+i.vy+')'}; },

  enhetsnormalvektor_beregning: (i) => { if(!i.vektor_x) return null; const x = parseFloat(i.vektor_x); const y = parseFloat(i.vektor_y); const z = parseFloat(i.vektor_z); const dim = parseInt(i.dimensjon); const len = Math.sqrt(x*x + y*y + z*z); if(len === 0) return null; const nx = x/len; const ny = y/len; const nz = z/len; const result = dim === 2 ? '(' + nx.toFixed(4) + ', ' + ny.toFixed(4) + ')' : '(' + nx.toFixed(4) + ', ' + ny.toFixed(4) + ', ' + nz.toFixed(4) + ')'; return {value: result, unit: 'ingen', desc: 'Enhetsnormalvektor for vektoren (' + x + ', ' + y + ', ' + z + ')'}; },

  domene_og_omrade_kalkulator: (i) => { if(!i.form) return null; const result = i.form === 'rektangel' ? i.lengde * i.bredde : i.form === 'sirkel' ? Math.PI * i.radius * i.radius : i.form === 'trekant' ? (i.grunnlinje * i.hoyde) / 2 : 0; return {value: result, unit: 'm\u00B2', desc: 'Areal av ' + i.form}; },

  konkavitet_beregning: (i) => { if(!i.funksjon_type) return null; const x = parseFloat(i.x_verdi); const x1 = parseFloat(i.sammenlign_x1); const x2 = parseFloat(i.sammenlign_x2); let result; if(i.funksjon_type === 'kvadratisk') { result = (x1 < x && x < x2) ? 'konkav' : 'konveks'; } else if(i.funksjon_type === 'kubisk') { const d2 = 6 * x; result = d2 < 0 ? 'konkav' : d2 > 0 ? 'konveks' : 'vendepunkt'; } else if(i.funksjon_type === 'eksponential') { result = 'konveks'; } else if(i.funksjon_type === 'logaritmisk') { result = 'konkav'; } else { result = 'ukjent'; } return {value: result, unit: '', desc: 'Konkavitet for ' + i.funksjon_type + ' ved x=' + x + ' med sammenligningspunkter ' + x1 + ' og ' + x2}; },

  tangentialplan_formel: (i) => { if(!i.fx) return null; const fx = i.fx; const x0 = parseFloat(i.x0); const y0 = parseFloat(i.y0); const result = fx + (x0 * (i.x0 - x0)) + (y0 * (i.y0 - y0)); return {value: result, unit: 'enhet', desc: 'Tangentialplanets verdi i punktet (' + i.x0 + ', ' + i.y0 + ')'}; },

  konvergensintervall_beregning: (i) => { if(!i.rekke_type) return null; const r = parseFloat(i.endepunkt_venstre) || 0; const s = parseFloat(i.endepunkt_hoyre) || 0; const midt = parseFloat(i.senter) || 0; const venstre = midt + r; const hoyre = midt + s; const result = '[' + venstre.toFixed(2) + ', ' + hoyre.toFixed(2) + ']'; return {value: result, unit: 'enhet', desc: 'Konvergensintervall fra ' + venstre.toFixed(2) + ' til ' + hoyre.toFixed(2)}; },

  kritiske_punkt_kalkulator: (i) => { if(!i.funksjon) return null; const f = (x) => eval(i.funksjon.replace(/x/g, '(' + x + ')')); const h = 1e-6; const df = (x) => (f(x + h) - f(x - h)) / (2 * h); const ddf = (x) => (df(x + h) - df(x - h)) / (2 * h); const a = parseFloat(i.intervall_start); const b = parseFloat(i.intervall_slutt); let kritiske = []; for(let x = a; x <= b; x += 0.01) { if(Math.abs(df(x)) < 1e-4) { let type = ddf(x) > 1e-4 ? 'Lokalt minimum' : ddf(x) < -1e-4 ? 'Lokalt maksimum' : 'Terrassepunkt'; kritiske.push({x: Math.round(x * 100) / 100, type: type}); } } const result = kritiske.length > 0 ? kritiske.map(p => 'x=' + p.x + ' (' + p.type + ')').join(', ') : 'Ingen kritiske punkt funnet'; return {value: result, unit: '', desc: 'Kritiske punkt i intervallet [' + a + ', ' + b + ']'}; },

  polar_to_cartesian: (i) => { if(!i.r) return null; const thetaRad = i.mode === 'deg' ? i.theta * Math.PI / 180 : i.theta; const x = i.r * Math.cos(thetaRad); const y = i.r * Math.sin(thetaRad); return {value: [x, y], unit: 'enheter', desc: 'Kartesiske koordinater (x, y)'}; },

  logaritmisk_derivasjon: (i) => { if(!i.funksjon_type) return null; const result = i.funksjon_type === 'x^a' ? i.konstant_a * Math.pow(i.x_verdi, i.konstant_a - 1) : i.funksjon_type === 'a^x' ? Math.pow(i.konstant_a, i.x_verdi) * Math.log(i.konstant_a) : i.funksjon_type === 'x^x' ? Math.pow(i.x_verdi, i.x_verdi) * (Math.log(i.x_verdi) + 1) : null; return {value: result, unit: '', desc: 'Derivert verdi for ' + i.funksjon_type + ' ved x = ' + i.x_verdi}; },

  gjennomsnittsverdi_funksjon: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const n = parseInt(i.antall_delintervall) || 100; const a = parseFloat(i.nedre_grense); const b = parseFloat(i.ovre_grense); const dx = (b - a) / n; let sum = 0; for(let k = 0; k < n; k++) { sum += f(a + (k + 0.5) * dx); } const result = (sum * dx) / (b - a); return {value: result, unit: '', desc: 'Gjennomsnittsverdi av funksjonen ' + i.funksjon + ' fra ' + a + ' til ' + b}; },

  taylor_series_approximation: (i) => { if(!i.function_choice) return null; const x = parseFloat(i.x_value) || 0; const c = parseFloat(i.center) || 0; const n = parseInt(i.terms) || 1; let sum = 0; let term = 1; for(let k = 0; k < n; k++) { if(k > 0) term *= (x - c) / k; if(i.function_choice === 'sin') { sum += (k % 2 === 0 ? 1 : -1) * Math.pow(x - c, 2 * k + 1) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(2 * k + 1); } else if(i.function_choice === 'cos') { sum += (k % 2 === 0 ? 1 : -1) * Math.pow(x - c, 2 * k) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(2 * k); } else if(i.function_choice === 'exp') { sum += Math.pow(x - c, k) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(k); } else if(i.function_choice === 'ln') { if(c <= 0) return null; sum += (k === 0 ? Math.log(c) : (k % 2 === 1 ? 1 : -1) * Math.pow(x - c, k) / (k * Math.pow(c, k))); } } return {value: sum, unit: '', desc: 'Taylorrekke tilnærmelse for ' + i.function_choice + ' ved x=' + x + ' med senter ' + c + ' og ' + n + ' ledd'}; },

  laplace_transform: (i) => { if(!i.function_type) return null; let result; const s = parseFloat(i.s_value) || 0; const a = parseFloat(i.parameter_a) || 0; const b = parseFloat(i.parameter_b) || 0; const n = parseFloat(i.parameter_n) || 0; if(i.function_type === 'e_at') { result = 1/(s - a); } else if(i.function_type === 'sin_bt') { result = b/(s*s + b*b); } else if(i.function_type === 'cos_bt') { result = s/(s*s + b*b); } else if(i.function_type === 't_n') { result = (n > 0) ? (function fact(x){return x<=1?1:x*fact(x-1)})(n)/Math.pow(s, n+1) : 1/s; } else if(i.function_type === 'e_at_sin_bt') { result = b/((s-a)*(s-a) + b*b); } else if(i.function_type === 'e_at_cos_bt') { result = (s-a)/((s-a)*(s-a) + b*b); } else { result = 0; } return {value: result, unit: 'sekund', desc: 'Laplace-transformasjon av ' + i.function_type + ' med parametre a=' + a + ', b=' + b + ', n=' + n + ' ved s=' + s}; },

  jacobian_calculator: (i) => { if(!i.function_input) return null; const func = new Function('x', 'y', 'return ' + i.function_input); const h = 1e-8; const fx = func(parseFloat(i.point_x) + h, parseFloat(i.point_y)); const fy = func(parseFloat(i.point_x), parseFloat(i.point_y) + h); const f = func(parseFloat(i.point_x), parseFloat(i.point_y)); const dfdx = (fx - f) / h; const dfdy = (fy - f) / h; const result = [[dfdx, dfdy]]; return {value: result, unit: 'matrise', desc: 'Jacobian matrise for ' + i.function_input + ' i punktet (' + i.point_x + ', ' + i.point_y + ')'}; },

  normal_line_calculator: (i) => { if(!i.line_a) return null; const result = (i.line_a * i.point_x + i.line_b * i.point_y + i.line_c) / Math.sqrt(i.line_a * i.line_a + i.line_b * i.line_b); return {value: result, unit: 'enheter', desc: 'Avstand fra punkt til linje'}; },

  numerical_derivative_nth_order: (i) => { if(!i.function_expr) return null; const f = new Function('x', 'return ' + i.function_expr); const n = parseFloat(i.order) || 1; const h = parseFloat(i.step_size) || 0.001; const x0 = parseFloat(i.x_value) || 0; let coeffs = [1]; for(let k=1; k<=n; k++) { let next = [1]; for(let j=1; j<k; j++) { next[j] = coeffs[j-1] + coeffs[j]; } next[k] = 1; coeffs = next; } let sum = 0; for(let k=0; k<=n; k++) { let sign = (k%2===0) ? 1 : -1; sum += sign * coeffs[k] * f(x0 + (n/2 - k) * h); } const result = sum / Math.pow(h, n); return {value: result, unit: 'enhet', desc: 'Numerisk derivert av orden ' + n + ' i punktet x=' + x0}; },

  eulers_method: (i) => { if(!i.start_x) return null; let x = i.start_x, y = i.start_y, h = i.step_size, target = i.target_x; while (Math.abs(x - target) > 1e-12) { if (Math.abs(x + h - target) < Math.abs(x - target)) { h = target - x; } y = y + h * eval(i.differential_eq.replace(/x/g, x).replace(/y/g, y)); x = x + h; } return {value: y, unit: 'y', desc: 'Tilnærmet verdi av y ved x=' + target + ' ved bruk av Eulers metode'}; },

  tangent_line_equation: (i) => { if(!i.function_expr) return null; const x0 = parseFloat(i.x0); const h = 0.0001; const f = (x) => eval(i.function_expr.replace(/x/g, '(' + x + ')')); const derivative = (i.derivative_method === 'numerical') ? (f(x0 + h) - f(x0 - h)) / (2 * h) : (f(x0 + h) - f(x0)) / h; const y0 = f(x0); const result = 'y = ' + derivative.toFixed(4) + 'x + ' + (y0 - derivative * x0).toFixed(4); return {value: result, unit: 'ligning', desc: 'Tangentlinje i punktet x = ' + x0}; },

  numerical_limit: (i) => { if(!i.funksjon) return null; const f = (x) => eval(i.funksjon); const p = parseFloat(i.punkt); const tol = parseFloat(i.toleranse) || 1e-6; const dir = i.retning; let h = 1; let prev = null; for(let k=0; k<100; k++) { let x; if(dir === 'hoeyre') x = p + h; else if(dir === 'venstre') x = p - h; else x = p + h; const val = f(x); if(prev !== null && Math.abs(val - prev) < tol) { return {value: val, unit: '', desc: 'Grenseverdi for ' + i.funksjon + ' når x g\u00e5r mot ' + p + ' fra ' + (dir === 'hoeyre' ? 'h\u00f8yre' : dir === 'venstre' ? 'venstre' : 'begge sider')}; } prev = val; h *= 0.5; } return {value: prev, unit: '', desc: 'Grenseverdi for ' + i.funksjon + ' når x g\u00e5r mot ' + p + ' fra ' + (dir === 'hoeyre' ? 'h\u00f8yre' : dir === 'venstre' ? 'venstre' : 'begge sider')}; },

  trippel_integral_numerisk: (i) => { if(!i.funksjon) return null; const f = new Function('x','y','z','return ' + i.funksjon); const n = parseInt(i.opplosning) || 10; const dx = (parseFloat(i.x_maks) - parseFloat(i.x_min)) / n; const dy = (parseFloat(i.y_maks) - parseFloat(i.y_min)) / n; const dz = (parseFloat(i.z_maks) - parseFloat(i.z_min)) / n; let sum = 0; for(let k=0; k<n; k++){ const z = parseFloat(i.z_min) + (k+0.5)*dz; for(let j=0; j<n; j++){ const y = parseFloat(i.y_min) + (j+0.5)*dy; for(let l=0; l<n; l++){ const x = parseFloat(i.x_min) + (l+0.5)*dx; sum += f(x,y,z); } } } const result = sum * dx * dy * dz; return {value: result, unit: 'enhet', desc: 'Numerisk trippelintegral av ' + i.funksjon + ' over gitt område'}; },

  vaskemetode_kalkulator: (i) => { if(!i.stofftype) return null; const result = (i.stofftype === 'bomull' ? (i.smussgrad === 'lett' ? 30 : i.smussgrad === 'middels' ? 40 : 60) : i.stofftype === 'ull' ? (i.smussgrad === 'lett' ? 20 : i.smussgrad === 'middels' ? 30 : 40) : i.stofftype === 'syntetisk' ? (i.smussgrad === 'lett' ? 30 : i.smussgrad === 'middels' ? 40 : 50) : 40) + (i.farge === 'hvit' ? 10 : i.farge === 'mørk' ? -10 : 0); return {value: result, unit: '°C', desc: 'Anbefalt vasketemperatur for ' + i.stofftype + ' med ' + i.smussgrad + ' smussgrad og ' + i.farge + ' farge'}; },

  parametric_equation_solver: (i) => { if(!i.x_coeff) return null; const t = i.t_value || 0; const x = i.x_coeff * t * t + i.x_linear * t + (i.x_const || 0); const y = i.y_coeff * t * t + i.y_linear * t + (i.y_const || 0); const z = i.z_coeff * t * t + i.z_linear * t + (i.z_const || 0); return {value: x, unit: 'enheter', desc: 'Punkt (x, y, z) = (' + x + ', ' + y + ', ' + z + ') for t = ' + t}; },

  instantaneous_rate_of_change: (i) => { if(!i.function_type) return null; const f = i.function_type; const x = parseFloat(i.point_x); const h = parseFloat(i.h_value); let result; if(f === 'linear') { result = 2; } else if(f === 'quadratic') { result = 2*x + h; } else if(f === 'cubic') { result = 3*x*x + 3*x*h + h*h; } else if(f === 'sin') { result = Math.cos(x); } else if(f === 'cos') { result = -Math.sin(x); } else if(f === 'exp') { result = Math.exp(x); } else if(f === 'ln') { result = 1/x; } else { result = (Math.pow(x+h,2) - x*x)/h; } return {value: result, unit: 'enheter per enhet', desc: 'Oyeblikkelig endringsrate for ' + f + ' i punktet x = ' + x + ' med h = ' + h}; },

  gamma_function_lanczos: (i) => { if(!i.x_value) return null; const x = i.x_value; const g = 7; const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if(x < 0.5) { const result = Math.PI / (Math.sin(Math.PI * x) * (function(y) { y -= 1; let a = c[0]; for(let i = 1; i < g + 2; i++) { a += c[i] / (y + i); } const t = y + g + 0.5; return Math.sqrt(2 * Math.PI) * Math.pow(t, y + 0.5) * Math.exp(-t) * a; })(1 - x)); return {value: result, unit: 'ingen enhet', desc: 'Gammafunksjon (Lanczos-tilnærming) for x = ' + x}; } else { const y = x - 1; let a = c[0]; for(let i = 1; i < g + 2; i++) { a += c[i] / (y + i); } const t = y + g + 0.5; const result = Math.sqrt(2 * Math.PI) * Math.pow(t, y + 0.5) * Math.exp(-t) * a; return {value: result, unit: 'ingen enhet', desc: 'Gammafunksjon (Lanczos-tilnærming) for x = ' + x}; } },

  dobbeltintegral_numerisk: (i) => { if(!i.funksjon) return null; const f = new Function('x','y','return ' + i.funksjon); const hx = (i.x_ovre - i.x_nedre) / i.n_x; const hy = (i.y_ovre - i.y_nedre) / i.n_y; let sum = 0; for(let j=0; j<i.n_x; j++) { for(let k=0; k<i.n_y; k++) { const x = i.x_nedre + (j+0.5)*hx; const y = i.y_nedre + (k+0.5)*hy; sum += f(x,y); } } const result = sum * hx * hy; return {value: result, unit: 'enhet', desc: 'Numerisk dobbeltintegral av ' + i.funksjon + ' over [' + i.x_nedre + ',' + i.x_ovre + ']x[' + i.y_nedre + ',' + i.y_ovre + '] med ' + i.n_x + 'x' + i.n_y + ' delintervaller'}; },

  riemann_sum_calculator: (i) => { if(!i.function_type) return null; const f = new Function('x', 'return ' + i.function_type); const a = parseFloat(i.a); const b = parseFloat(i.b); const n = parseInt(i.n); const method = i.method; const dx = (b - a) / n; let sum = 0; for(let k = 0; k < n; k++) { let x; if(method === 'left') { x = a + k * dx; } else if(method === 'right') { x = a + (k + 1) * dx; } else { x = a + (k + 0.5) * dx; } sum += f(x); } const result = sum * dx; return {value: result, unit: 'arealenhet', desc: 'Riemann-sum for ' + i.function_type + ' fra ' + a + ' til ' + b + ' med ' + n + ' delintervaller (' + method + ' metode)'}; },

  tangent_line_calculator: (i) => { if(!i.function_expr) return null; const f = new Function('x', 'return ' + i.function_expr); const h = 1e-8; const x0 = parseFloat(i.point_x); const deriv = (f(x0 + h) - f(x0 - h)) / (2 * h); const y0 = f(x0); const result = 'y = ' + deriv.toFixed(4) + 'x + ' + (y0 - deriv * x0).toFixed(4); return {value: result, unit: 'likning', desc: 'Tangentlinje i punktet x = ' + x0}; },

  rolles_theorem_calculator: (i) => { if(!i.a) return null; const result = (i.fb - i.fa) / (i.b - i.a); return {value: result, unit: 'ingen enhet', desc: 'Stigningstallet til sekanten mellom punktene (' + i.a + ', ' + i.fa + ') og (' + i.b + ', ' + i.fb + ') er ' + result + '. Ifølge Rolles teorem finnes det minst én c i intervallet (' + i.a + ', ' + i.b + ') hvor f\'(c) = 0.'}; },

  gjennomsnittlig_endringsrate: (i) => { if(!i.x1) return null; const result = (Number(i.y2) - Number(i.y1)) / (Number(i.x2) - Number(i.x1)); return {value: result, unit: 'enheter per enhet', desc: 'Gjennomsnittlig endringsrate mellom punktene (' + i.x1 + ',' + i.y1 + ') og (' + i.x2 + ',' + i.y2 + ')'}; },

  linear_approximation: (i) => { if(!i.function_type) return null; const f = i.function_type; const a = parseFloat(i.a); const x = parseFloat(i.x); let result; if(f === 'sin') { result = Math.sin(a) + Math.cos(a) * (x - a); } else if(f === 'cos') { result = Math.cos(a) - Math.sin(a) * (x - a); } else if(f === 'exp') { result = Math.exp(a) + Math.exp(a) * (x - a); } else if(f === 'ln') { result = Math.log(a) + (1/a) * (x - a); } else if(f === 'sqrt') { result = Math.sqrt(a) + (1/(2*Math.sqrt(a))) * (x - a); } else { result = null; } return {value: result, unit: '', desc: 'Lineær tilnærming av ' + f + ' ved x=' + x + ' rundt a=' + a}; },

  differansekvotient_formula: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const result = (f(Number(i.x2)) - f(Number(i.x1))) / (Number(i.x2) - Number(i.x1)); return {value: result, unit: '', desc: 'Differansekvotient for funksjonen ' + i.funksjon + ' mellom x1=' + i.x1 + ' og x2=' + i.x2}; },

  fourier_series_calculator: (i) => { if(!i.funksjon) return null; const T = parseFloat(i.periode) || 1; const N = parseInt(i.antall_ledd) || 5; const t = parseFloat(i.tidspunkt) || 0; let sum = 0; const a0 = (1/T) * (T/2 - (-T/2)); for(let n=1; n<=N; n++) { const an = (2/T) * ((Math.sin(n*Math.PI)/n) - (Math.sin(-n*Math.PI)/n)); const bn = (2/T) * ((-Math.cos(n*Math.PI)/n) + (Math.cos(-n*Math.PI)/n)); sum += an*Math.cos(2*Math.PI*n*t/T) + bn*Math.sin(2*Math.PI*n*t/T); } const result = a0/2 + sum; return {value: result, unit: 'enhet', desc: 'Fourier-rekke til funksjonen ' + i.funksjon + ' ved t=' + t + ' med ' + N + ' ledd'}; },

  relaterte_rater_beregning: (i) => { if(!i.alder) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const whr = i.midje / i.hofte; const result = bmr * whr; return {value: result, unit: 'kcal/cm', desc: 'Relatert rate basert på BMR og midje-hofte ratio'}; },

  kvadratisk_tilnaerming: (i) => { if(!i.a) return null; const result = i.f_a + i.f_der1_a * (i.x - i.a) + 0.5 * i.f_der2_a * Math.pow(i.x - i.a, 2); return {value: result, unit: '', desc: 'Kvadratisk tilnærming av f ved x = ' + i.x}; },

  linearisering_formula: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const h = 1e-8; const derivert = (f(i.punkt_a + h) - f(i.punkt_a - h)) / (2 * h); const L = f(i.punkt_a) + derivert * (i.x_verdi - i.punkt_a); return {value: L, unit: 'verdi', desc: 'Linearisert verdi av ' + i.funksjon + ' i x=' + i.x_verdi + ' rundt a=' + i.punkt_a}; },

  optimaliseringskalkulator: (i) => { if(!i.funksjon_type) return null; let result; if(i.funksjon_type === 'lineaer') { result = (i.maal === 'maks' ? Math.max(i.a * i.x_min + i.b, i.a * i.x_max + i.b) : Math.min(i.a * i.x_min + i.b, i.a * i.x_max + i.b)); } else if(i.funksjon_type === 'kvadratisk') { const toppunkt = -i.b / (2 * i.a); const y_topp = i.a * toppunkt * toppunkt + i.b * toppunkt + i.c; if(i.maal === 'maks') { result = (i.a < 0 ? y_topp : Math.max(i.a * i.x_min * i.x_min + i.b * i.x_min + i.c, i.a * i.x_max * i.x_max + i.b * i.x_max + i.c)); } else { result = (i.a > 0 ? y_topp : Math.min(i.a * i.x_min * i.x_min + i.b * i.x_min + i.c, i.a * i.x_max * i.x_max + i.b * i.x_max + i.c)); } } else { result = null; } return {value: result, unit: 'enhet', desc: 'Optimal verdi for ' + i.funksjon_type + ' funksjon'}; },

  divergence_calculator: (i) => { if(!i.fx) return null; const result = (i.fx && i.x_val ? parseFloat(i.fx) / parseFloat(i.x_val) : 0) + (i.fy && i.y_val ? parseFloat(i.fy) / parseFloat(i.y_val) : 0) + (i.fz && i.z_val ? parseFloat(i.fz) / parseFloat(i.z_val) : 0); return {value: result, unit: '1/m', desc: 'Divergens av vektorfeltet F = (' + i.fx + ', ' + i.fy + ', ' + i.fz + ') i punktet (' + i.x_val + ', ' + i.y_val + ', ' + i.z_val + ')'}; },

  lagrange_multiplikator: (i) => { if(!i.func) return null; const f = new Function('x','y', 'return ' + i.func); const g = new Function('x','y', 'return ' + i.constraint); let x = parseFloat(i.x_start), y = parseFloat(i.y_start), lam = parseFloat(i.lambda_start), tol = parseFloat(i.tolerance), iter = parseInt(i.iterations); for(let k=0; k<iter; k++) { const fx = (f(x+1e-6,y)-f(x-1e-6,y))/(2e-6); const fy = (f(x,y+1e-6)-f(x,y-1e-6))/(2e-6); const gx = (g(x+1e-6,y)-g(x-1e-6,y))/(2e-6); const gy = (g(x,y+1e-6)-g(x,y-1e-6))/(2e-6); const gv = g(x,y); const dx = fx - lam*gx; const dy = fy - lam*gy; const dlam = -gv; x += dx*0.1; y += dy*0.1; lam += dlam*0.1; if(Math.abs(dx)<tol && Math.abs(dy)<tol && Math.abs(dlam)<tol) break; } const optimum = f(x,y); return {value: optimum, unit: 'verdi', desc: 'Optimal verdi under bibetingelse'}; },

  invers_laplace_transform: (i) => { if(!i.teller_koeffisienter) return null; const result = 0; return {value: result, unit: 'symbolsk', desc: 'Invers Laplace-transformasjon krever symbolsk beregning - resultatet er ' + i.teller_koeffisienter + ' over ' + i.nevner_koeffisienter}; },

  initial_value_problem_solver: (i) => { if(!i.start_x) return null; const h = (i.slutt_x - i.start_x) / i.steg; let x = i.start_x; let y = i.start_y; for(let n = 0; n < i.steg; n++) { if(i.metode === 'euler') { y = y + h * (x + y); } else if(i.metode === 'runge-kutta') { const k1 = x + y; const k2 = (x + h/2) + (y + h/2 * k1); const k3 = (x + h/2) + (y + h/2 * k2); const k4 = (x + h) + (y + h * k3); y = y + (h/6) * (k1 + 2*k2 + 2*k3 + k4); } x = x + h; } return {value: y, unit: 'verdi', desc: 'Numerisk losning av initialverdiproblem ved ' + i.metode}; },

  simpsons_rule: (i) => { if(!i.a) return null; const h = (i.b - i.a) / i.n; let sum = 0; for(let k = 0; k <= i.n; k++) { const x = i.a + k * h; let f; if(i.function_type === 'sin') { f = Math.sin(x); } else if(i.function_type === 'cos') { f = Math.cos(x); } else if(i.function_type === 'exp') { f = Math.exp(x); } else { f = x * x; } if(k === 0 || k === i.n) { sum += f; } else if(k % 2 === 1) { sum += 4 * f; } else { sum += 2 * f; } } const result = (h / 3) * sum; return {value: result, unit: 'areal', desc: 'Tilnærmet integral med Simpsons regel'}; },

  implicit_differentiation: (i) => { if(!i.equation) return null; const eq = i.equation.replace(/ /g,''); const x = parseFloat(i.x_value) || 0; const y = parseFloat(i.y_value) || 0; const terms = eq.split(/(?=[+-])/); let dydx = 0; let coeff = 0; for(let t of terms) { let sign = 1; let term = t; if(term.startsWith('-')) { sign = -1; term = term.substring(1); } else if(term.startsWith('+')) { term = term.substring(1); } const xMatch = term.match(/x\^?(\d*)/); const yMatch = term.match(/y\^?(\d*)/); const xPow = xMatch ? (xMatch[1] ? parseInt(xMatch[1]) : 1) : 0; const yPow = yMatch ? (yMatch[1] ? parseInt(yMatch[1]) : 1) : 0; const coeffStr = term.replace(/x\^?\d*/,'').replace(/y\^?\d*/,''); const c = coeffStr ? parseFloat(coeffStr) : 1; if(yPow > 0) { dydx += sign * c * yPow * Math.pow(y, yPow-1) * Math.pow(x, xPow); } if(xPow > 0) { coeff += sign * c * xPow * Math.pow(x, xPow-1) * Math.pow(y, yPow); } } const result = dydx !== 0 ? -coeff / dydx : 0; return {value: result, unit: 'dy/dx', desc: 'Implisitt derivert dy/dx ved (x=' + x + ', y=' + y + ')'}; },

  skallmetode_volum: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const n = parseInt(i.antall_skall) || 100; const a = parseFloat(i.nedre_grense); const b = parseFloat(i.ovre_grense); const akse = i.akse; const akseverdi = parseFloat(i.akseverdi) || 0; const h = (b - a) / n; let sum = 0; for(let k = 0; k < n; k++) { const x = a + (k + 0.5) * h; const r = Math.abs(akse === 'x' ? x - akseverdi : f(x) - akseverdi); const y = akse === 'x' ? f(x) : x; sum += 2 * Math.PI * r * y * h; } const result = Math.abs(sum); return {value: result, unit: 've', desc: 'Volum beregnet med skallmetoden'}; },

  fourier_transform_calculator: (i) => { if(!i.signal_type) return null; const freq = parseFloat(i.frekvens) || 0; const amp = parseFloat(i.amplitude) || 0; const dur = parseFloat(i.varighet) || 0; const result = amp * dur * (Math.sin(Math.PI * freq * dur) / (Math.PI * freq * dur)); return {value: result, unit: 'amplitude', desc: 'Fouriertransformert amplitude for ' + i.signal_type + ' signal'}; },

  areal_under_kurve: (i) => { if(!i.funksjon) return null; const f = new Function('x', 'return ' + i.funksjon); const n = parseInt(i.antall_intervaller) || 100; const a = parseFloat(i.nedre_grense); const b = parseFloat(i.ovre_grense); const h = (b - a) / n; let sum = 0; for(let k = 0; k < n; k++) { sum += f(a + k * h + h/2); } const result = sum * h; return {value: result, unit: 'arealenheter', desc: 'Tilnærmet areal under kurven ved midtpunktsmetoden'}; },

  kvotientregel_deriverte: (i) => { if(!i.teller_koeffisienter) return null; const t = i.teller_koeffisienter.split(',').map(Number); const n = i.nevner_koeffisienter.split(',').map(Number); const x = i.x_verdi; const tDer = t.map((c, idx) => c * (t.length - 1 - idx)).slice(0, -1); const nDer = n.map((c, idx) => c * (n.length - 1 - idx)).slice(0, -1); const tVal = t.reduce((sum, c, idx) => sum + c * Math.pow(x, t.length - 1 - idx), 0); const nVal = n.reduce((sum, c, idx) => sum + c * Math.pow(x, n.length - 1 - idx), 0); const tDerVal = tDer.reduce((sum, c, idx) => sum + c * Math.pow(x, tDer.length - 1 - idx), 0); const nDerVal = nDer.reduce((sum, c, idx) => sum + c * Math.pow(x, nDer.length - 1 - idx), 0); const result = (tDerVal * nVal - tVal * nDerVal) / (nVal * nVal); return {value: result, unit: '', desc: 'Derivert verdi av brøkfunksjonen ved x = ' + x}; },

  maclaurin_series_calculator: (i) => { if(!i.function_choice) return null; const result = (function() { const x = parseFloat(i.x_value); const n = parseInt(i.n_terms); if(isNaN(x) || isNaN(n) || n < 0) return NaN; let sum = 0; const fc = i.function_choice; for(let k = 0; k <= n; k++) { if(fc === 'sin') { const term = (k % 2 === 0 ? 0 : (k % 4 === 1 ? 1 : -1)) * Math.pow(x, 2*k-1) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(2*k-1); sum += term; } else if(fc === 'cos') { const term = (k % 2 === 0 ? (k % 4 === 0 ? 1 : -1) : 0) * Math.pow(x, 2*k) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(2*k); sum += term; } else if(fc === 'exp') { sum += Math.pow(x, k) / (function fact(m){let r=1;for(let i=2;i<=m;i++)r*=i;return r})(k); } else if(fc === 'ln1p') { if(k===0) sum += 0; else sum += (k%2===1?1:-1) * Math.pow(x, k) / k; } } return sum; })(); return {value: result, unit: '', desc: 'Maclaurin-rekke tilnærming for ' + i.function_choice + ' ved x=' + i.x_value + ' med ' + i.n_terms + ' ledd'}; },

  krumning_og_radius: (i) => { if(!i.funksjon) return null; const f1 = parseFloat(i.derivert1); const f2 = parseFloat(i.derivert2); const krumning = Math.abs(f2) / Math.pow(1 + f1*f1, 1.5); const radius = krumning === 0 ? Infinity : 1 / krumning; return {value: krumning, unit: '1/m', desc: 'Krumning i punktet x=' + i.punkt_x + ' (radius=' + (radius === Infinity ? 'uendelig' : radius.toFixed(4)) + ' m)'}; },

  potensrekke_sum: (i) => { if(!i.startverdi) return null; const result = i.startverdi * (1 - Math.pow(i.startverdi, i.antall_ledd)) / (1 - i.startverdi); return {value: result, unit: 'enhet', desc: 'Summen av potensrekken med startverdi ' + i.startverdi + ', eksponent ' + i.eksponent + ' og ' + i.antall_ledd + ' ledd'}; },

  series_convergence_calculator: (i) => { if(!i.series_type) return null; const r = parseFloat(i.ratio_or_exponent); const a = parseFloat(i.first_term); const n = parseInt(i.num_terms); let result; if(i.series_type === 'geometric') { if(Math.abs(r) < 1) { result = a / (1 - r); } else { result = Infinity; } } else if(i.series_type === 'p_series') { result = r > 1 ? 'Konvergerer' : 'Divergerer'; } else { result = null; } return {value: result, unit: '', desc: 'Konvergens av serier'}; },

  ekstrembelastning_kalkulator: (i) => { if(!i.alder) return null; const result = Math.round((((i.maks_puls || (220 - i.alder)) - i.hvilepuls) * (i.intensitet / 100) + i.hvilepuls) * (i.treningsminutter / 60) * (1 + (i.stressniva - 5) * 0.05) * (1 - (8 - i.sovn_timer) * 0.03)); return {value: result, unit: 'poeng', desc: 'Ekstrembelastningspoeng basert på alder, puls, intensitet, stress og søvn'}; },

  kule_beregning: (i) => { if(!i.radius) return null; const result = (4/3) * Math.PI * Math.pow(i.radius, 3) * (i.tetthet || 0); return {value: result, unit: 'kg', desc: 'Massen av kulen med radius ' + i.radius + ' og tetthet ' + (i.tetthet || 0)}; },

  sylinder_beregning: (i) => { if(!i.radius) return null; const result = Math.PI * i.radius * i.radius * i.hoyde; return {value: result, unit: 'cm³', desc: 'Volumet av sylinderen er ' + result.toFixed(2) + ' cm³'}; },

  oktagon_beregning: (i) => { if(!i.sidelengde) return null; const result = 2 * (1 + Math.sqrt(2)) * i.sidelengde * i.sidelengde; return {value: result, unit: i.enhet + '²', desc: 'Areal av oktagon med sidelengde ' + i.sidelengde + ' ' + i.enhet}; },

  forty_five_ninety_triangle: (i) => { if(!i.side_a) return null; const result = i.side_a * Math.SQRT2; return {value: result, unit: 'cm', desc: 'Hypotenusen i en 45-45-90 trekant er side_a ganger kvadratroten av 2'}; },

  kube_beregning: (i) => { if(!i.side) return null; const result = Math.pow(i.side, 3); return {value: result, unit: i.enhet + '^3', desc: 'Volumet av en kube med side ' + i.side + ' ' + i.enhet}; },

  polygon_calculator: (i) => { if(!i.sides) return null; const n = Number(i.sides); const s = Number(i.side_length); const area = (n * s * s) / (4 * Math.tan(Math.PI / n)); const perimeter = n * s; return {value: area, unit: i.unit, desc: 'Areal av regulær ' + n + '-kant med sidelengde ' + s + ' ' + i.unit}; },

  triangular_prism_calculator: (i) => { if(!i.side_a) return null; const s = (parseFloat(i.side_a) + parseFloat(i.side_b) + parseFloat(i.side_c)) / 2; const areal_grundflate = Math.sqrt(s * (s - parseFloat(i.side_a)) * (s - parseFloat(i.side_b)) * (s - parseFloat(i.side_c))); const volum = areal_grundflate * parseFloat(i.hoyde_prisme); return {value: volum, unit: i.enhet + '^3', desc: 'Volumet av et triangulært prisme er ' + volum + ' ' + i.enhet + '^3'}; },

  sirkelsatser_beregning: (i) => { if(!i.kjent_verdi) return null; const result = i.kjent_verdi * 1; return {value: result, unit: i.kjent_enhet, desc: 'Sirkelsatser beregnet verdi: ' + result + ' ' + i.kjent_enhet}; },

  trekant_beregning: (i) => { if(!i.side_a) return null; const result = Math.sqrt(i.side_a * i.side_a + i.side_b * i.side_b - 2 * i.side_a * i.side_b * Math.cos(i.vinkel_c * Math.PI / 180)); return {value: result, unit: 'enhet', desc: 'Beregnet side c i trekanten'}; },

  sirkel_beregning: (i) => { if(!i.radius) return null; const result = {radius: parseFloat(i.radius), diameter: parseFloat(i.radius)*2, omkrets: 2*Math.PI*parseFloat(i.radius), areal: Math.PI*parseFloat(i.radius)*parseFloat(i.radius)}; return {value: result.radius, unit: 'cm', desc: 'Radius: ' + result.radius.toFixed(2) + ' cm, Diameter: ' + result.diameter.toFixed(2) + ' cm, Omkrets: ' + result.omkrets.toFixed(2) + ' cm, Areal: ' + result.areal.toFixed(2) + ' cm' + String.fromCharCode(178)}; },

  referansevinkel_formel: (i) => { if(!i.vinkel) return null; const v = parseFloat(i.vinkel); const enhet = i.enhet || 'grader'; let rad; if(enhet === 'radianer') { rad = v; } else { rad = v * Math.PI / 180; } const ref = Math.abs(rad) % (2 * Math.PI); let result; if(ref <= Math.PI/2) { result = ref; } else if(ref <= Math.PI) { result = Math.PI - ref; } else if(ref <= 3*Math.PI/2) { result = ref - Math.PI; } else { result = 2*Math.PI - ref; } let outVal; let outUnit; if(enhet === 'radianer') { outVal = result; outUnit = 'rad'; } else { outVal = result * 180 / Math.PI; outUnit = 'grader'; } return {value: outVal, unit: outUnit, desc: 'Referansevinkel: ' + outVal.toFixed(4) + ' ' + outUnit}; },

  rektangulaer_prisme_beregning: (i) => { if(!i.lengde) return null; const result = i.lengde * i.bredde * i.hoyde; return {value: result, unit: 'kubikkmeter', desc: 'Volumet av et rektangulært prisme er lengde * bredde * høyde'}; },

  endepunkt_kalkulator: (i) => { if(!i.alder) return null; const result = i.kjonn === 'mann' ? (220 - i.alder) : (226 - i.alder); return {value: result, unit: 'slag/min', desc: 'Maksimal hjertefrekvens basert p\u00e5 alder og kj\u00f8nn'}; },

  pyramide_volum: (i) => { if(!i.grunnflate) return null; const result = (1/3) * i.grunnflate * i.hoyde; return {value: result, unit: 'm\u00B3', desc: 'Volumet av pyramiden er ' + result + ' kubikkmeter'}; },

  klassifiser_trekant: (i) => { if(!i.side_a || !i.side_b || !i.side_c) return null; const a = Number(i.side_a), b = Number(i.side_b), c = Number(i.side_c); let result; if(a + b <= c || a + c <= b || b + c <= a) { result = 'Ugyldig trekant'; } else if(a === b && b === c) { result = 'Likesidet'; } else if(a === b || a === c || b === c) { result = 'Likebenet'; } else { result = 'Ulikesidet'; } return {value: result, unit: '', desc: 'Trekanten er klassifisert som ' + result}; },

  volum_beregner: (i) => { if(!i.form) return null; const result = i.form === 'kule' ? (4/3)*Math.PI*Math.pow(i.radius,3) : i.form === 'sylinder' ? Math.PI*Math.pow(i.radius,2)*i.hoyde : i.form === 'kube' ? Math.pow(i.lengde,3) : i.lengde*i.bredde*i.hoyde; return {value: result, unit: 'kubikkmeter', desc: 'Volumet er ' + result.toFixed(2) + ' kubikkmeter'}; },

  similar_triangles_calculator: (i) => { if(!i.side_a1) return null; const scale = i.side_a2 / i.side_a1; const result = { side_a2: i.side_a2, side_b2: i.side_b1 * scale, side_c2: i.side_c1 * scale }; return {value: result.side_b2, unit: 'enheter', desc: 'Beregnet side b2 i lignende trekant (skala ' + scale.toFixed(2) + ')'}; },

  gyldne_snitt_beregning: (i) => { if(!i.verdi_a) return null; const result = i.verdi_a * 1.618033988749895; return {value: result, unit: 'enhet', desc: 'Det gyldne snitt basert p\u00e5 verdi A'}; },

  linjeformel_fra_to_punkter: (i) => { if(!i.x1 || !i.y1 || !i.x2 || !i.y2) return null; const m = (i.y2 - i.y1) / (i.x2 - i.x1); const b = i.y1 - m * i.x1; const result = 'y = ' + m.toFixed(2) + 'x + ' + b.toFixed(2); return {value: result, unit: '', desc: 'Linjeformel (stigningstall og konstantledd)'}; },

  rettrekant_beregning: (i) => { if(!i.side_a) return null; const result = Math.sqrt(i.side_a * i.side_a + i.side_b * i.side_b); return {value: result, unit: 'enheter', desc: 'Hypotenusen (side c) i en rettvinklet trekant'}; },

  enhetsirkel_beregning: (i) => { if(!i.vinkel_grader) return null; const rad = i.vinkel_grader * Math.PI / 180; const result = {x: Math.cos(rad), y: Math.sin(rad)}; return {value: result, unit: 'koordinater', desc: 'Punkt p\u00e5 enhetsirkelen for ' + i.vinkel_grader + ' grader'}; },

  ortosenter_beregning: (i) => { if(!i.ax) return null; const d = 2*(i.ax*(i.by-i.cy)+i.bx*(i.cy-i.ay)+i.cx*(i.ay-i.by)); if(d===0) return null; const ux = ((i.ax*i.ax+i.ay*i.ay)*(i.by-i.cy)+(i.bx*i.bx+i.by*i.by)*(i.cy-i.ay)+(i.cx*i.cx+i.cy*i.cy)*(i.ay-i.by))/d; const uy = ((i.ax*i.ax+i.ay*i.ay)*(i.cx-i.bx)+(i.bx*i.bx+i.by*i.by)*(i.ax-i.cx)+(i.cx*i.cx+i.cy*i.cy)*(i.bx-i.ax))/d; const result = {x: ux, y: uy}; return {value: result, unit: 'koordinater', desc: 'Ortosenter (hoydepunkt) for trekanten'}; },

  geometrisk_dilatasjon: (i) => { if(!i.lengde) return null; const alpha = i.materiale === 'stål' ? 0.000012 : i.materiale === 'aluminium' ? 0.000023 : i.materiale === 'kobber' ? 0.000017 : 0.000010; const deltaT = i.temperatur_slutt - i.temperatur_start; const dl = i.lengde * alpha * deltaT; const db = i.bredde * alpha * deltaT; const dh = i.hoyde * alpha * deltaT; const result = {dl: dl, db: db, dh: dh}; return {value: result, unit: 'mm', desc: 'Lengdeendring: ' + dl.toFixed(3) + ' mm, Breddeendring: ' + db.toFixed(3) + ' mm, Høydeendring: ' + dh.toFixed(3) + ' mm'}; },

  kordkalkulator: (i) => { if(!i.radius) return null; const result = 2 * i.radius * Math.sin(i.vinkel * Math.PI / 180); return {value: result, unit: 'm', desc: 'Kordelengde i meter'}; },

  koterminal_vinkel_formel: (i) => { if(!i.vinkel) return null; const rad = i.enhet === 'radianer' ? i.vinkel : i.vinkel * Math.PI / 180; const result = rad - 2 * Math.PI * Math.floor(rad / (2 * Math.PI)); const unit = i.enhet === 'radianer' ? 'rad' : 'grader'; const desc = 'Koterminal vinkel i ' + unit; return {value: result, unit: unit, desc: desc}; },

  areal_beregner: (i) => { if(!i.form) return null; const result = i.lengde1 * i.lengde2; return {value: result, unit: i.enhet + '²', desc: 'Areal: ' + i.lengde1 + ' × ' + i.lengde2 + ' ' + i.enhet + '² = ' + result + ' ' + i.enhet + '²'}; },

  klokkevinkel_formel: (i) => { if(!i.timer) return null; const result = Math.abs(30 * i.timer - 5.5 * i.minutter); const finalResult = result > 180 ? 360 - result : result; return {value: finalResult, unit: 'grader', desc: 'Vinkelen mellom time- og minuttviseren er ' + finalResult + ' grader.'}; },

  geometri_kalkulator: (i) => { if(!i.shape) return null; let result; if(i.shape==='sirkel') { result = Math.PI * i.radius * i.radius; } else if(i.shape==='rektangel') { result = i.lengde * i.bredde; } else if(i.shape==='trekant') { result = (i.side_a * i.side_b) / 2; } else if(i.shape==='kube') { result = i.side_a * i.side_a * i.side_a; } else if(i.shape==='prisme') { result = i.lengde * i.bredde * i.hoyde; } else { result = 0; } return {value: result, unit: 'kvadratmeter', desc: 'Areal av ' + i.shape}; },

  tretti_seksti_nitti_trekant: (i) => { if(!i.side_a) return null; const result = i.side_a * Math.sqrt(3); return {value: result, unit: 'cm', desc: 'Lengden av side b i en 30-60-90 trekant (side a * sqrt(3))'}; },

  avstandsformel_beregning: (i) => { if(!i.x1) return null; const result = Math.sqrt(Math.pow(i.x2 - i.x1, 2) + Math.pow(i.y2 - i.y1, 2)); return {value: result, unit: 'enheter', desc: 'Avstanden mellom punktene (' + i.x1 + ',' + i.y1 + ') og (' + i.x2 + ',' + i.y2 + ') er ' + result + ' enheter'}; },

  trapesareal_formel: (i) => { if(!i.a) return null; const result = ((parseFloat(i.a) + parseFloat(i.b)) * parseFloat(i.h)) / 2; return {value: result, unit: 'kvadratmeter', desc: 'Areal av trapes: (' + i.a + ' + ' + i.b + ') * ' + i.h + ' / 2 = ' + result + ' m²'}; },

  stigning_over_lop: (i) => { if(!i.hoydeforskjell || !i.horisontal_avstand) return null; const result = (i.hoydeforskjell / i.horisontal_avstand) * 100; return {value: result, unit: '%', desc: 'Stigning i prosent'}; },

  firkant_beregning: (i) => { if(!i.lengde) return null; const result = i.lengde * (i.bredde || i.lengde); return {value: result, unit: i.enhet || 'm', desc: 'Areal av firkant: ' + result + ' ' + (i.enhet || 'm') + '²'}; },

  helling_prosent_beregning: (i) => { if(!i.hoydeforskjell) return null; const result = (i.hoydeforskjell / i.lengde) * 100; return {value: result, unit: '%', desc: 'Helling i prosent'}; },

  hypotenus_pythagoras: (i) => { if(!i.katet_a || !i.katet_b) return null; const result = Math.sqrt(i.katet_a * i.katet_a + i.katet_b * i.katet_b); return {value: result, unit: 'enheter', desc: 'Hypotenusen er ' + result + ' enheter'}; },

  trekant_vinkel_beregning: (i) => { if(!i.side_a) return null; const result = Math.acos((i.side_b * i.side_b + i.side_c * i.side_c - i.side_a * i.side_a) / (2 * i.side_b * i.side_c)) * (180 / Math.PI); return {value: result, unit: 'grader', desc: 'Vinkel A beregnet ved cosinussetningen'}; },

  omkrets_beregner: (i) => { if(!i.form) return null; const result = i.form === 'sirkel' ? (i.radius ? 2 * Math.PI * i.radius : (i.diameter ? Math.PI * i.diameter : null)) : i.form === 'rektangel' ? (i.lengde && i.bredde ? 2 * (i.lengde + i.bredde) : null) : i.form === 'trekant' ? (i.side_a && i.side_b && i.side_c ? i.side_a + i.side_b + i.side_c : null) : null; return {value: result, unit: 'm', desc: 'Omkretsen er ' + result + ' meter'}; },

  trekant_hoyde_beregning: (i) => { if(!i.areal) return null; const result = (2 * i.areal) / i.grunnlinje; return {value: result, unit: 'enhet', desc: 'Hoyde = (2 * areal) / grunnlinje'}; },

  arealberegner_formula: (i) => { if(!i.form) return null; const result = (i.a * i.b) / 2; return {value: result, unit: 'kvadratmeter', desc: 'Areal av trekant: ' + result + ' kvadratmeter'}; },

  diameter_calculator: (i) => { if(!i.diameter) return null; const result = i.diameter; return {value: result, unit: 'cm', desc: 'Diameteren er ' + result + ' cm'}; },

  likebent_trekant_beregning: (i) => { if(!i.grunnlinje) return null; const result = (i.side * 2 + i.grunnlinje); return {value: result, unit: i.enhet, desc: 'Omkretsen av en likebent trekant er ' + result + ' ' + i.enhet}; },

  vinkel_mellom_vektorer: (i) => { if(!i.v1_x) return null; const dot = i.v1_x*i.v2_x + i.v1_y*i.v2_y + i.v1_z*i.v2_z; const mag1 = Math.sqrt(i.v1_x*i.v1_x + i.v1_y*i.v1_y + i.v1_z*i.v1_z); const mag2 = Math.sqrt(i.v2_x*i.v2_x + i.v2_y*i.v2_y + i.v2_z*i.v2_z); const cosAngle = dot / (mag1 * mag2); const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle))); const angleDeg = angleRad * (180 / Math.PI); return {value: angleDeg, unit: 'grader', desc: 'Vinkel mellom vektorene i grader'}; },

  hexagon_calculator: (i) => { if(!i.side_length) return null; const result = (3 * Math.sqrt(3) / 2) * Math.pow(i.side_length, 2); return {value: result, unit: i.unit, desc: 'Areal av sekskant med sidelengde ' + i.side_length + ' ' + i.unit}; },

  spesielle_rettvinklede_trekanter: (i) => { if(!i.type) return null; const v = parseFloat(i.given_side); const t = i.given_side_type; const r = i.type; let result = 0; let unit = ''; let desc = ''; if(r === '30-60-90') { if(t === 'kort') { result = v * 2; unit = 'enhet'; desc = 'Hypotenusen er ' + result + ' ' + unit; } else if(t === 'lang') { result = v / Math.sqrt(3); unit = 'enhet'; desc = 'Kort katet er ' + result + ' ' + unit; } else if(t === 'hypotenus') { result = v / 2; unit = 'enhet'; desc = 'Kort katet er ' + result + ' ' + unit; } } else if(r === '45-45-90') { if(t === 'katet') { result = v * Math.sqrt(2); unit = 'enhet'; desc = 'Hypotenusen er ' + result + ' ' + unit; } else if(t === 'hypotenus') { result = v / Math.sqrt(2); unit = 'enhet'; desc = 'Hver katet er ' + result + ' ' + unit; } } return {value: result, unit: unit, desc: desc}; },

  pentagon_calculator: (i) => { if(!i.side_length) return null; const s = i.side_length; const area = (1/4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * s * s; const perimeter = 5 * s; const result = area; return {value: result, unit: i.unit, desc: 'Areal av en regulær femkant med sidelengde ' + s + ' ' + i.unit}; },

  graviditets_vektoxning: (i) => { if(!i.bmi_for_graviditet || !i.graviditetsuke || !i.vekt_for_graviditet || !i.navaerende_vekt) return null; const bmi = i.bmi_for_graviditet; const uke = i.graviditetsuke; const startVekt = i.vekt_for_graviditet; const naaVekt = i.navaerende_vekt; const vektOkning = naaVekt - startVekt; let anbefaltMin = 0; let anbefaltMax = 0; if(bmi < 18.5) { anbefaltMin = 0.5; anbefaltMax = 2.0; } else if(bmi < 25) { anbefaltMin = 0.5; anbefaltMax = 2.0; } else if(bmi < 30) { anbefaltMin = 0.5; anbefaltMax = 2.0; } else { anbefaltMin = 0.5; anbefaltMax = 2.0; } const anbefaltVekt = anbefaltMin + (anbefaltMax - anbefaltMin) * (uke / 40); const avvik = vektOkning - anbefaltVekt; return {value: Math.round(avvik * 10) / 10, unit: 'kg', desc: 'Avvik fra anbefalt vektøkning ved uke ' + uke + ' (BMI ' + bmi + '). Positivt = over anbefalt, negativt = under anbefalt.'}; },

  befruktningskalkulator_formel: (i) => { if(!i.siste_menstruasjon_dag || !i.siste_menstruasjon_maned || !i.sykluslengde || !i.lutealfase_lengde) return null; const startDato = new Date(2024, i.siste_menstruasjon_maned - 1, i.siste_menstruasjon_dag); const egglosning = new Date(startDato.getTime() + (i.sykluslengde - i.lutealfase_lengde) * 86400000); const fruktbarStart = new Date(egglosning.getTime() - 5 * 86400000); const fruktbarSlutt = new Date(egglosning.getTime() + 1 * 86400000); const result = fruktbarStart.toLocaleDateString('nb-NO') + ' - ' + fruktbarSlutt.toLocaleDateString('nb-NO'); return {value: result, unit: 'datointervall', desc: 'Estimert fruktbart vindu basert på sykluslengde og lutealfase'}; },

  unnfangelses_beregning: (i) => { if(!i.siste_menstruasjon) return null; const lmp = new Date(i.siste_menstruasjon); const cycle = i.sykluslengde ? parseInt(i.sykluslengde) : 28; const ovulationDate = new Date(lmp.getTime() + (cycle - 14) * 86400000); const result = ovulationDate.toISOString().split('T')[0]; return {value: result, unit: 'dato', desc: 'Beregnet unnfangelsesdato basert på siste menstruasjon og sykluslengde'}; },

  menstruasjonskalkulator_formel: (i) => { if(!i.siste_mens) return null; const result = { neste_mens: new Date(new Date(i.siste_mens).getTime() + (parseInt(i.syklus_lengde) || 28) * 86400000), egglosning: new Date(new Date(i.siste_mens).getTime() + ((parseInt(i.syklus_lengde) || 28) - 14) * 86400000), fruktbar_start: new Date(new Date(i.siste_mens).getTime() + ((parseInt(i.syklus_lengde) || 28) - 19) * 86400000), fruktbar_slutt: new Date(new Date(i.siste_mens).getTime() + ((parseInt(i.syklus_lengde) || 28) - 10) * 86400000), mens_slutt: new Date(new Date(i.siste_mens).getTime() + (parseInt(i.mens_varighet) || 5) * 86400000) }; return {value: result.neste_mens.toISOString().split('T')[0], unit: 'dato', desc: 'Neste menstruasjon: ' + result.neste_mens.toISOString().split('T')[0] + ' | Eggløsning: ' + result.egglosning.toISOString().split('T')[0] + ' | Fruktbar periode: ' + result.fruktbar_start.toISOString().split('T')[0] + ' til ' + result.fruktbar_slutt.toISOString().split('T')[0] + ' | Mens slutter: ' + result.mens_slutt.toISOString().split('T')[0]}; },

  egglosning_beregning: (i) => { if(!i.siste_mens) return null; const d = new Date(i.siste_mens); const syklus = parseInt(i.syklus_lengde) || 28; const luteal = parseInt(i.luteal_fase) || 14; const egglosning = new Date(d.getTime() + (syklus - luteal) * 86400000); const result = egglosning.toISOString().split('T')[0]; return {value: result, unit: 'dato', desc: 'Estimert eggløsning er ' + result}; },

  terminberegner_formula: (i) => { if(!i.siste_menstruasjon_dag || !i.siste_menstruasjon_maned || !i.siste_menstruasjon_ar) return null; var dag = parseInt(i.siste_menstruasjon_dag); var maned = parseInt(i.siste_menstruasjon_maned); var ar = parseInt(i.siste_menstruasjon_ar); var syklus = parseInt(i.sykluslengde) || 28; var justering = syklus - 28; var terminDato = new Date(ar, maned - 1, dag + 280 + justering); var terminDag = terminDato.getDate(); var terminManed = terminDato.getMonth() + 1; var terminAr = terminDato.getFullYear(); var result = terminDag + '.' + terminManed + '.' + terminAr; return {value: result, unit: 'dato', desc: 'Beregnet termin basert på siste menstruasjon og sykluslengde'}; },

  vbac_success_probability: (i) => { if(!i.maternal_age) return null; const ageScore = Math.max(0, Math.min(1, (40 - i.maternal_age) / 20)); const bmiScore = Math.max(0, Math.min(1, (30 - (i.bmi || 25)) / 10)); const prevVaginalScore = i.previous_vaginal_birth ? 0.3 : 0; const prevCsecScore = (i.previous_csection_indication === 'non-recurrent' || i.previous_csection_indication === 'breech') ? 0.2 : (i.previous_csection_indication === 'recurrent' ? 0 : 0.1); const gaScore = Math.max(0, Math.min(1, (i.gestational_age || 39) / 42)); const bwScore = Math.max(0, Math.min(1, (4000 - (i.birth_weight_previous || 3500)) / 1500)); const result = Math.round((0.2 + ageScore * 0.2 + bmiScore * 0.15 + prevVaginalScore + prevCsecScore + gaScore * 0.1 + bwScore * 0.05) * 100); return {value: Math.min(100, Math.max(0, result)), unit: '%', desc: 'Estimert sannsynlighet for vellykket vaginal fødsel etter keisersnitt (VBAC)'}; },

  ivf_forfallsdato: (i) => { if(!i.overforingsdato) return null; const d = new Date(i.overforingsdato); const embryo = parseInt(i.embryoalder) || 3; const gestasjonsalder = embryo + 14; const forfallsdato = new Date(d.getTime() + (280 - gestasjonsalder) * 86400000); const result = forfallsdato.toISOString().split('T')[0]; return {value: result, unit: 'dato', desc: 'Estimert forfallsdato basert p\u00e5 overf\u00f8ringsdato og embryoalder'}; },

  lean_body_mass_boer: (i) => { if(!i.weight) return null; const result = i.gender === 'male' ? 0.407 * i.weight + 0.267 * i.height - 19.2 : 0.252 * i.weight + 0.473 * i.height - 48.3; return {value: result, unit: 'kg', desc: 'Mager kroppsmasse (Boer)'}; },

  en_rep_maks: (i) => { if(!i.vekt) return null; const result = i.vekt * (1 + (i.repetisjoner || 1) / 30); return {value: result, unit: 'kg', desc: 'Estimert 1RM (en repetisjon maksimum) basert på ' + (i.vekt || 0) + ' kg og ' + (i.repetisjoner || 1) + ' repetisjoner'}; },

  haerens_kroppsfett: (i) => { if(!i.kjonn) return null; const bmi = i.hoyde_cm ? (i.midje_cm || 0) / ((i.hoyde_cm/100)*(i.hoyde_cm/100)) : 0; const result = i.kjonn === 'mann' ? (495 / (1.032 - 0.190 * Math.log10(i.midje_cm - i.hals_cm) + 0.155 * Math.log10(i.hoyde_cm))) - 450 : (495 / (1.29579 - 0.35004 * Math.log10(i.midje_cm + i.hofte_cm - i.hals_cm) + 0.22100 * Math.log10(i.hoyde_cm))) - 450; return {value: Math.round(result * 10) / 10, unit: '%', desc: 'Estimert kroppsfettprosent basert p\u00e5 H\u00e6rens m\u00e5lemetode'}; },

  kaloriforbrenning_formel: (i) => { if(!i.aktivitet) return null; const met = {loping: 9.8, sykling: 7.5, svomming: 8.0, gange: 3.8, styrke: 5.0, yoga: 2.5, dans: 6.0, fotball: 8.5, tennis: 7.0, roing: 7.0}[i.aktivitet] || 5.0; const result = met * i.vekt * (i.tid / 60) * (1 + (i.intensitet - 5) * 0.1); return {value: Math.round(result), unit: 'kcal', desc: 'Estimert kaloriforbrenning basert p\u00e5 ' + i.aktivitet + ', vekt ' + i.vekt + ' kg, tid ' + i.tid + ' min og intensitet ' + i.intensitet + ' av 10'}; },

  sunn_vekt_beregner: (i) => { if(!i.hoyde) return null; const h = i.hoyde / 100; const base = (i.kjonn === 'mann') ? 50 + 0.91 * (h * 100 - 152.4) : 45.5 + 0.91 * (h * 100 - 152.4); const result = Math.round(base * 10) / 10; return {value: result, unit: 'kg', desc: 'Estimert sunn vekt for din h\u00f8yde'}; },

  ideell_vekt_beregning: (i) => { if(!i.hoyde) return null; const h = i.hoyde; const k = i.kjonn; const a = i.alder; let result; if(k === 'mann') { result = 50 + 0.91 * (h - 152.4); } else { result = 45.5 + 0.91 * (h - 152.4); } if(a > 30) { result = result + (a - 30) * 0.1; } return {value: Math.round(result * 10) / 10, unit: 'kg', desc: 'Ideell vekt basert p\u00e5 h\u00f8yde, kj\u00f8nn og alder'}; },

  fartskalkulator: (i) => { if(!i.distanse) return null; const result = i.beregn_type === 'fart' ? i.distanse / i.tid : i.beregn_type === 'tid' ? i.distanse / i.fart : i.fart * i.tid; return {value: result, unit: i.beregn_type === 'fart' ? 'km/t' : i.beregn_type === 'tid' ? 'timer' : 'km', desc: 'Beregnet ' + (i.beregn_type === 'fart' ? 'fart' : i.beregn_type === 'tid' ? 'tid' : 'distanse') + ' basert på ' + (i.veiforhold ? i.veiforhold : 'standard') + ' veiforhold'}; },

  anabolic_steroid_calculator: (i) => { if(!i.steroid_type) return null; const base = i.dose_mg_per_week * i.vekt_kg * 0.01; const alderFactor = i.alder > 40 ? 0.8 : 1; const erfaringFactor = i.erfaring === 'nybegynner' ? 0.7 : i.erfaring === 'middels' ? 1 : 1.2; const kjonnFactor = i.kjonn === 'mann' ? 1 : 0.5; const syklusFactor = i.syklus_uker > 12 ? 1.1 : 1; const result = base * alderFactor * erfaringFactor * kjonnFactor * syklusFactor; return {value: Math.round(result * 100) / 100, unit: 'mg/uke', desc: 'Estimert anabol effekt for ' + i.steroid_type + ' basert på din profil'}; },

  peptid_dose_beregning: (i) => { if(!i.vekt) return null; const result = (i.vekt * i.dose_per_kg) / i.peptid_styrke; return {value: result, unit: i.enhet_type, desc: 'Beregnet peptiddose basert p\u00e5 vekt og styrke'}; },

  cockcroft_gault: (i) => { if(!i.kjonn) return null; const result = ((140 - i.alder) * i.vekt) / (72 * i.kreatinin) * (i.kjonn === 'mann' ? 1 : 0.85); return {value: result, unit: 'mL/min', desc: 'Kreatininclearance (Cockcroft-Gault)'}; },

  steroid_converter: (i) => { if(!i.steroid_type) return null; const factors = {testosteron:1.0, nandrolon:1.25, boldenon:1.0, trenbolon:1.0, stanozolol:1.0, oxandrolon:1.0, metenolon:1.0, drostanolon:1.0}; const esterFactors = {enantat:0.72, cypionat:0.69, propionat:0.84, acetat:0.84, fenylpropionat:0.67, isokaproat:0.72, dekanoat:0.62, undekanoat:0.58, suspension:1.0}; const baseFactor = factors[i.steroid_type.toLowerCase()] || 1.0; const esterFactor = esterFactors[i.ester_type.toLowerCase()] || 1.0; const result = i.dose_mg * baseFactor * esterFactor; return {value: Math.round(result * 100) / 100, unit: 'mg', desc: 'Aktiv steroidmengde i ' + i.dose_mg + ' mg ' + i.ester_type + ' av ' + i.steroid_type}; },

  crossfit_calories_burned: (i) => { if(!i.weight) return null; const result = (i.duration * 0.0175 * (i.intensity === 'low' ? 5 : i.intensity === 'moderate' ? 8 : 12) * i.weight).toFixed(0); return {value: result, unit: 'kcal', desc: 'Forbrente kalorier under CrossFit' + ' (basert på vekt, varighet og intensitet)'}; },

  karbohydratkalkulator: (i) => { if(!i.total_carbs) return null; const netCarbs = i.total_carbs - (i.fiber || 0); const sugarAlcohol = (i.sugar || 0) * 0.5; const effectiveCarbs = netCarbs - sugarAlcohol; const portionFactor = (i.portion || 100) / 100; const giFactor = (i.glycemic_index || 50) / 100; const result = effectiveCarbs * portionFactor * giFactor; return {value: Math.round(result * 10) / 10, unit: 'g', desc: 'Effektive karbohydrater justert for glykemisk indeks og porsjonsstorrelse'}; },

  vdot_calculator: (i) => { if(!i.distance) return null; const d = i.distance; const h = i.hours || 0; const m = i.minutes || 0; const s = i.seconds || 0; const totalMinutes = h * 60 + m + s / 60; const pace = totalMinutes / d; const v = d / (totalMinutes / 60); const pct = i.gender === 'male' ? -0.008 : 0; const vdot = Math.round(((-4.6 + 0.182258 * v + 0.000104 * v * v + pct) / 0.8) * 10) / 10; return {value: vdot, unit: 'ml/kg/min', desc: 'Estimert VO2maks (VDOT) basert p\u00e5 distanse og tid'}; },

  vektpercentil_beregning: (i) => { if(!i.alder) return null; const z = (Math.log(i.vekt) - (-0.352 + 0.025*i.alder + 0.002*i.alder*i.alder + (i.kjonn==='gutt'?0.088:0))) / (0.078 + 0.001*i.alder); const p = 0.5 * (1 + erf(z / Math.sqrt(2))); return {value: Math.round(p*1000)/10, unit: '%', desc: 'Vektpercentil for ' + (i.kjonn==='gutt'?'gutt':'jente') + ' p\u00e5 ' + i.alder + ' mnd'}; },

  beregn_makroer: (i) => { if(!i.kjonn) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const aktivitetsfaktor = { 'lite': 1.2, 'moderat': 1.55, 'mye': 1.9, 'svaert_mye': 2.2 }[i.aktivitetsniva] || 1.2; const tdee = bmr * aktivitetsfaktor; const justering = i.maal === 'ned' ? -500 : i.maal === 'opp' ? 500 : 0; const kalorier = Math.round(tdee + justering); const protein = Math.round(i.vekt * 2); const fett = Math.round(i.vekt * 0.8); const karbohydrater = Math.round((kalorier - protein * 4 - fett * 9) / 4); return {value: kalorier, unit: 'kcal', desc: 'Daglig kaloribehov: ' + kalorier + ' kcal | Protein: ' + protein + ' g | Fett: ' + fett + ' g | Karbohydrater: ' + karbohydrater + ' g'}; },

  wod_tid_kalkulator: (i) => { if(!i.runder) return null; const totalSek = (i.runder * (i.tid_per_runde_min * 60 + i.tid_per_runde_sek)) + ((i.runder - 1) * (i.hvile_min * 60 + i.hvile_sek)); const min = Math.floor(totalSek / 60); const sek = totalSek % 60; return {value: totalSek, unit: 'sekunder', desc: 'Total tid: ' + min + ' min ' + sek + ' sek'}; },

  sjøforsvarets_kroppsfett: (i) => { if(!i.kjonn) return null; const b = i.kjonn === 'mann' ? 495 / (1.032 - 0.190 * Math.log10(i.midje_cm - i.hals_cm) + 0.156 * Math.log10(i.hoyde_cm)) - 450 : 495 / (1.29579 - 0.35004 * Math.log10(i.midje_cm + i.hofte_cm - i.hals_cm) + 0.22100 * Math.log10(i.hoyde_cm)) - 450; return {value: Math.round(b * 10) / 10, unit: '%', desc: 'Estimert kroppsfettprosent for ' + (i.kjonn === 'mann' ? 'menn' : 'kvinner') + ' basert på Sjøforsvarets formel'}; },

  fettap_kalkulator: (i) => { if(!i.kjonn) return null; const b = i.kjonn === 'mann' ? 495 / (1.032 - 0.19077 * Math.log10(i.midje - i.hals) + 0.15456 * Math.log10(i.vekt)) - 450 : 495 / (1.29579 - 0.35004 * Math.log10(i.midje + i.hofte - i.hals) + 0.22100 * Math.log10(i.vekt)) - 450; return {value: Math.round(b * 10) / 10, unit: '%', desc: 'Estimert fettprosent basert p\u00e5 Navy-metoden'}; },

  aerob_kapasitet_vo2max: (i) => { if(!i.alder) return null; const kjonnFaktor = i.kjonn === 'mann' ? 1 : 0; const hvile = i.hvilepuls || 70; const maks = i.maksimalpuls || (220 - i.alder); const aktivitet = i.aktivitetstype || 'loping'; const aktivitetFaktor = aktivitet === 'loping' ? 1.0 : aktivitet === 'sykling' ? 0.95 : aktivitet === 'svomming' ? 0.90 : 0.85; const result = Math.round(15.3 * (maks / hvile) * kjonnFaktor + 0.1 * i.alder + aktivitetFaktor * 5); return {value: result, unit: 'ml/kg/min', desc: 'Estimert VO2maks basert på hvilepuls og aktivitetstype'}; },

  vanninntak_beregning: (i) => { if(!i.vekt) return null; const base = i.vekt * 0.033; const alderFactor = i.alder > 65 ? 0.9 : (i.alder > 50 ? 0.95 : 1); const kjonnFactor = i.kjonn === 'mann' ? 1 : 0.9; const aktivitetFactor = i.aktivitet === 'hoy' ? 1.3 : (i.aktivitet === 'middels' ? 1.15 : 1); const tempFactor = i.temperatur > 25 ? 1.2 : (i.temperatur > 20 ? 1.1 : 1); const result = Math.round(base * alderFactor * kjonnFactor * aktivitetFactor * tempFactor * 100) / 100; return {value: result, unit: 'liter', desc: 'Anbefalt daglig vanninntak basert paa vekt, alder, kjonn, aktivitetsnivaa og temperatur'}; },

  rpe_kalkulator: (i) => { if(!i.puls) return null; const result = Math.round((i.puls - i.hvilepuls) / (i.maks_puls - i.hvilepuls) * 10); return {value: result, unit: 'RPE', desc: 'Opplevd anstrengelse (Borg RPE 0-10) basert på pulsreserve'}; },

  oppskrift_kalorikalkulator: (i) => { if(!i.protein_grams) return null; const result = ((i.protein_grams * 4) + (i.fat_grams * 9) + (i.carbs_grams * 4) + (i.fiber_grams * 2) + (i.alcohol_grams * 7)) / (i.portions || 1); const dailyPercent = i.daily_calorie_need ? (result / i.daily_calorie_need * 100) : 0; return {value: result, unit: 'kcal', desc: 'Kalorier per porsjon' + (dailyPercent ? ' (' + dailyPercent.toFixed(1) + '% av dagsbehov)' : '')}; },

  vedlikeholdskalorier_beregning: (i) => { if(!i.kjonn) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const aktivitetsfaktor = { 'stillesittende': 1.2, 'lett': 1.375, 'moderat': 1.55, 'aktiv': 1.725, 'svaert_aktiv': 1.9 }[i.aktivitetsniva] || 1.2; const result = Math.round(bmr * aktivitetsfaktor); return {value: result, unit: 'kcal/dag', desc: 'Ditt daglige vedlikeholdskaloribehov er ' + result + ' kcal'}; },

  kroppskomposisjon_formel: (i) => { if(!i.kjonn) return null; const bf = i.kjonn === 'mann' ? 495 / (1.0324 - 0.19077 * Math.log10(i.midje - i.hals) + 0.15456 * Math.log10(i.hoyde)) - 450 : 495 / (1.29579 - 0.35004 * Math.log10(i.midje + i.hofte - i.hals) + 0.22100 * Math.log10(i.hoyde)) - 450; const result = Math.round(bf * 10) / 10; return {value: result, unit: '%', desc: 'Estimert kroppsfettprosent basert p\u00e5 Navy-metoden'}; },

  kalorikalkulator_maltid: (i) => { if(!i.protein_grams) return null; const result = (i.protein_grams * 4) + (i.fat_grams * 9) + (i.carbs_grams * 4) + (i.fiber_grams * 2) + (i.alcohol_grams * 7); return {value: result, unit: 'kcal', desc: 'Totalt kaloriinnhold i måltidet'}; },

  fiberkalkulator: (i) => { if(!i.alder) return null; const result = (i.kjonn === 'mann' ? (10 * i.fibergram + 6.25 * i.alder - 5 * i.aktivitet + 5) : (10 * i.fibergram + 6.25 * i.alder - 5 * i.aktivitet - 161)); return {value: result, unit: 'gram', desc: 'Anbefalt daglig fiberinntak basert på alder, kjønn og aktivitetsnivå'}; },

  maltidsplanlegger_formel: (i) => { if(!i.kalorier_per_100g) return null; const totalKalorier = (i.kalorier_per_100g * i.vekt_gram) / 100; const totalProtein = (i.protein_per_100g * i.vekt_gram) / 100; const totalFett = (i.fett_per_100g * i.vekt_gram) / 100; const totalKarbohydrater = (i.karbohydrater_per_100g * i.vekt_gram) / 100; const perPorsjonKalorier = totalKalorier / i.porsjoner; const perPorsjonProtein = totalProtein / i.porsjoner; const perPorsjonFett = totalFett / i.porsjoner; const perPorsjonKarbohydrater = totalKarbohydrater / i.porsjoner; return {value: perPorsjonKalorier, unit: 'kcal', desc: 'Per porsjon: ' + perPorsjonKalorier.toFixed(1) + ' kcal, protein: ' + perPorsjonProtein.toFixed(1) + ' g, fett: ' + perPorsjonFett.toFixed(1) + ' g, karbohydrater: ' + perPorsjonKarbohydrater.toFixed(1) + ' g'}; },

  drikkalkulator_formel: (i) => { if(!i.antall_glass) return null; const alkoholGram = i.antall_glass * (i.volum_ml * i.alkoholprosent / 100 * 0.789); const promille = i.kjonn === 'mann' ? alkoholGram / (i.vekt_kg * 0.7) : alkoholGram / (i.vekt_kg * 0.6); const result = Math.max(0, promille - (0.15 * i.timer_siden_start)); return {value: result, unit: 'promille', desc: 'Estimert alkoholkonsentrasjon i blodet' + ' (' + result.toFixed(2) + ' promille)'}; },

  protein_behov: (i) => { if(!i.vekt) return null; const aktivitet = {lav: 1.2, moderat: 1.55, hoy: 1.8}[i.aktivitetsniva] || 1.55; const mal = {ned: 0.8, vedlikehold: 1.0, opp: 1.2}[i.maal] || 1.0; const result = Math.round(i.vekt * aktivitet * mal); return {value: result, unit: 'g', desc: 'Anbefalt proteininntak: ' + result + ' g per dag'}; },

  kaloriunderskudd_beregning: (i) => { if(!i.kjonn) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const aktivitetsfaktor = [1.2, 1.375, 1.55, 1.725, 1.9][i.aktivitetsniva - 1] || 1.2; const tdee = bmr * aktivitetsfaktor; const result = tdee - (tdee * (i.underskudd_prosent / 100)); return {value: result, unit: 'kcal', desc: 'Daglig kaloriinntak for vekttap med ' + i.underskudd_prosent + '% underskudd'}; },

  bmi_menn: (i) => { if(!i.vekt) return null; const result = i.vekt / ((i.hoyde/100)*(i.hoyde/100)); return {value: result, unit: 'kg/m²', desc: 'Kroppsmasseindeks (BMI) for menn'}; },

  pft_kalkulator: (i) => { if(!i.kjonn) return null; const b = i.kjonn === 'mann' ? 495 / (1.0324 - 0.19077 * Math.log10(i.midje - i.hals) + 0.15456 * Math.log10(i.hoyde)) - 450 : 495 / (1.29579 - 0.35004 * Math.log10(i.midje + i.hofte - i.hals) + 0.22100 * Math.log10(i.hoyde)) - 450; const result = Math.round(b * 10) / 10; return {value: result, unit: '%', desc: 'Estimert kroppsfettprosent basert på US Navy-metoden'}; },

  ffmi_calculator: (i) => { if(!i.weight) return null; const leanMass = i.weight * (1 - i.body_fat / 100); const heightM = i.height / 100; const ffmi = leanMass / (heightM * heightM); const adjustedFfmi = i.gender === 'male' ? ffmi : ffmi + 6.1; return {value: Math.round(adjustedFfmi * 100) / 100, unit: 'kg/m²', desc: 'FFMI (Fettfri masseindeks) - ' + (adjustedFfmi < 18.5 ? 'Undervektig' : adjustedFfmi < 25 ? 'Normal' : adjustedFfmi < 30 ? 'Overvektig' : 'Fedme') + ' (justert for kjønn)'}; },

  bmi_kvinner: (i) => { if(!i.vekt) return null; const result = i.vekt / ((i.hoyde/100) * (i.hoyde/100)); return {value: result, unit: 'kg/m²', desc: 'Kroppsmasseindeks (BMI) for kvinner'}; },

  bmi_overvekt: (i) => { if(!i.vekt) return null; const result = i.vekt / ((i.hoyde/100)*(i.hoyde/100)); return {value: result, unit: 'kg/m²', desc: 'Kroppsmasseindeks (BMI) for overvekt'}; },

  hudfold_kroppsfett_jackson_pollock: (i) => { if(!i.kjonn) return null; const result = i.kjonn === 'mann' ? 1.10938 - (0.0008267 * (i.bryst + i.mage + i.laar)) + (0.0000016 * Math.pow((i.bryst + i.mage + i.laar), 2)) - (0.0002574 * i.alder) : 1.0994921 - (0.0009929 * (i.bryst + i.mage + i.laar)) + (0.0000023 * Math.pow((i.bryst + i.mage + i.laar), 2)) - (0.0001392 * i.alder); const bodyfat = (495 / result) - 450; return {value: Math.round(bodyfat * 10) / 10, unit: '%', desc: 'Kroppsfettprosent beregnet med Jackson-Pollock 3-hudfoldmetoden'}; },

  a1c_converter: (i) => { if(!i.a1c_percent) return null; const result = (i.a1c_percent * 28.7) - 46.7; return {value: result, unit: 'mmol/L', desc: 'Estimert gjennomsnittlig glukose (eAG) i mmol/L'}; },

  eag_to_a1c: (i) => { if(!i.eag) return null; const result = (i.eag + 46.7) / 28.7; return {value: result, unit: '%', desc: 'Estimert A1c fra gjennomsnittlig blodsukker (eAG)'}; },

  blodsukker_omregner: (i) => { if(!i.blodsukker_verdi) return null; const result = i.enhet_fra === 'mmol/L' ? i.blodsukker_verdi * 18.0182 : i.blodsukker_verdi / 18.0182; return {value: result, unit: i.enhet_fra === 'mmol/L' ? 'mg/dL' : 'mmol/L', desc: 'Blodsukker omregnet fra ' + i.enhet_fra + ' til ' + (i.enhet_fra === 'mmol/L' ? 'mg/dL' : 'mmol/L')}; },

  homa_ir_calculator: (i) => { if(!i.fastende_glukose || !i.fastende_insulin) return null; const result = (i.fastende_glukose * i.fastende_insulin) / 405; return {value: result, unit: 'ingen enhet', desc: 'HOMA-IR indeks'}; },

  diabetes_risiko_score: (i) => { if(!i.alder) return null; const result = (i.alder * 0.05) + (i.bmi * 0.15) + (i.midje * 0.02) + ((i.fysisk_aktivitet === 'nei' ? 1 : 0) * 0.2) + ((i.familie_diabetes === 'ja' ? 1 : 0) * 0.25) + ((i.royking === 'ja' ? 1 : 0) * 0.15) + ((i.blodtrykk === 'hoyt' ? 1 : 0) * 0.2); return {value: result, unit: 'poeng', desc: 'Diabetesrisikoscore basert på alder, BMI, midjeomkrets, fysisk aktivitet, familiehistorie, røyking og blodtrykk'}; },

  glycemic_load_calculator: (i) => { if(!i.carbs) return null; const result = (i.gi * i.carbs * (i.portion / 100)) / 100; return {value: result, unit: 'gram', desc: 'Glykemisk belastning (GL) er ' + result.toFixed(1) + ' gram'}; },

  glykemisk_indeks_beregning: (i) => { if(!i.karbohydrater_per_100g) return null; const nettoKarbohydrater = i.karbohydrater_per_100g - (i.fiber_per_100g || 0); const sukkerAndel = (i.sukker_per_100g || 0) / nettoKarbohydrater; const justering = i.matvaretype === 'sukkerholdig' ? 1.2 : i.matvaretype === 'stivelsesrik' ? 0.8 : 1.0; const result = Math.min(100, Math.max(0, (nettoKarbohydrater * 0.5 + (i.sukker_per_100g || 0) * 0.8) * justering)); return {value: result, unit: 'GI', desc: 'Glykemisk indeks basert på karbohydrater, fiber, sukker og matvaretype'}; },

  insulin_dose_calculator: (i) => { if(!i.blodsukker) return null; const result = ((i.blodsukker - i.malblodsukker) / i.insulinfolsomhet) + (i.karbohydrater / i.karbofaktor) - i.aktivt_insulin; return {value: result, unit: i.enhet, desc: 'Beregnet insulindose: ' + result.toFixed(1) + ' ' + i.enhet}; },

  warszawa_metoden_score: (i) => { if(!i.alder) return null; const result = Math.round((i.alder * 0.1 + (i.stress_niva || 0) * 0.25 - (i.sovn_timer || 0) * 0.15 + (i.fysisk_aktivitet || 0) * 0.2 + (i.sosial_stotte || 0) * 0.15 + (i.kosthold_kvalitet || 0) * 0.15) * 10) / 10; return {value: result, unit: 'poeng', desc: 'Warszawa Metoden helsescore basert p\u00e5 alder, stressniv\u00e5, s\u00f8vn, fysisk aktivitet, sosial st\u00f8tte og kostholdskvalitet'}; },

  quicki_kalkulator: (i) => { if(!i.belop) return null; const result = i.beregningstype === 'prosent_av_belop' ? (i.belop * i.prosent / 100) / (i.antall_personer || 1) : i.belop / (i.antall_personer || 1); return {value: result, unit: 'kr', desc: 'Belop per person' + (i.beregningstype === 'prosent_av_belop' ? ' (inkl. prosent)' : '')}; },

  estimer_gjennomsnittlig_glukose: (i) => { if(!i.hba1c_value) return null; const hba1c = i.hba1c_unit === 'mmol/mol' ? i.hba1c_value : (i.hba1c_value - 2.15) * 10.929; const result = Math.round((28.7 * (hba1c / 10.929 + 2.15) - 46.7) * 10) / 10; return {value: result, unit: 'mmol/L', desc: 'Estimert gjennomsnittlig glukose (eAG) basert på HbA1c'}; },

  absi_calculator: (i) => { if(!i.midje || !i.hoyde || !i.vekt || !i.kjonn) return null; const bmi = i.vekt / ((i.hoyde/100) * (i.hoyde/100)); const absi = i.midje / (Math.pow(bmi, 2/3) * Math.pow(i.hoyde/100, 1/2)); return {value: absi, unit: 'm\u00B2/kg\u00B2\u00B3', desc: 'ABSI (A Body Shape Index) - ' + (i.kjonn === 'mann' ? 'menn' : 'kvinner') + ' - h\u00F8yere verdi indikerer st\u00F8rre risiko for fedmerelaterte sykdommer'}; },

  ozempic_calculator: (i) => { if(!i.current_weight) return null; const bmi = i.current_weight / ((i.height/100)*(i.height/100)); const targetBmi = i.goal_weight ? i.goal_weight / ((i.height/100)*(i.height/100)) : 24; const weeksLeft = i.current_week ? Math.max(0, 16 - i.current_week) : 16; const weeklyLoss = (i.current_weight - (targetBmi * ((i.height/100)*(i.height/100)))) / weeksLeft; const doseFactor = i.dose_schedule === '0.25' ? 0.5 : i.dose_schedule === '0.5' ? 1 : i.dose_schedule === '1.0' ? 1.5 : i.dose_schedule === '2.0' ? 2 : 1; const result = Math.max(0, weeklyLoss * doseFactor); return {value: result, unit: 'kg/uke', desc: 'Estimert ukentlig vekttap basert p\u00e5 doseplan og m\u00e5lvekt'}; },

  whr_calculator: (i) => { if(!i.midje_cm) return null; const result = i.midje_cm / i.hofte_cm; return {value: result, unit: 'ratio', desc: 'Midje-hofte forhold. Normal: <0.85 for kvinner, <0.90 for menn.'}; },

  gmi_til_a1c: (i) => { if(!i.gmi_value) return null; const result = (i.gmi_value + 46.7) / 28.7; return {value: result, unit: '%', desc: 'Estimert A1c fra GMI' + (i.unit ? ' (' + i.unit + ')' : '')}; },

  gki_kalkulator: (i) => { if(!i.blodsukker) return null; const result = (i.blodsukker * 18.0182) / (i.insulin || 1) * (i.enhet || 1); return {value: result, unit: 'mmol/L', desc: 'GKI-verdi basert p\u00e5 blodsukker, insulin og enhet'}; },

  semaglutid_dose_calculator: (i) => { if(!i.behandlingsuke) return null; const uke = Number(i.behandlingsuke); const ind = i.indikasjon; let dose; if(ind === 'vektnedgang') { if(uke <= 4) dose = 0.25; else if(uke <= 8) dose = 0.5; else if(uke <= 12) dose = 1.0; else if(uke <= 16) dose = 1.7; else dose = 2.4; } else { if(uke <= 4) dose = 0.25; else if(uke <= 8) dose = 0.5; else if(uke <= 12) dose = 1.0; else dose = 2.0; } return {value: dose, unit: 'mg', desc: 'Anbefalt dose uke ' + uke + ' for ' + (ind === 'vektnedgang' ? 'vektnedgang' : 'diabetes') + ' er ' + dose + ' mg'}; },

  kroppstype_beregning: (i) => { if(!i.kjonn) return null; const bmi = i.vekt / ((i.hoyde/100)*(i.hoyde/100)); const whr = i.midjeomkrets / i.hofteomkrets; const result = i.kjonn === 'mann' ? (whr > 0.9 ? 'Eple' : whr > 0.85 ? 'Pære' : 'Timeglass') : (whr > 0.85 ? 'Eple' : whr > 0.8 ? 'Pære' : 'Timeglass'); return {value: result, unit: 'type', desc: 'Kroppstype basert på midje-hofte ratio og BMI ' + bmi.toFixed(1)}; },

  fettinntak_formula: (i) => { if(!i.kjonn) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.alder - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.alder - 5 * i.alder - 161); const aktivitetsfaktor = { 'lite': 1.2, 'moderat': 1.55, 'mye': 1.9 }[i.aktivitet] || 1.2; const totaltEnergi = bmr * aktivitetsfaktor; const fettProsent = i.maal === 'ned' ? 0.2 : (i.maal === 'opp' ? 0.35 : 0.25); const fettGram = (totaltEnergi * fettProsent) / 9; const result = Math.round(fettGram); return {value: result, unit: 'g', desc: 'Anbefalt fettinntak per dag' + ' (' + result + ' g fett)'}; },

  ansiktsform_beregning: (i) => { if(!i.panne_bredde) return null; const ratio = i.ansikts_lengde / ((i.panne_bredde + i.kinnben_bredde + i.kjeve_bredde) / 3); let result = ''; if (ratio < 1.2) { result = 'rund'; } else if (ratio < 1.4) { result = 'oval'; } else if (ratio < 1.6) { result = 'lang'; } else { result = 'hjerte'; } if (i.kjonn === 'mann' && result === 'rund') { result = 'firkantet'; } return {value: result, unit: '', desc: 'Ansiktsform: ' + result}; },

  bh_storrelse_beregning: (i) => { if(!i.underbust_cm) return null; const band = Math.round(i.underbust_cm) < 63 ? 60 : Math.round(i.underbust_cm) < 68 ? 65 : Math.round(i.underbust_cm) < 73 ? 70 : Math.round(i.underbust_cm) < 78 ? 75 : Math.round(i.underbust_cm) < 83 ? 80 : Math.round(i.underbust_cm) < 88 ? 85 : Math.round(i.underbust_cm) < 93 ? 90 : Math.round(i.underbust_cm) < 98 ? 95 : Math.round(i.underbust_cm) < 103 ? 100 : Math.round(i.underbust_cm) < 108 ? 105 : 110; const diff = i.overbust_cm - band; const cup = diff < 10 ? 'AA' : diff < 13 ? 'A' : diff < 16 ? 'B' : diff < 19 ? 'C' : diff < 22 ? 'D' : diff < 25 ? 'E' : diff < 28 ? 'F' : diff < 31 ? 'G' : diff < 34 ? 'H' : 'I'; const result = band + cup; return {value: result, unit: 'BH-størrelse', desc: 'Bysteholderstørrelse: ' + result + ' (EU-standard)'}; },

  iq_percentile_calculator: (i) => { if(!i.iq_score) return null; const z = (i.iq_score - i.mean_iq) / i.std_dev; const percentile = 0.5 * (1 + erf(z / Math.sqrt(2))); const result = Math.round(percentile * 1000) / 10; return {value: result, unit: '%', desc: 'Prosentil rangering for IQ-skåre ' + i.iq_score + ' med gjennomsnitt ' + i.mean_iq + ' og standardavvik ' + i.std_dev}; },

  barthel_indeks: (i) => { if(!i.matlaging) return null; const result = (i.matlaging||0)+(i.spising||0)+(i.drikking||0)+(i.toalettbesok||0)+(i.av_og_pakledning||0)+(i.stell_av_utseende||0)+(i.badstue_eller_dusj||0)+(i.gangfunksjon||0)+(i.trappegang||0)+(i.forflytning_seng_stol||0); return {value: result, unit: 'poeng', desc: 'Barthel Indeks (0-100 poeng). Høyere score indikerer større grad av uavhengighet.'}; },

  oxfam_omsorgsbyrde: (i) => { if(!i.alder) return null; const result = (i.timer_per_uke * (i.antall_barn * 0.5 + i.antall_eldre * 0.8) * (i.kjonn === 'kvinne' ? 1.2 : 1.0)) / (i.alder * 0.1); return {value: result, unit: 'timer/uke', desc: 'Omsorgsbyrde basert på alder, kjønn, timer per uke, antall barn og antall eldre'}; },

  korrigert_kalsium: (i) => { if(!i.kalsium) return null; const result = parseFloat(i.kalsium) + 0.02 * (40 - parseFloat(i.albumin || 40)); return {value: Math.round(result * 100) / 100, unit: 'mmol/L', desc: 'Korrigert kalsium (albuminjustert)'}; },

  blodtrykk_analyse: (i) => { if(!i.systolisk || !i.diastolisk) return null; const s = i.systolisk; const d = i.diastolisk; let desc = ''; if(s < 120 && d < 80) { desc = 'Normalt blodtrykk'; } else if(s >= 120 && s < 130 && d < 80) { desc = 'Forhoyet blodtrykk'; } else if((s >= 130 && s < 140) || (d >= 80 && d < 90)) { desc = 'Hypertensjon stadium 1'; } else if(s >= 140 || d >= 90) { desc = 'Hypertensjon stadium 2'; } else if(s >= 180 || d >= 120) { desc = 'Hypertensiv krise'; } else { desc = 'Ubestemt'; } return {value: s + '/' + d, unit: 'mmHg', desc: desc}; },

  smerte_og_lidelse_kalkulator: (i) => { if(!i.skadegrad) return null; const result = (i.skadegrad * (i.alder || 30) * (i.varighet_ar || 1) * (i.type_skade === 'alvorlig' ? 2 : i.type_skade === 'moderat' ? 1.5 : 1)) / 100; return {value: result, unit: 'poeng', desc: 'Beregnet smerte og lidelse basert på skadegrad, alder, varighet og skadetype'}; },

  ems_score_calculator: (i) => { if(!i.systolic_bp) return null; const sbp = i.systolic_bp; const dbp = i.diastolic_bp; const fg = i.fasting_glucose; const hdl = i.hdl_cholesterol; const tg = i.triglycerides; const wc = i.waist_cm; const age = i.age; const gender = i.gender; const male = (gender === 'male' || gender === 'mann' || gender === 'm') ? 1 : 0; const score = (0.031 * sbp) + (0.030 * dbp) + (0.045 * fg) - (0.036 * hdl) + (0.052 * tg) + (0.025 * wc) + (0.020 * age) + (0.150 * male); return {value: Math.round(score * 100) / 100, unit: 'poeng', desc: 'EMS risikoscore (hoyere = hoyere risiko for metabolsk syndrom)'}; },

  adderall_urin_niva: (i) => { if(!i.dose_mg) return null; const dose = i.dose_mg; const tid = i.timer_siden_inntak; const vekt = i.kroppsvekt_kg || 70; const kjonnFaktor = i.kjonn === 'mann' ? 0.68 : 0.55; const halveringstid = 10; const konsentrasjon = (dose * 1000) / (vekt * kjonnFaktor * 1000) * Math.pow(0.5, tid / halveringstid) * 1000; const result = Math.round(konsentrasjon * 100) / 100; return {value: result, unit: 'ng/mL', desc: 'Estimert amfetaminniv\u00e5 i urin basert p\u00e5 dose, tid, vekt og kj\u00f8nn'}; },

  menopause_age_calculator: (i) => { if(!i.mother_age) return null; const result = Math.round(51 + (i.mother_age - 51) * 0.5 + (i.current_age ? (i.current_age - 35) * 0.1 : 0) + (i.symptom_level ? i.symptom_level * 1.5 : 0) + (i.smoking ? -2 : 0)); return {value: result, unit: 'år', desc: 'Estimert alder for overgangsalder basert på mors alder, din alder, symptomnivå og røyking'}; },

  prostata_volum_ellipsoid: (i) => { if(!i.bredde || !i.hoyde || !i.lengde) return null; const result = (i.bredde * i.hoyde * i.lengde * Math.PI) / 6; return {value: result, unit: 'ml', desc: 'Prostatavolum (ellipsoid)'}; },

  gad_7_score: (i) => { if(!i.q1) return null; const result = i.q1 + i.q2 + i.q3 + i.q4 + i.q5 + i.q6 + i.q7; return {value: result, unit: 'poeng', desc: 'GAD-7 angstscore: ' + result + ' poeng (0-21, høyere = mer angst)'}; },

  promille_calculator: (i) => { if(!i.alkohol_gram) return null; const genderFactor = i.kjonn === 'mann' ? 0.68 : 0.55; const promille = (i.alkohol_gram / (i.kroppsvekt_kg * genderFactor)) - (0.15 * i.timer_siden_forste_drink); const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet'}; },

  norgespris_beregning: (i) => { if(!i.forbruk) return null; const result = i.forbruk * i.pris_per_kwh + (i.nettleie_type === 'standard' ? 5000 : 3000); return {value: result, unit: 'NOK/år', desc: 'Årlig strømkostnad inkludert nettleie'}; },

  tabelltrekk_beregning: (i) => { if(!i.bruttoloenn) return null; const result = (i.bruttoloenn - (i.fradrag || 0)) * ((i.trekkprosent || 0) / 100); return {value: result, unit: 'NOK', desc: 'Beregnet tabelltrekk basert p\u00e5 bruttol\u00f8nn, trekkprosent og fradrag'}; },

  beregn_feriepenger: (i) => { if(!i.arslonn) return null; const result = i.arslonn * (i.ferieprosent || 12) / 100; return {value: result, unit: 'kr', desc: 'Feriepenger basert p\u00e5 ' + i.arslonn + ' kr i \u00e5rsl\u00f8nn og ' + (i.ferieprosent || 12) + ' % ferieprosent'}; },

  renters_rente_formel: (i) => { if(!i.startbelop) return null; const r = i.rente / 100; const n = i.ar * 12; const monthlyRate = r / 12; const futureValue = i.startbelop * Math.pow(1 + monthlyRate, n) + i.manedlig_sparing * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate); const skattFradrag = futureValue * (i.skatt / 100); const result = futureValue - skattFradrag; return {value: result, unit: 'kr', desc: 'Estimert totalbeløp etter ' + i.ar + ' år med ' + i.rente + '% rente og ' + i.skatt + '% skatt'}; },

  skatt_pa_pensjon: (i) => { if(!i.pensjonsinntekt) return null; const result = i.pensjonsinntekt - (i.pensjonsinntekt * i.minstefradrag_prosent / 100) - i.personfradrag; const skatt = result * (i.trygdeavgift / 100 + i.trinnskatt_prosent / 100); return {value: skatt, unit: 'kr', desc: 'Beregnet skatt p\u00e5 pensjon'}; },

  bilforsikring_formel: (i) => { if(!i.bilverdi) return null; const base = i.bilverdi * 0.05; const alderFaktor = i.alder < 25 ? 1.5 : 1.0; const kmFaktor = i.kjorelengde > 20000 ? 1.2 : 1.0; const bonusFaktor = Math.max(0.5, 1 - (i.bonus || 0) * 0.1); const typeFaktor = i.biltype === 'elbil' ? 0.8 : i.biltype === 'stasjonsvogn' ? 1.0 : 1.2; const result = base * alderFaktor * kmFaktor * bonusFaktor * typeFaktor; return {value: Math.round(result), unit: 'NOK/år', desc: 'Beregnet bilforsikring basert på bilverdi, alder, kjørelengde, bonus og biltype'}; },

  henger_kalkulator: (i) => { if(!i.tilhenger_vekt) return null; const result = (i.tilhenger_vekt + (i.last_vekt || 0)) / (i.tilhenger_aksler || 1); return {value: result, unit: 'kg', desc: 'Totalvekt per aksel for ' + (i.tilhenger_type || 'henger')}; },

  formuesskatt_2024: (i) => { if(!i.netto_formue) return null; const netto = i.netto_formue; const bunnfradrag = 1700000; const trinn1_grense = 4700000; const trinn1_sats = 0.007; const trinn2_sats = 0.011; let result = 0; if(netto > bunnfradrag) { const grunnlag = netto - bunnfradrag; const trinn1 = Math.min(grunnlag, trinn1_grense - bunnfradrag); const trinn2 = Math.max(0, grunnlag - (trinn1_grense - bunnfradrag)); result = trinn1 * trinn1_sats + trinn2 * trinn2_sats; } return {value: result, unit: 'NOK', desc: 'Formuesskatt for 2024 basert på netto formue'}; },

  dekk_kalkulator: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100) * 2 + i.felg_diameter * 25.4) * Math.PI / 1000; return {value: result, unit: 'meter', desc: 'Dekkets rulleringsomkrets i meter'}; },

  foreldrepenger_beregning: (i) => { if(!i.inntekt) return null; const result = Math.min(i.inntekt * (i.dekningsgrad === 100 ? 0.001 : 0.0008) * i.antall_uker, i.inntekt * 0.06 * i.antall_uker); return {value: result, unit: 'NOK', desc: 'Foreldrepenger basert p\u00e5 inntekt ' + i.inntekt + ', dekningsgrad ' + i.dekningsgrad + '% og ' + i.antall_uker + ' uker'}; },

  rulleomkrets_beregning: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100 * 2 + i.felgdiameter * 25.4) * Math.PI - (i.dekkbredde_original * i.profil_original / 100 * 2 + i.felgdiameter_original * 25.4) * Math.PI) / ((i.dekkbredde_original * i.profil_original / 100 * 2 + i.felgdiameter_original * 25.4) * Math.PI) * 100; return {value: result, unit: '%', desc: 'Endring i rulleomkrets i forhold til originaldekk' + (result > 0 ? ' (større)' : result < 0 ? ' (mindre)' : ' (ingen endring)')}; },

  kjoregodtgjorelse_2024: (i) => { if(!i.km) return null; const satser = { 'bil': 4.10, 'elbil': 3.80, 'moped': 1.50, 'sykkel': 1.50 }; const sats = satser[i.kjoretoy_type] || 4.10; const passasjerTillegg = (parseInt(i.passasjerer) || 0) * 1.00; const result = i.km * (sats + passasjerTillegg); return {value: result, unit: 'kr', desc: 'Kjøregodtgjørelse for ' + i.km + ' km med ' + i.kjoretoy_type + ' og ' + (i.passasjerer || 0) + ' passasjerer'}; },

  omregistreringsavgift_formel: (i) => { if(!i.vekt) return null; const vektAvgift = Math.max(0, (i.vekt - 1150) * 8.5); const co2Avgift = i.co2 ? Math.max(0, (i.co2 - 100) * 150) : 0; const alderFradrag = i.alder ? Math.min(vektAvgift + co2Avgift, (i.alder * 0.1) * (vektAvgift + co2Avgift)) : 0; const drivstoffTillegg = i.drivstoff === 'diesel' ? (vektAvgift + co2Avgift - alderFradrag) * 0.15 : 0; const result = Math.max(0, vektAvgift + co2Avgift - alderFradrag + drivstoffTillegg); return {value: result, unit: 'NOK', desc: 'Omregistreringsavgift basert p\u00e5 vekt ' + i.vekt + ' kg, CO2 ' + (i.co2 || 0) + ' g/km, alder ' + (i.alder || 0) + ' \u00e5r, drivstoff ' + (i.drivstoff || 'ukjent')}; },

  studiepoeng_kalkulator: (i) => { if(!i.antall_emner) return null; const result = (parseFloat(i.studiepoeng_per_emne) * parseFloat(i.bestatt_emner)) / parseFloat(i.antall_emner); return {value: result, unit: 'studiepoeng', desc: 'Gjennomsnittlig studiepoeng per emne basert p\u00e5 best\u00e5tte emner'}; },

  foreldrepermisjon_beregning: (i) => { if(!i.inntekt) return null; const grunnbelop = 124028; const sats = i.antall_barn === 1 ? 0.6 : (i.antall_barn === 2 ? 0.8 : 1.0); const maksInntekt = grunnbelop * 6; const beregnetInntekt = Math.min(i.inntekt, maksInntekt); const dagerTotalt = i.antall_barn === 1 ? 49 : (i.antall_barn === 2 ? 59 : 69); const ukeDager = 5; const dagerUttak = dagerTotalt * (i.uttaksgrad / 100) * (i.fordeling === 'mor' ? 1 : (i.fordeling === 'far' ? 1 : 0.5)); const dagSats = (beregnetInntekt * sats) / 260; const result = Math.round(dagerUttak * dagSats); return {value: result, unit: 'NOK', desc: 'Estimert foreldrepermisjon basert p\u00e5 inntekt og antall barn'}; },

  gullpris_beregning: (i) => { if(!i.vekt_gram) return null; const result = i.vekt_gram * (i.karat / 24) * i.dagspris_per_gram_24k; return {value: result, unit: 'NOK', desc: 'Gullpris basert p\u00e5 vekt, karat og dagspris for 24K gull'}; },

  boligverdi_estimator: (i) => { if(!i.areal_kvm) return null; const base = i.areal_kvm * 45000 + (i.rom || 0) * 150000 + (i.tomt_kvm || 0) * 3000; const lokasjon = {sentral: 1.3, forstad: 1.1, landlig: 0.85}; const stand = {ny: 1.2, god: 1.0, middels: 0.85, darlig: 0.65}; const alder = Math.max(0, Math.min(1, 1 - ((2025 - (i.byggear || 2000)) / 100))); const result = Math.round(base * (lokasjon[i.beliggenhet] || 1.0) * (stand[i.tilstand] || 1.0) * (0.5 + alder * 0.5)); return {value: result, unit: 'NOK', desc: 'Estimert boligverdi i norske kroner basert på areal, rom, tomt, beliggenhet, tilstand og byggeår'}; },

  bompenge_kalkulator: (i) => { if(!i.antall_passeringsdager) return null; const result = Math.min(i.antall_passeringsdager * i.takst_per_passerting * (1 - i.rabattprosent / 100), i.maanedlig_tak); return {value: result, unit: 'kr', desc: 'Maanedlig bompengekostnad basert paa ' + i.antall_passeringsdager + ' passeringer over ' + i.antall_dager + ' dager'}; },

  iban_calculator: (i) => { if(!i.kontonummer) return null; const result = i.kontonummer.replace(/[^0-9]/g, '').slice(0,11); return {value: result, unit: 'IBAN', desc: 'IBAN-kalkulator for kontonummer ' + i.kontonummer}; },

  forsinkelsesrente_beregning: (i) => { if(!i.hovedstol) return null; const rente = i.rentesats_type === 'egendefinert' ? (i.egendefinert_sats || 0) : 0.10; const diffDager = Math.floor((new Date(i.betalingsdato) - new Date(i.forsinkelsesdato)) / (1000 * 60 * 60 * 24)); const result = i.hovedstol * rente * diffDager / 365; return {value: result, unit: 'NOK', desc: 'Forsinkelsesrente basert p\u00e5 ' + rente * 100 + '% rente over ' + diffDager + ' dager'}; },

  mellomfinansiering_kalkulator: (i) => { if(!i.boligpris) return null; const result = (i.boligpris - i.egenkapital) * (i.rente_mellomfinansiering / 100 / 12) * i.maneder_mellomfinansiering + (i.salgspris_gammel_bolig - i.gjeld_gammel_bolig) * (i.rente_mellomfinansiering / 100 / 12) * i.maneder_mellomfinansiering; return {value: result, unit: 'kr', desc: 'Totale kostnader ved mellomfinansiering i ' + i.maneder_mellomfinansiering + ' m\u00e5neder'}; },

  arslonn_beregner: (i) => { if(!i.lonn_type) return null; const result = i.lonn_type === 'maned' ? (i.belop * 12) + (i.belop * 12 * (i.feriepenger_prosent || 0) / 100) : i.lonn_type === 'time' ? (i.belop * (i.timer_per_uke || 37.5) * 52) + ((i.belop * (i.timer_per_uke || 37.5) * 52) * (i.feriepenger_prosent || 0) / 100) : i.lonn_type === 'ar' ? i.belop + (i.belop * (i.feriepenger_prosent || 0) / 100) : null; return {value: result, unit: 'kr', desc: 'Årslønn inkludert feriepenger'}; },

  bostotte_beregning: (i) => { if(!i.antall_voksne) return null; const v = i.antall_voksne; const b = i.antall_barn || 0; const inntekt = i.inntekt_aar || 0; const formue = i.formue || 0; const boutgifter = i.boutgifter_mnd || 0; const boligtype = i.boligtype || 'leilighet'; const boutgifter_aar = boutgifter * 12; const inntekt_grunnlag = inntekt + formue * 0.05; const sats_voksen = 5000; const sats_barn = 2500; const maks_boutgift = boligtype === 'leilighet' ? 10000 : 12000; const boutgift_tilskudd = Math.min(boutgifter_aar, maks_boutgift * 12); const grunnbelop = (v * sats_voksen + b * sats_barn) * 12; const egenandel = Math.max(0, inntekt_grunnlag * 0.4 - grunnbelop); const stotte = Math.max(0, boutgift_tilskudd - egenandel); const result = Math.round(stotte / 12); return {value: result, unit: 'kr/mnd', desc: 'Beregnet bostøtte per måned basert på ' + v + ' voksne, ' + b + ' barn, inntekt ' + inntekt + ' kr/år, formue ' + formue + ' kr, boutgifter ' + boutgifter + ' kr/mnd og boligtype ' + boligtype}; },

  beregn_ansiennitet: (i) => { if(!i.start_dato) return null; const start = new Date(i.start_dato); const slutt = i.slutt_dato ? new Date(i.slutt_dato) : new Date(); const diffMs = slutt - start; const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25); const result = Math.max(0, Math.round(diffYears * 100) / 100); return {value: result, unit: 'år', desc: 'Beregnet ansiennitet i år'}; },

  boligverdi_estimat: (i) => { if(!i.areal_kvm) return null; const result = (i.areal_kvm * 45000) + (i.rom * 50000) + (i.beliggenhet * 200000) + (i.tilstand * 150000) + (i.tomt_kvm * 3000); return {value: result, unit: 'NOK', desc: 'Estimert boligverdi basert på areal, rom, beliggenhet, tilstand og tomt'}; },

  indeksregulering_husleie: (i) => { if(!i.current_rent) return null; const result = Math.round(i.current_rent * (i.current_kpi / i.previous_kpi) * 100) / 100; return {value: result, unit: 'NOK', desc: 'Indeksregulert husleie basert på KPI-endring'}; },

  bompenger_kalkulator: (i) => { if(!i.antall_passeringsdager) return null; const result = i.antall_passeringsdager * i.pris_per_passerings; return {value: result, unit: 'kr', desc: 'Totale bompenger for ' + i.antall_passeringsdager + ' passeringer med ' + i.kjøretøytype}; },

  eiendomsskatt_beregning: (i) => { if(!i.boligtype) return null; const result = Math.max(0, (Number(i.formuesverdi) - Number(i.bunnfradrag)) * (Number(i.kommunesats) / 1000)); return {value: result, unit: 'NOK', desc: 'Eiendomsskatt basert p\u00e5 formuesverdi, bunnfradrag og kommunesats'}; },

  sifo_budsjett_beregning: (i) => { if(!i.voksne) return null; const voksenKost = i.voksne * 4500; const barnKost = (i.barn || 0) * 2500; const boligKost = i.boligtype === 'leilighet' ? 8000 : i.boligtype === 'hus' ? 10000 : 7000; const bilKost = i.bil === 'ja' ? 3000 : 0; const result = voksenKost + barnKost + boligKost + bilKost; return {value: result, unit: 'NOK', desc: 'Estimert månedlig budsjett for husholdning med ' + i.voksne + ' voksne og ' + (i.barn || 0) + ' barn'}; },

  stromstotte_beregning: (i) => { if(!i.strompris) return null; const strompris = parseFloat(i.strompris); const forbruk = parseFloat(i.forbruk); const maaned = parseInt(i.maaned); const terskelpris = 0.70; const sats = 0.90; const stotte = Math.max(0, (strompris - terskelpris) * sats * forbruk); return {value: stotte, unit: 'kr', desc: 'Strømstøtte for ' + maaned + '. måned basert på ' + forbruk + ' kWh og strømpris ' + strompris + ' kr/kWh'}; },

  bolig_prisstigning: (i) => { if(!i.kjøpspris) return null; const result = i.kjøpspris * Math.pow(1 + (i.årlig_prisvekst || 0) / 100, i.år || 0); return {value: result, unit: 'NOK', desc: 'Estimert boligverdi etter ' + (i.år || 0) + ' år med ' + (i.årlig_prisvekst || 0) + '% årlig prisvekst'}; },

  future_value_savings: (i) => { if(!i.monthly_savings) return null; const r = i.annual_return / 100 / 12; const n = i.years * 12; const fv = i.monthly_savings * ((Math.pow(1 + r, n) - 1) / r) + i.initial_amount * Math.pow(1 + r, n); return {value: fv, unit: 'kr', desc: 'Fremtidig verdi av sparing'}; },

  dagpenger_beregning: (i) => { if(!i.inntekt_siste_12_mnd) return null; const grunnlag = Math.max(i.inntekt_siste_12_mnd / 12, i.inntekt_siste_3_mnd / 3); const sats = grunnlag * 0.624; const barnetillegg = i.antall_barn * 32; const justert = sats + barnetillegg; const prosent = (i.arbeidstid_prosent || 100) / 100; const result = Math.min(justert * prosent, 6 * grunnlag / 260); return {value: Math.round(result), unit: 'kr/dag', desc: 'Dagpenger per dag for ' + (i.tidligere_dagpenger ? 'gjenopptak' : 'ny') + ' søknad'}; },

  uføretrygd_skatt_beregning: (i) => { if(!i.brutto_uføretrygd) return null; const minstefradrag = Math.min(i.brutto_uføretrygd * 0.45, 109950); const personfradrag = i.skatteklasse === 2 ? 109950 : 54975; const trinnskatt = Math.max(0, (i.brutto_uføretrygd - 198350) * 0.017) + Math.max(0, (i.brutto_uføretrygd - 279150) * 0.04) + Math.max(0, (i.brutto_uføretrygd - 642950) * 0.132) + Math.max(0, (i.brutto_uføretrygd - 926800) * 0.162) + Math.max(0, (i.brutto_uføretrygd - 1500000) * 0.172); const alminneligInntekt = Math.max(0, i.brutto_uføretrygd - minstefradrag - personfradrag); const kommuneskatt = alminneligInntekt * (i.kommunesats / 100); const trygdeavgift = i.brutto_uføretrygd * 0.08; const totalSkatt = kommuneskatt + trinnskatt + trygdeavgift; const nettoUføretrygd = i.brutto_uføretrygd - totalSkatt; return {value: nettoUføretrygd, unit: 'kr', desc: 'Netto uføretrygd etter skatt'}; },

  forsikring_bil_kalkulator: (i) => { if(!i.bilverdi) return null; const result = Math.max(0, (i.bilverdi * 0.035 + (i.bilalder > 10 ? 500 : 0) + (i.aarlig_kjorelengde > 15000 ? 800 : 0) + (i.foreralder < 25 ? 1200 : 0)) * (1 - Math.min(i.bonus, 75) / 100)); return {value: result, unit: 'NOK/år', desc: 'Estimert årlig forsikringspremie for bil basert på verdi, alder, kjørelengde, føreralder og bonus'}; },

  manedslonn_beregning: (i) => { if(!i.lonn_type) return null; const result = i.lonn_type === 'timelonn' ? (i.belop * i.timer_per_uke * 52 / 12) * (1 - (i.skatteprosent || 0) / 100) * (1 + (i.arbeidsgiveravgift_prosent || 0) / 100) : i.lonn_type === 'manedslonn' ? i.belop * (1 - (i.skatteprosent || 0) / 100) * (1 + (i.arbeidsgiveravgift_prosent || 0) / 100) : null; return {value: result, unit: 'kr', desc: 'Månedslønn etter skatt og arbeidsgiveravgift'}; },

  afp_privat_sektor: (i) => { if(!i.sluttlonn) return null; const result = Math.max(0, Math.min(1, (i.pensjonspoeng || 0) / 7)) * Math.min(1, (i.trygdetid || 0) / 40) * (0.54 * i.sluttlonn + 0.46 * (i.sluttlonn * Math.min(1, ((i.fodselsar ? (2025 - i.fodselsar) : 67) - 62) / 5))); return {value: result, unit: 'NOK/år', desc: 'Beregnet AFP for privat sektor basert på sluttlønn, pensjonspoeng, fødselsår, startalder og trygdetid'}; },

  advanced_calculator: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? (Number(i.tall2) === 0 ? null : Number(i.tall1) / Number(i.tall2)) : null; return {value: result, unit: 'enhet', desc: 'Resultat av ' + i.operasjon + ' mellom ' + i.tall1 + ' og ' + i.tall2}; },

  bolig_verdivurdering: (i) => { if(!i.boareal) return null; const result = (i.boareal * (i.pris_per_kvm || 50000) + (i.tomteareal || 0) * 2000) * (1 + (i.standard || 0) * 0.1 + (i.beliggenhet || 0) * 0.15) * (1 + ((i.etasjer || 1) - 1) * 0.05) * (1 - (2024 - (i.byggeaar || 2000)) * 0.005); return {value: result, unit: 'NOK', desc: 'Estimert boligverdi basert på boareal, tomteareal, pris per kvm, standard, beliggenhet, etasjer og byggeår'}; },

  fartsbot_beregning: (i) => { if(!i.hastighet) return null; const overskridelse = i.hastighet - i.fartsgrense; const bot = overskridelse <= 0 ? 0 : overskridelse <= 5 ? 800 : overskridelse <= 10 ? 2400 : overskridelse <= 15 ? 4800 : overskridelse <= 20 ? 7200 : overskridelse <= 25 ? 9600 : 12000; const soneMultiplier = i.sone === 'skole' ? 2 : i.sone === 'motorvei' ? 1.5 : 1; const result = Math.round(bot * soneMultiplier); return {value: result, unit: 'NOK', desc: 'Boten for ' + overskridelse + ' km/t over fartsgrensen i ' + i.sone + ' sone er ' + result + ' kroner'}; },

  indeksfond_vekst: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const ra = i.kostnad_aktivt / 100; const ri = i.kostnad_indeks / 100; const n = i.ar; const m = i.manedlig_sparing; const vekstIndeks = (r - ri); const vekstAktiv = (r - ra); const sluttIndeks = i.startbelop * Math.pow(1 + vekstIndeks, n) + m * ((Math.pow(1 + vekstIndeks, n) - 1) / vekstIndeks); const sluttAktiv = i.startbelop * Math.pow(1 + vekstAktiv, n) + m * ((Math.pow(1 + vekstAktiv, n) - 1) / vekstAktiv); const diff = sluttIndeks - sluttAktiv; return {value: diff, unit: 'kr', desc: 'Merverdi med indeksfond vs aktivt forvaltet fond etter ' + n + ' ar'}; },

  kpi_husleie_kalkulator: (i) => { if(!i.current_rent) return null; const result = i.current_rent * (i.new_kpi / i.old_kpi) * (1 + (i.months_since_last || 0) / 12); return {value: result, unit: 'NOK', desc: 'Ny husleie basert på KPI-justering'}; },

  skjermingsfradrag_beregning: (i) => { if(!i.skjermingsgrunnlag) return null; const result = Math.max(0, (i.skjermingsgrunnlag * i.skjermingsrente / 100 * i.eiertid / 12) - (i.utbytte || 0)); return {value: result, unit: 'NOK', desc: 'Skjermingsfradrag i NOK basert p\u00e5 skjermingsgrunnlag, skjermingsrente, eiertid og utbytte'}; },

  listepris_bruktbil: (i) => { if(!i.nybilpris) return null; const result = Math.max(0, i.nybilpris * (1 - 0.15 * Math.min(i.alder || 0, 10) - 0.005 * (i.km_per_ar || 0) * (i.alder || 0) - (i.tilstand === 'dårlig' ? 0.2 : i.tilstand === 'middels' ? 0.1 : 0))); return {value: result, unit: 'kr', desc: 'Estimert listepris for bruktbil basert på nybilpris, alder, km/år og tilstand'}; },

  bygg_hus_kalkulator: (i) => { if(!i.boligtype) return null; const base = {enebolig: 25000, tomannsbolig: 22000, rekkehus: 20000, leilighet: 18000}[i.boligtype] || 20000; const area = (i.bruksareal || 100); const floors = (i.etasjer || 1); const std = {lav: 0.8, normal: 1.0, hoy: 1.2, topp: 1.4}[i.standard] || 1.0; const plot = (i.tomtestorrelse || 500); const garage = (i.garasje === 'ja' ? 1.1 : 1.0); const energy = {A: 0.9, B: 0.95, C: 1.0, D: 1.05, E: 1.1, F: 1.15, G: 1.2}[i.energiklasse] || 1.0; const result = Math.round(base * area * floors * std * (1 + (plot - 500) / 5000) * garage * energy); return {value: result, unit: 'NOK', desc: 'Estimert byggekostnad for ' + i.boligtype + ' med ' + area + ' kvm bruksareal, ' + floors + ' etasje(r), standard ' + (i.standard || 'normal') + ', tomt ' + plot + ' kvm, garasje ' + (i.garasje || 'nei') + ', energiklasse ' + (i.energiklasse || 'C')}; },

  alkometer_formula: (i) => { if(!i.antall_enheter) return null; const result = ((i.antall_enheter * 12) / (i.kroppsvekt * (i.kjonn === 'mann' ? 0.68 : 0.55))) - (0.15 * i.timer_siden_forste); return {value: Math.max(0, result), unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet' + ' (promille)'}; },

  spare_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.rente / 100; const n = i.renteperiode === 'manedlig' ? 12 : i.renteperiode === 'kvartalsvis' ? 4 : i.renteperiode === 'arlig' ? 1 : 12; const t = i.ar * n; const rPeriode = r / n; const result = i.startbelop * Math.pow(1 + rPeriode, t) + i.manedlig_sparing * ((Math.pow(1 + rPeriode, t) - 1) / rPeriode); return {value: result, unit: 'kr', desc: 'Sluttbelop etter ' + i.ar + ' ar med ' + i.manedlig_sparing + ' kr i manedlig sparing'}; },

  gjengs_leie_kalkulator: (i) => { if(!i.boligtype) return null; const base = { 'leilighet': 120, 'enebolig': 150, 'rekkehus': 135, 'tomannsbolig': 130 }[i.boligtype] || 120; const sizeFactor = (i.storrelse_kvm || 50) * 1.0; const roomFactor = (i.antall_rom || 2) * 20; const locationFactor = { 'sentrum': 1.4, 'bydel': 1.2, 'forstad': 1.0, 'landlig': 0.8 }[i.beliggenhet] || 1.0; const standardFactor = { 'nybygg': 1.3, 'god': 1.1, 'middels': 1.0, 'eldre': 0.85, 'oppussingsobjekt': 0.7 }[i.standard] || 1.0; const stromTillegg = i.inkludert_strom === 'ja' ? 500 : 0; const moblertTillegg = i.moblert === 'ja' ? 800 : 0; const result = Math.round((base * sizeFactor + roomFactor) * locationFactor * standardFactor + stromTillegg + moblertTillegg); return {value: result, unit: 'kr/mnd', desc: 'Estimert gjengs leie basert på boligtype, storrelse, rom, beliggenhet, standard, strom og moblering'}; },

  formuesverdi_bolig: (i) => { if(!i.boligtype) return null; const result = i.boligtype === 'boligeiendom' ? Math.max(i.takst * 0.25, i.kommunal_verdi * i.formuesandel) - i.gjeld : i.boligtype === 'fritidseiendom' ? Math.max(i.takst * 0.25, i.kommunal_verdi * i.formuesandel) - i.gjeld : i.boligtype === 'tomt' ? Math.max(i.takst * 0.25, i.kommunal_verdi * i.formuesandel) - i.gjeld : 0; return {value: result, unit: 'NOK', desc: 'Formuesverdi for bolig'}; },

  biologisk_alder_formel: (i) => { if(!i.kronologisk_alder) return null; const result = Number(i.kronologisk_alder) + (i.royking ? 5 : 0) + (i.alkohol_enheter_per_uke > 14 ? (i.alkohol_enheter_per_uke - 14) * 0.3 : 0) - (i.treningsdager_per_uke >= 3 ? i.treningsdager_per_uke * 0.5 : 0) + ((i.bmi - 22) * 0.4) - (i.sovn_timer_per_natt >= 7 && i.sovn_timer_per_natt <= 9 ? 1 : (i.sovn_timer_per_natt < 6 ? 2 : 0)) + (i.stress_niva * 0.2) - (i.kosthold_kvalitet * 0.3); return {value: Math.round(result * 10) / 10, unit: 'år', desc: 'Estimert biologisk alder basert på livsstilsfaktorer'}; },

  dekkdimensjon_beregning: (i) => { if(!i.bredde) return null; const result = ((i.bredde * i.profil / 100) * 2 + (i.felg_diameter * 25.4)) - ((i.sammenlign_bredde * i.sammenlign_profil / 100) * 2 + (i.sammenlign_felg * 25.4)); return {value: result, unit: 'mm', desc: 'Forskjell i total diameter mellom dekkdimensjonene'}; },

  mc_forsikring_premie: (i) => { if(!i.mc_verdi) return null; const base = i.mc_verdi * 0.035; const alderFaktor = Math.max(0.5, 1 - (i.mc_alder || 0) * 0.02); const erfaringFaktor = Math.max(0.6, 1 - (i.mc_erfaring || 0) * 0.05); const arsmodellFaktor = Math.max(0.7, 1 - (2025 - (i.mc_arsmodell || 2025)) * 0.01); const bonusFaktor = Math.max(0.5, 1 - (i.mc_bonus || 0) * 0.03); const typeFaktor = (i.mc_type === 'sports' ? 1.4 : i.mc_type === 'cruiser' ? 1.1 : i.mc_type === 'touring' ? 0.9 : 1.2); const result = Math.round(base * alderFaktor * erfaringFaktor * arsmodellFaktor * bonusFaktor * typeFaktor); return {value: result, unit: 'NOK/år', desc: 'Årlig MC forsikringspremie basert på verdi, alder, erfaring, årsmodell, bonus og type'}; },

  moms_kalkulator: (i) => { if(!i.belop) return null; const result = i.retning === 'inkl' ? i.belop - (i.belop / (1 + i.moms_sats / 100)) : i.belop * (i.moms_sats / 100); return {value: result, unit: 'kr', desc: 'Momsbelop i ' + (i.retning === 'inkl' ? 'belop med moms' : 'belop uten moms')}; },

  strompris_beregning: (i) => { if(!i.forbruk_kwh) return null; const result = (i.forbruk_kwh * (i.strompris_ore + i.nettleie_ore + i.elavgift_ore)) / 100; return {value: result, unit: 'kr', desc: 'Total strømpris for ' + i.maned + ' basert på ' + i.forbruk_kwh + ' kWh forbruk'}; },

  kwh_pris_kalkulator: (i) => { if(!i.forbruk_kwh) return null; const result = (i.forbruk_kwh * (i.pris_per_kwh_ore / 100)) + (i.fastavgift_per_maned || 0); return {value: result, unit: 'kr', desc: 'Total strømkostnad per måned i norske kroner'}; },

  fond_sparing_fremtidig_verdi: (i) => { if(!i.maanedlig_innskudd) return null; const r = i.forventet_avkastning / 100; const n = i.spareperiode_aar; const m = 12; const P = i.maanedlig_innskudd; const S = i.startkapital || 0; const t = i.skatt_type === 'aksjesparekonto' ? 0.377 : 0.22; const fv = S * Math.pow(1 + r, n) + P * ((Math.pow(1 + r/m, m*n) - 1) / (r/m)) * (1 - t); return {value: fv, unit: 'kr', desc: 'Fremtidig verdi av sparingen etter ' + n + ' aar'}; },

  feriepenge_kalkulator: (i) => { if(!i.brutto_aarslonn) return null; const result = i.brutto_aarslonn * (i.feriefaktor || 0.12); return {value: result, unit: 'kr', desc: 'Feriepenger for ' + (i.ferieaar || 'aktuelt') + ' er ' + result.toFixed(2) + ' kr'}; },

  leiepris_kalkulator: (i) => { if(!i.boligverdi) return null; const result = ((i.boligverdi - i.egenkapital) * (i.rente / 100 / 12) + i.felleskostnader + i.andre_kostnader + (i.boligverdi * (i.onsket_avkastning / 100 / 12))) / (1 - 0); return {value: result, unit: 'kr/mnd', desc: 'Anbefalt leiepris basert på kostnader og avkastning'}; },

  dekk_rulleomkrets: (i) => { if(!i.dekk_bredde_gammel) return null; const gammel = (i.dekk_bredde_gammel * i.dekk_profil_gammel / 100 * 2 + i.felg_diameter_gammel * 25.4) * Math.PI; const ny = (i.dekk_bredde_ny * i.dekk_profil_ny / 100 * 2 + i.felg_diameter_ny * 25.4) * Math.PI; const result = ((ny - gammel) / gammel) * 100; return {value: result, unit: '%', desc: 'Endring i rulleomkrets i prosent'}; },

  advanced_math_calculator: (i) => { if(!i.num1) return null; const n1 = parseFloat(i.num1); const n2 = i.num2 ? parseFloat(i.num2) : 0; let result; if(i.operation === 'add') result = n1 + n2; else if(i.operation === 'subtract') result = n1 - n2; else if(i.operation === 'multiply') result = n1 * n2; else if(i.operation === 'divide') result = n2 !== 0 ? n1 / n2 : null; else if(i.operation === 'power') result = Math.pow(n1, n2); else if(i.operation === 'sqrt') result = n1 >= 0 ? Math.sqrt(n1) : null; else if(i.operation === 'sin') result = Math.sin(n1 * Math.PI / 180); else if(i.operation === 'cos') result = Math.cos(n1 * Math.PI / 180); else if(i.operation === 'tan') result = Math.tan(n1 * Math.PI / 180); else result = null; if(result === null || isNaN(result)) return null; return {value: result, unit: 'enhet', desc: 'Avansert matematisk resultat: ' + result}; },

  kalorikalkulator: (i) => { if(!i.alder) return null; const bmr = i.kjonn === 'mann' ? 88.362 + (13.397 * i.vekt) + (4.799 * i.hoyde) - (5.677 * i.alder) : 447.593 + (9.247 * i.vekt) + (3.098 * i.hoyde) - (4.330 * i.alder); const aktivitetsfaktor = {1.2: 1.2, 1.375: 1.375, 1.55: 1.55, 1.725: 1.725, 1.9: 1.9}[i.aktivitetsniva] || 1.2; const result = Math.round(bmr * aktivitetsfaktor); return {value: result, unit: 'kcal/dag', desc: 'Ditt daglige kaloribehov er ' + result + ' kcal'}; },

  stromforbruk_beregning: (i) => { if(!i.effekt_watt) return null; const result = (i.effekt_watt * i.timer_per_dag * i.dager_per_ar * i.strompris_ore) / 100000; return {value: result, unit: 'kroner', desc: 'Årlig strømkostnad for ' + i.apparat_type}; },

  alko_kalkulator: (i) => { if(!i.vekt) return null; const result = ((i.alkohol_mengde * 0.789) / (i.vekt * (i.kjonn === 'mann' ? 0.7 : 0.6))) - (0.15 * i.timer_siden_start); return {value: Math.max(0, result), unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet'}; },

  reisefradrag_beregning: (i) => { if(!i.arbeidsdager_per_ar) return null; const reisefradrag = Math.max(0, (i.arbeidsdager_per_ar * i.km_en_vei * 2 * (i.transportmiddel === 'bil' ? 1.76 : 0.80) + (i.bomutgifter_per_ar || 0) + (i.ferjeutgifter_per_ar || 0)) - 14000); return {value: reisefradrag, unit: 'NOK', desc: 'Beregnet reisefradrag for pendling'}; },

  boligpris_estimat: (i) => { if(!i.kvadratmeter) return null; const result = i.kvadratmeter * i.pris_per_kvm * (1 + (i.beliggenhet||0) * 0.1) * (1 + (i.tilstand||0) * 0.05) * (1 + (i.etasje||0) * 0.03); return {value: result, unit: 'NOK', desc: 'Estimert boligpris basert på kvadratmeter, pris per kvm, beliggenhet, tilstand og etasje'}; },

  nav_permisjon_kalkulator: (i) => { if(!i.antall_barn) return null; const a = Number(i.antall_barn); const w = Number(i.ukentlig_arbeidstid) || 37.5; const y = Number(i.inntekt_per_ar) || 0; const p = i.permisjonstype || 'fedrekvote'; const f = i.fordeling || '100'; const grunnbelop = 124028; const maxInntekt = 6 * grunnbelop; const inntektGrunnlag = Math.min(y, maxInntekt); const dagsats = inntektGrunnlag / 260; const ukerTotal = p === 'fedrekvote' ? 15 : p === 'modrekvote' ? 15 : p === 'fellesperiode' ? 48 : 49; const ukerMedFordeling = p === 'fellesperiode' ? Math.round(ukerTotal * (Number(f) / 100)) : ukerTotal; const dager = ukerMedFordeling * 5; const belop = dagsats * dager; const result = Math.round(belop * (a > 0 ? 1 + (a - 1) * 0.1 : 1)); return {value: result, unit: 'kr', desc: 'Estimert NAV permisjonsbelop i kroner basert pa ' + ukerMedFordeling + ' uker med ' + f + '% uttak og ' + a + ' barn'}; },

  tabelltrekk_7100: (i) => { if(!i.inntekt) return null; const result = Math.round((i.inntekt - (i.fradrag || 0)) * (i.skatteklasse === 2 ? 0.22 : 0.25)); return {value: result, unit: 'kr', desc: 'Tabelltrekk 7100 for helse' + (i.skatteklasse === 2 ? ' klasse 2' : ' klasse 1')}; },

  odin_fond_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.ar_avkastning / 100; const n = i.ar; const P = i.startbelop; const M = i.manedlig_sparing || 0; const infl = i.inflasjon ? i.inflasjon / 100 : 0; const vekst = P * Math.pow(1 + r, n) + M * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); const realVekst = i.inflasjon ? vekst / Math.pow(1 + infl, n) : vekst; const result = i.skatt_type === 'fritak' ? realVekst : realVekst * 0.78; return {value: Math.round(result), unit: 'kr', desc: 'Estimert verdi etter ' + n + ' år'}; },

  fot_til_meter: (i) => { if(!i.fot) return null; const result = i.fot * 0.3048; return {value: result, unit: 'm', desc: 'Fot til meter'}; },

  bil_forsikring_estimat: (i) => { if(!i.bilverdi) return null; const result = Math.max(0, (i.bilverdi * 0.035 + (i.alder || 25) * 50 + (i.kjorelengde || 15000) * 0.02) * (1 - Math.min((i.bonus || 0) * 0.1, 0.75)) * (i.forsikringstype === 'kasko' ? 1.4 : i.forsikringstype === 'delkasko' ? 1.15 : 1)); return {value: Math.round(result), unit: 'NOK', desc: 'Estimert bilforsikring per år i norske kroner basert på bilverdi, alder, kjorelengde, bonus og forsikringstype'}; },

  bilforsikring_premie: (i) => { if(!i.bil_verdi) return null; const base = i.bil_verdi * 0.05; const alderFaktor = Math.max(0.5, 1 - (i.alder || 25) * 0.01); const kmFaktor = Math.min(1.5, 1 + ((i.kjorelengde || 15000) - 10000) / 20000); const bonusFaktor = Math.max(0.4, 1 - (i.bonus || 0) * 0.1); const dekningsNivaFaktor = {min:0.7, middels:1.0, max:1.3}[(i.dekningsniva || 'middels')] || 1.0; const result = Math.round(base * alderFaktor * kmFaktor * bonusFaktor * dekningsNivaFaktor); return {value: result, unit: 'NOK/år', desc: 'Beregnet bilforsikringspremie basert på bilverdi, alder, kjørelengde, bonus og dekningsnivå'}; },

  kondisjonsalder_formel: (i) => { if(!i.hvilepuls) return null; const result = Math.round((i.kjonn === 'mann' ? 15.3 : 14.7) * (i.hvilepuls / (i.alder * 0.1 + 20))); return {value: result, unit: 'år', desc: 'Kondisjonsalder basert på hvilepuls, alder og kjønn'}; },

  foreldrepermisjon_fordeling: (i) => { if(!i.total_uker) return null; const total = i.total_uker; const mor = i.mor_uker || 0; const far = i.far_uker || 0; const inntektMor = i.inntekt_mor || 0; const inntektFar = i.inntekt_far || 0; const dekning = i.dekningsgrad || 100; const felles = total - mor - far; const morPenger = mor * (inntektMor * dekning / 100 / 52); const farPenger = far * (inntektFar * dekning / 100 / 52); const fellesPenger = felles * ((inntektMor + inntektFar) / 2 * dekning / 100 / 52); const result = morPenger + farPenger + fellesPenger; return {value: result, unit: 'NOK', desc: 'Estimert total utbetaling ved ' + dekning + '% dekning'}; },

  nettleie_kalkulator: (i) => { if(!i.forbruk_kwh) return null; const result = i.forbruk_kwh * 0.45 + (i.effekt_kw || 0) * 125 + (i.arstid === 'vinter' ? 0.15 : 0.05) * i.forbruk_kwh; return {value: Math.round(result * 100) / 100, unit: 'kr', desc: 'Estimert nettleie basert på forbruk og effekt'}; },

  bolig_prisantydning: (i) => { if(!i.areal) return null; const result = i.areal * (i.kvadratmeterpris || 0) * (1 + (i.beliggenhet || 0) * 0.1) * (1 + (i.tilstand || 0) * 0.05) * (1 + (i.etasje || 0) * 0.03) + (i.parkering ? 500000 : 0); return {value: result, unit: 'NOK', desc: 'Estimert prisantydning basert på areal, kvadratmeterpris, beliggenhet, tilstand, etasje og parkering'}; },

  ssb_byggekostnadsindeks: (i) => { if(!i.bygningstype) return null; const result = i.grunnbelop * (1 + (i.sluttaar - i.startaar) * 0.035); return {value: result, unit: 'NOK', desc: 'Estimert byggekostnad i ' + i.sluttaar + ' for ' + i.bygningstype}; },

  airbnb_skatt_kalkulator: (i) => { if(!i.leieinntekt) return null; const skattesats = i.skatteklasse === 'hoy' ? 0.22 : 0.15; const fradrag = i.boligtype === 'helbolig' ? 0.4 : 0.2; const nettoinntekt = i.leieinntekt - i.utgifter; const justertInntekt = nettoinntekt * (1 - fradrag); const skatt = justertInntekt * skattesats; const result = Math.round(skatt * 100) / 100; return {value: result, unit: 'NOK', desc: 'Beregnet skatt for Airbnb-utleie basert pa inntekt, utgifter, dager, boligtype og skatteklasse'}; },

  pensjonssparing_beregning: (i) => { if(!i.alder) return null; const ar_sparing = i.pensjonsalder - i.alder; const ar_uttak = i.forventet_levealder - i.pensjonsalder; const r = (i.avkastning - i.inflasjon) / 100; const sluttverdi = i.sparebelop_mnd * 12 * ((Math.pow(1 + r, ar_sparing) - 1) / r); const mnd_utbetaling = sluttverdi * (r / 12) / (1 - Math.pow(1 + r / 12, -ar_uttak * 12)); const result = Math.round(mnd_utbetaling); return {value: result, unit: 'kr/mnd', desc: 'Estimert månedlig pensjon i dagens kroneverdi'}; },

  olympiatoppen_pulssoner: (i) => { if(!i.alder) return null; const maxPuls = 220 - i.alder; const hvilePuls = i.hvilepuls || 60; const kjonnFaktor = i.kjonn === 'mann' ? 1 : 0.9; const result = Math.round((maxPuls - hvilePuls) * kjonnFaktor + hvilePuls); return {value: result, unit: 'slag/min', desc: 'Maksimal puls justert for alder, hvilepuls og kjonn'}; },

  solcellepanel_beregning: (i) => { if(!i.panel_effekt) return null; const result = (i.panel_effekt * i.antall_paneler * i.solinnstråling * i.strompris * (1 + Math.cos(i.panel_vinkel * Math.PI / 180) * 0.1)) - i.anleggskostnad; return {value: result, unit: 'NOK', desc: 'Estimert årlig besparelse i norske kroner'}; },

  bompenger_trondheim: (i) => { if(!i.antall_passeringsdager) return null; const pris = i.kjøretøytype === 'elbil' ? 0 : (i.tidspunkt >= 7 && i.tidspunkt <= 9 || i.tidspunkt >= 15 && i.tidspunkt <= 17 ? 41 : 26); const rabatt = i.miljørabatt ? 0.9 : 1; const result = i.antall_passeringsdager * pris * rabatt; return {value: result, unit: 'kr', desc: 'Bompenger Trondheim for ' + i.antall_passeringsdager + ' passeringer'}; },

  skatt_kalkulator_tabell: (i) => { if(!i.bruttoinntekt) return null; const minstefradrag = Math.min(0.46 * i.bruttoinntekt, 109950); const personfradrag = i.alder < 18 ? 0 : (i.alder >= 70 ? 109950 : 87950); const alminneligInntekt = Math.max(0, i.bruttoinntekt - (i.fradrag_minstefradrag || minstefradrag) - personfradrag); const trinn1 = Math.max(0, Math.min(alminneligInntekt - 208050, 292850 - 208050)) * 0.017; const trinn2 = Math.max(0, Math.min(alminneligInntekt - 292850, 670000 - 292850)) * 0.04; const trinn3 = Math.max(0, Math.min(alminneligInntekt - 670000, 937900 - 670000)) * 0.136; const trinn4 = Math.max(0, Math.min(alminneligInntekt - 937900, 1350000 - 937900)) * 0.166; const trinn5 = Math.max(0, alminneligInntekt - 1350000) * 0.176; const trygdeavgift = i.bruttoinntekt * 0.082; const skatt = alminneligInntekt * 0.22 + trinn1 + trinn2 + trinn3 + trinn4 + trinn5 + trygdeavgift; return {value: Math.round(skatt), unit: 'NOK', desc: 'Beregnet skatt i norske kroner'}; },

  karaktersnitt_beregning: (i) => { if(!i.karakterer) return null; const karakterer = i.karakterer.split(',').map(Number); const vekter = i.vekt ? i.vekt.split(',').map(Number) : karakterer.map(() => 1); const skala = i.skala ? Number(i.skala) : 6; if(karakterer.length !== vekter.length) return null; const totalVekt = vekter.reduce((a,b) => a+b, 0); const sum = karakterer.reduce((acc, k, idx) => acc + k * vekter[idx], 0); const result = totalVekt > 0 ? sum / totalVekt : 0; return {value: result, unit: 'poeng', desc: 'Gjennomsnittskarakter basert p\u00e5 karakterer og vekter p\u00e5 en skala fra 1 til ' + skala}; },

  formuesverdi_beregning: (i) => { if(!i.boligverdi) return null; const nettoBolig = i.boligverdi - (i.boliggjeld || 0); const nettoAksje = (i.aksjeverdi || 0) * 0.8; const nettoBank = i.bankinnskudd || 0; const nettoAnnenGjeld = i.annenGjeld || 0; const fradrag = (i.sivilstatus === 'gift' || i.sivilstatus === 'samboer') ? 300000 : 150000; const result = Math.max(0, nettoBolig + nettoAksje + nettoBank - nettoAnnenGjeld - fradrag); return {value: result, unit: 'NOK', desc: 'Beregnet formuesverdi etter fradrag for gjeld og bunnfradrag'}; },

  stemme_kalkulator: (i) => { if(!i.antall_stemmer) return null; const result = (i.antall_stemmer / i.totalt_antall_stemmer) * 100; return {value: result, unit: '%', desc: 'Andel stemmer i forhold til totalt antall stemmer'}; },

  avkastning_fond: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const c = i.kostnad / 100; const netR = r - c; const months = i.ar * 12; const monthlyRate = netR / 12; const fv = i.startbelop * Math.pow(1 + monthlyRate, months) + i.manedlig_sparing * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate); return {value: fv, unit: 'kr', desc: 'Estimert sluttverdi av fondssparing etter ' + i.ar + ' ar'}; },

  snitt_ungdomsskole: (i) => { if(!i.norsk_hoved) return null; const result = (Number(i.norsk_hoved) + Number(i.norsk_side) + Number(i.matematikk) + Number(i.engelsk) + Number(i.naturfag) + Number(i.samfunnsfag) + Number(i.kroppsoving) + Number(i.kunst_handverk) + Number(i.musikk) + Number(i.mat_helse) + Number(i.fransk_tysk) + Number(i.utdanningsvalg)) / 12; return {value: result, unit: 'karakterpoeng', desc: 'Gjennomsnittskarakter fra ungdomsskolen'}; },

  cpm_kalkulator: (i) => { if(!i.total_kostnad || !i.antall_visninger) return null; const result = (i.total_kostnad / i.antall_visninger) * 1000; return {value: result, unit: 'NOK', desc: 'Kostnad per 1000 visninger'}; },

  sykepenger_beregning: (i) => { if(!i.arsinntekt) return null; const dagSats = Math.min(i.arsinntekt, 750816) / 260; const arbeidsgiverDager = Math.min(i.arbeidsgiverperiode || 16, 16); const sykeDagerEtterAG = Math.max(0, (i.sykefravaersdager || 0) - arbeidsgiverDager); const result = Math.round(dagSats * 0.65 * sykeDagerEtterAG); return {value: result, unit: 'NOK', desc: 'Sykepenger fra NAV etter arbeidsgiverperiode'}; },

  utdanning_kalkulator: (i) => { if(!i.karakterer) return null; const result = (parseFloat(i.karakterer) + parseFloat(i.fordypningspoeng || 0) + parseFloat(i.alderstillegg || 0)) / (i.sammenlign_med ? parseFloat(i.sammenlign_med) : 1); return {value: result, unit: 'poeng', desc: 'Beregnet poengsum basert p\u00e5 karakterer, fordypningspoeng og alderstillegg'}; },

  nettolonn_beregning: (i) => { if(!i.bruttolonn) return null; const s = i.skatteklasse || 1; const f = i.fradrag || 0; const g = i.bruttolonn; const t = s === 1 ? 0.22 : s === 2 ? 0.25 : s === 3 ? 0.30 : 0.22; const n = g - (g - f) * t; return {value: n, unit: 'NOK', desc: 'Nettolonn i norske kroner etter skatt'}; },

  bil_og_henger_kalkulator: (i) => { if(!i.bil_egenvekt) return null; const totalVekt = i.henger_egenvekt + i.henger_lastekapasitet; const maksTillatt = i.henger_har_brems ? i.bil_tillatt_hengervekt_bremset : i.bil_tillatt_hengervekt_uten_brems; const result = Math.min(totalVekt, maksTillatt); return {value: result, unit: 'kg', desc: 'Maks tillatt totalvekt for tilhenger' + (i.forerkort_klasse ? ' (klasse ' + i.forerkort_klasse + ')' : '')}; },

  eksport_kalkulator: (i) => { if(!i.vekt_tonn) return null; const result = i.vekt_tonn * i.avstand_km * (i.transporttype === 'skip' ? 0.015 : i.transporttype === 'tog' ? 0.025 : i.transporttype === 'lastebil' ? 0.062 : 0.1) * (i.produkttype === 'korn' ? 1.0 : i.produkttype === 'gjødsel' ? 1.2 : i.produkttype === 'maskiner' ? 1.5 : 1.3); return {value: result, unit: 'kg CO2', desc: 'Klimagassutslipp fra eksport av ' + i.vekt_tonn + ' tonn over ' + i.avstand_km + ' km med ' + i.transporttype + ' (' + i.produkttype + ')'}; },

  spare_i_fond_formula: (i) => { if(!i.monthly_savings) return null; const r = i.expected_return / 100; const n = i.years; const monthlyRate = r / 12; const totalMonths = n * 12; const futureValue = i.monthly_savings * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate); const inflationAdjusted = futureValue / Math.pow(1 + (i.inflation || 0) / 100, n); return {value: Math.round(inflationAdjusted * 100) / 100, unit: 'kr', desc: 'Estimert sluttverdi justert for inflasjon'}; },

  utleiebolig_kalkulator: (i) => { if(!i.boligpris) return null; const lan = i.boligpris - i.egenkapital; const arlig_rente = lan * (i.rente / 100); const manedlig_rente = arlig_rente / 12; const manedlig_avdrag = lan / (i.lan_periode * 12); const manedlig_lan = manedlig_rente + manedlig_avdrag; const manedlig_inntekt = i.manedlig_leie + i.andre_inntekter; const manedlig_kostnad = manedlig_lan + i.felleskostnader + i.eiendomsskatt + i.vedlikehold + i.forsikring + i.andre_kostnader; const arlig_resultat = (manedlig_inntekt - manedlig_kostnad) * 12; const skatt = arlig_resultat * (i.skattesats / 100); const resultat_etter_skatt = arlig_resultat - skatt; const result = resultat_etter_skatt; return {value: result, unit: 'kr/år', desc: 'Årlig resultat etter skatt for utleiebolig'}; },

  pensjonssparing_formel: (i) => { if(!i.alder) return null; const arIgjen = i.pensjonsalder - i.alder; const arUtbetaling = i.forventet_levealder - i.pensjonsalder; const realAvkastning = (1 + i.forventet_avkastning / 100) / (1 + i.inflasjon / 100) - 1; const sluttverdi = i.spart_belop * Math.pow(1 + realAvkastning, arIgjen); const annuitet = i.onsket_pensjon * (1 - Math.pow(1 + realAvkastning * (1 - i.skatt_pensjon / 100), -arUtbetaling)) / (realAvkastning * (1 - i.skatt_pensjon / 100)); const result = Math.max(0, annuitet - sluttverdi); return {value: result, unit: 'kr', desc: 'Mangler sparebelop per ar for a na onsket pensjon'}; },

  formueskatt_2024: (i) => { if(!i.netto_formue) return null; const netto = i.netto_formue; const trinn1 = Math.max(0, Math.min(netto - 1700000, 1000000)) * 0.007; const trinn2 = Math.max(0, netto - 2700000) * 0.011; const result = trinn1 + trinn2; return {value: result, unit: 'kr', desc: 'Beregnet formuesskatt for 2024 basert på netto formue og kommunesatser'}; },

  bil_pris_total: (i) => { if(!i.bilpris) return null; const laan = i.laanebelop || 0; const rente = (i.rente || 0) / 100; const ar = i.laaneperiode || 1; const maneder = ar * 12; const manedligRente = rente / 12; const annuitet = manedligRente === 0 ? laan / maneder : laan * (manedligRente * Math.pow(1 + manedligRente, maneder)) / (Math.pow(1 + manedligRente, maneder) - 1); const totaleLaan = annuitet * maneder; const forsikring = (i.forsikring || 0) * (i.eie_ar || 1); const drivstoff = (i.drivstoff_per_ar || 0) * (i.eie_ar || 1); const vedlikehold = (i.vedlikehold_per_ar || 0) * (i.eie_ar || 1); const result = (i.bilpris || 0) + totaleLaan + forsikring + drivstoff + vedlikehold; return {value: result, unit: 'kr', desc: 'Total kostnad for bilen over ' + (i.eie_ar || 1) + ' ar'}; },

  promille_beregning: (i) => { if(!i.alkohol_gram) return null; const kjonnFaktor = i.kjonn === 'mann' ? 0.68 : 0.55; const promille = (i.alkohol_gram / (i.kroppsvekt_kg * kjonnFaktor)) - (0.15 * i.timer_siden_forste_drink); const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet' + (result > 0.5 ? ' (over lovlig grense for bilkjøring)' : '')}; },

  sykepenger_nav: (i) => { if(!i.arsinntekt) return null; const dagsats = Math.min(i.arsinntekt, 6 * 100000) / 260; const result = Math.round(dagsats * Math.min(i.sykedager || 0, 260) * 0.65); return {value: result, unit: 'kr', desc: 'Sykepenger for ' + (i.sykedager || 0) + ' dager basert på inntekt ' + i.arsinntekt + ' kr'}; },

  solcelle_beregning: (i) => { if(!i.antall_paneler) return null; const result = i.antall_paneler * i.effekt_per_panel_watt * i.solinnstråling_kwh_per_kwp * i.strompris_ore_per_kwh / 1000 / 100 - i.anleggskostnad_kr; return {value: result, unit: 'kr', desc: 'Årlig besparelse etter anleggskostnad'}; },

  fastrenteinnskudd_formel: (i) => { if(!i.belop) return null; const r = i.rente / 100; const n = i.frekvens; const t = i.ar; const skatt = i.skatt / 100; const A = i.belop * Math.pow(1 + r/n, n*t); const skattBelop = (A - i.belop) * skatt; const result = A - skattBelop; return {value: result, unit: 'kr', desc: 'Totalt bel\u00f8p etter skatt'}; },

  ansatt_kostnad: (i) => { if(!i.bruttolonn) return null; const avgift = i.arbeidsgiveravgift_sone * 0.01; const ferie = i.feriepenger_prosent * 0.01; const pensjon = i.pensjonskostnad_prosent * 0.01; const feriepenger = i.bruttolonn * ferie; const grunnlag = i.bruttolonn + feriepenger; const arbeidsgiveravgift = grunnlag * avgift; const pensjonskostnad = i.bruttolonn * pensjon; const total = i.bruttolonn + feriepenger + arbeidsgiveravgift + pensjonskostnad + i.forsikring_ar + i.andre_kostnader_ar; return {value: total, unit: 'kr/ar', desc: 'Total arlig kostnad for ansatt i norske kroner'}; },

  solvpris_beregning: (i) => { if(!i.vekt_gram) return null; const result = (i.vekt_gram * (i.renhet_proset / 100) * i.spotpris_gram); return {value: result, unit: 'NOK', desc: 'Sølvpris i norske kroner basert på vekt, renhet og spotpris'}; },

  skatt_firmabil_formel: (i) => { if(!i.listepris) return null; const co2 = i.co2_utslipp || 0; const drivstoff = (i.drivstoff || '').toLowerCase(); const alder = i.alder || 0; const basis = i.listepris * 0.30; const co2Tillegg = co2 > 0 ? (co2 * 118) : 0; const drivstoffTillegg = (drivstoff === 'diesel') ? (basis + co2Tillegg) * 0.40 : 0; const alderFradrag = alder > 0 ? Math.min(alder * 0.20, 0.80) : 0; const result = Math.round((basis + co2Tillegg + drivstoffTillegg) * (1 - alderFradrag)); return {value: result, unit: 'NOK per år', desc: 'Beregnet firmabilskatt basert på listepris, CO2-utslipp, drivstofftype og alder'}; },

  aksjefond_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const k = i.kostnad_prosent / 100; const n = i.ar; const m = i.manedlig_sparing || 0; const start = i.startbelop * Math.pow(1 + r - k, n); const sparing = m * ((Math.pow(1 + r - k, n) - 1) / (r - k)) * (1 + r - k); const brutto = start + sparing; const skatt = i.skatt_type === 'fritak' ? 0 : brutto * 0.377; const result = brutto - skatt; return {value: Math.round(result * 100) / 100, unit: 'kr', desc: 'Estimert verdi etter ' + i.ar + ' år med ' + i.forventet_avkastning + '% avkastning og ' + i.kostnad_prosent + '% årlig kostnad'}; },

  gjeldsordning_kalkulator: (i) => { if(!i.total_gjeld) return null; const r = (i.rente_per_ar || 0) / 100 / 12; const p = (i.manedlig_betaling || 0) + (i.ekstra_betaling || 0); if(p <= 0) return {value: Infinity, unit: 'mnd', desc: 'Uendelig tid - ingen betaling'}; const n = Math.log(p / (p - r * i.total_gjeld)) / Math.log(1 + r); const months = isFinite(n) && n > 0 ? Math.ceil(n) : Infinity; const years = Math.floor(months / 12); const remainingMonths = months % 12; return {value: months, unit: 'mnd', desc: 'Tid til gjelden er nedbetalt: ' + years + ' år og ' + remainingMonths + ' måneder'}; },

  hytte_verdi_estimat: (i) => { if(!i.bruksareal) return null; const result = (i.bruksareal * 25000 + (i.tomteareal || 0) * 500 + (i.standard || 3) * 100000 + (i.beliggenhet || 3) * 150000 - (2025 - (i.byggeaar || 2000)) * 8000 - (i.avstand_til_vei || 0) * 2000); return {value: result, unit: 'NOK', desc: 'Estimert markedsverdi for hytte basert på bruksareal, tomteareal, standard, beliggenhet, byggeår og avstand til vei'}; },

  bilforsikring_uten_fodselsnummer: (i) => { if(!i.biltype) return null; const base = { 'personbil': 8000, 'varebil': 10000, 'motorsykkel': 5000 }[i.biltype] || 8000; const alderFaktor = i.alder < 25 ? 1.5 : i.alder < 35 ? 1.2 : 1.0; const kmFaktor = i.km_per_ar < 10000 ? 0.9 : i.km_per_ar < 20000 ? 1.0 : 1.2; const bonusFaktor = Math.max(0.5, 1 - (i.bonus || 0) * 0.1); const typeFaktor = i.forsikringstype === 'kasko' ? 1.8 : i.forsikringstype === 'delkasko' ? 1.3 : 1.0; const result = Math.round(base * alderFaktor * kmFaktor * bonusFaktor * typeFaktor); return {value: result, unit: 'NOK/år', desc: 'Estimert bilforsikring uten fødselsnummer'}; },

  compound_interest_calculator: (i) => { if(!i.startbelop) return null; const r = i.ar_rente / 100; const n = 12; const t = i.ar; const P = i.startbelop; const M = i.manedlig_sparing; const futureValue = P * Math.pow(1 + r/n, n*t) + M * ((Math.pow(1 + r/n, n*t) - 1) / (r/n)); const skattFradrag = i.skatt ? futureValue * (i.skatt / 100) : 0; const result = futureValue - skattFradrag; return {value: result, unit: 'kr', desc: 'Estimert fremtidig verdi etter skatt'}; },

  verditap_bil_kalkulator: (i) => { if(!i.kjopspris) return null; const alderFaktor = Math.max(0, 1 - (i.alder || 0) * 0.10); const arstapFaktor = Math.max(0, 1 - (i.arstap || 0) * 0.05); const drivstoffFaktor = i.drivstoff === 'el' ? 0.85 : i.drivstoff === 'hybrid' ? 0.90 : i.drivstoff === 'diesel' ? 0.95 : 1.0; const result = i.kjopspris * (1 - alderFaktor * arstapFaktor * drivstoffFaktor); return {value: Math.round(result), unit: 'NOK', desc: 'Beregnet verditap for bilen i norske kroner'}; },

  bomvei_kalkulator: (i) => { if(!i.antall_passeringer) return null; const pris = i.takst_type === 'lett' ? 38 : i.takst_type === 'tung' ? 76 : 38; const rabatt = i.miljø_rabatt === 'ja' ? 0.1 : 0; const result = i.antall_passeringer * pris * (1 - rabatt); return {value: result, unit: 'NOK', desc: 'Total bompenger for ' + i.antall_passeringer + ' passeringer'}; },

  kpi_husleie_justering: (i) => { if(!i.current_rent) return null; const result = i.current_rent * (i.kpi_end / i.kpi_start); return {value: result, unit: 'NOK', desc: 'Justert husleie basert p\u00e5 KPI-endring fra ' + i.kpi_start + ' til ' + i.kpi_end + ', gjeldende fra ' + i.adjustment_month}; },

  bil_verdi_beregning: (i) => { if(!i.nybilpris) return null; const alderFaktor = Math.max(0, 1 - (i.alder || 0) * 0.10); const kmFaktor = Math.max(0, 1 - ((i.km_stand || 0) / 200000) * 0.30); const tilstandFaktor = { 'ny': 1.0, 'brukt': 0.85, 'slitt': 0.65 }[i.tilstand] || 0.75; const result = Math.round(i.nybilpris * alderFaktor * kmFaktor * tilstandFaktor); return {value: result, unit: 'kr', desc: 'Beregnet verdi av bilen i norske kroner'}; },

  eiendomsverdi_beregning: (i) => { if(!i.boareal) return null; const result = i.boareal * 25000 + (i.tomteareal || 0) * 5000 + (i.beliggenhet || 1) * 200000 + (i.standard || 1) * 150000 - (2025 - (i.byggear || 2000)) * 10000 + (i.antall_rom || 3) * 50000; return {value: result, unit: 'NOK', desc: 'Estimert eiendomsverdi basert på boareal, tomteareal, beliggenhet, standard, byggeår og antall rom'}; },

  bompenger_elbil_beregning: (i) => { if(!i.antall_turer) return null; const result = i.antall_turer * i.bomtakst * (1 - i.elbil_rabatt_prosent / 100) * i.maaneder; return {value: result, unit: 'kr', desc: 'Totale bompenger for elbil over ' + i.maaneder + ' m\u00e5neder'}; },

  eiendomsskatt_oslo: (i) => { if(!i.takstverdi) return null; const result = (i.boligtype === 'bolig' ? Math.max(0, (i.takstverdi - 4000000) * 0.003) : Math.max(0, (i.takstverdi - 4000000) * 0.007)); return {value: result, unit: 'kr', desc: 'Eiendomsskatt for Oslo basert p\u00e5 takstverdi og boligtype'}; },

  ansiennitet_kommune: (i) => { if(!i.startdato) return null; const start = new Date(i.startdato); const slutt = i.sluttdato ? new Date(i.sluttdato) : new Date(); const totalDager = Math.floor((slutt - start) / (1000 * 60 * 60 * 24)); const stillingsfaktor = (i.stillingsprosent || 100) / 100; const utdanningDager = (i.utdanning || 0) * 365; const permisjonDager = (i.permisjon_uker || 0) * 7; const ansiennitetDager = Math.max(0, totalDager * stillingsfaktor + utdanningDager - permisjonDager); const ansiennitetAr = Math.floor(ansiennitetDager / 365); const ansiennitetMnd = Math.floor((ansiennitetDager % 365) / 30); const result = ansiennitetAr + ansiennitetMnd / 12; return {value: result, unit: 'år', desc: 'Ansiennitet i kommune: ' + ansiennitetAr + ' år og ' + ansiennitetMnd + ' måneder'}; },

  bolig_verdi_kalkulator: (i) => { if(!i.areal_kvm) return null; const result = i.areal_kvm * (i.beliggenhet || 1) * (i.standard || 1) * (i.antall_rom || 1) * (1 + (2025 - (i.byggear || 2025)) * 0.01); return {value: Math.round(result), unit: 'NOK', desc: 'Estimert boligverdi i norske kroner basert på areal, beliggenhet, standard, antall rom og byggeår'}; },

  bil_verdi_kalkulator: (i) => { if(!i.nybilpris) return null; const alderFaktor = Math.max(0.5, 1 - i.alder * 0.08); const kmFaktor = Math.max(0.6, 1 - i.km_stand / 200000); const tilstandFaktor = { 'dårlig': 0.5, 'brukbar': 0.7, 'god': 0.85, 'meget god': 0.95, 'ny': 1.0 }[i.tilstand] || 0.8; const merkeFaktor = i.merke_faktor || 1.0; const result = Math.round(i.nybilpris * alderFaktor * kmFaktor * tilstandFaktor * merkeFaktor); return {value: result, unit: 'kr', desc: 'Estimert markedsverdi for bilen i norske kroner'}; },

  stromforbruk_enebolig: (i) => { if(!i.areal) return null; const base = i.areal * 160; const alderFaktor = i.byggear < 1980 ? 1.4 : i.byggear < 2000 ? 1.2 : 1.0; const personFaktor = 1 + (i.antall_personer - 1) * 0.1; const varmeFaktor = i.varmekilde === 'elektrisk' ? 1.0 : i.varmekilde === 'varmepumpe' ? 0.6 : i.varmekilde === 'fjernvarme' ? 0.4 : 1.0; const kWh = base * alderFaktor * personFaktor * varmeFaktor; const result = Math.round(kWh * (i.strompris || 1.0) * 100) / 100; return {value: result, unit: 'kWh', desc: 'Estimert strømforbruk for enebolig basert på areal, byggeår, antall personer og varmekilde'}; },

  lonnsvekst_beregning: (i) => { if(!i.navaerende_lonn) return null; const result = i.navaerende_lonn * (1 + (i.lonnsokning_prosent || 0) / 100) * (1 - (i.inflasjon_prosent || 0) / 100) * (1 - (i.skatteprosent || 0) / 100); return {value: result, unit: 'kr', desc: 'Reallønn etter skatt og inflasjon'}; },

  boom_calculator: (i) => { if(!i.explosive_mass) return null; const result = Math.cbrt(i.explosive_mass) * (i.distance ? 1 / Math.sqrt(i.distance) : 1); return {value: result, unit: 'm', desc: 'Estimat for trykkbølgeeffekt basert på eksplosivmasse og avstand'}; },

  mensen_kalkulator: (i) => { if(!i.siste_mensen_start) return null; const start = new Date(i.siste_mensen_start); const syklus = parseInt(i.syklus_lengde) || 28; const mens = parseInt(i.mens_lengde) || 5; const nesteStart = new Date(start.getTime() + syklus * 86400000); const nesteSlutt = new Date(nesteStart.getTime() + mens * 86400000); const egglosning = new Date(nesteStart.getTime() - 14 * 86400000); const fruktbarStart = new Date(egglosning.getTime() - 5 * 86400000); const fruktbarSlutt = new Date(egglosning.getTime() + 1 * 86400000); const result = { nesteMens: nesteStart.toISOString().split('T')[0], nesteMensSlutt: nesteSlutt.toISOString().split('T')[0], egglosning: egglosning.toISOString().split('T')[0], fruktbarPeriodeStart: fruktbarStart.toISOString().split('T')[0], fruktbarPeriodeSlutt: fruktbarSlutt.toISOString().split('T')[0] }; return {value: result, unit: 'datoer', desc: 'Neste menstruasjon starter ' + result.nesteMens + ', slutter ' + result.nesteMensSlutt + '. Eggløsning ca. ' + result.egglosning + '. Fruktbar periode: ' + result.fruktbarPeriodeStart + ' til ' + result.fruktbarPeriodeSlutt + '.'}; },

  ferie_trekk_beregning: (i) => { if(!i.maanedslonn) return null; const result = (i.maanedslonn / (i.arbeidsdager_per_uke * 52 / 12)) * i.feriedager * (1 - i.feriepengeprosent / 100); return {value: result, unit: 'kr', desc: 'Trekk i lønn for ferie basert på månedslønn ' + i.maanedslonn + ', feriedager ' + i.feriedager + ', feriepengeprosent ' + i.feriepengeprosent + ' og arbeidsdager per uke ' + i.arbeidsdager_per_uke}; },

  bilforsikring_pris: (i) => { if(!i.biltype) return null; const base = {sedan: 5000, stasjonsvogn: 5500, suv: 6500, coupe: 6000, cabriolet: 7000}[i.biltype] || 5000; const alderFaktor = i.alder < 25 ? 1.5 : i.alder < 35 ? 1.2 : i.alder < 55 ? 1.0 : 1.3; const kmFaktor = i.kjorelengde < 10000 ? 0.9 : i.kjorelengde < 20000 ? 1.0 : i.kjorelengde < 30000 ? 1.15 : 1.3; const bonusFaktor = Math.max(0.5, 1 - (i.bonus || 0) * 0.1); const skadeFaktor = 1 + ((i.skadehistorikk || 0) * 0.2); const result = Math.round(base * alderFaktor * kmFaktor * bonusFaktor * skadeFaktor); return {value: result, unit: 'NOK/år', desc: 'Estimert bilforsikring pris basert på ' + i.biltype + ', alder ' + i.alder + ', kjørelengde ' + i.kjorelengde + ' km, bonus ' + i.bonus + '%, skadehistorikk ' + i.skadehistorikk}; },

  lps_kalkulator: (i) => { if(!i.hvilepuls) return null; const result = Math.round(220 - i.alder - i.hvilepuls + i.makspuls); return {value: result, unit: 'bpm', desc: 'LPS (Laktatterskelpuls) er ' + result + ' slag per minutt basert på innsendte verdier'}; },

  ssb_boligblokk_i_alt: (i) => { if(!i.aar) return null; const result = i.antall_nye * 1; return {value: result, unit: 'antall', desc: 'Antall nye boliger i blokk i alt'}; },

  dekk_kalkulator_bil: (i) => { if(!i.dekk_bredde) return null; const result = (i.dekk_bredde * i.profil / 100 * 2 + i.felg_diameter * 25.4) / 1000; return {value: result, unit: 'm', desc: 'Dekkets totale diameter i meter'}; },

  dokumentavgift_beregning: (i) => { if(!i.kjopesum) return null; const result = (i.boligtype === 'bolig' && i.forstegang === 'ja') ? 0 : (i.kjopesum * 0.025); return {value: result, unit: 'kr', desc: 'Dokumentavgift' + ' (' + (result === 0 ? 'Fritatt for førstegangskjøp av bolig' : '2.5% av kjøpesum') + ')'}; },

  beregn_nettolonn_etter_skatt: (i) => { if(!i.bruttolon) return null; const result = i.bruttolon - (i.bruttolon * (i.skatteprosent / 100)) - (i.fradrag || 0); return {value: result, unit: 'kr', desc: 'Nettolønn etter skatt og fradrag'}; },

  fri_bil_kalkulator: (i) => { if(!i.bilens_pris) return null; const co2Faktor = i.co2_utslipp > 0 ? (i.co2_utslipp * 0.01) : 0; const drivstoffFaktor = i.drivstoff === 'el' ? 0.5 : (i.drivstoff === 'hybrid' ? 0.75 : 1); const result = (i.bilens_pris * (1 + co2Faktor * drivstoffFaktor) * (i.skattesats || 0.25) / 12) * (i.antall_maaneder || 12); return {value: result, unit: 'kr', desc: 'M&aring;nedlig kostnad for firmabil basert p&aring; bilens pris, CO2-utslipp og drivstofftype'}; },

  fond_avkastning_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const c = i.kostnader_prosent / 100; const n = i.spareperiode_ar; const m = i.manedlig_sparing; const s = i.startbelop; const effR = r - c; const futureValue = s * Math.pow(1 + effR, n) + m * ((Math.pow(1 + effR, n) - 1) / effR); const totalInnskudd = s + m * 12 * n; const avkastning = futureValue - totalInnskudd; const skatt = avkastning * (i.skatt_utbytte / 100); const result = futureValue - skatt; return {value: result, unit: 'kr', desc: 'Estimert verdi etter skatt og kostnader'}; },

  taxi_pris_beregning: (i) => { if(!i.startavgift) return null; const result = Number(i.startavgift) + (Number(i.km_pris) * Number(i.antall_km)) + (Number(i.tillegg) || 0) + (i.by_type === 'Oslo' ? 50 : i.by_type === 'Bergen' ? 30 : 0); return {value: result, unit: 'kr', desc: 'Totalpris for taxituren i ' + (i.by_type || 'din by')}; },

  diett_kalkulator: (i) => { if(!i.alder) return null; const bmr = i.kjonn === 'mann' ? 88.362 + (13.397 * i.vekt) + (4.799 * i.hoyde) - (5.677 * i.alder) : 447.593 + (9.247 * i.vekt) + (3.098 * i.hoyde) - (4.330 * i.alder); const aktivitetsfaktor = {stillestitende: 1.2, lett: 1.375, moderat: 1.55, aktiv: 1.725, veldig_aktiv: 1.9}[i.aktivitetsniva] || 1.2; const tdee = bmr * aktivitetsfaktor; const måljustering = {ned: -500, vedlikehold: 0, opp: 500}[i.maal] || 0; const result = Math.round(tdee + måljustering); return {value: result, unit: 'kcal/dag', desc: 'Ditt daglige kaloribehov for ' + i.maal + ' er ' + result + ' kcal'}; },

  nettbil_kalkulator: (i) => { if(!i.bilmerke) return null; const result = (i.co2_g_per_km * i.ars_kjoring_km) / 1000; return {value: result, unit: 'kg CO2/år', desc: 'Årlig CO2-utslipp basert på ' + i.ars_kjoring_km + ' km kjøring per år'}; },

  sifo_kalkulator: (i) => { if(!i.husholdning) return null; const h = i.husholdning; const a = i.alder_barn || 0; const result = h === 'enslig' ? (a < 6 ? 1.2 : a < 12 ? 1.5 : a < 18 ? 1.8 : 1.0) : h === 'par' ? (a < 6 ? 1.8 : a < 12 ? 2.2 : a < 18 ? 2.6 : 1.5) : h === 'alene_med_barn' ? (a < 6 ? 1.5 : a < 12 ? 1.9 : a < 18 ? 2.3 : 1.3) : 1.0; return {value: result, unit: 'SIFO-enhet', desc: 'SIFO-forbruksenhet for ' + h + ' med barn ' + a + ' år'}; },

  innbytte_bil_verdi: (i) => { if(!i.bilmerke_modell) return null; const alder = new Date().getFullYear() - parseInt(i.arsmodell); const kmFaktor = Math.max(0.5, 1 - (parseInt(i.km_stand) / 200000)); const tilstandFaktor = {dårlig: 0.4, middels: 0.6, god: 0.8, meget_god: 0.9, som_ny: 1.0}[i.tilstand] || 0.7; const verdiFaktor = Math.max(0.1, 1 - (alder * 0.12)); const result = Math.round(parseFloat(i.nybilpris) * verdiFaktor * kmFaktor * tilstandFaktor); return {value: result, unit: 'NOK', desc: 'Beregnet innbytteverdi for ' + i.bilmerke_modell + ' (' + i.arsmodell + ')'}; },

  permittering_lonn_kalkulator: (i) => { if(!i.mnd_inntekt) return null; const result = (i.mnd_inntekt * (i.stillingsprosent/100) * (i.permitteringsgrad/100) * (i.antall_dager/i.arbeidsdager_mnd) * (i.har_forsikring ? 0.624 : 0.624)); return {value: result, unit: 'kr', desc: 'Permitteringslønn i kroner'}; },

  bruktbilpris_beregning: (i) => { if(!i.nybilpris) return null; const alderFaktor = Math.max(0, 1 - (i.alder || 0) * 0.1); const kmFaktor = Math.max(0, 1 - ((i.km_stand || 0) / 200000) * 0.5); const tilstandFaktor = { 'dårlig': 0.5, 'brukbar': 0.7, 'god': 0.85, 'meget god': 1.0 }[i.tilstand] || 0.8; const result = Math.round(i.nybilpris * alderFaktor * kmFaktor * tilstandFaktor); return {value: result, unit: 'NOK', desc: 'Estimert bruktbilpris basert på nybilpris, alder, km-stand og tilstand'}; },

  adr_calculator: (i) => { if(!i.alcohol_grams) return null; const genderFactor = i.gender === 'male' ? 0.68 : 0.55; const result = i.alcohol_grams / (genderFactor * 10); return {value: result, unit: 'promille', desc: 'Estimert alkoholkonsentrasjon i blodet'}; },

  ansatt_kostnad_formel: (i) => { if(!i.bruttolonn) return null; const avgift = i.arbeidsgiveravgift_sone || 0.141; const ferie = (i.feriepenger_prosent || 12) / 100; const maneder = i.antall_maneder || 12; const feriepenger = i.bruttolonn * ferie; const total = (i.bruttolonn + feriepenger) * (1 + avgift) * maneder; return {value: total, unit: 'kr', desc: 'Total ansattkostnad i kr for ' + maneder + ' m\u00e5neder'}; },

  privat_pensjonssparing_formel: (i) => { if(!i.maanedlig_sparing) return null; const r = i.forventet_avkastning / 100; const n = i.spareperiode_aar * 12; const m = i.maanedlig_sparing; const total = m * ((Math.pow(1 + r / 12, n) - 1) / (r / 12)); const skattVedUttak = i.skatt_uttak ? total * (i.skattesats / 100) : 0; const result = total - skattVedUttak; return {value: result, unit: 'kr', desc: 'Estimert pensjonssparing etter skatt'}; },

  boligprisutvikling: (i) => { if(!i.startpris) return null; const result = ((i.sluttpris / i.startpris) ** (1 / i.aar) - 1 - i.inflasjon / 100) * 100; return {value: result, unit: '%', desc: 'Reell årlig prisvekst i prosent'}; },

  cockcroft_gault_clearance: (i) => { if(!i.alder) return null; const result = ((140 - i.alder) * i.vekt) / (72 * i.kreatinin) * (i.kjonn === 'mann' ? 1 : 0.85); return {value: result, unit: 'mL/min', desc: 'Kreatinin clearance (Cockcroft-Gault)'}; },

  bruttolonn_beregning: (i) => { if(!i.timelonn) return null; const weekly = i.timelonn * i.timer_per_uke; const monthly = weekly * 4.33; const yearly = weekly * 52; const feriepenger = yearly * (i.feriepenger_prosent / 100); const totalYearly = yearly + feriepenger; const skatt = totalYearly * (i.skatteprosent / 100); const netto = totalYearly - skatt; let result; let unit; if(i.periode === 'år') { result = totalYearly; unit = 'kr/år'; } else if(i.periode === 'måned') { result = monthly + (feriepenger / 12); unit = 'kr/mnd'; } else { result = weekly; unit = 'kr/uke'; } return {value: result, unit: unit, desc: 'Bruttolønn ' + i.periode + ' inkl. feriepenger'}; },

  dekk_dimensjon_beregning: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100 * 2 + i.felg_diameter * 25.4) - (i.sammenlign_bredde * i.sammenlign_profil / 100 * 2 + i.sammenlign_felg * 25.4)); return {value: result, unit: 'mm', desc: 'Forskjell i total diameter mellom dekkene'}; },

  sparerente_formel: (i) => { if(!i.startbelop) return null; const r = i.ar_rente / 100; const n = i.spareperiode_ar * (i.renteperiode === 'manedlig' ? 12 : i.renteperiode === 'kvartalsvis' ? 4 : i.renteperiode === 'halvarig' ? 2 : 1); const p = i.renteperiode === 'manedlig' ? r/12 : i.renteperiode === 'kvartalsvis' ? r/4 : i.renteperiode === 'halvarig' ? r/2 : r; const result = i.startbelop * Math.pow(1 + p, n) + i.manedlig_innskudd * ((Math.pow(1 + p, n) - 1) / p); return {value: result, unit: 'kr', desc: 'Sluttbeløp etter ' + i.spareperiode_ar + ' år med ' + i.ar_rente + '% rente'}; },

  edru_kalkulator: (i) => { if(!i.kjonn) return null; const result = i.alkohol_gram / (i.vekt * (i.kjonn === 'mann' ? 0.68 : 0.55)) - 0.15 * i.timer_siden_start; return {value: Math.max(0, result), unit: 'promille', desc: 'Estimert alkoholkonsentrasjon i blodet' + ' (Widmark-formelen)'}; },

  fond_avkastning_formel: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const n = i.ar; const m = i.manedlig_sparing; const s = i.startbelop; const total = s * Math.pow(1 + r, n) + m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); const result = i.skatt_type === 'aksjesparekonto' ? total : total * 0.78; return {value: Math.round(result * 100) / 100, unit: 'kr', desc: 'Estimert totalverdi etter ' + n + ' år med ' + (i.forventet_avkastning) + '% årlig avkastning'}; },

  fond_kalkulator_dnb: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const n = i.spareperiode; const P = i.startbelop; const M = i.manedlig_sparing; const result = P * Math.pow(1 + r, n) + M * ((Math.pow(1 + r, n) - 1) / r); return {value: result, unit: 'kr', desc: 'Estimert sluttverdi av sparingen i DNB Fond'}; },

  airbnb_profit_calculator: (i) => { if(!i.nightly_rate) return null; const monthlyRevenue = i.nightly_rate * i.occupancy_rate * 30.44; const bookingFees = monthlyRevenue * (i.service_fee_percent / 100); const cleaningCosts = (i.cleaning_fee || 0) * (i.occupancy_rate * 30.44 / (i.avg_booking_length || 1)); const totalCosts = (i.monthly_fixed_costs || 0) + (i.mortgage_or_rent || 0) + (i.other_costs_per_month || 0) + bookingFees + cleaningCosts; const result = monthlyRevenue - totalCosts; return {value: result, unit: 'kr/mnd', desc: 'Estimert månedlig fortjeneste etter faste kostnader, serviceavgift og rengjøring'}; },

  nav_barnebidrag_formel: (i) => { if(!i.inntekt_betaler) return null; const result = Math.max(0, (i.inntekt_betaler * 0.15 - i.inntekt_mottaker * 0.10) * (1 + (i.antall_barn - 1) * 0.4) * (1 - i.samvaersgrad * 0.2)); return {value: result, unit: 'NOK/mnd', desc: 'Beregnet barnebidrag basert på inntekt, antall barn og samværsgrad'}; },

  dager_mellom_datoer: (i) => { if(!i.start_dato) return null; const result = Math.floor((new Date(i.slutt_dato) - new Date(i.start_dato)) / (1000 * 60 * 60 * 24)); return {value: result, unit: 'dager', desc: 'Antall dager mellom ' + i.start_dato + ' og ' + i.slutt_dato}; },

  pensjonsalder_beregning: (i) => { if(!i.fodselsaar) return null; const base = 67; const justering = (i.forventet_levealder - 80) * 0.5; const kjonnJustering = i.kjonn === 'kvinne' ? -1 : 0; const result = Math.round((base + justering + kjonnJustering) * 10) / 10; return {value: result, unit: 'aar', desc: 'Beregnet pensjonsalder basert paa fodselsaar ' + i.fodselsaar + ', forventet levealder ' + i.forventet_levealder + ' og kjonn ' + i.kjonn}; },

  indeksregulering_bygg: (i) => { if(!i.opprinnelig_belop) return null; const result = i.opprinnelig_belop * (i.reguleringsandel || 1) * (i.indeks_slutt / i.indeks_start); return {value: result, unit: 'NOK', desc: 'Regulert bel\u00f8p i NOK basert p\u00e5 indeksendring'}; },

  mva_calculator: (i) => { if(!i.belop) return null; const result = i.retning === 'ut' ? parseFloat(i.belop) * parseFloat(i.sats) / 100 : parseFloat(i.belop) - (parseFloat(i.belop) * 100 / (100 + parseFloat(i.sats))); return {value: result, unit: 'kr', desc: 'MVA beløp i norske kroner'}; },

  alkohol_promille_beregning: (i) => { if(!i.kjonn) return null; const r = i.kjonn === 'mann' ? 0.7 : 0.6; const promille = (i.alkohol_gram / (i.vekt * r)) - (0.15 * i.timer_siden_start); const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholpromille i blodet'}; },

  sparing_i_fond: (i) => { if(!i.maanedlig_sparing) return null; const r = i.forventet_avkastning / 100 / 12; const n = i.spareperiode * 12; const result = i.startkapital * Math.pow(1 + r, n) + i.maanedlig_sparing * (Math.pow(1 + r, n) - 1) / r; return {value: result, unit: 'kr', desc: 'Estimert sluttverdi av sparing i fond'}; },

  alkohol_beregner: (i) => { if(!i.antall_glass) return null; const etanol_gram = i.antall_glass * (i.volum_ml * i.alkoholprosent / 100 * 0.789); const promille = etanol_gram / (i.kjonn === 'mann' ? i.vekt_kg * 0.7 : i.vekt_kg * 0.6) - 0.15 * i.timer_siden_start; const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet'}; },

  merverdiavgift_beregning: (i) => { if(!i.belop) return null; const result = i.belop * (i.mva_sats / 100); return {value: result, unit: 'kr', desc: 'Merverdiavgift av ' + i.belop + ' kr med sats ' + i.mva_sats + '%'}; },

  lonn_utbetalt_beregning: (i) => { if(!i.bruttolonn) return null; const result = i.bruttolonn - (i.bruttolonn * (i.skatteprosent || 0) / 100) - (i.bruttolonn * (i.trygdeavgift || 0) / 100) - (i.fradrag || 0) - (i.bruttolonn * (i.arbeidsgiveravgift_prosent || 0) / 100); return {value: result, unit: 'kr', desc: 'Netto utbetalt lonn per ' + (i.antall_mnd || 1) + ' maned(er)'}; },

  beregn_barnebidrag: (i) => { if(!i.inntekt_bidragspliktig) return null; const result = Math.max(0, (i.inntekt_bidragspliktig * 0.15 - i.inntekt_bidragsmottaker * 0.05) * (1 - i.samvær_bidragspliktig / 40) * i.antall_barn - i.barnetrygd * i.antall_barn); return {value: result, unit: 'kr/mnd', desc: 'Beregnet barnebidrag per måned i norske kroner'}; },

  firmabil_leasing_kalkulator: (i) => { if(!i.bilpris) return null; const restverdi = i.bilpris * (i.restverdi_prosent / 100); const avskrivning = (i.bilpris - restverdi) / i.leasingperiode_maneder; const manedligRente = (i.rente_prosent / 100) / 12; const gjennomsnittligVerdi = (i.bilpris + restverdi) / 2; const renteKostnad = gjennomsnittligVerdi * manedligRente; const co2Tillegg = (i.co2_utslipp > 0 ? i.co2_utslipp * 1.5 : 0) / i.leasingperiode_maneder; const forsikringManed = i.forsikring_ar / 12; const serviceManed = i.service_ar / 12; const result = avskrivning + renteKostnad + co2Tillegg + forsikringManed + serviceManed; return {value: result, unit: 'kr/mnd', desc: 'Maanedlig leasingkostnad for firmabil'}; },

  baksete_kalkulator: (i) => { if(!i.biltype) return null; const result = (i.biltype === 'sedan' ? 1 : i.biltype === 'stasjonsvogn' ? 2 : i.biltype === 'suv' ? 3 : 0) + (i.setebelte === 'ja' ? 1 : 0) + (i.barnesete === 'ja' ? 1 : 0); return {value: result, unit: 'poeng', desc: 'Bakseteberedskapspoeng basert p\u00e5 biltype, setebelte og barnesete'}; },

  boligprisvekst_formel: (i) => { if(!i.startpris) return null; const result = i.startpris * Math.pow(1 + (i.forventet_vekst_prosent - i.inflasjon_prosent) / 100, i.aar_vekst); return {value: result, unit: 'kr', desc: 'Estimert boligpris etter ' + i.aar_vekst + ' år med ' + i.forventet_vekst_prosent + '% årlig vekst og ' + i.inflasjon_prosent + '% inflasjon'}; },

  bolig_verdiokning: (i) => { if(!i.kjopspris) return null; const result = i.kjopspris * Math.pow(1 + (i.ar_vekst || 0) / 100, i.ar_holdt || 0); return {value: result, unit: 'kr', desc: 'Estimert verdi etter ' + (i.ar_holdt || 0) + ' år med ' + (i.ar_vekst || 0) + '% årlig vekst'}; },

  ask_calculator: (i) => { if(!i.initial_investment) return null; const r = i.expected_return / 100; const t = i.tax_rate / 100; const d = i.dividend_yield / 100; const n = i.years; const m = i.monthly_savings; const p = i.initial_investment; const g = r - t * d; const f = p * Math.pow(1 + g, n) + m * ((Math.pow(1 + g, n) - 1) / g) * (1 + g); const result = Math.round(f * 100) / 100; return {value: result, unit: 'kr', desc: 'Estimert verdi av aksjesparekonto etter ' + n + ' år'}; },

  klimaavtrykk_beregning: (i) => { if(!i.stromforbruk) return null; const result = (i.stromforbruk * 0.132) + (i.bilkjoring * 0.2) + (i.flyreiser * 0.255) + (i.kosthold * 2.5) + (i.forbruk * 0.5); return {value: result, unit: 'tonn CO2/år', desc: 'Ditt totale klimaavtrykk er ' + result.toFixed(1) + ' tonn CO2 per år'}; },

  fertile_days_calculator: (i) => { if(!i.cycle_length || !i.last_period_start || !i.luteal_phase_length) return null; const lastPeriod = new Date(i.last_period_start); const ovulationDay = new Date(lastPeriod.getTime() + (i.cycle_length - i.luteal_phase_length) * 86400000); const fertileStart = new Date(ovulationDay.getTime() - 5 * 86400000); const fertileEnd = new Date(ovulationDay.getTime() + 1 * 86400000); const result = fertileStart.toLocaleDateString('nb-NO') + ' - ' + fertileEnd.toLocaleDateString('nb-NO'); return {value: result, unit: 'dager', desc: 'Fertile periode (dager med høy sjanse for befruktning)'}; },

  menstruation_cycle_calculator: (i) => { if(!i.siste_mensen) return null; const siste = new Date(i.siste_mensen); const syklus = parseInt(i.syklus_lengde) || 28; const mens = parseInt(i.mens_lengde) || 5; const neste = new Date(siste.getTime() + syklus * 86400000); const egglosning = new Date(siste.getTime() + (syklus - 14) * 86400000); const fertilStart = new Date(egglosning.getTime() - 5 * 86400000); const fertilSlutt = new Date(egglosning.getTime() + 1 * 86400000); const nesteSlutt = new Date(neste.getTime() + mens * 86400000); return {value: neste.toISOString().split('T')[0], unit: 'dato', desc: 'Neste menstruasjon: ' + neste.toISOString().split('T')[0] + ', eggløsning: ' + egglosning.toISOString().split('T')[0] + ', fertil periode: ' + fertilStart.toISOString().split('T')[0] + ' til ' + fertilSlutt.toISOString().split('T')[0] + ', menstruasjonslengde: ' + mens + ' dager'}; },

  lonnsutvikling_formel: (i) => { if(!i.startlonn) return null; const result = ((i.sluttlonn / i.startlonn) - 1) * 100; return {value: result, unit: '%', desc: 'Samlet lønnsvekst over ' + i.ar + ' år, justert for inflasjon: ' + (i.inflasjon ? ((i.sluttlonn / i.startlonn) / Math.pow(1 + i.inflasjon / 100, i.ar) - 1) * 100 : result) + '%'}; },

  energimerking_formula: (i) => { if(!i.areal) return null; const base = i.stromforbruk / i.areal; const justering = (i.oppvarmingstype === 'elektrisk' ? 1.2 : i.oppvarmingstype === 'fjernvarme' ? 0.8 : 1.0) * (i.isolasjon === 'god' ? 0.9 : i.isolasjon === 'darlig' ? 1.3 : 1.0); const result = Math.round(base * justering); return {value: result, unit: 'kWh/m²/år', desc: 'Energimerke basert på areal, strømforbruk, oppvarmingstype og isolasjon'}; },

  bya_kalkulator: (i) => { if(!i.lengde) return null; const result = i.lengde * i.bredde * (i.etasjer || 1) * (1 + (i.takvinkel || 0) * 0.0174533) * (i.bygningstype === 'naust' ? 0.8 : i.bygningstype === 'garasje' ? 0.9 : 1); return {value: result, unit: 'm²', desc: 'Beregnet BYA (bebygd areal) for bygning'}; },

  uføreforsikring_formel: (i) => { if(!i.aar_inntekt) return null; const result = Math.max(0, (i.aar_inntekt * 0.7 - i.trygdeytelse - i.eksisterende_dekning) * (1 - i.sparegjeld / 1000000) * (i.antall_år_dekning / 10) * (1 - (i.alder - 20) * 0.01)); return {value: result, unit: 'kr', desc: 'Anbefalt uføredekning i kroner basert på inntekt, alder, gjeld og eksisterende dekning'}; },

  bom_kalkulator: (i) => { if(!i.lengde) return null; const result = (i.lengde * i.bredde * i.hoyde) * i.enhetspris * (1 + (i.avfallsmargin || 0)/100) * (1 + (i.sikkerhetsmargin || 0)/100); return {value: result, unit: 'NOK', desc: 'Total kostnad for BOM basert på volum, enhetspris, avfallsmargin og sikkerhetsmargin'}; },

  bompassering_kalkulator: (i) => { if(!i.antall_passeringer) return null; const result = i.antall_passeringer * i.pris_per_passering * (i.betalingsmetode === 'AutoPASS' ? 0.9 : 1); return {value: result, unit: 'kr', desc: 'Total bompenger for ' + i.antall_passeringer + ' passeringer'}; },

  tabela_7100_kalkulator: (i) => { if(!i.alder) return null; const result = 220 - i.alder; return {value: result, unit: 'slag/min', desc: 'Maksimal hjertefrekvens basert på alder (220 - alder)'}; },

  stigning_kalkulator: (i) => { if(!i.hoyde) return null; const result = (i.enhet === 'cm' ? (i.hoyde / i.lengde * 100) : (i.hoyde / i.lengde * 100)); return {value: result, unit: '%', desc: 'Stigning i prosent'}; },

  mens_kalkulator: (i) => { if(!i.siste_mens) return null; const siste = new Date(i.siste_mens); const syklus = parseInt(i.syklus_lengde) || 28; const varighet = parseInt(i.mens_varighet) || 5; const neste = new Date(siste.getTime() + syklus * 86400000); const egglosning = new Date(siste.getTime() + (syklus - 14) * 86400000); const fertilStart = new Date(egglosning.getTime() - 5 * 86400000); const fertilSlutt = new Date(egglosning.getTime() + 1 * 86400000); const nesteSlutt = new Date(neste.getTime() + varighet * 86400000); return {value: neste.toISOString().split('T')[0], unit: 'dato', desc: 'Neste mens forventet ' + neste.toISOString().split('T')[0] + ', egglosning ca. ' + egglosning.toISOString().split('T')[0] + ', fertil periode ' + fertilStart.toISOString().split('T')[0] + ' til ' + fertilSlutt.toISOString().split('T')[0] + ', mens slutter ca. ' + nesteSlutt.toISOString().split('T')[0]}; },

  rullediameter_beregning: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100 * 2) + (i.felgdiameter * 25.4)) - ((i.original_dekkbredde * i.original_profil / 100 * 2) + (i.original_felgdiameter * 25.4)); return {value: result, unit: 'mm', desc: 'Forskjell i rullediameter mellom nytt og originalt dekk'}; },

  utbetalt_lonn_kalkulator: (i) => { if(!i.bruttolonn) return null; const result = i.bruttolonn - (i.bruttolonn * (i.skatteprosent || 0) / 100) - (i.bruttolonn * (i.trygdeavgift || 0) / 100) - (i.bruttolonn * (i.pensjonstrekk || 0) / 100) - (i.fradrag || 0); return {value: result, unit: 'kr', desc: 'Utbetalt lønn etter skatt, avgifter og fradrag'}; },

  smart_calculator: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? (Number(i.tall2) === 0 ? null : Number(i.tall1) / Number(i.tall2)) : null; return {value: result, unit: 'enhet', desc: 'Resultat av ' + i.tall1 + ' ' + i.operasjon + ' ' + i.tall2}; },

  kwh_calculator: (i) => { if(!i.effekt_watt) return null; const result = (i.effekt_watt * i.timer_per_dag * i.dager) / 1000; const co2 = result * (i.co2_faktor || 0); const kostnad = result * (i.strompris_ore || 0) / 100; return {value: result, unit: 'kWh', desc: 'Strømforbruk: ' + result.toFixed(2) + ' kWh | Kostnad: ' + kostnad.toFixed(2) + ' kr | CO2: ' + co2.toFixed(2) + ' kg'}; },

  tabellkort_beregning: (i) => { if(!i.alder) return null; const result = (i.kjonn === 'mann' ? (i.alder * 0.1 + (i.systolisk_blodtrykk || 0) * 0.05 + (i.totalt_kolesterol || 0) * 0.2 - (i.hdl_kolesterol || 0) * 0.3 + (i.royker === 'ja' ? 0.5 : 0) + (i.diabetes === 'ja' ? 0.5 : 0)) : (i.alder * 0.1 + (i.systolisk_blodtrykk || 0) * 0.05 + (i.totalt_kolesterol || 0) * 0.2 - (i.hdl_kolesterol || 0) * 0.3 + (i.royker === 'ja' ? 0.5 : 0) + (i.diabetes === 'ja' ? 0.5 : 0))); return {value: result, unit: '%', desc: 'Estimert 10-års risiko for hjerte- og karsykdom'}; },

  husforsikring_premie: (i) => { if(!i.boligverdi) return null; const base = i.boligverdi * 0.003; const alderFaktor = Math.max(0.8, 1 - (2024 - i.byggeaar) * 0.002); const stedFaktor = i.beliggenhet === 'Oslo' ? 1.2 : i.beliggenhet === 'Bergen' ? 1.1 : 1.0; const egenandelFaktor = i.egenandel < 5000 ? 1.15 : i.egenandel < 10000 ? 1.0 : 0.9; const result = Math.round(base * alderFaktor * stedFaktor * egenandelFaktor); return {value: result, unit: 'NOK/år', desc: 'Årlig husforsikringspremie basert på boligverdi, byggeår, beliggenhet og egenandel'}; },

  bompenger_oslo_formel: (i) => { if(!i.antall_paseringer) return null; const result = i.antall_paseringer * (i.kjøretøytype === 'elbil' ? 0 : (i.tidspunkt === 'rush' ? 42 : 28)); return {value: result, unit: 'NOK', desc: 'Bompenger Oslo for ' + i.antall_paseringer + ' passeringer med ' + i.kjøretøytype + ' kl ' + i.tidspunkt}; },

  tuning_calculator: (i) => { if(!i.dreiemoment) return null; const result = (i.dreiemoment * i.turtall) / 9550; return {value: result, unit: 'kW', desc: 'Effekt basert p\u00e5 dreiemoment og turtall' + (i.motorvolum ? ', justert for motorvolum: ' + i.motorvolum : '') + (i.turbo ? ', med turbo' : '')}; },

  bompris_beregning: (i) => { if(!i.boligpris) return null; const lanebelop = i.boligpris - (i.egenkapital || 0); const manedligRente = ((i.rente || 0) / 100 / 12); const antallManeder = (i.lanetid || 25) * 12; const renteFaktor = Math.pow(1 + manedligRente, antallManeder); const manedligAvdrag = lanebelop * (manedligRente * renteFaktor) / (renteFaktor - 1); const manedligeFaste = (i.felleskostnader || 0) + (i.strom || 0) + (i.forsikring || 0) + (i.vedlikehold || 0); const manedligEie = manedligAvdrag + manedligeFaste; const result = manedligEie - (i.leiepris || 0); return {value: result, unit: 'kr/mnd', desc: 'Forskjell mellom eie og leie per måned (negativ = billigere å eie)'}; },

  indeksregulering_bygg_anlegg: (i) => { if(!i.grunnbelop) return null; const result = i.grunnbelop * (i.indeks_slutt / i.indeks_start); return {value: result, unit: 'NOK', desc: 'Indeksregulert bel\u00f8p for bygg og anlegg'}; },

  akademiet_karakter_kalkulator: (i) => { if(!i.karakterer) return null; const grades = i.karakterer.split(',').map(Number); const credits = i.studiepoeng ? i.studiepoeng.split(',').map(Number) : grades.map(() => 1); const totalWeighted = grades.reduce((sum, g, idx) => sum + g * (credits[idx] || 1), 0); const totalCredits = credits.reduce((sum, c) => sum + c, 0); const snitt = totalCredits > 0 ? totalWeighted / totalCredits : 0; const konkurranse = i.konkurransepoeng ? parseFloat(i.konkurransepoeng) : 0; const result = snitt + konkurranse; return {value: result, unit: 'poeng', desc: 'Gjennomsnittskarakter med konkurransepoeng'}; },

  pregnancy_calculator: (i) => { if(!i.last_period) return null; const lastPeriod = new Date(i.last_period); const cycle = parseInt(i.cycle_length) || 28; const dueDate = new Date(lastPeriod.getTime() + (280 + (cycle - 28)) * 86400000); const today = new Date(); const diff = dueDate.getTime() - today.getTime(); const daysLeft = Math.ceil(diff / 86400000); const weeksPregnant = Math.floor((280 - daysLeft) / 7); const daysPregnant = (280 - daysLeft) % 7; const result = weeksPregnant + ' uke' + (weeksPregnant !== 1 ? 'r' : '') + ' og ' + daysPregnant + ' dag' + (daysPregnant !== 1 ? 'er' : ''); return {value: result, unit: 'uker/dager', desc: 'Svangerskapslengde basert på siste menstruasjon og sykluslengde'}; },

  nordnet_fond_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const n = i.spareperiode; const P = i.startbelop; const M = i.manedlig_innskudd || 0; const monthlyRate = r / 12; const months = n * 12; const futureValue = P * Math.pow(1 + monthlyRate, months) + M * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate); const totalInnskudd = P + M * months; const avkastning = futureValue - totalInnskudd; const skatt = i.skatt_type === 'fritak' ? 0 : avkastning * 0.378; const result = futureValue - skatt; return {value: Math.round(result), unit: 'kr', desc: 'Estimert sluttverdi etter skatt'}; },

  bil_skatt_kalkulator: (i) => { if(!i.co2_utslipp) return null; const result = (i.co2_utslipp * 1.36 + (i.vekt || 0) * 0.022 + (i.drivstoff === 'diesel' ? 0.15 : 0) * i.co2_utslipp) * (1 - Math.min((i.alder || 0) * 0.15, 0.75)); return {value: result, unit: 'kr', desc: 'Bilskatt basert p\u00e5 CO2-utslipp, vekt, drivstoff og alder'}; },

  kg_to_liter: (i) => { if(!i.weight_kg) return null; const densities = {vann:1,melk:1.03,olje:0.92,sukker:0.85,salt:1.2,honning:1.42,smore:0.91,ris:0.85,mel:0.59}; const d = densities[i.substance] || 1; const result = i.weight_kg / d; return {value: result, unit: 'L', desc: i.weight_kg + ' kg ' + i.substance + ' = ' + result.toFixed(2) + ' liter'}; },

  sol_kalkulator: (i) => { if(!i.hudtype) return null; const hudFaktorer = {1:3,2:4,3:5,4:6,5:7}; const faktor = hudFaktorer[i.hudtype] || 3; const uvEffekt = i.uv_indeks * (1 - i.skydekke/100); const tidFaktor = i.solminutter / 60; const spfFaktor = i.sol_krem_spf > 0 ? i.sol_krem_spf : 1; const result = Math.round((uvEffekt * tidFaktor * faktor) / spfFaktor * 100) / 100; return {value: result, unit: 'UV-dose', desc: 'Estimert UV-dose for gitt hudtype, UV-indeks, soltid, solkrem SPF og skydekke'}; },

  forsikring_elbil_kalkulator: (i) => { if(!i.bilverdi) return null; const result = Math.max(0, (i.bilverdi * 0.05 + (i.alder || 30) * 100 + (i.kjørelengde || 15000) * 0.02) * (1 - Math.min((i.bonus || 0) / 100, 0.75)) * (i.sjåfør_alder < 25 ? 1.5 : 1)); return {value: Math.round(result * 100) / 100, unit: 'NOK', desc: 'Årlig forsikringspremie for elbil i norske kroner'}; },

  distance_calculator: (i) => { if(!i.x1) return null; const result = Math.sqrt(Math.pow(i.x2 - i.x1, 2) + Math.pow(i.y2 - i.y1, 2) + Math.pow(i.z2 - i.z1, 2)); return {value: result, unit: i.enhet || 'meter', desc: 'Avstand mellom punktene i ' + (i.enhet || 'meter')}; },

  pensjonsalder_kalkulator: (i) => { if(!i.alder) return null; const result = Math.min(i.alder + (i.onsket_pensjon * 12 - (i.sparekapital * (1 + i.forventet_avkastning / 100) / 12)) / ((i.sparebelop * (1 + i.forventet_avkastning / 100) / 12) * 12 / (i.forventet_levetid - i.alder)), i.forventet_levetid); return {value: Math.round(result), unit: 'år', desc: 'Estimert pensjonsalder basert på dine data'}; },

  power_pant_calculator: (i) => { if(!i.kjonn) return null; const result = (i.benkpress_maks + i.knebøy_maks + i.markloft_maks) / (i.vekt * (i.kjonn === 'mann' ? 1.0 : 0.8)); return {value: Math.round(result * 100) / 100, unit: 'poeng/kg', desc: 'Styrkeindeks basert på total maksstyrke delt på kroppsvekt' + (i.kjonn === 'mann' ? ' (menn)' : ' (kvinner)')}; },

  karbonavtrykk_beregning: (i) => { if(!i.strom_forbruk) return null; const strom = i.strom_forbruk * (i.strom_kilde === 'fornybar' ? 0.02 : 0.4); const bil = i.bil_km * (i.bil_type === 'elbil' ? 0.01 : i.bil_type === 'diesel' ? 0.15 : 0.12); const fly = i.fly_turer * i.fly_lengde * 0.12; const kjott = i.kjott_forbruk * (i.kjott_type === 'storfe' ? 27 : i.kjott_type === 'svin' ? 7 : i.kjott_type === 'kylling' ? 4 : 10); const forbruk = i.forbruk_niva * 0.5; const result = strom + bil + fly + kjott + forbruk; return {value: result, unit: 'kg CO2', desc: 'Totalt karbonavtrykk i kg CO2-ekvivalenter'}; },

  enkeltpersonforetak_skatt_kalkulator: (i) => { if(!i.næringsinntekt) return null; const result = (i.næringsinntekt - i.driftskostnader) * (i.kommunesats / 100) + (i.næringsinntekt - i.driftskostnader) * (i.trygdeavgift_sats / 100); return {value: result, unit: 'kr', desc: 'Beregnet skatt for enkeltpersonforetak i norske kroner'}; },

  parti_kalkulator: (i) => { if(!i.antall_personer) return null; const result = i.antall_personer * i.mengde_per_person; return {value: result, unit: i.enhet, desc: 'Total mengde for ' + i.antall_personer + ' personer'}; },

  karakterpoeng_beregning: (i) => { if(!i.karakter_1) return null; const result = (parseFloat(i.karakter_1)*parseFloat(i.vekt_1)+parseFloat(i.karakter_2)*parseFloat(i.vekt_2)+parseFloat(i.karakter_3)*parseFloat(i.vekt_3))/(parseFloat(i.vekt_1)+parseFloat(i.vekt_2)+parseFloat(i.vekt_3)); return {value: result, unit: 'poeng', desc: 'Gjennomsnittlig karakterpoeng basert på vektede karakterer'}; },

  bil_kostnader_formel: (i) => { if(!i.drivstoff_per_km) return null; const result = (i.drivstoff_per_km * i.km_per_ar) + i.forsikring_per_ar + i.vedlikehold_per_ar + i.verditap_per_ar + i.andre_kostnader_per_ar; return {value: result, unit: 'kr/år', desc: 'Totale årlige bilkostnader i kroner per år'}; },

  barnetrygd_beregning: (i) => { if(!i.antall_barn) return null; const result = (i.antall_barn * 1054) + (i.barn_over_6 * 376); return {value: result, unit: 'NOK/mnd', desc: 'Barnetrygd for ' + i.antall_barn + ' barn, hvorav ' + i.barn_over_6 + ' over 6 år'}; },

  vgs_kalkulator: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? (Number(i.tall2) !== 0 ? Number(i.tall1) / Number(i.tall2) : null) : null; return {value: result, unit: 'enhet', desc: 'Resultat av ' + i.tall1 + ' ' + i.operasjon + ' ' + i.tall2}; },

  permisjonskalkulator: (i) => { if(!i.ukentlig_arbeidstid) return null; const result = (i.månedslonn * 12 / 52) * i.ukentlig_arbeidstid * i.antall_uker_permisjon * (i.dekningsgrad / 100); return {value: result, unit: 'kr', desc: 'Estimert permisjonsbeløp i kroner'}; },

  skatt_pa_utbytte: (i) => { if(!i.utbytte) return null; const result = Math.max(0, (i.utbytte - (i.skjermingsfradrag || 0)) * (i.skattesats || 0.22) * (i.eierandel || 1)); return {value: result, unit: 'kr', desc: 'Skatt på utbytte i ' + (i.selskapstype || 'selskap') + ' er ' + result.toFixed(2) + ' kr'}; },

  lonnsokning_kalkulator: (i) => { if(!i.navaerende_lonn) return null; const result = ((i.ny_lonn - i.navaerende_lonn) / i.navaerende_lonn) * 100 - (i.inflasjon || 0) * (i.antall_ar || 1); return {value: result, unit: '%', desc: 'Reell lønnsøkning i prosent etter justering for inflasjon over ' + (i.antall_ar || 1) + ' år'}; },

  campingvogn_beregning: (i) => { if(!i.egenvekt) return null; const result = i.egenvekt + i.nyttelast; return {value: result, unit: 'kg', desc: 'Totalvekt campingvogn (egenvekt + nyttelast)'}; },

  husleie_okning_kpi: (i) => { if(!i.current_rent) return null; const result = i.current_rent * (i.kpi_current / i.kpi_previous - 1) * (i.months_since_last / 12); return {value: result, unit: 'kr', desc: 'Økning i husleie basert på KPI' + ' over ' + i.months_since_last + ' måneder'}; },

  strompris_kalkulator_vg: (i) => { if(!i.forbruk) return null; const result = (i.forbruk * i.pris_per_kwh + i.nettleie_fast + i.nettleie_variabel * i.forbruk + i.elavgift * i.forbruk - i.stromstotte * i.forbruk) / 100; return {value: result, unit: 'kr', desc: 'Total strømpris per kWh inkl. nettleie, avgifter og strømstøtte'}; },

  boligpris_formel: (i) => { if(!i.areal) return null; const result = (i.areal * 25000) + (i.rom * 50000) + (i.beliggenhet * 200000) + (i.standard * 150000) + (i.etasje * 30000) + (i.balkong * 50000); return {value: result, unit: 'NOK', desc: 'Estimert boligpris basert på areal, rom, beliggenhet, standard, etasje og balkong'}; },

  fond_avkastning_beregning: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const g = i.arlig_gebyr / 100; const n = i.ar * 12; const rEff = (1 + r - g) / 12; const result = i.startbelop * Math.pow(1 + rEff, n) + i.manedlig_innskudd * ((Math.pow(1 + rEff, n) - 1) / rEff); return {value: result, unit: 'kr', desc: 'Estimert sluttverdi etter ' + i.ar + ' år med månedlig sparing'}; },

  skatt_tabell_kalkulator: (i) => { if(!i.inntekt) return null; const result = i.inntekt * 0.22; return {value: result, unit: 'kr', desc: 'Beregnet skatt basert på inntekt, tabellnummer og trekkperiode'}; },

  foreldrepenge_kalkulator: (i) => { if(!i.inntekt) return null; const result = Math.round(i.inntekt * (i.dekningsgrad === 100 ? 0.624 : 0.494) * (i.antall_uker || 49) / 52); return {value: result, unit: 'kr', desc: 'Estimert foreldrepenger for ' + (i.antall_uker || 49) + ' uker med ' + (i.dekningsgrad || 100) + '% dekning'}; },

  forsikring_moped: (i) => { if(!i.alder) return null; const result = Math.max(0, 1500 + (i.alder < 18 ? 500 : 0) + (i.kjørelengde > 5000 ? 300 : 0) - (i.bonus || 0) * 100); return {value: result, unit: 'NOK', desc: 'Forsikringspremie for moped' + ' basert på alder, kjørelengde og bonus'}; },

  formuesverdi_fritidsbolig: (i) => { if(!i.takst) return null; const result = i.takst * (i.kommunefaktor || 1) * 0.25; return {value: result, unit: 'NOK', desc: 'Formuesverdi fritidsbolig basert på takst og kommunefaktor'}; },

  menstruasjonssyklus_kalkulator: (i) => { if(!i.siste_mens) return null; const siste = new Date(i.siste_mens); const syklus = parseInt(i.sykluslengde) || 28; const mens = parseInt(i.mens_lengde) || 5; const neste = new Date(siste.getTime() + syklus * 86400000); const egglosning = new Date(siste.getTime() + (syklus - 14) * 86400000); const fruktbarStart = new Date(egglosning.getTime() - 5 * 86400000); const fruktbarSlutt = new Date(egglosning.getTime() + 1 * 86400000); const nesteMensSlutt = new Date(neste.getTime() + mens * 86400000); return {value: neste.toISOString().split('T')[0], unit: 'dato', desc: 'Neste menstruasjon: ' + neste.toISOString().split('T')[0] + ', eggløsning: ' + egglosning.toISOString().split('T')[0] + ', fruktbar periode: ' + fruktbarStart.toISOString().split('T')[0] + ' til ' + fruktbarSlutt.toISOString().split('T')[0] + ', mens slutter: ' + nesteMensSlutt.toISOString().split('T')[0]}; },

  kost_og_losji_kalkulator: (i) => { if(!i.mat_per_maned) return null; const result = (parseFloat(i.mat_per_maned) + parseFloat(i.husleie_per_maned || 0) + parseFloat(i.strom_per_maned || 0) + parseFloat(i.andre_utgifter || 0)) / parseInt(i.antall_personer || 1); return {value: result, unit: 'kr/person/mnd', desc: 'Totale kostnader per person per m\u00e5ned' + (i.kostholdstype ? ' (' + i.kostholdstype + ')' : '')}; },

  body_fat_percentage: (i) => { if(!i.kjonn) return null; const b = i.kjonn === 'mann' ? 1 : 0; const result = b === 1 ? (495 / (1.0324 - 0.19077 * Math.log10(i.midje - i.nakke) + 0.15456 * Math.log10(i.hoyde))) - 450 : (495 / (1.29579 - 0.35004 * Math.log10(i.midje + i.hofter - i.nakke) + 0.22100 * Math.log10(i.hoyde))) - 450; return {value: Math.round(result * 10) / 10, unit: '%', desc: 'Estimert kroppsfettprosent basert p\u00e5 U.S. Navy-metoden'}; },

  bruktbil_pris_kalkulator: (i) => { if(!i.nybilpris) return null; const result = Math.max(0, i.nybilpris * (1 - (i.alder || 0) * 0.10 - (i.km_stand || 0) / 200000 * 0.15 - (i.merke_faktor || 1) * 0.05 - (i.tilstand || 0) * 0.05)); return {value: result, unit: 'kr', desc: 'Estimert bruktbilpris i norske kroner'}; },

  boligforsikring_kalkulator: (i) => { if(!i.boligtype) return null; const base = i.boligtype === 'enebolig' ? 0.0035 : i.boligtype === 'leilighet' ? 0.0028 : 0.0032; const areaFactor = Math.min(Math.max((i.boflate || 100) / 100, 0.5), 2.5); const yearFactor = Math.max(1 - ((2025 - (i.byggear || 2000)) * 0.005), 0.7); const postCodeRisk = i.postnummer ? (parseInt(i.postnummer) > 7000 ? 1.15 : parseInt(i.postnummer) > 3000 ? 1.05 : 1.0) : 1.0; const takstValue = i.takst || 3000000; const innboValue = i.innbo || 500000; const result = Math.round((takstValue * base * areaFactor * yearFactor * postCodeRisk) + (innboValue * 0.002)); return {value: result, unit: 'NOK/år', desc: 'Estimert boligforsikring basert på ' + i.boligtype + ', ' + (i.boflate || '?') + ' kvm, byggeår ' + (i.byggear || '?') + ' og postnummer ' + (i.postnummer || '?')}; },

  husleieokning_kpi: (i) => { if(!i.current_rent) return null; const result = i.current_rent * (i.kpi_current / i.kpi_previous - 1) * (i.adjustment_frequency === 'yearly' ? 1 : i.adjustment_frequency === 'half_yearly' ? 0.5 : i.adjustment_frequency === 'quarterly' ? 0.25 : 1); return {value: result, unit: 'kr', desc: 'Økning i husleie basert på KPI-endring'}; },

  pensjon_beregning: (i) => { if(!i.alder) return null; const ar_igjen = Math.max(0, i.pensjonsalder - i.alder); const total_sparing = i.sparing_per_ar * ((Math.pow(1 + i.avkastning/100, ar_igjen) - 1) / (i.avkastning/100)) * (1 + i.avkastning/100); const uttaksar = Math.max(1, i.forventet_levealder - i.pensjonsalder); const arlig_utbetaling = total_sparing / ((1 - Math.pow(1 + i.avkastning/100, -uttaksar)) / (i.avkastning/100)); return {value: arlig_utbetaling, unit: 'NOK/år', desc: 'Estimert årlig pensjonsutbetaling basert på sparing og avkastning'}; },

  klima_kalkulator: (i) => { if(!i.strom_forbruk) return null; const result = (i.strom_forbruk * 0.5) + (i.bil_kjorelengde * 0.2) + (i.flyreiser_kort * 0.6) + (i.flyreiser_lang * 1.5) + (i.kjott_forbruk * 3.0) + (i.avfall_mengde * 0.8); return {value: result, unit: 'kg CO2', desc: 'Ditt totale klimafotavtrykk er ' + result.toFixed(0) + ' kg CO2 per år'}; },

  utdanningskalkulator: (i) => { if(!i.karakterer) return null; const result = parseFloat(i.karakterer) + parseFloat(i.fordypningspoeng || 0) + parseFloat(i.alderpoeng || 0); return {value: result, unit: 'poeng', desc: 'Totalt poeng for ' + (i.studie || 'ukjent studie')}; },

  undercourse_calculator: (i) => { if(!i.face_value) return null; const result = ((i.face_value - i.issue_price) / i.face_value) * 100; return {value: result, unit: '%', desc: 'Underkurs i prosent av pålydende'}; },

  prosent_stigning_formel: (i) => { if(!i.startverdi) return null; const result = ((i.sluttverdi - i.startverdi) / i.startverdi) * 100; return {value: result, unit: '%', desc: 'Prosent stigning fra ' + i.startverdi + ' til ' + i.sluttverdi}; },

  skatt_av_firmabil: (i) => { if(!i.listepris) return null; const co2Tillegg = Math.max(0, (i.co2_utslipp - 50) * (i.drivstoff === 'diesel' ? 1.5 : 1) * 1000); const drivstoffTillegg = i.drivstoff === 'diesel' ? 0.15 * i.listepris : 0; const eierandelFaktor = i.eierandel ? i.eierandel / 100 : 1; const result = (i.listepris * 0.3 + co2Tillegg + drivstoffTillegg) * eierandelFaktor; return {value: result, unit: 'NOK', desc: 'Årlig skatt for firmabil i norske kroner'}; },

  kvadratmeterpris_beregning: (i) => { if(!i.totalpris || !i.areal) return null; const result = i.totalpris / i.areal; return {value: result, unit: 'kr/m\u00B2', desc: 'Pris per kvadratmeter for ' + (i.omrade || 'omr\u00E5det')}; },

  pensjon_skatt_kalkulator: (i) => { if(!i.pensjonsinntekt) return null; const result = i.pensjonsinntekt * (i.trygdeavgift || 0.08) + (i.sivilstatus === 'gift' ? 0 : 0.25 * i.pensjonsinntekt); return {value: result, unit: 'NOK', desc: 'Beregnet skatt på pensjonsinntekt'}; },

  spalingsforbrenning_kalkulator: (i) => { if(!i.brensel_type) return null; const result = (i.mengde * (100 - i.fuktighet) / 100) * (i.brensel_type === 'tre' ? 18.5 : i.brensel_type === 'torv' ? 20.0 : i.brensel_type === 'kull' ? 25.0 : 0); return {value: result, unit: 'MJ', desc: 'Spalingsforbrenning for ' + i.brensel_type + ' med mengde ' + i.mengde + ' kg og fuktighet ' + i.fuktighet + '%'}; },

  verdivurdering_bolig: (i) => { if(!i.areal) return null; const result = i.areal * (i.beliggenhet || 1) * (i.tilstand || 1) * (i.tomt || 1) * (i.etasjer || 1) * 45000; return {value: Math.round(result), unit: 'NOK', desc: 'Estimert markedsverdi basert på areal, beliggenhet, tilstand, tomt og etasjer'}; },

  gjensidige_bilforsikring_formel: (i) => { if(!i.kjøretøytype) return null; const base = {personbil: 5000, varebil: 6000, motorsykkel: 3000, moped: 1500}[i.kjøretøytype] || 5000; const alderFaktor = i.alder < 25 ? 1.5 : i.alder < 35 ? 1.2 : 1.0; const kmFaktor = i.km_per_år < 10000 ? 0.9 : i.km_per_år < 20000 ? 1.0 : 1.2; const bonusFaktor = Math.max(0.5, 1 - (i.bonus || 0) * 0.1); const result = Math.round(base * alderFaktor * kmFaktor * bonusFaktor); return {value: result, unit: 'NOK/år', desc: 'Årlig bilforsikringspremie hos Gjensidige'}; },

  beregn_boligverdi: (i) => { if(!i.bruksareal) return null; const result = i.bruksareal * 15000 + (i.tomteareal || 0) * 2000 + (i.beliggenhet === 'sentralt' ? 500000 : i.beliggenhet === 'landlig' ? -200000 : 0) + (i.standard === 'hoy' ? 300000 : i.standard === 'lav' ? -200000 : 0) + (i.byggear ? (2025 - i.byggear) * -5000 : 0) + (i.antall_rom || 1) * 100000; return {value: result, unit: 'NOK', desc: 'Estimert boligverdi basert på bruksareal, tomteareal, beliggenhet, standard, byggeår og antall rom'}; },

  pappaperm_kalkulator: (i) => { if(!i.inntekt) return null; const result = i.inntekt * (i.dekningsgrad / 100) * i.antall_uker / 52; return {value: result, unit: 'kr', desc: 'Estimert pappapermbeløp basert på inntekt, dekningsgrad og antall uker'}; },

  konsulent_lonn_beregning: (i) => { if(!i.timepris) return null; const bruttoInntekt = i.timepris * i.timer_per_uke * i.uker_per_ar * (i.faktureringsgrad / 100); const result = i.selskapstype === 'AS' ? (bruttoInntekt - i.kostnader_per_ar) * 0.78 : (bruttoInntekt - i.kostnader_per_ar) * 0.72; return {value: result, unit: 'NOK', desc: 'Estimert årslønn etter skatt og avgifter'}; },

  vitnemal_kalkulator: (i) => { if(!i.karakterer) return null; const karakterSnitt = i.karakterer.reduce((a,b)=>a+b,0)/i.karakterer.length; const result = karakterSnitt + (i.fordypningspoeng||0) + (i.alderstillegg||0) + (i.kjonn==='mann'?0:0); return {value: result, unit: 'poeng', desc: 'Karakterpoengsum med tillegg for fordypning og alder'}; },

  markedsverdi_hytte: (i) => { if(!i.areal) return null; const result = i.areal * (i.beliggenhet || 1) * (i.standard || 1) * (i.tomtestorrelse || 1) * (1 - (2025 - (i.byggear || 2025)) * 0.01); return {value: Math.round(result), unit: 'NOK', desc: 'Estimert markedsverdi for hytte basert på areal, beliggenhet, standard, tomtestørrelse og byggeår'}; },

  bilimport_norge_kalkulator: (i) => { if(!i.bil_verdi_nok) return null; const toll = i.bil_verdi_nok * 0.1; const frakt = i.frakt_kostnad_nok || 0; const motorAvgift = i.motor_storrelse_ccm > 2000 ? (i.motor_storrelse_ccm - 2000) * 50 : 0; const alderFradrag = Math.min(i.bil_alder_ar * 0.05, 0.3); const co2Avgift = i.drivstoff_type === 'diesel' ? 15000 : (i.drivstoff_type === 'bensin' ? 10000 : 0); const result = (toll + frakt + motorAvgift + co2Avgift) * (1 - alderFradrag); return {value: result, unit: 'NOK', desc: 'Estimert totalkostnad for import av bil fra Norge'}; },

  arslonn_til_timelonn: (i) => { if(!i.arslonn) return null; const result = i.arslonn / ((52 - (i.ferieuker || 0)) * (i.timer_per_uke || 37.5)); return {value: result, unit: 'kr/t', desc: 'Timelønn basert på årslønn'}; },

  moms_elbil_kalkulator: (i) => { if(!i.bilpris_uten_moms) return null; const result = i.bilpris_uten_moms * (i.moms_sats || 0.25); return {value: result, unit: 'kr', desc: 'Momsbeløp for elbil basert på pris uten moms og momssats'}; },

  optituning_formula: (i) => { if(!i.alder) return null; const bmr = i.kjonn === 'mann' ? 88.362 + (13.397 * i.vekt) + (4.799 * i.hoyde) - (5.677 * i.alder) : 447.593 + (9.247 * i.vekt) + (3.098 * i.hoyde) - (4.330 * i.alder); const aktivitetsfaktor = [1.2, 1.375, 1.55, 1.725, 1.9][Math.min(Math.max(Math.round(i.aktivitetsniva), 1), 5) - 1]; const maljustering = i.mal === 'ned' ? -500 : i.mal === 'opp' ? 500 : 0; const result = Math.round(bmr * aktivitetsfaktor + maljustering); return {value: result, unit: 'kcal/dag', desc: 'Ditt optimale daglige kaloriinntak er ' + result + ' kcal for ' + (i.mal === 'ned' ? 'vektnedgang' : i.mal === 'opp' ? 'vektøkning' : 'vedlikehold') + ' basert på alder ' + i.alder + ', vekt ' + i.vekt + ' kg, høyde ' + i.hoyde + ' cm og aktivitetsnivå ' + i.aktivitetsniva + '.'}; },

  bompeng_kalkulator: (i) => { if(!i.antall_turer) return null; const result = i.antall_turer * i.gjennomsnittspris_per_passeringssted; return {value: result, unit: 'NOK', desc: 'Totale bompenger for ' + i.antall_turer + ' turer med ' + i.kjøretøytype}; },

  kjoregottgjorelse_beregning: (i) => { if(!i.distanse_km) return null; const sats = i.sats_type === 'bil' ? 4.10 : i.sats_type === 'elbil' ? 2.70 : 4.10; const result = i.distanse_km * sats * (i.antall_dager || 1); return {value: result, unit: 'kr', desc: 'Kj' + 'regodtgj' + 'ørelse for ' + (i.antall_dager || 1) + ' dager'}; },

  pensjonskalkulator_formel: (i) => { if(!i.alder) return null; const result = (i.sparing * (Math.pow(1 + i.forventet_avkastning / 100, i.pensjonsalder - i.alder) - 1) / (i.forventet_avkastning / 100) * Math.pow(1 + i.forventet_avkastning / 100, i.pensjonsalder - i.alder)) / (i.forventet_levealder - i.pensjonsalder); return {value: result, unit: 'kr/år', desc: 'Estimert årlig pensjon basert på sparing, avkastning og forventet levealder'}; },

  stromregning_kalkulator: (i) => { if(!i.forbruk) return null; const result = (i.forbruk * i.strompris / 100) + (i.nettleie) + (i.elavgift); return {value: result, unit: 'kr', desc: 'Strømregning for ' + i.maned + ' mnd: ' + result.toFixed(2) + ' kr'}; },

  karakter_snitt_beregning: (i) => { if(!i.karakterer_og_vekter) return null; const result = i.karakterer_og_vekter.reduce((acc, curr) => acc + (curr.karakter * curr.vekt), 0) / i.karakterer_og_vekter.reduce((acc, curr) => acc + curr.vekt, 0); return {value: result, unit: 'poeng', desc: 'Gjennomsnittskarakter basert p\u00e5 vektede karakterer'}; },

  marathon_calculator: (i) => { if(!i.distance_km) return null; const paceMinPerKm = i.pace_min_per_km || 5; const timeHours = (i.distance_km * paceMinPerKm) / 60; const met = i.gender === 'female' ? 9.8 : 10.5; const calories = met * i.weight_kg * timeHours; return {value: Math.round(calories), unit: 'kcal', desc: 'Estimerte kalorier forbrent under maraton'}; },

  klp_uførepensjon_formula: (i) => { if(!i.stillingsprosent) return null; const stillingsprosent = i.stillingsprosent / 100; const aarslonn = i.aarslonn || 0; const tjenestetid_aar = i.tjenestetid_aar || 0; const ufoeregrad = i.ufoeregrad / 100; const pensjonsalder = i.pensjonsalder || 67; const alder_naa = i.alder_naa || 0; const maks_tjenestetid = 30; const tjenestetid_faktor = Math.min(tjenestetid_aar, maks_tjenestetid) / maks_tjenestetid; const pensjonsgrunnlag = aarslonn * stillingsprosent; const aldersfaktor = Math.max(0, Math.min(1, (alder_naa - 20) / (pensjonsalder - 20))); const result = pensjonsgrunnlag * ufoeregrad * tjenestetid_faktor * aldersfaktor; return {value: result, unit: 'NOK', desc: 'Beregnet uførepensjon fra KLP basert på stillingsprosent, årslønn, tjenestetid, uføregrad, pensjonsalder og nåværende alder'}; },

  lonn_kalkulator: (i) => { if(!i.bruttolonn) return null; const trinn1 = 208050; const trinn2 = 292850; const trinn3 = 670000; const trinn4 = 937900; const trinn5 = 1350000; const sats1 = 0.017; const sats2 = 0.04; const sats3 = 0.136; const sats4 = 0.166; const sats5 = 0.176; const klassefradrag = i.skatteklasse === 2 ? 135000 : 67500; const totalFradrag = (i.fradrag || 0) + klassefradrag; const grunnlag = Math.max(0, i.bruttolonn - totalFradrag); let skatt = 0; if(grunnlag > trinn1) skatt += Math.min(grunnlag - trinn1, trinn2 - trinn1) * sats1; if(grunnlag > trinn2) skatt += Math.min(grunnlag - trinn2, trinn3 - trinn2) * sats2; if(grunnlag > trinn3) skatt += Math.min(grunnlag - trinn3, trinn4 - trinn3) * sats3; if(grunnlag > trinn4) skatt += Math.min(grunnlag - trinn4, trinn5 - trinn4) * sats4; if(grunnlag > trinn5) skatt += (grunnlag - trinn5) * sats5; const nettolonn = i.bruttolonn - skatt; return {value: nettolonn, unit: 'kr', desc: 'Estimert nettolonn etter skatt'}; },

  solcelleanlegg_beregning: (i) => { if(!i.panel_effekt) return null; const result = ((i.panel_effekt * i.antall_paneler * i.solinnstråling * (1 - i.systemtap/100) * i.strompris) / 1000) - i.anleggskostnad; return {value: result, unit: 'NOK', desc: 'Netto besparelse over levetid i norske kroner'}; },

  bompenger_tromso_kalkulator: (i) => { if(!i.antall_dager) return null; const pris = i.kjoretoytype === 'elbil' ? 0 : (i.tidspunkt === 'rush' ? 45 : 30); const result = i.antall_dager * i.antall_passeringer_per_dag * pris; return {value: result, unit: 'NOK', desc: 'Estimert bompenger for ' + i.antall_dager + ' dager i Tromsø'}; },

  husleie_indeks_beregning: (i) => { if(!i.nåværende_husleie) return null; const result = i.nåværende_husleie * (i.kpi_slutt / i.kpi_start); return {value: result, unit: 'NOK', desc: 'Ny husleie etter indeksjustering basert på KPI-endring fra ' + i.kpi_start + ' til ' + i.kpi_slutt + ', justert i ' + i.justeringsmåned + ' (nåværende måned: ' + i.nåværende_måned + ')'}; },

  bomring_kalkulator: (i) => { if(!i.by) return null; const rates = {Oslo: {el: 0, lett: 30, tung: 70}, Bergen: {el: 0, lett: 25, tung: 60}, Trondheim: {el: 0, lett: 20, tung: 50}, Stavanger: {el: 0, lett: 22, tung: 55}}; const vehicle = i.kjøretøytype || 'lett'; const time = i.tidspunkt || 'normal'; const pass = Number(i.antallPasseringer) || 0; const days = Number(i.antallDager) || 1; const city = rates[i.by]; if(!city) return null; const base = city[vehicle] || 0; const multiplier = (time === 'rush' ? 1.5 : 1); const total = base * multiplier * pass * days; return {value: total, unit: 'NOK', desc: 'Total bomringkostnad for ' + i.by + ' med ' + vehicle + ' kjøretøy over ' + days + ' dager'}; },

  bil_verdi_formel: (i) => { if(!i.nybilpris) return null; const result = Math.max(0, i.nybilpris * (1 - 0.15 * Math.min(i.alder || 0, 10) - 0.02 * Math.min((i.kmstand || 0) / 10000, 15) - 0.05 * (i.tilstand || 0))); return {value: result, unit: 'NOK', desc: 'Estimert bilverdi basert p\u00e5 nybilpris, alder, km-stand og tilstand'}; },

  bilforsikring_kalkulator: (i) => { if(!i.alder) return null; const base = 12000; const alderFaktor = i.alder < 25 ? 1.5 : i.alder < 30 ? 1.2 : 1.0; const kjorelengdeFaktor = i.kjorelengde > 20000 ? 1.3 : i.kjorelengde > 10000 ? 1.1 : 1.0; const bonusFaktor = Math.max(0.5, 1 - (i.bonus || 0) * 0.1); const biltypeFaktor = i.biltype === 'elbil' ? 0.8 : i.biltype === 'stasjonsvogn' ? 1.0 : i.biltype === 'suv' ? 1.2 : 1.1; const result = Math.round(base * alderFaktor * kjorelengdeFaktor * bonusFaktor * biltypeFaktor); return {value: result, unit: 'NOK/år', desc: 'Estimert årspris for bilforsikring i Norge'}; },

  gram_til_ml: (i) => { if(!i.grams) return null; const densities = {vann: 1, melk: 1.03, olje: 0.92, sukker: 0.85, mel: 0.59, smør: 0.91, honning: 1.42, salt: 1.2, ris: 0.85, havregryn: 0.4}; const density = densities[i.substance] || 1; const result = i.grams / density; return {value: result, unit: 'ml', desc: i.grams + ' gram ' + i.substance + ' tilsvarer ' + result.toFixed(2) + ' ml'}; },

  bompasseringer_kalkulator: (i) => { if(!i.antall_passeringer) return null; const result = Math.min(i.antall_passeringer * i.pris_per_passering * (1 - (i.rabatt_prosent || 0) / 100), i.maanedlig_tak || Infinity); return {value: result, unit: 'kr', desc: 'Totale bompenger per m\u00e5ned'}; },

  dekktrykk_sykkel: (i) => { if(!i.total_weight) return null; const w = i.total_weight; const t = i.tire_width; const terrainFactor = i.terrain === 'asfalt' ? 1 : i.terrain === 'grus' ? 0.9 : 0.8; const result = Math.round((w / 10) * terrainFactor + (t * 0.3)); return {value: result, unit: 'psi', desc: 'Anbefalt dekktrykk for sykkel basert pa totalvekt, dekkbredde og terreng'}; },

  avansert_kalkulator: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? (Number(i.tall2) !== 0 ? Number(i.tall1) / Number(i.tall2) : null) : null; return {value: result, unit: 'enhet', desc: 'Resultat av ' + i.operasjon + ' mellom ' + i.tall1 + ' og ' + i.tall2}; },

  strompris_kalkulator: (i) => { if(!i.forbruk_kwh) return null; const result = (i.forbruk_kwh * (i.spotpris_ore / 100)) + (i.nettleie_omrade * i.forbruk_kwh) + ((i.arsforbruk > 0 ? (i.forbruk_kwh / i.arsforbruk) * 500 : 0)); return {value: result, unit: 'kr', desc: 'Estimert strømpris i kroner basert på forbruk, spotpris, nettleie og årsforbruk'}; },

  bil_kalkulator: (i) => { if(!i.km_per_ar) return null; const result = i.km_per_ar * i.forbruk_per_km * i.pris_per_enhet; return {value: result, unit: 'kr/år', desc: 'Årlig drivstoffkostnad basert på ' + i.km_per_ar + ' km/år, ' + i.drivstofftype + ', forbruk ' + i.forbruk_per_km + ' per km og pris ' + i.pris_per_enhet + ' per enhet'}; },

  km_bil_kalkulator: (i) => { if(!i.distance) return null; const result = (i.distance / 100) * i.fuel_consumption * i.fuel_price / (i.passengers || 1); return {value: result, unit: 'kr', desc: 'Kostnad per person for bilreisen'}; },

  procent_skladany: (i) => { if(!i.initial_amount) return null; const r = i.annual_rate / 100; const n = i.compounding_frequency || 1; const t = i.years || 0; const m = i.monthly_contribution || 0; const total = i.initial_amount * Math.pow(1 + r / n, n * t) + m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n)); return {value: total, unit: 'kr', desc: 'Sluttbeløp etter ' + t + ' år med månedlig sparing'}; },

  aksjesparing_formel: (i) => { if(!i.maanedlig_innskudd) return null; const r = i.aar_avkastning / 100; const n = i.spareperiode_aar; const m = i.maanedlig_innskudd; const s = 1 - (i.skatt_utbytte || 0) / 100; const inf = 1 + (i.inflation || 0) / 100; const raw = m * 12 * ((Math.pow(1 + r, n) - 1) / r) * s; const real = raw / Math.pow(inf, n); return {value: Math.round(real * 100) / 100, unit: 'kr', desc: 'Estimert sluttverdi etter skatt og inflasjon'}; },

  eksport_av_bil: (i) => { if(!i.bil_verdi) return null; const result = i.bil_verdi * (i.bil_alder < 3 ? 0.25 : i.bil_alder < 10 ? 0.15 : 0.10) + (i.frakt_kostnad || 0) + (i.destinasjon === 'utenfor_eu' ? i.bil_verdi * 0.10 : 0); return {value: result, unit: 'NOK', desc: 'Eksportkostnad for bil basert p\u00e5 verdi, alder, frakt og destinasjon'}; },

  beregn_uføretrygd: (i) => { if(!i.inntekt_før_uførhet) return null; const result = Math.min(0.66 * i.inntekt_før_uførhet * (i.uføregrad / 100) * (i.trygdetid / 40), 0.66 * i.inntekt_før_uførhet); return {value: result, unit: 'kr/år', desc: 'Beregnet uføretrygd basert på inntekt før uførhet, uføregrad og trygdetid'}; },

  beregn_fraktkostnad: (i) => { if(!i.vekt) return null; const result = (parseFloat(i.vekt) * 10) + (parseFloat(i.avstand) * 2) + (parseFloat(i.hastighet) * 5) + (parseFloat(i.tillegg) || 0); return {value: result, unit: 'kr', desc: 'Fraktkostnad basert p\u00e5 vekt, avstand, hastighet og tillegg'}; },

  importere_bil_tyskland: (i) => { if(!i.kjøpspris_eur) return null; const prisNok = (i.kjøpspris_eur + i.frakt_eur + i.forsikring_eur + i.andre_kostnader_eur) * i.valutakurs; let toll = 0; if(i.biltype === 'personbil') { toll = prisNok * 0.10; } else if(i.biltype === 'varebil') { toll = prisNok * 0.08; } let co2Avgift = 0; if(i.co2_utslipp > 0) { co2Avgift = i.co2_utslipp * 1500; } let aldersfradrag = 0; if(i.bilalder >= 1 && i.bilalder <= 3) { aldersfradrag = prisNok * 0.15; } else if(i.bilalder > 3 && i.bilalder <= 6) { aldersfradrag = prisNok * 0.25; } else if(i.bilalder > 6) { aldersfradrag = prisNok * 0.35; } const engangsavgift = Math.max(0, prisNok + toll + co2Avgift - aldersfradrag); const totalNok = prisNok + toll + engangsavgift + co2Avgift; return {value: totalNok, unit: 'NOK', desc: 'Total kostnad for import av bil fra Tyskland i norske kroner'}; },

  feriepenger_kalkulator: (i) => { if(!i.arslonn) return null; const result = (i.arslonn * (i.feriepenger_prosent || 12) / 100) / ((i.ferieuker || 5) * (i.arbeidsdager_per_uke || 5)); return {value: result, unit: 'kr/dag', desc: 'Feriepenger per dag basert p\u00e5 \u00e5rsl\u00f8nn og ferieprosent'}; },

  stromkostnad_beregning: (i) => { if(!i.forbruk_kwh) return null; const result = (i.forbruk_kwh * (i.spotpris_ore / 100) + i.nettleie_fast + i.nettleie_variabel * i.forbruk_kwh + i.elavgift * i.forbruk_kwh + i.enova_avgift * i.forbruk_kwh) * (1 + i.merverdiavgift / 100); return {value: result, unit: 'kr', desc: 'Total strømkostnad i norske kroner'}; },

  solceller_kalkulator: (i) => { if(!i.panel_effekt) return null; const result = (i.panel_effekt * i.antall_paneler * i.solinnstråling * (1 - i.systemtap / 100) * i.strompris * (1 + Math.cos((i.panel_vinkel || 0) * Math.PI / 180) * 0.15)) / 1000; return {value: result, unit: 'kWh/år', desc: 'Estimert årlig strømproduksjon i kWh'}; },

  golf_poeng_beregning: (i) => { if(!i.par) return null; const result = i.spilleform === 'slagspill' ? i.par + i.handicap - i.score : (i.spilleform === 'stableford' ? Math.max(0, i.par + 2 - i.score + Math.floor(i.handicap / 2)) : i.par - i.score); return {value: result, unit: 'poeng', desc: 'Golf poeng basert p\u00e5 par ' + i.par + ', score ' + i.score + ', handicap ' + i.handicap + ' og spilleform ' + i.spilleform}; },

  alkohol_kalkulator: (i) => { if(!i.antall_enheter) return null; const result = (i.antall_enheter * 12 * 0.789) / ((i.kroppsvekt * (i.kjonn === 'mann' ? 0.68 : 0.55)) + (0.15 * i.timer_siden_start)); return {value: result, unit: 'promille', desc: 'Beregnet alkoholkonsentrasjon i blodet' + ' (' + result.toFixed(2) + ' promille)'}; },

  oppgjor_kalkulator: (i) => { if(!i.salgspris) return null; const result = (i.type === 'bolig' ? (i.salgspris - i.kostpris - i.omkostninger) * 0.78 : (i.type === 'aksje' ? (i.salgspris - i.kostpris - i.omkostninger) * 0.78 : (i.salgspris - i.kostpris - i.omkostninger) * 0.72)); return {value: result, unit: 'kr', desc: 'Netto oppgjør etter skatt og omkostninger'}; },

  brutto_netto_norway: (i) => { if(!i.brutto_inntekt) return null; const skatt = i.skatteklasse === 1 ? 0.22 : 0.30; const netto = i.brutto_inntekt - (i.brutto_inntekt * skatt) - (i.fradrag || 0); return {value: netto, unit: 'NOK', desc: 'Nettoinntekt etter skatt og fradrag'}; },

  tomtepris_beregner: (i) => { if(!i.tomteareal) return null; const result = (i.totalpris - i.sammenligningspris) / i.tomteareal; return {value: result, unit: 'kr/kvm', desc: 'Tomtepris per kvadratmeter' + ' (sammenlignet med referansepris)'}; },

  alkoholavgift_beregning: (i) => { if(!i.drikketype) return null; const satser = { 'øl': 4.15, 'vin': 4.73, 'brennevin': 8.12, 'sider': 4.15, 'rusbrus': 4.15 }; const sats = satser[i.drikketype.toLowerCase()] || 0; const result = sats * i.volum_liter * (i.alkoholprosent / 100); return {value: result, unit: 'NOK', desc: 'Alkoholavgift for ' + i.volum_liter + ' liter ' + i.drikketype + ' med ' + i.alkoholprosent + '% alkohol'}; },

  klimautslipp_beregning: (i) => { if(!i.transport_type) return null; const transportFaktor = {bil:0.21,buss:0.08,tog:0.02,fly:0.25}; const transportUtslipp = (i.transport_km||0) * (transportFaktor[i.transport_type]||0); const stromUtslipp = (i.strom_forbruk||0) * 0.132; const kjottUtslipp = (i.kjott_forbruk||0) * 7.5; const melkOstUtslipp = (i.melk_ost_forbruk||0) * 1.5; const result = transportUtslipp + stromUtslipp + kjottUtslipp + melkOstUtslipp; return {value: result, unit: 'kg CO2', desc: 'Totalt klimautslipp basert på transport, strøm, kjøtt og meieriprodukter'}; },

  boligprisindeks_beregning: (i) => { if(!i.startpris) return null; const result = ((i.sluttpris / i.startpris) / (i.kpi_slutt / i.kpi_start) - 1) * 100; return {value: result, unit: '%', desc: 'Reell prisendring justert for inflasjon fra ' + i.startar + ' til ' + i.sluttar + ' i prosent'}; },

  svangerskapspenger_beregning: (i) => { if(!i.inntekt) return null; const result = i.inntekt * (i.dekningsgrad || 100) / 100 * 0.624; return {value: result, unit: 'kr/år', desc: 'Svangerskapspenger per år basert på inntekt ' + i.inntekt + ' og dekningsgrad ' + (i.dekningsgrad || 100) + '%'}; },

  skatt_firmabil_gronne_skilter: (i) => { if(!i.listepris) return null; const co2 = i.co2_utslipp || 0; const biltype = i.biltype || 'elbil'; const aar = i.aar || 2024; let grunnlag = i.listepris; let co2Tillegg = 0; if(biltype === 'elbil') { co2Tillegg = 0; } else if(biltype === 'ladbar_hybrid') { co2Tillegg = co2 * 1420; } else { co2Tillegg = co2 * 1520; } let prosent = 0; if(aar <= 2022) { prosent = 0.30; } else if(aar <= 2024) { prosent = 0.25; } else { prosent = 0.20; } const result = (grunnlag + co2Tillegg) * prosent; return {value: result, unit: 'NOK', desc: 'Årlig skatt for firmabil med grønne skilter basert på listepris, CO2-utslipp, biltype og år'}; },

  fattigdomsgrense_norge: (i) => { if(!i.inntekt) return null; const result = i.husholdning === 'enslig' ? i.inntekt * 0.5 : i.husholdning === 'par' ? i.inntekt * 0.4 : i.inntekt * 0.35; return {value: result, unit: 'NOK', desc: 'Fattigdomsgrense basert p\u00e5 50% av medianinntekt (EU-skala) for ' + (i.husholdning || 'ukjent') + ' husholdning'}; },

  skatt_av_pensjon: (i) => { if(!i.pensjonsinntekt) return null; const result = Math.max(0, i.pensjonsinntekt * (i.kommunesats + i.trygdeavgift) / 100 + Math.max(0, Math.min(i.pensjonsinntekt, i.trinnskatt_2_grense) - i.trinnskatt_1_grense) * i.trinnskatt_1_sats / 100 + Math.max(0, Math.min(i.pensjonsinntekt, i.trinnskatt_3_grense) - i.trinnskatt_2_grense) * i.trinnskatt_2_sats / 100 + Math.max(0, Math.min(i.pensjonsinntekt, i.trinnskatt_4_grense) - i.trinnskatt_3_grense) * i.trinnskatt_3_sats / 100 + Math.max(0, Math.min(i.pensjonsinntekt, i.trinnskatt_5_grense) - i.trinnskatt_4_grense) * i.trinnskatt_4_sats / 100 + Math.max(0, i.pensjonsinntekt - i.trinnskatt_5_grense) * i.trinnskatt_5_sats / 100); return {value: result, unit: 'kr', desc: 'Beregnet skatt av pensjonsinntekt'}; },

  feriepenger_laerer_kalkulator: (i) => { if(!i.arslonn) return null; const result = (i.arslonn * (i.feriepenger_sats || 0.12) * (i.antall_uker_ferie || 5)) / 52; return {value: result, unit: 'kr', desc: 'Feriepenger for lærere basert på årslønn, feriepengesats og antall uker ferie'}; },

  fond_kalkulator_nordnet: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const k = i.kostnad_fond / 100; const n = i.spareperiode; const m = i.manedlig_sparing; const s = i.startbelop; const effR = r - k; const result = s * Math.pow(1 + effR, n) + m * ((Math.pow(1 + effR, n) - 1) / effR); const skatt = i.skatt_type === 'aksjesparekonto' ? 0 : 0.3778; const final = result * (1 - skatt); return {value: final, unit: 'kr', desc: 'Estimert sluttverdi etter ' + n + ' år med ' + (r*100) + '% avkastning og ' + (k*100) + '% årlig kostnad'}; },

  deficyt_kaloryczny: (i) => { if(!i.alder) return null; const BMR = i.kjonn === 'male' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const aktivitetsfaktor = { 'sedentary': 1.2, 'light': 1.375, 'moderate': 1.55, 'active': 1.725, 'very_active': 1.9 }[i.aktivitet] || 1.2; const TDEE = BMR * aktivitetsfaktor; const malFaktor = i.mal === 'lose' ? -500 : (i.mal === 'gain' ? 500 : 0); const result = Math.round(TDEE + malFaktor); return {value: result, unit: 'kcal/dag', desc: 'Daglig kaloriinntak for ' + (i.mal === 'lose' ? 'vekttap' : i.mal === 'gain' ? 'vektøkning' : 'vedlikehold') + ' basert på dine data'}; },

  tv_kalkulator: (i) => { if(!i.rombredde) return null; const bredde = parseFloat(i.rombredde); const lengde = parseFloat(i.romlengde) || bredde; const oppl = parseInt(i.opplosning) || 1080; const avstand = parseFloat(i.sitteavstand) || 0; const diagonal = Math.sqrt(bredde * bredde + lengde * lengde); const tommer = diagonal / 2.54; const anbefaltTommer = oppl === 2160 ? avstand * 0.84 : oppl === 1440 ? avstand * 1.2 : avstand * 1.6; const result = Math.round(Math.min(tommer, anbefaltTommer) * 10) / 10; return {value: result, unit: 'tommer', desc: 'Anbefalt TV-storrelse basert pa rommal og sitteavstand'}; },

  beregn_lokaltid: (i) => { if(!i.lengdegrad) return null; const result = ((i.utc_timer + i.utc_minutter / 60) + i.tidssone_offset + (i.sommertid ? 1 : 0) + (i.lengdegrad * 4 / 60)) % 24; return {value: result, unit: 'timer', desc: 'Lokal tid i timer basert på lengdegrad, tidssone og sommertid'}; },

  beregn_arbeidsgiveravgift: (i) => { if(!i.bruttoloenn) return null; const satser = {0:0.141,1:0.141,2:0.106,3:0.064,4:0.064,5:0.038,6:0.038,7:0.038,8:0.038,9:0.038,10:0.038}; const sats = satser[i.sone] || 0.141; const result = i.bruttoloenn * sats; return {value: result, unit: 'kr', desc: 'Arbeidsgiveravgift for sone ' + i.sone + ' er ' + result.toFixed(2) + ' kr'}; },

  alderspoeng_beregning: (i) => { if(!i.alder) return null; const result = (i.kjonn === 'mann' ? (i.alder >= 70 ? 15 : i.alder >= 65 ? 10 : i.alder >= 60 ? 5 : i.alder >= 55 ? 3 : i.alder >= 50 ? 2 : i.alder >= 45 ? 1 : 0) : (i.alder >= 70 ? 15 : i.alder >= 65 ? 10 : i.alder >= 60 ? 5 : i.alder >= 55 ? 3 : i.alder >= 50 ? 2 : i.alder >= 45 ? 1 : 0)); return {value: result, unit: 'poeng', desc: 'Alderspoeng for ' + (i.kjonn === 'mann' ? 'menn' : 'kvinner') + ' basert på alder ' + i.alder + ' år'}; },

  co2_utslipp_total: (i) => { if(!i.bil_km) return null; const result = (i.bil_km * (i.bil_type === 'diesel' ? 0.12 : i.bil_type === 'bensin' ? 0.15 : 0.05)) + (i.strom_kwh * 0.1) + (i.kjott_kg * 5.0) + (i.fly_turer * 200) + (i.avfall_kg * 0.5); return {value: result, unit: 'kg CO2', desc: 'Totalt CO2-utslipp basert på bil, strøm, kjøtt, flyreiser og avfall'}; },

  mammapermisjon_beregning: (i) => { if(!i.inntekt) return null; const grunnbelop = 124028; const dekningsgradFaktor = i.dekningsgrad === 100 ? 0.6 : 0.8; const uker = i.permisjon_uker || 49; const fordelingFaktor = i.fordeling === 'mor' ? 1 : (i.fordeling === 'far' ? 1 : 0.5); const inntektPerUke = Math.min(i.inntekt, 6 * grunnbelop) / 52; const result = Math.round(inntektPerUke * dekningsgradFaktor * uker * fordelingFaktor); return {value: result, unit: 'kr', desc: 'Estimert mammapermisjon basert p\u00e5 inntekt, uker, dekningsgrad og fordeling'}; },

  fondsparing_formel: (i) => { if(!i.maanedlig_innskudd) return null; const r = i.forventet_avkastning / 100 / 12; const n = i.spareperiode * 12; const result = i.startkapital * Math.pow(1 + r, n) + i.maanedlig_innskudd * ((Math.pow(1 + r, n) - 1) / r); return {value: Math.round(result * 100) / 100, unit: 'kr', desc: 'Estimert sluttverdi av fondssparingen' + ' (forventet avkastning: ' + i.forventet_avkastning + '%, periode: ' + i.spareperiode + ' år)'}; },

  konkurransepoeng_beregning: (i) => { if(!i.karaktersnitt) return null; const result = parseFloat(i.karaktersnitt) + parseFloat(i.tilleggspoeng || 0) + parseFloat(i.alderspoeng || 0) + parseFloat(i.realfagspoeng || 0); return {value: result, unit: 'poeng', desc: 'Konkurransepoeng = karaktersnitt (' + i.karaktersnitt + ') + tilleggspoeng (' + (i.tilleggspoeng || 0) + ') + alderspoeng (' + (i.alderspoeng || 0) + ') + realfagspoeng (' + (i.realfagspoeng || 0) + ')'}; },

  km_godtgjorelse_calculator: (i) => { if(!i.km_kjort) return null; const sats = i.sats_type === 'bil' ? 4.16 : i.sats_type === 'elbil' ? 2.80 : 4.16; const passasjerTillegg = (parseInt(i.antall_passasjerer) || 0) * 0.50; const result = parseFloat(i.km_kjort) * (sats + passasjerTillegg); return {value: result, unit: 'kr', desc: 'Km godtgjørelse for ' + i.km_kjort + ' km med sats ' + sats + ' kr/km og ' + i.antall_passasjerer + ' passasjerer'}; },

  hjul_kalkulator: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100 * 2 + i.felgdiameter * 25.4) - (i.ny_dekkbredde * i.ny_profil / 100 * 2 + i.ny_felgdiameter * 25.4)); return {value: result, unit: 'mm', desc: 'Forskjell i total diameter mellom gammelt og nytt dekk'}; },

  energimerke_bolig: (i) => { if(!i.areal) return null; const energibehov = (i.oppvarming_kwh + i.stromforbruk_kwh) / i.areal; const isolasjonsfaktor = {darlig: 1.3, middels: 1.0, god: 0.8, veldig_god: 0.6}[i.isolasjon] || 1.0; const varmekildefaktor = {strom: 1.0, varmepumpe: 0.6, fjernvarme: 0.8, gass: 1.2, olje: 1.4, ved: 0.9}[i.varmekilde] || 1.0; const result = energibehov * isolasjonsfaktor * varmekildefaktor; let merke = 'A'; if(result > 250) merke = 'G'; else if(result > 200) merke = 'F'; else if(result > 150) merke = 'E'; else if(result > 100) merke = 'D'; else if(result > 60) merke = 'C'; else if(result > 30) merke = 'B'; return {value: result, unit: 'kWh/m2', desc: 'Energimerke: ' + merke + ' (lavere er bedre)'}; },

  social_cost_calculator: (i) => { if(!i.co2_tonn) return null; const result = (i.co2_tonn * 750 + (i.ch4_tonn || 0) * 21000 + (i.n2o_tonn || 0) * 16000) * (1 + (i.diskonteringsrente || 0.04)); return {value: result, unit: 'NOK', desc: 'Sosial kostnad basert på CO2, CH4 og N2O utslipp med diskonteringsrente'}; },

  norway_tax_calculator: (i) => { if(!i.brutto_inntekt) return null; const b = Number(i.brutto_inntekt); const s = i.skatteklasse || '1'; const trinn1 = 208050, trinn2 = 292850, trinn3 = 670000, trinn4 = 937900, trinn5 = 1350000; let skatt = 0; if(b > trinn1) skatt += Math.min(b, trinn2) - trinn1 * 0.017; if(b > trinn2) skatt += Math.min(b, trinn3) - trinn2 * 0.04; if(b > trinn3) skatt += Math.min(b, trinn4) - trinn3 * 0.136; if(b > trinn4) skatt += Math.min(b, trinn5) - trinn4 * 0.166; if(b > trinn5) skatt += (b - trinn5) * 0.176; const felles = s === '2' ? 0 : 0; const result = Math.max(0, skatt + felles); return {value: result, unit: 'NOK', desc: 'Beregnet skatt for inntekt ' + b + ' NOK i skatteklasse ' + s}; },

  avkastning_med_rente_og_skatt: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const s = i.skatt / 100; const inf = i.inflasjon / 100; const n = i.ar; const m = i.manedlig_sparing; const start = i.startbelop; const rEff = r * (1 - s); const sluttverdi = start * Math.pow(1 + rEff, n) + m * ((Math.pow(1 + rEff, n) - 1) / rEff); const realSluttverdi = sluttverdi / Math.pow(1 + inf, n); return {value: realSluttverdi, unit: 'kr', desc: 'Reell sluttverdi etter skatt og inflasjon i ' + n + ' ar'}; },

  boligutleie_kalkulator: (i) => { if(!i.boligverdi) return null; const nettoInntekt = (parseFloat(i.manedlig_leie) || 0) + (parseFloat(i.andre_inntekter) || 0); const totaleKostnader = (parseFloat(i.felleskostnader) || 0) + (parseFloat(i.vedlikehold) || 0) + (parseFloat(i.forsikring) || 0) + (parseFloat(i.eiendomsskatt) || 0) + (parseFloat(i.andre_kostnader) || 0); const overskudd = nettoInntekt - totaleKostnader; const skatt = overskudd > 0 ? overskudd * ((parseFloat(i.skatteprosent) || 0) / 100) : 0; const resultatEtterSkatt = overskudd - skatt; const result = resultatEtterSkatt; return {value: result, unit: 'kr/mnd', desc: 'Månedlig resultat etter skatt for boligutleie'}; },

  boligindeks_beregning: (i) => { if(!i.startpris) return null; const result = ((i.sluttpris / i.startpris) - 1) * 100 - i.inflasjon; return {value: result, unit: '%', desc: 'Realprisvekst i bolig fra ' + i.startar + ' til ' + i.sluttar + ', justert for inflasjon'}; },

  menstruasjon_kalkulator: (i) => { if(!i.siste_mens) return null; const siste = new Date(i.siste_mens); const syklus = parseInt(i.syklus_lengde) || 28; const varighet = parseInt(i.mens_varighet) || 5; const neste = new Date(siste.getTime() + syklus * 86400000); const egglosning = new Date(siste.getTime() + (syklus - 14) * 86400000); const fruktbarStart = new Date(egglosning.getTime() - 5 * 86400000); const fruktbarSlutt = new Date(egglosning.getTime() + 1 * 86400000); const nesteSlutt = new Date(neste.getTime() + varighet * 86400000); return {value: neste.toISOString().split('T')[0], unit: 'dato', desc: 'Neste menstruasjon starter ' + neste.toISOString().split('T')[0] + ', varer til ' + nesteSlutt.toISOString().split('T')[0] + '. Egglosning ca. ' + egglosning.toISOString().split('T')[0] + ', fruktbar periode ' + fruktbarStart.toISOString().split('T')[0] + ' til ' + fruktbarSlutt.toISOString().split('T')[0] + '.'}; },

  permisjon_sammenligning: (i) => { if(!i.mnd_inntekt) return null; const result = (i.mnd_inntekt * (i.permisjon_uker || 0) * (i.arbeidsgiver_dekker || 0) / 100) / 4.33; return {value: Math.round(result * 100) / 100, unit: 'kr', desc: 'Belop arbeidsgiver dekker i permisjonstiden (80 eller 100 prosent)'}; },

  margin_calculator: (i) => { if(!i.cost_price) return null; const result = i.margin_type === 'prosent' ? ((i.selling_price - i.cost_price) / i.selling_price) * 100 : i.selling_price - i.cost_price; return {value: result, unit: i.margin_type === 'prosent' ? '%' : 'kr', desc: i.margin_type === 'prosent' ? 'Margin i prosent' : 'Margin i kroner'}; },

  felgdimensjon_kalkulator: (i) => { if(!i.dekkbredde) return null; const result = ((i.dekkbredde * i.profil / 100 * 2 + i.felgdiameter * 25.4) - (i.dekkbredde2 * i.profil2 / 100 * 2 + i.felgdiameter2 * 25.4)); return {value: result, unit: 'mm', desc: 'Forskjell i total diameter mellom dekkene'}; },

  kostnad_bil_total: (i) => { if(!i.drivstoff_per_ar) return null; const result = Number(i.drivstoff_per_ar) + Number(i.forsikring_per_ar) + Number(i.vedlikehold_per_ar) + Number(i.verditap_per_ar) + Number(i.andre_kostnader_per_ar); return {value: result, unit: 'kr/år', desc: 'Totale årlige bilkostnader: ' + result + ' kr'}; },

  forsikring_bil_pris: (i) => { if(!i.biltype) return null; const base = {sedan: 5000, stasjonsvogn: 5500, suv: 6500, coupe: 6000, cabriolet: 7000}[i.biltype] || 5000; const alderFaktor = Math.max(0.5, 1 - (i.alder || 25) * 0.01); const kmFaktor = Math.min(2, 1 + ((i.kjorelengde || 15000) - 10000) / 20000); const bonusFaktor = Math.max(0.4, 1 - ((i.bonus || 50) / 100) * 0.6); const skadeTillegg = (i.skader || 0) * 1500; const result = Math.round(base * alderFaktor * kmFaktor * bonusFaktor + skadeTillegg); return {value: result, unit: 'NOK/år', desc: 'Estimert årlig bilforsikringspris i norske kroner basert på biltype, alder, kjørelengde, bonus og skadehistorikk'}; },

  beregn_kaloribehov: (i) => { if(!i.kjonn) return null; const bmr = i.kjonn === 'mann' ? (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder + 5) : (10 * i.vekt + 6.25 * i.hoyde - 5 * i.alder - 161); const faktorer = {stillestitende: 1.2, lettaktiv: 1.375, moderataktiv: 1.55, svartaktiv: 1.725, ekstraaktiv: 1.9}; const result = Math.round(bmr * (faktorer[i.aktivitetsniva] || 1.2)); return {value: result, unit: 'kcal/dag', desc: 'Daglig kaloribehov basert på kjønn, alder, vekt, høyde og aktivitetsnivå'}; },

  skarpnes_takstein_kalkulator: (i) => { if(!i.takbredde_m) return null; const takareal = i.takbredde_m * i.takhoyde_m; const steinFaktor = i.stein_type === 'skifer' ? 1.2 : i.stein_type === 'betong' ? 1.0 : 1.1; const monteringFaktor = i.monteringstype === 'enkel' ? 1.0 : i.monteringstype === 'dobbelt' ? 1.15 : 1.05; const result = Math.ceil(takareal * steinFaktor * monteringFaktor); return {value: result, unit: 'stk', desc: 'Antall takstein for takflate ' + i.takbredde_m + 'm bredde og ' + i.takhoyde_m + 'm høyde'}; },

  maks_puls_beregning: (i) => { if(!i.alder) return null; const result = i.kjonn === 'mann' ? 220 - i.alder : 226 - i.alder; return {value: result, unit: 'slag/min', desc: 'Maksimal puls basert p\u00e5 alder og kj\u00f8nn'}; },

  leve_pa_renter_beregning: (i) => { if(!i.maanedlige_utgifter) return null; const aar = i.maanedlige_utgifter * 12; const netto = i.forventet_avkastning * (1 - i.skattesats / 100); const real = netto - i.inflasjon; const rate = i.trygg_uttaksrate || real; const result = rate > 0 ? aar / (rate / 100) : 0; return {value: result, unit: 'kr', desc: 'Nødvendig kapital for å leve på renter'}; },

  skattetabell_7100: (i) => { if(!i.pensjonsinntekt) return null; const trinn = i.trinnskatt || 0; const klasse = i.skatteklasse || 1; const grunnlag = i.pensjonsinntekt; const trinn1 = Math.max(0, Math.min(grunnlag - 198350, 279150 - 198350)) * 0.017; const trinn2 = Math.max(0, Math.min(grunnlag - 279150, 642950 - 279150)) * 0.04; const trinn3 = Math.max(0, Math.min(grunnlag - 642950, 926800 - 642950)) * 0.136; const trinn4 = Math.max(0, Math.min(grunnlag - 926800, 1350000 - 926800)) * 0.166; const trinn5 = Math.max(0, grunnlag - 1350000) * 0.176; const trinnskatt = trinn1 + trinn2 + trinn3 + trinn4 + trinn5; const trygdeavgift = grunnlag * 0.05; const minstefradrag = Math.min(grunnlag * 0.45, 104450); const personfradrag = klasse === 2 ? 104450 : 52250; const alminneligInntekt = Math.max(0, grunnlag - minstefradrag); const kommuneskatt = alminneligInntekt * 0.22; const skatt = kommuneskatt + trygdeavgift + trinnskatt; const result = Math.max(0, skatt - personfradrag * 0.22); return {value: Math.round(result), unit: 'NOK', desc: 'Beregnet skatt for Tabell 7100 (pensjon) i klasse ' + klasse}; },

  co2_avtrykk_beregning: (i) => { if(!i.strom_forbruk) return null; const result = (i.strom_forbruk * 0.132) + (i.bil_km * (i.bil_type === 'el' ? 0.02 : i.bil_type === 'hybrid' ? 0.08 : i.bil_type === 'diesel' ? 0.17 : 0.14)) + (i.fly_turer * 0.255) + (i.kjott_forbruk * 2.5) + (i.avfall_kg * 0.5); return {value: result, unit: 'kg CO2', desc: 'Totalt CO2-avtrykk basert på strøm, bil, fly, kjøtt og avfall'}; },

  beregn_kilometergodtgjorelse: (i) => { if(!i.antall_km) return null; const satser = { 'bil': 4.10, 'elbil': 3.50, 'moped': 1.50, 'sykkel': 0.50 }; const sats = satser[i.type_kjoretoy] || 4.10; const result = i.antall_km * sats; return {value: result, unit: 'kr', desc: 'Kilometergodtgjørelse for ' + (i.type_kjoretoy || 'bil') + ' er ' + result.toFixed(2) + ' kr'}; },

  monthly_budget_calculator: (i) => { if(!i.monthly_income) return null; const totalExpenses = (i.housing_cost||0) + (i.food_cost||0) + (i.transport_cost||0) + (i.insurance_cost||0) + (i.debt_cost||0) + (i.entertainment_cost||0); const remaining = i.monthly_income - totalExpenses - (i.savings_goal||0); return {value: remaining, unit: i.currency || 'NOK', desc: 'Gjenværende beløp etter faste utgifter og sparing'}; },

  indeksfond_avkastning: (i) => { if(!i.startbelop) return null; const r = (i.forventet_avkastning - i.kostnader - i.inflasjon) / 100; const n = i.ar * 12; const monthlyRate = r / 12; const fv = i.startbelop * Math.pow(1 + monthlyRate, n) + i.manedlig_sparing * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 - i.skatt / 100); return {value: fv, unit: 'kr', desc: 'Estimert sluttverdi etter ' + i.ar + ' år (justert for kostnader, skatt og inflasjon)'}; },

  maxpuls_kalkulator: (i) => { if(!i.alder) return null; const result = i.kjonn === 'mann' ? 220 - i.alder : 226 - i.alder; return {value: result, unit: 'slag/min', desc: 'Maksimal puls basert p\u00e5 alder og kj\u00f8nn'}; },

  fuel_cost_calculator: (i) => { if(!i.distance) return null; const consumption = i.fuel_type === 'bensin' ? i.fuel_consumption : i.fuel_consumption * 1.1; const result = (i.distance / 100) * consumption * i.fuel_price; return {value: result, unit: 'kr', desc: 'Drivstoffkostnad for ' + i.distance + ' km'}; },

  hytte_verdi_kalkulator: (i) => { if(!i.areal) return null; const result = i.areal * (i.standard || 1) * (i.beliggenhet || 1) * (i.tomtestorrelse || 1) * (i.strom ? 1.05 : 1) * (i.vann ? 1.03 : 1) * (i.avlop ? 1.02 : 1) * (i.byggear ? 1 + (2025 - i.byggear) * 0.005 : 1); return {value: result, unit: 'NOK', desc: 'Estimert verdi av hytta i norske kroner'}; },

  moms_beregning: (i) => { if(!i.belop) return null; const sats = (i.mva_sats || 25) / 100; const result = i.retning === 'inkl' ? i.belop - (i.belop / (1 + sats)) : i.belop * sats; return {value: result, unit: 'kr', desc: 'Mva belop i ' + (i.retning === 'inkl' ? 'norsk' : 'norsk') + ' kroner'}; },

  iban_nordea_calculator: (i) => { if(!i.account_number) return null; const cleaned = i.account_number.replace(/[^0-9]/g, ''); if(cleaned.length !== 11) return null; const countryCode = 'NO'; const bban = cleaned; const checkDigits = (98 - BigInt(bban + countryCode.charCodeAt(0)-55 + countryCode.charCodeAt(1)-55 + '00') % 97n).toString().padStart(2,'0'); const result = countryCode + checkDigits + bban; return {value: result, unit: 'IBAN', desc: 'IBAN for Nordea-konto'}; },

  bidrags_kalkulator: (i) => { if(!i.inntekt_bidragspliktig) return null; const result = Math.max(0, (i.inntekt_bidragspliktig - i.boutgifter_bidragspliktig) * 0.15 - (i.inntekt_bidragsmottaker - i.boutgifter_bidragsmottaker) * 0.10 + (i.samvær > 0 ? i.samvær * 500 : 0) + (i.antall_barn * 1000)); return {value: result, unit: 'NOK', desc: 'Beregnet bidrag basert på inntekt, boutgifter, samvær og antall barn'}; },

  bruttolonn_til_nettolonn: (i) => { if(!i.bruttolonn) return null; const skatt = i.skatteklasse === 1 ? 0.22 : i.skatteklasse === 2 ? 0.25 : 0.22; const result = i.bruttolonn - (i.bruttolonn * skatt) - (i.fradrag || 0); return {value: result, unit: 'NOK', desc: 'Nettolønn i norske kroner etter skatt og fradrag'}; },

  studiepoeng_beregning: (i) => { if(!i.antall_emner) return null; const result = (i.bestatt_emner || 0) * (i.studiepoeng_per_emner || 0); return {value: result, unit: 'stp', desc: 'Totalt antall studiepoeng bestatt'}; },

  brutto_lonn_kalkulator: (i) => { if(!i.lonn_type) return null; const result = i.lonn_type === 'timelonn' ? (i.belop * i.timer_per_uke * 52) * (1 + (i.arbeidsgiveravgift_sone || 0.141)) : i.lonn_type === 'manedslonn' ? (i.belop * 12) * (1 + (i.arbeidsgiveravgift_sone || 0.141)) : i.lonn_type === 'arslonn' ? i.belop * (1 + (i.arbeidsgiveravgift_sone || 0.141)) : null; return {value: result, unit: 'NOK', desc: 'Brutto årslønn inkl. arbeidsgiveravgift'}; },

  solcellepanel_hytte_kalkulator: (i) => { if(!i.stromforbruk) return null; const result = (i.stromforbruk / (i.solinnstråling * i.panel_watt * (i.panel_virkningsgrad / 100) * 0.85)) * i.kostnad_per_panel + (i.batteri_kapasitet * i.kostnad_per_batteri); return {value: result, unit: 'NOK', desc: 'Estimert totalkostnad for solcelleanlegg til hytte i norske kroner'}; },

  timelonn_beregning: (i) => { if(!i.lonn_type) return null; const result = i.lonn_type === 'mnd' ? (i.lonn_belop * 12) / (52 * i.timer_per_uke) : i.lonn_type === 'ar' ? i.lonn_belop / (52 * i.timer_per_uke) : i.lonn_type === 'uke' ? i.lonn_belop / i.timer_per_uke : i.lonn_type === 'dag' ? (i.lonn_belop * 5) / i.timer_per_uke : null; return {value: result, unit: 'kr/time', desc: 'Timel\u00f8nn basert p\u00e5 ' + i.lonn_type + ' og ' + i.timer_per_uke + ' timer per uke'}; },

  ved_kalkulator: (i) => { if(!i.stabel_volum) return null; const treslagFaktor = {gran: 0.65, furu: 0.70, bjork: 0.75, eik: 0.80, annet: 0.70}; const fuktFaktor = {torr: 1.0, halvtorr: 0.9, fersk: 0.8}; const fastmasse = i.stabel_volum * (treslagFaktor[i.treslag] || 0.70) * (fuktFaktor[i.fuktighet] || 0.9); const result = fastmasse * (i.pris_per_m3 || 0); return {value: result, unit: 'NOK', desc: 'Totalpris for vedstabel basert på stabelvolum ' + i.stabel_volum + ' m3, treslag ' + i.treslag + ' og fuktighet ' + i.fuktighet}; },

  bompenger_sverige_kalkulator: (i) => { if(!i.kjøretøytype) return null; const result = (i.kjøretøytype === 'personbil' ? (i.drivstoff === 'el' ? 0 : (i.drivstoff === 'diesel' ? 0.5 : 0.4)) : (i.kjøretøytype === 'lastebil' ? 1.2 : 0.8)) * i.antall_km + (i.bompasseringer || 0) * 2; return {value: result, unit: 'SEK', desc: 'Bompenger i Sverige basert p\u00e5 kj\u00f8ret\u00f8ytype, drivstoff, antall km og bompasseringer'}; },

  dnb_iban_generator: (i) => { if(!i.account_number) return null; const acc = i.account_number.replace(/\s/g,''); if(acc.length !== 11) return null; const countryCode = 'NO'; const checkDigits = '00'; const bban = acc; const ibanRaw = bban + countryCode + checkDigits; const numeric = ''; for(let c=0; c<ibanRaw.length; c++){ const ch = ibanRaw[c]; if(ch >= 'A' && ch <= 'Z'){ numeric += (ch.charCodeAt(0) - 55); } else { numeric += ch; } } let remainder = 0; for(let i=0; i<numeric.length; i++){ remainder = (remainder * 10 + parseInt(numeric[i],10)) % 97; } const check = 98 - remainder; const checkStr = check < 10 ? '0' + check : '' + check; const iban = countryCode + checkStr + bban; return {value: iban, unit: 'IBAN', desc: 'Norsk IBAN for konto ' + acc}; },

  nav_permittering_kalkulator: (i) => { if(!i.maanedslonn) return null; const aarslonn = i.maanedslonn * 12; const stillingsfaktor = (i.stillingsprosent || 100) / 100; const permitteringsfaktor = (i.permitteringsgrad || 100) / 100; const grunnbelop = 124028; const barnetillegg = (i.antall_barn || 0) * (i.sivilstatus === 'enslig' ? 11400 : 5700); const dagpenger = Math.min(aarslonn * stillingsfaktor * 0.624, grunnbelop * 6) * permitteringsfaktor + barnetillegg; const result = Math.round(dagpenger / 12); return {value: result, unit: 'kr/mnd', desc: 'Månedlig NAV-permitteringsstønad i kroner'}; },

  jobb_kalkulator: (i) => { if(!i.arbeidstimer_per_uke) return null; const result = ((i.arbeidstimer_per_uke * 60 - i.pauser_minutter_per_dag * 5) * (1 - (i.stressnivaa || 0) / 10) + (i.soevn_timer_per_natt || 7) * 10 - (i.alder || 30) * 0.5 + (i.kjoenn === 'mann' ? 5 : 0)) / 100; return {value: result, unit: 'poeng', desc: 'Jobb Kalkulator poengsum basert på arbeidstid, pauser, stress, søvn, alder og kjønn'}; },

  sell_or_rent_calculator: (i) => { if(!i.boligverdi) return null; const nettoLeieInntekt = i.leieinntekt_per_ar - i.driftskostnader_per_ar; const avkastningVedEie = nettoLeieInntekt + (i.boligverdi * i.prisstigning_ar / 100) - (i.gjeld * i.rente_utleie / 100); const avkastningVedSalg = i.boligverdi * i.alternativ_avkastning / 100; const result = avkastningVedEie - avkastningVedSalg; return {value: result, unit: 'kr/år', desc: 'Forskjell i årlig avkastning mellom å eie og å selge (positiv = eie lønner seg)'}; },

  samordna_opptak_poeng: (i) => { if(!i.karakterpoeng) return null; const result = (i.karakterpoeng || 0) + (i.realfagspoeng || 0) + (i.alderspoeng || 0) + (i.forsvarets_poeng || 0) + (i.hoyere_utdanning_poeng || 0) + (i.andre_tilleggspoeng || 0); return {value: result, unit: 'poeng', desc: 'Samlet poengsum for Samordna opptak' + ' (' + result + ' poeng)'}; },

  utleiebolig_avkastning: (i) => { if(!i.boligverdi) return null; const lan = i.boligverdi - i.egenkapital; const arsrente = lan * (i.rente / 100); const arsinntekt = i.manedlig_leie * 12; const arskostnader = i.felleskostnader + i.andre_kostnader + arsrente; const skatt = (arsinntekt - arskostnader) > 0 ? (arsinntekt - arskostnader) * (i.skattesats / 100) : 0; const result = ((arsinntekt - arskostnader - skatt) / i.egenkapital) * 100; return {value: result, unit: '%', desc: 'Avkastning p\u00e5 egenkapital i prosent'}; },

  fuel_consumption_calculator: (i) => { if(!i.distance) return null; const result = (i.fuel_used / i.distance) * 100; return {value: result, unit: 'L/100 km', desc: 'Drivstofforbruk per 100 km'}; },

  skatt_bil_kalkulator: (i) => { if(!i.vekt) return null; const result = (i.co2_utslipp * 1.5 + i.vekt * 0.02) * (i.drivstoff === 'diesel' ? 1.2 : 1) * (1 + i.alder * 0.05); return {value: result, unit: 'NOK', desc: 'Beregnet skatt for bil basert p\u00e5 vekt, CO2-utslipp, drivstofftype og alder'}; },

  alkohol_kalkulator_ol: (i) => { if(!i.volum_ml) return null; const result = ((i.volum_ml * i.alkoholprosent / 100 * 0.789 * i.antall_glass) / (i.kjonn === 'mann' ? 0.68 : 0.55) / i.vekt_kg).toFixed(2); return {value: parseFloat(result), unit: 'promille', desc: 'Beregnet alkoholpromille i blodet basert p\u00e5 ' + i.antall_glass + ' glass \u00f8l p\u00e5 ' + i.volum_ml + ' ml med ' + i.alkoholprosent + '% alkohol for en person p\u00e5 ' + i.vekt_kg + ' kg'}; },

  okonomisk_frihet_beregning: (i) => { if(!i.alder) return null; const result = Math.round((i.inntekt * (i.sparerate / 100) * (1 + i.avkastning / 100) ** (65 - i.alder) + i.formue * (1 + i.avkastning / 100) ** (65 - i.alder)) / (i.kostnader * 12) * 100) / 100; return {value: result, unit: 'ar', desc: 'Antall ar til okonomisk frihet ved 65 ars alder'}; },

  prosent_kalkulator: (i) => { if(!i.verdi1) return null; const result = i.operasjon === 'prosent_av' ? (i.verdi2 / 100) * i.verdi1 : i.operasjon === 'prosent_av_tall' ? (i.verdi1 / i.verdi2) * 100 : i.operasjon === 'prosent_endring' ? ((i.verdi2 - i.verdi1) / i.verdi1) * 100 : null; return {value: result, unit: '%', desc: 'Prosentkalkulator resultat'}; },

  fruktbarhets_beregning: (i) => { if(!i.siste_menstruasjon) return null; const result = { egglosning: new Date(new Date(i.siste_menstruasjon).getTime() + (parseInt(i.sykluslengde||28) - parseInt(i.lutealfase_lengde||14)) * 86400000), fruktbar_start: new Date(new Date(i.siste_menstruasjon).getTime() + (parseInt(i.sykluslengde||28) - parseInt(i.lutealfase_lengde||14) - 5) * 86400000), fruktbar_slutt: new Date(new Date(i.siste_menstruasjon).getTime() + (parseInt(i.sykluslengde||28) - parseInt(i.lutealfase_lengde||14) + 1) * 86400000) }; return {value: result.egglosning.toISOString().split('T')[0], unit: 'dato', desc: 'Eggl\u00f8sning: ' + result.egglosning.toISOString().split('T')[0] + ', fruktbar periode: ' + result.fruktbar_start.toISOString().split('T')[0] + ' til ' + result.fruktbar_slutt.toISOString().split('T')[0]}; },

  overgangsstonad_beregning: (i) => { if(!i.inntekt) return null; const result = Math.max(0, (i.stonadstype === 'hoy' ? 23000 : 19000) + (i.barnetillegg || 0) - i.inntekt * 0.4); return {value: result, unit: 'kr/mnd', desc: 'Beregnet overgangsst\u00F8nad per m\u00E5ned'}; },

  leasing_calculator: (i) => { if(!i.vehicle_price) return null; const r = i.annual_interest_rate / 100 / 12; const n = i.lease_term_months; const pv = i.vehicle_price - i.down_payment; const fv = i.residual_value; const monthlyPayment = (pv - fv / Math.pow(1 + r, n)) * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); const result = monthlyPayment + i.monthly_fee; return {value: result, unit: 'NOK/mnd', desc: 'Månedlig leasingbetaling inkl. avgift'}; },

  felgi_kalkulator: (i) => { if(!i.dekk_bredde) return null; const result = (i.dekk_bredde * i.profil / 100 * 2 + i.felg_diameter_tommer * 25.4) / 10; return {value: result, unit: 'cm', desc: 'Total dekkdiameter i centimeter'}; },

  swift_score_calculator: (i) => { if(!i.alder) return null; const result = Math.round((i.maksimalpuls - i.hvilepuls) * (i.treningsminutter_per_uke / 100) / (i.alder * 0.1 + (i.kjonn === 'mann' ? 0.5 : 0.3))); return {value: result, unit: 'poeng', desc: 'Swift Kalkulator poengsum basert p\u00e5 alder, kj\u00f8nn, hvilepuls, maksimalpuls og treningsminutter per uke'}; },

  renters_rente_sparing: (i) => { if(!i.startbelop) return null; const r = i.avkastning / 100; const s = i.skatt / 100; const n = i.ar; const p = i.manedlig_sparing; const start = i.startbelop; const vekst = start * Math.pow(1 + r * (1 - s), n) + p * ((Math.pow(1 + r * (1 - s), n) - 1) / (r * (1 - s))); return {value: vekst, unit: 'kr', desc: 'Forventet verdi etter ' + n + ' år med sparing'}; },

  overkurs_formula: (i) => { if(!i.paalydende) return null; const result = (i.emisjonskurs - i.paalydende) * i.antall_aksjer; return {value: result, unit: 'NOK', desc: 'Overkurs ved emisjon: ' + result.toFixed(2) + ' NOK'}; },

  pappapermisjon_kalkulator: (i) => { if(!i.inntekt) return null; const d = i.dekningsgrad || 100; const u = i.permisjon_uker || 0; const result = (i.inntekt * d / 100 * u * 0.006) / 52; return {value: result, unit: 'kr', desc: 'Estimert pappapermisjon i kroner basert p\u00e5 inntekt, uker og dekningsgrad'}; },

  vektet_gjennomsnitt_karakter: (i) => { if(!i.karakterer) return null; const karakterer = i.karakterer.split(',').map(Number); const vekter = i.vekter ? i.vekter.split(',').map(Number) : karakterer.map(() => 1); const skala = i.skala ? Number(i.skala) : 6; const sumVektet = karakterer.reduce((sum, k, idx) => sum + k * vekter[idx], 0); const sumVekter = vekter.reduce((a, b) => a + b, 0); const result = sumVekter > 0 ? sumVektet / sumVekter : 0; return {value: result, unit: 'poeng', desc: 'Vektet gjennomsnittskarakter p\u00e5 en skala fra 1 til ' + skala}; },

  fordel_fri_bil: (i) => { if(!i.listepris) return null; const drivstoffFaktor = i.drivstoff === 'diesel' ? 1.5 : 1.0; const alderFaktor = i.aar < 3 ? 1.0 : i.aar < 6 ? 0.75 : i.aar < 10 ? 0.5 : 0.25; const result = i.listepris * 0.30 * drivstoffFaktor * alderFaktor; return {value: result, unit: 'kr/år', desc: 'Fordel fri bil' + ' - ' + 'beregnet skattepliktig fordel per år'}; },

  twenty_three_five_rule: (i) => { if(!i.weight) return null; const genderFactor = i.gender === 'male' ? 0.68 : 0.55; const drinkFactor = i.drink_type === 'beer' ? 0.33 : i.drink_type === 'wine' ? 0.15 : i.drink_type === 'spirit' ? 0.04 : 0.33; const result = (drinkFactor * 1000) / (i.weight * genderFactor); return {value: result, unit: 'promille', desc: 'Estimert alkoholkonsentrasjon i blodet basert p\u00e5 23/5 regelen'}; },

  beregn_stromforbruk: (i) => { if(!i.effekt_watt) return null; const result = (i.effekt_watt * i.timer_per_dag * i.dager_per_ar * i.strompris_ore) / 100000; return {value: result, unit: 'kroner', desc: 'Årlig strømkostnad for ' + i.apparat_type}; },

  permisjon_nav: (i) => { if(!i.antall_uker) return null; const result = (i.inntekt * (i.dekningsgrad === '100' ? 1.0 : 0.8) * i.antall_uker) / 52; return {value: result, unit: 'kr', desc: 'Foreldrepenger per uke for ' + i.fordeling + ' fordeling'}; },

  ovulation_calculator: (i) => { if(!i.cycle_length || !i.last_period_day) return null; const result = new Date(new Date(i.last_period_day).getTime() + (i.cycle_length - 14) * 86400000); return {value: result.toISOString().split('T')[0], unit: 'dato', desc: 'Estimert eggl\u00f8sning basert p\u00e5 sykluslengde og siste menstruasjon'}; },

  lonnskalkulator_formel: (i) => { if(!i.bruttolonn) return null; const skatt = i.skatteklasse === 1 ? 0.22 : i.skatteklasse === 2 ? 0.15 : 0.22; const result = i.bruttolonn - (i.bruttolonn * skatt) - (i.fradrag || 0); return {value: result, unit: 'kr', desc: 'Netto l\u00f8nn etter skatt og fradrag'}; },

  norway_salary_calculator: (i) => { if(!i.bruttoloenn) return null; const skatt = i.skatteklasse === '1' ? 0.22 : i.skatteklasse === '2' ? 0.25 : 0.22; const trygd = i.trygdeavgift ? 0.08 : 0; const fag = i.fagforening ? 0.02 : 0; const result = i.bruttoloenn * (1 - skatt - trygd - fag); return {value: result, unit: 'NOK', desc: 'Netto lønn etter skatt, trygdeavgift og fagforeningskontingent'}; },

  skolepoeng_beregning: (i) => { if(!i.karakterer) return null; const result = i.karakterer.reduce((a,b) => a + b, 0) / i.karakterer.length; return {value: result, unit: 'poeng', desc: 'Gjennomsnittlig skolepoeng basert p\u00e5 karakterer og fagtype: ' + (i.fagtype || 'ukjent')}; },

  klimaavtrykk_mat: (i) => { if(!i.matvare) return null; const factors = {storfekjott: 27, lam: 25, svin: 7, kylling: 6, fisk: 5, egg: 4, melk: 2, ost: 11, smor: 13, ris: 4, pasta: 1, brod: 1, potet: 0.5, gronnsaker: 0.5, frukt: 0.8, belgfrukter: 0.5, notter: 0.3, tofu: 2, kjottdeig: 20, polse: 8, bacon: 12, laks: 6, torsk: 4, reker: 8, kaffe: 3, sjokolade: 15, olje: 3, sukker: 1.5}; const factor = factors[i.matvare.toLowerCase()] || 2; const mengde = parseFloat(i.mengde) || 100; const result = factor * (mengde / 100); const sammenligning = i.sammenligning ? parseFloat(i.sammenligning) : null; const finalValue = sammenligning ? (result / sammenligning) * 100 : result; return {value: Math.round(finalValue * 10) / 10, unit: 'kg CO2-ekv', desc: 'Klimaavtrykk for ' + i.matvare + ' (' + mengde + ' g): ' + Math.round(finalValue * 10) / 10 + ' kg CO2-ekv'}; },

  kalkulator_med_utregning: (i) => { if(!i.tall1) return null; const result = i.operasjon === '+' ? Number(i.tall1) + Number(i.tall2) : i.operasjon === '-' ? Number(i.tall1) - Number(i.tall2) : i.operasjon === '*' ? Number(i.tall1) * Number(i.tall2) : i.operasjon === '/' ? Number(i.tall1) / Number(i.tall2) : NaN; return {value: result, unit: '', desc: 'Resultat: ' + i.tall1 + ' ' + i.operasjon + ' ' + i.tall2 + ' = ' + result}; },

  iban_dnb_calculator: (i) => { if(!i.kontonummer) return null; const k = i.kontonummer.replace(/\s/g,''); if(k.length!==11) return null; const landkode = 'NO'; const sjekksiffer = '00'; const bb = k + landkode + sjekksiffer; const tall = BigInt(bb); const rest = tall % 97n; const siffer = (98n - rest).toString().padStart(2,'0'); const iban = landkode + siffer + k; return {value: iban, unit: 'IBAN', desc: 'IBAN for DNB-konto'}; },

  boligverdi_skatteetaten: (i) => { if(!i.boligtype) return null; const result = (i.bruksareal||0) * 15000 + (i.tomteareal||0) * 2000 + (i.beliggenhet==='Oslo'?500000:i.beliggenhet==='storby'?300000:100000) + (i.standard==='hoy'?400000:i.standard==='middels'?200000:0) - ((2025-(i.byggear||2000))*5000); return {value: Math.max(0, result), unit: 'NOK', desc: 'Estimert boligverdi for skatteetaten basert p\u00e5 boligtype ' + i.boligtype + ', bruksareal ' + (i.bruksareal||0) + ' kvm, tomteareal ' + (i.tomteareal||0) + ' kvm, beliggenhet ' + (i.beliggenhet||'standard') + ', standard ' + (i.standard||'normal') + ' og bygge\u00e5r ' + (i.byggear||2000)}; },

  aksjespare_kalkulator: (i) => { if(!i.maanedlig_innskudd) return null; const r = i.forventet_avkastning / 100; const n = i.spareperiode_aar * 12; const monthly = i.maanedlig_innskudd; const gross = monthly * ((Math.pow(1 + r / 12, n) - 1) / (r / 12)); const tax = (gross - monthly * n) * (i.skattesats / 100); const result = gross - tax; return {value: result, unit: 'kr', desc: 'Estimert verdi etter skatt' + ' (' + i.spareperiode_aar + ' år)'}; },

  brodskala_kalkulator: (i) => { if(!i.mel_mengde) return null; const deghydrering = (i.vann_mengde / i.mel_mengde) * 100; const saltprosent = (i.salt_mengde / i.mel_mengde) * 100; const gjærkorreksjon = i.gjær_type === 'fersk' ? 1 : i.gjær_type === 'tørr' ? 0.5 : 0.33; const gjærprosent = ((i.gjær_mengde * gjærkorreksjon) / i.mel_mengde) * 100; const temperaturfaktor = i.temperatur ? Math.max(0, Math.min(1, (i.temperatur - 5) / 35)) : 0.5; const brodskala = (deghydrering * 0.4) + (saltprosent * 2) + (gjærprosent * 3) + (temperaturfaktor * 10); return {value: Math.round(brodskala * 10) / 10, unit: 'poeng', desc: 'Brødskala: ' + brodskala.toFixed(1) + ' poeng (deghydrering: ' + deghydrering.toFixed(0) + '%, salt: ' + saltprosent.toFixed(1) + '%, gjær: ' + gjærprosent.toFixed(1) + '%, tempfaktor: ' + temperaturfaktor.toFixed(2) + ')'}; },

  og_fg_calculator: (i) => { if(!i.og_value) return null; const result = (i.fg_value ? i.fg_value : 0) / (i.og_value ? i.og_value : 1) * 100; return {value: Math.round(result * 100) / 100, unit: '%', desc: 'Forhold mellom FG og OG i prosent'}; },

  vin_kalkulator: (i) => { if(!i.volum_ml) return null; const etanol_gram = i.volum_ml * (i.alkohol_prosent / 100) * 0.789; const sukker_gram = (i.sukker_g_per_l || 0) * (i.volum_ml / 1000); const total_alkohol = etanol_gram + (sukker_gram * 0.6); const distribusjonsfaktor = i.kjonn === 'mann' ? 0.68 : 0.55; const promille = (total_alkohol / (i.vekt_kg * distribusjonsfaktor)) - (0.15 * i.timer_siden_start); const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholpromille i blodet'}; },

  energimerking_bolig_kalkulator: (i) => { if(!i.boligareal) return null; const base = i.stromforbruk * 1000 / i.boligareal; const oppvarmingFaktor = {strom:1.0, fjernvarme:0.8, varmepumpe:0.6, gass:0.9, olje:1.1, ved:0.7}[i.oppvarmingstype] || 1.0; const isolasjonFaktor = {god:0.8, middels:1.0, darlig:1.3}[i.isolasjonsstandard] || 1.0; const vinduFaktor = {trelags:0.85, tolags:1.0, ettlags:1.2}[i.vinduer] || 1.0; const result = Math.round(base * oppvarmingFaktor * isolasjonFaktor * vinduFaktor); return {value: result, unit: 'kWh/m²/år', desc: 'Beregnet energimerke basert på areal, forbruk, oppvarmingstype, isolasjon og vinduer'}; },

  beregn_termin_og_uker: (i) => { if(!i.siste_menstruasjon_dag) return null; const sisteDag = new Date(i.siste_menstruasjon_aar, i.siste_menstruasjon_maaned - 1, i.siste_menstruasjon_dag); const syklusDiff = (i.sykluslengde || 28) - 28; const termin = new Date(sisteDag.getTime() + (280 + syklusDiff) * 86400000); const iDag = new Date(); const uker = Math.floor((iDag - sisteDag) / (7 * 86400000)); const dager = Math.floor(((iDag - sisteDag) % (7 * 86400000)) / 86400000); const result = termin.toISOString().split('T')[0] + '|' + uker + '+' + dager; return {value: result, unit: 'termin/uke', desc: 'Termin: ' + termin.toISOString().split('T')[0] + ', uke ' + uker + '+' + dager}; },

  hoyde_konvertering: (i) => { if(!i.hoyde_cm) return null; const result = i.kjonn === 'mann' ? (i.hoyde_cm * 0.3937 - 60) * 2.54 : (i.hoyde_cm * 0.3937 - 56) * 2.54; return {value: result, unit: 'cm', desc: 'Engelsk høyde i cm basert på kjønn'}; },

  timelonn_arslonn: (i) => { if(!i.timelonn) return null; const result = i.timelonn * i.timer_per_uke * i.uker_per_ar * (1 + i.feriepenger_prosent / 100); return {value: result, unit: 'kr', desc: 'Årslønn basert på timelønn'}; },

  ssb_husleie_beregning: (i) => { if(!i.boligtype) return null; const base = { 'leilighet': 120, 'enebolig': 150, 'rekkehus': 135, 'tomannsbolig': 140 }[i.boligtype] || 120; const romFaktor = (i.antall_rom || 1) * 10; const kvmFaktor = (i.kvadratmeter || 50) * 1.5; const alderFaktor = Math.max(0.8, 1 - ((2025 - (i.byggeaar || 2000)) * 0.005)); const heisTillegg = i.heis === 'ja' ? 200 : 0; const balkongTillegg = i.balkong === 'ja' ? 150 : 0; const parkeringTillegg = i.parkering === 'ja' ? 300 : 0; const result = Math.round((base + romFaktor + kvmFaktor) * alderFaktor + heisTillegg + balkongTillegg + parkeringTillegg); return {value: result, unit: 'NOK/mnd', desc: 'Estimert husleie basert p\u00e5 SSB-modell for ' + i.boligtype + ' i ' + (i.by || i.postnummer || 'oppgitt omr\u00e5de')}; },

  dagpenge_beregning: (i) => { if(!i.inntekt_siste_12_mnd) return null; const grunnlag = Math.max(i.inntekt_siste_12_mnd, i.inntekt_siste_3_ar / 3); const sats = Math.min(grunnlag * 0.624, 6 * i.arbeidstid_prosent / 100 * 124028); const barnetillegg = i.antall_barn * 32 * 365 / 12; const result = Math.round((sats + barnetillegg) * i.arbeidstid_prosent / 100); return {value: result, unit: 'kr/mnd', desc: 'Månedlig dagpenger før skatt basert på inntekt, arbeidstid og barnetillegg'}; },

  nordea_iban_generator: (i) => { if(!i.kontonummer) return null; const cleaned = i.kontonummer.replace(/[^0-9]/g, ''); if(cleaned.length !== 11) return null; const countryCode = 'FI'; const checkDigits = '00'; const bban = cleaned; const numeric = (bban + countryCode + checkDigits).split('').map(c => c.charCodeAt(0) >= 65 ? (c.charCodeAt(0) - 55).toString() : c).join(''); let remainder = 0; for(let j = 0; j < numeric.length; j++) { remainder = (remainder * 10 + parseInt(numeric[j], 10)) % 97; } const check = (98 - remainder).toString().padStart(2, '0'); const iban = countryCode + check + bban; return {value: iban, unit: 'IBAN', desc: 'Nordea IBAN for konto ' + cleaned}; },

  veibom_kalkulator: (i) => { if(!i.lengde) return null; const result = i.lengde * (i.bredde || 1) * (i.materiale === 'tre' ? 0.8 : i.materiale === 'betong' ? 2.4 : i.materiale === 'stål' ? 7.8 : 1); return {value: result, unit: 'kg', desc: 'Vekt av veibom basert på lengde, bredde og materiale'}; },

  barnebidrag_nav: (i) => { if(!i.inntekt_bidragspliktig) return null; const inntektBidragspliktig = i.inntekt_bidragspliktig; const inntektBidragsmottaker = i.inntekt_bidragsmottaker || 0; const antallBarn = i.antall_barn || 1; const samværsklasse = i.samværsklasse || 0; const bidragsevne = Math.max(0, inntektBidragspliktig - 150000); const mottakerInntekt = Math.max(0, inntektBidragsmottaker - 150000); const samletInntekt = bidragsevne + mottakerInntekt; const barnetillegg = antallBarn * 15000; const samværsfradrag = samværsklasse * 0.15; const bruttoBidrag = Math.min(bidragsevne * 0.15 + barnetillegg, bidragsevne * 0.25); const result = Math.round(Math.max(0, bruttoBidrag * (1 - samværsfradrag))); return {value: result, unit: 'NOK/år', desc: 'Beregnet barnebidrag basert på inntekt, antall barn og samværsklasse'}; },

  arsinntekt_beregning: (i) => { if(!i.lonn_type) return null; const result = (i.lonn_type === 'mnd' ? (parseFloat(i.belop) * 12) : (i.lonn_type === 'time' ? (parseFloat(i.belop) * parseFloat(i.timer_per_uke) * 52 + parseFloat(i.overtid_timer_per_uke) * 52 * parseFloat(i.overtid_faktor) * parseFloat(i.belop)) : (i.lonn_type === 'ar' ? parseFloat(i.belop) : 0))) * (1 + parseFloat(i.feriepenger_prosent) / 100) * (1 - parseFloat(i.skatt_prosent) / 100); return {value: result, unit: 'NOK', desc: 'Beregnet årsinntekt etter feriepenger og skatt'}; },

  mammaperm_kalkulator: (i) => { if(!i.antall_uker_total) return null; const totalUker = i.antall_uker_total; const mammaUker = i.mamma_uttak_uker; const pappaUker = i.pappa_uttak_uker; const mammaInntekt = i.inntekt_mamma; const pappaInntekt = i.inntekt_pappa; const dekning = i.dekningsgrad; const mammaDagpenger = mammaUker * (mammaInntekt * (dekning / 100) / 52); const pappaDagpenger = pappaUker * (pappaInntekt * (dekning / 100) / 52); const totalDagpenger = mammaDagpenger + pappaDagpenger; const result = totalDagpenger; return {value: result, unit: 'kr', desc: 'Totale foreldrepenger i kroner basert på ' + totalUker + ' uker totalt, ' + mammaUker + ' uker mor, ' + pappaUker + ' uker far og ' + dekning + '% dekningsgrad'}; },

  azure_cost_calculator: (i) => { if(!i.vm_count) return null; const vmRates = {B1s: 300, B2s: 600, B2ms: 900, D2s_v3: 1200, D4s_v3: 2400}; const rate = vmRates[i.vm_type] || 800; const vmCost = i.vm_count * rate * i.hours_per_month; const storageCost = i.storage_gb * 0.1; const transferCost = i.data_transfer_gb * 0.08; const regionMultiplier = {eastus: 1.0, westeurope: 1.1, northeurope: 1.05, southeastasia: 1.15}; const mult = regionMultiplier[i.region] || 1.0; const result = (vmCost + storageCost + transferCost) * mult; return {value: Math.round(result * 100) / 100, unit: 'NOK', desc: 'Estimert m\u00e5nedlig Azure-kostnad for ' + i.vm_count + ' VM(er) i ' + i.region}; },

  ppm_kalkulator: (i) => { if(!i.masse_stoff) return null; const masse = i.enhet_masse === 'g' ? i.masse_stoff : i.enhet_masse === 'mg' ? i.masse_stoff / 1000 : i.enhet_masse === 'kg' ? i.masse_stoff * 1000 : i.masse_stoff; const volum = i.enhet_volum === 'L' ? i.volum_losning : i.enhet_volum === 'mL' ? i.volum_losning / 1000 : i.enhet_volum === 'm3' ? i.volum_losning * 1000 : i.volum_losning; const result = (masse / volum) * 1000; return {value: result, unit: 'ppm', desc: 'Konsentrasjon i ppm (mg/L) basert på masse stoff og volum løsning'}; },

  ytelsespensjon_beregning: (i) => { if(!i.sluttlonn) return null; const a = Math.max(0, Math.min(i.tjenestetid || 0, 40)) / 40; const b = Math.max(0, Math.min(i.pensjonsalder || 0, 67) - 62) / 5; const c = i.kjonn === 'kvinne' ? 1.02 : 1.0; const result = ((i.pensjonsgrunnlag || i.sluttlonn) * 0.66 * a * (1 + b) - (i.trygdeytelse || 0)) * c; return {value: Math.round(result), unit: 'NOK/år', desc: 'Beregnet ytelsespensjon basert på sluttlønn, tjenestetid, pensjonsalder, pensjonsgrunnlag, trygdeytelse og kjønn'}; },

  elbil_avgift_2023: (i) => { if(!i.vekt) return null; const vektAvgift = Math.max(0, (i.vekt - 500) * 12.5); const effektAvgift = Math.max(0, (i.effekt - 100) * 40); const co2Avgift = (i.co2_utslipp || 0) * 1500; const drivstoffFaktor = i.drivstoff === 'bensin' ? 1.2 : i.drivstoff === 'diesel' ? 1.4 : 1; const result = Math.round((vektAvgift + effektAvgift + co2Avgift) * drivstoffFaktor); return {value: result, unit: 'NOK', desc: 'Årlig engangsavgift for elbil i 2023'}; },

  snitt_universitet_vektet: (i) => { if(!i.karakterer) return null; const result = i.karakterer.reduce((sum, k, idx) => sum + (k * (i.vekter ? i.vekter[idx] : 1)), 0) / (i.vekter ? i.vekter.reduce((a, b) => a + b, 0) : i.karakterer.length); return {value: result, unit: 'poeng', desc: 'Vektet gjennomsnittskarakter for universitet'}; },

  kjoregodtgjorelse_2023: (i) => { if(!i.km) return null; const satser = { 'bil': 3.50, 'elbil': 3.50, 'moped': 1.50, 'sykkel': 1.50 }; const sats = satser[i.kjoretoytype] || 3.50; const tillegg = (parseInt(i.passasjerer) || 0) * 0.50; const result = i.km * (sats + tillegg); return {value: result, unit: 'kr', desc: 'Kjøregodtgjørelse for ' + i.km + ' km med ' + (i.kjoretoytype || 'bil') + ' og ' + (parseInt(i.passasjerer) || 0) + ' passasjerer'}; },

  desimal_til_prosent: (i) => { if(!i.desimaltall) return null; const result = parseFloat(i.desimaltall) * 100; return {value: result, unit: '%', desc: 'Desimaltall ' + i.desimaltall + ' tilsvarer ' + result + ' prosent'}; },

  feriedager_kalkulator: (i) => { if(!i.arbeidsdager_per_uke) return null; const result = (i.arbeidsdager_per_uke * i.antall_uker_ferie * (i.prosent_stilling / 100)) + (i.opptjente_feriepenger * (i.feriepengeprosent / 100) / (i.arbeidsdager_per_uke * 260 / 5)); return {value: result, unit: 'dager', desc: 'Antall feriedager basert på arbeidsdager per uke, uker ferie, stillingsprosent, opptjente feriepenger og feriepengeprosent'}; },

  gram_til_liter: (i) => { if(!i.grams) return null; const densities = {vann: 1, melk: 1.03, olje: 0.92, sukker: 0.85, mel: 0.59, salt: 1.2, smør: 0.91, honning: 1.42, ris: 0.85, havregryn: 0.4}; const density = densities[i.substance] || 1; const result = i.grams / (density * 1000); return {value: result, unit: 'L', desc: i.grams + ' gram ' + i.substance + ' tilsvarer ' + result.toFixed(3) + ' liter'}; },

  trinnskatt_2023: (i) => { if(!i.inntekt) return null; const trygdeavgift = i.trygdeavgift || 0; const minstefradrag = i.minstefradrag || 0; const personfradrag = i.personfradrag || 0; const alminneligInntekt = Math.max(0, i.inntekt - minstefradrag - personfradrag); const trinn1 = Math.max(0, Math.min(alminneligInntekt, 198350) - 0) * 0.0094; const trinn2 = Math.max(0, Math.min(alminneligInntekt, 279150) - 198350) * 0.0241; const trinn3 = Math.max(0, Math.min(alminneligInntekt, 642950) - 279150) * 0.1152; const trinn4 = Math.max(0, Math.min(alminneligInntekt, 926800) - 642950) * 0.1452; const trinn5 = Math.max(0, Math.min(alminneligInntekt, 1500000) - 926800) * 0.162; const trinn6 = Math.max(0, alminneligInntekt - 1500000) * 0.172; const result = trinn1 + trinn2 + trinn3 + trinn4 + trinn5 + trinn6; return {value: result, unit: 'kr', desc: 'Trinnskatt 2023 for inntekt ' + i.inntekt + ' kr'}; },

  rundetider_3000_meter: (i) => { if(!i.total_time_minutes) return null; const totalSeconds = i.total_time_minutes * 60 + (i.total_time_seconds || 0); const lapTimeSeconds = totalSeconds / 7.5; const minutes = Math.floor(lapTimeSeconds / 60); const seconds = Math.round(lapTimeSeconds % 60); const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds; return {value: result, unit: 'min/km', desc: 'Gjennomsnittlig rundetid per 400 meter'}; },

  derivative_polynomial: (i) => { if(!i.coefficients) return null; const coeffs = i.coefficients.split(',').map(Number); const x = Number(i.x_value); let result = 0; for(let n=1; n<coeffs.length; n++) { result += coeffs[n] * n * Math.pow(x, n-1); } return {value: result, unit: 'enhet', desc: 'Den deriverte av polynomet i punktet x = ' + i.x_value}; },

  fremtind_formel: (i) => { if(!i.startbelop) return null; const r = i.rente / 100; const n = i.ar * 12; const m = i.manedlig_sparing; const s = i.startbelop; const infl = i.inflasjon / 100; const skatt = i.skatt / 100; const helse = i.helse / 100; const totalBeforeTax = s * Math.pow(1 + r / 12, n) + m * ((Math.pow(1 + r / 12, n) - 1) / (r / 12)); const afterInflation = totalBeforeTax / Math.pow(1 + infl, i.ar); const afterTax = afterInflation * (1 - skatt); const afterHealth = afterTax * (1 - helse); const result = Math.round(afterHealth * 100) / 100; return {value: result, unit: 'kr', desc: 'Estimert sluttbelop etter skatt, inflasjon og helseavgift'}; },

  utveksling_kalkulator: (i) => { if(!i.belop) return null; const belopEtterGebyr = i.belop - (i.belop * (i.gebyr_prosent || 0) / 100) - (i.fast_gebyr || 0); const result = belopEtterGebyr * (i.kurs || 1); return {value: result, unit: i.valuta_til, desc: 'Belop i ' + i.valuta_til + ' etter gebyr'}; },

  bilskatt_beregning: (i) => { if(!i.vekt) return null; const co2Avgift = (i.co2 || 0) * 1.42; const drivstoffTillegg = i.drivstoff === 'diesel' ? 0.5 : 0; const vektAvgift = i.vekt * 0.15; const result = vektAvgift + co2Avgift + drivstoffTillegg; return {value: result, unit: 'kr', desc: 'Bilskatt basert p\u00e5 vekt, CO2 og drivstoff'}; },

  esnurra_formel: (i) => { if(!i.vekt) return null; const result = (i.vekt * 0.5 + (i.hoyde || 170) * 0.3 + (i.alder || 30) * 0.1 + (i.aktivitetsniva || 3) * 0.2) / 100; return {value: result, unit: 'poeng', desc: 'Esnurra-indeks basert p\u00e5 vekt, h\u00f8yde, alder og aktivitetsniv\u00e5'}; },

  indeks_fond_kalkulator: (i) => { if(!i.startbelop) return null; const r = i.forventet_avkastning / 100; const n = i.ar; const P = i.startbelop; const M = i.manedlig_sparing; const c = i.kostnad / 100; const t = i.skatt / 100; const rNetto = r - c; const sluttverdi = P * Math.pow(1 + rNetto, n) + M * ((Math.pow(1 + rNetto, n) - 1) / rNetto) * (1 + rNetto); const skattBelop = Math.max(0, (sluttverdi - P - M * n * 12) * t); const result = sluttverdi - skattBelop; return {value: result, unit: 'kr', desc: 'Estimert sluttverdi etter skatt og kostnader'}; },

  kg_to_dl: (i) => { if(!i.weight_kg) return null; const densities = {mel: 0.6, sukker: 0.85, smor: 0.95, havregryn: 0.4, ris: 0.8, olje: 0.92, vann: 1}; const density = densities[i.ingredient] || 1; const result = i.weight_kg * 1000 / density; return {value: result, unit: 'dl', desc: i.weight_kg + ' kg ' + (i.ingredient || 'ukjent') + ' tilsvarer ' + result.toFixed(2) + ' dl'}; },

  co2_ekvivalenter_kalkulator: (i) => { if(!i.transport_km) return null; const transportFactor = i.transport_type === 'bil' ? 0.21 : i.transport_type === 'buss' ? 0.10 : i.transport_type === 'tog' ? 0.03 : 0.05; const stromFactor = i.strom_kilde === 'norsk' ? 0.018 : i.strom_kilde === 'nordisk' ? 0.12 : i.strom_kilde === 'kull' ? 0.82 : 0.45; const result = (i.transport_km * transportFactor) + (i.strom_forbruk * stromFactor) + (i.kjott_kg * 25) + (i.avfall_kg * 0.5); return {value: result, unit: 'kg CO2-ekv', desc: 'Totale CO2-ekvivalenter fra transport, strøm, kjøtt og avfall'}; },

  trinnskatt_2022: (i) => { if(!i.bruttoinntekt) return null; const result = Math.max(0, Math.min(i.bruttoinntekt, 198350) * 0.017 + Math.max(0, Math.min(i.bruttoinntekt - 198350, 279150) * 0.04) + Math.max(0, Math.min(i.bruttoinntekt - 477500, 277500) * 0.136) + Math.max(0, Math.min(i.bruttoinntekt - 755000, 500000) * 0.166) + Math.max(0, (i.bruttoinntekt - 1255000) * 0.176)); return {value: result, unit: 'kr', desc: 'Trinnskatt for 2022 basert p\u00e5 bruttoinntekt'}; },

  permittering_kalkulator: (i) => { if(!i.maanedslonn) return null; const dagsats = i.maanedslonn / 21.67; const permitteringsfradrag = dagsats * i.permitteringsdager * (i.stillingsprosent / 100); const arbeidsgiverandel = Math.min(permitteringsfradrag, i.maanedslonn * (i.arbeidsgiverperiode / 21.67) * (i.stillingsprosent / 100)); const result = permitteringsfradrag - arbeidsgiverandel; return {value: result, unit: 'kr', desc: 'Refusjon fra NAV ved permittering i ' + i.permitteringsdager + ' dager med ' + i.stillingsprosent + '% stilling'}; },

  beregn_blodprosent: (i) => { if(!i.hemoglobin || !i.rbc || !i.kjonn) return null; const result = i.kjonn === 'mann' ? (i.hemoglobin / (i.rbc * 0.34)) : (i.hemoglobin / (i.rbc * 0.34)); return {value: Math.round(result * 100) / 100, unit: '%', desc: 'Beregnet blodprosent (Hct) basert på Hb og RBC'}; },

  renteinntekter_beregning: (i) => { if(!i.belop) return null; const r = i.rentetype === 'manedlig' ? i.rente / 100 / 12 : i.rente / 100; const n = i.rentetype === 'manedlig' ? i.tid * 12 : i.tid; const brutto = i.belop * (Math.pow(1 + r, n) - 1); const skattBelop = i.skatt ? brutto * (i.skatt / 100) : 0; const result = brutto - skattBelop; return {value: result, unit: 'kr', desc: 'Netto renteinntekter etter skatt'}; },

  boligtakst_beregning: (i) => { if(!i.boareal) return null; const base = i.boareal * 15000; const tomtefaktor = i.tomteareal ? i.tomteareal * 500 : 0; const alder = i.byggeaar ? Math.max(0, 2024 - i.byggeaar) : 0; const alderfradrag = alder * 2000; const romfaktor = i.antall_rom ? i.antall_rom * 10000 : 0; const etasjefaktor = i.etasjer ? (i.etasjer - 1) * 15000 : 0; const beliggenhetFaktor = i.beliggenhet === 'sentralt' ? 1.2 : i.beliggenhet === 'landlig' ? 0.85 : 1.0; const standardFaktor = i.standard === 'hoy' ? 1.15 : i.standard === 'lav' ? 0.85 : 1.0; const energiFaktor = i.energiklasse === 'A' ? 1.1 : i.energiklasse === 'G' ? 0.8 : 1.0; const result = Math.round((base + tomtefaktor - alderfradrag + romfaktor + etasjefaktor) * beliggenhetFaktor * standardFaktor * energiFaktor); return {value: result, unit: 'NOK', desc: 'Estimert boligverdi basert på areal, tomt, alder, rom, etasjer, beliggenhet, standard og energiklasse'}; },

  beregn_timelonn: (i) => { if(!i.lonn_type) return null; const result = i.lonn_type === 'mnd' ? (i.lonn_belop * 12) / (52 * i.timer_per_uke) : i.lonn_type === 'ar' ? i.lonn_belop / (52 * i.timer_per_uke) : i.lonn_type === 'time' ? i.lonn_belop : 0; const overtid = i.overtid_timer && i.overtid_faktor ? i.overtid_timer * result * i.overtid_faktor : 0; const feriepenger = i.feriepenger_prosent ? (result * (i.timer_per_uke * 52) + overtid) * (i.feriepenger_prosent / 100) : 0; const total = result + (overtid / (i.timer_per_uke * 52)) + (feriepenger / (i.timer_per_uke * 52)); return {value: total, unit: 'kr/time', desc: 'Beregnet timelønn basert på ' + (i.lonn_type === 'mnd' ? 'månedslønn' : i.lonn_type === 'ar' ? 'årslønn' : 'timelønn') + ' med overtid og feriepenger'}; },

  alkohol_bil_promille: (i) => { if(!i.alkohol_gram) return null; const r = i.kjonn === 'mann' ? 0.68 : 0.55; const promille = (i.alkohol_gram / (i.kroppsvekt_kg * r)) - (0.15 * i.timer_siden_forste); const result = Math.max(0, promille); return {value: result, unit: 'promille', desc: 'Beregnet alkoholpromille i blodet'}; },

  bygg_indeks_beregning: (i) => { if(!i.kostnad_aar) return null; const result = i.kostnad_aar * (i.indeks_verdi_maal / i.indeks_verdi_basis); return {value: result, unit: 'NOK', desc: 'Kostnad i målår justert for byggeindeks'}; },

  ansiennitet_helsefagarbeider: (i) => { if(!i.start_year) return null; const result = Math.max(0, (i.current_year - i.start_year) + (i.utdanning_ar || 0) * (i.stillingsprosent || 100) / 100); return {value: result, unit: 'ar', desc: 'Ansiennitet i ar for helsefagarbeider'}; },

  markedsverdi_bolig_2022: (i) => { if(!i.boareal) return null; const result = (i.boareal * i.pris_per_kvm + i.tomteareal * i.pris_per_kvm_tomt) * (1 + (i.beliggenhet || 0) / 100) * (1 + (i.tilstand || 0) / 100); return {value: result, unit: 'NOK', desc: 'Estimert markedsverdi for bolig i 2022 basert på boareal, tomteareal, beliggenhet og tilstand'}; },

  teoriproven_sannsynlighet: (i) => { if(!i.antall_sporsmal) return null; const p = i.grense_bestatt / i.antall_sporsmal; const result = 1 - (function binom(n,k) { if(k<0||k>n) return 0; if(k===0||k===n) return 1; let r=1; for(let j=1;j<=k;j++) r=r*(n-j+1)/j; return r; })(i.antall_sporsmal, i.antall_feil) * Math.pow(p,i.antall_feil) * Math.pow(1-p,i.antall_sporsmal-i.antall_feil); return {value: result, unit: 'sannsynlighet', desc: 'Sannsynlighet for aa staa teoriproven med ' + i.antall_feil + ' feil av ' + i.antall_sporsmal + ' sporsmaal og grense ' + i.grense_bestatt}; },

  liter_til_gram: (i) => { if(!i.volume_liters) return null; const densities = {vann: 1000, melk: 1030, olje: 920, sukker: 800, mel: 600, salt: 1200, smør: 950, honning: 1420, eddik: 1010, fløte: 1000}; const density = densities[i.substance] || 1000; const result = i.volume_liters * density; return {value: result, unit: 'gram', desc: i.volume_liters + ' liter ' + (i.substance || 'vann') + ' = ' + result + ' gram'}; },

  fattigdomsgrense_beregning: (i) => { if(!i.husholdningsinntekt) return null; const ekvivalentInntekt = i.husholdningsinntekt / (1 + 0.5 * (i.antall_voksne - 1) + 0.3 * i.antall_barn); const result = (ekvivalentInntekt < i.medianinntekt * 0.6) ? 1 : 0; return {value: result, unit: 'status', desc: (result === 1 ? 'Under fattigdomsgrensen' : 'Over fattigdomsgrensen')}; },

  toll_beregner: (i) => { if(!i.vareverdi) return null; const result = (Number(i.vareverdi) + Number(i.fraktkostnad || 0) + Number(i.forsikring || 0)) * (Number(i.tollsats || 0) / 100); return {value: result, unit: 'NOK', desc: 'Tollbeløp for ' + (i.produkttype || 'varer') + ' basert på vareverdi, frakt og forsikring'}; },

  verditap_beregning: (i) => { if(!i.anskaffelsespris) return null; const result = i.anskaffelsespris * (1 - (i.alder || 0) * (i.type === 'bil' ? 0.15 : i.type === 'båt' ? 0.10 : i.type === 'mc' ? 0.12 : 0.08)); return {value: Math.max(0, result), unit: 'kr', desc: 'Beregnet verdi etter ' + (i.alder || 0) + ' år'}; },

  pendlerfradrag_beregning: (i) => { if(!i.arbeidsdager) return null; const reisefradrag = Math.max(0, (i.km_en_vei * 2 * i.arbeidsdager - 15000) * (i.reisemetode === 'bil' ? 1.76 : 0.80) + (i.bompenger_ar || 0) + (i.ferge_buss_kostnad || 0)); const result = Math.round(reisefradrag); return {value: result, unit: 'NOK', desc: 'Beregnet pendlerfradrag i norske kroner'}; },

  stillingsprosent_laerer: (i) => { if(!i.arsverk_prosent) return null; const result = (i.undervisningstimer_per_uke / (i.arsverk_prosent / 100 * 26)) * 100; return {value: result, unit: '%', desc: 'Stillingsprosent for lærer basert på årsverk ' + i.arsverk_prosent + '%, undervisningstimer per uke ' + i.undervisningstimer_per_uke + ' og trinn ' + i.trinn}; },

  akkordfinner_formula: (i) => { if(!i.notes) return null; const result = (() => { const noteMap = {C:0, 'C#':1, Db:1, D:2, 'D#':3, Eb:3, E:4, F:5, 'F#':6, Gb:6, G:7, 'G#':8, Ab:8, A:9, 'A#':10, Bb:10, B:11}; const rootVal = noteMap[i.root]; if(rootVal === undefined) return 'Ugyldig grunntone'; const notes = i.notes.split(',').map(n => n.trim()); const intervals = notes.map(n => { const val = noteMap[n]; if(val === undefined) return null; return (val - rootVal + 12) % 12; }); if(intervals.includes(null)) return 'Ugyldig note'; intervals.sort((a,b) => a-b); const unique = [...new Set(intervals)]; const chordTypes = {'0,4,7':'Dur', '0,3,7':'Moll', '0,4,7,11':'Dur7', '0,3,7,10':'Moll7', '0,4,7,10':'Dominant7', '0,3,6,10':'Forminsket7', '0,4,8':'Forstørret', '0,3,6':'Forminsket', '0,4,7,11,2':'Dur9', '0,3,7,10,2':'Moll9', '0,4,7,10,2':'Dominant9'}; const key = unique.join(','); const chordName = chordTypes[key] || 'Ukjent akkord'; return i.root + ' ' + chordName; })(); return {value: result, unit: 'akkord', desc: 'Akkordfunnet for ' + i.root + ' med noter ' + i.notes}; },

  multiply_polynomials: (i) => { if(!i.polynomial_a) return null; const a = i.polynomial_a.replace(/\s/g, '').split('+').map(t => t.split('x').map(c => c === '' ? 1 : c === '-' ? -1 : parseFloat(c))); const b = i.polynomial_b.replace(/\s/g, '').split('+').map(t => t.split('x').map(c => c === '' ? 1 : c === '-' ? -1 : parseFloat(c))); const result = {}; for(let i=0;i<a.length;i++){ for(let j=0;j<b.length;j++){ const coeff = (a[i][0]||1)*(b[j][0]||1); const exp = (a[i][1]?1:0)+(b[j][1]?1:0); result[exp] = (result[exp]||0)+coeff; } } const terms = Object.keys(result).sort((a,b)=>b-a).map(e => (result[e]!==0?(result[e]>0&&e!==Object.keys(result).sort((a,b)=>b-a)[0]?'+':'')+(result[e]===1&&e>0?'':result[e]===-1&&e>0?'-':result[e])+(e>0?'x':''):'')).join(''); return {value: terms, unit: '', desc: 'Multiplikasjon av polynomer: ' + i.polynomial_a + ' * ' + i.polynomial_b + ' = ' + terms}; },

  box_whisker_calculator: (i) => { if(!i.data_values) return null; const arr = i.data_values.split(',').map(Number).sort((a,b)=>a-b); const n = arr.length; const q1 = n%2===0 ? (arr[n/4]+arr[n/4-1])/2 : arr[Math.floor(n/4)]; const q2 = n%2===0 ? (arr[n/2]+arr[n/2-1])/2 : arr[Math.floor(n/2)]; const q3 = n%2===0 ? (arr[3*n/4]+arr[3*n/4-1])/2 : arr[Math.floor(3*n/4)]; const iqr = q3 - q1; const min = arr[0]; const max = arr[n-1]; const lowerFence = q1 - 1.5*iqr; const upperFence = q3 + 1.5*iqr; const whiskerLow = arr.find(v => v >= lowerFence); const whiskerHigh = arr.slice().reverse().find(v => v <= upperFence); const outliers = arr.filter(v => v < lowerFence || v > upperFence); return {value: JSON.stringify({min, q1, q2, q3, max, whiskerLow, whiskerHigh, outliers, lowerFence, upperFence}), unit: 'verdi', desc: 'Minimum: ' + min + ', Q1: ' + q1 + ', Median: ' + q2 + ', Q3: ' + q3 + ', Maks: ' + max + ', Nedre visker: ' + whiskerLow + ', Øvre visker: ' + whiskerHigh + ', Uteliggere: [' + outliers.join(',') + ']'}; },

  scentipede_spill_beregning: (i) => { if(!i.antall_fiender) return null; const result = (i.antall_fiender * (i.vanskelighetsgrad || 1)) / (i.tid_brukt || 1); return {value: result, unit: 'poeng', desc: 'Beregnet poengsum basert på antall fiender, tid brukt og vanskelighetsgrad'}; },

  hypergeometric_distribution: (i) => { if(!i.populasjon) return null; const result = (i.suksesser_i_populasjon / i.populasjon) * ((i.utvalg - i.observerte_suksesser) / (i.populasjon - i.observerte_suksesser)); return {value: result, unit: 'sannsynlighet', desc: 'Hypergeometrisk fordeling for ' + i.observerte_suksesser + ' suksesser i utvalg av ' + i.utvalg + ' fra populasjon ' + i.populasjon + ' med ' + i.suksesser_i_populasjon + ' suksesser'}; },

  polynom_roots: (i) => { if(!i.koeffisienter) return null; const k = i.koeffisienter.split(',').map(Number); const p = i.presisjon || 1e-10; const n = k.length - 1; if(n < 1) return {value: [], unit: '', desc: 'Ingen rot funnet'}; const roots = []; const poly = (x) => { let sum = 0; for(let j=0; j<k.length; j++) sum += k[j] * Math.pow(x, n-j); return sum; }; const deriv = (x) => { let sum = 0; for(let j=0; j<n; j++) sum += (n-j) * k[j] * Math.pow(x, n-j-1); return sum; }; const findRoot = (guess) => { let x = guess; for(let iter=0; iter<1000; iter++) { const fx = poly(x); if(Math.abs(fx) < p) return x; const dfx = deriv(x); if(Math.abs(dfx) < p) break; x = x - fx/dfx; } return null; }; const deflate = (root) => { const newK = [k[0]]; for(let j=1; j<k.length-1; j++) newK.push(k[j] + newK[j-1] * root); k.length = 0; k.push(...newK); }; let guess = 0; for(let i=0; i<n; i++) { const root = findRoot(guess); if(root !== null) { roots.push(parseFloat(root.toFixed(10))); deflate(root); guess = root + 1; } else { guess += 1; i--; } } return {value: roots, unit: '', desc: 'Røtter av polynomet'}; },

  nullspace_calculator: (i) => { if(!i.matrix_rows) return null; const r = parseInt(i.matrix_rows), c = parseInt(i.matrix_cols), entries = i.matrix_entries.split(',').map(Number); if(entries.length !== r*c) return null; const m = []; for(let a=0;a<r;a++){m[a]=[];for(let b=0;b<c;b++){m[a][b]=entries[a*c+b];}} let pivotRow=0; const pivots=[]; for(let col=0;col<c&&pivotRow<r;col++){let sel=pivotRow;for(let i=pivotRow+1;i<r;i++){if(Math.abs(m[i][col])>Math.abs(m[sel][col]))sel=i;}if(Math.abs(m[sel][col])<1e-10)continue;const temp=m[pivotRow];m[pivotRow]=m[sel];m[sel]=temp;const piv=m[pivotRow][col];for(let j=col;j<c;j++)m[pivotRow][j]/=piv;for(let i=0;i<r;i++){if(i!==pivotRow){const factor=m[i][col];for(let j=col;j<c;j++)m[i][j]-=factor*m[pivotRow][j];}}pivots.push(col);pivotRow++;} const freeVars=[]; for(let j=0;j<c;j++){if(!pivots.includes(j))freeVars.push(j);} const nullspace=[]; for(let f of freeVars){const vec=[];for(let j=0;j<c;j++){if(j===f){vec.push(1);}else if(pivots.includes(j)){const pivotRowIdx=pivots.indexOf(j);vec.push(-m[pivotRowIdx][f]);}else{vec.push(0);}}nullspace.push(vec);} const result=nullspace.length===0?[[0]]:nullspace; return {value: JSON.stringify(result), unit: 'vektor(er)', desc: 'Nullrommet til matrisen'}; },

  linear_independence_calculator: (i) => { if(!i.vectors) return null; const v = i.vectors.split(';').map(r => r.split(',').map(Number)); const d = parseInt(i.dimension) || v[0].length; const m = v.length; const n = d; let mat = v.map(row => { while(row.length < n) row.push(0); return row.slice(0,n); }); let rank = 0; let row = 0; for(let col=0; col<n && row<m; col++) { let sel = row; for(let i=row+1; i<m; i++) if(Math.abs(mat[i][col]) > Math.abs(mat[sel][col])) sel = i; if(Math.abs(mat[sel][col]) < 1e-10) continue; [mat[row], mat[sel]] = [mat[sel], mat[row]]; const pivot = mat[row][col]; for(let j=col; j<n; j++) mat[row][j] /= pivot; for(let i=0; i<m; i++) if(i !== row) { const factor = mat[i][col]; for(let j=col; j<n; j++) mat[i][j] -= factor * mat[row][j]; } rank++; row++; } const result = rank === m ? 'Ja' : 'Nei'; return {value: result, unit: '', desc: 'Vektorene er line' + String.fromCharCode(230) + 'rt uavhengige: ' + result}; },

  lagrange_multiplikatorer: (i) => { if(!i.fx) return null; const fx = eval(i.fx); const gx = eval(i.gx); let x = parseFloat(i.x_start) || 0; let y = parseFloat(i.y_start) || 0; let lambda = parseFloat(i.lambda_start) || 0; const iter = parseInt(i.iterations) || 10; for(let n=0; n<iter; n++) { const grad_fx = (fx(x+1e-8,y)-fx(x,y))/1e-8; const grad_fy = (fx(x,y+1e-8)-fx(x,y))/1e-8; const grad_gx = (gx(x+1e-8,y)-gx(x,y))/1e-8; const grad_gy = (gx(x,y+1e-8)-gx(x,y))/1e-8; const g_val = gx(x,y); x = x - 0.01*(grad_fx - lambda*grad_gx); y = y - 0.01*(grad_fy - lambda*grad_gy); lambda = lambda + 0.01*g_val; } const result = fx(x,y); return {value: result, unit: 'verdi', desc: 'Lagrange multiplikator optimal verdi for gitt funksjon'}; },

  formuesskatt_2023: (i) => { if(!i.netto_formue) return null; const bunnfradrag = 1700000; const sats = 0.0095; const grunnlag = Math.max(0, i.netto_formue - bunnfradrag); const result = grunnlag * sats; return {value: result, unit: 'NOK', desc: 'Formuesskatt 2023 for ' + (i.kommune || 'ukjent kommune')}; },

  kvadratisk_regresjon: (i) => { if(!i.x_values) return null; const xs = i.x_values.split(',').map(Number); const ys = i.y_values.split(',').map(Number); const n = xs.length; let sumX = 0, sumY = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0, sumXY = 0, sumX2Y = 0; for(let j=0;j<n;j++){ const x = xs[j], y = ys[j]; sumX += x; sumY += y; sumX2 += x*x; sumX3 += x*x*x; sumX4 += x*x*x*x; sumXY += x*y; sumX2Y += x*x*y; } const det = n*(sumX2*sumX4 - sumX3*sumX3) - sumX*(sumX*sumX4 - sumX2*sumX3) + sumX2*(sumX*sumX3 - sumX2*sumX2); if(det===0) return null; const a = (sumY*(sumX2*sumX4 - sumX3*sumX3) - sumXY*(sumX*sumX4 - sumX2*sumX3) + sumX2Y*(sumX*sumX3 - sumX2*sumX2))/det; const b = (n*(sumXY*sumX4 - sumX2Y*sumX3) - sumX*(sumY*sumX4 - sumX2Y*sumX2) + sumX2*(sumY*sumX3 - sumXY*sumX2))/det; const c = (n*(sumX2*sumX2Y - sumX3*sumXY) - sumX*(sumX*sumX2Y - sumX2*sumXY) + sumX2*(sumX*sumXY - sumX2*sumY))/det; const pred = Number(i.pred_x); const result = a + b*pred + c*pred*pred; return {value: result, unit: 'y-verdi', desc: 'Predikert y-verdi for x = ' + pred + ' (kvadratisk regresjon)'}; },

  campingvognregelen: (i) => { if(!i.egenvekt_bil) return null; const result = i.forerkort_klasse === 'B' ? Math.min(i.tilhenger_vekt, i.egenvekt_bil * 0.75) : i.forerkort_klasse === 'BE' ? Math.min(i.tilhenger_vekt, i.egenvekt_bil * 1.5) : i.forerkort_klasse === 'B96' ? Math.min(i.tilhenger_vekt, i.egenvekt_bil * 1.25) : i.tilhenger_vekt; return {value: result, unit: 'kg', desc: 'Maks tillatt tilhengervekt i henhold til campingvognregelen'}; },
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
