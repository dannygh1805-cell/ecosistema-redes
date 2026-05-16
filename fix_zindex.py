files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    # Fix z-index of mobile menu overlay from 150 to 9999
    content = content.replace(
        'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[150]"',
        'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[9999]"'
    )
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Fixed z-index in: {f}')
print('Done.')
