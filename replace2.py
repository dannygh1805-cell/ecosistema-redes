import os

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Ecosistema
    content = content.replace(
        '<a href="index.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-colors block w-full text-center py-4" onclick="goToPage(event, \'index.html\')">Ecosistema</a>',
        '<a href="index.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-all duration-300 inline-block py-3 px-6 rounded-2xl active:bg-white/10" onclick="goToPage(event, \'index.html\')">Ecosistema</a>'
    )
    
    # Malla Curricular
    content = content.replace(
        '<a href="malla.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-colors block w-full text-center py-4" onclick="goToPage(event, \'malla.html\')">Malla Curricular</a>',
        '<a href="malla.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-all duration-300 inline-block py-3 px-6 rounded-2xl active:bg-white/10" onclick="goToPage(event, \'malla.html\')">Malla Curricular</a>'
    )
    
    # Infraestructura
    content = content.replace(
        '<a href="laboratorio.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-colors block w-full text-center py-4" onclick="goToPage(event, \'laboratorio.html\')">Infraestructura</a>',
        '<a href="laboratorio.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-all duration-300 inline-block py-3 px-6 rounded-2xl active:bg-white/10" onclick="goToPage(event, \'laboratorio.html\')">Infraestructura</a>'
    )
    
    # Recursos
    content = content.replace(
        '<a href="recursos.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-colors block w-full text-center py-4" onclick="goToPage(event, \'recursos.html\')">Recursos</a>',
        '<a href="recursos.html" class="text-2xl font-black text-white active:text-rt-cyan md:hover:text-rt-cyan tracking-widest uppercase transition-all duration-300 inline-block py-3 px-6 rounded-2xl active:bg-white/10" onclick="goToPage(event, \'recursos.html\')">Recursos</a>'
    )
    
    # Inscripciones
    content = content.replace(
        '<a href="recursos.html#contacto" class="mt-4 bg-rt-cyan text-rt-navy px-8 py-3 rounded-full font-black text-sm uppercase transition-transform active:scale-95 md:hover:scale-105 block text-center" onclick="goToPage(event, \'recursos.html#contacto\')">Inscripciones 2026</a>',
        '<a href="recursos.html#contacto" class="mt-4 bg-rt-cyan text-rt-navy px-8 py-3 rounded-full font-black text-sm uppercase transition-transform active:scale-95 md:hover:scale-105 inline-block text-center shadow-[0_0_20px_rgba(0,245,255,0.4)]" onclick="goToPage(event, \'recursos.html#contacto\')">Inscripciones 2026</a>'
    )
    content = content.replace(
        '<a href="#contacto" class="mt-4 bg-rt-cyan text-rt-navy px-8 py-3 rounded-full font-black text-sm uppercase transition-transform active:scale-95 md:hover:scale-105 block text-center" onclick="goToPage(event, \'#contacto\')">Inscripciones 2026</a>',
        '<a href="#contacto" class="mt-4 bg-rt-cyan text-rt-navy px-8 py-3 rounded-full font-black text-sm uppercase transition-transform active:scale-95 md:hover:scale-105 inline-block text-center shadow-[0_0_20px_rgba(0,245,255,0.4)]" onclick="goToPage(event, \'#contacto\')">Inscripciones 2026</a>'
    )

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print('Done!')
