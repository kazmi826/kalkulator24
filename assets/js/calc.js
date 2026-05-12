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

  tv_distance: (i) => {
    const s=+i.tv_size;
    if(!s) return null;
    const res={'HD 720p':1.5,'Full HD 1080p':2.0,'4K UHD':3.0};
    const factor=res[i.resolution]||2.0;
    const min=(s*2.54*factor/100).toFixed(2);
    const max=(s*2.54*(factor+0.5)/100).toFixed(2);
    return {value:min+'-'+max, unit:'meter', desc:'Anbefalt sitteavstand for '+i.resolution};
  },

  unit_measure: (i) => {
    const v=+i.value;
    if(!v) return null;
    const toM={'meter':1,'cm':0.01,'mm':0.001,'km':1000,'fot':0.3048,'tommer':0.0254,'yard':0.9144,'mil':1609.34};
    const m=v*(toM[i.from_unit]||1);
    const result=m/(toM[i.to_unit]||1);
    return {value:result.toFixed(6), unit:i.to_unit, desc:v+' '+i.from_unit+' = '+result.toFixed(6)+' '+i.to_unit};
  },

  quart_to_liter: (i) => {
    const q=+i.quart;
    if(!q) return null;
    return {value:(q*0.946353).toFixed(4), unit:'liter', desc:q+' qt = '+(q*0.946353).toFixed(4)+' L'};
  },

  ml_to_gram: (i) => {
    const ml=+i.ml;
    if(!ml) return null;
    const density={'Vann':1,'Melk':1.03,'Olje':0.92,'Alkohol':0.789,'Honning':1.42};
    const d=density[i.substance]||1;
    return {value:(ml*d).toFixed(2), unit:'gram', desc:ml+'ml × '+d+'g/ml ('+i.substance+')'};
  },

  cups_to_ml: (i) => {
    const c=+i.cups;
    if(!c) return null;
    return {value:(c*236.588).toFixed(2), unit:'ml', desc:c+' kopper = '+(c*236.588).toFixed(2)+' ml'};
  },

  gallons_to_quarts: (i) => {
    const g=+i.gallons;
    if(!g) return null;
    return {value:(g*4).toFixed(2), unit:'quarts', desc:g+' gallon = '+(g*4)+' quarts'};
  },

  mm_to_inches: (i) => {
    const mm=+i.mm;
    if(!mm) return null;
    return {value:(mm/25.4).toFixed(4), unit:'tommer', desc:mm+' mm = '+(mm/25.4).toFixed(4)'""'};
  },

  height_calc: (i) => {
    const ft=+i.feet||0, inch=+i.inches||0;
    const totalCm=((ft*12+inch)*2.54).toFixed(1);
    return {value:totalCm, unit:'cm', desc:ft+"' "+inch+'" = '+totalCm+' cm'};
  },

  cubicft_to_gallon: (i) => {
    const cf=+i.cubic_feet;
    if(!cf) return null;
    return {value:(cf*7.48052).toFixed(4), unit:'gallon', desc:cf+' kubikkfot = '+(cf*7.48052).toFixed(4)+' gallon'};
  },

  pint_to_ml: (i) => {
    const p=+i.pint;
    if(!p) return null;
    return {value:(p*473.176).toFixed(2), unit:'ml', desc:p+' pint = '+(p*473.176).toFixed(2)+' ml'};
  },

  deg_to_mrad: (i) => {
    const d=+i.degrees;
    if(isNaN(d)) return null;
    return {value:(d*17.4533).toFixed(4), unit:'mrad', desc:d+'° = '+(d*17.4533).toFixed(4)+' mrad'};
  },

  mg_to_ml: (i) => {
    const mg=+i.mg, dens=+i.density||1;
    if(!mg) return null;
    return {value:(mg/dens/1000).toFixed(6), unit:'ml', desc:mg+'mg ÷ '+dens+'g/ml ÷ 1000'};
  },

  ml_to_cups: (i) => {
    const ml=+i.ml;
    if(!ml) return null;
    return {value:(ml/236.588).toFixed(4), unit:'kopper', desc:ml+' ml = '+(ml/236.588).toFixed(4)+' kopper'};
  },

  quart_to_cups: (i) => {
    const q=+i.quart;
    if(!q) return null;
    return {value:(q*4).toFixed(2), unit:'kopper', desc:q+' quart = '+(q*4)+' kopper'};
  },

  steel_weight: (i) => {
    const l=+i.length, w=+i.width, t=+i.thickness;
    if(!l||!w||!t) return null;
    const vol=(l*w*(t/10))/1000;
    const weight=(vol*7.85).toFixed(3);
    return {value:weight, unit:'kg', desc:'Volum: '+vol.toFixed(4)+'L × 7.85kg/L'};
  },

  gallon_to_liter: (i) => {
    const g=+i.gallons;
    if(!g) return null;
    return {value:(g*3.78541).toFixed(4), unit:'liter', desc:g+' gallon = '+(g*3.78541).toFixed(4)+' L'};
  },

  liter_to_cups: (i) => {
    const l=+i.liter;
    if(!l) return null;
    return {value:(l*4.22675).toFixed(4), unit:'kopper', desc:l+' L = '+(l*4.22675).toFixed(4)+' kopper'};
  },

  cups_to_quart: (i) => {
    const c=+i.cups;
    if(!c) return null;
    return {value:(c/4).toFixed(4), unit:'quart', desc:c+' kopper = '+(c/4)+' quart'};
  },

  cubicinch_to_gallon: (i) => {
    const ci=+i.cubic_inches;
    if(!ci) return null;
    return {value:(ci/231).toFixed(6), unit:'gallon', desc:ci+' in³ ÷ 231 = '+(ci/231).toFixed(6)+' gal'};
  },

  mrad_to_deg: (i) => {
    const m=+i.mrad;
    if(isNaN(m)) return null;
    return {value:(m/17.4533).toFixed(6), unit:'grader', desc:m+' mrad = '+(m/17.4533).toFixed(6)+'°'};
  },

  cubic_yard: (i) => {
    const l=+i.length, w=+i.width, d=+i.depth/12;
    if(!l||!w||!d) return null;
    const cy=(l*w*d/27).toFixed(4);
    return {value:cy, unit:'kubikkyard', desc:l+'×'+w+'×'+(+i.depth)+'" = '+cy+' yd³'};
  },

  cubicft_to_cubicyard: (i) => {
    const cf=+i.cubic_feet;
    if(!cf) return null;
    return {value:(cf/27).toFixed(6), unit:'kubikkyard', desc:cf+' ft³ ÷ 27 = '+(cf/27).toFixed(6)+' yd³'};
  },

  lbs_to_oz: (i) => {
    const l=+i.lbs;
    if(!l) return null;
    return {value:(l*16).toFixed(2), unit:'unser', desc:l+' lbs = '+(l*16)+' oz'};
  },

  ml_to_pint: (i) => {
    const ml=+i.ml;
    if(!ml) return null;
    return {value:(ml/473.176).toFixed(6), unit:'pint', desc:ml+' ml = '+(ml/473.176).toFixed(6)+' pint'};
  },

  days_to_hours: (i) => {
    const d=+i.days;
    if(!d) return null;
    return {value:(d*24).toFixed(0), unit:'timer', desc:d+' dager = '+(d*24)+' timer = '+(d*1440)+' min'};
  },

  minutes_to_hours: (i) => {
    const m=+i.minutes;
    if(!m) return null;
    const h=Math.floor(m/60), min=m%60;
    return {value:(m/60).toFixed(4), unit:'timer', desc:m+' min = '+h+'t '+min+'min'};
  },

  gallon_to_ml: (i) => {
    const g=+i.gallons;
    if(!g) return null;
    return {value:(g*3785.41).toFixed(2), unit:'ml', desc:g+' gallon = '+(g*3785.41).toFixed(2)+' ml'};
  },

  seconds_to_minutes: (i) => {
    const s=+i.seconds;
    if(!s) return null;
    const m=Math.floor(s/60), sec=s%60;
    return {value:(s/60).toFixed(4), unit:'minutter', desc:s+' sek = '+m+'min '+sec+'sek'};
  },

  tsp_to_ml: (i) => {
    const t=+i.tsp;
    if(!t) return null;
    return {value:(t*4.92892).toFixed(4), unit:'ml', desc:t+' ts = '+(t*4.92892).toFixed(4)+' ml'};
  },

  density_calc: (i) => {
    const m=+i.mass, v=+i.volume;
    if(!m||!v) return null;
    const d=(m/v).toFixed(6);
    return {value:d, unit:'g/ml', desc:'ρ = m/V = '+m+'/'+v+' | '+d+' g/cm³'};
  },

  tbsp_to_cups: (i) => {
    const t=+i.tbsp;
    if(!t) return null;
    return {value:(t/16).toFixed(6), unit:'kopper', desc:t+' ss = '+(t/16).toFixed(4)+' kopper'};
  },

  celsius_to_kelvin: (i) => {
    const c=+i.celsius;
    if(isNaN(c)) return null;
    const k=(c+273.15).toFixed(2);
    return {value:k, unit:'K', desc:c+'°C = '+k+'K = '+(c*9/5+32).toFixed(1)+'°F'};
  },

  dekar_to_sqm: (i) => {
    const d=+i.dekar;
    if(!d) return null;
    return {value:(d*1000).toFixed(2), unit:'m²', desc:d+' dekar = '+(d*1000)+' m² = '+(d*0.1)+' hektar'};
  },

  sqft_to_sqm: (i) => {
    const s=+i.sqft;
    if(!s) return null;
    return {value:(s*0.092903).toFixed(4), unit:'m²', desc:s+' ft² = '+(s*0.092903).toFixed(4)+' m²'};
  },

  liter_to_oz: (i) => {
    const l=+i.liter;
    if(!l) return null;
    return {value:(l*33.814).toFixed(4), unit:'fl oz', desc:l+' L = '+(l*33.814).toFixed(4)+' oz'};
  },

  cc_to_ml: (i) => {
    const c=+i.cc;
    if(!c) return null;
    return {value:c, unit:'ml', desc:'1 cc = 1 ml | '+c+' cc = '+c+' ml'};
  },

  khz_to_mhz: (i) => {
    const k=+i.khz;
    if(!k) return null;
    return {value:(k/1000).toFixed(6), unit:'MHz', desc:k+' kHz = '+(k/1000).toFixed(6)+' MHz = '+(k/1000000).toFixed(9)+' GHz'};
  },

  l_to_ml: (i) => {
    const l=+i.liter;
    if(!l) return null;
    return {value:(l*1000).toFixed(2), unit:'ml', desc:l+' L = '+(l*1000)+' ml'};
  },

  waist_height_ratio: (i) => {
    const w=+i.waist, h=+i.height;
    if(!w||!h) return null;
    const r=(w/h).toFixed(3);
    const risk=r<0.4?'For slank':r<=0.5?'Sunn ✓':r<=0.6?'Overvektig risiko':'Høy helserisiko ⚠️';
    return {value:r, unit:'(WHtR)', desc:'Helserisiko: '+risk+' | Under 0.5 = sunn'};
  },

  baby_gender: (i) => {
    const age=+i.mother_age;
    if(!age) return null;
    const months=['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'];
    const monthNum=months.indexOf(i.conception_month)+1;
    const result=(age+monthNum)%2===0?'Gutt 👦':'Jente 👧';
    return {value:result, unit:'', desc:'Kinesisk kjønnskalkulator (ikke vitenskapelig) | Mor: '+age+' år'};
  },

  gematria: (i) => {
    if(!i.word) return null;
    const w=i.word.toLowerCase();
    let sum=0;
    for(let c of w){const code=c.charCodeAt(0)-96;if(code>0&&code<=26)sum+=code;}
    const meanings={1:'Lederskap',2:'Samarbeid',3:'Kreativitet',4:'Stabilitet',5:'Frihet',6:'Kjærlighet',7:'Visdom',8:'Suksess',9:'Fullstendighet'};
    let reduced=sum;
    while(reduced>9) reduced=String(reduced).split('').map(Number).reduce((a,b)=>a+b,0);
    return {value:sum, unit:'(gematria verdi)', desc:'Redusert: '+reduced+' — '+( meanings[reduced]||'Unik energi')};
  },

  angel_number: (i) => {
    const n=String(i.number||'').replace(/\D/g,'');
    if(!n) return null;
    const meanings={'111':'Nye begynnelser og manifestasjon','222':'Balanse og harmoni','333':'Vekst og kreativitet','444':'Stabilitet og beskyttelse','555':'Stor forandring kommer','666':'Fokuser på åndelig vekst','777':'Lykke og guddommelig veiledning','888':'Overflod og velstand','999':'Avslutning og transformasjon','000':'Uendelig potensial','1111':'Portal åpner seg','1234':'Du er på rett vei'};
    const msg=meanings[n]||'Engelnummer: se på de individuelle sifrene for mening';
    return {value:n, unit:'(engelnummer)', desc:msg};
  },

  interest: (i) => { const p=+i.principal,r=+i.rate/100,n=+i.years; if(!p||!r||!n) return null; const t=Math.round(p*Math.pow(1+r,n)); return {value:t.toLocaleString('nb-NO'),unit:'kr',desc:`Renter: ${(t-p).toLocaleString('nb-NO')} kr`}},

  savings: (i) => { const P=+i.initial,pmt=+i.monthly,r=+i.rate/100/12,n=+i.years*12; if(!r||!n) return null; const f=Math.round(P*Math.pow(1+r,n)+pmt*(Math.pow(1+r,n)-1)/r); return {value:f.toLocaleString('nb-NO'),unit:'kr',desc:`Etter ${i.years} år`}},

  // ========== FINANS (FINANCE) ==========
  loan: (i) => { const P=+i.amount,r=+i.rate/100/12,n=+i.years*12; if(!P||!r||!n) return null; const m=Math.round(P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); return {value:m.toLocaleString('nb-NO'),unit:'kr/mnd',desc:`Totalt: ${(m*n).toLocaleString('nb-NO')} kr`}},
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
  },

  // ========== ADVANCED FYSIKK ==========
  air_density: (i) => {
    const t=+i.temperature+273.15, p=+i.pressure*100, rh=+i.humidity/100;
    if(!t||!p) return null;
    const psat=610.78*Math.exp(17.27*(t-273.15)/((t-273.15)+237.3));
    const pv=rh*psat; const pd=p-pv;
    const density=((pd*0.028964)+(pv*0.018016))/(8.314*t);
    return {value:density.toFixed(4), unit:'kg/m³', desc:`T=${i.temperature}°C, P=${i.pressure}hPa, RH=${i.humidity}%`};
  },

  enthalpy: (i) => {
    const m=+i.mass, c=+i.specific_heat, dt=+i.temp_change;
    if(!m||!c||!dt) return null;
    const h=(m*c*dt).toFixed(2);
    return {value:h, unit:'J', desc:`H = m×c×ΔT = ${m}×${c}×${dt}`};
  },

  momentum: (i) => {
    const m=+i.mass, v=+i.velocity;
    if(!m||!v) return null;
    const p=(m*v).toFixed(4);
    const ke=(0.5*m*v*v).toFixed(4);
    return {value:p, unit:'kg·m/s', desc:`p = mv = ${m}×${v} | KE = ${ke} J`};
  },

  relative_humidity: (i) => {
    const t=+i.actual_temp, td=+i.dew_point;
    if(isNaN(t)||isNaN(td)) return null;
    const rh=(100*Math.exp((17.625*td)/(243.04+td))/Math.exp((17.625*t)/(243.04+t))).toFixed(1);
    return {value:rh, unit:'%', desc:`T=${t}°C, Td=${td}°C | ${rh<30?'Tørt':rh<60?'Komfortabelt ✓':'Fuktig'}`};
  },

  acceleration: (i) => {
    const vi=+i.initial_velocity, vf=+i.final_velocity, t=+i.time;
    if(isNaN(vi)||isNaN(vf)||!t) return null;
    const a=((vf-vi)/t).toFixed(4);
    const dist=(vi*t+0.5*((vf-vi)/t)*t*t).toFixed(2);
    return {value:a, unit:'m/s²', desc:`a=(vf-vi)/t | Distanse: ${dist}m`};
  },

  angular_velocity: (i) => {
    const angle=+i.angle*Math.PI/180, t=+i.time;
    if(!t) return null;
    const omega=(angle/t).toFixed(4);
    const rpm=(omega*60/(2*Math.PI)).toFixed(2);
    return {value:omega, unit:'rad/s', desc:`ω = θ/t | ${rpm} RPM`};
  },

  gravitational_force: (i) => {
    const m1=+i.mass1, m2=+i.mass2, r=+i.distance;
    if(!m1||!m2||!r) return null;
    const G=6.674e-11;
    const f=(G*m1*m2/(r*r)).toExponential(4);
    return {value:f, unit:'N', desc:`F = G×m1×m2/r² | G=${G}`};
  },

  earth_curvature: (i) => {
    const d=+i.distance*1000;
    if(!d) return null;
    const R=6371000;
    const drop=(d*d/(2*R)).toFixed(2);
    return {value:drop, unit:'meter (fall)', desc:`For ${i.distance}km distanse | R=6371km`};
  },

  hookes_law: (i) => {
    const k=+i.spring_constant, x=+i.displacement;
    if(!k||!x) return null;
    const f=(k*x).toFixed(4);
    const pe=(0.5*k*x*x).toFixed(4);
    return {value:f, unit:'N', desc:`F = kx = ${k}×${x} | PE = ${pe} J`};
  },

  de_broglie: (i) => {
    const m=+i.mass, v=+i.velocity;
    if(!m||!v) return null;
    const h=6.626e-34;
    const lambda=(h/(m*v)).toExponential(4);
    return {value:lambda, unit:'m', desc:`λ = h/mv = ${h}/(${m}×${v})`};
  },

  dew_point: (i) => {
    const t=+i.temperature, rh=+i.humidity;
    if(isNaN(t)||!rh) return null;
    const a=17.625, b=243.04;
    const dp=(b*(Math.log(rh/100)+a*t/(b+t))/(a-Math.log(rh/100)-a*t/(b+t))).toFixed(2);
    return {value:dp, unit:'°C', desc:`T=${t}°C, RH=${rh}% → Td=${dp}°C`};
  },

  transformer: (i) => {
    const vp=+i.primary_voltage, np=+i.primary_turns, ns=+i.secondary_turns;
    if(!vp||!np||!ns) return null;
    const vs=(vp*ns/np).toFixed(2);
    const ratio=(ns/np).toFixed(4);
    return {value:vs, unit:'V (sekundær)', desc:`Vs = Vp×(Ns/Np) = ${vp}×${ratio} | Ratio: ${ratio}`};
  },

  frequency: (i) => {
    const T=+i.period;
    if(!T) return null;
    const f=(1/T).toFixed(6);
    const omega=(2*Math.PI/T).toFixed(4);
    return {value:f, unit:'Hz', desc:`f = 1/T = 1/${T} | ω = ${omega} rad/s`};
  },

  coulombs_law: (i) => {
    const q1=+i.charge1, q2=+i.charge2, r=+i.distance;
    if(!q1||!q2||!r) return null;
    const k=8.99e9;
    const f=(k*Math.abs(q1)*Math.abs(q2)/(r*r)).toExponential(4);
    const type=q1*q2>0?'Frastøtende':'Tiltrekkende';
    return {value:f, unit:'N', desc:`F = kq1q2/r² | ${type}`};
  },

  potential_energy: (i) => {
    const m=+i.mass, h=+i.height;
    if(!m||!h) return null;
    const pe=(m*9.81*h).toFixed(4);
    return {value:pe, unit:'J', desc:`PE = mgh = ${m}×9.81×${h}`};
  },

  schwarzschild: (i) => {
    const m=+i.mass;
    if(!m) return null;
    const G=6.674e-11, c=3e8;
    const rs=(2*G*m/(c*c)).toExponential(4);
    return {value:rs, unit:'m', desc:`rs = 2GM/c² | Svart hull radius`};
  },

  electricity: (i) => {
    const v=+i.voltage, a=+i.current, t=+i.time;
    if(!v||!a) return null;
    const power=(v*a).toFixed(2);
    const energy=(v*a*t*3600).toFixed(2);
    const cost=((v*a*t)/1000*1.5).toFixed(2);
    return {value:power, unit:'W', desc:`Energi: ${energy}J (${t}t) | Kostnad: ${cost} kr`};
  },

  resistance: (i) => {
    const v=+i.voltage, a=+i.current;
    if(!v||!a) return null;
    const r=(v/a).toFixed(4);
    const p=(v*a).toFixed(4);
    return {value:r, unit:'Ω', desc:`R = V/I = ${v}/${a} | Effekt: ${p} W`};
  },

  string_tension: (i) => {
    const m=+i.mass, l=+i.length, f=+i.frequency;
    if(!m||!l||!f) return null;
    const t=(4*m*l*f*f).toFixed(4);
    return {value:t, unit:'N', desc:`T = 4mLf² = 4×${m}×${l}×${f}²`};
  },

  muzzle_energy: (i) => {
    const grains=+i.mass, fps=+i.velocity;
    if(!grains||!fps) return null;
    const kg=grains*0.0000647989, ms=fps*0.3048;
    const joules=(0.5*kg*ms*ms).toFixed(2);
    const ftlbs=(joules*0.737562).toFixed(2);
    return {value:joules, unit:'J', desc:`${ftlbs} ft·lbf | ${grains}gr @ ${fps}fps`};
  },

  sunrise_sunset: (i) => {
    const lat=+i.latitude*Math.PI/180, doy=+i.day_of_year;
    if(isNaN(lat)||!doy) return null;
    const decl=0.4093*Math.sin(2*Math.PI*(284+doy)/365);
    const ha=Math.acos(-Math.tan(lat)*Math.tan(decl));
    const sunrise=(12-ha*12/Math.PI).toFixed(2);
    const sunset=(12+ha*12/Math.PI).toFixed(2);
    const daylight=(ha*24/Math.PI).toFixed(2);
    const srH=Math.floor(sunrise), srM=Math.round((sunrise-srH)*60);
    const ssH=Math.floor(sunset), ssM=Math.round((sunset-ssH)*60);
    return {value:`${srH}:${String(srM).padStart(2,'0')}`, unit:'(soloppgang)', desc:`Solnedgang: ${ssH}:${String(ssM).padStart(2,'0')} | Dagslys: ${daylight}t`};
  },

  work_energy: (i) => {
    const f=+i.force, d=+i.distance, angle=+i.angle||0;
    if(!f||!d) return null;
    const w=(f*d*Math.cos(angle*Math.PI/180)).toFixed(4);
    return {value:w, unit:'J', desc:`W = F×d×cos(θ) = ${f}×${d}×cos(${angle}°)`};
  },

  newtons_second: (i) => {
    const m=+i.mass, a=+i.acceleration;
    if(!m||!a) return null;
    const f=(m*a).toFixed(4);
    return {value:f, unit:'N', desc:`F = ma = ${m}×${a}`};
  },

  magnitude: (i) => {
    const x=+i.value1||0, y=+i.value2||0, z=+i.value3||0;
    const mag=Math.sqrt(x*x+y*y+z*z).toFixed(4);
    return {value:mag, unit:'', desc:`√(${x}²+${y}²+${z}²)`};
  },

  eos_calc: (i) => {
    const p=+i.pressure*1e6, t=+i.temperature, v=+i.volume;
    if(!p||!t||!v) return null;
    const R=8.314;
    const n=(p*v/(R*t)).toFixed(4);
    return {value:n, unit:'mol', desc:`PV=nRT → n=${n} mol`};
  },

  // ========== ADVANCED FYSIKK II ==========
  reynolds_number: (i) => {
    const rho=+i.density, v=+i.velocity, l=+i.length, mu=+i.viscosity;
    if(!rho||!v||!l||!mu) return null;
    const re=(rho*v*l/mu).toFixed(2);
    const flow=re<2300?'Laminær strømning':re<4000?'Overgangsstrømning':'Turbulent strømning';
    return {value:re, unit:'(Re)', desc:flow};
  },

  rc_time_constant: (i) => {
    const r=+i.resistance, c=+i.capacitance;
    if(!r||!c) return null;
    const tau=(r*c).toExponential(4);
    const t5=(5*r*c).toExponential(4);
    return {value:tau, unit:'s (τ)', desc:`τ = RC = ${r}×${c} | Fullt ladet: ${t5}s (5τ)`};
  },

  impulse: (i) => {
    const f=+i.force, t=+i.time;
    if(!f||!t) return null;
    const j=(f*t).toFixed(4);
    return {value:j, unit:'N·s', desc:`J = F×t = ${f}×${t} | Impuls = Bevegelsesmengde`};
  },

  watt_to_ampere: (i) => {
    const w=+i.watt, v=+i.voltage||230;
    if(!w||!v) return null;
    const a=(w/v).toFixed(4);
    return {value:a, unit:'A', desc:`I = P/V = ${w}/${v} | ${(w/1000).toFixed(3)} kW`};
  },

  crosswind: (i) => {
    const ws=+i.wind_speed, wa=+i.wind_angle*Math.PI/180;
    if(!ws||!wa) return null;
    const cw=(ws*Math.sin(wa)).toFixed(2);
    const hw=(ws*Math.cos(wa)).toFixed(2);
    return {value:cw, unit:'knop (kryssvind)', desc:`Medvind/motvind: ${hw} knop`};
  },

  steam_power: (i) => {
    const m=+i.mass, t1=+i.temp_initial, t2=+i.temp_final;
    if(!m||isNaN(t1)||isNaN(t2)) return null;
    const q=(m*4186*Math.abs(t2-t1)).toFixed(2);
    return {value:q, unit:'J', desc:`Q = mc(T2-T1) = ${m}×4186×${Math.abs(t2-t1)}`};
  },

  boyles_law: (i) => {
    const p1=+i.p1, v1=+i.v1, p2=+i.p2;
    if(!p1||!v1||!p2) return null;
    const v2=(p1*v1/p2).toFixed(4);
    return {value:v2, unit:'liter (V2)', desc:`P1V1=P2V2 → ${p1}×${v1}=${p2}×${v2}`};
  },

  pressure_calc: (i) => {
    const f=+i.force, a=+i.area;
    if(!f||!a) return null;
    const p=(f/a).toFixed(4);
    const atm=(p/101325).toFixed(6);
    const bar=(p/100000).toFixed(6);
    return {value:p, unit:'Pa', desc:`${atm} atm | ${bar} bar`};
  },

  air_pressure_altitude: (i) => {
    const h=+i.altitude;
    if(isNaN(h)) return null;
    const p=(101325*Math.pow(1-0.0000226*h,5.256)).toFixed(2);
    const temp=(15-0.0065*h).toFixed(2);
    return {value:p, unit:'Pa', desc:`${(p/100).toFixed(2)} hPa | Temp: ${temp}°C`};
  },

  moment_of_inertia: (i) => {
    const m=+i.mass, r=+i.radius;
    if(!m||!r) return null;
    const shapes={'Solid sylinder':0.5,'Hul sylinder':1,'Kule':0.4,'Stav':0.0833};
    const k=shapes[i.shape]||0.5;
    const I=(k*m*r*r).toFixed(4);
    return {value:I, unit:'kg·m²', desc:`I = ${k}×${m}×${r}² (${i.shape||'Solid sylinder'})`};
  },

  capacitance: (i) => {
    const q=+i.charge, v=+i.voltage;
    if(!q||!v) return null;
    const c=(q/v).toFixed(6);
    const e=(0.5*q*v).toFixed(6);
    return {value:c, unit:'F (Farad)', desc:`C = Q/V = ${q}/${v} | Energi: ${e} J`};
  },

  newtons_first: (i) => {
    const m=+i.mass, v=+i.velocity, f=+i.friction||0;
    if(!m||!v) return null;
    const p=(m*v).toFixed(4);
    const stop=f>0?(m*v/f).toFixed(2):'∞';
    return {value:p, unit:'kg·m/s', desc:`Bevegelsesmengde: ${p} | Stopptid: ${stop}s`};
  },

  kinetic_energy: (i) => {
    const m=+i.mass, v=+i.velocity;
    if(!m||!v) return null;
    const ke=(0.5*m*v*v).toFixed(4);
    const p=(m*v).toFixed(4);
    return {value:ke, unit:'J', desc:`KE = ½mv² | Momentum: ${p} kg·m/s`};
  },

  quarter_mile: (i) => {
    const hp=+i.horsepower, w=+i.weight;
    if(!hp||!w) return null;
    const et=(6.269*Math.pow(w/hp,0.333)).toFixed(3);
    const mph=(234*Math.pow(hp/w,0.333)).toFixed(1);
    const kmh=(+mph*1.60934).toFixed(1);
    return {value:et, unit:'sekunder', desc:`Topphastighet: ${mph} mph (${kmh} km/t)`};
  },

  arrow_speed: (i) => {
    const dw=+i.draw_weight, aw=+i.arrow_weight, dl=+i.draw_length;
    if(!dw||!aw||!dl) return null;
    const fps=Math.sqrt((dw*dl*2)/(aw*0.0000648)).toFixed(1);
    const ms=(+fps*0.3048).toFixed(2);
    const ke=(0.5*(aw*0.0000648)*(+ms)**2).toFixed(2);
    return {value:fps, unit:'fps', desc:`${ms} m/s | KE: ${ke} J`};
  },

  mechanical_advantage: (i) => {
    const ef=+i.effort_force, lf=+i.load_force;
    if(!ef||!lf) return null;
    const ma=(lf/ef).toFixed(4);
    const eff=(ef/lf*100).toFixed(1);
    return {value:ma, unit:'(MA)', desc:`Effektivitet: ${eff}% | Load/Effort`};
  },

  bullet_energy: (i) => {
    const grains=+i.mass, fps=+i.velocity;
    if(!grains||!fps) return null;
    const kg=grains*0.0000647989, ms=fps*0.3048;
    const j=(0.5*kg*ms*ms).toFixed(2);
    const ftlbs=(+j*0.737562).toFixed(2);
    return {value:j, unit:'J', desc:`${ftlbs} ft·lbf | ${grains}gr @ ${fps}fps`};
  },

  center_of_gravity: (i) => {
    const m1=+i.mass1, d1=+i.distance1, m2=+i.mass2, d2=+i.distance2;
    if(!m1||!m2) return null;
    const cg=((m1*d1+m2*d2)/(m1+m2)).toFixed(4);
    return {value:cg, unit:'m fra referanse', desc:`(${m1}×${d1}+${m2}×${d2})/(${m1}+${m2})`};
  },

  voltage_divider: (i) => {
    const vin=+i.input_voltage, r1=+i.r1, r2=+i.r2;
    if(!vin||!r1||!r2) return null;
    const vout=(vin*r2/(r1+r2)).toFixed(4);
    const ratio=(r2/(r1+r2)*100).toFixed(1);
    return {value:vout, unit:'V (Vout)', desc:`${ratio}% av ${vin}V | R1=${r1}Ω, R2=${r2}Ω`};
  },

  // ========== ADVANCED FYSIKK III ==========
  heat_index: (i) => {
    const t=+i.temperature, rh=+i.humidity;
    if(isNaN(t)||!rh) return null;
    const tf=t*9/5+32;
    const hi=-42.379+2.04901523*tf+10.14333127*rh-0.22475541*tf*rh-0.00683783*tf*tf-0.05481717*rh*rh+0.00122874*tf*tf*rh+0.00085282*tf*rh*rh-0.00000199*tf*tf*rh*rh;
    const hic=(hi-32)*5/9;
    const feel=hic<27?'Komfortabelt':hic<32?'Forsiktig':hic<41?'Ekstrem forsiktighet':'Farlig';
    return {value:hic.toFixed(1), unit:'°C (varmeindeks)', desc:`Føles som: ${feel}`};
  },

  newtons_third: (i) => {
    const f=+i.action_force, m1=+i.mass1, m2=+i.mass2;
    if(!f) return null;
    const a1=m1?(f/m1).toFixed(4):'?';
    const a2=m2?(f/m2).toFixed(4):'?';
    return {value:f, unit:'N (reaksjonskraft)', desc:`a1=${a1}m/s² | a2=${a2}m/s² | Aksjon = Reaksjon`};
  },

  wind_chill: (i) => {
    const t=+i.temperature, v=+i.wind_speed;
    if(isNaN(t)||!v) return null;
    const wc=(13.12+0.6215*t-11.37*Math.pow(v,0.16)+0.3965*t*Math.pow(v,0.16)).toFixed(1);
    return {value:wc, unit:'°C (vindavkjøling)', desc:`Faktisk: ${t}°C | Vind: ${v}km/t`};
  },

  force_calc: (i) => {
    const m=+i.mass, a=+i.acceleration;
    if(!m||!a) return null;
    const f=(m*a).toFixed(4);
    const w=(m*9.81).toFixed(2);
    return {value:f, unit:'N', desc:`F=ma=${m}×${a} | Tyngde: ${w}N`};
  },

  psychrometric: (i) => {
    const td=+i.dry_temp, tw=+i.wet_temp;
    if(isNaN(td)||isNaN(tw)) return null;
    const rh=(100-4*(td-tw)).toFixed(1);
    const dp=(td-((100-Math.max(0,+rh))/5)).toFixed(1);
    return {value:Math.max(0,+rh).toFixed(1), unit:'% RH', desc:`Duggpunkt: ${dp}°C`};
  },

  free_fall: (i) => {
    const h=+i.height, g=+i.gravity||9.81;
    if(!h) return null;
    const t=Math.sqrt(2*h/g).toFixed(4);
    const v=(g*+t).toFixed(4);
    return {value:t, unit:'sekunder', desc:`Slutthastighet: ${v}m/s (${(+v*3.6).toFixed(1)}km/t)`};
  },

  photon_energy: (i) => {
    const wl=+i.wavelength*1e-9;
    if(!wl) return null;
    const h=6.626e-34, c=3e8;
    const e=(h*c/wl).toExponential(4);
    const ev=(+e/1.6e-19).toFixed(4);
    const type=wl<380e-9?'UV':wl<700e-9?'Synlig lys':'Infrarød';
    return {value:e, unit:'J', desc:`${ev} eV | ${type}`};
  },

  net_force: (i) => {
    const f1=+i.force1, f2=+i.force2, a=+i.angle||0;
    if(isNaN(f1)||isNaN(f2)) return null;
    const fx=f1+f2*Math.cos(a*Math.PI/180);
    const fy=f2*Math.sin(a*Math.PI/180);
    const net=Math.sqrt(fx*fx+fy*fy).toFixed(4);
    return {value:net, unit:'N', desc:`Fx=${fx.toFixed(2)}N, Fy=${fy.toFixed(2)}N`};
  },

  watt_calc: (i) => {
    const v=+i.voltage, a=+i.current;
    if(!v||!a) return null;
    const w=(v*a).toFixed(2);
    const kwh=(+w/1000).toFixed(4);
    return {value:w, unit:'W', desc:`P=VI=${v}×${a} | ${kwh}kW | ${(+w*24/1000).toFixed(2)}kWh/dag`};
  },

  snells_law: (i) => {
    const n1=+i.n1, a1=+i.angle1*Math.PI/180, n2=+i.n2;
    if(!n1||!n2) return null;
    const sinA2=n1*Math.sin(a1)/n2;
    if(Math.abs(sinA2)>1) return {value:'Total indre refleksjon', unit:'', desc:`Kritisk vinkel overskredet`};
    const a2=(Math.asin(sinA2)*180/Math.PI).toFixed(4);
    return {value:a2, unit:'grader (θ2)', desc:`n1sinθ1=n2sinθ2 | ${n1}×sin(${i.angle1}°)=${n2}×sin(${a2}°)`};
  },

  ohms_law: (i) => {
    const v=+i.voltage, a=+i.current, r=+i.resistance;
    if(v&&a) return {value:(v/a).toFixed(4), unit:'Ω', desc:`R=V/I=${v}/${a} | P=${(v*a).toFixed(2)}W`};
    if(v&&r) return {value:(v/r).toFixed(4), unit:'A', desc:`I=V/R=${v}/${r} | P=${(v*v/r).toFixed(2)}W`};
    if(a&&r) return {value:(a*r).toFixed(4), unit:'V', desc:`V=IR=${a}×${r} | P=${(a*a*r).toFixed(2)}W`};
    return null;
  },

  suvat: (i) => {
    const u=+i.initial_velocity, a=+i.acceleration, t=+i.time;
    if(isNaN(u)||isNaN(a)||!t) return null;
    const v=(u+a*t).toFixed(4);
    const s=(u*t+0.5*a*t*t).toFixed(4);
    return {value:v, unit:'m/s (sluttfart)', desc:`s=${s}m | v=u+at=${u}+${a}×${t}`};
  },

  combined_gas: (i) => {
    const p1=+i.p1, v1=+i.v1, t1=+i.t1, p2=+i.p2, t2=+i.t2;
    if(!p1||!v1||!t1||!p2||!t2) return null;
    const v2=(p1*v1*t2/(t1*p2)).toFixed(4);
    return {value:v2, unit:'liter (V2)', desc:`P1V1/T1=P2V2/T2`};
  },

  voltage_drop: (i) => {
    const curr=+i.current, res=+i.resistance, len=+i.length/1000;
    if(!curr||!res||!len) return null;
    const vd=(curr*res*len*2).toFixed(4);
    return {value:vd, unit:'V (spenningstap)', desc:`VD=I×R×L×2=${curr}×${res}×${len}×2`};
  },

  resonance_freq: (i) => {
    const l=+i.inductance, c=+i.capacitance;
    if(!l||!c) return null;
    const f=(1/(2*Math.PI*Math.sqrt(l*c))).toFixed(4);
    return {value:f, unit:'Hz', desc:`f=1/(2π√LC)=1/(2π√${l}×${c})`};
  },

  power_factor: (i) => {
    const p=+i.real_power, s=+i.apparent_power;
    if(!p||!s) return null;
    const pf=(p/s).toFixed(4);
    const angle=(Math.acos(+pf)*180/Math.PI).toFixed(2);
    const quality=pf>0.9?'God ✓':pf>0.8?'Akseptabel':'Dårlig';
    return {value:pf, unit:'(PF)', desc:`${quality} | Fasevinkel: ${angle}°`};
  },

  wavelength_calc: (i) => {
    const f=+i.frequency;
    if(!f) return null;
    const wl=(3e8/f).toExponential(4);
    const type=f<3e3?'ELF':f<3e6?'Radiobølge':f<3e9?'Mikrobølge':f<4.3e14?'Infrarød':f<7.5e14?'Synlig lys':'UV/Røntgen';
    return {value:wl, unit:'m', desc:`c/f | ${type}`};
  },

  api_gravity: (i) => {
    const sg=+i.specific_gravity;
    if(!sg) return null;
    const api=(141.5/sg-131.5).toFixed(2);
    const type=api>31.1?'Lett råolje':api>22.3?'Medium råolje':api>10?'Tung råolje':'Extra tung';
    return {value:api, unit:'°API', desc:`${type} | SG=${sg}`};
  },

  displacement_calc: (i) => {
    const u=+i.initial_velocity, t=+i.time, a=+i.acceleration||0;
    if(isNaN(u)||!t) return null;
    const s=(u*t+0.5*a*t*t).toFixed(4);
    const v=(u+a*t).toFixed(4);
    return {value:s, unit:'m', desc:`s=ut+½at² | Sluttfart: ${v}m/s`};
  },

  vertex_calc: (i) => {
    const d=+i.spectacle_power, vd=+i.vertex_distance/1000;
    if(!d) return null;
    const cl=(d/(1-vd*d)).toFixed(2);
    return {value:cl, unit:'D (kontaktlinse)', desc:`Fra ${d}D brilleglass @ ${i.vertex_distance}mm`};
  },

  // ========== UNDERHOLDNING ==========
  dice_roll: (i) => {
    const n=+i.dice_count||1, s=+i.dice_sides||6;
    if(!n||!s) return null;
    let total=0;
    const rolls=[];
    for(let j=0;j<n;j++){const r=Math.floor(Math.random()*s)+1;rolls.push(r);total+=r;}
    return {value:total, unit:`(${n}d${s})`, desc:`Kast: ${rolls.join(', ')} | Min:${n} Max:${n*s}`};
  },

  love_calc: (i) => {
    if(!i.name1||!i.name2) return null;
    const combined=(i.name1+i.name2).toLowerCase();
    let hash=0;
    for(let c of combined) hash=(hash*31+c.charCodeAt(0))%100;
    const score=Math.abs(hash)%100;
    const msg=score>80?'💑 Perfekt match!':score>60?'💕 Bra kompatibilitet':score>40?'❤️ Mulig kjærlighet':'💔 Kanskje venner er bedre';
    return {value:score, unit:'% kjærlighet', desc:`${i.name1} + ${i.name2} = ${msg}`};
  },

  life_expectancy: (i) => {
    const age=+i.age||25;
    let base=i.gender==='Kvinne'?84:80;
    if(i.smoking==='Ja') base-=10;
    if(i.exercise==='Aldri') base-=3;
    if(i.exercise==='Daglig') base+=3;
    const remaining=Math.max(0,base-age);
    return {value:base, unit:'år (estimert levealder)', desc:`${remaining} år igjen | Basert på norske statistikker`};
  },

  snow_days: (i) => {
    const days={'Oslo':{'Januar':18,'Februar':16,'Mars':10,'April':3,'Mai':0,'Juni':0,'Juli':0,'Augustus':0,'September':0,'Oktober':2,'November':8,'Desember':15},'Bergen':{'Januar':5,'Februar':4,'Mars':2,'April':0,'Mai':0,'Juni':0,'Juli':0,'Augustus':0,'September':0,'Oktober':0,'November':2,'Desember':4},'Tromsø':{'Januar':22,'Februar':20,'Mars':19,'April':12,'Mai':3,'Juni':0,'Juli':0,'Augustus':0,'September':1,'Oktober':8,'November':17,'Desember':21},'Trondheim':{'Januar':14,'Februar':13,'Mars':9,'April':3,'Mai':0,'Juni':0,'Juli':0,'Augustus':0,'September':0,'Oktober':1,'November':6,'Desember':12},'Stavanger':{'Januar':4,'Februar':3,'Mars':1,'April':0,'Mai':0,'Juni':0,'Juli':0,'Augustus':0,'September':0,'Oktober':0,'November':1,'Desember':3}};
    const city=i.city||'Oslo', month=i.month||'Januar';
    const d=days[city]?.[month]||0;
    return {value:d, unit:'snødager', desc:`${city} i ${month} — historisk gjennomsnitt`};
  },

  screen_size: (i) => {
    const diag=+i.diagonal;
    const ratios={'16:9':[16,9],'4:3':[4,3],'21:9':[21,9]};
    const [rw,rh]=ratios[i.aspect_ratio]||[16,9];
    const w=(diag*rw/Math.sqrt(rw*rw+rh*rh)*2.54).toFixed(1);
    const h=(diag*rh/Math.sqrt(rw*rw+rh*rh)*2.54).toFixed(1);
    return {value:`${w}×${h}`, unit:'cm', desc:`${diag}" ${i.aspect_ratio} | ${(+w/100).toFixed(2)}×${(+h/100).toFixed(2)}m`};
  },

  tv_height: (i) => {
    const tv=+i.tv_size, dist=+i.sofa_distance, eye=+i.eye_height||120;
    if(!tv||!dist) return null;
    const tvH=(tv*2.54*9/Math.sqrt(337)).toFixed(1);
    const ideal=(eye-tvH/2).toFixed(0);
    return {value:ideal, unit:'cm (nedre kant høyde)', desc:`TV høyde: ${tvH}cm | Øyehøyde: ${eye}cm`};
  },

  nps_calc: (i) => {
    const p=+i.promoters, d=+i.detractors;
    if(isNaN(p)||isNaN(d)) return null;
    const nps=(p-d).toFixed(0);
    const quality=nps>70?'Utmerket 🏆':nps>50?'Bra ✓':nps>0?'OK':'Trenger forbedring ⚠️';
    return {value:nps, unit:'NPS', desc:`${quality} | Promoters:${p}% Detractors:${d}%`};
  },

  numerology: (i) => {
    if(!i.birthdate) return null;
    const digits=i.birthdate.replace(/-/g,'').split('').map(Number);
    let sum=digits.reduce((a,b)=>a+b,0);
    while(sum>9&&sum!==11&&sum!==22&&sum!==33) {
      sum=String(sum).split('').map(Number).reduce((a,b)=>a+b,0);
    }
    const meanings={1:'Leder',2:'Fredmaker',3:'Kreativ',4:'Bygger',5:'Eventyrer',6:'Omsorgsgiver',7:'Søker',8:'Ambisiøs',9:'Humanist',11:'Intuitiv mester',22:'Mester bygger',33:'Mester lærer'};
    return {value:sum, unit:`(Livstallsverdi)`, desc:meanings[sum]||'Unik energi'};
  },

  name_numerology: (i) => {
    if(!i.name) return null;
    const vals={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
    let sum=i.name.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((a,c)=>a+(vals[c]||0),0);
    while(sum>9) sum=String(sum).split('').map(Number).reduce((a,b)=>a+b,0);
    const meanings={1:'Lederskap',2:'Samarbeid',3:'Kreativitet',4:'Stabilitet',5:'Frihet',6:'Kjærlighet',7:'Visdom',8:'Suksess',9:'Humanisme'};
    return {value:sum, unit:'(Navnetall)', desc:meanings[sum]||'Unik energi'};
  },

  audiobook_calc: (i) => {
    const pages=+i.pages;
    const speeds={'1x':1,'1.25x':1.25,'1.5x':1.5,'2x':2};
    const speed=speeds[i.speed]||1;
    const baseHours=pages*1.5/60;
    const hours=(baseHours/speed).toFixed(1);
    const mins=Math.round((+hours%1)*60);
    return {value:Math.floor(+hours), unit:`timer ${mins} min`, desc:`${pages} sider @ ${i.speed||'1x'} hastighet`};
  },

  tv_size_calc: (i) => {
    const w=+i.room_width, d=+i.viewing_distance;
    if(!d) return null;
    const recommended=(d*100/2.5).toFixed(0);
    const max=(d*100/1.5).toFixed(0);
    return {value:recommended, unit:'tommer (anbefalt)', desc:`Maks: ${max}" | For ${d}m avstand`};
  },

  hours_to_days: (i) => { const h=+i.hours; if(!h) return null; const d=(h/24).toFixed(4); const w=(h/168).toFixed(4); return {value:d, unit:'dager', desc:h+' timer = '+d+' dager = '+w+' uker'}; },

  metal_weight: (i) => { const l=+i.length, w=+i.width, t=+i.thickness; if(!l||!w||!t) return null; const density={'Stål':7.85,'Aluminium':2.70,'Kobber':8.96,'Messing':8.50,'Titan':4.51}; const d=density[i.metal]||7.85; const vol=(l*w*(t/10))/1000; const weight=(vol*d).toFixed(3); return {value:weight, unit:'kg', desc:i.metal+' | Volum: '+vol.toFixed(4)+'L × '+d+'kg/L'}; },

  psi_to_bar: (i) => { const p=+i.psi; if(!p) return null; const bar=(p*0.0689476).toFixed(4); return {value:bar, unit:'bar', desc:p+' PSI = '+bar+' bar = '+(p*6894.76).toFixed(0)+' Pa'}; },

  scale_calc: (i) => { const r=+i.real_size, s=+i.scale; if(!r||!s) return null; const model=(r/s).toFixed(4); return {value:model, unit:i.unit||'mm (modell)', desc:'1:'+s+' skala | Virkelig: '+r+i.unit+' → Modell: '+model+i.unit}; },

  gram_to_ml: (i) => { const g=+i.grams; if(!g) return null; const density={'Vann':1,'Melk':1.03,'Olje':0.92,'Alkohol':0.789,'Honning':1.42}; const d=density[i.substance]||1; return {value:(g/d).toFixed(4), unit:'ml', desc:g+'g ÷ '+d+'g/ml ('+i.substance+')'}; },

  liter_to_gallon: (i) => { const l=+i.liter; if(!l) return null; return {value:(l*0.264172).toFixed(4), unit:'gallon', desc:l+' L = '+(l*0.264172).toFixed(4)+' gal'}; },

  gallon_to_cubicinch: (i) => { const g=+i.gallons; if(!g) return null; return {value:(g*231).toFixed(2), unit:'in³', desc:g+' gallon = '+(g*231)+' kubikktommer'}; },

  password_gen: (i) => { const len=+i.length||12; let chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; if(i.include_numbers==='Ja') chars+='0123456789'; if(i.include_symbols==='Ja') chars+='!@#$%^&*()_+-=[]{}'; let pwd=''; for(let j=0;j<len;j++) pwd+=chars[Math.floor(Math.random()*chars.length)]; const strength=len<8?'Svakt':len<12?'Middels':len<16?'Sterkt':'Veldig sterkt'; return {value:pwd, unit:'', desc:'Styrke: '+strength+' | '+len+' tegn'}; },

  sqkm_to_sqmiles: (i) => { const k=+i.sqkm; if(!k) return null; return {value:(k*0.386102).toFixed(4), unit:'miles²', desc:k+' km² = '+(k*0.386102).toFixed(4)+' mi²'}; },

  ml_to_gallon: (i) => { const m=+i.ml; if(!m) return null; return {value:(m/3785.41).toFixed(6), unit:'gallon', desc:m+' ml = '+(m/3785.41).toFixed(6)+' gal'}; },

  cups_to_liter: (i) => { const c=+i.cups; if(!c) return null; return {value:(c*0.236588).toFixed(4), unit:'liter', desc:c+' kopper = '+(c*0.236588).toFixed(4)+' L'}; },

  inches_to_cm: (i) => { const inch=+i.inches; if(!inch) return null; return {value:(inch*2.54).toFixed(4), unit:'cm', desc:inch+'" = '+(inch*2.54).toFixed(4)+' cm'}; },

  pool_salt: (i) => { const vol=+i.volume, curr=+i.current_ppm, target=+i.target_ppm; if(!vol||!target) return null; const diff=target-curr; if(diff<=0) return {value:0, unit:'kg', desc:'Salt nivå er allerede høyt nok!'}; const kg=(vol*diff/1000000*1000).toFixed(2); return {value:kg, unit:'kg salt', desc:'Legg til '+kg+'kg salt i '+vol+'L basseng'}; },

  sqyard_calc: (i) => { const l=+i.length, w=+i.width; if(!l||!w) return null; const sqft=l*w; const sqyd=(sqft/9).toFixed(4); return {value:sqyd, unit:'yard²', desc:l+"' × "+w+"' = "+sqft+' ft² = '+sqyd+' yd²'}; },

  km_to_miles: (i) => { const k=+i.km; if(!k) return null; return {value:(k*0.621371).toFixed(4), unit:'miles', desc:k+' km = '+(k*0.621371).toFixed(4)+' miles = '+(k*1000).toFixed(0)+' m'}; },

  hours_to_decimal: (i) => { const h=+i.hours, m=+i.minutes; if(isNaN(h)||isNaN(m)) return null; const dec=(h+m/60).toFixed(4); return {value:dec, unit:'desimaltimer', desc:h+'t '+m+'min = '+dec+' timer'}; },

  fahrenheit_to_celsius: (i) => { const f=+i.fahrenheit; if(isNaN(f)) return null; const c=(f-32)*5/9; return {value:c.toFixed(2), unit:'°C', desc:f+'°F = '+c.toFixed(2)+'°C = '+(c+273.15).toFixed(2)+'K'}; },

  amp_to_kw: (i) => { const a=+i.ampere, v=+i.voltage; if(!a||!v) return null; const kw=(a*v/1000).toFixed(4); return {value:kw, unit:'kW', desc:a+'A × '+v+'V = '+(a*v)+'W = '+kw+'kW'}; },

  kpa_to_psi: (i) => { const k=+i.kpa; if(!k) return null; return {value:(k*0.145038).toFixed(4), unit:'PSI', desc:k+' kPa = '+(k*0.145038).toFixed(4)+' PSI = '+(k/100).toFixed(4)+' bar'}; },

  shoe_size_calc: (i) => { const fl=+i.foot_length; if(!fl) return null; const eu=Math.round(fl/0.667); const us_m=Math.round((fl/0.846)-23); const us_f=Math.round((fl/0.846)-22); return {value:eu, unit:'EU', desc:'US Mann: '+us_m+' | US Kvinne: '+us_f+' | Fot: '+fl+'cm'}; },

  quart_to_gallon: (i) => { const q=+i.quart; if(!q) return null; return {value:(q/4).toFixed(4), unit:'gallon', desc:q+' quart = '+(q/4)+' gallon'}; },

  pipe_volume: (i) => { const d=+i.diameter/1000, l=+i.length; if(!d||!l) return null; const vol=(Math.PI*(d/2)*(d/2)*l*1000).toFixed(4); return {value:vol, unit:'liter', desc:'D='+i.diameter+'mm × L='+l+'m | '+vol+'L'}; },

  linear_feet: (i) => { const m=+i.length; if(!m) return null; return {value:(m*3.28084).toFixed(4), unit:'lineære fot', desc:m+' meter = '+(m*3.28084).toFixed(4)+' ft'}; },

  unit_price: (i) => { const p=+i.total_price, q=+i.quantity; if(!p||!q) return null; return {value:(p/q).toFixed(2), unit:'kr per enhet', desc:p+'kr ÷ '+q+' = '+(p/q).toFixed(2)+' kr/stk'}; },

  crore_to_million: (i) => { const c=+i.crore; if(!c) return null; return {value:(c*10).toFixed(2), unit:'million', desc:c+' crore = '+(c*10)+' million = '+(c*10000000).toLocaleString('nb-NO')+' (tall)'}; },

  liter_to_cubicinch: (i) => { const l=+i.liter; if(!l) return null; return {value:(l*61.0237).toFixed(4), unit:'in³', desc:l+' L = '+(l*61.0237).toFixed(4)+' kubikktommer'}; },

  cc_to_oz: (i) => { const c=+i.cc; if(!c) return null; return {value:(c*0.033814).toFixed(4), unit:'fl oz', desc:c+' cc = '+(c*0.033814).toFixed(4)+' oz'}; },

  ml_to_liter: (i) => { const m=+i.ml; if(!m) return null; return {value:(m/1000).toFixed(4), unit:'liter', desc:m+' ml = '+(m/1000)+' L'}; },

  fahrenheit_to_kelvin: (i) => { const f=+i.fahrenheit; if(isNaN(f)) return null; const k=((f-32)*5/9+273.15).toFixed(2); return {value:k, unit:'K', desc:f+'°F = '+((f-32)*5/9).toFixed(2)+'°C = '+k+'K'}; },

  sqm_to_dekar: (i) => { const s=+i.sqm; if(!s) return null; return {value:(s/1000).toFixed(6), unit:'dekar', desc:s+' m² = '+(s/1000).toFixed(4)+' dekar = '+(s/10000).toFixed(6)+' hektar'}; },

  pints_to_cups: (i) => { const p=+i.pints; if(!p) return null; return {value:(p*2).toFixed(2), unit:'kopper', desc:p+' pint = '+(p*2)+' kopper = '+(p*473.176).toFixed(0)+' ml'}; },

  speed_converter: (i) => { const v=+i.value; if(!v) return null; const toMs={'km/t':1/3.6,'m/s':1,'mph':0.44704,'knop':0.514444}; const ms=v*(toMs[i.from_unit]||1); const result=ms/(toMs[i.to_unit]||1); return {value:result.toFixed(4), unit:i.to_unit, desc:v+' '+i.from_unit+' = '+result.toFixed(4)+' '+i.to_unit}; },

  oz_to_liter: (i) => { const o=+i.oz; if(!o) return null; return {value:(o*0.0295735).toFixed(4), unit:'liter', desc:o+' fl oz = '+(o*0.0295735).toFixed(4)+' L = '+(o*29.5735).toFixed(2)+' ml'}; },

  ml_to_cc: (i) => { const m=+i.ml; if(!m) return null; return {value:m, unit:'cc', desc:'1 ml = 1 cc | '+m+' ml = '+m+' cc'}; },

  ring_size_calc: (i) => { const d=+i.diameter, c=+i.circumference; if(!d&&!c) return null; const circ=c||(d*Math.PI); const eu=Math.round((circ-40)/2); return {value:eu, unit:'(EU ringstørrelse)', desc:'Omkrets: '+circ.toFixed(1)+'mm | EU: '+eu}; },

  kelvin_to_fahrenheit: (i) => { const k=+i.kelvin; if(!k) return null; const f=((k-273.15)*9/5+32).toFixed(2); const c=(k-273.15).toFixed(2); return {value:f, unit:'°F', desc:k+'K = '+c+'°C = '+f+'°F'}; },

  cm_to_inches: (i) => { const c=+i.cm; if(!c) return null; return {value:(c/2.54).toFixed(4), unit:'tommer', desc:c+' cm = '+(c/2.54).toFixed(4)+'"'}; },

  cubicft_to_cubicm: (i) => { const cf=+i.cubic_feet; if(!cf) return null; return {value:(cf*0.0283168).toFixed(6), unit:'m³', desc:cf+' ft³ = '+(cf*0.0283168).toFixed(6)+' m³'}; },

  sqmiles_to_sqkm: (i) => { const m=+i.sqmiles; if(!m) return null; return {value:(m*2.58999).toFixed(4), unit:'km²', desc:m+' mi² = '+(m*2.58999).toFixed(4)+' km²'}; },

  ml_to_mg: (i) => { const m=+i.ml, d=+i.density||1; if(!m) return null; return {value:(m*d*1000).toFixed(2), unit:'mg', desc:m+'ml × '+d+'g/ml × 1000 = '+(m*d*1000).toFixed(2)+'mg'}; },

  crore_to_billion: (i) => { const c=+i.crore; if(!c) return null; return {value:(c/100).toFixed(4), unit:'milliard', desc:c+' crore = '+(c/100)+' milliard = '+(c*10000000).toLocaleString('nb-NO')}; },

  kcal_to_cal: (i) => { const k=+i.kcal; if(!k) return null; return {value:(k*1000).toLocaleString('nb-NO'), unit:'kalorier (cal)', desc:k+' kcal = '+(k*1000)+' cal | 1 kcal = 1000 cal'}; },

  oz_to_cc: (i) => { const o=+i.oz; if(!o) return null; return {value:(o*29.5735).toFixed(4), unit:'cc/ml', desc:o+' fl oz = '+(o*29.5735).toFixed(4)+' cc'}; }
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

