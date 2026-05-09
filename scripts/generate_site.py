#!/usr/bin/env python3
"""
🚀 Norwegian Calculator Site Generator
Cursor AI se yeh script chalao — poori site generate ho jayegi!

Usage:
  python generate_site.py          # Sab generate karo
  python generate_site.py --new    # Sirf naye tools generate karo
"""

import json, os, sys, re
from datetime import datetime

# ===== CONFIG LOAD =====
with open('config.json', 'r') as f:
    cfg = json.load(f)

SITE_NAME   = cfg['site_name']
SITE_DOMAIN = cfg['site_domain']
API_KEY     = cfg['gemini_api_key']
ADSENSE_ID  = cfg.get('adsense_id', '')

# ===== TOOLS LOAD =====
with open('tools_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

tools      = db['tools']
categories = db['categories']

# Output dirs
for d in ['../tools', '../categories']:
    os.makedirs(d, exist_ok=True)

# ===== ADSENSE CODE =====
def adsense_unit(slot="auto"):
    if not ADSENSE_ID or ADSENSE_ID == 'YOUR_ADSENSE_ID_HERE':
        return '<!-- AdSense: Fill in ADSENSE_ID in config.json -->'
    return f'''<ins class="adsbygoogle" style="display:block" data-ad-client="{ADSENSE_ID}" data-ad-slot="{slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>'''

# ===== NAVBAR =====
def navbar(active=""):
    links = ""
    for slug, cat in categories.items():
        a = 'active' if slug == active else ''
        links += f'<li><a href="/categories/{slug}.html" class="{a}">{cat["icon"]} {cat["name"]}</a></li>'
    return f'''<nav class="navbar">
  <div class="navbar-inner">
    <a href="/" class="logo">{SITE_NAME.replace('.','<span>.')}</span></a>
    <ul id="mobileMenu" class="nav-links" style="display:flex; gap:4px; list-style:none; flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none;">{links}</ul>
    <button id="hamburgerBtn" class="mobile-menu-btn" onclick="toggleMenu()">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>'''

# ===== FOOTER =====
def footer():
    cats = "".join([f'<li><a href="/categories/{s}.html">{c["icon"]} {c["name"]}</a></li>' for s,c in categories.items()])
    pop  = "".join([f'<li><a href="/tools/{t["slug"]}.html">{t["title"]}</a></li>' for t in tools[:6]])
    return f'''<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col"><h4>{SITE_NAME}</h4><p style="font-size:13px;line-height:1.7">Gratis online kalkulatorer for alle behov.</p></div>
      <div class="footer-col"><h4>Kategorier</h4><ul>{cats}</ul></div>
      <div class="footer-col"><h4>Populære</h4><ul>{pop}</ul></div>
      <div class="footer-col"><h4>Info</h4><ul>
        <li><a href="/om-oss.html">Om oss</a></li>
        <li><a href="/personvern.html">Personvern</a></li>
        <li><a href="/kontakt.html">Kontakt</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">© {datetime.now().year} {SITE_NAME} — Alle kalkulatorer er gratis</div>
  </div>
</footer>'''

# ===== HEAD =====
def head(page_type, tool_data=None, category_data=None, category_slug=None):
    """Generate comprehensive SEO-optimized head section"""
    adsense_script = f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE_ID}" crossorigin="anonymous"></script>' if ADSENSE_ID and ADSENSE_ID != 'YOUR_ADSENSE_ID_HERE' else ''
    
    # Generate title, description, and other meta based on page type
    if page_type == "tool" and tool_data:
        title = f'{tool_data["title"]} — Gratis Online Kalkulator | {SITE_NAME}'
        desc = tool_data["description"]
        keywords = tool_data.get('keywords', f'{tool_data["title"]}, kalkulator, online, gratis, {tool_data["category"]}')
        canonical = f'/tools/{tool_data["slug"]}.html'
        slug = tool_data["slug"]
        tool_title = tool_data["title"]
        category_name = categories.get(tool_data["category"], {}).get("name", "")
        category = tool_data["category"]
    elif page_type == "category" and category_data:
        title = f'{category_data["name"]} Kalkulatorer — Gratis | {SITE_NAME}'
        desc = f'Gratis {category_data["name"].lower()} kalkulatorer. {len([t for t in tools if t["category"] == category_slug])} verktøy for {category_data["name"].lower()}.'
        keywords = f'{category_data["name"]}, kalkulatorer, online, gratis, {category_data["name"].lower()}'
        canonical = f'/categories/{category_slug}.html'
        slug = category_slug
        tool_title = category_data["name"]
        category_name = category_data["name"]
        category = category_slug
    else:  # homepage
        title = f'Gratis Online Kalkulatorer — {SITE_NAME} | {len(tools)}+ Verktøy'
        desc = f'Gratis online kalkulatorer for helse, finans, matematikk og mer. Over {len(tools)} kalkulatorer uten registrering.'
        keywords = 'kalkulatorer, online, gratis, helse, finans, matematikk, konvertering'
        canonical = '/'
        slug = ''
        tool_title = ''
        category_name = ''
        category = ''
    
    # Generate schema.org JSON-LD
    schemas = []
    
    # WebApplication schema for tool pages
    if page_type == "tool" and tool_data:
        webapp_schema = f'''{{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "{tool_title}",
  "description": "{desc}",
  "url": "{SITE_DOMAIN}/tools/{slug}.html",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {{
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "NOK"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "{SITE_NAME}",
    "url": "{SITE_DOMAIN}"
  }}
}}'''
        schemas.append(webapp_schema)
        
        # BreadcrumbList schema
        breadcrumb_schema = f'''{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{"@type": "ListItem", "position": 1, "name": "Hjem", "item": "{SITE_DOMAIN}"}},
    {{"@type": "ListItem", "position": 2, "name": "{category_name}", "item": "{SITE_DOMAIN}/categories/{category}.html"}},
    {{"@type": "ListItem", "position": 3, "name": "{tool_title}", "item": "{SITE_DOMAIN}/tools/{slug}.html"}}
  ]
}}'''
        schemas.append(breadcrumb_schema)
        
        # FAQPage schema
        faq_schema = f'''{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{"@type": "Question", "name": "Er {tool_title} gratis?", "acceptedAnswer": {{"@type": "Answer", "text": "Ja, {tool_title} er helt gratis å bruke uten registrering."}}}},
    {{"@type": "Question", "name": "Hvordan bruker jeg {tool_title}?", "acceptedAnswer": {{"@type": "Answer", "text": "Fyll inn verdiene i feltene og klikk Beregn-knappen for å se resultatet."}}}},
    {{"@type": "Question", "name": "Er beregningene nøyaktige?", "acceptedAnswer": {{"@type": "Answer", "text": "Ja, vi bruker standard matematiske formler for alle beregninger."}}}}
  ]
}}'''
        schemas.append(faq_schema)
    
    # WebSite schema for homepage
    elif page_type == "homepage":
        website_schema = f'''{{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{SITE_NAME}",
  "url": "{SITE_DOMAIN}",
  "description": "{desc}",
  "potentialAction": {{
    "@type": "SearchAction",
    "target": "{SITE_DOMAIN}/?q={{search_term_string}}",
    "query-input": "required name=search_term_string"
  }},
  "publisher": {{
    "@type": "Organization",
    "name": "{SITE_NAME}",
    "url": "{SITE_DOMAIN}"
  }}
}}'''
        schemas.append(website_schema)
        
        # Organization schema
        org_schema = f'''{{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{SITE_NAME}",
  "url": "{SITE_DOMAIN}",
  "description": "{desc}"
}}'''
        schemas.append(org_schema)
    
    # Generate schema tags
    schema_tags = ""
    for schema in schemas:
        schema_tags += f'<script type="application/ld+json">{schema}</script>\n'
    
    # Generate hreflang tags
    hreflang_tags = ""
    if slug:
        hreflang_tags = f'''<link rel="alternate" hreflang="nb" href="{SITE_DOMAIN}/tools/{slug}.html">
<link rel="alternate" hreflang="no" href="{SITE_DOMAIN}/tools/{slug}.html">'''
    elif page_type == "category":
        hreflang_tags = f'''<link rel="alternate" hreflang="nb" href="{SITE_DOMAIN}/categories/{slug}.html">
<link rel="alternate" hreflang="no" href="{SITE_DOMAIN}/categories/{slug}.html">'''
    else:
        hreflang_tags = f'''<link rel="alternate" hreflang="nb" href="{SITE_DOMAIN}/">
<link rel="alternate" hreflang="no" href="{SITE_DOMAIN}/">'''
    
    return f'''<head>
  <!-- Primary Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="title" content="{title}">
  <meta name="description" content="{desc}">
  <meta name="keywords" content="{keywords}">
  <meta name="robots" content="index, follow">
  <meta name="language" content="Norwegian">
  <meta name="author" content="{SITE_NAME}">
  <meta name="revisit-after" content="7 days">
  <link rel="canonical" href="{SITE_DOMAIN}{canonical}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{SITE_DOMAIN}{canonical}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:locale" content="nb_NO">
  <meta property="og:site_name" content="{SITE_NAME}">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{SITE_DOMAIN}{canonical}">
  <meta property="twitter:title" content="{title}">
  <meta property="twitter:description" content="{desc}">

  <!-- Hreflang -->
  {hreflang_tags}

  <!-- Performance & Mobile -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <meta name="theme-color" content="#2563eb">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <!-- Stylesheets -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">

  <!-- Schema.org -->
  {schema_tags}

  <!-- AdSense -->
  {adsense_script}

  <!-- Scripts -->
  <script src="/assets/js/seo.js"></script>
  <script>
    function toggleMobileMenu() {{
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('show');
    }}
  </script>
</head>'''

