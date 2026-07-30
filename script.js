/* ===========================
   SIDEBAR NAVIGATION
=========================== */
const navItems = document.querySelectorAll('.nav-item');
const navSubs  = document.querySelectorAll('.nav-sub');
const sections = document.querySelectorAll('.section');

function activateSection(sectionId) {
  sections.forEach(s => s.classList.remove('active'));
  const target = document.getElementById('sec-' + sectionId);
  if (target) target.classList.add('active');
  navItems.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });
  document.getElementById('content').scrollTop = 0;
}

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    activateSection(btn.dataset.section);
    closeSidebar();
  });
});

navSubs.forEach(btn => {
  btn.addEventListener('click', () => {
    const sectionId = btn.dataset.section;
    const scrollTo  = btn.dataset.scroll;
    activateSection(sectionId);
    setTimeout(() => {
      const target = document.getElementById('sub-' + scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    closeSidebar();
  });
});

/* ===========================
   MOBILE SIDEBAR TOGGLE
=========================== */
const menuToggle     = document.getElementById('menuToggle');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

/* ===========================
   KEYBOARD NAV
=========================== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

/* ===========================
   SCROLL SPY (highlight active sub-nav)
=========================== */
const content = document.getElementById('content');

content.addEventListener('scroll', () => {
  const subSections = content.querySelectorAll('.sub-section');
  subSections.forEach(sub => {
    const rect = sub.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight * 0.4) {
      const id = sub.id.replace('sub-', '');
      navSubs.forEach(btn => {
        btn.style.color = btn.dataset.scroll === id
          ? 'var(--text)'
          : '';
      });
    }
  });
});
