/**
 * RT HUB - Global Smart Chatbot Logic
 * Motor NPL Básico Basado en Palabras Clave
 */

// 1. Base de Conocimiento (Knowledge Base)
const botKnowledge = [
    {
        keywords: ["inscripcion", "inscribir", "matricula", "cupo", "requisito", "entrar", "ingresar"],
        response: "¡Excelente decisión! Las inscripciones para el periodo 2026 tienen cupos limitados. Puedes ver los números de contacto y el correo institucional en nuestra <a href='recursos.html' class='text-rt-cyan underline'>Sección de Recursos</a>."
    },
    {
        keywords: ["malla", "materias", "aprender", "enseñan", "curriculo", "estudiar", "programacion"],
        response: "Nuestra Malla Curricular incluye Sistemas Operativos, Ciberseguridad, Redes Lan/Wan y Programación. Aprenderás de forma 100% práctica. Conoce todos los detalles en la <a href='malla.html' class='text-rt-cyan underline'>Malla Curricular</a>."
    },
    {
        keywords: ["costo", "precio", "pagar", "pension", "mensualidad", "dinero"],
        response: "Somos la Unidad Educativa Guayaquil, una institución educativa de carácter público. ¡Nuestra formación técnica de élite no tiene costo de pensión mensual!"
    },
    {
        keywords: ["laboratorio", "equipos", "computadoras", "practica", "rack", "cisco", "router"],
        response: "Contamos con infraestructura de grado industrial. Podrás configurar Racks, Switches y Routers reales desde tu primer año. Echa un vistazo al <a href='laboratorio.html' class='text-rt-cyan underline'>Tour de Laboratorio</a>."
    },
    {
        keywords: ["hola", "buenas", "saludos", "buenos dias", "buenas tardes"],
        response: "¡Hola! Soy el asistente virtual de Redes y Telecomunicaciones. ¿En qué te puedo ayudar hoy? (Ej. Pregúntame sobre materias, inscripciones o laboratorios)."
    },
    {
        keywords: ["empleo", "trabajo", "futuro", "empleabilidad", "sueldo"],
        response: "¡La carrera de Redes tiene un altísimo 81.1% de empleabilidad en Ambato! Es una de las industrias con mayor crecimiento y mejores salarios. Garantizamos tu preparación para el mundo real."
    },
    {
        keywords: ["universidad", "instituto", "continuar", "superior", "uta", "espe"],
        response: "Nuestros estudiantes tienen articulación directa con instituciones de educación superior como la UTA, ESPE y ESPOCH para continuar Ingenierías o Tecnologías en Telecomunicaciones."
    }
];

const fallbackResponse = "Entiendo. Para consultas muy específicas, te recomiendo contactar directamente a la coordinación técnica en la <a href='recursos.html' class='text-rt-cyan underline'>Sección de Contacto</a>. ¿Hay algo más sobre la carrera en lo que pueda guiarte?";

// 2. Estado del Chat
let isChatOpen = false;
let autoMessageTriggered = false;

// 3. Inicialización (Auto-Mensaje Contextual a los 5 segundos)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!isChatOpen && !autoMessageTriggered) {
            autoMessageTriggered = true;
            toggleChat();
            
            // Context-aware auto message
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            let initialMsg = "¿Sabías que Redes tiene un altísimo índice de empleabilidad? <b>Escribe cualquier pregunta</b> que tengas sobre la carrera.";
            if (currentPage.includes('malla')) initialMsg = "¡Nuestros alumnos aprenden configurando hardware real! <b>Pregúntame sobre nuestros laboratorios o materias.</b>";
            if (currentPage.includes('laboratorio')) initialMsg = "Este es nuestro corazón técnico. <b>¿Tienes alguna duda sobre los equipos o cómo inscribirte?</b>";
            if (currentPage.includes('recursos')) initialMsg = "Estás en la sección correcta para descargar documentación. <b>¿Tienes alguna pregunta antes de iniciar tu inscripción?</b>";

            simulateBotTyping(initialMsg);
        }
    }, 5000);
});

// 4. Lógica de Interfaz de Usuario
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if(menu) {
        if(menu.classList.contains('opacity-0')) {
            menu.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        } else {
            menu.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }
    }
}

