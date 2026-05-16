import re

with open('malla.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscamos el bloque del chatbot oculto y lo eliminamos
pattern = re.compile(r'<!-- CHATBOT \(inyectado dinámicamente por chatbot\.js\) -->\s*<div class="hidden">.*?</div>\s*</div>\s*<!-- CHATBOT LOGIC -->', re.DOTALL)
new_content = pattern.sub('<!-- CHATBOT LOGIC -->', content)

with open('malla.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Malla.html limpiada.")