# ===== BUILD INPUTS =====
def build_inputs(tool):
    html = ""
    for inp in tool['inputs']:
        fid  = inp['id']
        lbl  = inp['label']
        ph   = inp.get('placeholder', '')
        typ  = inp['type']
        if typ == 'select':
            opts = "".join([f'<option value="{o}">{o}</option>' for o in inp.get('options', [])])
            field = f'<select class="calc-input" data-field="{fid}">{opts}</select>'
        elif typ == 'text':
            field = f'<input type="text" class="calc-input" data-field="{fid}" placeholder="{ph}">'
        else:
            field = f'<input type="{typ}" class="calc-input" data-field="{fid}" placeholder="{ph}">'
        html += f'<div class="input-group"><label>{lbl}</label><div class="input-row">{field}</div></div>'
    return html

# ===== RELATED TOOLS =====
def related_tools(tool, n=9):
    same = [t for t in tools if t['category'] == tool['category'] and t['slug'] != tool['slug']]
    other = [t for t in tools if t['category'] != tool['category']]
    cards = ""
    for t in (same + other)[:n]:
        icon = categories.get(t['category'], {}).get('icon', '🧮')
        cards += f'''<div class="tool-card" onclick="location='/tools/{t["slug"]}.html'">
          <span class="tool-card-icon">{icon}</span>
          <h3>{t["title"]}</h3><p>{t["description"]}</p>
        </div>'''
    return cards

