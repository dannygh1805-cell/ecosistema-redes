/**
 * RT HUB - Global Smart Chatbot Logic v2.0
 * - Inyecta el HTML del chatbot dinámicamente (sin duplicar en cada página)
 * - Motor NLP básico con base de conocimiento ampliada
 * - Chips de respuesta rápida para mejor UX
 */

/* ─── 0. INYECCIÓN DINÁMICA DEL HTML DEL CHATBOT ──────────────── */
(function injectChatbotUI() {
    if (document.getElementById('ai-chat-interface')) return; // ya existe

    const chatbotHTML = `
    <style>
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,245,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,245,255,0.5); }
        #chatbot-wrapper .chip-btn {
            display: inline-block; padding: 0.3rem 0.75rem; margin: 0.2rem;
            border: 1px solid rgba(0,245,255,0.3); border-radius: 99px;
            color: #00F5FF; font-size: 0.65rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.08em;
            cursor: pointer; background: rgba(0,245,255,0.05);
            transition: all 0.2s;
        }
        #chatbot-wrapper .chip-btn:hover { background: rgba(0,245,255,0.15); }
    </style>
    <div id="chatbot-wrapper" class="fixed bottom-20 lg:bottom-6 right-6 z-[500] flex flex-col items-end justify-end" style="pointer-events:none;">
        <!-- Chat Interface -->
        <div id="ai-chat-interface"
             class="bg-[#0B1221]/95 backdrop-blur-xl border border-[#00F5FF]/30 rounded-2xl rounded-br-none mb-4 mr-1 shadow-[0_0_30px_rgba(0,245,255,0.15)] flex flex-col transform transition-all duration-500 opacity-0 translate-y-4 overflow-hidden relative"
             style="pointer-events:none; width:320px;">
            <!-- Header -->
            <div style="background:linear-gradient(to right,#112240,#0B1221); padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <div style="width:0.5rem;height:0.5rem;background:#00F5FF;border-radius:50%;animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;"></div>
                    <div>
                        <h4 style="font-size:0.65rem;font-weight:700;color:white;text-transform:uppercase;letter-spacing:0.1em;line-height:1;">Guía Vocacional</h4>
                        <span style="font-size:0.55rem;color:#00F5FF;font-weight:700;">ONLINE</span>
                    </div>
                </div>
                <button onclick="toggleChat()" style="color:#94A3B8;background:none;border:none;cursor:pointer;font-size:1rem;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#94A3B8'">✕</button>
            </div>
            <!-- History -->
            <div id="chat-history" class="custom-scrollbar" style="padding:1rem;overflow-y:auto;display:flex;flex-direction:column;gap:0.75rem;height:280px;scroll-behavior:smooth;"></div>
            <!-- Input -->
            <div style="padding:0.75rem;border-top:1px solid rgba(255,255,255,0.1);background:rgba(6,13,26,0.5);display:flex;gap:0.5rem;align-items:center;">
                <input type="text" id="chat-input" placeholder="Pregúntame algo..."
                       style="flex:1;background:transparent;border:none;color:white;font-size:0.875rem;outline:none;padding:0 0.5rem;font-family:'Inter',sans-serif;"
                       onkeypress="handleUserMessage(event)">
                <button onclick="handleUserMessage()" style="color:#00F5FF;background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:50%;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='none'">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
        <!-- Mascot Trigger -->
        <div class="relative cursor-pointer group" style="pointer-events:auto;" onclick="toggleChat()">
            <!-- Tooltip Proactivo -->
            <div id="mascot-tooltip" class="absolute bottom-full right-0 mb-3 bg-[#00F5FF] text-[#0B1221] text-xs font-black px-4 py-2.5 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(0,245,255,0.6)] whitespace-nowrap opacity-0 pointer-events-none transition-all duration-500 transform translate-y-2 z-50">
                ¡Hola! ¿Dudas sobre la carrera? 👋
                <div class="absolute -bottom-1.5 right-4 w-3 h-3 bg-[#00F5FF] transform rotate-45"></div>
            </div>
            
            <div style="position:absolute;inset:0;background:#00F5FF;filter:blur(1.5rem);border-radius:50%;opacity:0.3;transition:opacity 0.3s;" class="mascot-glow"></div>
            <div id="mascot-container" class="relative z-10 overflow-hidden"
                 style="width:5rem;height:5rem;border-radius:50%;border:2px solid transparent;box-shadow:0 0 20px rgba(0,245,255,0.4);background:#0B1221;display:flex;align-items:center;justify-content:center;transition:border-color 0.3s;">
                <img src="MATERIAL PROMOCION/MASCOTA REDES/MASCOTA REDES.png"
                     id="mascot-img"
                     style="width:100%;height:100%;object-fit:cover;object-position:top;transform:scale(1.15);transition:all 0.3s;"
                     alt="Asistente Virtual">
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Hover glow effect
    const wrapper = document.getElementById('chatbot-wrapper');
    const mascotWrapper = wrapper ? wrapper.querySelector('.group') : null;
    if (mascotWrapper) {
        mascotWrapper.addEventListener('mouseenter', () => {
            const glow = mascotWrapper.querySelector('.mascot-glow');
            if (glow) glow.style.opacity = '0.6';
            mascotWrapper.style.transform = 'translateY(-0.5rem)';
        });
        mascotWrapper.addEventListener('mouseleave', () => {
            const glow = mascotWrapper.querySelector('.mascot-glow');
            if (glow) glow.style.opacity = '0.3';
            mascotWrapper.style.transform = 'translateY(0)';
        });
    }
})();

/* ─── 1. BASE DE CONOCIMIENTO AMPLIADA ────────────────────────── */
const botKnowledge = [
    {
        keywords: ["inscripcion", "inscribir", "matricula", "cupo", "requisito", "entrar", "ingresar", "como entro", "quiero estudiar", "postular", "formulario", "matriz", "registro", "anotarme", "matricular a mi hijo", "como le inscribo", "hay cupos", "donde me registro", "link de registro", "donde mando los datos"],
        response: "El proceso oficial requiere: Estudiantes de la institución en DECE. Externos acercarse físicamente. Para anticipar tu interés, debes llenar el formulario en la <a href='recursos.html#matriz' class='text-rt-cyan underline font-bold'>Matriz Oficial de Registro</a>."
    },
    {
        keywords: ["malla", "materias", "aprender", "enseñan", "curriculo", "estudiar", "programacion", "que se ve", "que estudian", "modulos", "que voy a aprender", "que clases dan", "enseñan a hackear", "arreglar computadoras", "computacion"],
        response: "El currículo oficial consta de 5 módulos (Redes, Instalación, Administración, Diseño y Sistemas). Te invito a explorar los detalles y proyectos de cada materia en la <a href='malla.html' class='text-rt-cyan underline font-bold'>Malla Curricular Interactiva</a>."
    },
    {
        keywords: ["que es", "de que trata", "que hacen", "perfil profesional", "para que sirve"],
        response: "Formamos técnicos en diseño, configuración, y mantenimiento de redes (LAN, WAN, WLAN) y ciberseguridad. Puedes ver el resumen de nuestra visión en la <a href='index.html' class='text-rt-cyan underline font-bold'>Página Principal (Ecosistema)</a>."
    },
    {
        keywords: ["costo", "precio", "pagar", "pension", "mensualidad", "dinero", "gratis", "cobran", "cuanto hay que pagar", "es particular", "cuesta", "es de pago", "hay que pagar matricula"],
        response: "¡Somos institución pública! <b>No tiene costo</b> de pensión mensual. Es bachillerato técnico gratuito con infraestructura de nivel industrial."
    },
    {
        keywords: ["laboratorio", "equipos", "computadoras", "practica", "rack", "cisco", "router", "switch", "fibra", "tienen buen internet", "hay compus buenas", "computadoras propias", "puedo jugar", "maquina"],
        response: "¡Infraestructura grado industrial! Racks Cisco, empalmadoras de fibra óptica, servidores dedicados. Explora el <a href='laboratorio.html' class='text-rt-cyan underline'>Tour Virtual del Laboratorio</a>."
    },
    {
        keywords: ["hola", "buenas", "saludos", "buenos dias", "buenas tardes", "buenas noches", "hi", "hey"],
        response: "¡Hola! Soy el asistente de Redes y Telecomunicaciones. Pregúntame sobre inscripciones, materias, laboratorios, horarios o salidas laborales 😊"
    },
    {
        keywords: ["ecosistema", "inicio", "principal", "portal", "menu", "navegar", "donde estoy", "ver todo", "tour"],
        response: "Bienvenido al Ecosistema Digital. Desde aquí puedes navegar a la <a href='malla.html' class='text-rt-cyan underline'>Malla Curricular</a>, explorar los <a href='laboratorio.html' class='text-rt-cyan underline'>Laboratorios</a> o llenar tu <a href='recursos.html#matriz' class='text-rt-cyan underline font-bold'>Matriz de Registro</a>."
    },
    {
        keywords: ["empleo", "trabajo", "futuro", "empleabilidad", "sueldo", "salario", "ganar", "paga", "campo ocupacional", "mi hijo consigue trabajo", "camello", "encuentro camello", "hay trabajo"],
        response: "Podrás desempeñarte como: Técnico de diseño y mantenimiento de redes, Técnico en ciberseguridad, o Asistente de infraestructura. El campo ocupacional incluye proveedores de internet (ISP), empresas de telecomunicaciones (CNT, Netlife), e instituciones públicas o privadas."
    },
    {
        keywords: ["universidad", "instituto", "continuar", "superior", "uta", "espe", "espoch", "carrera universitaria", "sale con titulo de que", "sirve para la universidad", "titulo de que", "ir a la universidad despues", "puedo ir a la u"],
        response: "Tu título técnico te articula directamente con UTA, ESPE, ESPOCH e Institutos Superiores para Ingeniería en Telecomunicaciones. ¡Sin examen de acceso adicional!"
    },
    {
        keywords: ["duracion", "cuanto dura", "años", "tiempo", "semestre", "bachillerato"],
        response: "El bachillerato técnico dura <b>3 años</b> (1ero, 2do y 3er año de BGU). En 3er año realizas las <b>160 horas de prácticas FCT</b> en empresas reales."
    },
    {
        keywords: ["cisco", "ccna", "certificacion", "certificado"],
        response: "Trabajamos con equipos Cisco reales y el simulador oficial Packet Tracer de Cisco NetAcad. La formación está alineada con el currículo CCNA para futura certificación."
    },
    {
        keywords: ["practicas", "fct", "empresa", "pasantia"],
        response: "Las FCT (Formación en Centros de Trabajo) son <b>160 horas garantizadas</b> en empresas como CNT EP, Telconet, EEASA o el GAD Municipal Ambato."
    },
    {
        keywords: ["donde queda", "ubicacion", "direccion", "campus", "pishilata", "como llegar"],
        response: "📍 Campus Pishilata: Av. Bolivariana y Francisco Navarrete, Ambato. <a href='https://www.google.com/maps?q=Av+Bolivariana+Francisco+Navarrete+Ambato+Ecuador' target='_blank' class='text-rt-cyan underline'>Ver en Maps</a>."
    },
    {
        keywords: ["horario", "turno", "mañana", "tarde", "clases", "jornada"],
        response: "La especialidad técnica se imparte en <b>Jornada Vespertina</b> (13:00 a 19:00) para aprovechar mejor los laboratorios. Las prácticas FCT se ajustan al horario de la empresa."
    },
    {
        keywords: ["uniforme", "ropa", "vestimenta", "diario", "cultura fisica"],
        response: "Se utilizan los uniformes oficiales de la U.E. Guayaquil (Parada, Diario y Cultura Física). Para el laboratorio de fibra óptica, proveemos mandiles de seguridad gratuitos."
    },
    {
        keywords: ["laptop", "computadora", "necesito comprar", "internet", "pc"],
        response: "¡No es obligatorio comprar una laptop! Tenemos 2 laboratorios equipados con PCs Core i7 e internet de fibra óptica donde harás todas tus prácticas."
    },
    {
        keywords: ["dificil", "matematicas", "programar", "no se nada", "dificultad", "empezar de cero", "es dificil redes", "es yuca", "esta frito", "es pelado", "pesado", "se me va a hacer pesado"],
        response: "¡No te preocupes! Empezamos desde cero absoluto. Aprenderás a ponchar cables y configurar routers paso a paso. La lógica matemática se desarrolla con la práctica."
    },
    {
        keywords: ["titulo", "bachiller", "me gradúo", "titulacion"],
        response: "Te gradúas como <b>Bachiller Técnico en Redes y Telecomunicaciones</b>. Es un título oficial del Ministerio de Educación que te permite trabajar inmediatamente o ir a la universidad."
    },
    {
        keywords: ["profesores", "docentes", "rector", "coordinador", "autoridades"],
        response: "Contamos con un equipo de Ingenieros en Telecomunicaciones y Sistemas certificados, liderados por expertos en infraestructura de red y ciberseguridad."
    }
];

const fallbackResponse = "Entiendo. Para consultas específicas sobre admisiones o visitas, contacta directo a la coordinación en la <a href='recursos.html#contacto' class='text-rt-cyan underline'>Sección de Contacto</a>. ¿Tienes alguna otra duda sobre la carrera?";

/* ─── 2. CHIPS DE RESPUESTA RÁPIDA (por página y contexto) ───── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Chips genéricos globales (fallback)
const chipsGeneral = [
    { label: "🎓 ¿Qué título obtengo?", text: "titulo" },
    { label: "⏰ Horarios", text: "horario" },
    { label: "💻 ¿Necesito Laptop?", text: "laptop" },
    { label: "💼 Empleabilidad", text: "empleabilidad" },
    { label: "📋 Inscribirme", text: "formulario" },
    { label: "💰 ¿Es gratis?", text: "gratis" },
];

// Chips para Inicio (index.html) - Padres y estudiantes que llegan por primera vez
const chipsIndex = [
    { label: "🤔 ¿De qué trata?", text: "de que trata" },
    { label: "💰 ¿Es gratis?", text: "gratis" },
    { label: "📋 Quiero inscribirme", text: "formulario" },
    { label: "🏫 ¿Dónde queda?", text: "ubicacion" },
    { label: "⏰ Horarios", text: "horario" },
    { label: "🎓 ¿Qué título obtengo?", text: "titulo" },
];

// Chips para Malla Curricular - Estudiantes curiosos por las materias
const chipsMalla = [
    { label: "📡 ¿Qué módulos hay?", text: "modulos" },
    { label: "🔧 ¿Es muy difícil?", text: "dificil" },
    { label: "🏢 Prácticas en empresa", text: "practicas" },
    { label: "🌐 Cisco y Certificación", text: "cisco" },
    { label: "🎓 ¿Qué título obtengo?", text: "titulo" },
    { label: "📋 Inscribirme", text: "formulario" },
];

// Chips para Laboratorio - Estudiantes entusiastas de la tecnología
const chipsLaboratorio = [
    { label: "🖥️ ¿Qué equipos usan?", text: "equipos" },
    { label: "📡 ¿Usan Cisco real?", text: "cisco" },
    { label: "💻 ¿Necesito mi PC?", text: "laptop" },
    { label: "🌐 ¿Tienen internet?", text: "internet" },
    { label: "📋 Quiero inscribirme", text: "formulario" },
    { label: "💼 ¿Dónde trabajo después?", text: "trabajo" },
];

// Chips para Recursos - Padres listos para inscribir
const chipsRecursos = [
    { label: "📋 Llenar el formulario", text: "formulario" },
    { label: "🏫 Ya soy del plantel", text: "inscripcion" },
    { label: "🔗 Soy de otra institución", text: "como entro" },
    { label: "📞 Datos de contacto", text: "ubicacion" },
    { label: "⏰ Horarios de atención", text: "horario" },
    { label: "💰 ¿Cuánto cuesta?", text: "costo" },
];

// Selector dinámico de chips basado en la página actual
function getPageChips() {
    if (currentPage.includes('malla')) return chipsMalla;
    if (currentPage.includes('laboratorio')) return chipsLaboratorio;
    if (currentPage.includes('recursos')) return chipsRecursos;
    if (currentPage.includes('index') || currentPage === '' || currentPage === '/') return chipsIndex;
    return chipsGeneral;
}
const quickChips = getPageChips();

/* ─── 3. ESTADO DEL CHAT ─────────────────────────────────────── */
let isChatOpen = false;
let autoMessageTriggered = false;

/* ─── 4. INICIALIZACIÓN (Auto-Mensaje a los 5 segundos) ─────── */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!isChatOpen && !autoMessageTriggered) {
            autoMessageTriggered = true;
            if (window.innerWidth >= 768) {
                toggleChat();
            } else {
                const mc = document.getElementById('mascot-container');
                if (mc) { mc.style.animation = 'bounce 0.5s 4'; }
                
                const tooltip = document.getElementById('mascot-tooltip');
                if (tooltip) {
                    tooltip.classList.remove('opacity-0', 'translate-y-2');
                    tooltip.classList.add('opacity-100', 'translate-y-0');
                    setTimeout(() => {
                        if(tooltip) {
                            tooltip.classList.remove('opacity-100', 'translate-y-0');
                            tooltip.classList.add('opacity-0', 'translate-y-2');
                        }
                    }, 8000);
                }
            }
            const pageChips = getPageChips();
            let initialMsg = "¿Sabías que Redes tiene un <b>81.1% de empleabilidad</b>? Escíbeme tu pregunta o elige un tema:";
            if (currentPage.includes('malla')) initialMsg = "Aquí está todo lo que aprenderás. <b>Pregúntame sobre las materias, prácticas o el título que obtendrás.</b>";
            if (currentPage.includes('laboratorio')) initialMsg = "<b>¿Impresionante, verdad?</b> Esta será tu aula de trabajo real. ¿Te animas? Escríbeme tu duda.";
            if (currentPage.includes('recursos')) initialMsg = "Estás en la sección de inscripción. ¿Ya estás listo/a? ¡El <b>formulario oficial está aquí abajo</b>! ¿En qué te ayudo?";
            simulateBotTyping(initialMsg, true);
        }
    }, 5000);
});

/* ─── 5. INTERFAZ DE USUARIO ─────────────────────────────────── */

function toggleChat() {
    const chatInterface = document.getElementById('ai-chat-interface');
    const mascotContainer = document.getElementById('mascot-container');
    const mascotImg = document.getElementById('mascot-img');
    const tooltip = document.getElementById('mascot-tooltip');
    
    if (!chatInterface) return;

    // Ocultar tooltip si se abre el chat
    if (tooltip) {
        tooltip.classList.remove('opacity-100', 'translate-y-0');
        tooltip.classList.add('opacity-0', 'translate-y-2');
    }

    const staticSrc = 'MATERIAL PROMOCION/MASCOTA REDES/MASCOTA REDES.png';
    const gifSrc = 'MATERIAL PROMOCION/GIF PARA GUIA/WhatsApp Video 2026-05-13 at 23.10.53.gif';

    isChatOpen = !isChatOpen;

    if (isChatOpen) {
        chatInterface.style.pointerEvents = 'auto';
        chatInterface.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        chatInterface.classList.add('opacity-100', 'translate-y-0');
        if (mascotContainer) mascotContainer.style.borderColor = '#00F5FF';
        if (mascotImg) { mascotImg.src = gifSrc; mascotImg.style.objectPosition = 'center'; }
        setTimeout(() => { const inp = document.getElementById('chat-input'); if (inp) inp.focus(); }, 300);
    } else {
        chatInterface.style.pointerEvents = 'none';
        chatInterface.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        chatInterface.classList.remove('opacity-100', 'translate-y-0');
        if (mascotContainer) mascotContainer.style.borderColor = 'transparent';
        if (mascotImg) { mascotImg.src = staticSrc; mascotImg.style.objectPosition = 'top'; }
    }
}

/* ─── 6. MENSAJES ─────────────────────────────────────────────── */
function handleUserMessage(event) {
    if (event && event.type === 'keypress' && event.key !== 'Enter') return;
    const inputField = document.getElementById('chat-input');
    const userText = inputField.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    inputField.value = '';
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const response = findBestResponse(userText.toLowerCase());
        appendMessage(response, 'bot');
    }, 900 + Math.random() * 800);
}

function sendChip(text) {
    const inputField = document.getElementById('chat-input');
    if (inputField) { inputField.value = text; handleUserMessage(); }
}

function findBestResponse(userText) {
    const normalized = userText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const item of botKnowledge) {
        for (const kw of item.keywords) {
            if (normalized.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) return item.response;
        }
    }
    return fallbackResponse;
}

function appendMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    if (!chatHistory) return;
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `display:flex;width:100%;justify-content:${sender === 'user' ? 'flex-end' : 'flex-start'};`;
    const msgDiv = document.createElement('div');
    if (sender === 'user') {
        msgDiv.style.cssText = 'max-width:85%;border-radius:1rem 1rem 0.25rem 1rem;padding:0.6rem 0.85rem;font-size:0.8rem;background:#00F5FF;color:#0B1221;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,0.2);';
    } else {
        msgDiv.style.cssText = 'max-width:88%;border-radius:1rem 1rem 1rem 0.25rem;padding:0.6rem 0.85rem;font-size:0.8rem;background:rgba(255,255,255,0.08);color:#E2E8F0;border:1px solid rgba(255,255,255,0.06);line-height:1.5;';
    }
    msgDiv.innerHTML = text;
    wrapper.appendChild(msgDiv);
    chatHistory.appendChild(wrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function simulateBotTyping(text, showChips = false) {
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        appendMessage(text, 'bot');
        if (showChips) appendQuickChips();
    }, 1500);
}

function appendQuickChips() {
    const chatHistory = document.getElementById('chat-history');
    if (!chatHistory) return;
    const chipsWrapper = document.createElement('div');
    chipsWrapper.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.25rem;padding:0.25rem 0;';
    chipsWrapper.id = 'quick-chips';
    quickChips.forEach(chip => {
        const btn = document.createElement('button');
        btn.className = 'chip-btn';
        btn.textContent = chip.label;
        btn.onclick = () => {
            const el = document.getElementById('quick-chips');
            if (el) el.remove();
            sendChip(chip.text);
        };
        chipsWrapper.appendChild(btn);
    });
    chatHistory.appendChild(chipsWrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showTypingIndicator() {
    const chatHistory = document.getElementById('chat-history');
    if (!chatHistory) return;
    const wrapper = document.createElement('div');
    wrapper.id = 'typing-indicator-wrapper';
    wrapper.style.cssText = 'display:flex;width:100%;justify-content:flex-start;';
    const dot = () => {
        const d = document.createElement('div');
        d.style.cssText = 'width:6px;height:6px;background:#00F5FF;border-radius:50%;animation:bounce 0.6s infinite;';
        return d;
    };
    const typingDiv = document.createElement('div');
    typingDiv.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.06);border-radius:1rem 1rem 1rem 0.25rem;padding:0.6rem 0.9rem;display:flex;gap:4px;align-items:center;';
    [0, 0.15, 0.3].forEach((delay, i) => {
        const d = dot();
        d.style.animationDelay = delay + 's';
        typingDiv.appendChild(d);
    });
    wrapper.appendChild(typingDiv);
    chatHistory.appendChild(wrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator-wrapper');
    if (el) el.remove();
}
