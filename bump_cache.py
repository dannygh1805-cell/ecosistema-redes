import os
import re

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'src="js/chatbot\.js\?v=3\.0"', 'src="js/chatbot.js?v=3.1"', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Cache busters updated to 3.1.")