# ===== SIDEBAR LINKS =====
def sidebar_links(tool):
    cat = categories.get(tool['category'], {})
    icon = cat.get('icon', '🧮')
    items = [t for t in tools if t['category'] == tool['category'] and t['slug'] != tool['slug']][:10]
    html = "".join([f'<li><a href="/tools/{t["slug"]}.html"><span class="icon">{icon}</span>{t["title"]}</a></li>' for t in items])
    html += f'<li><a href="/categories/{tool["category"]}.html" style="color:var(--primary)">Se alle →</a></li>'
    return html

# ===== GENERATE TOOL PAGE =====
def gen_tool(tool):
    cat     = categories.get(tool['category'], {})
    cat_name = cat.get('name', '')
    cat_icon = cat.get('icon', '🧮')
    slug    = tool['slug']

    schema = json.dumps({"@context":"https://schema.org","@type":"WebApplication","name":tool['title'],"description":tool['description'],"applicationCategory":"UtilityApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"NOK"},"url":f"{SITE_DOMAIN}/tools/{slug}.html"})
    
    # Check if content file exists
    content_file = f'../content/{slug}.html'
    content_html = ''
    
    if os.path.exists(content_file):
        try:
            with open(content_file, 'r', encoding='utf-8') as f:
                content_html = f.read()
        except Exception as e:
            print(f"  ⚠️ Error reading content for {tool['title']}: {e}")

    html = f'''<!DOCTYPE html>
<html lang="nb">
{head("tool", tool_data=tool)}
<body>

{navbar(tool['category'])}

<div class="breadcrumb">
  <a href="/">Hjem</a><span class="sep">›</span>
  <a href="/categories/{tool["category"]}.html">{cat_name}</a><span class="sep">›</span>{tool["title"]}
</div>

<div class="tool-hero">
  <div class="tool-badge">{cat_icon} {cat_name}</div>
  <h1>{tool["title"]}</h1>
  <p class="subtitle">{tool["description"]} — raskt og gratis</p>
</div>

<div class="main-wrap">
  <div class="main-content">

    <div class="calc-card">
      <h2>Skriv inn verdiene dine</h2>
      <div class="inputs-grid">{build_inputs(tool)}</div>
      <button class="btn-calc" onclick="runCalculator('{tool["formula"]}')">Beregn →</button>
      <div class="result-box" id="resultBox">
        <div class="result-label">Resultat</div>
        <div class="result-value" id="resultValue">—</div>
        <div class="result-desc" id="resultDesc"></div>
        <div class="result-metrics" id="resultMetrics"></div>
      </div>
    </div>
    
    {content_html}

    <div class="related-section">
      <h2>Relaterte kalkulatorer</h2>
      <div class="tools-grid">{related_tools(tool)}</div>
    </div>

  </div>
  <aside class="sidebar">
    <div class="sidebar-card">
      <h3>{cat_name} kalkulatorer</h3>
      <ul class="sidebar-links">{sidebar_links(tool)}</ul>
    </div>
    <div class="sidebar-card" style="padding:0;overflow:hidden;border:1px solid var(--border)">
      {adsense_unit("sidebar")}
    </div>
  </aside>
</div>

{footer()}
<script src="/assets/js/calc.js"></script>
<script>
function toggleMenu() {{
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}}
document.addEventListener('click', function(e) {{
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburgerBtn');
  if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {{
    menu.classList.remove('open');
  }}
}});
</script>
</body></html>'''

    with open(f'../tools/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)

# ===== GENERATE CATEGORY PAGE =====
def gen_category(slug, cat):
    cat_tools = [t for t in tools if t['category'] == slug]
    cards = "".join([f'''<div class="tool-card" onclick="location='/tools/{t["slug"]}.html'">
      <span class="tool-card-icon">{cat["icon"]}</span>
      <h3>{t["title"]}</h3><p>{t["description"]}</p>
    </div>''' for t in cat_tools])

    html = f'''<!DOCTYPE html>
<html lang="nb">
{head("category", category_data=cat, category_slug=slug)}
<body>
{navbar(slug)}
<div class="tool-hero">
  <div class="tool-badge">{cat["icon"]} Kategori</div>
  <h1>{cat["name"]} Kalkulatorer</h1>
  <p class="subtitle">{len(cat_tools)} gratis kalkulatorer</p>
</div>
<div style="max-width:1100px;margin:0 auto;padding:0 24px 80px">
  {adsense_unit()}
  <div class="tools-grid">{cards}</div>
</div>
{footer()}
<script src="/assets/js/calc.js"></script>
<script>
function toggleMenu() {{
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}}
document.addEventListener('click', function(e) {{
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburgerBtn');
  if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {{
    menu.classList.remove('open');
  }}
}});
</script>
</body></html>'''

    with open(f'../categories/{slug}.html', 'w', encoding='utf-8') as f:
        f.write(html)

# ===== GENERATE HOMEPAGE =====
def gen_homepage():
    cat_cards = "".join([f'''<div class="cat-card" onclick="location='/categories/{s}.html'">
      <span class="cat-icon">{c["icon"]}</span>
      <div class="cat-name">{c["name"]}</div>
      <div class="cat-count">{len([t for t in tools if t["category"]==s])} kalkulatorer</div>
    </div>''' for s,c in categories.items()])

    pop_cards = "".join([f'''<div class="tool-card" onclick="location='/tools/{t["slug"]}.html'">
      <span class="tool-card-icon">{categories.get(t["category"],{}).get("icon","🧮")}</span>
      <h3>{t["title"]}</h3><p>{t["description"]}</p>
    </div>''' for t in tools[:12]])

    html = f'''<!DOCTYPE html>
<html lang="nb">
{head("homepage")}
<body>
{navbar()}

<div class="hero-home">
  <h1>Gratis Online Kalkulatorer</h1>
  <p>Over {len(tools)} gratis kalkulatorer for helse, finans, matematikk og mer</p>
  <div class="search-box">
    <input type="text" id="sInput" placeholder="Søk etter kalkulator..." onkeypress="if(event.key==='Enter')doSearch()">
    <button onclick="doSearch()">Søk</button>
  </div>
</div>

<div class="stats-bar">
  <div class="stat-item"><div class="stat-num">{len(tools)}+</div><div class="stat-label">Kalkulatorer</div></div>
  <div class="stat-item"><div class="stat-num">{len(categories)}</div><div class="stat-label">Kategorier</div></div>
  <div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">Gratis</div></div>
  <div class="stat-item"><div class="stat-num">0</div><div class="stat-label">Registrering</div></div>
</div>

{adsense_unit()}

<div class="home-section">
  <h2>Bla gjennom kategorier</h2>
  <div class="cat-grid">{cat_cards}</div>
  <h2>Populære kalkulatorer</h2>
  <div class="tools-grid">{pop_cards}</div>
</div>

{footer()}
<script src="/assets/js/calc.js"></script>
<script>
function doSearch(){{
  const q=document.getElementById('sInput').value.trim();
  const all={json.dumps([{"slug":t["slug"],"title":t["title"]} for t in tools])};
  const res=all.filter(t=>t.title.toLowerCase().includes(q.toLowerCase()));
  if(res.length===1)location='/tools/'+res[0].slug+'.html';
  else if(res.length>0){{const r=res.map(t=>`<div class="tool-card" onclick="location='/tools/${{t.slug}}.html'" style="cursor:pointer"><h3>${{t.title}}</h3></div>`).join('');document.querySelector('.home-section').innerHTML='<h2>Søkeresultater</h2><div class="tools-grid">'+r+'</div>';}}
  else alert('Ingen resultater for: '+q);
}}
function toggleMenu() {{
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}}
document.addEventListener('click', function(e) {{
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburgerBtn');
  if (menu && !menu.contains(e.target) && !btn.contains(e.target)) {{
    menu.classList.remove('open');
  }}
}});
</script>
</body></html>'''

    with open('../index.html', 'w', encoding='utf-8') as f:
        f.write(html)

# ===== SITEMAP + ROBOTS =====
def gen_seo():
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Generate sitemap URLs with proper lastmod, priority, and changefreq
    urls = []
    
    # Homepage
    urls.append(f'''<url>
  <loc>{SITE_DOMAIN}/</loc>
  <lastmod>{today}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>''')
    
    # Category pages
    for s, cat in categories.items():
        urls.append(f'''<url>
  <loc>{SITE_DOMAIN}/categories/{s}.html</loc>
  <lastmod>{today}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>''')
    
    # Tool pages
    for t in tools:
        urls.append(f'''<url>
  <loc>{SITE_DOMAIN}/tools/{t["slug"]}.html</loc>
  <lastmod>{today}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>''')
    
    # Generate sitemap.xml
    sitemap_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"".join(urls)}
</urlset>'''
    
    with open('../sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    # Generate robots.txt
    robots_content = f'''User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /content/
Disallow: /assets/js/

# Sitemap
Sitemap: {SITE_DOMAIN}/sitemap.xml

# Host directive for Yandex
Host: {SITE_DOMAIN}

# Crawl delay for respectful crawling
Crawl-delay: 1'''
    
    with open('../robots.txt', 'w', encoding='utf-8') as f:
        f.write(robots_content)

# ===== MAIN =====
if __name__ == '__main__':
    new_only = '--new' in sys.argv
    print(f"\n{'='*50}")
    print(f"  🚀 {SITE_NAME} — Site Generator")
    print(f"  {len(tools)} tools | {len(categories)} categories")
    print(f"{'='*50}\n")

    existing = set(os.listdir('../tools')) if new_only else set()

    print("📄 Tool pages:")
    count = 0
    for tool in tools:
        fname = f"{tool['slug']}.html"
        if new_only and fname in existing:
            continue
        gen_tool(tool)
        count += 1
        print(f"  ✓ {tool['slug']}")
    
    print(f"\n📁 Category pages:")
    for slug, cat in categories.items():
        gen_category(slug, cat)
        print(f"  ✓ {slug}")

    print(f"\n🏠 Homepage + SEO files:")
    gen_homepage()
    gen_seo()
    print(f"  ✓ index.html, sitemap.xml, robots.txt")

    print(f"\n{'='*50}")
    print(f"  ✅ {count} tool pages generated!")
    print(f"\n  📋 AGLE STEPS:")
    print(f"  1. config.json mein API key set karo")
    print(f"  2. tools_database.json mein aur tools add karo")
    print(f"  3. Sab files Hostinger public_html mein upload karo")
    print(f"  4. Google AdSense apply karo")
    print(f"{'='*50}\n")
