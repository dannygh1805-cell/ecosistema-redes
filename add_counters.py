import re

files = ['malla.html', 'laboratorio.html']

replacement = """            <div class="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-600 font-bold tracking-[0.2em] text-[9px] uppercase">Unidad Educativa Guayaquil • \\1</p>
                
                <!-- Subtle Visitor Counter -->
                <div class="opacity-20 hover:opacity-100 transition-opacity duration-500 filter grayscale hover:grayscale-0">
                    <img src="https://hits.sh/dannygh1805-cell.github.io/ecosistema-redes.svg?style=for-the-badge&label=VISITANTES&color=00F5FF&labelColor=0B1221" alt="Contador de Visitas" class="h-5 rounded-md">
                </div>

                <p class="text-gray-700 text-[9px] uppercase tracking-widest">AMIE 18H00087 • Ambato, Ecuador</p>
            </div>"""

pattern = re.compile(
    r'<div class="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">\s*'
    r'<p class="text-gray-600 font-bold tracking-\[0\.2em\] text-\[9px\] uppercase">Unidad Educativa Guayaquil • (.*?)</p>\s*'
    r'<p class="text-gray-700 text-\[9px\] uppercase tracking-widest">AMIE 18H00087 • Ambato, Ecuador</p>\s*'
    r'</div>'
)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern.sub(replacement, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Counters added to malla and laboratorio.")
