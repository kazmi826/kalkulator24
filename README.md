# 🧮 Norwegian Calculator Site — Cursor AI Guide

## Yeh project kya hai?
Norwegian language mein programmatic SEO calculator site.
- 500+ tools auto-generate honge
- Gemini API se Norwegian content likha jayega
- Ek script se poori site ban jayegi

---

## Folder Structure
```
kalkulator-site/
├── assets/
│   ├── css/style.css          ← Poori site ka design
│   └── js/calc.js             ← Calculator formulas + AI content
├── scripts/
│   ├── tools_database.json    ← 500+ tools ka data (yahan tools add karo)
│   └── generate_site.py       ← Yeh script sab HTML files banati hai
├── tools/                     ← Auto-generated tool pages (touch mat karo)
├── categories/                ← Auto-generated category pages
├── index.html                 ← Homepage (auto-generated)
├── sitemap.xml                ← SEO sitemap (auto-generated)
└── robots.txt                 ← SEO robots file
```

---

## Setup Steps

### Step 1: Python install karo (agar nahi hai)
```bash
python --version
```
Agar nahi hai: https://python.org se install karo

### Step 2: Gemini API Key lo (FREE)
1. https://aistudio.google.com jao
2. "Get API key" click karo
3. Key copy karo

### Step 3: Config file mein key set karo
`scripts/config.json` file kholo aur apni settings dalo:
```json
{
  "site_name": "Kalkulator.no",
  "site_domain": "https://kalkulator.no",
  "gemini_api_key": "APNI_KEY_YAHAN_DALO"
}
```

### Step 4: Site generate karo
```bash
cd scripts
python generate_site.py
```

### Step 5: Naye tools add karne hain?
`scripts/tools_database.json` mein tools add karo phir step 4 dobara karo.

---

## Cursor AI se kaise kaam karo

### Naya tool add karna:
Cursor mein yeh type karo:
> "tools_database.json mein ek naya Norwegian calculator tool add karo for [TOPIC]"

### 500 tools ek saath add karna:
> "tools_database.json mein 500 Norwegian calculator tools add karo — health, finance, math, conversion categories mein"

### Design change karna:
> "assets/css/style.css mein color scheme change karo — blue ki jagah green use karo"

### Naya formula add karna:
> "assets/js/calc.js mein mortgage calculator formula add karo"

### Site deploy karna:
> "Mujhe batao Hostinger par yeh site kaise upload karein"

---

## Monetization Plan
1. Google AdSense apply karo jab 50+ pages hon
2. Display ads laga do header/sidebar mein
3. Norway mein RPM $3-8 hota hai (Pakistan se zyada!)

---

## Important Notes
- `tools/` aur `categories/` folders ko manually edit mat karo
- Sirf `tools_database.json` mein tools add karo
- Har baar generate_site.py run karo naye pages ke liye
- `.no` domain lena zaroori hai Norway ranking ke liye