function toggleChat() {
    const chatInterface = document.getElementById('ai-chat-interface');
    const mascotContainer = document.getElementById('mascot-container');
    const mascotImg = document.getElementById('mascot-img');
    
    const staticSrc = 'MATERIAL PROMOCION/MASCOTA REDES/MASCOTA REDES.png';
    const gifSrc = 'MATERIAL PROMOCION/GIF PARA GUIA/WhatsApp Video 2026-05-13 at 23.10.53.gif';
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        // OPEN CHAT
        chatInterface.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        chatInterface.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        if(mascotContainer) mascotContainer.classList.add('border-rt-cyan'); // highlight mascot
        
        // Cambiar a GIF (Activado)
        if(mascotImg) {
            mascotImg.src = gifSrc;
            mascotImg.className = "w-full h-full object-cover object-center scale-110 transition-all duration-300";
        }
        
        // Focus input after transition
        setTimeout(() => {
            const input = document.getElementById('chat-input');
            if(input) input.focus();
        }, 300);
    } else {
        // CLOSE CHAT
        chatInterface.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        chatInterface.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        if(mascotContainer) mascotContainer.classList.remove('border-rt-cyan');
        
        // Cambiar a PNG Estático (Inactivo)
        if(mascotImg) {
            mascotImg.src = staticSrc;
            mascotImg.className = "w-full h-full object-cover object-top scale-[1.15] transition-all duration-300";
        }
    }
}

// 5. Procesamiento de Mensajes
function handleUserMessage(event) {
    // If event exists, ensure it's the Enter key
    if (event && event.type === 'keypress' && event.key !== 'Enter') return;
    
    const inputField = document.getElementById('chat-input');
    const userText = inputField.value.trim();
    
    if (!userText) return;

    // 1. Añadir el mensaje del usuario a la UI
    appendMessage(userText, 'user');
    inputField.value = '';

    // 2. Simular que el bot está escribiendo y responder
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = findBestResponse(userText.toLowerCase());
        appendMessage(botResponse, 'bot');
    }, 1000 + Math.random() * 1000); // Retraso realista de 1 a 2 segundos
}

// 6. Motor de Búsqueda de Palabras Clave
function findBestResponse(userText) {
    // Remover tildes para facilitar la búsqueda
    const normalizedText = userText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    for (const item of botKnowledge) {
        for (const keyword of item.keywords) {
            if (normalizedText.includes(keyword)) {
                return item.response;
            }
        }
    }
    return fallbackResponse;
}

// 7. Manipulación del DOM (Construcción Visual del Chat)
function appendMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    const msgWrapper = document.createElement('div');
    msgWrapper.className = `flex w-full ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
    
    const msgDiv = document.createElement('div');
    
    if (sender === 'user') {
        msgDiv.className = 'max-w-[85%] rounded-2xl rounded-tr-sm p-3 text-sm bg-rt-cyan text-rt-navy font-medium shadow-md';
    } else {
        msgDiv.className = 'max-w-[85%] rounded-2xl rounded-tl-sm p-3 text-sm bg-white/10 text-gray-200 border border-white/5 leading-relaxed';
    }
    
    msgDiv.innerHTML = text;
    msgWrapper.appendChild(msgDiv);
    chatHistory.appendChild(msgWrapper);
    
    // Auto-scroll
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function simulateBotTyping(text) {
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        appendMessage(text, 'bot');
    }, 1500);
}

function showTypingIndicator() {
    const chatHistory = document.getElementById('chat-history');
    
    const wrapper = document.createElement('div');
    wrapper.id = 'typing-indicator-wrapper';
    wrapper.className = 'flex w-full justify-start';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bg-white/10 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex gap-1 items-center';
    typingDiv.innerHTML = '<div class="w-1.5 h-1.5 bg-rt-cyan rounded-full animate-bounce"></div><div class="w-1.5 h-1.5 bg-rt-cyan rounded-full animate-bounce" style="animation-delay: 0.1s"></div><div class="w-1.5 h-1.5 bg-rt-cyan rounded-full animate-bounce" style="animation-delay: 0.2s"></div>';
    
    wrapper.appendChild(typingDiv);
    chatHistory.appendChild(wrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator-wrapper');
    if (indicator) indicator.remove();
}
