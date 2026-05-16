/**
 * RT HUB — Shared Utilities v2.0
 * Scroll progress bar, page transitions, active nav link
 */
(function () {
    /* ─── 1. PAGE FADE-IN ──────────────────────────────────────── */
    const pageStyle = document.createElement('style');
    pageStyle.textContent = `
        body { opacity: 0; transition: opacity 0.4s ease; }
        #scroll-progress {
            position: fixed; top: 0; left: 0; height: 3px; width: 0%;
            background: linear-gradient(90deg, #00F5FF 0%, #7DD3FC 100%);
            box-shadow: 0 0 12px rgba(0,245,255,0.7);
            z-index: 10000; pointer-events: none;
            transition: width 0.08s linear;
        }
    `;
    document.head.appendChild(pageStyle);

    document.addEventListener('DOMContentLoaded', function () {
        /* Fade in */
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { document.body.style.opacity = '1'; });
        });

        /* ─── 2. SCROLL PROGRESS BAR ─────────────────────────── */
        const bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.prepend(bar);

        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
        }, { passive: true });

        /* ─── 3. PAGE TRANSITIONS (fade-out on navigate) ────── */
        // Removed JS interceptor to ensure native navigation works flawlessly across all devices/local environments.
        // document.addEventListener('click', function (e) {
        //     const link = e.target.closest('a[href]');
        //     if (!link) return;
        //     const href = link.getAttribute('href');
        //     if (!href) return;
        //     if (href.startsWith('#')) return;
        //     if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        //     if (link.getAttribute('target') === '_blank') return;
        //     e.preventDefault();
        //     document.body.style.opacity = '0';
        //     setTimeout(() => { window.location.href = href; }, 380);
        // });

        /* ─── 4. SET ACTIVE NAV LINK (DESKTOP) ─────────────── */
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(function (link) {
            const href = (link.getAttribute('href') || '').split('#')[0];
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        /* ─── 5. MOBILE BOTTOM NAVIGATION BAR ──────────────── */
        const bottomNavHTML = `
        <div class="lg:hidden fixed bottom-0 left-0 w-full z-[1000] bg-[#0B1221]/90 backdrop-blur-xl border-t border-[#00F5FF]/15 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            <div class="flex justify-around items-center h-16 px-2">
                <a href="index.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#00F5FF] transition-colors nav-link-mobile" data-page="index.html">
                    <i class="fa-solid fa-house text-lg mb-1"></i>
                    <span class="text-[9px] uppercase tracking-wider font-bold">Inicio</span>
                </a>
                <a href="malla.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#00F5FF] transition-colors nav-link-mobile" data-page="malla.html">
                    <i class="fa-solid fa-book-open text-lg mb-1"></i>
                    <span class="text-[9px] uppercase tracking-wider font-bold">Malla</span>
                </a>
                <a href="laboratorio.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#00F5FF] transition-colors nav-link-mobile" data-page="laboratorio.html">
                    <i class="fa-solid fa-server text-lg mb-1"></i>
                    <span class="text-[9px] uppercase tracking-wider font-bold">Lab</span>
                </a>
                <a href="recursos.html" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-[#00F5FF] transition-colors nav-link-mobile" data-page="recursos.html">
                    <i class="fa-solid fa-folder-open text-lg mb-1"></i>
                    <span class="text-[9px] uppercase tracking-wider font-bold">Recursos</span>
                </a>
            </div>
            <style>
                @media (max-width: 1024px) { body { padding-bottom: 4rem; } }
                .nav-link-mobile.active { color: #00F5FF; text-shadow: 0 0 10px rgba(0,245,255,0.4); }
                .nav-link-mobile.active i { transform: scale(1.15); transition: transform 0.2s; }
            </style>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
        
        // Set active state for mobile nav
        document.querySelectorAll('.nav-link-mobile').forEach(function(link) {
            if (link.dataset.page === currentPage || (currentPage === '' && link.dataset.page === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
})();
