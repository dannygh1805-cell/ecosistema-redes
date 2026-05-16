import re

# === Fix index.html ===
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Boost mobile menu z-index
content = content.replace(
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[9999]"',
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[99999]"'
)

# 2. Fix video-modal: replace opacity-0 pointer-events-none with display:none via inline style
content = content.replace(
    'id="video-modal" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl opacity-0 pointer-events-none transition-opacity duration-500"',
    'id="video-modal" class="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl" style="display:none; align-items:center; justify-content:center; opacity:0; transition:opacity 0.5s ease; pointer-events:none;"'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('index.html: fixed video-modal + z-index boosted')

# Fix openVideoModal / closeVideoModal JS functions
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_open = '''        function openVideoModal() {
            const modal = document.getElementById('video-modal');
            const container = document.getElementById('video-container');
            const video = document.getElementById('presentation-video');
            
            modal.classList.remove('opacity-0', 'pointer-events-none');
            container.classList.remove('scale-95');
            container.classList.add('scale-100');
            video.play();
        }

        function closeVideoModal() {
            const modal = document.getElementById('video-modal');
            const container = document.getElementById('video-container');
            const video = document.getElementById('presentation-video');
            
            modal.classList.add('opacity-0', 'pointer-events-none');
            container.classList.remove('scale-100');
            container.classList.add('scale-95');
            video.pause();
        }'''

new_open = '''        function openVideoModal() {
            const modal = document.getElementById('video-modal');
            const container = document.getElementById('video-container');
            const video = document.getElementById('presentation-video');
            modal.style.display = 'flex';
            modal.style.pointerEvents = 'auto';
            setTimeout(() => { modal.style.opacity = '1'; }, 10);
            container.classList.remove('scale-95');
            container.classList.add('scale-100');
            video.play();
        }

        function closeVideoModal() {
            const modal = document.getElementById('video-modal');
            const container = document.getElementById('video-container');
            const video = document.getElementById('presentation-video');
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            container.classList.remove('scale-100');
            container.classList.add('scale-95');
            video.pause();
            setTimeout(() => { modal.style.display = 'none'; }, 500);
        }'''

content = content.replace(old_open, new_open)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('index.html: openVideoModal/closeVideoModal fixed')

# === Fix laboratorio.html ===
with open('laboratorio.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[9999]"',
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[99999]"'
)
with open('laboratorio.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('laboratorio.html: z-index boosted to 99999')

# === Fix recursos.html ===
with open('recursos.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[9999]"',
    'id="mobile-menu" class="fixed inset-0 bg-[#0B1221]/97 backdrop-blur-2xl z-[99999]"'
)
with open('recursos.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('recursos.html: z-index boosted to 99999')

print('\nAll files audited and fixed!')
