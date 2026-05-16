import re

files = ['index.html', 'laboratorio.html', 'recursos.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    print(f'=== {f} ===')
    
    # Find all z-index values on fixed/absolute elements
    zmatches = re.findall(r'class="[^"]*(?:fixed|absolute)[^"]*z-\[(\d+)\][^"]*"', content)
    print('  z-indexes found:', sorted(set(int(z) for z in zmatches)))
    
    # Find mobile menu z-index
    menu_match = re.search(r'id="mobile-menu"[^>]*z-\[(\d+)\]', content)
    print('  mobile-menu z-index:', menu_match.group(1) if menu_match else 'NOT FOUND')
    
    # Find elements with opacity-0 pointer-events-none that start visible (potential issue)
    blockers = re.findall(r'id="([^"]+)"[^>]*(?:opacity-0[^"]*pointer-events-none|pointer-events-none[^"]*opacity-0)', content)
    print('  opacity-0+pointer-events-none elements:', blockers)

    # Find any fixed overlay elements (potential blockers)
    fixed_overlays = re.findall(r'id="([^"]+)"[^>]*fixed inset-0', content)
    print('  fixed inset-0 elements:', fixed_overlays)
    print()
