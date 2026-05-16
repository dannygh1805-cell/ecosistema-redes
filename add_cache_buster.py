import os

files = ['index.html', 'malla.html', 'laboratorio.html', 'recursos.html']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove any existing ?v= query strings just in case
    import re
    content = re.sub(r'src="js/shared\.js(\?v=[0-9.]+)?', 'src="js/shared.js?v=3.0', content)
    content = re.sub(r'src="js/chatbot\.js(\?v=[0-9.]+)?', 'src="js/chatbot.js?v=3.0', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("Cache busters updated.")
