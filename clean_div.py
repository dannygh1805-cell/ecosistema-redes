import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Remove the stray extra closing div that got added after the mobile menu
    content = content.replace('    </div>\n\n    <!-- IMMERSIVE', '\n    <!-- IMMERSIVE')
    content = content.replace('    </div>\n\n    <!-- CONTENT', '\n    <!-- CONTENT')
    content = content.replace('    </div>\n\n    <!-- HERO', '\n    <!-- HERO')
    content = content.replace('    </div>\n\n    <!-- INFO', '\n    <!-- INFO')
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Cleaned: {f}')
print('Done.')
