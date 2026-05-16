import os
import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']

replacements = [
    # Tailwind color config
    ("'rt-navy': '#00040A'", "'rt-navy': '#0B1221'"),
    ('"rt-navy": "#00040A"', '"rt-navy": "#0B1221"'),
    
    # Body background
    ('background-color: #00040A;', 'background-color: #0B1221;'),
    
    # Glass header
    ('background: rgba(0, 4, 10, 0.85);', 'background: rgba(11, 18, 33, 0.90);'),
    ('background: rgba(0, 4, 10, 0.9);',  'background: rgba(11, 18, 33, 0.95);'),
    
    # Inline bg classes
    ('bg-[#00040A]', 'bg-[#0B1221]'),
    ('bg-[#00040A]/98', 'bg-[#0B1221]/98'),
    ('bg-[#00040A]/95', 'bg-[#0B1221]/95'),
    
    # Navy sections — rt-blue stays but update the hardcoded one
    ("'rt-blue': '#001D3D'", "'rt-blue': '#112240'"),
    
    # Gradients to/from navy
    ('from-[#00040A]', 'from-[#0B1221]'),
    ('to-[#00040A]',   'to-[#0B1221]'),
    ('via-[#00040A]',  'via-[#0B1221]'),
    
    # Section backgrounds
    ('bg-black', 'bg-[#060d1a]'),
    
    # Section dividers / darker panels
    ('bg-rt-navy/50',  'bg-[#0B1221]/50'),
    ('bg-rt-navy/80',  'bg-[#0B1221]/80'),
    ('bg-rt-navy/95',  'bg-[#0B1221]/95'),
    ('bg-rt-navy',     'bg-[#0B1221]'),
    
    # Card glass surfaces — make them slightly brighter
    ("'rt-glass': 'rgba(255, 255, 255, 0.02)'",  "'rt-glass': 'rgba(255, 255, 255, 0.05)'"),
    ("'rt-glass': 'rgba(255, 255, 255, 0.03)'",  "'rt-glass': 'rgba(255, 255, 255, 0.06)'"),
    ('border: 1px solid rgba(255, 255, 255, 0.05);', 'border: 1px solid rgba(255, 255, 255, 0.08);'),
    ('border border-white/5',  'border border-white/10'),
    
    # Nav link color
    ('color: #A0AEC0;', 'color: #94A3B8;'),
    
    # Gradient text (stat number) — keep cyan but ensure white base is warm
    ('from-[#00040A]/50', 'from-[#0B1221]/50'),
    
    # Mobile menu overlay
    ('bg-[#0B1221]/98 backdrop-blur-2xl', 'bg-[#0B1221]/97 backdrop-blur-2xl'),
]

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {fname}')

print('Palette update complete!')
