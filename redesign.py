import os
import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

new_menu = '''    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 bg-[#00040A]/98 backdrop-blur-2xl z-[150] flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-300">
        <button class="absolute top-8 right-8 text-white text-4xl" onclick="toggleMobileMenu()">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="flex flex-col items-center gap-6 w-full px-6">
            <a href="index.html" class="w-full max-w-sm text-center text-lg lg:text-xl font-black text-white tracking-widest uppercase py-4 border border-white/10 rounded-2xl active:bg-rt-cyan active:text-rt-navy transition-colors">Ecosistema</a>
            
            <a href="malla.html" class="w-full max-w-sm text-center text-lg lg:text-xl font-black text-white tracking-widest uppercase py-4 border border-white/10 rounded-2xl active:bg-rt-cyan active:text-rt-navy transition-colors">Malla Curricular</a>
            
            <a href="laboratorio.html" class="w-full max-w-sm text-center text-lg lg:text-xl font-black text-white tracking-widest uppercase py-4 border border-white/10 rounded-2xl active:bg-rt-cyan active:text-rt-navy transition-colors">Infraestructura</a>
            
            <a href="recursos.html" class="w-full max-w-sm text-center text-lg lg:text-xl font-black text-white tracking-widest uppercase py-4 border border-white/10 rounded-2xl active:bg-rt-cyan active:text-rt-navy transition-colors">Recursos</a>
            
            <a href="recursos.html#contacto" class="w-full max-w-sm text-center text-lg lg:text-xl font-black text-rt-navy bg-rt-cyan tracking-widest uppercase py-4 rounded-2xl mt-4 shadow-[0_0_20px_rgba(0,245,255,0.4)]" onclick="setTimeout(toggleMobileMenu, 200)">Inscripciones 2026</a>
        </div>
    </div>'''

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Regex to find the existing mobile menu
    pattern = r'<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu"[\s\S]*?</div>\s*<!--'
    # Reemplazar con el nuevo menu y dejar intacto el comentario siguiente
    content = re.sub(pattern, new_menu + '\n\n    <!--', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Redesign applied to all HTML files.')
