import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

# New inline style approach - use style attribute with display:block to GUARANTEE full coverage
nav_links = {
    'index.html':     ('Ecosistema',      'index.html'),
    'malla':          ('Malla Curricular','malla.html'),
    'laboratorio':    ('Infraestructura', 'laboratorio.html'),
    'recursos_link':  ('Recursos',        'recursos.html'),
    'inscripciones1': ('Inscripciones 2026','recursos.html#contacto'),
    'inscripciones2': ('Inscripciones 2026','#contacto'),
}

new_menu_template = '''    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[150] opacity-0 pointer-events-none transition-all duration-300" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <button class="absolute top-8 right-8 text-white text-4xl" onclick="toggleMobileMenu()">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div style="display:flex; flex-direction:column; align-items:center; gap:1.25rem; width:100%; padding: 0 2rem; box-sizing:border-box;">
            <a href="index.html" style="display:block; width:100%; max-width:360px; text-align:center; padding: 1.25rem 1rem; background:rgba(17,34,64,0.7); border:1px solid rgba(0,245,255,0.2); border-radius:1rem; color:white; font-weight:900; font-size:1rem; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; box-sizing:border-box; -webkit-tap-highlight-color: rgba(0,245,255,0.3);">Ecosistema</a>
            
            <a href="malla.html" style="display:block; width:100%; max-width:360px; text-align:center; padding: 1.25rem 1rem; background:rgba(17,34,64,0.7); border:1px solid rgba(0,245,255,0.2); border-radius:1rem; color:white; font-weight:900; font-size:1rem; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; box-sizing:border-box; -webkit-tap-highlight-color: rgba(0,245,255,0.3);">Malla Curricular</a>
            
            <a href="laboratorio.html" style="display:block; width:100%; max-width:360px; text-align:center; padding: 1.25rem 1rem; background:rgba(17,34,64,0.7); border:1px solid rgba(0,245,255,0.2); border-radius:1rem; color:white; font-weight:900; font-size:1rem; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; box-sizing:border-box; -webkit-tap-highlight-color: rgba(0,245,255,0.3);">Infraestructura</a>
            
            <a href="recursos.html" style="display:block; width:100%; max-width:360px; text-align:center; padding: 1.25rem 1rem; background:rgba(17,34,64,0.7); border:1px solid rgba(0,245,255,0.2); border-radius:1rem; color:white; font-weight:900; font-size:1rem; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; box-sizing:border-box; -webkit-tap-highlight-color: rgba(0,245,255,0.3);">Recursos</a>
            
            <a href="INSCRIPCIONES_URL" style="display:block; width:100%; max-width:360px; text-align:center; padding: 1.25rem 1rem; background:#00F5FF; border-radius:1rem; color:#0B1221; font-weight:900; font-size:1rem; letter-spacing:0.15em; text-transform:uppercase; text-decoration:none; box-sizing:border-box; margin-top:0.5rem; box-shadow: 0 0 20px rgba(0,245,255,0.4); -webkit-tap-highlight-color: rgba(0,0,0,0.2);">Inscripciones 2026</a>
        </div>
    </div>'''

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    insc_url = '#contacto' if f == 'recursos.html' else 'recursos.html#contacto'
    menu = new_menu_template.replace('INSCRIPCIONES_URL', insc_url)
    
    # Regex to find and replace the existing mobile menu block
    pattern = r'<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu"[\s\S]*?</div>\s*\n'
    content = re.sub(pattern, menu + '\n', content)
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Done: {f}')

print('All files updated.')
