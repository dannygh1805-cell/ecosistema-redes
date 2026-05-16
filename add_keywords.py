import re

file_path = r'c:\PROMOCION REDES\js\chatbot.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    r'keywords: \["inscripcion", "inscribir", "matricula", "cupo", "requisito", "entrar", "ingresar", "como entro", "quiero estudiar", "postular", "formulario", "matriz", "registro", "anotarme"\]': 
    'keywords: ["inscripcion", "inscribir", "matricula", "cupo", "requisito", "entrar", "ingresar", "como entro", "quiero estudiar", "postular", "formulario", "matriz", "registro", "anotarme", "matricular a mi hijo", "como le inscribo", "hay cupos", "donde me registro", "link de registro", "donde mando los datos"]',
    
    r'keywords: \["malla", "materias", "aprender", "enseñan", "curriculo", "estudiar", "programacion", "que se ve", "que estudian", "modulos"\]':
    'keywords: ["malla", "materias", "aprender", "enseñan", "curriculo", "estudiar", "programacion", "que se ve", "que estudian", "modulos", "que voy a aprender", "que clases dan", "enseñan a hackear", "arreglar computadoras", "computacion"]',
    
    r'keywords: \["costo", "precio", "pagar", "pension", "mensualidad", "dinero", "gratis", "cobran"\]':
    'keywords: ["costo", "precio", "pagar", "pension", "mensualidad", "dinero", "gratis", "cobran", "cuanto hay que pagar", "es particular", "cuesta", "es de pago", "hay que pagar matricula"]',
    
    r'keywords: \["laboratorio", "equipos", "computadoras", "practica", "rack", "cisco", "router", "switch", "fibra"\]':
    'keywords: ["laboratorio", "equipos", "computadoras", "practica", "rack", "cisco", "router", "switch", "fibra", "tienen buen internet", "hay compus buenas", "computadoras propias", "puedo jugar", "maquina"]',
    
    r'keywords: \["empleo", "trabajo", "futuro", "empleabilidad", "sueldo", "salario", "ganar", "paga", "campo ocupacional"\]':
    'keywords: ["empleo", "trabajo", "futuro", "empleabilidad", "sueldo", "salario", "ganar", "paga", "campo ocupacional", "mi hijo consigue trabajo", "camello", "encuentro camello", "hay trabajo"]',
    
    r'keywords: \["universidad", "instituto", "continuar", "superior", "uta", "espe", "espoch", "carrera universitaria"\]':
    'keywords: ["universidad", "instituto", "continuar", "superior", "uta", "espe", "espoch", "carrera universitaria", "sale con titulo de que", "sirve para la universidad", "titulo de que", "ir a la universidad despues", "puedo ir a la u"]',
    
    r'keywords: \["dificil", "matematicas", "programar", "no se nada", "dificultad", "empezar de cero"\]':
    'keywords: ["dificil", "matematicas", "programar", "no se nada", "dificultad", "empezar de cero", "es dificil redes", "es yuca", "esta frito", "es pelado", "pesado", "se me va a hacer pesado"]'
}

for old, new in replacements.items():
    content = re.sub(old, new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Keywords updated!")
