import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the Mobile Menu Button block
    btn_pattern = re.compile(r'<!-- Mobile Menu Button -->\s*<button class="lg:hidden[^>]*>\s*<i class="fa-solid fa-(?:bars|xmark)"></i>\s*</button>', re.DOTALL)
    
    new_btn = '''<!-- Mobile CTA -->
        <a href="recursos.html#contacto" class="lg:hidden bg-[#00F5FF] text-[#0B1221] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(0,245,255,0.4)]">
            Inscribirse
        </a>'''
    
    content = btn_pattern.sub(new_btn, content)

    # 2. Remove the Mobile Menu Overlay block
    # It starts with <!-- Mobile Menu Overlay --> and ends with </div></div>
    # Let's find exactly '<div id="mobile-menu"' and remove up to the specific closing div
    menu_pattern = re.compile(r'<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu".*?</div>\s*</div>', re.DOTALL)
    content = menu_pattern.sub('', content)

    # In case the comment is missing:
    menu_pattern2 = re.compile(r'<div id="mobile-menu".*?</div>\s*</div>', re.DOTALL)
    content = menu_pattern2.sub('', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Mobile menu replaced safely.')
