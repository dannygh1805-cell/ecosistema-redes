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
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[href]');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href) return;
            if (href.startsWith('#')) return;
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            if (link.getAttribute('target') === '_blank') return;
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = href; }, 380);
        });

        /* ─── 4. SET ACTIVE NAV LINK ──────────────────────── */
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(function (link) {
            const href = (link.getAttribute('href') || '').split('#')[0];
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
})();
