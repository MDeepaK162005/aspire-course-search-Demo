/**
 * Aspire Rise Ventures - UI Helpers & Component Handlers
 * Handles Sticky Header, Accordions, Tabs, Toast Notifications, Back-To-Top, Scroll Reveal
 */

window.UI = {
  /**
   * Initialize Global UI listeners
   */
  initGlobalUI() {
    this.setupHeaderScroll();
    this.setupMobileNav();
    this.setupMobileFilterDrawer();
    this.setupAccordions();
    this.setupTabs();
    this.setupBackToTop();
    this.setupScrollReveal();
  },

  /**
   * Sticky Header Shadow on Scroll
   */
  setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  },

  /**
   * Mobile Hamburger Menu Toggle
   */
  setupMobileNav() {
    const toggleBtn = document.querySelector('#hamburger-toggle');
    const drawer = document.querySelector('#mobile-nav-drawer');
    const overlay = document.querySelector('#mobile-nav-overlay');

    if (!toggleBtn || !drawer || !overlay) return;

    const toggle = () => {
      toggleBtn.classList.toggle('active');
      drawer.classList.toggle('active');
      overlay.classList.toggle('active');
    };

    const closeNav = () => {
      toggleBtn.classList.remove('active');
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    };

    toggleBtn.addEventListener('click', toggle);
    overlay.addEventListener('click', closeNav);
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  },

  /**
   * Mobile Slide-in Filter Drawer Toggle
   */
  setupMobileFilterDrawer() {
    const triggerBtn = document.querySelector('#mobile-filter-trigger');
    const drawer = document.querySelector('#mobile-filter-drawer');
    const overlay = document.querySelector('#mobile-filter-overlay');
    const closeBtn = document.querySelector('#drawer-close-btn');

    if (!drawer || !overlay) return;

    const openDrawer = () => {
      drawer.classList.add('active');
      overlay.classList.add('active');
    };

    const closeDrawer = () => {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    };

    if (triggerBtn) triggerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  },

  /**
   * Interactive Accordion Sections
   */
  setupAccordions() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      const item = trigger.closest('.accordion-item');
      if (!item) return;

      const isActive = item.classList.contains('active');
      
      const parent = item.closest('.accordion-wrapper');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(child => {
          child.classList.remove('active');
        });
      }

      if (!isActive) {
        item.classList.add('active');
      }
    });
  },

  /**
   * Interactive Tabs Switcher
   */
  setupTabs() {
    document.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.tab-btn');
      if (!tabBtn) return;

      const targetId = tabBtn.dataset.tab;
      if (!targetId) return;

      const container = tabBtn.closest('.tabs-container') || document;
      
      container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetContent = container.querySelector(`#${targetId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  },

  /**
   * Floating Back-To-Top Button
   */
  setupBackToTop() {
    let btn = document.querySelector('.back-to-top-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top-btn';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = `
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
        </svg>
      `;
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /**
   * Scroll Reveal Animation Observer
   */
  setupScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  },

  /**
   * Show Toast Notification
   */
  showToast(message, icon = '✓') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Show Shimmer Skeleton Cards Loading State
   */
  renderSkeletons(container, count = 6) {
    if (!container) return;
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="skeleton-card">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-subtitle"></div>
          <div class="skeleton skeleton-body"></div>
          <div class="skeleton skeleton-button"></div>
        </div>
      `;
    }
    container.innerHTML = html;
  },

  /**
   * Render Clean Empty State
   */
  renderEmptyState(container, onClearFilters) {
    if (!container) return;
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--color-white); border-radius: var(--radius-md); border: 1px solid var(--color-slate-200);">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-blue-50); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; color: var(--color-blue-600);">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 style="font-size: 1.25rem; color: var(--color-navy-800); margin-bottom: 0.5rem;">No matching courses found</h3>
        <p style="color: var(--color-slate-500); max-width: 420px; margin: 0 auto 1.5rem;">Try adjusting your filter options, clearing search terms, or exploring all undergraduate / postgraduate degrees.</p>
        <button id="empty-clear-btn" class="btn btn-primary btn-sm">Reset All Filters</button>
      </div>
    `;

    const clearBtn = container.querySelector('#empty-clear-btn');
    if (clearBtn && onClearFilters) {
      clearBtn.addEventListener('click', onClearFilters);
    }
  },

  /**
   * Render Graceful Error State
   */
  renderErrorState(container, message = "Unable to fetch courses right now. Please try again.") {
    if (!container) return;
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 2rem; background: var(--color-danger-bg); border-radius: var(--radius-md); border: 1px solid #FCA5A5;">
        <h4 style="color: var(--color-danger); font-size: 1.1rem; margin-bottom: 0.5rem;">Connection Notice</h4>
        <p style="color: var(--color-slate-700); font-size: 0.925rem;">${message}</p>
      </div>
    `;
  }
};
