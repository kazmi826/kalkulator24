#!/usr/bin/env python3
"""
Kalkulator24 - Site Generator with Internal Linking
"""

import json, os
from datetime import datetime

with open('config.json', 'r', encoding='utf-8') as f:
    cfg = json.load(f)

SITE_NAME   = cfg.get('site_name', 'Kalkulator24')
SITE_DOMAIN = cfg.get('site_domain', 'https://kalkulator24.guru')
API_KEY     = cfg.get('gemini_api_key', '')
ADSENSE_ID  = cfg.get('adsense_id', '')
VERIFICATION = 'U-ZiCQHLID9ShjKIWBJI0Xi7xJDNrx9bwP4tRBEYzSQ'

with open('tools_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

tools      = db['tools']
categories = db['categories']

for d in ['../verktoy', '../kategori']:
    os.makedirs(d, exist_ok=True)

POPULAR_TOOLS = [
    'bmi-kalkulator', 'lan-kalkulator', 'prosent-kalkulator',
    'alder-kalkulator', 'kalorikalkulator', 'ph-kalkulator',
    'molekylvekt-kalkulator', 'halveringstid-kalkulator',
    'befolkningsvekst-kalkulator', 'terningkaster'
]

def get_head(title, desc, canonical, keywords=''):
    adsense = ''
    if ADSENSE_ID and ADSENSE_ID != 'YOUR_ADSENSE_ID_HERE':
        adsense = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_ID + '" crossorigin="anonymous"></script>'
    return (
        '<head>\n'
        '  <meta charset="UTF-8">\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        '  <title>' + title + '</title>\n'
        '  <meta name="description" content="' + desc + '">\n'
        '  <meta name="keywords" content="' + keywords + '">\n'
        '  <meta name="robots" content="index, follow">\n'
        '  <meta name="language" content="Norwegian">\n'
        '  <meta name="google-site-verification" content="' + VERIFICATION + '">\n'
        '  <meta name="theme-color" content="#2563eb">\n'
        '  <meta property="og:type" content="website">\n'
        '  <meta property="og:title" content="' + title + '">\n'
        '  <meta property="og:description" content="' + desc + '">\n'
        '  <meta property="og:url" content="' + SITE_DOMAIN + canonical + '">\n'
        '  <meta property="og:locale" content="nb_NO">\n'
        '  <link rel="canonical" href="' + SITE_DOMAIN + canonical + '">\n'
        '  <link rel="alternate" hreflang="nb" href="' + SITE_DOMAIN + canonical + '">\n'
        '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n'
        '  <link rel="stylesheet" href="/assets/css/style.css">\n'
        '  ' + adsense + '\n'
        '</head>'
    )

def get_navbar(active=''):
    links = ''
    for slug, cat in categories.items():
        a = 'active' if slug == active else ''
        links += '<li><a href="/kategori/' + slug + '" class="' + a + '">' + cat['icon'] + ' ' + cat['name'] + '</a></li>'
    return (
        '<nav class="navbar">\n'
        '  <div class="navbar-inner">\n'
        '    <a href="/" class="logo">' + SITE_NAME + '</a>\n'
        '    <ul class="nav-links" id="navLinks">' + links + '</ul>\n'
        '    <button class="hamburger" id="hamburgerBtn" onclick="toggleMenu()">☰</button>\n'
        '  </div>\n'
        '  <div id="mobileMenu"><ul>' + links + '</ul></div>\n'
        '</nav>'
    )

def get_footer():
    cat_links = ''
    for s, c in categories.items():
        cat_links += '<li><a href="/kategori/' + s + '">' + c['icon'] + ' ' + c['name'] + '</a></li>'

    pop_links = ''
    for slug in POPULAR_TOOLS:
        t = next((x for x in tools if x['slug'] == slug), None)
        if t:
            pop_links += '<li><a href="/verktoy/' + t['slug'] + '">' + t['title'] + '</a></li>'

    recent_links = ''
    for t in reversed(tools[-8:]):
        recent_links += '<li><a href="/verktoy/' + t['slug'] + '">' + t['title'] + '</a></li>'

    return (
        '<footer>\n'
        '  <div class="footer-inner">\n'
        '    <div class="footer-grid">\n'
        '      <div class="footer-col"><h4>' + SITE_NAME + '</h4><p style="font-size:13px;line-height:1.7;color:rgba(255,255,255,.6)">' + str(len(tools)) + '+ gratis kalkulatorer</p></div>\n'
        '      <div class="footer-col"><h4>Kategorier</h4><ul>' + cat_links + '</ul></div>\n'
        '      <div class="footer-col"><h4>Populære</h4><ul>' + pop_links + '</ul></div>\n'
        '      <div class="footer-col"><h4>Nylig lagt til</h4><ul>' + recent_links + '</ul></div>\n'
        '      <div class="footer-col"><h4>Info</h4><ul><li><a href="/om-oss">Om oss</a></li><li><a href="/personvern">Personvern</a></li><li><a href="/kontakt">Kontakt</a></li></ul></div>\n'
        '    </div>\n'
        '    <div class="footer-bottom"><p>© ' + str(datetime.now().year) + ' ' + SITE_NAME + ' — Alle kalkulatorer er gratis</p></div>\n'
        '  </div>\n'
        '</footer>\n'
        '<script>\n'
        'function toggleMenu(){var m=document.getElementById("mobileMenu");m.classList.toggle("open");}\n'
        'document.addEventListener("click",function(e){var m=document.getElementById("mobileMenu");var b=document.getElementById("hamburgerBtn");if(m&&b&&!m.contains(e.target)&&!b.contains(e.target))m.classList.remove("open");});\n'
        '</script>'
    )

def build_inputs(tool):
    html = ''
    for inp in tool['inputs']:
        fid = inp['id']
        lbl = inp['label']
        ph  = inp.get('placeholder', '')
        typ = inp['type']
        if typ == 'select':
            opts = ''.join(['<option value="' + o + '">' + o + '</option>' for o in inp.get('options', [])])
            field = '<select class="calc-input" data-field="' + fid + '">' + opts + '</select>'
        elif typ == 'text':
            field = '<input type="text" class="calc-input" data-field="' + fid + '" placeholder="' + ph + '">'
        elif typ == 'time':
            field = '<input type="time" class="calc-input" data-field="' + fid + '">'
        elif typ == 'date':
            field = '<input type="date" class="calc-input" data-field="' + fid + '">'
        else:
            field = '<input type="number" class="calc-input" data-field="' + fid + '" placeholder="' + ph + '">'
        html += '<div class="input-group"><label>' + lbl + '</label><div class="input-row">' + field + '</div></div>'
    return html

def get_related_tools(tool, n=12):
    same = [t for t in tools if t['category'] == tool['category'] and t['slug'] != tool['slug']]
    other = [t for t in tools if t['category'] != tool['category']]
    cards = ''
    for t in (same + other)[:n]:
        icon = categories.get(t['category'], {}).get('icon', 'x')
        cards += '<div class="tool-card" onclick="location=\'/verktoy/' + t['slug'] + '\'"><span class="tool-card-icon">' + icon + '</span><h3>' + t['title'] + '</h3><p>' + t['description'] + '</p></div>'
    cat_name = categories.get(tool['category'], {}).get('name', '')
    cards += '<div class="tool-card" onclick="location=\'/kategori/' + tool['category'] + '\'" style="border:2px dashed var(--border)"><span class="tool-card-icon">→</span><h3>Se alle ' + cat_name + '</h3><p>Alle kalkulatorer i denne kategorien</p></div>'
    return cards

def get_also_like(tool):
    seen = set([tool['category']])
    picks = []
    for t in tools:
        if t['category'] not in seen and t['slug'] != tool['slug']:
            picks.append(t)
            seen.add(t['category'])
        if len(picks) >= 6:
            break
    cards = ''
    for t in picks:
        icon = categories.get(t['category'], {}).get('icon', 'x')
        cards += '<div class="tool-card" onclick="location=\'/verktoy/' + t['slug'] + '\'"><span class="tool-card-icon">' + icon + '</span><h3>' + t['title'] + '</h3><p>' + t['description'] + '</p></div>'
    return cards

def get_sidebar(tool):
    cat = categories.get(tool['category'], {})
    icon = cat.get('icon', 'x')
    cat_name = cat.get('name', '')
    same_tools = [t for t in tools if t['category'] == tool['category'] and t['slug'] != tool['slug']][:8]
    same_html = ''
    for t in same_tools:
        same_html += '<li><a href="/verktoy/' + t['slug'] + '"><span class="icon">' + icon + '</span>' + t['title'] + '</a></li>'
    same_html += '<li><a href="/kategori/' + tool['category'] + '" style="color:var(--primary)">Se alle ' + cat_name + ' \u2192</a></li>'
    pop_html = ''
    for slug in POPULAR_TOOLS[:6]:
        t = next((x for x in tools if x['slug'] == slug), None)
        if t and t['slug'] != tool['slug']:
            ci = categories.get(t['category'], {}).get('icon', 'x')
            pop_html += '<li><a href="/verktoy/' + t['slug'] + '"><span class="icon">' + ci + '</span>' + t['title'] + '</a></li>'
    return (
        '<aside class="sidebar">\n'
        '    <div class="sidebar-card"><h3>' + cat_name + ' kalkulatorer</h3><ul class="sidebar-links">' + same_html + '</ul></div>\n'
        '    <div class="sidebar-card"><h3>Populære verktøy</h3><ul class="sidebar-links">' + pop_html + '</ul></div>\n'
        '  </aside>'
    )

def gen_tool(tool):
    cat      = categories.get(tool['category'], {})
    cat_name = cat.get('name', '')
    cat_icon = cat.get('icon', 'x')
    slug     = tool['slug']

    content_html = ''
    content_path = '../content/' + slug + '.html'
    if os.path.exists(content_path):
        with open(content_path, 'r', encoding='utf-8') as f:
            content_html = f.read()

    schema = '{"@context":"https://schema.org","@type":"WebApplication","name":"' + tool['title'] + '","description":"' + tool['description'] + '","url":"' + SITE_DOMAIN + '/verktoy/' + slug + '","applicationCategory":"UtilityApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"NOK"}}'
    breadcrumb = '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Hjem","item":"' + SITE_DOMAIN + '"},{"@type":"ListItem","position":2,"name":"' + cat_name + '","item":"' + SITE_DOMAIN + '/kategori/' + tool['category'] + '"},{"@type":"ListItem","position":3,"name":"' + tool['title'] + '","item":"' + SITE_DOMAIN + '/verktoy/' + slug + '"}]}'

    if content_html:
        content_section = '<div class="content-card">' + content_html + '</div>'
    else:
        content_section = (
            '<div class="ai-loader" id="aiWrap">'
            '<p>Last inn detaljert guide</p>'
            '<button class="btn-ai" id="aiBtn">Vis guide</button>'
            '<div class="loading-wrap" id="aiLoader"><div class="spinner"></div><span>Laster...</span></div>'
            '</div>'
            '<div class="content-card" id="aiContent" style="display:none"></div>'
        )

    html = (
        '<!DOCTYPE html>\n<html lang="nb">\n'
        + get_head(tool['title'] + ' — Gratis Online Kalkulator | ' + SITE_NAME, tool['description'] + ' — Gratis kalkulator online', '/verktoy/' + slug, tool.get('keywords', ''))
        + '\n<body>\n'
        + '<script type="application/ld+json">' + schema + '</script>\n'
        + '<script type="application/ld+json">' + breadcrumb + '</script>\n'
        + get_navbar(tool['category']) + '\n'
        + '<div class="breadcrumb"><a href="/">Hjem</a><span class="sep">›</span><a href="/kategori/' + tool['category'] + '">' + cat_name + '</a><span class="sep">›</span>' + tool['title'] + '</div>\n'
        + '<div class="tool-hero"><div class="tool-badge">' + cat_icon + ' ' + cat_name + '</div><h1>' + tool['title'] + '</h1><p class="subtitle">' + tool['description'] + ' — raskt og gratis</p></div>\n'
        + '<div class="main-wrap">\n'
        + '  <div class="main-content">\n'
        + '    <div class="calc-card"><h2>Skriv inn verdiene dine</h2><div class="inputs-grid">' + build_inputs(tool) + '</div>'
        + '    <button class="btn-calc" onclick="runCalculator(\'' + tool['formula'] + '\')">Beregn \u2192</button>'
        + '    <div class="result-box" id="resultBox"><div class="result-label">Resultat</div><div class="result-value" id="resultValue">\u2014</div><div class="result-desc" id="resultDesc"></div></div></div>\n'
        + '    ' + content_section + '\n'
        + '    <div class="related-section"><h2>Relaterte kalkulatorer</h2><div class="tools-grid">' + get_related_tools(tool) + '</div></div>\n'
        + '    <div class="related-section" style="margin-top:32px"><h2>Du vil kanskje like</h2><div class="tools-grid">' + get_also_like(tool) + '</div></div>\n'
        + '  </div>\n'
        + '  ' + get_sidebar(tool) + '\n'
        + '</div>\n'
        + get_footer() + '\n'
        + '<script src="/assets/js/calc.js"></script>\n'
        + '</body></html>'
    )

    with open('../verktoy/' + slug + '.html', 'w', encoding='utf-8') as f:
        f.write(html)

def gen_category(cat_slug, cat):
    cat_tools = [t for t in tools if t['category'] == cat_slug]
    tool_cards = ''
    for t in cat_tools:
        tool_cards += '<div class="tool-card" onclick="location=\'/verktoy/' + t['slug'] + '\'"><span class="tool-card-icon">' + cat['icon'] + '</span><h3>' + t['title'] + '</h3><p>' + t['description'] + '</p></div>'

    other_cats = ''
    for s, c in categories.items():
        if s != cat_slug:
            count = len([t for t in tools if t['category'] == s])
            other_cats += '<div class="cat-card" onclick="location=\'/kategori/' + s + '\'"><span class="cat-icon">' + c['icon'] + '</span><div class="cat-name">' + c['name'] + '</div><div class="cat-count">' + str(count) + ' kalkulatorer</div></div>'

    html = (
        '<!DOCTYPE html>\n<html lang="nb">\n'
        + get_head(cat['name'] + ' Kalkulatorer — Gratis | ' + SITE_NAME, 'Gratis ' + cat['name'].lower() + ' kalkulatorer. ' + str(len(cat_tools)) + ' verktøy.', '/kategori/' + cat_slug)
        + '\n<body>\n'
        + get_navbar(cat_slug) + '\n'
        + '<div class="breadcrumb"><a href="/">Hjem</a><span class="sep">›</span>' + cat['name'] + '</div>\n'
        + '<div class="tool-hero"><div class="tool-badge">' + cat['icon'] + ' Kategori</div><h1>' + cat['name'] + ' Kalkulatorer</h1><p class="subtitle">' + str(len(cat_tools)) + ' gratis kalkulatorer</p></div>\n'
        + '<div style="max-width:1100px;margin:0 auto;padding:0 24px 80px">\n'
        + '  <div class="tools-grid">' + tool_cards + '</div>\n'
        + '  <div style="margin-top:48px"><h2 style="font-size:20px;font-weight:700;margin-bottom:20px">Andre kategorier</h2><div class="cat-grid">' + other_cats + '</div></div>\n'
        + '</div>\n'
        + get_footer() + '\n'
        + '<script src="/assets/js/calc.js"></script>\n'
        + '</body></html>'
    )

    with open('../kategori/' + cat_slug + '.html', 'w', encoding='utf-8') as f:
        f.write(html)

def gen_homepage():
    cat_cards = ''
    for s, c in categories.items():
        count = len([t for t in tools if t['category'] == s])
        cat_cards += '<div class="cat-card" onclick="location=\'/kategori/' + s + '\'"><span class="cat-icon">' + c['icon'] + '</span><div class="cat-name">' + c['name'] + '</div><div class="cat-count">' + str(count) + ' kalkulatorer</div></div>'

    pop_cards = ''
    for slug in POPULAR_TOOLS:
        t = next((x for x in tools if x['slug'] == slug), None)
        if t:
            icon = categories.get(t['category'], {}).get('icon', 'x')
            pop_cards += '<div class="tool-card" onclick="location=\'/verktoy/' + t['slug'] + '\'"><span class="tool-card-icon">' + icon + '</span><h3>' + t['title'] + '</h3><p>' + t['description'] + '</p></div>'

    recent_cards = ''
    for t in reversed(tools[-15:]):
        icon = categories.get(t['category'], {}).get('icon', 'x')
        recent_cards += '<div class="tool-card" onclick="location=\'/verktoy/' + t['slug'] + '\'"><span class="tool-card-icon">' + icon + '</span><h3>' + t['title'] + '</h3><p>' + t['description'] + '</p></div>'

    all_tools_js = json.dumps([{'slug': t['slug'], 'title': t['title']} for t in tools])

    schema_ws = '{"@context":"https://schema.org","@type":"WebSite","name":"' + SITE_NAME + '","url":"' + SITE_DOMAIN + '","description":"Gratis online kalkulatorer","inLanguage":"nb-NO"}'

    html = (
        '<!DOCTYPE html>\n<html lang="nb">\n'
        + get_head(SITE_NAME + ' — Gratis Online Kalkulatorer | ' + str(len(tools)) + '+ Verktøy', 'Gratis online kalkulatorer for helse, finans, matematikk og mer. Over ' + str(len(tools)) + ' kalkulatorer.', '/')
        + '\n<body>\n'
        + '<script type="application/ld+json">' + schema_ws + '</script>\n'
        + get_navbar() + '\n'
        + '<div class="hero-home"><h1>Gratis Online Kalkulatorer</h1><p>Over ' + str(len(tools)) + ' gratis kalkulatorer for helse, finans, matematikk og mer</p>'
        + '<div class="search-box"><input type="text" id="sInput" placeholder="Søk etter kalkulator..." onkeypress="if(event.key===\'Enter\')doSearch()"><button onclick="doSearch()">Søk</button></div></div>\n'
        + '<div class="home-section">\n'
        + '  <h2>Bla gjennom kategorier</h2><div class="cat-grid">' + cat_cards + '</div>\n'
        + '  <h2>Populære kalkulatorer</h2><div class="tools-grid">' + pop_cards + '</div>\n'
        + '  <h2 style="margin-top:48px">Nylig lagt til</h2><div class="tools-grid">' + recent_cards + '</div>\n'
        + '</div>\n'
        + get_footer() + '\n'
        + '<script src="/assets/js/calc.js"></script>\n'
        + '<script>\n'
        + 'var allTools=' + all_tools_js + ';\n'
        + 'function doSearch(){var q=document.getElementById("sInput").value.trim().toLowerCase();if(!q)return;var res=allTools.filter(function(t){return t.title.toLowerCase().includes(q);});if(res.length===1){location.href="/verktoy/"+res[0].slug;}else if(res.length>1){var cards=res.map(function(t){return\'<div class="tool-card" onclick="location=\\"/verktoy/\'+t.slug+\'\\"">\'+\'<h3>\'+t.title+\'</h3></div>\';}).join("");document.querySelector(".home-section").innerHTML=\'<h2>Søkeresultater</h2><div class="tools-grid">\'+cards+\'</div>\';}else{alert("Ingen resultater for: "+q);}}\n'
        + '</script>\n'
        + '</body></html>'
    )

    with open('../index.html', 'w', encoding='utf-8') as f:
        f.write(html)

def gen_seo():
    today = datetime.now().strftime('%Y-%m-%d')
    urls = ['<url><loc>' + SITE_DOMAIN + '/</loc><lastmod>' + today + '</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>']
    for t in tools:
        urls.append('<url><loc>' + SITE_DOMAIN + '/verktoy/' + t['slug'] + '</loc><lastmod>' + today + '</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>')
    for s in categories:
        urls.append('<url><loc>' + SITE_DOMAIN + '/kategori/' + s + '</loc><lastmod>' + today + '</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>')
    with open('../sitemap.xml', 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(urls) + '\n</urlset>')
    with open('../robots.txt', 'w') as f:
        f.write('User-agent: *\nAllow: /\nDisallow: /scripts/\nSitemap: ' + SITE_DOMAIN + '/sitemap.xml\n')

if __name__ == '__main__':
    print('\n' + '='*50)
    print('  ' + SITE_NAME + ' — Site Generator')
    print('  ' + str(len(tools)) + ' tools | ' + str(len(categories)) + ' categories')
    print('='*50 + '\n')
    print('Tool pages:')
    for tool in tools:
        gen_tool(tool)
        print('  v ' + tool['slug'])
    print('\nCategory pages:')
    for slug, cat in categories.items():
        gen_category(slug, cat)
        print('  v ' + slug)
    print('\nHomepage + SEO:')
    gen_homepage()
    gen_seo()
    print('  v index.html, sitemap.xml, robots.txt')
    print('\n' + '='*50)
    print('  OK ' + str(len(tools)) + ' tool pages generated!')
    print('='*50 + '\n')
