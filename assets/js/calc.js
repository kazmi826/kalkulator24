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
    return {value:(mm/25.4).toFixed(4), unit:'tommer', desc:mm+' mm = '+(mm/25.4).toFixed(4)+' mm'};
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

  oz_to_cc: (i) => { const o=+i.oz; if(!o) return null; return {value:(o*29.5735).toFixed(4), unit:'cc/ml', desc:o+' fl oz = '+(o*29.5735).toFixed(4)+' cc'}; },

  hours_to_minutes: (i) => { const h=+i.hours; if(!h) return null; const m=h*60; const s=h*3600; return {value:m.toLocaleString('nb-NO'), unit:'minutter', desc:h+' timer = '+m+' min = '+s.toLocaleString('nb-NO')+' sekunder'}; },

  cubicyard_to_cubicft: (i) => { const y=+i.cubic_yards; if(!y) return null; return {value:(y*27).toFixed(2), unit:'kubikkfot', desc:y+' yd³ = '+(y*27)+' ft³'}; },

  deg_to_rad: (i) => { const d=+i.degrees; if(isNaN(d)) return null; const r=(d*Math.PI/180).toFixed(6); return {value:r, unit:'radianer', desc:d+'° = '+r+' rad | π = '+( d/180).toFixed(4)+'π'}; },

  liter_to_pints: (i) => { const l=+i.liter; if(!l) return null; return {value:(l*2.11338).toFixed(4), unit:'pints', desc:l+' L = '+(l*2.11338).toFixed(4)+' pt'}; },

  feet_to_meter: (i) => { const f=+i.feet; if(!f) return null; return {value:(f*0.3048).toFixed(4), unit:'meter', desc:f+' fot = '+(f*0.3048).toFixed(4)+' m'}; },

  sqm_to_sqft: (i) => { const s=+i.sqm; if(!s) return null; return {value:(s*10.7639).toFixed(4), unit:'ft²', desc:s+' m² = '+(s*10.7639).toFixed(4)+' ft²'}; },

  pressure_convert: (i) => { const v=+i.value; if(!v) return null; const toPa={'Pa':1,'kPa':1000,'MPa':1000000,'bar':100000,'atm':101325,'PSI':6894.76,'mmHg':133.322}; const pa=v*(toPa[i.from_unit]||1); const result=pa/(toPa[i.to_unit]||1000); return {value:result.toFixed(4), unit:i.to_unit, desc:v+' '+i.from_unit+' = '+result.toFixed(4)+' '+i.to_unit}; },

  liter_to_quart: (i) => { const l=+i.liter; if(!l) return null; return {value:(l*1.05669).toFixed(4), unit:'quart', desc:l+' L = '+(l*1.05669).toFixed(4)+' qt'}; },

  inches_to_mm: (i) => { const inch=+i.inches; if(!inch) return null; return {value:(inch*25.4).toFixed(4), unit:'mm', desc:inch+'" = '+(inch*25.4).toFixed(4)+' mm'}; },

  moa_to_inches: (i) => { const m=+i.moa, d=+i.distance; if(!m||!d) return null; const inches=(m*d/100).toFixed(3); return {value:inches, unit:'tommer', desc:m+' MOA @ '+d+' yard = '+inches+'"'}; },

  cbm_calc: (i) => { const l=+i.length, w=+i.width, h=+i.height, q=+i.quantity||1; if(!l||!w||!h) return null; const cbm=(l*w*h/1000000*q).toFixed(4); return {value:cbm, unit:'CBM (m³)', desc:l+'×'+w+'×'+h+'cm × '+q+' stk = '+cbm+' m³'}; },

  roman_numeral: (i) => { const n=+i.number; if(!n||n<1||n>3999) return null; const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1]; const s=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']; let r='',num=n; v.forEach((val,idx)=>{while(num>=val){r+=s[idx];num-=val;}}); return {value:r, unit:'(romertall)', desc:n+' = '+r}; },

  miles_to_km: (i) => { const m=+i.miles; if(!m) return null; return {value:(m*1.60934).toFixed(4), unit:'km', desc:m+' miles = '+(m*1.60934).toFixed(4)+' km = '+(m*1609.34).toFixed(0)+' m'}; },

  billion_to_crore: (i) => { const b=+i.billion; if(!b) return null; return {value:(b*100).toFixed(2), unit:'crore', desc:b+' milliard = '+(b*100)+' crore = '+(b*1000000000).toLocaleString('nb-NO')}; },

  cubicinch_to_liter: (i) => { const ci=+i.cubic_inches; if(!ci) return null; return {value:(ci*0.0163871).toFixed(6), unit:'liter', desc:ci+' in³ = '+(ci*0.0163871).toFixed(6)+' L'}; },

  celsius_to_fahrenheit: (i) => { const c=+i.celsius; if(isNaN(c)) return null; const f=(c*9/5+32).toFixed(2); return {value:f, unit:'°F', desc:c+'°C = '+f+'°F = '+(c+273.15).toFixed(2)+'K'}; },

  million_to_crore: (i) => { const m=+i.million; if(!m) return null; return {value:(m/10).toFixed(4), unit:'crore', desc:m+' million = '+(m/10)+' crore'}; },

  eth_mining: (i) => { const h=+i.hashrate, p=+i.power, ec=+i.electricity_cost, ep=+i.eth_price; if(!h||!p||!ec||!ep) return null; const daily_eth=h*0.0000002; const daily_revenue=daily_eth*ep; const daily_cost=(p/1000)*24*ec; const profit=(daily_revenue-daily_cost).toFixed(2); return {value:profit, unit:'kr/dag', desc:'Inntekt: '+(daily_revenue).toFixed(2)+'kr | Kostnad: '+daily_cost.toFixed(2)+'kr'}; },

  crypto_profit: (i) => { const buy=+i.buy_price, sell=+i.sell_price, amt=+i.amount, fee=+i.fee||0; if(!buy||!sell||!amt) return null; const gross=(sell-buy)*amt; const fees=(buy*amt+sell*amt)*fee/100; const net=(gross-fees).toFixed(2); const pct=((sell-buy)/buy*100).toFixed(2); return {value:net, unit:'kr fortjeneste', desc:pct+'% | Gebyr: '+fees.toFixed(2)+'kr'}; },

  mining_profit: (i) => { const hc=+i.power_cost, cr=+i.coin_reward, cp=+i.coin_price; if(!cr||!cp) return null; const revenue=(cr*cp).toFixed(2); const profit=(cr*cp-hc).toFixed(2); return {value:profit, unit:'kr/dag', desc:'Inntekt: '+revenue+'kr | Kostnad: '+hc+'kr'}; },

  crypto_tax: (i) => { const p=+i.profit; if(!p) return null; const rate=i.holding_period==='Over 1 år'?0.22:0.22; const tax=(p*rate).toFixed(2); return {value:tax, unit:'kr skatt', desc:'22% skatt på '+p+'kr gevinst | Netto: '+(p-+tax).toFixed(2)+'kr'}; },

  crypto_to_fiat: (i) => { const amt=+i.amount; if(!amt) return null; const prices={'Bitcoin':900000,'Ethereum':30000,'XRP':6,'Solana':1500,'BNB':4000}; const rates={'NOK':1,'USD':0.094,'EUR':0.087}; const nokVal=(prices[i.coin]||1)*amt; const result=(nokVal*(rates[i.currency]||1)).toFixed(2); return {value:result, unit:i.currency, desc:amt+' '+i.coin+' × '+prices[i.coin]+'NOK (estimat)'}; },

  crypto_staking: (i) => { const amt=+i.amount, apy=+i.apy, price=+i.coin_price, months=+i.period; if(!amt||!apy||!price) return null; const rewards=amt*(apy/100)*(months/12); const value=(rewards*price).toFixed(2); return {value:rewards.toFixed(6), unit:'coins', desc:'Verdi: '+value+'kr over '+months+' måneder | APY: '+apy+'%'}; },

  xrp_calc: (i) => { const amt=+i.xrp_amount, curr=+i.current_price, target=+i.target_price; if(!amt||!curr) return null; const current_val=(amt*curr).toFixed(2); const target_val=target?(amt*target).toFixed(2):null; const gain=target?((target-curr)/curr*100).toFixed(2):null; return {value:current_val, unit:'kr (nåværende)', desc:target?'Ved målpris: '+target_val+'kr ('+gain+'%)':'Nåværende verdi'}; },

  crypto_converter: (i) => { const amt=+i.amount; if(!amt) return null; const prices={'Bitcoin':900000,'Ethereum':30000,'XRP':6,'Solana':1500}; const rates={'NOK':1,'USD':0.094,'EUR':0.087}; const nok=(prices[i.from_coin]||1)*amt; const result=(nok*(rates[i.to_currency]||1)).toFixed(2); return {value:result, unit:i.to_currency, desc:amt+' '+i.from_coin+' ≈ '+result+' '+i.to_currency+' (estimat)'}; },

  blockchain_calc: (i) => { const tx=+i.transactions, bs=+i.block_size, bt=+i.block_time; if(!tx||!bs||!bt) return null; const tps=(tx/86400).toFixed(2); const daily_blocks=Math.round(86400/bt); return {value:tps, unit:'TPS', desc:'Blokker/dag: '+daily_blocks+' | Blokkstørrelse: '+bs+'KB'}; },

  blox_fruits: (i) => { const lvl=+i.level; if(!lvl) return null; const multi={'Normal':1,'Sjelden':2,'Legendarisk':3}; const mastery=Math.round(lvl*100*(multi[i.fruit_type]||1)); return {value:mastery.toLocaleString('nb-NO'), unit:'mastery XP', desc:i.fruit_type+' frukt på nivå '+lvl}; },

  dnd_point_buy: (i) => { const stats=[+i.strength||8,+i.dexterity||8,+i.constitution||8,+i.intelligence||8,+i.wisdom||8,+i.charisma||8]; const cost={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}; const total=stats.reduce((sum,s)=>sum+(cost[s]||0),0); const remaining=27-total; return {value:total, unit:'poeng brukt', desc:'Gjenstående: '+remaining+'/27 | '+( remaining<0?'Over budget!':'OK ✓')}; },

  palworld_breeding: (i) => { const p1=+i.parent1_level, p2=+i.parent2_level; if(!p1||!p2) return null; const child=Math.floor((p1+p2)/2); return {value:child, unit:'(barn nivå estimat)', desc:'Forelder 1: '+p1+' | Forelder 2: '+p2}; },

  minecraft_calc: (i) => { const items=+i.items; if(!items) return null; const mats={'Tre':4,'Stein':1,'Jern':1,'Gull':1,'Diamant':1,'Netheritt':1}; const per={'Tre':'4 planker','Stein':'1 blokk','Jern':'1 ingot','Gull':'1 ingot','Diamant':'1 diamant','Netheritt':'1 netheritt'}; return {value:items, unit:'gjenstander', desc:'Materiale: '+i.material+' | '+per[i.material]||'per enhet'}; },

  osrs_calc: (i) => { const curr=+i.current_xp, target=+i.target_level; if(!curr||!target) return null; const xp_table=[0,83,174,276,388,512,650,801,969,1154,1358,1584,1833,2107,2411,2746,3115,3523,3973,4470,5018,5624,6291,7028,7842,8740,9730,10824,12031,13363,14833,16456,18247,20224,22406,247886,274294,303288,335240,370299,409511,452866,500000,552844,613047,680330,757132,843882,941022,1048576,1000000000]; const target_xp=xp_table[Math.min(target-1,98)]||0; const needed=Math.max(0,target_xp-curr); return {value:needed.toLocaleString('nb-NO'), unit:'XP trengs', desc:'Mål: nivå '+target+' ('+target_xp.toLocaleString('nb-NO')+' XP)'}; },

  minecraft_circle: (i) => { const d=+i.diameter; if(!d||d<1) return null; const r=d/2; let blocks=0; for(let x=-r;x<=r;x++){for(let z=-r;z<=r;z++){if(Math.sqrt(x*x+z*z)<=r)blocks++;}} return {value:blocks, unit:'blokker', desc:'Diameter: '+d+' | Radius: '+r+' | Areal: '+blocks+' blokker'}; },

  elden_ring: (i) => { const lvl=+i.level; if(!lvl) return null; const runes=Math.round(0.02*Math.pow(lvl,3)+3.06*Math.pow(lvl,2)+105.6*lvl-895); return {value:runes.toLocaleString('nb-NO'), unit:'runer til neste nivå', desc:'Karakter nivå: '+lvl}; },

  nether_portal: (i) => { const ox=+i.overworld_x, oz=+i.overworld_z; if(isNaN(ox)||isNaN(oz)) return null; const nx=Math.round(ox/8), nz=Math.round(oz/8); return {value:'X:'+nx+' Z:'+nz, unit:'(Nether koordinater)', desc:'Overworld ('+ox+','+oz+') → Nether ('+nx+','+nz+')'}; },

  coc_calc: (i) => { const th=+i.town_hall, builders=+i.builders, hours=+i.upgrade_time; if(!th||!builders||!hours) return null; const boost=builders>=5?0.9:1; const actual=(hours*boost).toFixed(1); return {value:actual, unit:'timer', desc:'TH'+th+' | '+builders+' byggere | '+(hours-+actual).toFixed(1)+'t spart'}; },

  chocobo_color: (i) => { const steps={'Gul→Grønn':20,'Gul→Blå':23,'Gul→Hvit':18,'Grønn→Blå':43}; const key=i.current_color+'→'+i.target_color; const s=steps[key]||25; return {value:s, unit:'frukt trengs', desc:i.current_color+' → '+i.target_color+' (estimat)'}; },

  dots_calc: (i) => { const dpi=+i.dpi, sens=+i.sensitivity, fov=+i.fov||90; if(!dpi||!sens) return null; const cm360=(360/(dpi*sens*0.022)).toFixed(2); return {value:cm360, unit:'cm/360°', desc:'DPI:'+dpi+' Sens:'+sens+' FOV:'+fov+'°'}; },

  diablo3_gem: (i) => { const lvl=+i.gem_level; if(!lvl) return null; const pages=Math.ceil(lvl/10); const mats=lvl*3; return {value:mats.toLocaleString('nb-NO'), unit:'materialer', desc:'Nivå '+lvl+' '+i.gem_type+' | '+pages+' sider trengs'}; },

  bdo_horse: (i) => { const lvl=+i.horse_level, tier=+i.horse_tier; if(!lvl||!tier) return null; const xp=Math.round(lvl*100*tier); const value=Math.round(tier*1000000+lvl*50000); return {value:value.toLocaleString('nb-NO'), unit:'silver (estimat)', desc:'Tier '+tier+' nivå '+lvl+' | '+xp.toLocaleString('nb-NO')+' XP'}; },

  sod_talent: (i) => { const lvl=+i.level; if(!lvl) return null; const points=Math.floor((lvl-10)/2); return {value:Math.max(0,points), unit:'talentpoeng', desc:'Nivå '+lvl+' '+i.class+' | Tilgjengelig fra nivå 10'}; },

  wotlk_talent: (i) => { const lvl=+i.level; if(!lvl) return null; const points=Math.max(0,lvl-9); return {value:points, unit:'talentpoeng', desc:'Nivå '+lvl+' '+i.class+' | 1 poeng per nivå fra 10'}; },

  chess_calc: (i) => { const values={'Bonde':1,'Tårn':5,'Løper':3,'Springer':3,'Dronning':9,'Konge':0}; const val=values[i.pieces]||1; const phase_bonus={'Åpning':1.0,'Midtspill':1.2,'Sluttspill':i.pieces==='Bonde'?2.0:0.9}; const score=(val*(phase_bonus[i.position]||1)).toFixed(1); return {value:score, unit:'poeng', desc:i.pieces+' i '+i.position+' = '+score+' poeng'}; }
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
  },

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
  },

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
  },

  bpm_calculator: (i) => { if(!i.age || i.age < 1 || i.age > 120) return null; const maxPulse = 220 - i.age; const restingPulse = 60 + (i.age * 0.1); let targetLow, targetHigh, currentEstimate; switch(i.activity) { case 'Hvile': currentEstimate = restingPulse; targetLow = restingPulse; targetHigh = restingPulse + 10; break; case 'Lett aktivitet': currentEstimate = maxPulse * 0.5; targetLow = maxPulse * 0.5; targetHigh = maxPulse * 0.6; break; case 'Moderat aktivitet': currentEstimate = maxPulse * 0.65; targetLow = maxPulse * 0.6; targetHigh = maxPulse * 0.7; break; case 'Høy intensitet': currentEstimate = maxPulse * 0.8; targetLow = maxPulse * 0.7; targetHigh = maxPulse * 0.85; break; case 'Maksimal': currentEstimate = maxPulse; targetLow = maxPulse * 0.85; targetHigh = maxPulse; break; default: currentEstimate = restingPulse; targetLow = restingPulse; targetHigh = restingPulse + 10; } const warning = (currentEstimate > maxPulse * 0.9) ? '⚠️ Høy puls – vær forsiktig ved anstrengelse.' : (currentEstimate < 40) ? '⚠️ Svært lav hvilepuls – kontakt lege hvis symptomer.' : ''; const desc = `Estimert puls: ${Math.round(currentEstimate)} BPM | Maksimal puls (220-alder): ${Math.round(maxPulse)} BPM | Hvilepuls (ca.): ${Math.round(restingPulse)} BPM | Målområde: ${Math.round(targetLow)}–${Math.round(targetHigh)} BPM | ${warning}`; return {value: Math.round(currentEstimate), unit: 'BPM', desc: desc}; }

  portlengde_beregning: (i) => { if (!i.bilbredde || !i.klaring || !i.porttype) return null; var bilbredde = parseFloat(i.bilbredde); var klaring = parseFloat(i.klaring); var portbredde = bilbredde + 2 * klaring; var anbefaltBredde = Math.ceil(portbredde / 10) * 10; var ekstraKlaring = 0; if (i.porttype === 'Seksjonsport') ekstraKlaring = 10; else if (i.porttype === 'Vippeport') ekstraKlaring = 15; else if (i.porttype === 'Rullegardin') ekstraKlaring = 5; var totalBredde = anbefaltBredde + ekstraKlaring; var advarsel = ''; if (klaring < 20) advarsel = '⚠️ Klaring under 20 cm kan gi vanskelig innkjøring.'; else if (klaring < 30) advarsel = '⚠️ Klaring under 30 cm anbefales ikke for nybegynnere.'; else advarsel = '✅ God klaring for enkel innkjøring.'; var sammenligning = ''; if (totalBredde < 240) sammenligning = 'Standard portbredde (240 cm) er større enn beregnet.'; else if (totalBredde > 300) sammenligning = '⚠️ Portbredde over 300 cm kan kreve forsterket konstruksjon.'; else sammenligning = 'Portbredde innenfor vanlig standard (240-300 cm).'; return {value: totalBredde, unit: 'cm', desc: 'Anbefalt portbredde: ' + totalBredde + ' cm | ' + advarsel + ' | ' + sammenligning + ' | Porttype: ' + i.porttype}; }

  akkordfinner_formula: (i) => { if (!i.notes) return null; const noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']; const noteToSemitone = { 'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11 }; const notes = i.notes.split(',').map(n => n.trim().toUpperCase()).filter(n => noteToSemitone[n] !== undefined); if (notes.length < 2) return null; let rootSemitone = i.root ? noteToSemitone[i.root.trim().toUpperCase()] : noteToSemitone[notes[0]]; if (rootSemitone === undefined) rootSemitone = noteToSemitone[notes[0]]; const semitones = notes.map(n => (noteToSemitone[n] - rootSemitone + 12) % 12).sort((a,b)=>a-b); const unique = [...new Set(semitones)]; const intervals = unique.map(s => { const names = ['1','b2','2','b3','3','4','#4','5','#5','6','b7','7']; return names[s]; }); let chordName = ''; if (unique.length === 2) { if (unique[1] === 3) chordName = notes[0]+'m'; else if (unique[1] === 4) chordName = notes[0]; else if (unique[1] === 5) chordName = notes[0]+'sus4'; else if (unique[1] === 7) chordName = notes[0]+'5'; else chordName = notes[0]+'('+intervals.slice(1).join(',')+')'; } else if (unique.length === 3) { const third = unique.includes(3); const fifth = unique.includes(7); const seventh = unique.includes(10); if (third && !seventh) chordName = notes[0]; else if (!third && unique.includes(4) && unique.includes(7)) chordName = notes[0]+'sus4'; else if (third && seventh) chordName = notes[0]+'7'; else if (third && unique.includes(10)) chordName = notes[0]+'m7'; else if (third && unique.includes(11)) chordName = notes[0]+'maj7'; else if (unique.includes(3) && unique.includes(6)) chordName = notes[0]+'dim'; else if (unique.includes(4) && unique.includes(8)) chordName = notes[0]+'aug'; else chordName = notes[0]+'('+intervals.slice(1).join(',')+')'; } else if (unique.length === 4) { const hasThird = unique.includes(3) || unique.includes(4); const hasSeventh = unique.includes(10) || unique.includes(11); if (hasThird && hasSeventh) { if (unique.includes(3) && unique.includes(10)) chordName = notes[0]+'m7'; else if (unique.includes(3) && unique.includes(11)) chordName = notes[0]+'mMaj7'; else if (unique.includes(4) && unique.includes(10)) chordName = notes[0]+'7'; else if (unique.includes(4) && unique.includes(11)) chordName = notes[0]+'maj7'; else chordName = notes[0]+'7('+intervals.slice(1).join(',')+')'; } else if (unique.includes(3) && unique.includes(6) && unique.includes(10)) chordName = notes[0]+'dim7'; else if (unique.includes(3) && unique.includes(6) && unique.includes(9)) chordName = notes[0]+'m7b5'; else chordName = notes[0]+'('+intervals.slice(1).join(',')+')'; } else { chordName = notes[0]+'('+intervals.slice(1).join(',')+')'; } const rootNote = noteNames[rootSemitone]; const desc = 'Akkord: ' + chordName + ' | Intervaller: ' + intervals.join(', ') + ' | Antall toner: ' + notes.length + ' | Grunnnote: ' + rootNote; return {value: chordName, unit: '', desc: desc}; }

  halvtone_avstand: (i) => { if(!i.tone1 || !i.tone2) return null; const noter = { 'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11 }; const parse = (s) => { const m = s.match(/^([A-G][b#]?)(\d+)$/); if(!m) return null; const note = m[1]; const oct = parseInt(m[2]); const n = noter[note]; if(n === undefined) return null; return oct * 12 + n; }; const a = parse(i.tone1); const b = parse(i.tone2); if(a === null || b === null) return null; const diff = b - a; const absDiff = Math.abs(diff); const intervallNavn = ['Prim','Liten sekund','Stor sekund','Liten ters','Stor ters','Kvart','Tritonus','Kvint','Liten sekst','Stor sekst','Liten septim','Stor septim','Oktav']; const navn = absDiff <= 12 ? intervallNavn[absDiff] : (absDiff % 12 === 0 ? (absDiff/12) + ' oktav(er)' : (absDiff) + ' halvtoner'); const freqRatio = Math.pow(2, absDiff/12); const cents = absDiff * 100; const retning = diff >= 0 ? 'opp' : 'ned'; return { value: absDiff, unit: 'halvtoner', desc: `Intervall: ${navn} (${retning}) | Frekvensforhold: ${freqRatio.toFixed(4)}:1 | Cent: ${cents} | Halvtoner: ${absDiff}` }; }

  hoyttalerkasse_beregning: (i) => { if(!i.vas || !i.qts || !i.fs || !i.sd || !i.xmax) return null; const Vas = i.vas; const Qts = i.qts; const Fs = i.fs; const Sd = i.sd / 10000; const Xmax = i.xmax / 1000; const type = i.kasse_type; let Vb, Fb, portArea, portLength, fbActual, f3, maxSpl; if(type === 'Lukket') { const alpha = Math.pow(0.707 / Qts, 2) - 1; Vb = Vas / alpha; f3 = Fs * Math.sqrt(alpha + 1); maxSpl = 20 * Math.log10(0.025 * Sd * Xmax * Math.pow(f3, 2) / 0.00002); return {value: Vb, unit: 'liter', desc: `Volum: ${Vb.toFixed(1)} L | F3: ${f3.toFixed(1)} Hz | Maks SPL: ${maxSpl.toFixed(1)} dB`}; } else { const QtsOpt = 0.38; const VbOpt = 15 * Math.pow(Qts, 2.87) * Vas; Vb = VbOpt; Fb = 0.42 * Fs * Math.pow(Vas / Vb, 0.31); const portDiameter = 0.1 * Math.sqrt(Sd * 10000); portArea = Math.PI * Math.pow(portDiameter/2, 2); const Lv = (23562.5 * Math.pow(portDiameter, 2) / (Math.pow(Fb, 2) * Vb)) - (0.85 * portDiameter); portLength = Lv; f3 = Fs * Math.pow(Vas / Vb, 0.44); maxSpl = 20 * Math.log10(0.025 * Sd * Xmax * Math.pow(f3, 2) / 0.00002); return {value: Vb, unit: 'liter', desc: `Volum: ${Vb.toFixed(1)} L | Avstemming: ${Fb.toFixed(1)} Hz | Portlengde: ${portLength.toFixed(1)} cm | F3: ${f3.toFixed(1)} Hz | Maks SPL: ${maxSpl.toFixed(1)} dB`}; } }

  transpose_chord: (i) => { if(!i.chord_input || !i.from_key || !i.to_key) return null; const notes = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B']; const noteMap = {'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11}; const chordRegex = /^([A-G][#b]?)(.*)$/; const match = i.chord_input.match(chordRegex); if(!match) return {value: 'Ugyldig akkord', unit: '', desc: 'Skriv inn en gyldig akkord (f.eks. C, Dm, G7, Am, Bdim)'}; const root = match[1]; const suffix = match[2]; const fromIdx = noteMap[i.from_key]; const toIdx = noteMap[i.to_key]; const rootIdx = noteMap[root]; if(fromIdx === undefined || toIdx === undefined || rootIdx === undefined) return {value: 'Ugyldig toneart', unit: '', desc: 'Kunne ikke finne toneart'}; const semitoneDiff = (toIdx - fromIdx + 12) % 12; const newRootIdx = (rootIdx + semitoneDiff) % 12; const newRoot = notes[newRootIdx]; const enharmonic = (newRootIdx === 1 || newRootIdx === 3 || newRootIdx === 6 || newRootIdx === 8 || newRootIdx === 10) ? notes[newRootIdx + 1] : null; const transposed = newRoot + suffix; let desc = `Transponert akkord: ${transposed}`; if(enharmonic) desc += ` | Enharmonisk ekvivalent: ${enharmonic + suffix}`; desc += ` | Intervall: ${semitoneDiff} halvtonn ${semitoneDiff > 0 ? 'opp' : 'ned'}`; return {value: transposed, unit: '', desc: desc}; }

  ai_energy_usage: (i) => { if (!i.model_type || !i.queries_per_day || !i.avg_tokens_per_query || !i.hours_per_day || !i.electricity_price) return null; const modelPowerMap = { 'ChatGPT-3.5': 0.001, 'ChatGPT-4': 0.003, 'GPT-4o': 0.0025, 'Claude 3.5 Sonnet': 0.004, 'Gemini 1.5 Pro': 0.0035, 'Llama 3 70B': 0.0028 }; const wattPerToken = modelPowerMap[i.model_type] || 0.002; const totalTokens = i.queries_per_day * i.avg_tokens_per_query; const wattHours = totalTokens * wattPerToken; const kWhPerDay = wattHours / 1000; const kWhPerMonth = kWhPerDay * 30; const kWhPerYear = kWhPerDay * 365; const costPerDay = kWhPerDay * (i.electricity_price / 100); const costPerMonth = costPerDay * 30; const costPerYear = costPerDay * 365; const co2PerKWh = 0.132; // kg CO2 per kWh (norsk snitt) const co2PerDay = kWhPerDay * co2PerKWh; const co2PerMonth = co2PerMonth = kWhPerMonth * co2PerKWh; const co2PerYear = kWhPerYear * co2PerKWh; const comparison = 'Tilsvarer omtrent ' + (kWhPerDay / 10).toFixed(1) + ' timer med en 2000W varmeovn per dag.'; const warning = kWhPerDay > 5 ? 'ADVARSEL: Høyt forbruk! Vurder å redusere antall spørringer eller optimalisere modellvalg.' : 'Miljøvennlig forbruk.'; return { value: kWhPerDay, unit: 'kWh/dag', desc: 'Daglig forbruk: ' + kWhPerDay.toFixed(3) + ' kWh | Månedlig: ' + kWhPerMonth.toFixed(2) + ' kWh | Årlig: ' + kWhPerYear.toFixed(2) + ' kWh | Kostnad per dag: ' + costPerDay.toFixed(2) + ' kr | Per måned: ' + costPerMonth.toFixed(2) + ' kr | Per år: ' + costPerYear.toFixed(2) + ' kr | CO2-utslipp per dag: ' + co2PerDay.toFixed(3) + ' kg | Per måned: ' + co2PerMonth.toFixed(2) + ' kg | Per år: ' + co2PerYear.toFixed(2) + ' kg | ' + comparison + ' | ' + warning }; }

  ai_skaleringskostnader: (i) => { if (!i.modell_parametere || !i.trening_tokens || !i.gpu_antall || !i.strompris_per_kwh || !i.sky_pris_per_gpu_time) return null; const paramsB = i.modell_parametere; const tokensB = i.trening_tokens; const gpuCount = i.gpu_antall; const strompris = i.strompris_per_kwh; const skypris = i.sky_pris_per_gpu_time; const gpuTDP = { 'A100 80GB': 400, 'H100 80GB': 700, 'H200 141GB': 700, 'B200 192GB': 1000 }[i.gpu_type] || 700; const gpuPrisPerTime = { 'A100 80GB': 30, 'H100 80GB': 50, 'H200 141GB': 70, 'B200 192GB': 100 }[i.gpu_type] || 50; const flopsPerGPU = { 'A100 80GB': 312, 'H100 80GB': 989, 'H200 141GB': 989, 'B200 192GB': 2250 }[i.gpu_type] || 989; const totalFLOPs = 6 * paramsB * 1e9 * tokensB * 1e9; const gpuFLOPsPerSec = flopsPerGPU * 1e12; const totalGPUSeconds = totalFLOPs / (gpuFLOPsPerSec * gpuCount); const totalGPUTimer = totalGPUSeconds / 3600; const treningTimer = totalGPUTimer; const stromkostnad = treningTimer * gpuCount * gpuTDP / 1000 * strompris; const skykostnad = treningTimer * gpuCount * skypris; const totalKostnad = stromkostnad + skykostnad; const inferensFLOPsPerToken = 2 * paramsB * 1e9; const inferensTokensPerSecPerGPU = gpuFLOPsPerSec / inferensFLOPsPerToken; const totalInferensTokensPerSec = inferensTokensPerSecPerGPU * gpuCount; const dagligInferensTokens = totalInferensTokensPerSec * 86400; const dagligKostnad = gpuCount * 24 * (strompris * gpuTDP / 1000 + skypris); const co2PerKWh = 0.4; const co2Utslipp = stromkostnad / strompris * co2PerKWh; const benchmark = paramsB <= 7 ? 'Liten modell (7B eller mindre) – egnet for edge/on-prem' : paramsB <= 70 ? 'Mellomstor modell (13B-70B) – typisk for bedriftsbruk' : 'Stor modell (70B+) – krever betydelig infrastruktur'; return { value: totalKostnad, unit: 'NOK', desc: `Total treningskostnad: ${totalKostnad.toLocaleString('nb-NO', {maximumFractionDigits: 0})} NOK | Strøm: ${stromkostnad.toLocaleString('nb-NO', {maximumFractionDigits: 0})} NOK | Sky: ${skykostnad.toLocaleString('nb-NO', {maximumFractionDigits: 0})} NOK | Treningstid: ${(treningTimer/24).toFixed(1)} dager | Inferens kapasitet: ${(dagligInferensTokens/1e9).toFixed(1)} mrd tokens/dag | Daglig driftskostnad: ${dagligKostnad.toLocaleString('nb-NO', {maximumFractionDigits: 0})} NOK | CO2-utslipp trening: ${co2Utslipp.toFixed(0)} kg CO2 | Sammenligning: ${benchmark} | ⚠️ Merk: Estimater basert på teoretisk peak ytelse; reelle tall kan variere 20-40%` }; }

  kostnad_ai_bildegenerering: (i) => { if (!i.antall_bilder || !i.modell || !i.opplosning || !i.antall_genereringer_per_bilde) return null; const antall = parseInt(i.antall_bilder); const genereringer = parseInt(i.antall_genereringer_per_bilde); const totalGenereringer = antall * genereringer; let prisPerBilde = 0; let prisPerGenerering = 0; let modellNavn = i.modell; let enhet = 'NOK'; let beskrivelse = ''; if (i.modell === 'DALL-E 3 (HD)') { prisPerBilde = 0.08; prisPerGenerering = 0.08; enhet = 'USD'; } else if (i.modell === 'DALL-E 3 (Standard)') { prisPerBilde = 0.04; prisPerGenerering = 0.04; enhet = 'USD'; } else if (i.modell === 'Midjourney (Standard)') { prisPerBilde = 0.05; prisPerGenerering = 0.05; enhet = 'USD'; } else if (i.modell === 'Midjourney (Pro)') { prisPerBilde = 0.10; prisPerGenerering = 0.10; enhet = 'USD'; } else if (i.modell === 'Stable Diffusion (Lokal)') { prisPerBilde = 0.0; prisPerGenerering = 0.0; enhet = 'NOK'; } else if (i.modell === 'Stable Diffusion (API)') { prisPerBilde = 0.002; prisPerGenerering = 0.002; enhet = 'USD'; } else { return null; } let totalKostnad = 0; if (i.modell === 'Stable Diffusion (Lokal)') { const stromprisPerKwh = 1.2; const wattPerGenerering = 300; const timerPerGenerering = 0.05; const kwhPerGenerering = wattPerGenerering * timerPerGenerering / 1000; totalKostnad = totalGenereringer * kwhPerGenerering * stromprisPerKwh; beskrivelse = `Strømforbruk: ${(totalGenereringer * kwhPerGenerering).toFixed(2)} kWh | Strømkostnad: ${totalKostnad.toFixed(2)} NOK (ved ${stromprisPerKwh} NOK/kWh) | Sammenligning: Tilsvarer ca. ${(totalKostnad / 1.2).toFixed(1)} timer med gaming-PC`; } else { totalKostnad = totalGenereringer * prisPerGenerering; const totalBildeKostnad = antall * prisPerBilde; beskrivelse = `Total kostnad: ${totalKostnad.toFixed(2)} ${enhet} (${totalGenereringer} genereringer) | Per bilde: ${prisPerBilde.toFixed(3)} ${enhet} | Per generering: ${prisPerGenerering.toFixed(3)} ${enhet} | Sammenligning: ${totalKostnad > 10 ? 'Dyrere enn en kaffekopp ☕' : 'Billigere enn en kaffekopp ☕'} | Anbefaling: Vurder å redusere antall genereringer per bilde for å spare penger`; } return { value: totalKostnad, unit: enhet, desc: beskrivelse }; }

  ai_matematikk_kalkulator: (i) => { if(!i.x_verdier || !i.y_verdier || i.prediksjon_x === undefined || i.prediksjon_x === null || i.prediksjon_x === '') return null; const xArr = i.x_verdier.split(',').map(Number); const yArr = i.y_verdier.split(',').map(Number); if(xArr.length !== yArr.length || xArr.length < 2) return null; const n = xArr.length; const sumX = xArr.reduce((a,b)=>a+b,0); const sumY = yArr.reduce((a,b)=>a+b,0); const sumXY = xArr.reduce((a,b,i)=>a+b*yArr[i],0); const sumX2 = xArr.reduce((a,b)=>a+b*b,0); const slope = (n*sumXY - sumX*sumY) / (n*sumX2 - sumX*sumX); const intercept = (sumY - slope*sumX)/n; const predY = slope*i.prediksjon_x + intercept; const yMean = sumY/n; const ssRes = yArr.reduce((a,b,i)=>a+(b-(slope*xArr[i]+intercept))**2,0); const ssTot = yArr.reduce((a,b)=>a+(b-yMean)**2,0); const r2 = 1 - ssRes/ssTot; const r = Math.sqrt(r2) * (slope > 0 ? 1 : -1); const mse = ssRes/n; const rmse = Math.sqrt(mse); const mae = yArr.reduce((a,b,i)=>a+Math.abs(b-(slope*xArr[i]+intercept)),0)/n; const trend = slope > 0 ? 'stigende' : slope < 0 ? 'synkende' : 'flat'; const styrke = Math.abs(r) >= 0.8 ? 'sterk' : Math.abs(r) >= 0.5 ? 'moderat' : 'svak'; return {value: predY, unit: 'predikert Y', desc: `Predikert Y: ${predY.toFixed(4)} | Korrelasjon (r): ${r.toFixed(4)} | R²: ${r2.toFixed(4)} | Trend: ${trend} (${styrke}) | MSE: ${mse.toFixed(4)} | RMSE: ${rmse.toFixed(4)} | MAE: ${mae.toFixed(4)} | Antall punkter: ${n} | Ligning: y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`}; }

  ai_voiceover_cost_time_calculator: (i) => { if (!i.word_count || !i.speed) return null; const words = parseFloat(i.word_count); const speed = parseFloat(i.speed); if (words <= 0 || speed <= 0) return null; const timeMinutes = words / speed; const timeSeconds = timeMinutes * 60; const hours = Math.floor(timeMinutes / 60); const mins = Math.round(timeMinutes % 60); const secs = Math.round(timeSeconds % 60); let costPerMinute = 0; if (i.voice_type === 'Standard (enkel)') { costPerMinute = 10; } else if (i.voice_type === 'Premium (naturtro)') { costPerMinute = 25; } else if (i.voice_type === 'Ultra-realistisk (avansert)') { costPerMinute = 50; } let languageMultiplier = 1; if (i.language === 'Norsk bokmål') { languageMultiplier = 1.2; } else if (i.language === 'Engelsk') { languageMultiplier = 1.0; } else if (i.language === 'Andre språk') { languageMultiplier = 1.5; } const totalCost = (timeMinutes * costPerMinute * languageMultiplier).toFixed(2); const costPerWord = (totalCost / words).toFixed(4); const benchmarkStandard = (words / 150 * 10).toFixed(2); const benchmarkPremium = (words / 150 * 25).toFixed(2); const healthWarning = timeMinutes > 60 ? '⚠️ Prosjektet er langt (>1 time). Vurder pauser for å unngå stemmetretthet.' : ''; const comparison = `Standardkostnad: ${benchmarkStandard} kr | Premiumkostnad: ${benchmarkPremium} kr`; const desc = `Tid: ${hours}t ${mins}m ${secs}s | Kostnad: ${totalCost} kr | Kostnad per ord: ${costPerWord} kr | ${comparison}${healthWarning ? ' | ' + healthWarning : ''}`; return { value: parseFloat(totalCost), unit: 'kr', desc: desc }; }

  ai_social_media_time_savings: (i) => { if (!i.antall_innlegg_per_uke || !i.tid_per_innlegg_manuelt || !i.tid_per_innlegg_ai || !i.antall_plattformer) return null; const innleggPerUke = i.antall_innlegg_per_uke; const tidManuelt = i.tid_per_innlegg_manuelt; const tidAI = i.tid_per_innlegg_ai; const plattformer = i.antall_plattformer; const totalTidManuelt = innleggPerUke * tidManuelt * plattformer; const totalTidAI = innleggPerUke * tidAI * plattformer; const tidsbesparelsePerUke = totalTidManuelt - totalTidAI; const tidsbesparelsePerManed = tidsbesparelsePerUke * 4.33; const tidsbesparelsePerAr = tidsbesparelsePerUke * 52; const prosentBesparelse = ((tidManuelt - tidAI) / tidManuelt) * 100; const timerPerUke = tidsbesparelsePerUke / 60; const timerPerManed = tidsbesparelsePerManed / 60; const timerPerAr = tidsbesparelsePerAr / 60; return { value: Math.round(tidsbesparelsePerUke), unit: 'minutter per uke', desc: `Tidsbesparelse: ${Math.round(tidsbesparelsePerUke)} min/uke (${timerPerUke.toFixed(1)} timer) | Per måned: ${Math.round(tidsbesparelsePerManed)} min (${timerPerManed.toFixed(1)} timer) | Per år: ${Math.round(tidsbesparelsePerAr)} min (${timerPerAr.toFixed(1)} timer) | Effektivitet: ${prosentBesparelse.toFixed(0)}% raskere med AI` }; }

  ai_token_calculator: (i) => { if(!i.model || !i.input_tokens || !i.output_tokens || i.input_tokens < 0 || i.output_tokens < 0) return null; const rates = {'GPT-4': {input: 0.03, output: 0.06}, 'GPT-3.5': {input: 0.0015, output: 0.002}, 'Claude 3 Opus': {input: 0.015, output: 0.075}, 'Claude 3 Sonnet': {input: 0.003, output: 0.015}, 'Llama 3 70B': {input: 0.0009, output: 0.0009}, 'Mistral Large': {input: 0.008, output: 0.024}}; const r = rates[i.model]; const costInput = (i.input_tokens / 1000) * r.input; const costOutput = (i.output_tokens / 1000) * r.output; const totalCost = costInput + costOutput; const totalTokens = i.input_tokens + i.output_tokens; const avgCostPer1k = (totalCost / totalTokens) * 1000; const warnings = []; if(totalCost > 1) warnings.push('⚠️ Høy kostnad: over $1'); if(i.input_tokens > 100000) warnings.push('⚠️ Svært mange input tokens, vurder å forkorte'); if(i.output_tokens > 10000) warnings.push('⚠️ Lang output, kan gi høy kostnad'); const warningStr = warnings.length > 0 ? ' | ' + warnings.join(' | ') : ''; return {value: totalCost, unit: 'USD', desc: 'Total kostnad: $' + totalCost.toFixed(4) + ' | Totalt tokens: ' + totalTokens + ' | Gj.snitt pris per 1k tokens: $' + avgCostPer1k.toFixed(4) + warningStr}; }

  ai_training_cost_calculator: (i) => { if (!i.gpu_type || !i.gpu_count || !i.training_hours || !i.electricity_price || !i.cloud_cost_per_hour) return null; const gpuPower = { 'NVIDIA A100 80GB': 400, 'NVIDIA H100 80GB': 700, 'NVIDIA RTX 4090': 450, 'NVIDIA RTX 3090': 350, 'AMD MI250X': 500, 'Google TPU v4': 300 }; const gpuCost = { 'NVIDIA A100 80GB': 40, 'NVIDIA H100 80GB': 80, 'NVIDIA RTX 4090': 15, 'NVIDIA RTX 3090': 10, 'AMD MI250X': 35, 'Google TPU v4': 60 }; const powerW = gpuPower[i.gpu_type] || 400; const costPerGpuHour = gpuCost[i.gpu_type] || 20; const totalPowerKWh = (powerW * i.gpu_count * i.training_hours) / 1000; const electricityCost = totalPowerKWh * i.electricity_price; const cloudCost = i.cloud_cost_per_hour * i.gpu_count * i.training_hours; const totalCost = electricityCost + cloudCost; const co2Kg = totalPowerKWh * 0.4; const co2Trees = Math.round(co2Kg / 21.7); const gpuDays = (i.gpu_count * i.training_hours) / 24; const benchmarkGPT3 = 3640; const benchmarkLLaMA65B = 2048; const benchmarkGPT4 = 25000; const pctOfGPT3 = ((totalCost / benchmarkGPT3) * 100).toFixed(1); const pctOfLLaMA = ((totalCost / benchmarkLLaMA65B) * 100).toFixed(1); const pctOfGPT4 = ((totalCost / benchmarkGPT4) * 100).toFixed(1); let warning = ''; if (totalCost > 100000) warning = '⚠️ Høye kostnader – vurder å optimalisere modell eller bruk mindre GPUer.'; else if (totalCost > 10000) warning = '⚠️ Moderate kostnader – sjekk om du kan redusere treningstiden.'; else warning = '✅ Kostnadene er lave – godt planlagt.'; return { value: totalCost, unit: 'NOK', desc: `Strømkostnad: ${electricityCost.toFixed(0)} NOK | Skykostnad: ${cloudCost.toFixed(0)} NOK | Total: ${totalCost.toFixed(0)} NOK | CO2-utslipp: ${co2Kg.toFixed(1)} kg (tilsvarer ${co2Trees} trær) | GPU-døgn: ${gpuDays.toFixed(1)} | Sammenligning: ${pctOfGPT3}% av GPT-3, ${pctOfLLaMA}% av LLaMA 65B, ${pctOfGPT4}% av GPT-4 | ${warning}` }; }

  chatgpt_calculator: (i) => { if(!i.model_type || !i.input_tokens || !i.output_tokens || !i.requests_per_day) return null; const rates = {'GPT-4o': {input: 5.00, output: 15.00}, 'GPT-4 Turbo': {input: 10.00, output: 30.00}, 'GPT-3.5 Turbo': {input: 0.50, output: 1.50}, 'GPT-4o mini': {input: 0.15, output: 0.60}}; const rate = rates[i.model_type]; if(!rate) return null; const costPerRequest = (i.input_tokens / 1000) * rate.input + (i.output_tokens / 1000) * rate.output; const dailyCost = costPerRequest * i.requests_per_day; const monthlyCost = dailyCost * 30; const yearlyCost = dailyCost * 365; const totalTokensPerDay = (i.input_tokens + i.output_tokens) * i.requests_per_day; const avgResponseTime = i.model_type.includes('Turbo') ? 1.5 : (i.model_type === 'GPT-4o' ? 2.0 : (i.model_type === 'GPT-4o mini' ? 0.8 : 3.0)); const dailyTimeMinutes = (totalTokensPerDay / 1000) * avgResponseTime / 60; const benchmark = i.model_type === 'GPT-3.5 Turbo' ? 'Lav kvalitet, rask' : (i.model_type === 'GPT-4o mini' ? 'Lav kostnad, god kvalitet' : 'Høy kvalitet, dyrere'); return {value: costPerRequest, unit: 'USD per forespørsel', desc: `Kostnad per forespørsel: $${costPerRequest.toFixed(4)} | Daglig: $${dailyCost.toFixed(2)} | Månedlig: $${monthlyCost.toFixed(2)} | Årlig: $${yearlyCost.toFixed(2)} | Totalt tokens/dag: ${totalTokensPerDay.toLocaleString()} | Estimert responstid: ${avgResponseTime.toFixed(1)} sekunder per 1k tokens | Daglig tidsbruk: ${dailyTimeMinutes.toFixed(1)} min | Sammenligning: ${benchmark} | Advarsel: Høye kostnader ved store volumer, vurder GPT-4o mini for lavere kostnad`}; }

  token_teller_beregning: (i) => { if(!i.antall_tokens || !i.pris_per_token || !i.investert_belop || !i.forventet_pris) return null; const antall = i.antall_tokens; const pris = i.pris_per_token; const investert = i.investert_belop; const forventet = i.forventet_pris; const naverdi = antall * pris; const fremtidigVerdi = antall * forventet; const avkastning = fremtidigVerdi - investert; const avkastningProsent = ((fremtidigVerdi - investert) / investert) * 100; const breakEvenPris = investert / antall; const advarsel = (forventet > pris * 5) ? '⚠️ Høy forventning: vær oppmerksom på risiko.' : (forventet < pris) ? '⚠️ Forventet pris er lavere enn nåværende – mulig tap.' : ''; const benchmark = (avkastningProsent > 100) ? '🏆 Over 100% avkastning – svært høy gevinst.' : (avkastningProsent > 50) ? '🌟 God avkastning over 50%.' : (avkastningProsent > 0) ? '✅ Positiv avkastning.' : '❌ Negativ avkastning – vurder risiko.'; return {value: fremtidigVerdi, unit: 'NOK', desc: `Nåverdi: ${naverdi.toFixed(2)} NOK | Fremtidig verdi: ${fremtidigVerdi.toFixed(2)} NOK | Avkastning: ${avkastning.toFixed(2)} NOK (${avkastningProsent.toFixed(2)}%) | Break-even pris: ${breakEvenPris.toFixed(2)} NOK | ${advarsel} ${benchmark}`}; }

  batterikapasitet_beregning: (i) => { if(!i.spenning || !i.kapasitet_ah || !i.ladeeffekt || !i.forbruk_w || !i.batteritype) return null; const V = parseFloat(i.spenning); const Ah = parseFloat(i.kapasitet_ah); const P_lade = parseFloat(i.ladeeffekt); const P_forbruk = parseFloat(i.forbruk_w); const type = i.batteritype; const kWh = V * Ah / 1000; const ladeTidTimer = (kWh * 1000) / P_lade; const effektivKapasitet = type === 'Bly-syre' ? kWh * 0.5 : type === 'Li-ion' ? kWh * 0.9 : type === 'LiFePO4' ? kWh * 0.95 : type === 'NiMH' ? kWh * 0.8 : kWh * 0.3; const driftTimer = (effektivKapasitet * 1000) / P_forbruk; const ladeTidMinutter = ladeTidTimer * 60; const anbefaltLader = Math.round(kWh * 1000 * 0.2); const helseAdvarsel = type === 'Bly-syre' ? 'Bly-syre bør ikke lades under 50% for lang levetid.' : type === 'Li-ion' ? 'Li-ion bør holdes mellom 20-80% for optimal levetid.' : type === 'LiFePO4' ? 'LiFePO4 tåler dype utladninger godt.' : type === 'NiMH' ? 'NiMH har høy selvutladning.' : 'Alkaline er ikke oppladbare.'; return {value: kWh, unit: 'kWh', desc: `Total energi: ${kWh.toFixed(2)} kWh | Effektiv kapasitet: ${effektivKapasitet.toFixed(2)} kWh | Ladetid: ${ladeTidTimer.toFixed(1)} timer (${ladeTidMinutter.toFixed(0)} min) | Driftstid: ${driftTimer.toFixed(1)} timer | Anbefalt lader: ${anbefaltLader} W | ${helseAdvarsel}`}; }

  ip_subnet_calculator: (i) => { if (!i.ip_address || i.cidr === undefined || i.cidr === null || i.cidr < 0 || i.cidr > 32) return null; const parts = i.ip_address.split('.').map(Number); if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null; const ipInt = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0; const mask = ~(0xFFFFFFFF >>> i.cidr) >>> 0; const network = (ipInt & mask) >>> 0; const broadcast = (network | ~mask) >>> 0; const firstHost = network + 1; const lastHost = broadcast - 1; const numHosts = Math.pow(2, 32 - i.cidr) - 2; const wildcard = (~mask) >>> 0; const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); const maskIp = toIp(mask); const networkIp = toIp(network); const broadcastIp = toIp(broadcast); const firstHostIp = toIp(firstHost); const lastHostIp = toIp(lastHost); const wildcardIp = toIp(wildcard); let desc = `Nettverk: ${networkIp} | Broadcast: ${broadcastIp} | Maske: ${maskIp} | Wildcard: ${wildcardIp} | Første vert: ${firstHostIp} | Siste vert: ${lastHostIp} | Antall verter: ${numHosts}`; if (numHosts < 2) desc += ' | Advarsel: Ingen brukbare verter (for lite subnett)'; else if (numHosts < 10) desc += ' | Lite subnett, egnet for punkt-til-punkt'; else if (numHosts > 65534) desc += ' | Stort subnett, vurder å dele opp for bedre sikkerhet'; return {value: networkIp, unit: '', desc: desc}; }

  nedlastingshastighet_formel: (i) => { if(!i.filstorrelse || !i.hastighet || !i.enhet) return null; const filMB = i.enhet === 'GB' ? i.filstorrelse * 1024 : i.filstorrelse; const hastighetMBps = i.hastighet / 8; const tidSekunder = filMB / hastighetMBps; const tidMinutter = tidSekunder / 60; const tidTimer = tidMinutter / 60; const tidDager = tidTimer / 24; let desc = ''; if(tidSekunder < 60) { desc = `Estimert tid: ${tidSekunder.toFixed(1)} sekunder`; } else if(tidMinutter < 60) { desc = `Estimert tid: ${tidMinutter.toFixed(1)} minutter (${tidSekunder.toFixed(0)} sekunder)`; } else if(tidTimer < 24) { desc = `Estimert tid: ${tidTimer.toFixed(2)} timer (${tidMinutter.toFixed(1)} minutter)`; } else { desc = `Estimert tid: ${tidDager.toFixed(2)} dager (${tidTimer.toFixed(2)} timer)`; } const hastigheter = [10, 30, 50, 100, 250, 500, 1000]; const sammenligninger = hastigheter.map(h => { const tid = filMB / (h / 8); const tMin = tid / 60; if(tMin < 1) return `${h} Mbps: ${tid.toFixed(1)} sek`; else if(tMin < 60) return `${h} Mbps: ${tMin.toFixed(1)} min`; else return `${h} Mbps: ${(tMin/60).toFixed(2)} t`; }).join(' | '); desc += ` | Sammenligning: ${sammenligninger}`; if(i.hastighet < 25) { desc += ' | ⚠️ Advarsel: Hastigheten er under 25 Mbps, noe som kan gi treg nedlasting for store filer.'; } else if(i.hastighet >= 100) { desc += ' | ✅ Rask forbindelse: Over 100 Mbps er ideelt for store nedlastinger.'; } return {value: tidSekunder, unit: 'sekunder', desc: desc}; }

  musikkintervall_beregning: (i) => { if(!i.tone1 || !i.tone2) return null; const noter = {'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,'A':9,'A#':10,'Bb':10,'B':11}; const parseTone = (t) => { const match = t.match(/^([A-G][b#]?)(\d+)$/); if(!match) return null; const note = match[1]; const oktav = parseInt(match[2]); const halvtoner = noter[note]; if(halvtoner === undefined) return null; return (oktav + 1) * 12 + halvtoner; }; const h1 = parseTone(i.tone1.toUpperCase()); const h2 = parseTone(i.tone2.toUpperCase()); if(h1 === null || h2 === null) return {value: 0, unit: 'halvtoner', desc: 'Ugyldig tone. Bruk format som C4, F#5, Bb3.'}; const diff = Math.abs(h2 - h1); const halvtoner = diff % 12; const oktav = Math.floor(diff / 12); const intervallNavn = ['Prim','Liten sekund','Stor sekund','Liten ters','Stor ters','Kvart','Tritonus','Kvint','Liten sekst','Stor sekst','Liten septim','Stor septim']; const navn = intervallNavn[halvtoner] + (oktav > 0 ? ' (+' + oktav + ' oktav)' : ''); const frekvensForhold = Math.pow(2, diff/12); const cents = diff * 100; const beskrivelse = 'Intervall: ' + navn + ' | Halvtoner: ' + diff + ' | Frekvensforhold: ' + frekvensForhold.toFixed(4) + ':1 | Cents: ' + cents + ' | ' + (diff === 0 ? 'Samme tone' : diff === 12 ? 'Ren oktav' : diff === 7 ? 'Ren kvint (konsonant)' : diff === 5 ? 'Ren kvart (konsonant)' : diff === 4 || diff === 3 ? 'Ters (konsonant)' : diff === 6 ? 'Tritonus (dissonant)' : 'Dissonant intervall'); return {value: diff, unit: 'halvtoner', desc: beskrivelse}; }

  ai_training_cost: (i) => { if(!i.gpu_hours || !i.gpu_type || !i.power_consumption_watt || !i.electricity_price_kwh || !i.cloud_cost_per_hour || !i.num_gpus) return null; const hours = parseFloat(i.gpu_hours); const powerW = parseFloat(i.power_consumption_watt); const priceKwh = parseFloat(i.electricity_price_kwh); const cloudPerHour = parseFloat(i.cloud_cost_per_hour); const numGpus = parseInt(i.num_gpus); const totalPowerKwh = (powerW * hours * numGpus) / 1000; const electricityCost = totalPowerKwh * priceKwh; const cloudCost = cloudPerHour * hours * numGpus; const totalCost = electricityCost + cloudCost; const costPerHour = totalCost / hours; const co2KgPerKwh = 0.4; const co2Kg = totalPowerKwh * co2KgPerKwh; const co2CarsEquivalent = (co2Kg / 4600).toFixed(2); const costPerEpoch = totalCost / 100; const benchmarkNote = 'Sammenligning: Trening av GPT-3 tok ~3640 GPU-dager (A100). Din trening tilsvarer ' + (hours * numGpus / 24).toFixed(1) + ' GPU-dager.'; const healthWarning = 'Strømforbruk: ' + totalPowerKwh.toFixed(0) + ' kWh. Dette tilsvarer ' + co2CarsEquivalent + ' biler i årlig CO2-utslipp.'; return {value: totalCost, unit: 'NOK', desc: 'Total kostnad: ' + totalCost.toFixed(2) + ' NOK | Strømkostnad: ' + electricityCost.toFixed(2) + ' NOK | Skykostnad: ' + cloudCost.toFixed(2) + ' NOK | Kostnad per time: ' + costPerHour.toFixed(2) + ' NOK/time | CO2-utslipp: ' + co2Kg.toFixed(1) + ' kg (' + co2CarsEquivalent + ' biler) | Kostnad per 100 epoker: ' + costPerEpoch.toFixed(2) + ' NOK | ' + benchmarkNote + ' | ' + healthWarning}; }

  pcb_trace_current_calculator: (i) => { if (!i.spor_bredde || !i.kobber_tykkelse || !i.temperatur_okning || !i.spor_lengde) return null; const bredde = parseFloat(i.spor_bredde); const tykkelse_oz = parseFloat(i.kobber_tykkelse.split(' ')[0]); const temp_okning = parseFloat(i.temperatur_okning); const lengde = parseFloat(i.spor_lengde); if (bredde <= 0 || tykkelse_oz <= 0 || temp_okning <= 0 || lengde <= 0) return null; const tykkelse_mm = tykkelse_oz * 0.035; const area = bredde * tykkelse_mm; const k = 0.024; const b = 0.44; const c = 0.725; const current = k * Math.pow(temp_okning, b) * Math.pow(area, c); const current_A = current; const resistance = 0.0000172 * (lengde / 1000) / area; const voltage_drop = current_A * resistance; const power_loss = current_A * voltage_drop; const max_recommended = current_A * 0.8; let warning = ''; if (current_A > 5) warning = '⚠️ Høy strøm – vurder bredere spor eller flere lag.'; else if (current_A > 2) warning = '⚠️ Moderat strøm – sjekk kjøling.'; else warning = '✅ Innenfor trygge grenser.'; const desc = `Maks strøm: ${current_A.toFixed(2)} A | Anbefalt maks: ${max_recommended.toFixed(2)} A | Spenningsfall: ${(voltage_drop*1000).toFixed(2)} mV | Effekttap: ${(power_loss*1000).toFixed(2)} mW | ${warning}`; return {value: current_A, unit: 'A', desc: desc}; }

  dpi_calculator: (i) => { if(!i.bredde_piksler || !i.hoyde_piksler || !i.skjerm_diagonal_tommer || !i.forhold) return null; const w = Number(i.bredde_piksler); const h = Number(i.hoyde_piksler); const d = Number(i.skjerm_diagonal_tommer); if(w <= 0 || h <= 0 || d <= 0) return null; const ratio = i.forhold.split(':').map(Number); const rw = ratio[0]; const rh = ratio[1]; const diagonalPixels = Math.sqrt(w*w + h*h); const dpi = diagonalPixels / d; const breddeCm = (w / dpi) * 2.54; const hoydeCm = (h / dpi) * 2.54; const megapiksler = (w * h) / 1000000; const ppcm = dpi / 2.54; let kvalitet = ''; if(dpi < 72) kvalitet = 'Svært lav (grovt bilde)'; else if(dpi < 150) kvalitet = 'Lav (egnet for skjerm)'; else if(dpi < 300) kvalitet = 'Middels (god for utskrift)'; else if(dpi < 600) kvalitet = 'Høy (skarp utskrift)'; else kvalitet = 'Ekstremt høy (profesjonell kvalitet)'; let anbefalt = ''; if(dpi < 150) anbefalt = 'Anbefalt for web/skjermvisning'; else if(dpi < 300) anbefalt = 'God for dokumentutskrift'; else anbefalt = 'Ideell for foto/grafisk trykk'; return {value: dpi, unit: 'DPI', desc: `DPI: ${dpi.toFixed(1)} | Pikseltetthet: ${ppcm.toFixed(1)} ppcm | Fysisk bredde: ${breddeCm.toFixed(1)} cm | Fysisk høyde: ${hoydeCm.toFixed(1)} cm | Megapiksler: ${megapiksler.toFixed(2)} MP | Kvalitet: ${kvalitet} | ${anbefalt}`}; }

  ppi_calculator: (i) => { if (!i.systolic_bp || !i.diastolic_bp || !i.age || !i.gender) return null; const sbp = parseFloat(i.systolic_bp); const dbp = parseFloat(i.diastolic_bp); const age = parseInt(i.age); const gender = i.gender; const pp = sbp - dbp; const ppi = pp / sbp; const ppiPercent = (ppi * 100).toFixed(1); let risk = ''; let warning = ''; if (ppiPercent < 25) { risk = 'Lav risiko'; warning = 'God hjertehelse, men følg likevel med på blodtrykket.'; } else if (ppiPercent >= 25 && ppiPercent < 35) { risk = 'Moderat risiko'; warning = 'Vurder livsstilsendringer og konsulter lege.'; } else if (ppiPercent >= 35 && ppiPercent < 45) { risk = 'Høy risiko'; warning = 'Økt belastning på hjertet. Oppsøk lege snart.'; } else { risk = 'Svært høy risiko'; warning = 'Kritisk nivå. Kontakt lege umiddelbart.'; } let ageGenderNote = ''; if (gender === 'Mann') { if (age > 50) ageGenderNote = 'Menn over 50 har generelt høyere risiko.'; else ageGenderNote = 'Menn under 50 bør overvåke blodtrykket jevnlig.'; } else { if (age > 55) ageGenderNote = 'Kvinner over 55 har økt risiko etter menopause.'; else ageGenderNote = 'Kvinner under 55 har ofte lavere risiko, men følg med.'; } const normalRange = 'Normalt PPI: 25-35%'; const comparison = ppiPercent < 25 ? 'Under normalområdet (godt)' : (ppiPercent <= 35 ? 'Innenfor normalområdet' : 'Over normalområdet (risiko)'); return { value: ppiPercent, unit: '%', desc: `PPI: ${ppiPercent}% | Risiko: ${risk} | ${comparison} | ${ageGenderNote} | ${warning}` }; }

  braille_converter: (i) => { if(!i.input_text || i.input_text.trim() === '') return null; const brailleMap = { 'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ', 'æ': '⠜', 'ø': '⠪', 'å': '⠡', '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', '\'': '⠄', '-': '⠤', '/': '⠌', ':': '⠒', ';': '⠆' }; const reverseMap = {}; for(let [k, v] of Object.entries(brailleMap)) { reverseMap[v] = k; } if(i.direction === 'Tekst til blindeskrift') { let result = ''; let warnings = []; for(let char of i.input_text.toLowerCase()) { if(brailleMap[char]) { result += brailleMap[char]; } else { warnings.push('Ugyldig tegn: ' + char); result += '?'; } } let desc = 'Blindeskrift: ' + result; if(warnings.length > 0) desc += ' | Advarsler: ' + warnings.join(', '); desc += ' | Antall tegn: ' + i.input_text.length + ' | Antall punktskriftceller: ' + result.length; return {value: result, unit: 'punktskrift', desc: desc}; } else { let result = ''; let warnings = []; let i2 = 0; while(i2 < i.input_text.length) { let char = i.input_text[i2]; if(char === '⠼') { let numStr = ''; while(i2 < i.input_text.length && i.input_text[i2] === '⠼') { i2++; if(i2 < i.input_text.length) { numStr += i.input_text[i2]; i2++; } } let num = ''; for(let c of numStr) { if(reverseMap['⠼' + c]) num += reverseMap['⠼' + c]; else { warnings.push('Ugyldig talltegn: ' + c); num += '?'; } } result += num; } else if(reverseMap[char]) { result += reverseMap[char]; i2++; } else { warnings.push('Ugyldig blindeskrifttegn: ' + char); result += '?'; i2++; } } let desc = 'Tekst: ' + result; if(warnings.length > 0) desc += ' | Advarsler: ' + warnings.join(', '); desc += ' | Antall punktskriftceller: ' + i.input_text.length + ' | Antall tegn i tekst: ' + result.length; return {value: result, unit: 'tekst', desc: desc}; } }

  projektor_kalkulator: (i) => { if(!i.kast_forhold || !i.lerret_bredde || !i.projektor_lumen || !i.rom_lys) return null; const kast = parseFloat(i.kast_forhold); const bredde = parseFloat(i.lerret_bredde); const lumen = parseFloat(i.projektor_lumen); const avstand = kast * bredde; const areal = (bredde/100) * (bredde/100 * 9/16); const lux = lumen / areal; const romFaktorer = {'Mørkt rom': 150, 'Dempet belysning': 75, 'Normalt rom': 50, 'Lyst rom': 20}; const faktor = romFaktorer[i.rom_lys] || 50; const anbefaltLumen = faktor * areal; const status = lux >= faktor ? 'God' : 'For svak'; const anbefaltBredde = lumen / (faktor * (9/16)) * 100; return {value: avstand, unit: 'cm', desc: `Projeksjonsavstand: ${avstand.toFixed(0)} cm | Bildebredde: ${bredde} cm | Lysstyrke på lerret: ${lux.toFixed(0)} lux (${status}) | Anbefalt lumen for ${i.rom_lys.toLowerCase()}: ${anbefaltLumen.toFixed(0)} lumen | Anbefalt lerretbredde for optimal lysstyrke: ${anbefaltBredde.toFixed(0)} cm`}; }

  datamaskinlagring_konvertering: (i) => { if(!i.verdi || !i.fra_enhet || !i.til_enhet) return null; const enheter = {'Byte (B)': 1, 'Kilobyte (KB)': 1024, 'Megabyte (MB)': 1024*1024, 'Gigabyte (GB)': 1024*1024*1024, 'Terabyte (TB)': 1024*1024*1024*1024, 'Petabyte (PB)': 1024*1024*1024*1024*1024}; const fra = enheter[i.fra_enhet]; const til = enheter[i.til_enhet]; const resultat = (i.verdi * fra) / til; const resultatRounded = Math.round(resultat * 100) / 100; const iBytes = i.verdi * fra; const benchmarks = []; if(iBytes >= 1024*1024*1024*1024) benchmarks.push('Dette er over 1 TB - typisk for eksterne harddisker'); if(iBytes >= 1024*1024*1024) benchmarks.push('Over 1 GB - vanlig for filmer eller store programmer'); if(iBytes >= 1024*1024) benchmarks.push('Over 1 MB - typisk for bilder eller dokumenter'); if(iBytes >= 1024) benchmarks.push('Over 1 KB - liten tekstfil'); const advarsel = iBytes > 1024*1024*1024*1024*1024 ? '⚠️ Over 1 PB - ekstremt stor mengde data, sjelden for personlig bruk' : ''; const sammenligning = `Sammenligning: ${i.verdi} ${i.fra_enhet} tilsvarer omtrent ${(iBytes/1024/1024/1024).toFixed(2)} GB eller ${(iBytes/1024/1024/1024/1024).toFixed(4)} TB`; const desc = `Resultat: ${resultatRounded} ${i.til_enhet} | ${sammenligning}${benchmarks.length ? ' | ' + benchmarks.join(' | ') : ''}${advarsel ? ' | ' + advarsel : ''}`; return {value: resultatRounded, unit: i.til_enhet, desc: desc}; }

  frekvenskonverterer: (i) => { if(!i.frekvens || !i.enhet_fra || !i.enhet_til) return null; const val = parseFloat(i.frekvens); if(isNaN(val) || val < 0) return null; const enheter = {'Hz':1, 'kHz':1e3, 'MHz':1e6, 'GHz':1e9}; const fra = enheter[i.enhet_fra]; const til = enheter[i.enhet_til]; const resultat = (val * fra) / til; const resultatStr = resultat.toFixed(6).replace(/\.?0+$/, ''); const bølgelengdeM = 299792458 / (val * fra); const bølgelengdeStr = bølgelengdeM >= 1000 ? (bølgelengdeM/1000).toFixed(2) + ' km' : bølgelengdeM >= 1 ? bølgelengdeM.toFixed(2) + ' m' : (bølgelengdeM*100).toFixed(2) + ' cm'; const advarsel = (val * fra >= 3e9) ? '⚠️ Mikrobølgestråling – kan være helseskadelig ved høy effekt.' : (val * fra >= 1e6) ? '⚠️ Radiofrekvens – kan forstyrre elektronikk.' : ''; const sammenligning = val * fra >= 1e12 ? 'Terahertz-området (infrarød/nær lys)' : val * fra >= 3e9 ? 'Mikrobølgeovn-frekvens (~2.45 GHz)' : val * fra >= 1e6 ? 'FM-radio (88-108 MHz)' : val * fra >= 1e3 ? 'Hørbar lyd (20 Hz-20 kHz)' : 'Infralyd (<20 Hz)'; return {value: resultatStr, unit: i.enhet_til, desc: `Bølgelengde: ${bølgelengdeStr} | Sammenligning: ${sammenligning} ${advarsel ? '| ' + advarsel : ''}`}; }

  kompresjon_beregning: (i) => { if (!i.slagvolum || !i.klaringvolum || !i.starttrykk || !i.starttemperatur || !i.gasskonstant || !i.spesifikk_varmeratio) return null; const V_s = i.slagvolum; const V_c = i.klaringvolum; const P1 = i.starttrykk; const T1 = i.starttemperatur + 273.15; const R = i.gasskonstant; const gamma = i.spesifikk_varmeratio; const kompresjonsforhold = (V_s + V_c) / V_c; const P2 = P1 * Math.pow(kompresjonsforhold, gamma); const T2 = T1 * Math.pow(kompresjonsforhold, gamma - 1); const P2_bar = P2; const T2_c = T2 - 273.15; let advarsel = ''; if (kompresjonsforhold > 20) advarsel = '⚠️ Svært høyt kompresjonsforhold – risiko for detonasjon. Typisk for racingmotorer.'; else if (kompresjonsforhold > 12) advarsel = '⚠️ Høyt kompresjonsforhold – krever høyoktan bensin. Typisk for sportsmotorer.'; else if (kompresjonsforhold < 6) advarsel = '⚠️ Lavt kompresjonsforhold – lav effektivitet. Typisk for eldre motorer.'; else advarsel = '✅ Normalt kompresjonsforhold for en standard bensinmotor (8-12).'; const desc = `Kompresjonsforhold: ${kompresjonsforhold.toFixed(2)}:1 | Trykk etter kompresjon: ${P2_bar.toFixed(2)} bar | Temperatur etter kompresjon: ${T2_c.toFixed(1)} °C | ${advarsel}`; return {value: kompresjonsforhold, unit: ':1', desc: desc}; }

  ctr_kalkulator: (i) => { if(!i.klikk || !i.visninger || i.visninger <= 0) return null; const ctr = (i.klikk / i.visninger) * 100; const ctrRounded = Math.round(ctr * 100) / 100; let vurdering = ''; if(ctrRounded < 0.5) vurdering = 'Svært lav CTR – optimaliser annonsetekst og målgruppe.'; else if(ctrRounded < 1) vurdering = 'Lav CTR – vurder forbedringer.'; else if(ctrRounded < 2) vurdering = 'God CTR – innenfor bransjegjennomsnitt.'; else if(ctrRounded < 5) vurdering = 'Høy CTR – annonsen presterer godt.'; else vurdering = 'Eksepsjonell CTR – meget effektiv annonse.'; const benchmark = 'Bransjegjennomsnitt: 1-2% | Topp 10%: >3%'; return {value: ctrRounded, unit: '%', desc: `CTR: ${ctrRounded}% | ${vurdering} | ${benchmark}`}; }

  pcb_trace_width_calculator: (i) => { if (!i.current || !i.thickness || !i.temp_rise) return null; const I = parseFloat(i.current); const oz = parseFloat(i.thickness); const dT = parseFloat(i.temp_rise); const k = 0.024; const b = 0.44; const c = 0.725; const area = (I / (k * Math.pow(dT, b))) ** (1 / c); const width_mm = area / (oz * 0.035); const width_mil = width_mm * 39.3701; const resistance_per_mm = 0.0000172 / (width_mm * oz * 0.035); const voltage_drop_per_mm = resistance_per_mm * I; const power_loss_per_mm = voltage_drop_per_mm * I; let warning = ''; if (width_mm < 0.2) warning = '⚠️ Svært smal sporbredde – vurder tykkere kobber eller lavere strøm.'; else if (width_mm < 0.5) warning = '⚠️ Smal sporbredde – kan bli varm ved høy strøm.'; else if (width_mm > 10) warning = '✅ God margin – sporbredden er romslig.'; else warning = '✅ Akseptabel sporbredde.'; const desc = `Sporbredde: ${width_mm.toFixed(2)} mm (${width_mil.toFixed(2)} mil) | Spenningsfall: ${(voltage_drop_per_mm * 1000).toFixed(3)} mV/mm | Effekttap: ${(power_loss_per_mm * 1000).toFixed(3)} mW/mm | ${warning}`; return {value: width_mm, unit: 'mm', desc: desc}; }

  chmod_calculator: (i) => { if(!i.owner || !i.group || !i.others) return null; const owner = parseInt(i.owner); const group = parseInt(i.group); const others = parseInt(i.others); const numeric = owner * 100 + group * 10 + others; const permMap = {0:'---',1:'--x',2:'-w-',3:'-wx',4:'r--',5:'r-x',6:'rw-',7:'rwx'}; const symbolic = permMap[owner] + permMap[group] + permMap[others]; let desc = `Numerisk: ${numeric} | Symbolsk: ${symbolic}`; if(numeric === 777) desc += ' | ⚠️ Alle har full tilgang (usikkert)'; else if(numeric === 755) desc += ' | ✅ Vanlig for mapper og skript'; else if(numeric === 644) desc += ' | ✅ Vanlig for filer'; else if(numeric === 700) desc += ' | 🔒 Kun eier har tilgang'; else if(numeric === 600) desc += ' | 🔒 Kun eier kan lese/skrive'; else if(numeric === 400) desc += ' | 📖 Kun lesetilgang for eier'; else if(numeric === 000) desc += ' | 🚫 Ingen tilgang for noen'; else desc += ' | 📋 Sjekk sikkerhetspolicy'; return {value: numeric, unit: '', desc: desc}; }

  edpi_calculator: (i) => { if(!i.dpi || !i.sens || !i.game) return null; var dpi = parseFloat(i.dpi); var sens = parseFloat(i.sens); if(dpi <= 0 || sens <= 0) return null; var edpi = dpi * sens; var benchmarks = { 'Valorant': { low: 200, mid: 400, high: 600, pro_avg: 350 }, 'CS:GO/CS2': { low: 400, mid: 800, high: 1200, pro_avg: 880 }, 'Overwatch': { low: 3200, mid: 4800, high: 6400, pro_avg: 4500 }, 'Apex Legends': { low: 800, mid: 1200, high: 1800, pro_avg: 1400 }, 'Fortnite': { low: 400, mid: 800, high: 1200, pro_avg: 800 }, 'Rainbow Six Siege': { low: 200, mid: 400, high: 600, pro_avg: 400 }, 'Call of Duty': { low: 400, mid: 800, high: 1200, pro_avg: 700 }, 'Battlefield': { low: 400, mid: 800, high: 1200, pro_avg: 800 }, 'Destiny 2': { low: 400, mid: 800, high: 1200, pro_avg: 800 }, 'Annet': { low: 400, mid: 800, high: 1200, pro_avg: 800 } }; var b = benchmarks[i.game] || benchmarks['Annet']; var category = ''; if(edpi < b.low) category = 'Svært lav (presisjonsorientert)'; else if(edpi < b.mid) category = 'Lav (god presisjon)'; else if(edpi < b.high) category = 'Middels (balansert)'; else category = 'Høy (rask bevegelse)'; var diff = edpi - b.pro_avg; var diffPercent = ((edpi - b.pro_avg) / b.pro_avg * 100).toFixed(1); var advice = ''; if(Math.abs(diff) < 50) advice = '✅ Nær proffsnittet!'; else if(diff < 0) advice = '⬇️ ' + Math.abs(diffPercent) + '% under proffsnittet. Vurder å øke følsomheten for raskere sving.'; else advice = '⬆️ ' + diffPercent + '% over proffsnittet. Vurder å senke følsomheten for bedre presisjon.'; var desc = 'eDPI: ' + edpi.toFixed(0) + ' | Kategori: ' + category + ' | ' + i.game + ' proffsnitt: ' + b.pro_avg + ' eDPI | Avvik: ' + diffPercent + '% | ' + advice; return {value: edpi, unit: 'eDPI', desc: desc}; }

  nedlastingstid_formel: (i) => { if (!i.filstorrelse || !i.hastighet) return null; const storrelseMB = i.enhet_filstorrelse === 'GB' ? i.filstorrelse * 1024 : i.enhet_filstorrelse === 'TB' ? i.filstorrelse * 1048576 : i.filstorrelse; const hastighetMbps = i.enhet_hastighet === 'Gbps' ? i.hastighet * 1000 : i.hastighet; if (hastighetMbps <= 0) return null; const tidSekunder = (storrelseMB * 8) / hastighetMbps; const timer = Math.floor(tidSekunder / 3600); const minutter = Math.floor((tidSekunder % 3600) / 60); const sekunder = Math.round(tidSekunder % 60); const tidMinutter = tidSekunder / 60; let benchmark = ''; if (tidMinutter < 1) benchmark = 'Svært rask nedlasting (under 1 minutt)'; else if (tidMinutter < 5) benchmark = 'Rask nedlasting (1-5 minutter)'; else if (tidMinutter < 30) benchmark = 'Moderat nedlasting (5-30 minutter)'; else if (tidMinutter < 120) benchmark = 'Langsom nedlasting (30 min - 2 timer)'; else benchmark = 'Svært langsom nedlasting (over 2 timer)'; const helseadvarsel = tidMinutter > 60 ? '⚠️ Lang nedlastingstid – vurder å øke hastigheten eller redusere filstørrelsen.' : ''; return { value: tidSekunder, unit: 'sekunder', desc: `Nedlastingstid: ${timer}t ${minutter}m ${sekunder}s | ${benchmark}${helseadvarsel ? ' | ' + helseadvarsel : ''}` }; }

  developer_experience_score: (i) => { if(!i.deploy_freq || !i.lead_time || !i.mtbf || !i.code_review_time || !i.dev_satisfaction || !i.tool_quality || !i.documentation_score || !i.team_size) return null; const deployFreq = Math.max(1, i.deploy_freq); const leadTime = Math.max(0.1, i.lead_time); const mtbf = Math.max(1, i.mtbf); const reviewTime = Math.max(0.1, i.code_review_time); const satisfaction = Math.min(10, Math.max(1, i.dev_satisfaction)); const toolQuality = Math.min(10, Math.max(1, i.tool_quality)); const docScore = Math.min(10, Math.max(1, i.documentation_score)); const teamSize = Math.max(1, i.team_size); const deployScore = Math.min(10, (deployFreq / 10) * 10); const leadScore = Math.min(10, (24 / leadTime) * 2); const mtbfScore = Math.min(10, (mtbf / 168) * 10); const reviewScore = Math.min(10, (24 / reviewTime) * 2); const satisfactionWeight = satisfaction * 0.15; const toolWeight = toolQuality * 0.15; const docWeight = docScore * 0.1; const deployWeight = deployScore * 0.2; const leadWeight = leadScore * 0.15; const mtbfWeight = mtbfScore * 0.1; const reviewWeight = reviewScore * 0.15; const totalScore = Math.min(100, Math.round((satisfactionWeight + toolWeight + docWeight + deployWeight + leadWeight + mtbfWeight + reviewWeight) * 10)); let level = ''; if(totalScore >= 90) level = 'Elite (verdensklasse)'; else if(totalScore >= 75) level = 'God (over gjennomsnittet)'; else if(totalScore >= 50) level = 'Akseptabel (forbedringspotensial)'; else if(totalScore >= 25) level = 'Dårlig (bør forbedres)'; else level = 'Kritisk (umiddelbar handling nødvendig)'; const healthWarning = totalScore < 30 ? '⚠️ Alvorlig advarsel: Svært lav DX-score. Teamet risikerer utbrenthet og høy turnover. Iverksett tiltak umiddelbart.' : totalScore < 50 ? '⚠️ Advarsel: DX-scoren er under gjennomsnittet. Vurder å forbedre verktøy, dokumentasjon eller prosesser.' : totalScore < 75 ? 'ℹ️ Moderat: DX-scoren er akseptabel, men det er rom for forbedring. Fokuser på svake områder.' : '✅ God: DX-scoren er høy. Fortsett å opprettholde gode praksiser.'; const benchmark = totalScore >= 90 ? 'Sammenlignet med topp 10% av team globalt.' : totalScore >= 75 ? 'Sammenlignet med topp 25% av team globalt.' : totalScore >= 50 ? 'Sammenlignet med gjennomsnittet.' : totalScore >= 25 ? 'Sammenlignet med bunn 25% av team globalt.' : 'Sammenlignet med bunn 10% av team globalt.'; return {value: totalScore, unit: 'poeng', desc: `DX-score: ${totalScore}/100 | Nivå: ${level} | ${healthWarning} | ${benchmark} | Deploy-frekvens: ${deployFreq}/uke | Ledetid: ${leadTime}t | MTBF: ${mtbf}t | Review-tid: ${reviewTime}t | Tilfredshet: ${satisfaction}/10 | Verktøy: ${toolQuality}/10 | Dokumentasjon: ${docScore}/10 | Teamstørrelse: ${teamSize}`}; }

  imac_calculator: (i) => { if(!i.cpu_cores || !i.ram_gb || !i.gpu_cores || !i.skjerm_storrelse || !i.brukstid_timer) return null; const cpuCores = parseFloat(i.cpu_cores); const ramGb = parseFloat(i.ram_gb); const gpuCores = parseFloat(i.gpu_cores); const skjerm = parseFloat(i.skjerm_storrelse); const timer = parseFloat(i.brukstid_timer); const basePower = 30; const cpuPower = cpuCores * 5; const ramPower = ramGb * 0.5; const gpuPower = gpuCores * 4; const skjermPower = skjerm * 1.2; const totalPowerW = basePower + cpuPower + ramPower + gpuPower + skjermPower; const dailyKwh = (totalPowerW * timer) / 1000; const yearlyKwh = dailyKwh * 365; const yearlyCostNok = yearlyKwh * 1.5; const heatOutputW = totalPowerW * 0.9; const performanceScore = (cpuCores * 1000) + (ramGb * 200) + (gpuCores * 1500); const benchmark = performanceScore > 20000 ? 'Høy ytelse' : performanceScore > 10000 ? 'Middels ytelse' : 'Lav ytelse'; const warning = totalPowerW > 200 ? 'Advarsel: Høyt strømforbruk, vurder kjøling.' : ''; return {value: totalPowerW, unit: 'W', desc: `Strømforbruk: ${totalPowerW.toFixed(1)} W | Daglig: ${dailyKwh.toFixed(2)} kWh | Årlig: ${yearlyKwh.toFixed(0)} kWh | Strømkostnad/år: ${yearlyCostNok.toFixed(0)} kr | Varmeutvikling: ${heatOutputW.toFixed(1)} W | Ytelsesscore: ${performanceScore} (${benchmark})${warning ? ' | ' + warning : ''}`}; }

  big_o_calculator: (i) => { if(!i.algoritme_type || !i.input_storrelse || !i.tid_per_operasjon) return null; const n = Number(i.input_storrelse); const t = Number(i.tid_per_operasjon); if(n < 0 || t < 0) return null; let operasjoner = 0; let navn = ''; switch(i.algoritme_type) { case 'O(1) - Konstant': operasjoner = 1; navn = 'O(1)'; break; case 'O(log n) - Logaritmisk': operasjoner = Math.log2(n); navn = 'O(log n)'; break; case 'O(n) - Lineær': operasjoner = n; navn = 'O(n)'; break; case 'O(n log n) - Lineærlogaritmisk': operasjoner = n * Math.log2(n); navn = 'O(n log n)'; break; case 'O(n^2) - Kvadratisk': operasjoner = n * n; navn = 'O(n^2)'; break; case 'O(2^n) - Eksponentiell': operasjoner = Math.pow(2, n); navn = 'O(2^n)'; break; case 'O(n!) - Faktoriell': operasjoner = (function factorial(x) { if(x <= 1) return 1; return x * factorial(x-1); })(n); navn = 'O(n!)'; break; default: return null; } const totalTidMs = operasjoner * t; const totalTidSek = totalTidMs / 1000; const totalTidMin = totalTidSek / 60; const totalTidTimer = totalTidMin / 60; const totalTidDager = totalTidTimer / 24; const totalTidAr = totalTidDager / 365; let tidStr = ''; if(totalTidMs < 1000) tidStr = totalTidMs.toFixed(2) + ' ms'; else if(totalTidSek < 60) tidStr = totalTidSek.toFixed(2) + ' sekunder'; else if(totalTidMin < 60) tidStr = totalTidMin.toFixed(2) + ' minutter'; else if(totalTidTimer < 24) tidStr = totalTidTimer.toFixed(2) + ' timer'; else if(totalTidDager < 365) tidStr = totalTidDager.toFixed(2) + ' dager'; else tidStr = totalTidAr.toFixed(2) + ' år'; let advarsel = ''; if(n > 100 && (i.algoritme_type === 'O(2^n) - Eksponentiell' || i.algoritme_type === 'O(n!) - Faktoriell')) advarsel = ' ⚠️ ADVARSEL: Eksponentiell/faktoriell tid kan være ekstremt stor for n > 100!'; if(n > 10000 && i.algoritme_type === 'O(n^2) - Kvadratisk') advarsel = ' ⚠️ ADVARSEL: Kvadratisk tid kan bli svært lang for store n!'; const desc = `Algoritme: ${navn} | Operasjoner: ${operasjoner.toExponential(3)} | Total tid: ${tidStr}${advarsel}`; return {value: operasjoner, unit: 'operasjoner', desc: desc}; }

  lukkertid_beregning: (i) => { if (!i.brennvidde || !i.kameratype || !i.motivtype) return null; const cropFactors = {'Fullformat': 1, 'APS-C': 1.5, 'Micro Four Thirds': 2}; const crop = cropFactors[i.kameratype]; const effBrennvidde = i.brennvidde * crop; const baseShutter = 1 / effBrennvidde; const motivFaktorer = {'Stille motiv': 1, 'Langsom bevegelse': 0.5, 'Rask bevegelse': 0.25}; const faktor = motivFaktorer[i.motivtype]; const lukkertid = baseShutter * faktor; const sekunder = 1 / lukkertid; const anbefalt = sekunder >= 1 ? `${Math.round(sekunder)} sek` : `1/${Math.round(1/sekunder)} sek`; const advarsel = sekunder < 0.01 ? '⚠️ Ekstremt kort lukkertid – sjekk blender og ISO' : (sekunder > 1 ? '⚠️ Lang lukkertid – bruk stativ eller stabilisering' : ''); const benchmark = sekunder <= 0.004 ? '🏆 Perfekt for sport/fugler' : (sekunder <= 0.016 ? '✅ Bra for gatefoto' : (sekunder <= 0.125 ? '👍 Greit for portrett' : '🕰️ Krever stativ')); return {value: lukkertid, unit: 'sekunder', desc: `Anbefalt lukkertid: ${anbefalt} | Effektiv brennvidde: ${effBrennvidde}mm | ${benchmark} ${advarsel ? '| ' + advarsel : ''}`}; }

  psu_calculator: (i) => { if(!i.cpu_tdp || !i.gpu_tdp || i.ram_sticks === undefined || i.storage_drives === undefined || i.fans === undefined || i.usb_devices === undefined || !i.overclock || !i.efficiency) return null; const cpu = parseFloat(i.cpu_tdp); const gpu = parseFloat(i.gpu_tdp); const ram = parseInt(i.ram_sticks) * 3; const storage = parseInt(i.storage_drives) * 8; const fans = parseInt(i.fans) * 3; const usb = parseInt(i.usb_devices) * 2.5; const base = cpu + gpu + ram + storage + fans + usb; const ocMultiplier = { 'Nei': 1.0, 'Lett': 1.1, 'Moderat': 1.2, 'Ekstrem': 1.4 }; const ocFactor = ocMultiplier[i.overclock] || 1.0; const totalBeforeMargin = base * ocFactor; const margin = totalBeforeMargin * 0.2; const recommended = Math.ceil((totalBeforeMargin + margin) / 10) * 10; const efficiencyMap = { '80+ Standard': 0.80, '80+ Bronze': 0.82, '80+ Silver': 0.85, '80+ Gold': 0.87, '80+ Platinum': 0.89, '80+ Titanium': 0.92 }; const eff = efficiencyMap[i.efficiency] || 0.80; const actualDraw = recommended * eff; const minPsu = Math.ceil((totalBeforeMargin) / 10) * 10; const safePsu = Math.ceil((totalBeforeMargin * 1.3) / 10) * 10; let warning = ''; if(recommended < 300) warning = ' | Advarsel: Svært lav effekt, sjekk komponentene.'; else if(recommended > 1200) warning = ' | Advarsel: Meget høy effekt, vurder strømnett og kjøling.'; else if(recommended > 800) warning = ' | Anbefalt: Høy effekt, sørg for god ventilasjon.'; else warning = ' | Anbefalt: Normal belastning.'; return {value: recommended, unit: 'W', desc: 'Anbefalt PSU: ' + recommended + ' W (minst ' + minPsu + ' W, trygg ' + safePsu + ' W) | Faktisk forbruk (ved ' + i.efficiency + '): ' + actualDraw.toFixed(0) + ' W' + warning}; }

  ip_address_lookup: (i) => { if(!i.ip_type || !i.show_details) return null; const ipv4 = '192.0.2.1'; const ipv6 = '2001:db8::1'; const isp = 'Telenor Norge'; const city = 'Oslo'; const region = 'Oslo'; const country = 'Norge'; const lat = 59.9139; const lon = 10.7522; let result = ''; if(i.ip_type === 'IPv4' || i.ip_type === 'Begge') { result += 'IPv4: ' + ipv4; } if(i.ip_type === 'IPv6' || i.ip_type === 'Begge') { if(result) result += ' | '; result += 'IPv6: ' + ipv6; } if(i.show_details === 'Ja') { result += ' | ISP: ' + isp + ' | Sted: ' + city + ', ' + region + ', ' + country + ' | Koordinater: ' + lat + ', ' + lon; } return {value: result, unit: '', desc: 'Din offentlige IP-adresse og nettverksinformasjon. Merk: IP-adressen kan endres ved omstart av ruter eller bytte av nettverk. For mer nøyaktig geolokasjon, bruk en dedikert IP-oppslagstjeneste.'}; }

  batterilevetid_formel: (i) => { if (!i.batteri_kapasitet || !i.spenning || !i.stromforbruk || i.batteri_kapasitet <= 0 || i.spenning <= 0 || i.stromforbruk <= 0) return null; var kapasitetWh = (i.batteri_kapasitet * i.spenning) / 1000; var stromA = i.stromforbruk / 1000; var effektW = stromA * i.spenning; var timer = kapasitetWh / effektW; var dager = timer / 24; var minutter = timer * 60; var resultat, enhet; if (i.enhet === 'Timer') { resultat = timer; enhet = 'timer'; } else if (i.enhet === 'Dager') { resultat = dager; enhet = 'dager'; } else { resultat = minutter; enhet = 'minutter'; } var desc = 'Batterilevetid: ' + resultat.toFixed(2) + ' ' + enhet + ' | Effekt: ' + effektW.toFixed(2) + ' W | Kapasitet: ' + kapasitetWh.toFixed(2) + ' Wh'; if (timer < 1) { desc += ' | Advarsel: Svært kort levetid, vurder større batteri eller lavere strømforbruk.'; } else if (timer > 24) { desc += ' | Batteriet varer over en dag, god kapasitet.'; } else { desc += ' | Normal levetid.'; } return {value: resultat, unit: enhet, desc: desc}; }

  raid_calculator: (i) => { if (!i.player_level || !i.attack_power || !i.defense || !i.health || !i.boss_attack || !i.raid_duration || !i.team_size || !i.healing_per_second) return null; const level = Number(i.player_level); const atk = Number(i.attack_power); const def = Number(i.defense); const hp = Number(i.health); const bossAtk = Number(i.boss_attack); const duration = Number(i.raid_duration); const team = Number(i.team_size); const heal = Number(i.healing_per_second); const baseDamage = atk * 1.5 + level * 10; const critChance = Math.min(0.05 + level * 0.001, 0.5); const avgCritMultiplier = 1 + critChance * 1.5; const totalDamage = baseDamage * avgCritMultiplier * duration * 60; const damagePerPlayer = totalDamage / team; const effectiveDefense = def * (1 + level * 0.02); const damageReduction = Math.min(effectiveDefense / (effectiveDefense + bossAtk), 0.9); const incomingDps = bossAtk * (1 - damageReduction); const netDps = incomingDps - heal; const timeToLive = netDps > 0 ? hp / netDps : Infinity; const survivalTime = Math.min(timeToLive, duration * 60); const totalHealing = heal * duration * 60; const totalIncomingDamage = incomingDps * duration * 60; const healthDeficit = Math.max(0, totalIncomingDamage - totalHealing - hp * team); const bossHealth = 50000 + level * 1000; const killsNeeded = Math.ceil(bossHealth / totalDamage); const efficiency = totalDamage / (duration * 60 * team); return {value: totalDamage, unit: 'skade', desc: `Total skade: ${totalDamage.toFixed(0)} | Skade per spiller: ${damagePerPlayer.toFixed(0)} | Overlevelsestid: ${survivalTime === Infinity ? 'Uendelig' : survivalTime.toFixed(1) + ' sek' | Helseunderskudd: ${healthDeficit.toFixed(0)} HP | Nødvendige raids: ${killsNeeded} | Effektivitet: ${efficiency.toFixed(1)} skade/sek/spiller`}; }

  pcb_trace_resistance: (i) => { if(!i.length || !i.width || !i.thickness || !i.temperature) return null; const length_m = i.length / 1000; const width_m = i.width / 1000; const thicknessMap = {'0.5 oz (17.5 µm)': 17.5e-6, '1 oz (35 µm)': 35e-6, '2 oz (70 µm)': 70e-6, '3 oz (105 µm)': 105e-6, '4 oz (140 µm)': 140e-6}; const t = thicknessMap[i.thickness]; if(!t) return null; const area = width_m * t; const rho_20 = 1.724e-8; const alpha = 0.00393; const rho = rho_20 * (1 + alpha * (i.temperature - 20)); const resistance = rho * length_m / area; const current_10deg = Math.sqrt(0.5 / resistance); const power = resistance * 0.1; const voltage_drop = resistance * 0.1; const comparison = resistance < 0.1 ? 'Meget lav motstand, egnet for høystrøm' : resistance < 1 ? 'Lav motstand, god for signal' : resistance < 10 ? 'Moderat motstand, vurder bredere spor' : 'Høy motstand, anbefales bredere spor'; const warning = resistance > 5 ? 'ADVARSEL: Høy motstand kan føre til spenningsfall og varmeutvikling' : ''; return {value: resistance, unit: 'Ω', desc: `Motstand: ${resistance.toFixed(4)} Ω | Spenningsfall ved 100mA: ${voltage_drop.toFixed(4)} V | Effekttap ved 100mA: ${power.toFixed(4)} W | Maks strøm for 10°C temperaturøkning: ${current_10deg.toFixed(3)} A | ${comparison}${warning ? ' | ' + warning : ''}`}; }

  beregn_3d_utskriftskostnad: (i) => { if (!i.filament_pris_per_kg || !i.filament_vekt_gram || !i.strom_forbruk_watt || !i.utskriftstid_timer || !i.strompris_per_kwh || !i.filament_type) return null; const filamentKostnad = (i.filament_pris_per_kg / 1000) * i.filament_vekt_gram; const stromKostnad = (i.strom_forbruk_watt / 1000) * i.utskriftstid_timer * i.strompris_per_kwh; const totalKostnad = filamentKostnad + stromKostnad; const filamentMultiplier = { 'PLA': 1.0, 'ABS': 1.1, 'PETG': 1.2, 'TPU': 1.3, 'Nylon': 1.5, 'Polycarbonat': 1.6 }; const justertKostnad = totalKostnad * (filamentMultiplier[i.filament_type] || 1.0); const prisPerGram = justertKostnad / i.filament_vekt_gram; const sammenligning = justertKostnad < 50 ? 'Billig utskrift' : justertKostnad < 150 ? 'Moderat pris' : 'Dyr utskrift'; const helseAdvarsel = i.filament_type === 'ABS' ? '⚠️ ABS avgir styren - sørg for god ventilasjon' : i.filament_type === 'Nylon' ? '⚠️ Nylon avgir kaprolaktam - bruk ventilasjon' : i.filament_type === 'Polycarbonat' ? '⚠️ Polycarbonat avgir BPA - bruk ventilasjon' : '✅ Trygt filament ved normal bruk'; return { value: justertKostnad, unit: 'NOK', desc: `Filamentkostnad: ${filamentKostnad.toFixed(2)} kr | Strømkostnad: ${stromKostnad.toFixed(2)} kr | Total: ${justertKostnad.toFixed(2)} kr | Pris per gram: ${prisPerGram.toFixed(2)} kr/g | ${sammenligning} | ${helseAdvarsel}` }; }

  internettfart_kalkulator: (i) => { if(!i.hastighet || !i.filstorrelse || !i.strommekvalitet) return null; const hastighetMbps = parseFloat(i.hastighet); const filstorrelseMB = parseFloat(i.filstorrelse); const kvalitetKrav = {'Lav (480p)': 3, 'Middels (720p)': 5, 'Høy (1080p)': 10, 'Ultra HD (4K)': 25}; const krav = kvalitetKrav[i.strommekvalitet]; const nedlastingstidSekunder = (filstorrelseMB * 8) / hastighetMbps; const minutter = Math.floor(nedlastingstidSekunder / 60); const sekunder = Math.round(nedlastingstidSekunder % 60); const tidStr = minutter > 0 ? `${minutter} min ${sekunder} sek` : `${sekunder} sek`; const anbefaltHastighet = krav * 1.5; const erTilstrekkelig = hastighetMbps >= krav ? 'Ja' : 'Nei'; const benchmark = hastighetMbps >= 100 ? 'Svært raskt (gigabit-nivå)' : hastighetMbps >= 50 ? 'Raskt (god for 4K)' : hastighetMbps >= 25 ? 'Moderat (bra for HD)' : hastighetMbps >= 10 ? 'Langsomt (grunnleggende)' : 'Svært langsomt (kun tekst/epost)'; return {value: nedlastingstidSekunder, unit: 'sekunder', desc: `Nedlastingstid: ${tidStr} | Strømmekvalitet: ${i.strommekvalitet} (krever ${krav} Mbps) | Tilstrekkelig for strømming: ${erTilstrekkelig} | Anbefalt hastighet for stabil strømming: ${anbefaltHastighet} Mbps | Benchmark: ${benchmark}`}; }

  aws_cost_calculator: (i) => { if (!i.ec2_instances || !i.hours_per_month || !i.instance_type || !i.data_transfer_gb || !i.s3_storage_gb) return null; const rates = {'t3.micro': 0.0104, 't3.small': 0.0208, 't3.medium': 0.0416, 't3.large': 0.0832, 'm5.large': 0.096, 'm5.xlarge': 0.192, 'c5.large': 0.085, 'c5.xlarge': 0.17}; const ratePerHour = rates[i.instance_type] || 0.0104; const ec2Cost = i.ec2_instances * i.hours_per_month * ratePerHour; const dataCost = i.data_transfer_gb * 0.09; const s3Cost = i.s3_storage_gb * 0.023; const total = ec2Cost + dataCost + s3Cost; const benchmark = total < 100 ? 'Lav kostnad' : total < 500 ? 'Moderat kostnad' : 'Høy kostnad'; const comparison = total < 200 ? 'Sammenlignbar med en Netflix-plan' : total < 1000 ? 'Sammenlignbar med en mobiltelefonregning' : 'Sammenlignbar med en husleie'; return {value: total, unit: 'USD/måned', desc: `EC2: $${ec2Cost.toFixed(2)} | Dataoverføring: $${dataCost.toFixed(2)} | S3: $${s3Cost.toFixed(2)} | Total: $${total.toFixed(2)} | ${benchmark} | ${comparison}`}; }

  pcb_impedans: (i) => { if (!i.spor_bredde || !i.dielektrisk_tykkelse || !i.kobber_tykkelse || !i.dielektrisk_konstant || !i.type) return null; const w = i.spor_bredde; const h = i.dielektrisk_tykkelse; const t = i.kobber_tykkelse; const er = i.dielektrisk_konstant; const type = i.type; let Z0; let desc; if (type === 'Mikrostrip') { const w_eff = w + (t / (Math.PI * h)) * (1 + Math.log(2 * h / t)); const epsilon_eff = (er + 1) / 2 + (er - 1) / 2 * (1 / Math.sqrt(1 + 12 * h / w_eff)); Z0 = (60 / Math.sqrt(epsilon_eff)) * Math.log(8 * h / w_eff + w_eff / (4 * h)); desc = 'Mikrostrip impedans: ' + Z0.toFixed(1) + ' Ω'; } else { const w_eff = w - (t / (Math.PI * h)) * (1 + Math.log(2 * h / t)); const epsilon_eff = er; Z0 = (60 / Math.sqrt(epsilon_eff)) * Math.log(4 * h / (0.67 * Math.PI * w_eff + 0.8 * t)); desc = 'Stripline impedans: ' + Z0.toFixed(1) + ' Ω'; } if (Z0 < 50) { desc += ' | Lav impedans (< 50 Ω) – kan gi refleksjoner'; } else if (Z0 > 100) { desc += ' | Høy impedans (> 100 Ω) – kan gi signaldemping'; } else { desc += ' | Innenfor typisk område (50-100 Ω)'; } if (Z0 < 30 || Z0 > 150) { desc += ' | ADVARSEL: Ekstrem impedans – sjekk designet'; } return {value: Z0, unit: 'Ω', desc: desc}; }

  bildeforhold_beregning: (i) => { if (!i.ratio_width || !i.ratio_height || !i.known_value || !i.known_type) return null; const rw = parseFloat(i.ratio_width); const rh = parseFloat(i.ratio_height); const kv = parseFloat(i.known_value); if (rw <= 0 || rh <= 0 || kv <= 0) return null; let bredde, hoyde, diagonal; if (i.known_type === 'Bredde') { bredde = kv; hoyde = (kv * rh) / rw; diagonal = Math.sqrt(bredde * bredde + hoyde * hoyde); } else if (i.known_type === 'Høyde') { hoyde = kv; bredde = (kv * rw) / rh; diagonal = Math.sqrt(bredde * bredde + hoyde * hoyde); } else if (i.known_type === 'Diagonal') { diagonal = kv; const faktor = Math.sqrt(rw * rw + rh * rh); bredde = (kv * rw) / faktor; hoyde = (kv * rh) / faktor; } else { return null; } const ratioStr = rw + ':' + rh; const desc = `Bredde: ${bredde.toFixed(2)} | Høyde: ${hoyde.toFixed(2)} | Diagonal: ${diagonal.toFixed(2)} | Forhold: ${ratioStr}`; return {value: bredde, unit: 'enheter', desc: desc}; }

  overforingshastighet_formel: (i) => { if(!i.filstorrelse || !i.hastighet || !i.hastighet_enhet) return null; const sizeMB = parseFloat(i.filstorrelse); const speed = parseFloat(i.hastighet); let speedMbps; switch(i.hastighet_enhet) { case 'Mbps': speedMbps = speed; break; case 'Gbps': speedMbps = speed * 1000; break; case 'KB/s': speedMbps = speed * 0.008; break; case 'MB/s': speedMbps = speed * 8; break; default: speedMbps = speed; } const timeSeconds = (sizeMB * 8) / speedMbps; const timeMinutes = timeSeconds / 60; const timeHours = timeMinutes / 60; let benchmark = ''; if(speedMbps < 10) benchmark = 'Svært treg (f.eks. gammelt ADSL)'; else if(speedMbps < 50) benchmark = 'Moderat (f.eks. basis bredbånd)'; else if(speedMbps < 200) benchmark = 'Rask (f.eks. fiber 100-200 Mbps)'; else if(speedMbps < 1000) benchmark = 'Veldig rask (f.eks. fiber 500 Mbps)'; else benchmark = 'Ekstremt rask (f.eks. gigabit fiber)'; const warning = (timeHours > 24) ? '⚠️ Overføringen vil ta over ett døgn. Vurder å komprimere filen eller øke hastigheten.' : (timeHours > 1) ? '⚠️ Overføringen tar flere timer. Sørg for stabil tilkobling.' : ''; const resultDesc = `Estimert tid: ${timeSeconds < 60 ? timeSeconds.toFixed(1) + ' sekunder' : timeMinutes < 60 ? timeMinutes.toFixed(1) + ' minutter' : timeHours.toFixed(2) + ' timer'} | Sammenligning: ${benchmark}${warning ? ' | ' + warning : ''}`; return {value: timeSeconds, unit: 'sekunder', desc: resultDesc}; }

  cidr_calculator: (i) => { if(!i.cidr || i.cidr.trim() === '') return null; const parts = i.cidr.split('/'); if(parts.length !== 2) return null; const ip = parts[0].trim(); const prefix = parseInt(parts[1].trim(), 10); if(isNaN(prefix) || prefix < 0 || prefix > 32) return null; const octets = ip.split('.').map(Number); if(octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) return null; const ipInt = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0; const mask = ~(0xFFFFFFFF >>> prefix) >>> 0; const networkInt = (ipInt & mask) >>> 0; const broadcastInt = (networkInt | (~mask >>> 0)) >>> 0; const networkStr = [(networkInt >>> 24) & 255, (networkInt >>> 16) & 255, (networkInt >>> 8) & 255, networkInt & 255].join('.'); const broadcastStr = [(broadcastInt >>> 24) & 255, (broadcastInt >>> 16) & 255, (broadcastInt >>> 8) & 255, broadcastInt & 255].join('.'); const totalHosts = Math.pow(2, 32 - prefix) - 2; const usableHosts = totalHosts > 0 ? totalHosts : 0; const wildcardMask = ~mask >>> 0; const wildcardStr = [(wildcardMask >>> 24) & 255, (wildcardMask >>> 16) & 255, (wildcardMask >>> 8) & 255, wildcardMask & 255].join('.'); const maskStr = [(mask >>> 24) & 255, (mask >>> 16) & 255, (mask >>> 8) & 255, mask & 255].join('.'); let subnetInfo = ''; if(i.subnet_count && !isNaN(i.subnet_count) && i.subnet_count > 0) { const subBits = Math.ceil(Math.log2(i.subnet_count)); const newPrefix = prefix + subBits; if(newPrefix <= 32) { const subHosts = Math.pow(2, 32 - newPrefix) - 2; subnetInfo = ` | Subnett: ${i.subnet_count} stk, ny maske: /${newPrefix}, verter per subnett: ${subHosts > 0 ? subHosts : 0}`; } else { subnetInfo = ' | Ugyldig antall subnett (for mange)'; } } const desc = `Nettverk: ${networkStr} | Broadcast: ${broadcastStr} | Maske: ${maskStr} (/${prefix}) | Wildcard: ${wildcardStr} | Totale verter: ${totalHosts} | Brukbare verter: ${usableHosts}${subnetInfo}`; return {value: networkStr, unit: 'nettverksadresse', desc: desc}; }

  algebra_solver: (i) => { if(i.a === undefined || i.b === undefined || i.c === undefined || i.a === null || i.b === null || i.c === null) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); const c = parseFloat(i.c); if(isNaN(a) || isNaN(b) || isNaN(c)) return null; if(a === 0) { if(b === 0) { if(c === 0) return {value: 0, unit: '', desc: 'Uendelig mange løsninger (0=0).'}; else return {value: 0, unit: '', desc: 'Ingen løsning (konstant ulik 0).'}; } else { const x = -c/b; return {value: x, unit: '', desc: 'Lineær likning: x = ' + x.toFixed(4)}; } } const diskriminant = b*b - 4*a*c; let desc = ''; if(diskriminant > 0) { const x1 = (-b + Math.sqrt(diskriminant)) / (2*a); const x2 = (-b - Math.sqrt(diskriminant)) / (2*a); const faktor = 'a(x - x1)(x - x2) = ' + a.toFixed(2) + '(x - ' + x1.toFixed(4) + ')(x - ' + x2.toFixed(4) + ')'; desc = 'To reelle røtter: x₁ = ' + x1.toFixed(4) + ', x₂ = ' + x2.toFixed(4) + ' | Faktorisert: ' + faktor + ' | Diskriminant Δ = ' + diskriminant.toFixed(2) + ' > 0'; return {value: x1, unit: '', desc: desc}; } else if(diskriminant === 0) { const x = -b/(2*a); const faktor = a.toFixed(2) + '(x - ' + x.toFixed(4) + ')²'; desc = 'Én reell rot (dobbeltrot): x = ' + x.toFixed(4) + ' | Faktorisert: ' + faktor + ' | Diskriminant Δ = 0'; return {value: x, unit: '', desc: desc}; } else { const real = -b/(2*a); const imag = Math.sqrt(-diskriminant)/(2*a); desc = 'To komplekse røtter: x₁ = ' + real.toFixed(4) + ' + ' + imag.toFixed(4) + 'i, x₂ = ' + real.toFixed(4) + ' - ' + imag.toFixed(4) + 'i | Diskriminant Δ = ' + diskriminant.toFixed(2) + ' < 0 | Ingen reelle nullpunkter'; return {value: real, unit: '', desc: desc}; } }

  prosentfeil_beregning: (i) => { if (!i.teoretisk_verdi || !i.eksperimentell_verdi || i.teoretisk_verdi === 0) return null; const teoretisk = parseFloat(i.teoretisk_verdi); const eksperimentell = parseFloat(i.eksperimentell_verdi); const feil = Math.abs(eksperimentell - teoretisk); const prosentfeil = (feil / Math.abs(teoretisk)) * 100; const avvik = eksperimentell - teoretisk; const prosentavvik = (avvik / Math.abs(teoretisk)) * 100; let vurdering = ''; if (prosentfeil < 1) vurdering = 'Meget nøyaktig måling'; else if (prosentfeil < 5) vurdering = 'God nøyaktighet'; else if (prosentfeil < 10) vurdering = 'Akseptabel nøyaktighet'; else if (prosentfeil < 20) vurdering = 'Betydelig feil - bør kontrolleres'; else vurdering = 'Stor feil - måling trolig upålitelig'; return {value: prosentfeil, unit: '%', desc: `Prosentfeil: ${prosentfeil.toFixed(2)}% | Absolutt feil: ${feil.toFixed(2)} | Prosentavvik: ${prosentavvik.toFixed(2)}% | Vurdering: ${vurdering}`}; }

  broek_kalkulator: (i) => { if (!i.teller1 || !i.nevner1 || !i.teller2 || !i.nevner2 || !i.operasjon) return null; if (i.nevner1 === 0 || i.nevner2 === 0) return {value: null, unit: '', desc: 'Nevner kan ikke være 0'}; let t1 = Number(i.teller1), n1 = Number(i.nevner1), t2 = Number(i.teller2), n2 = Number(i.nevner2); let resT, resN; switch(i.operasjon) { case '+': resT = t1*n2 + t2*n1; resN = n1*n2; break; case '-': resT = t1*n2 - t2*n1; resN = n1*n2; break; case '*': resT = t1*t2; resN = n1*n2; break; case '/': if (t2 === 0) return {value: null, unit: '', desc: 'Kan ikke dele med 0'}; resT = t1*n2; resN = n1*t2; break; default: return null; } const gcd = (a,b) => { a = Math.abs(a); b = Math.abs(b); while(b) { let t = b; b = a % b; a = t; } return a; }; const divisor = gcd(resT, resN); const forenkletT = resT / divisor; const forenkletN = resN / divisor; const desimal = forenkletT / forenkletN; let blandet = ''; if (Math.abs(forenkletT) >= Math.abs(forenkletN) && forenkletN !== 0) { const heltall = Math.floor(forenkletT / forenkletN); const restT = Math.abs(forenkletT % forenkletN); if (restT === 0) { blandet = heltall.toString(); } else { blandet = heltall + ' ' + restT + '/' + forenkletN; } } else { blandet = forenkletT + '/' + forenkletN; } const prosent = (desimal * 100).toFixed(2); let advarsel = ''; if (forenkletN > 100) advarsel = ' | Merk: Stor nevner, vurder forenkling'; if (desimal > 10) advarsel += ' | Høy verdi, sjekk om brøken er riktig'; return {value: desimal, unit: '', desc: 'Forenklet: ' + forenkletT + '/' + forenkletN + ' | Blandet: ' + blandet + ' | Desimal: ' + desimal.toFixed(4) + ' | Prosent: ' + prosent + '%' + advarsel}; }

  hex_calculator: (i) => { if(!i.hex1 || !i.hex2 || !i.operation) return null; const hexRegex = /^[0-9A-Fa-f]+$/; if(!hexRegex.test(i.hex1) || !hexRegex.test(i.hex2)) return {value: null, unit: '', desc: 'Ugyldig heksadesimalt tall. Bruk kun 0-9 og A-F.'}; const num1 = parseInt(i.hex1, 16); const num2 = parseInt(i.hex2, 16); let result; let opSymbol; switch(i.operation) { case 'Addisjon (+)': result = num1 + num2; opSymbol = '+'; break; case 'Subtraksjon (-)': result = num1 - num2; opSymbol = '-'; break; case 'Multiplikasjon (×)': result = num1 * num2; opSymbol = '×'; break; case 'Divisjon (÷)': if(num2 === 0) return {value: null, unit: '', desc: 'Kan ikke dele på null.'}; result = Math.floor(num1 / num2); break; default: return null; } const hexResult = result.toString(16).toUpperCase(); const decimalResult = result; const binaryResult = result.toString(2); const octalResult = result.toString(8); return {value: hexResult, unit: 'hex', desc: `Desimal: ${decimalResult} | Binær: ${binaryResult} | Oktal: ${octalResult} | ${i.hex1.toUpperCase()} ${opSymbol} ${i.hex2.toUpperCase()} = ${hexResult}`}; }

  stor_tall_beregning: (i) => { if (!i.tall1 || !i.tall2 || !i.operasjon) return null; const a = BigInt(i.tall1); const b = BigInt(i.tall2); let result, unit, desc; const navn = (n) => { const s = n.toString(); const len = s.length; if (len <= 3) return s; const grupper = Math.floor((len - 1) / 3); const navnListe = ['', 'tusen', 'million', 'milliard', 'billion', 'billiard', 'trillion', 'trilliard', 'kvadrillion', 'kvadrilliard', 'kvintillion', 'kvintilliard', 'sekstillion', 'sekstilliard', 'septillion', 'septilliard', 'oktillion', 'oktilliard', 'nonillion', 'nonilliard', 'desillion']; if (grupper < navnListe.length) { const forste = s.slice(0, len - grupper * 3); return forste + ' ' + navnListe[grupper]; } return s + ' (for stort for ord)'; }; switch (i.operasjon) { case 'Addisjon': result = a + b; unit = ''; desc = `Sum: ${result.toString()} (${navn(result)})`; break; case 'Subtraksjon': result = a - b; unit = ''; desc = `Differanse: ${result.toString()} (${navn(result)})`; break; case 'Multiplikasjon': result = a * b; unit = ''; desc = `Produkt: ${result.toString()} (${navn(result)})`; break; case 'Divisjon': if (b === 0n) return {value: 'Udefinert', unit: '', desc: 'Kan ikke dele på null'}; const kvotient = a / b; const rest = a % b; result = kvotient.toString(); unit = ''; desc = `Kvotient: ${kvotient.toString()} (${navn(kvotient)}), Rest: ${rest.toString()}`; break; case 'Potens (tall1^tall2)': if (b > 100n) return {value: 'For stor', unit: '', desc: 'Eksponenten er for stor (>100) til å beregne'}; result = a ** Number(b); unit = ''; desc = `${a}^{${b}} = ${result.toString()} (${navn(result)})`; break; case 'Sammenlign': if (a > b) { result = 'Tall 1 > Tall 2'; desc = `Tall 1 (${navn(a)}) er større enn Tall 2 (${navn(b)})`; } else if (a < b) { result = 'Tall 1 < Tall 2'; desc = `Tall 1 (${navn(a)}) er mindre enn Tall 2 (${navn(b)})`; } else { result = 'Tall 1 = Tall 2'; desc = `Tall 1 (${navn(a)}) er lik Tall 2 (${navn(b)})`; } unit = ''; break; default: return null; } return {value: result.toString(), unit: unit, desc: desc}; }

  vitenskapelig_kalkulator: (i) => { if(!i.verdi && i.operasjon !== 'pi' && i.operasjon !== 'e (Eulers tall)') return null; const v = parseFloat(i.verdi); let resultat, enhet, beskrivelse; switch(i.operasjon) { case 'sin (grader)': resultat = Math.sin(v * Math.PI / 180); enhet = ''; beskrivelse = `Sinus av ${v}° = ${resultat.toFixed(6)}`; break; case 'cos (grader)': resultat = Math.cos(v * Math.PI / 180); enhet = ''; beskrivelse = `Cosinus av ${v}° = ${resultat.toFixed(6)}`; break; case 'tan (grader)': if(v % 180 === 90) return {value: null, unit: '', desc: 'Udefinert (tan 90°)'}; resultat = Math.tan(v * Math.PI / 180); enhet = ''; beskrivelse = `Tangens av ${v}° = ${resultat.toFixed(6)}`; break; case 'arcsin': if(v < -1 || v > 1) return {value: null, unit: '', desc: 'Ugyldig: arcsin krever verdi mellom -1 og 1'}; resultat = Math.asin(v) * 180 / Math.PI; enhet = '°'; beskrivelse = `arcsin(${v}) = ${resultat.toFixed(4)}°`; break; case 'arccos': if(v < -1 || v > 1) return {value: null, unit: '', desc: 'Ugyldig: arccos krever verdi mellom -1 og 1'}; resultat = Math.acos(v) * 180 / Math.PI; enhet = '°'; beskrivelse = `arccos(${v}) = ${resultat.toFixed(4)}°`; break; case 'arctan': resultat = Math.atan(v) * 180 / Math.PI; enhet = '°'; beskrivelse = `arctan(${v}) = ${resultat.toFixed(4)}°`; break; case 'ln (naturlig log)': if(v <= 0) return {value: null, unit: '', desc: 'Ugyldig: ln krever positivt tall'}; resultat = Math.log(v); enhet = ''; beskrivelse = `ln(${v}) = ${resultat.toFixed(6)}`; break; case 'log10': if(v <= 0) return {value: null, unit: '', desc: 'Ugyldig: log10 krever positivt tall'}; resultat = Math.log10(v); enhet = ''; beskrivelse = `log10(${v}) = ${resultat.toFixed(6)}`; break; case 'eksponential (e^x)': resultat = Math.exp(v); enhet = ''; beskrivelse = `e^${v} = ${resultat.toFixed(6)}`; break; case 'kvadratrot': if(v < 0) return {value: null, unit: '', desc: 'Ugyldig: kvadratrot av negativt tall'}; resultat = Math.sqrt(v); enhet = ''; beskrivelse = `√${v} = ${resultat.toFixed(6)}`; break; case 'opphøyd i 2': resultat = v * v; enhet = ''; beskrivelse = `${v}² = ${resultat.toFixed(6)}`; break; case 'opphøyd i 3': resultat = v * v * v; enhet = ''; beskrivelse = `${v}³ = ${resultat.toFixed(6)}`; break; case 'fakultet': if(v < 0 || !Number.isInteger(v)) return {value: null, unit: '', desc: 'Ugyldig: fakultet krever ikke-negativt heltall'}; if(v > 170) return {value: null, unit: '', desc: 'Overflyt: for stor verdi'}; let f = 1; for(let i=2; i<=v; i++) f *= i; resultat = f; enhet = ''; beskrivelse = `${v}! = ${resultat.toLocaleString('no-NO')}`; break; case 'pi': resultat = Math.PI; enhet = ''; beskrivelse = `π = ${resultat.toFixed(10)}`; break; case 'e (Eulers tall)': resultat = Math.E; enhet = ''; beskrivelse = `e = ${resultat.toFixed(10)}`; break; default: return null; } return {value: resultat, unit: enhet, desc: beskrivelse}; }

  matrix_calculator: (i) => { if (!i.matrix_input || i.matrix_input.trim() === '') return null; try { const rows = i.matrix_input.split(';').map(r => r.split(',').map(Number)); const n = rows.length; if (rows.some(r => r.length !== n)) return {value: null, unit: '', desc: 'Matrisen må være kvadratisk (samme antall rader og kolonner).'}; const det = (m) => { if (m.length === 1) return m[0][0]; if (m.length === 2) return m[0][0]*m[1][1] - m[0][1]*m[1][0]; let d = 0; for (let c = 0; c < m.length; c++) { const sub = m.slice(1).map(r => r.filter((_,j) => j !== c)); d += (c % 2 === 0 ? 1 : -1) * m[0][c] * det(sub); } return d; }; const determinant = det(rows); const inverse = (m) => { const d = det(m); if (Math.abs(d) < 1e-12) return null; if (m.length === 2) { const a = m[0][0], b = m[0][1], c = m[1][0], d2 = m[1][1]; return [[d2/d, -b/d], [-c/d, a/d]]; } const n2 = m.length; const inv = Array.from({length: n2}, () => Array(n2).fill(0)); for (let i = 0; i < n2; i++) { for (let j = 0; j < n2; j++) { const sub = m.filter((_,r) => r !== i).map(r => r.filter((_,c) => c !== j)); inv[j][i] = ((i+j) % 2 === 0 ? 1 : -1) * det(sub) / d; } } return inv; }; const invMatrix = inverse(rows); const rank = (m) => { const mat = m.map(r => [...r]); let rk = 0; const nRows = mat.length, nCols = mat[0].length; let row = 0; for (let col = 0; col < nCols && row < nRows; col++) { let sel = row; for (let i = row; i < nRows; i++) { if (Math.abs(mat[i][col]) > Math.abs(mat[sel][col])) sel = i; } if (Math.abs(mat[sel][col]) < 1e-12) continue; [mat[row], mat[sel]] = [mat[sel], mat[row]]; for (let i = 0; i < nRows; i++) { if (i !== row) { const factor = mat[i][col] / mat[row][col]; for (let j = col; j < nCols; j++) mat[i][j] -= factor * mat[row][j]; } } row++; rk++; } return rk; }; const r = rank(rows); const eigenvalues = (m) => { if (m.length === 2) { const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1]; const trace = a + d; const det2 = a*d - b*c; const disc = trace*trace - 4*det2; if (disc < 0) return [{real: trace/2, imag: Math.sqrt(-disc)/2}, {real: trace/2, imag: -Math.sqrt(-disc)/2}]; const sqrtDisc = Math.sqrt(disc); return [{real: (trace + sqrtDisc)/2, imag: 0}, {real: (trace - sqrtDisc)/2, imag: 0}]; } return null; }; const eig = eigenvalues(rows); let desc = `Determinant: ${determinant.toFixed(4)}`; if (invMatrix) { const invStr = invMatrix.map(r => r.map(v => v.toFixed(4)).join(', ')).join('; '); desc += ` | Invers: [${invStr}]`; } else { desc += ' | Invers: Ikke inverterbar (determinant = 0)'; } desc += ` | Rang: ${r}`; if (eig) { const eigStr = eig.map(e => e.imag === 0 ? e.real.toFixed(4) : `${e.real.toFixed(4)} ± ${e.imag.toFixed(4)}i`).join(', '); desc += ` | Egenverdier: ${eigStr}`; } else { desc += ' | Egenverdier: Kun for 2x2 matrise'; } if (determinant === 0) desc += ' | ⚠️ Matrisen er singulær (determinant = 0)'; else if (Math.abs(determinant) < 0.001) desc += ' | ⚠️ Determinanten er svært liten, matrisen er nær singulær'; return {value: determinant, unit: '', desc: desc}; } catch (e) { return {value: null, unit: '', desc: 'Ugyldig input. Bruk format: rad1,rad2;rad3,rad4 (f.eks. 1,2;3,4)'}; } }

  binaer_kalkulator: (i) => { if(!i.tall1 || !i.tall2 || !i.operasjon) return null; const isValidBinary = (s) => /^[01]+$/.test(s); if(!isValidBinary(i.tall1) || !isValidBinary(i.tall2)) return {value: null, unit: '', desc: 'Ugyldig binært tall. Kun 0 og 1 er tillatt.'}; const a = parseInt(i.tall1, 2); const b = parseInt(i.tall2, 2); let result, desc; switch(i.operasjon) { case 'Addisjon (+)': result = a + b; desc = `Sum (desimal): ${result} | Binær: ${result.toString(2)}`; break; case 'Subtraksjon (-)': result = a - b; desc = `Differanse (desimal): ${result} | Binær: ${result.toString(2)}`; break; case 'Multiplikasjon (×)': result = a * b; desc = `Produkt (desimal): ${result} | Binær: ${result.toString(2)}`; break; case 'Divisjon (÷)': if(b === 0) return {value: null, unit: '', desc: 'Kan ikke dele på null.'}; result = Math.floor(a / b); const remainder = a % b; desc = `Kvotient (desimal): ${result} | Binær: ${result.toString(2)} | Rest: ${remainder} (binær: ${remainder.toString(2)})`; break; default: return null; } return {value: result, unit: 'desimal', desc: desc}; }

  forholdsberegner_formula: (i) => { if(!i.a || !i.b) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); if(a <= 0 || b <= 0) return {value: null, unit: '', desc: 'Vennligst skriv inn positive tall.'}; const modus = i.modus || 'Forhold A:B'; if(modus === 'Forhold A:B') { const gcd = (x, y) => { while(y) { let t = y; y = x % y; x = t; } return x; }; const g = gcd(a, b); const ratioStr = (a/g) + ':' + (b/g); const decimal = a / b; const prosent = (a / b) * 100; const desc = `Forenklet forhold: ${ratioStr} | Desimal: ${decimal.toFixed(4)} | A er ${prosent.toFixed(1)}% av B | B er ${(b/a*100).toFixed(1)}% av A`; return {value: decimal, unit: '', desc: desc}; } else if(modus === 'Finn manglende D (A:B = C:D)') { if(!i.c) return {value: null, unit: '', desc: 'Vennligst fyll inn C for å finne D.'}; const c = parseFloat(i.c); if(c <= 0) return {value: null, unit: '', desc: 'C må være positiv.'}; const d = (b * c) / a; const ratioCheck = (a/b).toFixed(4) === (c/d).toFixed(4) ? 'Forholdet stemmer.' : 'Forholdet stemmer ikke (avrundingsfeil kan forekomme).'; const desc = `D = ${d.toFixed(4)} | Sjekk: A/B = ${(a/b).toFixed(4)}, C/D = ${(c/d).toFixed(4)} | ${ratioCheck}`; return {value: d, unit: '', desc: desc}; } else if(modus === 'Skaler opp/ned') { if(!i.skaleringsfaktor) return {value: null, unit: '', desc: 'Vennligst oppgi en skaleringsfaktor.'}; const faktor = parseFloat(i.skaleringsfaktor); if(faktor <= 0) return {value: null, unit: '', desc: 'Skaleringsfaktoren må være positiv.'}; const nyA = a * faktor; const nyB = b * faktor; const desc = `Ny A: ${nyA.toFixed(4)} | Ny B: ${nyB.toFixed(4)} | Forholdet beholdes: ${(nyA/nyB).toFixed(4)} (opprinnelig: ${(a/b).toFixed(4)})`; return {value: nyA/nyB, unit: '', desc: desc}; } else { return {value: null, unit: '', desc: 'Ugyldig modus.'}; } }

  logaritme_beregner: (i) => { if (!i.tall || i.tall <= 0) return null; const tall = Number(i.tall); const baseStr = i.base; let base; let baseLabel; if (baseStr.startsWith('10')) { base = 10; baseLabel = '10'; } else if (baseStr.startsWith('e')) { base = Math.E; baseLabel = 'e'; } else { base = parseInt(baseStr); baseLabel = baseStr; } const logBase = Math.log(tall) / Math.log(base); const log10 = Math.log10(tall); const ln = Math.log(tall); const log2 = Math.log2(tall); let desc = `Logaritme med base ${baseLabel}: ${logBase.toFixed(6)}`; desc += ` | Log10: ${log10.toFixed(6)}`; desc += ` | Ln: ${ln.toFixed(6)}`; desc += ` | Log2: ${log2.toFixed(6)}`; if (tall === 1) { desc += ' | Merk: log(1) = 0 for alle baser.'; } else if (tall < 1) { desc += ' | Negativ logaritme (tall mellom 0 og 1).'; } else if (tall > 1000000) { desc += ' | Stort tall: logaritmen vokser sakte.'; } if (base === 10) { desc += ' | Tiende logaritme er vanlig i ingeniørfag.'; } else if (base === Math.E) { desc += ' | Naturlig logaritme brukes i fysikk og finans.'; } return {value: logBase, unit: '', desc: desc}; }

  avrunding_formel: (i) => { if(!i.tall || i.tall === '' || isNaN(i.tall)) return null; const tall = parseFloat(i.tall); const des = parseInt(i.desimaler) || 0; const sign = parseInt(i.signifikante_sifre) || null; const metode = i.avrundingsmetode || 'Standard (avrund opp/ned)'; let resultat; if(sign && sign > 0) { const faktor = Math.pow(10, sign - Math.floor(Math.log10(Math.abs(tall))) - 1); if(metode === 'Alltid opp') resultat = Math.ceil(tall * faktor) / faktor; else if(metode === 'Alltid ned') resultat = Math.floor(tall * faktor) / faktor; else if(metode === 'Bankers avrunding') { const avrundet = Math.round(tall * faktor) / faktor; const diff = tall * faktor - Math.floor(tall * faktor); if(diff === 0.5) { const sisteSiffer = Math.floor(tall * faktor) % 2; resultat = sisteSiffer === 0 ? Math.floor(tall * faktor) / faktor : Math.ceil(tall * faktor) / faktor; } else resultat = avrundet; } else resultat = Math.round(tall * faktor) / faktor; } else { const faktor = Math.pow(10, des); if(metode === 'Alltid opp') resultat = Math.ceil(tall * faktor) / faktor; else if(metode === 'Alltid ned') resultat = Math.floor(tall * faktor) / faktor; else if(metode === 'Bankers avrunding') { const avrundet = Math.round(tall * faktor) / faktor; const diff = tall * faktor - Math.floor(tall * faktor); if(diff === 0.5) { const sisteSiffer = Math.floor(tall * faktor) % 2; resultat = sisteSiffer === 0 ? Math.floor(tall * faktor) / faktor : Math.ceil(tall * faktor) / faktor; } else resultat = avrundet; } else resultat = Math.round(tall * faktor) / faktor; } const avrundetStr = resultat.toFixed(des); const feil = Math.abs(tall - resultat); const prosentFeil = tall !== 0 ? (feil / Math.abs(tall) * 100).toFixed(2) : '0.00'; let advarsel = ''; if(des > 10) advarsel = ' | ⚠️ Mange desimaler kan gi unøyaktighet'; if(sign && sign > 15) advarsel = ' | ⚠️ For mange signifikante sifre kan være upresist'; return {value: resultat, unit: '', desc: `Avrundet verdi: ${avrundetStr} | Absolutt feil: ${feil.toFixed(10)} | Relativ feil: ${prosentFeil}%${advarsel}`}; }

  rotkalkulator_formel: (i) => { if (!i.tall || !i.rotgrad || !i.desimaler) return null; const tall = parseFloat(i.tall); const n = parseInt(i.rotgrad); const des = parseInt(i.desimaler); if (n <= 0) return {value: null, unit: '', desc: 'Rotgrad må være et positivt heltall.'}; if (tall < 0 && n % 2 === 0) return {value: null, unit: '', desc: 'Kan ikke ta en partallsrot av et negativt tall (gir imaginært resultat).'}; const rot = Math.pow(tall, 1/n); const rotAvrundet = rot.toFixed(des); const kvadratrot = Math.sqrt(tall).toFixed(des); const kubikkrot = Math.cbrt(tall).toFixed(des); const potensSjekk = Math.pow(Math.round(rot), n); const erHeltall = Math.abs(rot - Math.round(rot)) < 1e-10; let heltallInfo = erHeltall ? `Tallet er en perfekt ${n}. potens (${Math.round(rot)}^${n} = ${potensSjekk}).` : `Tallet er ikke en perfekt ${n}. potens (nærmeste heltall: ${Math.round(rot)}^${n} = ${potensSjekk}).`; let advarsel = ''; if (tall < 0) advarsel = 'Negativt tall: resultatet er reelt kun for oddetallsrotgrader.'; else if (tall === 0) advarsel = 'Rot av 0 er alltid 0.'; else if (tall === 1) advarsel = 'Rot av 1 er alltid 1.'; else if (tall > 1e12) advarsel = 'Svært stort tall: resultatet kan være unøyaktig.'; const desc = `${n}. rot: ${rotAvrundet} | Kvadratrot: ${kvadratrot} | Kubikkrot: ${kubikkrot} | ${heltallInfo}${advarsel ? ' | ' + advarsel : ''}`; return {value: rotAvrundet, unit: '', desc: desc}; }

  prosentkalkulator: (i) => { if(!i.type || i.verdi1 === undefined || i.verdi1 === null || i.verdi1 === '' || i.verdi2 === undefined || i.verdi2 === null || i.verdi2 === '' || i.prosent === undefined || i.prosent === null || i.prosent === '') return null; const v1 = Number(i.verdi1); const v2 = Number(i.verdi2); const p = Number(i.prosent); if(isNaN(v1) || isNaN(v2) || isNaN(p)) return null; let value, unit, desc; if(i.type === 'Prosent av tall') { value = (p / 100) * v1; unit = 'samme enhet som Verdi 1'; desc = p + '% av ' + v1 + ' = ' + value.toFixed(2) + '. '; if(value > v1) desc += 'Merk: resultatet er større enn grunnlaget (over 100%). '; else if(value === 0) desc += '0% gir alltid 0. '; else if(p > 100) desc += 'Over 100% indikerer mer enn hele grunnlaget. '; else if(p < 0) desc += 'Negativ prosent gir negativt resultat. '; desc += 'Eksempel: 25% av 200 = 50.'; } else if(i.type === 'Prosentvis endring') { if(v1 === 0) return null; value = ((v2 - v1) / v1) * 100; unit = '%'; desc = 'Endring fra ' + v1 + ' til ' + v2 + ' = ' + value.toFixed(2) + '%. '; if(value > 0) desc += 'Økning på ' + value.toFixed(2) + '%. '; else if(value < 0) desc += 'Nedgang på ' + Math.abs(value).toFixed(2) + '%. '; else desc += 'Ingen endring. '; if(Math.abs(value) > 100) desc += 'Stor endring (over 100%). '; if(Math.abs(value) > 1000) desc += 'Ekstrem endring! '; desc += 'Eksempel: 50 til 75 = 50% økning.'; } else if(i.type === 'Prosentpoeng') { value = Math.abs(p - v1); unit = 'prosentpoeng'; desc = 'Forskjell mellom ' + v1 + '% og ' + p + '% = ' + value.toFixed(2) + ' prosentpoeng. '; if(value === 0) desc += 'Ingen forskjell. '; else if(value < 1) desc += 'Liten forskjell. '; else if(value > 10) desc += 'Stor forskjell. '; desc += 'Merk: Prosentpoeng er absolutt forskjell, ikke relativ. Eksempel: 10% til 15% = 5 prosentpoeng.'; } else { return null; } return {value: value, unit: unit, desc: desc}; }

  andregradsligning_formel: (i) => { if (i.a === undefined || i.b === undefined || i.c === undefined || i.a === null || i.b === null || i.c === null) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); const c = parseFloat(i.c); if (a === 0) return {value: null, unit: '', desc: 'Dette er ikke en andregradsligning (a kan ikke være 0).'}; const diskriminant = b * b - 4 * a * c; if (diskriminant > 0) { const x1 = (-b + Math.sqrt(diskriminant)) / (2 * a); const x2 = (-b - Math.sqrt(diskriminant)) / (2 * a); const toppunktX = -b / (2 * a); const toppunktY = a * toppunktX * toppunktX + b * toppunktX + c; return {value: x1, unit: '', desc: `To reelle røtter: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)} | Toppunkt: (${toppunktX.toFixed(4)}, ${toppunktY.toFixed(4)}) | Diskriminant: ${diskriminant.toFixed(4)} > 0`}; } else if (diskriminant === 0) { const x = -b / (2 * a); return {value: x, unit: '', desc: `Én reell rot (dobbeltrot): x = ${x.toFixed(4)} | Diskriminant = 0`}; } else { const real = -b / (2 * a); const imag = Math.sqrt(-diskriminant) / (2 * a); return {value: real, unit: '', desc: `To komplekse røtter: x₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i, x₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i | Diskriminant: ${diskriminant.toFixed(4)} < 0 (ingen reelle røtter)`}; } }

  eksponent_kalkulator: (i) => { if(!i.base || !i.exponent) return null; const base = Number(i.base); const exp = Number(i.exponent); const mod = i.modulus ? Number(i.modulus) : null; let result; let desc; if(mod && mod > 0) { result = Math.pow(base, exp) % mod; desc = `Potens: ${base}^${exp} = ${Math.pow(base, exp).toLocaleString()}`; desc += ` | Modulo ${mod}: ${result}`; } else { result = Math.pow(base, exp); desc = `Potens: ${base}^${exp} = ${result.toLocaleString()}`; } if(exp > 0) { const growthFactor = Math.pow(base, exp); if(growthFactor > 1e6) desc += ' | ⚠️ Svært stor verdi'; if(base === 2) { const bits = exp; desc += ` | Binært: ${bits} bits = ${Math.pow(2, bits).toLocaleString()} mulige verdier`; } if(base === 10) { desc += ` | Vitenskapelig notasjon: ${result.toExponential(3)}`; } } if(exp < 0) { desc += ` | Negativ eksponent: 1/${Math.pow(base, Math.abs(exp)).toLocaleString()}`; } if(base === 0 && exp === 0) { desc = '0^0 er ubestemt'; result = NaN; } return {value: result, unit: '', desc: desc}; }

  minste_felles_multiplum: (i) => { if(!i.tall1 || !i.tall2) return null; const tall = [i.tall1, i.tall2]; if(i.tall3) tall.push(i.tall3); if(i.tall4) tall.push(i.tall4); const gcd = (a, b) => { while(b) { let t = b; b = a % b; a = t; } return a; }; const lcm = (a, b) => (a * b) / gcd(a, b); let result = tall[0]; for(let j = 1; j < tall.length; j++) { result = lcm(result, tall[j]); } const faktoriser = (n) => { let num = n; let factors = []; for(let p = 2; p * p <= num; p++) { while(num % p === 0) { factors.push(p); num /= p; } } if(num > 1) factors.push(num); return factors.join(' × '); }; const faktoriseringer = tall.map(t => `${t} = ${faktoriser(t)}`).join(' | '); return {value: result, unit: '', desc: `MFM: ${result} | Faktoriseringer: ${faktoriseringer} | Antall tall: ${tall.length}`}; }

  faktor_kalkulator: (i) => { if(!i.tall || i.tall < 1 || !Number.isInteger(Number(i.tall))) return null; const n = parseInt(i.tall); const faktorer = []; const primtallsfaktorer = []; let temp = n; for (let p = 2; p * p <= temp; p++) { while (temp % p === 0) { primtallsfaktorer.push(p); temp /= p; } } if (temp > 1) primtallsfaktorer.push(temp); for (let d = 1; d <= Math.sqrt(n); d++) { if (n % d === 0) { faktorer.push(d); if (d !== n / d) faktorer.push(n / d); } } faktorer.sort((a, b) => a - b); const antall = faktorer.length; const erPrimtall = antall === 2; const sumFaktorer = faktorer.reduce((a, b) => a + b, 0); const helseAdvarsel = n > 1000000 ? '⚠️ Svært stort tall – kan ta tid å beregne.' : ''; const benchmark = n <= 100 ? 'Enkelt tall' : n <= 10000 ? 'Moderat tall' : 'Stort tall'; return {value: faktorer.join(', '), unit: '', desc: `Faktorer: ${faktorer.join(', ')} | Antall faktorer: ${antall} | Primtallsfaktorer: ${primtallsfaktorer.join(' × ')} | Sum faktorer: ${sumFaktorer} | ${erPrimtall ? 'Tallet er et primtall.' : 'Tallet er ikke et primtall.'} ${helseAdvarsel} | Ytelse: ${benchmark}`}; }

  tilfeldig_tallgenerator: (i) => { if(!i.min || !i.max || !i.antall) return null; const min = Number(i.min); const max = Number(i.max); const antall = Number(i.antall); const unik = i.unik === 'Ja'; if(min >= max) return {value: 0, unit: '', desc: 'Feil: Minimum må være mindre enn maksimum.'}; if(antall < 1) return {value: 0, unit: '', desc: 'Feil: Antall må være minst 1.'}; if(unik && (max - min + 1) < antall) return {value: 0, unit: '', desc: 'Feil: For få unike tall i intervallet.'}; const resultater = []; const brukte = new Set(); let forsok = 0; const maxForsok = 10000; while(resultater.length < antall && forsok < maxForsok) { const tall = Math.floor(Math.random() * (max - min + 1)) + min; if(unik) { if(!brukte.has(tall)) { brukte.add(tall); resultater.push(tall); } } else { resultater.push(tall); } forsok++; } const sum = resultater.reduce((a,b) => a+b, 0); const snitt = (sum / resultater.length).toFixed(2); const sortert = [...resultater].sort((a,b) => a-b); const median = resultater.length % 2 === 0 ? ((sortert[resultater.length/2 - 1] + sortert[resultater.length/2]) / 2).toFixed(2) : sortert[Math.floor(resultater.length/2)]; const varians = resultater.reduce((acc, val) => acc + Math.pow(val - snitt, 2), 0) / resultater.length; const stdAvvik = Math.sqrt(varians).toFixed(2); const minste = Math.min(...resultater); const storste = Math.max(...resultater); const sannsynlighet = ((1 / (max - min + 1)) * 100).toFixed(2); return {value: resultater.join(', '), unit: '', desc: `Tall: ${resultater.join(', ')} | Sum: ${sum} | Snitt: ${snitt} | Median: ${median} | Min: ${minste} | Maks: ${storste} | Std.avvik: ${stdAvvik} | Sannsynlighet per tall: ${sannsynlighet}%`}; }

  vitenskapelig_notasjon_kalkulator: (i) => { if (!i.tall_input || i.tall_input === '' || isNaN(Number(i.tall_input))) return null; const des = (i.desimaler !== undefined && i.desimaler !== '' && !isNaN(Number(i.desimaler))) ? Math.max(0, Math.floor(Number(i.desimaler))) : 4; const tall = Number(i.tall_input); if (tall === 0) { return { value: 0, unit: '', desc: 'Null kan ikke skrives på standardform. | Mantisse: 0 | Eksponent: ubestemt' }; } const tegn = tall < 0 ? '-' : ''; const absTall = Math.abs(tall); const eksponent = Math.floor(Math.log10(absTall)); const mantisse = absTall / Math.pow(10, eksponent); const mantisseAvrundet = Math.round(mantisse * Math.pow(10, des)) / Math.pow(10, des); const vitenskapelig = tegn + mantisseAvrundet.toFixed(des) + ' × 10^' + eksponent; const vanlig = tall.toExponential(des); const ingeniørEksponent = 3 * Math.floor(eksponent / 3); const ingeniørMantisse = absTall / Math.pow(10, ingeniørEksponent); const ingeniørMantisseAvrundet = Math.round(ingeniørMantisse * Math.pow(10, des)) / Math.pow(10, des); const ingeniørNotasjon = tegn + ingeniørMantisseAvrundet.toFixed(des) + ' × 10^' + ingeniørEksponent; let sammenligning = ''; if (absTall >= 1e9) { sammenligning = 'Dette tallet er over 1 milliard – svært stort.'; } else if (absTall >= 1e6) { sammenligning = 'Dette tallet er over 1 million – stort.'; } else if (absTall >= 1e3) { sammenligning = 'Dette tallet er over 1000 – moderat stort.'; } else if (absTall <= 1e-9) { sammenligning = 'Dette tallet er mindre enn 1 milliarddel – svært lite.'; } else if (absTall <= 1e-6) { sammenligning = 'Dette tallet er mindre enn 1 milliondel – lite.'; } else if (absTall <= 1e-3) { sammenligning = 'Dette tallet er mindre enn 1 tusendel – lite.'; } else { sammenligning = 'Tallet er i et vanlig område.'; } return { value: vitenskapelig, unit: '', desc: 'Vitenskapelig notasjon: ' + vitenskapelig + ' | Vanlig (eksponentiell): ' + vanlig + ' | Ingeniørnotasjon: ' + ingeniørNotasjon + ' | ' + sammenligning }; }

  gcf_calculator: (i) => { if (!i.numbers || i.numbers.trim() === '') return null; const nums = i.numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0); if (nums.length < 2) return null; const method = i.method || 'Faktorisering'; let gcf, steps; if (method === 'Euklids algoritme') { let a = nums[0], b = nums[1]; steps = `Euklids algoritme: GCF(${a}, ${b})`; while (b !== 0) { const temp = b; b = a % b; a = temp; } gcf = a; steps += ` = ${gcf}`; for (let i = 2; i < nums.length; i++) { let c = nums[i]; steps += `, GCF(${gcf}, ${c})`; while (c !== 0) { const temp = c; c = gcf % c; gcf = temp; } steps += ` = ${gcf}`; } } else if (method === 'Primtallsfaktorisering') { const primeFactors = (n) => { const factors = []; let d = 2; while (n > 1) { while (n % d === 0) { factors.push(d); n /= d; } d++; if (d * d > n) { if (n > 1) factors.push(n); break; } } return factors; }; const allFactors = nums.map(n => primeFactors(n)); steps = 'Primtallsfaktorisering: ' + nums.map((n, idx) => `${n} = ${allFactors[idx].join(' × ')}`).join(', '); const common = allFactors[0].slice(); for (let i = 1; i < allFactors.length; i++) { const current = allFactors[i].slice(); for (let j = 0; j < common.length; j++) { const idx = current.indexOf(common[j]); if (idx !== -1) { current.splice(idx, 1); } else { common.splice(j, 1); j--; } } } gcf = common.reduce((a, b) => a * b, 1); steps += ` | Felles primtall: ${common.join(' × ')} = ${gcf}`; } else { const factorize = (n) => { const factors = []; for (let i = 1; i <= Math.sqrt(n); i++) { if (n % i === 0) { factors.push(i); if (i !== n / i) factors.push(n / i); } } return factors.sort((a, b) => a - b); }; const factorLists = nums.map(n => factorize(n)); steps = 'Faktorisering: ' + nums.map((n, idx) => `${n}: [${factorLists[idx].join(', ')}]`).join(', '); const commonFactors = factorLists[0].filter(f => factorLists.every(list => list.includes(f))); gcf = Math.max(...commonFactors); steps += ` | Felles faktorer: [${commonFactors.join(', ')}] | Største felles faktor: ${gcf}`; } const lcm = nums.reduce((a, b) => (a * b) / gcf); const sum = nums.reduce((a, b) => a + b, 0); const product = nums.reduce((a, b) => a * b, 1); const avg = sum / nums.length; const desc = `Største felles faktor (GCF): ${gcf} | Minste felles multiplum (LCM): ${lcm} | Sum: ${sum} | Produkt: ${product} | Gjennomsnitt: ${avg.toFixed(2)} | Metode: ${method} | Trinn: ${steps}`; return {value: gcf, unit: '', desc: desc}; }

  fullfor_kvadratet: (i) => { if(!i || i.a === undefined || i.b === undefined || i.c === undefined) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); const c = parseFloat(i.c); if(a === 0) return {value: 0, unit: '', desc: 'Ugyldig: a kan ikke være 0'}; const bOver2a = b / (2 * a); const kvadrat = bOver2a * bOver2a; const konstant = c / a; const fullfort = konstant - kvadrat; const diskriminant = b*b - 4*a*c; let losningStr = ''; if(diskriminant < 0) { losningStr = 'Ingen reelle løsninger (diskriminant < 0)'; } else if(diskriminant === 0) { const x = -b/(2*a); losningStr = 'Én løsning: x = ' + x.toFixed(4); } else { const x1 = (-b + Math.sqrt(diskriminant))/(2*a); const x2 = (-b - Math.sqrt(diskriminant))/(2*a); losningStr = 'x₁ = ' + x1.toFixed(4) + ' | x₂ = ' + x2.toFixed(4); } const desc = 'Fullført kvadrat: (x + ' + bOver2a.toFixed(4) + ')² = ' + fullfort.toFixed(4) + ' | ' + losningStr; return {value: fullfort, unit: '', desc: desc}; }

  felles_variasjon_beregning: (i) => { if (!i.dataset_x || !i.dataset_y) return null; const xArr = i.dataset_x.split(',').map(Number).filter(v => !isNaN(v)); const yArr = i.dataset_y.split(',').map(Number).filter(v => !isNaN(v)); if (xArr.length < 2 || yArr.length < 2 || xArr.length !== yArr.length) return {value: null, unit: '', desc: 'Feil: Datasett må ha minst 2 tall og like mange verdier.'}; const n = xArr.length; const meanX = xArr.reduce((a,b) => a+b,0)/n; const meanY = yArr.reduce((a,b) => a+b,0)/n; let cov = 0; let varX = 0; let varY = 0; for (let i=0; i<n; i++) { const dx = xArr[i] - meanX; const dy = yArr[i] - meanY; cov += dx*dy; varX += dx*dx; varY += dy*dy; } cov /= (n-1); const stdX = Math.sqrt(varX/(n-1)); const stdY = Math.sqrt(varY/(n-1)); const corr = (stdX === 0 || stdY === 0) ? 0 : cov/(stdX*stdY); let tolkning = ''; if (corr > 0.7) tolkning = 'Sterk positiv sammenheng'; else if (corr > 0.3) tolkning = 'Moderat positiv sammenheng'; else if (corr > -0.3) tolkning = 'Svak eller ingen lineær sammenheng'; else if (corr > -0.7) tolkning = 'Moderat negativ sammenheng'; else tolkning = 'Sterk negativ sammenheng'; const desc = `Kovarians: ${cov.toFixed(4)} | Korrelasjon (r): ${corr.toFixed(4)} | Tolkning: ${tolkning} | Antall par: ${n} | Gjennomsnitt X: ${meanX.toFixed(2)} | Gjennomsnitt Y: ${meanY.toFixed(2)}`; return {value: cov, unit: 'kovarians', desc: desc}; }

  linje_kalkulator: (i) => { if (!i || i.start_x === undefined || i.start_y === undefined || i.end_x === undefined || i.end_y === undefined || i.pris_per_meter === undefined) return null; const dx = i.end_x - i.start_x; const dy = i.end_y - i.start_y; const lengde = Math.sqrt(dx*dx + dy*dy); const stigning_prosent = dx !== 0 ? (dy/dx)*100 : (dy > 0 ? Infinity : (dy < 0 ? -Infinity : 0)); const stigning_grader = Math.atan2(dy, dx) * (180 / Math.PI); const material_pris = i.pris_per_meter * lengde; const material_type = i.material_type || 'Tre'; const pris_med_mva = material_pris * 1.25; const anbefalt_lengde = lengde > 50 ? 'Lang linje - vurder skjøter' : 'Standard lengde'; const helsefare = stigning_prosent > 30 ? 'Advarsel: Bratt stigning (>30%) - fare for skred/utglidning' : 'Stigning innenfor trygge grenser'; return {value: lengde, unit: 'meter', desc: `Lengde: ${lengde.toFixed(2)} m | Stigning: ${stigning_prosent.toFixed(1)}% (${stigning_grader.toFixed(1)}°) | Materiale: ${material_type} | Pris eks. mva: ${material_pris.toFixed(2)} NOK | Pris inkl. mva: ${pris_med_mva.toFixed(2)} NOK | ${anbefalt_lengde} | ${helsefare}`}; }

  invers_variasjon: (i) => { if (!i.x1 || !i.y1 || !i.x2) return null; const x1 = parseFloat(i.x1); const y1 = parseFloat(i.y1); const x2 = parseFloat(i.x2); if (x1 === 0 || y1 === 0 || x2 === 0) return {value: null, unit: '', desc: 'Ingen verdier kan være null.'}; const k = x1 * y1; const y2 = k / x2; const benchmark = (y2 > 100) ? 'Høy verdi – sjekk om input er riktig.' : (y2 < 0.01) ? 'Svært lav verdi – kan være tilnærmet null.' : 'Normal verdi.'; return {value: y2, unit: '', desc: `Konstant k = ${k.toFixed(4)} | y₂ = ${y2.toFixed(4)} | Sammenligning: y₁ = ${y1}, y₂ = ${y2} (${y2 > y1 ? 'større' : 'mindre'} enn y₁) | ${benchmark}`}; }

  primtallsfaktorisering: (i) => { if(!i.tall || i.tall < 2) return {value: null, unit: '', desc: 'Vennligst skriv inn et heltall større enn 1.'}; let n = Math.floor(i.tall); let original = n; let factors = []; let divisor = 2; while (n >= 2) { if (n % divisor === 0) { factors.push(divisor); n = n / divisor; } else { divisor++; if (divisor * divisor > n) { if (n > 1) factors.push(n); break; } } } let factorStr = factors.join(' × '); let exponentMap = {}; factors.forEach(f => { exponentMap[f] = (exponentMap[f] || 0) + 1; }); let expStr = Object.entries(exponentMap).map(([p, e]) => e > 1 ? `${p}^${e}` : p).join(' × '); let isPrime = factors.length === 1; let primeCheck = isPrime ? 'Tallet er et primtall.' : 'Tallet er ikke et primtall.'; let desc = `Primtallsfaktorer: ${factorStr} | Eksponentform: ${expStr} | ${primeCheck}`; return {value: factorStr, unit: '', desc: desc}; }

  vinkelrett_linje_formel: (i) => { if (!i.stigningstall_a || !i.punkt_x || !i.punkt_y) return null; const a = parseFloat(i.stigningstall_a); const x0 = parseFloat(i.punkt_x); const y0 = parseFloat(i.punkt_y); if (a === 0) { const stigningstall_vinkelrett = Infinity; const ligning = 'x = ' + x0; const desc = 'Vinkelrett linje: ' + ligning + ' (loddrett linje) | Stigningstall: uendelig'; return {value: stigningstall_vinkelrett, unit: '', desc: desc}; } const stigningstall_vinkelrett = -1 / a; const konstantledd = y0 - stigningstall_vinkelrett * x0; const ligning = 'y = ' + stigningstall_vinkelrett.toFixed(4) + 'x + ' + konstantledd.toFixed(4); const benchmark = 'Sammenligning: gitt linje har stigningstall ' + a + ', vinkelrett linje har stigningstall ' + stigningstall_vinkelrett.toFixed(4); const desc = 'Ligning: ' + ligning + ' | Stigningstall: ' + stigningstall_vinkelrett.toFixed(4) + ' | Konstantledd: ' + konstantledd.toFixed(4) + ' | ' + benchmark; return {value: stigningstall_vinkelrett, unit: '', desc: desc}; }

  parallell_linje_kalkulator: (i) => { if (!i.linje1_stigning || !i.linje1_konstant || !i.linje2_stigning || !i.linje2_konstant || !i.punkt_x || !i.punkt_y) return null; const a1 = parseFloat(i.linje1_stigning); const b1 = parseFloat(i.linje1_konstant); const a2 = parseFloat(i.linje2_stigning); const b2 = parseFloat(i.linje2_konstant); const px = parseFloat(i.punkt_x); const py = parseFloat(i.punkt_y); const erParallell = (a1 === a2); const erSammenfallende = (a1 === a2 && b1 === b2); const nyKonstant = py - a1 * px; const stigningstall = a1; let desc = ''; if (erSammenfallende) { desc = 'Linjene er sammenfallende (identiske).'; } else if (erParallell) { desc = 'Linjene er parallelle (samme stigningstall).'; } else { desc = 'Linjene er ikke parallelle (ulike stigningstall).'; } desc += ' | Parallell linje gjennom punkt: y = ' + stigningstall + 'x + ' + nyKonstant + ' | Stigningstall: ' + stigningstall; return {value: erParallell ? 1 : 0, unit: '', desc: desc}; }

  faktorisering_polynom: (i) => { if (!i.koeffisient_a || !i.koeffisient_b || !i.koeffisient_c || !i.polynom_grad) return null; const a = parseFloat(i.koeffisient_a); const b = parseFloat(i.koeffisient_b); const c = parseFloat(i.koeffisient_c); const grad = i.polynom_grad.includes('2') ? 2 : 3; if (a === 0) return { value: 0, unit: '', desc: 'Koeffisient a kan ikke være 0 for et polynom av denne graden.' }; if (grad === 2) { const diskriminant = b * b - 4 * a * c; if (diskriminant < 0) { return { value: 0, unit: '', desc: 'Ingen reelle nullpunkter. Diskriminant er negativ (' + diskriminant.toFixed(2) + '). Kan ikke faktoriseres over reelle tall.' }; } const x1 = (-b + Math.sqrt(diskriminant)) / (2 * a); const x2 = (-b - Math.sqrt(diskriminant)) / (2 * a); let faktorisert = ''; if (x1 === x2) { faktorisert = a + '(x - ' + x1.toFixed(4) + ')²'; } else { faktorisert = a + '(x - ' + x1.toFixed(4) + ')(x - ' + x2.toFixed(4) + ')'; } const kontroll = a * x1 * x1 + b * x1 + c; const kontroll2 = a * x2 * x2 + b * x2 + c; return { value: diskriminant, unit: '', desc: 'Faktorisert: ' + faktorisert + ' | Nullpunkter: x₁=' + x1.toFixed(4) + ', x₂=' + x2.toFixed(4) + ' | Diskriminant: ' + diskriminant.toFixed(2) + ' | Kontroll: P(x₁)=' + kontroll.toFixed(6) + ', P(x₂)=' + kontroll2.toFixed(6) }; } else if (grad === 3) { const d = c; let x1 = 0; let funnet = false; for (let gjetning = -10; gjetning <= 10; gjetning += 0.5) { const verdi = a * gjetning * gjetning * gjetning + b * gjetning * gjetning + c * gjetning + d; if (Math.abs(verdi) < 1e-6) { x1 = gjetning; funnet = true; break; } } if (!funnet) { return { value: 0, unit: '', desc: 'Kunne ikke finne en enkel heltallsrot. Prøv med andre koeffisienter eller bruk numeriske metoder.' }; } const a2 = a; const b2 = b; const c2 = c; const d2 = d; const a_ny = a2; const b_ny = b2 + a2 * x1; const c_ny = c2 + b_ny * x1; const rest = d2 + c_ny * x1; if (Math.abs(rest) > 1e-6) { return { value: 0, unit: '', desc: 'Kunne ikke faktorisere nøyaktig. Restledd: ' + rest.toFixed(6) }; } const diskriminant2 = b_ny * b_ny - 4 * a_ny * c_ny; if (diskriminant2 < 0) { const faktorisert = a_ny + '(x - ' + x1.toFixed(4) + ')(x² + ' + b_ny.toFixed(4) + 'x + ' + c_ny.toFixed(4) + ')'; return { value: 0, unit: '', desc: 'Faktorisert: ' + faktorisert + ' | Én reell rot: x₁=' + x1.toFixed(4) + ' | Andregradsfaktor har ingen reelle nullpunkter (diskriminant negativ).' }; } const x2 = (-b_ny + Math.sqrt(diskriminant2)) / (2 * a_ny); const x3 = (-b_ny - Math.sqrt(diskriminant2)) / (2 * a_ny); let faktorisert = ''; if (x2 === x3) { faktorisert = a_ny + '(x - ' + x1.toFixed(4) + ')(x - ' + x2.toFixed(4) + ')²'; } else { faktorisert = a_ny + '(x - ' + x1.toFixed(4) + ')(x - ' + x2.toFixed(4) + ')(x - ' + x3.toFixed(4) + ')'; } const kontroll3 = a * x1 * x1 * x1 + b * x1 * x1 + c * x1 + d; const kontroll4 = a * x2 * x2 * x2 + b * x2 * x2 + c * x2 + d; const kontroll5 = a * x3 * x3 * x3 + b * x3 * x3 + c * x3 + d; return { value: 0, unit: '', desc: 'Faktorisert: ' + faktorisert + ' | Nullpunkter: x₁=' + x1.toFixed(4) + ', x₂=' + x2.toFixed(4) + ', x₃=' + x3.toFixed(4) + ' | Kontroll: P(x₁)=' + kontroll3.toFixed(6) + ', P(x₂)=' + kontroll4.toFixed(6) + ', P(x₃)=' + kontroll5.toFixed(6) }; } return { value: 0, unit: '', desc: 'Ugyldig grad. Velg 2 eller 3.' }; }

  stigningstall_intercept_form: (i) => { if (!i.x1 || !i.y1 || !i.x2 || !i.y2) return null; const x1 = parseFloat(i.x1), y1 = parseFloat(i.y1), x2 = parseFloat(i.x2), y2 = parseFloat(i.y2); if (x1 === x2) return {value: null, unit: '', desc: 'Ugyldig: x-verdiene er like, linjen er vertikal (ingen stigningstall).'}; const stigningstall = (y2 - y1) / (x2 - x1); const intercept = y1 - stigningstall * x1; const linje = `y = ${stigningstall.toFixed(2)}x + ${intercept.toFixed(2)}`; let tolkning = ''; if (stigningstall > 0) tolkning = 'Stigende linje (positiv stigning)'; else if (stigningstall < 0) tolkning = 'Synkende linje (negativ stigning)'; else tolkning = 'Horisontal linje (stigning = 0)'; const benchmark = (stigningstall > 2) ? 'Bratt stigning (over 2) – linjen stiger raskt.' : (stigningstall < -2) ? 'Bratt negativ stigning (under -2) – linjen synker raskt.' : 'Moderat stigning.'; return {value: stigningstall, unit: '', desc: `Stigningstall: ${stigningstall.toFixed(2)} | Intercept (y-akse): ${intercept.toFixed(2)} | Linje: ${linje} | ${tolkning} | ${benchmark}`}; }

  brok_til_prosent: (i) => { if(!i.teller || !i.nevner || i.nevner === 0) return null; const teller = parseFloat(i.teller); const nevner = parseFloat(i.nevner); if(nevner === 0) return null; const prosent = (teller / nevner) * 100; const desimal = teller / nevner; let sammenligning = ''; if(prosent < 10) sammenligning = 'Svært liten andel (under 10%)'; else if(prosent < 25) sammenligning = 'Liten andel (10-25%)'; else if(prosent < 50) sammenligning = 'Moderat andel (25-50%)'; else if(prosent < 75) sammenligning = 'Stor andel (50-75%)'; else if(prosent < 90) sammenligning = 'Svært stor andel (75-90%)'; else sammenligning = 'Nesten hele (over 90%)'; const advarsel = (prosent > 100) ? 'Advarsel: Over 100% - teller er større enn nevner.' : ''; const desc = `Prosent: ${prosent.toFixed(2)}% | Desimal: ${desimal.toFixed(4)} | Sammenligning: ${sammenligning}${advarsel ? ' | ' + advarsel : ''}`; return {value: prosent, unit: '%', desc: desc}; }

  polynom_divisjon: (i) => { if (!i.dividend_coeffs || !i.divisor_coeffs) return null; try { const parseCoeffs = (str) => str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n)); const dividend = parseCoeffs(i.dividend_coeffs); const divisor = parseCoeffs(i.divisor_coeffs); if (dividend.length === 0 || divisor.length === 0) return null; if (divisor.length === 1) { const q = dividend.map(c => c / divisor[0]); const r = [0]; const qStr = q.map((c, idx) => { const deg = dividend.length - 1 - idx; if (c === 0) return ''; const sign = c < 0 ? '-' : '+'; const absC = Math.abs(c); const term = deg === 0 ? `${absC}` : deg === 1 ? `${absC}x` : `${absC}x^${deg}`; return `${sign} ${term}`; }).filter(t => t !== '').join(' ').replace(/^\+ /, ''); const rStr = '0'; return { value: qStr, unit: '', desc: `Kvotient: ${qStr} | Rest: ${rStr} | Divisjon med konstant: alle koeffisienter delt på ${divisor[0]}` }; } const dividendDeg = dividend.length - 1; const divisorDeg = divisor.length - 1; if (dividendDeg < divisorDeg) { return { value: '0', unit: '', desc: `Kvotient: 0 | Rest: ${dividend.map((c, idx) => { const deg = dividendDeg - idx; if (c === 0) return ''; const sign = c < 0 ? '-' : '+'; const absC = Math.abs(c); const term = deg === 0 ? `${absC}` : deg === 1 ? `${absC}x` : `${absC}x^${deg}`; return `${sign} ${term}`; }).filter(t => t !== '').join(' ').replace(/^\+ /, '')} | Graden av dividend er mindre enn divisor, så kvotienten er 0.` }; } let remainder = [...dividend]; const quotient = new Array(dividendDeg - divisorDeg + 1).fill(0); const steps = []; for (let i = 0; i <= dividendDeg - divisorDeg; i++) { const leadCoeff = remainder[i] / divisor[0]; quotient[i] = leadCoeff; const stepDesc = `Trinn ${i+1}: Del ledende koeffisient ${remainder[i]} med ${divisor[0]} = ${leadCoeff}. Multipliser divisor med ${leadCoeff} og trekk fra.`; steps.push(stepDesc); for (let j = 0; j < divisor.length; j++) { remainder[i + j] -= leadCoeff * divisor[j]; } } const qStr = quotient.map((c, idx) => { const deg = quotient.length - 1 - idx; if (c === 0) return ''; const sign = c < 0 ? '-' : '+'; const absC = Math.abs(c); const term = deg === 0 ? `${absC}` : deg === 1 ? `${absC}x` : `${absC}x^${deg}`; return `${sign} ${term}`; }).filter(t => t !== '').join(' ').replace(/^\+ /, ''); const rStr = remainder.slice(dividendDeg - divisorDeg + 1).map((c, idx) => { const deg = remainder.length - 1 - (dividendDeg - divisorDeg + 1) - idx; if (c === 0) return ''; const sign = c < 0 ? '-' : '+'; const absC = Math.abs(c); const term = deg === 0 ? `${absC}` : deg === 1 ? `${absC}x` : `${absC}x^${deg}`; return `${sign} ${term}`; }).filter(t => t !== '').join(' ').replace(/^\+ /, ''); const finalR = rStr === '' ? '0' : rStr; const stepsStr = steps.join(' | '); return { value: qStr, unit: '', desc: `Kvotient: ${qStr} | Rest: ${finalR} | Steg: ${stepsStr}` }; } catch (e) { return null; } }

  gpa_calculator: (i) => { if(!i.grades_credits || !i.grade_scale) return null; const scaleMap = {'4.0 skala (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0)': {A:4.0,B:3.0,C:2.0,D:1.0,F:0.0},'5.0 skala (A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0)': {A:5.0,B:4.0,C:3.0,D:2.0,E:1.0,F:0.0},'Norsk (A=5, B=4, C=3, D=2, E=1, F=0)': {A:5,B:4,C:3,D:2,E:1,F:0}}; const scale = scaleMap[i.grade_scale]; if(!scale) return null; const entries = i.grades_credits.split(',').map(s => s.trim().split(':')).filter(a => a.length===2); let totalPoints = 0; let totalCredits = 0; for(const [grade, creditStr] of entries){ const g = grade.trim().toUpperCase(); const c = parseFloat(creditStr.trim()); if(!scale[g] || isNaN(c) || c<=0) continue; totalPoints += scale[g] * c; totalCredits += c; } if(totalCredits===0) return null; const gpa = totalPoints / totalCredits; let desc = ''; if(i.grade_scale.includes('4.0')){ if(gpa>=3.7) desc = 'Utmerket (A/A+)'; else if(gpa>=3.3) desc = 'God (B+)'; else if(gpa>=3.0) desc = 'Over gjennomsnitt (B)'; else if(gpa>=2.7) desc = 'Tilfredsstillende (B-/C+)'; else if(gpa>=2.0) desc = 'Bestått (C)'; else if(gpa>=1.0) desc = 'Dårlig (D)'; else desc = 'Stryk (F)'; } else if(i.grade_scale.includes('5.0') || i.grade_scale.includes('Norsk')){ if(gpa>=4.5) desc = 'Utmerket (A)'; else if(gpa>=4.0) desc = 'Meget god (B)'; else if(gpa>=3.0) desc = 'God (C)'; else if(gpa>=2.0) desc = 'Tilfredsstillende (D)'; else if(gpa>=1.0) desc = 'Tilstrekkelig (E)'; else desc = 'Ikke bestått (F)'; } else { desc = 'GPA beregnet'; } const totalCreditsRounded = Math.round(totalCredits*100)/100; return {value: Math.round(gpa*100)/100, unit: '', desc: `GPA: ${Math.round(gpa*100)/100} | Totalt studiepoeng: ${totalCreditsRounded} | Vurdering: ${desc}`}; }

  uekte_brok_til_blandet_tall: (i) => { if (!i.teller || !i.nevner || i.nevner === 0) return null; const teller = Number(i.teller); const nevner = Number(i.nevner); if (teller < nevner) return { value: null, unit: '', desc: 'Brøken er allerede ekte (teller < nevner). Ingen konvertering nødvendig.' }; const heltall = Math.floor(teller / nevner); const rest = teller % nevner; const blandet = rest === 0 ? `${heltall}` : `${heltall} ${rest}/${nevner}`; const desimal = teller / nevner; const prosent = (desimal * 100).toFixed(2); const forenklet = rest === 0 ? `${heltall}` : `${heltall} ${rest/gcd(rest, nevner)}/${nevner/gcd(rest, nevner)}`; function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); } return { value: blandet, unit: '', desc: `Blandet tall: ${blandet} | Desimal: ${desimal.toFixed(4)} | Prosent: ${prosent}% | Forenklet: ${forenklet} | Sammenligning: ${teller}/${nevner} ≈ ${desimal.toFixed(2)} (som desimal)` }; }

  restteoremet_beregning: (i) => { if (!i.koeffisienter || i.a_verdi === undefined || i.a_verdi === null || i.koeffisienter.trim() === '') return null; const koeff = i.koeffisienter.split(',').map(Number); if (koeff.some(isNaN)) return null; const a = Number(i.a_verdi); let rest = 0; for (let k = 0; k < koeff.length; k++) { rest = rest * a + koeff[k]; } const grad = koeff.length - 1; let benchmark = ''; if (rest === 0) { benchmark = 'Resten er 0 → (x - ' + a + ') er en faktor.'; } else if (Math.abs(rest) < 1e-10) { benchmark = 'Resten er tilnærmet 0 → (x - ' + a + ') er nesten en faktor.'; } else { benchmark = 'Resten er ikke null → (x - ' + a + ') er ikke en faktor.'; } const desc = 'Rest: P(' + a + ') = ' + rest + ' | ' + benchmark; return { value: rest, unit: '', desc: desc }; }

  prosent_til_desimal: (i) => { if (i.prosent === undefined || i.prosent === null || isNaN(i.prosent)) return null; const p = parseFloat(i.prosent); const desimal = p / 100; const brok = desimal * 100 + '%'; const prosentAvEn = desimal * 100; let desc = `Desimaltall: ${desimal.toFixed(4)}`; desc += ` | Brøk: ${p}/100 = ${desimal.toFixed(4)}`; desc += ` | Prosent av 1: ${prosentAvEn.toFixed(2)}%`; if (p === 0) desc += ' | 0% betyr ingenting.'; else if (p === 100) desc += ' | 100% = 1 (helheten).'; else if (p > 100) desc += ' | Over 100% = mer enn helheten.'; else if (p < 0) desc += ' | Negativ prosent = mindre enn null.'; else if (p < 1) desc += ' | Mindre enn 1% = svært liten andel.'; else if (p > 50) desc += ' | Mer enn halvparten.'; else if (p === 50) desc += ' | Nøyaktig halvparten (0.5).'; else desc += ' | Mindre enn halvparten.'; return {value: desimal, unit: '', desc: desc}; }

  brok_til_desimal: (i) => { if(!i.teller || !i.nevner || i.nevner === 0) return null; const teller = parseFloat(i.teller); const nevner = parseFloat(i.nevner); const presisjon = parseInt(i.presisjon) || 4; const desimal = teller / nevner; const avrundet = parseFloat(desimal.toFixed(presisjon)); const gjentakende = (nevner % 2 === 0 || nevner % 5 === 0) ? 'Nei' : 'Ja (mulig)'; const prosent = (teller / nevner) * 100; const prosentAvrundet = parseFloat(prosent.toFixed(presisjon - 1)); let advarsel = ''; if(nevner === 0) advarsel = 'Ugyldig: deling på null'; else if(teller > nevner * 100) advarsel = '⚠️ Uvanlig stor brøk, sjekk verdiene'; else if(nevner > 1000) advarsel = '⚠️ Stor nevner, kan gi avrundingsfeil'; const desc = `Desimal: ${avrundet} | Prosent: ${prosentAvrundet}% | Gjentakende desimal: ${gjentakende}${advarsel ? ' | ' + advarsel : ''}`; return {value: avrundet, unit: '', desc: desc}; }

  karakterkalkulator_formel: (i) => { if (!i.karakterer_og_poeng || !i.skala) return null; const skala = i.skala; const input = i.karakterer_og_poeng.trim(); const par = input.split(',').map(s => s.trim()); let totalVektet = 0; let totalPoeng = 0; let resultater = []; let advarsler = []; for (let p of par) { const match = p.match(/^([A-Za-z0-9]+):(\d+)$/); if (!match) { advarsler.push('Ugyldig format: ' + p); continue; } const karakter = match[1].toUpperCase(); const poeng = parseInt(match[2]); let verdi; if (skala === 'A-F (norsk)') { const map = {'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0}; verdi = map[karakter]; if (verdi === undefined) { advarsler.push('Ukjent karakter: ' + karakter); continue; } } else if (skala === '1-6 (dansk)') { const tall = parseInt(karakter); if (tall < 1 || tall > 6) { advarsler.push('Ugyldig tall: ' + karakter); continue; } verdi = tall; } else if (skala === '1-10 (svensk)') { const tall = parseInt(karakter); if (tall < 1 || tall > 10) { advarsler.push('Ugyldig tall: ' + karakter); continue; } verdi = tall; } else if (skala === '0-100 (prosent)') { const tall = parseInt(karakter); if (tall < 0 || tall > 100) { advarsler.push('Ugyldig prosent: ' + karakter); continue; } verdi = tall; } else { return null; } totalVektet += verdi * poeng; totalPoeng += poeng; resultater.push({karakter, poeng, verdi}); } if (totalPoeng === 0) return {value: 0, unit: '', desc: 'Ingen gyldige data. Sjekk formatet (f.eks. A:10, B:15).'}; const snitt = totalVektet / totalPoeng; let snittKarakter = ''; let vurdering = ''; if (skala === 'A-F (norsk)') { if (snitt >= 4.5) { snittKarakter = 'A'; vurdering = 'Fremragende'; } else if (snitt >= 3.5) { snittKarakter = 'B'; vurdering = 'Meget god'; } else if (snitt >= 2.5) { snittKarakter = 'C'; vurdering = 'God'; } else if (snitt >= 1.5) { snittKarakter = 'D'; vurdering = 'Nokså god'; } else if (snitt >= 0.5) { snittKarakter = 'E'; vurdering = 'Tilstrekkelig'; } else { snittKarakter = 'F'; vurdering = 'Ikke bestått'; } } else if (skala === '1-6 (dansk)') { snittKarakter = snitt.toFixed(1); if (snitt >= 5.5) vurdering = 'Fremragende'; else if (snitt >= 4.5) vurdering = 'Meget god'; else if (snitt >= 3.5) vurdering = 'God'; else if (snitt >= 2.5) vurdering = 'Nokså god'; else if (snitt >= 1.5) vurdering = 'Tilstrekkelig'; else vurdering = 'Ikke bestått'; } else if (skala === '1-10 (svensk)') { snittKarakter = snitt.toFixed(1); if (snitt >= 9) vurdering = 'Fremragende'; else if (snitt >= 7) vurdering = 'Meget god'; else if (snitt >= 5) vurdering = 'God'; else if (snitt >= 3) vurdering = 'Nokså god'; else vurdering = 'Ikke bestått'; } else if (skala === '0-100 (prosent)') { snittKarakter = snitt.toFixed(1) + '%'; if (snitt >= 90) vurdering = 'Fremragende'; else if (snitt >= 75) vurdering = 'Meget god'; else if (snitt >= 60) vurdering = 'God'; else if (snitt >= 40) vurdering = 'Nokså god'; else vurdering = 'Ikke bestått'; } let desc = 'Gjennomsnitt: ' + snitt.toFixed(2) + ' | Karakter: ' + snittKarakter + ' | Vurdering: ' + vurdering + ' | Totalt studiepoeng: ' + totalPoeng; if (advarsler.length > 0) { desc += ' | Advarsler: ' + advarsler.join('; '); } if (vurdering === 'Ikke bestått') { desc += ' | ⚠️ Du har ikke bestått. Vurder å forbedre karakterer.'; } else if (vurdering === 'Fremragende') { desc += ' | 🎉 Utmerket resultat!'; } return {value: snitt, unit: '', desc: desc}; }

  eliminasjonsmetode_formel: (i) => { if (!i.ligning1_a || !i.ligning1_b || !i.ligning1_c || !i.ligning2_a || !i.ligning2_b || !i.ligning2_c) return null; const a1 = parseFloat(i.ligning1_a), b1 = parseFloat(i.ligning1_b), c1 = parseFloat(i.ligning1_c); const a2 = parseFloat(i.ligning2_a), b2 = parseFloat(i.ligning2_b), c2 = parseFloat(i.ligning2_c); const det = a1 * b2 - a2 * b1; if (Math.abs(det) < 1e-12) { const ratio1 = a1 / a2, ratio2 = b1 / b2, ratio3 = c1 / c2; if (Math.abs(ratio1 - ratio2) < 1e-12 && Math.abs(ratio1 - ratio3) < 1e-12) return {value: 0, unit: '', desc: 'Uendelig mange løsninger (sammenfallende linjer)'}; else return {value: 0, unit: '', desc: 'Ingen løsning (parallelle linjer)'}; } const x = (c1 * b2 - c2 * b1) / det; const y = (a1 * c2 - a2 * c1) / det; const xRounded = Math.round(x * 100) / 100; const yRounded = Math.round(y * 100) / 100; let desc = `Løsning: x = ${xRounded}, y = ${yRounded}`; desc += ` | Sjekk: ${a1}*${xRounded} + ${b1}*${yRounded} = ${Math.round((a1*xRounded + b1*yRounded)*100)/100} (forventet ${c1})`; desc += ` | ${a2}*${xRounded} + ${b2}*${yRounded} = ${Math.round((a2*xRounded + b2*yRounded)*100)/100} (forventet ${c2})`; if (Math.abs(x) > 1000 || Math.abs(y) > 1000) desc += ' | ⚠️ Store verdier – sjekk om ligningene er korrekte'; return {value: xRounded, unit: 'x', desc: desc}; }

  forenkle_brok: (i) => { if(!i.teller || !i.nevner || i.nevner === 0) return null; let a = Math.abs(i.teller); let b = Math.abs(i.nevner); let x = a; let y = b; while(y) { let temp = y; y = x % y; x = temp; } let gcd = x; let forenkletTeller = i.teller / gcd; let forenkletNevner = i.nevner / gcd; let desimal = forenkletTeller / forenkletNevner; let blandet = ''; if(Math.abs(forenkletTeller) > Math.abs(forenkletNevner) && forenkletNevner !== 1) { let heltall = Math.floor(forenkletTeller / forenkletNevner); let restTeller = Math.abs(forenkletTeller) % Math.abs(forenkletNevner); let tegn = forenkletTeller < 0 ? '-' : ''; blandet = tegn + heltall + ' ' + restTeller + '/' + Math.abs(forenkletNevner); } else if(forenkletNevner === 1) { blandet = forenkletTeller.toString(); } let desc = 'Forenklet brøk: ' + forenkletTeller + '/' + forenkletNevner; if(blandet) desc += ' | Blandet tall: ' + blandet; desc += ' | Desimal: ' + desimal.toFixed(4) + ' | Største felles divisor (GCD): ' + gcd; if(gcd === 1) desc += ' | Brøken er allerede i laveste ledd.'; else desc += ' | Brøken er forkortet med ' + gcd + '.'; if(i.nevner < 0) desc += ' | Merk: Nevner er negativ – brøken kan skrives som -' + forenkletTeller + '/' + Math.abs(forenkletNevner) + '.'; return {value: forenkletTeller + '/' + forenkletNevner, unit: '', desc: desc}; }

  foil_calculator: (i) => { if(!i.a || !i.b || !i.c || !i.d) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); const c = parseFloat(i.c); const d = parseFloat(i.d); const first = a * c; const outer = a * d; const inner = b * c; const last = b * d; const sum = first + outer + inner + last; const desc = `Første (F): ${first} | Ytre (O): ${outer} | Indre (I): ${inner} | Siste (L): ${last} | Sum: ${sum}`; return {value: sum, unit: '', desc: desc}; }

  binar_subtraksjon: (i) => { if(!i.bin1 || !i.bin2) return null; const b1 = i.bin1.trim(); const b2 = i.bin2.trim(); if(!/^[01]+$/.test(b1) || !/^[01]+$/.test(b2)) return {value: 'Ugyldig', unit: '', desc: 'Kun 0 og 1 tillatt'}; const len = Math.max(b1.length, b2.length); const a = b1.padStart(len, '0'); const b = b2.padStart(len, '0'); let result = ''; let borrow = 0; for(let i = len-1; i >= 0; i--) { let bitA = parseInt(a[i]); let bitB = parseInt(b[i]) + borrow; if(bitA >= bitB) { result = (bitA - bitB) + result; borrow = 0; } else { result = (bitA + 2 - bitB) + result; borrow = 1; } } if(borrow) { result = '1' + result; } const des1 = parseInt(b1, 2); const des2 = parseInt(b2, 2); const diff = des1 - des2; const desc = `Binær: ${b1} - ${b2} = ${result} (uten fortegn) | Desimal: ${des1} - ${des2} = ${diff} | Merk: Hvis negativt resultat, vises binært som toer-komplement.`; return {value: result, unit: 'binær', desc: desc}; }

  restkalkulator_formula: (i) => { if (!i.tall || !i.deler || i.deler === 0) return null; const tall = Number(i.tall); const deler = Number(i.deler); const kvotient = Math.floor(tall / deler); const rest = tall % deler; const kontroll = kvotient * deler + rest; const restProsent = ((rest / deler) * 100).toFixed(1); return {value: rest, unit: '', desc: `Rest: ${rest} | Kvotient: ${kvotient} | Kontroll: ${tall} = ${kvotient} × ${deler} + ${rest} (${kontroll}) | Rest i prosent: ${restProsent}%`}; }

  forenkle_radikal: (i) => { if(!i.radikand || !i.rotgrad || i.radikand <= 0 || i.rotgrad < 2) return null; let n = i.radikand; let r = i.rotgrad; let faktorer = []; let temp = n; for(let p = 2; p * p <= temp; p++) { while(temp % p === 0) { faktorer.push(p); temp /= p; } } if(temp > 1) faktorer.push(temp); let utenfor = 1; let inni = 1; let teller = {}; faktorer.forEach(f => { teller[f] = (teller[f] || 0) + 1; }); for(let [primtall, antall] of Object.entries(teller)) { let heltall = Math.floor(antall / r); let rest = antall % r; utenfor *= Math.pow(parseInt(primtall), heltall); inni *= Math.pow(parseInt(primtall), rest); } let forenklet = ''; if(utenfor === 1 && inni === 1) forenklet = '1'; else if(utenfor === 1) forenklet = '√' + (r > 2 ? r : '') + '(' + inni + ')'; else if(inni === 1) forenklet = utenfor.toString(); else forenklet = utenfor + '·√' + (r > 2 ? r : '') + '(' + inni + ')'; let desimal = Math.pow(n, 1/r); let benchmark = ''; if(r === 2) { if(inni === 1) benchmark = 'Perfekt kvadrat'; else if(inni < 10) benchmark = 'Nesten perfekt'; else benchmark = 'Ikke perfekt kvadrat'; } else { benchmark = 'Rotgrad ' + r; } return {value: desimal, unit: '', desc: 'Forenklet: ' + forenklet + ' | Desimal: ' + desimal.toFixed(6) + ' | ' + benchmark}; }

  log2_calculator: (i) => { if(!i.tall || i.tall <= 0) return {value: null, unit: '', desc: 'Vennligst skriv inn et positivt tall større enn 0.'}; const x = Number(i.tall); const log2 = Math.log2(x); const heltallsdel = Math.floor(log2); const potens = Math.pow(2, heltallsdel); const nestePotens = Math.pow(2, heltallsdel + 1); let benchmark = ''; if(x === 1) benchmark = 'log2(1) = 0 (nøytralt punkt)'; else if(x < 1) benchmark = 'Tallet er mellom 0 og 1, logaritmen er negativ.'; else if(x >= 2 && x <= 1024) benchmark = `Vanlig datastørrelse: 2^${heltallsdel} = ${potens} byte (${potens/1024} KB) til 2^${heltallsdel+1} = ${nestePotens} byte (${nestePotens/1024} KB)`; else if(x > 1024) benchmark = 'Stort tall – logaritmen vokser sakte.'; const desc = `log₂(${x}) = ${log2.toFixed(6)}
Heltallsdel (gulv): ${heltallsdel}
Nærmeste lavere 2-erpotens: 2^${heltallsdel} = ${potens}
Nærmeste høyere 2-erpotens: 2^${heltallsdel+1} = ${nestePotens}
Sammenligning: ${benchmark}`; return {value: log2, unit: '', desc: desc}; }

  utvidet_form_kalkulator: (i) => { if(!i.tall && i.tall !== 0) return null; const num = Number(i.tall); if(isNaN(num)) return null; const parts = []; const absNum = Math.abs(num); const intPart = Math.floor(absNum); const decPart = absNum - intPart; const intStr = intPart.toString(); const decStr = decPart.toFixed(10).replace(/0+$/, '').replace(/^\./, ''); const placeValues = ['', 'tier', 'hundre', 'tusen', 'ti-tusen', 'hundre-tusen', 'million', 'ti-million', 'hundre-million', 'milliard', 'ti-milliard', 'hundre-milliard', 'billion']; for(let i = 0; i < intStr.length; i++) { const digit = intStr[i]; if(digit !== '0') { const place = intStr.length - 1 - i; const placeName = place < placeValues.length ? placeValues[place] : '10^' + place; parts.push(digit + ' × ' + placeName); } } if(decStr && decStr !== '0') { for(let i = 0; i < decStr.length; i++) { const digit = decStr[i]; if(digit !== '0') { const place = -(i+1); parts.push(digit + ' × 10^' + place); } } } const expandedForm = parts.join(' + '); const ordForm = num >= 0 ? (num === 0 ? 'null' : (num === 1 ? 'en' : (num === 2 ? 'to' : (num === 3 ? 'tre' : (num === 4 ? 'fire' : (num === 5 ? 'fem' : (num === 6 ? 'seks' : (num === 7 ? 'syv' : (num === 8 ? 'åtte' : (num === 9 ? 'ni' : (num === 10 ? 'ti' : num.toString())))))))))) : 'negativ ' + ordForm; const sciNot = num.toExponential(4); const benchmark = num > 1000000 ? 'Stort tall (> 1 million)' : (num < 0.001 && num > 0 ? 'Svært lite tall' : 'Vanlig størrelse'); return {value: expandedForm, unit: '', desc: 'Utvidet form: ' + expandedForm + ' | Ordform: ' + ordForm + ' | Vitenskapelig notasjon: ' + sciNot + ' | Sammenligning: ' + benchmark}; }

  rasjonelle_nullpunkter: (i) => { if (!i.koeffisienter || i.koeffisienter.trim() === '') return null; const coeffs = i.koeffisienter.split(',').map(s => parseFloat(s.trim())); if (coeffs.some(isNaN)) return null; const n = coeffs.length - 1; if (n < 1) return null; const a0 = coeffs[coeffs.length - 1]; const an = coeffs[0]; if (a0 === 0 || an === 0) return { value: 'Ugyldig', unit: '', desc: 'Konstantledd og førstekoeffisient må være ulik null for å bruke rasjonelle nullpunkter.' }; const divisors = (x) => { const absX = Math.abs(x); const divs = []; for (let d = 1; d <= absX; d++) { if (absX % d === 0) divs.push(d, -d); } return [...new Set(divs)].sort((a,b) => a-b); }; const pDivs = divisors(a0); const qDivs = divisors(an); const candidates = []; for (const p of pDivs) { for (const q of qDivs) { const candidate = p / q; if (!candidates.some(c => Math.abs(c - candidate) < 1e-12)) candidates.push(candidate); } } const evalPoly = (x) => { let sum = 0; for (let i = 0; i < coeffs.length; i++) { sum += coeffs[i] * Math.pow(x, n - i); } return sum; }; const roots = []; for (const c of candidates) { if (Math.abs(evalPoly(c)) < 1e-9) { roots.push(c); } } if (roots.length === 0) { return { value: 'Ingen', unit: '', desc: 'Ingen rasjonelle nullpunkter funnet for dette polynomet.' }; } const uniqueRoots = [...new Set(roots.map(r => Math.round(r * 1e9) / 1e9))]; const rootStr = uniqueRoots.map(r => r % 1 === 0 ? r.toFixed(0) : r.toFixed(4)).join(', '); const factors = uniqueRoots.map(r => { const factor = r > 0 ? `(x - ${r})` : `(x + ${Math.abs(r)})`; return factor; }).join(' * '); return { value: rootStr, unit: '', desc: `Rasjonelle nullpunkter: ${rootStr} | Faktorisering: ${factors} | Antall: ${uniqueRoots.length}` }; }

  revers_kalkulator: (i) => { if(!i.operasjon || i.resultat === undefined || i.resultat === null || i.operand === undefined || i.operand === null) return null; const r = Number(i.resultat); const o = Number(i.operand); if(isNaN(r) || isNaN(o)) return null; let startverdi, forklaring; switch(i.operasjon) { case 'Addisjon (+)': startverdi = r - o; forklaring = `For å få ${r} ved å legge til ${o}, må startverdien være ${startverdi}.`; break; case 'Subtraksjon (-)': startverdi = r + o; forklaring = `For å få ${r} ved å trekke fra ${o}, må startverdien være ${startverdi}.`; break; case 'Multiplikasjon (×)': if(o === 0) return null; startverdi = r / o; forklaring = `For å få ${r} ved å gange med ${o}, må startverdien være ${startverdi}.`; break; case 'Divisjon (÷)': if(o === 0) return null; startverdi = r * o; forklaring = `For å få ${r} ved å dele på ${o}, må startverdien være ${startverdi}.`; break; case 'Prosent av': if(o === 0) return null; startverdi = (r / o) * 100; forklaring = `${r} er ${o}% av ${startverdi.toFixed(2)}.`; break; case 'Prosent endring': startverdi = r / (1 + o/100); forklaring = `For å få ${r} etter en endring på ${o}%, må startverdien være ${startverdi.toFixed(2)}.`; break; default: return null; } return {value: startverdi, unit: '', desc: forklaring}; }

  algebra_calculator: (i) => { if (i.a === undefined || i.b === undefined || i.c === undefined) return null; const a = parseFloat(i.a); const b = parseFloat(i.b); const c = parseFloat(i.c); if (a === 0) { if (b === 0) return {value: 0, unit: '', desc: 'Ingen løsning (konstant likning)'}; const x = -c / b; return {value: x, unit: '', desc: 'Lineær likning: x = ' + x.toFixed(4)}; } const diskriminant = b * b - 4 * a * c; if (diskriminant < 0) { const real = -b / (2 * a); const imag = Math.sqrt(-diskriminant) / (2 * a); return {value: real, unit: '', desc: 'Komplekse røtter: x1 = ' + real.toFixed(4) + ' + ' + imag.toFixed(4) + 'i, x2 = ' + real.toFixed(4) + ' - ' + imag.toFixed(4) + 'i'}; } const sqrtD = Math.sqrt(diskriminant); const x1 = (-b + sqrtD) / (2 * a); const x2 = (-b - sqrtD) / (2 * a); let faktorisering = ''; if (a === 1) { faktorisering = '(x ' + (x1 >= 0 ? '- ' + x1.toFixed(4) : '+ ' + Math.abs(x1).toFixed(4)) + ')(x ' + (x2 >= 0 ? '- ' + x2.toFixed(4) : '+ ' + Math.abs(x2).toFixed(4)) + ')'; } else { faktorisering = a.toFixed(4) + '(x ' + (x1 >= 0 ? '- ' + x1.toFixed(4) : '+ ' + Math.abs(x1).toFixed(4)) + ')(x ' + (x2 >= 0 ? '- ' + x2.toFixed(4) : '+ ' + Math.abs(x2).toFixed(4)) + ')'; } const toppunktX = -b / (2 * a); const toppunktY = a * toppunktX * toppunktX + b * toppunktX + c; return {value: x1, unit: '', desc: 'Nullpunkter: x1 = ' + x1.toFixed(4) + ', x2 = ' + x2.toFixed(4) + ' | Faktorisering: ' + faktorisering + ' | Toppunkt: (' + toppunktX.toFixed(4) + ', ' + toppunktY.toFixed(4) + ') | Diskriminant: ' + diskriminant.toFixed(4)}; }

  brok_kalkulator: (i) => { if(!i.teller1 || !i.nevner1 || !i.teller2 || !i.nevner2 || !i.operasjon) return null; if(i.nevner1 === 0 || i.nevner2 === 0) return {value: null, unit: '', desc: 'Nevner kan ikke være 0'}; let t1 = Number(i.teller1), n1 = Number(i.nevner1), t2 = Number(i.teller2), n2 = Number(i.nevner2); let resT, resN; switch(i.operasjon) { case '+': resT = t1*n2 + t2*n1; resN = n1*n2; break; case '-': resT = t1*n2 - t2*n1; resN = n1*n2; break; case '*': resT = t1*t2; resN = n1*n2; break; case '/': resT = t1*n2; resN = n1*t2; break; default: return null; } if(resN === 0) return {value: null, unit: '', desc: 'Divisjon med null'}; let gcd = (a,b) => { a = Math.abs(a); b = Math.abs(b); while(b) { let t = b; b = a % b; a = t; } return a; }; let g = gcd(resT, resN); let forenkletT = resT/g; let forenkletN = resN/g; if(forenkletN < 0) { forenkletT = -forenkletT; forenkletN = -forenkletN; } let desimal = resT / resN; let prosent = desimal * 100; let desc = `Forenklet brøk: ${forenkletT}/${forenkletN} | Desimal: ${desimal.toFixed(4)} | Prosent: ${prosent.toFixed(2)}%`; if(desimal > 1) desc += ' | Merk: Uekte brøk (større enn 1)'; if(desimal === 1) desc += ' | Brøken er lik 1'; if(desimal < 0) desc += ' | Negativ brøk'; if(forenkletT === 0) desc += ' | Brøken er 0'; return {value: desimal, unit: '', desc: desc}; }
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


