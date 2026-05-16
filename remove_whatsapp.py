import re

files = ['index.html', 'malla.html', 'laboratorio.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the whatsapp social media icon
    content = re.sub(
        r'<a href="https://wa\.me/5930324089700".*?<i class="fa-brands fa-whatsapp text-xs"></i></a>\s*',
        '',
        content
    )
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Removed whatsapp link from footers")
