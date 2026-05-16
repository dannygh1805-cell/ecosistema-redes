import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    # Replace the mobile menu div opening tag - start hidden with display:none
    content = content.replace(
        'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[150] opacity-0 pointer-events-none transition-all duration-300" style="display:flex; flex-direction:column; align-items:center; justify-content:center;"',
        'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[150]" style="display:none; flex-direction:column; align-items:center; justify-content:center; opacity:0; transition: opacity 0.3s ease; pointer-events:none;"'
    )
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Updated: {f}')
print('Done.')
