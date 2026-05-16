files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

OLD = 'class="fixed bottom-6 right-6 z-[500] flex items-end justify-end gs_reveal"'
NEW = 'class="fixed bottom-6 right-6 z-[500] flex items-end justify-end gs_reveal" style="pointer-events:none;"'

OLD_MASCOT = 'class="relative cursor-pointer group hover:-translate-y-2 transition-transform duration-300" onclick="toggleChat()"'
NEW_MASCOT = 'class="relative cursor-pointer group hover:-translate-y-2 transition-transform duration-300" style="pointer-events:auto;" onclick="toggleChat()"'

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    content = content.replace(OLD, NEW)
    content = content.replace(OLD_MASCOT, NEW_MASCOT)
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Fixed: {f}')

print('Done.')
