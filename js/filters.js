/**
 * Aspire Rise Ventures - Filter Management Module
 */

window.FILTERS = {
  currentFilters: {
    search: '',
    country: 'Ireland',
    level: '',
    subject: '',
    institution: '',
    studyMode: '',
    nfqLevel: '',
    sortBy: 'relevance',
    page: 1
  },

  listeners: [],

  /**
   * Initialize Filters UI and bind listeners
   */
  async init() {
    this.readUrlParams();
    await this.populateDropdowns();
    this.bindEvents();
  },

  /**
   * Read active filter state from URL Search Params
   */
  readUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('search')) this.currentFilters.search = urlParams.get('search');
    if (urlParams.has('level')) this.currentFilters.level = urlParams.get('level');
    if (urlParams.has('subject')) this.currentFilters.subject = urlParams.get('subject');
    if (urlParams.has('institution')) this.currentFilters.institution = urlParams.get('institution');
    if (urlParams.has('studyMode')) this.currentFilters.studyMode = urlParams.get('studyMode');
    if (urlParams.has('nfqLevel')) this.currentFilters.nfqLevel = urlParams.get('nfqLevel');
    if (urlParams.has('sortBy')) this.currentFilters.sortBy = urlParams.get('sortBy');
    if (urlParams.has('page')) this.currentFilters.page = parseInt(urlParams.get('page')) || 1;
  },

  /**
   * Update browser URL without reloading page
   */
  syncUrlParams() {
    const url = new URL(window.location);
    Object.keys(this.currentFilters).forEach(key => {
      const val = this.currentFilters[key];
      if (val && val !== 'All' && val !== 1 && val !== 'relevance' && val !== 'Ireland') {
        url.searchParams.set(key, val);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.replaceState({}, '', url);
  },

  /**
   * Populate Subject & Institution Select controls dynamically
   */
  async populateDropdowns() {
    const subjects = await window.API.fetchSubjects();
    const institutions = await window.API.fetchInstitutions();

    // Populate Hero Subject Dropdown
    const heroSubjectSelect = document.querySelector('#hero-subject-select');
    if (heroSubjectSelect) {
      let options = '<option value="">All Specializations</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject === sub ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      heroSubjectSelect.innerHTML = options;
    }

    // Populate Sidebar Subject Select
    const sidebarSubjectSelect = document.querySelector('#filter-subject-select');
    if (sidebarSubjectSelect) {
      let options = '<option value="">All Specializations</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject === sub ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      sidebarSubjectSelect.innerHTML = options;
    }

    // Populate Sidebar Institution Select
    const sidebarInstSelect = document.querySelector('#filter-institution-select');
    if (sidebarInstSelect) {
      let options = '<option value="">All Universities & Colleges</option>';
      institutions.forEach(inst => {
        const sel = this.currentFilters.institution.toLowerCase() === inst.name.toLowerCase() ? 'selected' : '';
        options += `<option value="${inst.name}" ${sel}>${inst.name}</option>`;
      });
      sidebarInstSelect.innerHTML = options;
    }
  },

  /**
   * Bind event listeners to controls
   */
  bindEvents() {
    // Hero Search Form / Controls
    const heroLevelSelect = document.querySelector('#hero-level-select');
    if (heroLevelSelect) {
      heroLevelSelect.value = this.currentFilters.level;
      heroLevelSelect.addEventListener('change', (e) => {
        this.updateFilter('level', e.target.value);
      });
    }

    const heroSubjectSelect = document.querySelector('#hero-subject-select');
    if (heroSubjectSelect) {
      heroSubjectSelect.addEventListener('change', (e) => {
        this.updateFilter('subject', e.target.value);
      });
    }

    // Sidebar Controls
    const filterSearchInput = document.querySelector('#filter-search-input');
    if (filterSearchInput) {
      filterSearchInput.value = this.currentFilters.search;
      let timer;
      filterSearchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateFilter('search', e.target.value.trim());
        }, 300);
      });
    }

    const sidebarSubjectSelect = document.querySelector('#filter-subject-select');
    if (sidebarSubjectSelect) {
      sidebarSubjectSelect.addEventListener('change', (e) => {
        this.updateFilter('subject', e.target.value);
      });
    }

    const sidebarInstSelect = document.querySelector('#filter-institution-select');
    if (sidebarInstSelect) {
      sidebarInstSelect.addEventListener('change', (e) => {
        this.updateFilter('institution', e.target.value);
      });
    }

    const levelSelect = document.querySelector('#filter-level-select');
    if (levelSelect) {
      levelSelect.value = this.currentFilters.level;
      levelSelect.addEventListener('change', (e) => {
        this.updateFilter('level', e.target.value);
      });
    }

    const studyModeSelect = document.querySelector('#filter-mode-select');
    if (studyModeSelect) {
      studyModeSelect.value = this.currentFilters.studyMode;
      studyModeSelect.addEventListener('change', (e) => {
        this.updateFilter('studyMode', e.target.value);
      });
    }

    const nfqSelect = document.querySelector('#filter-nfq-select');
    if (nfqSelect) {
      nfqSelect.value = this.currentFilters.nfqLevel;
      nfqSelect.addEventListener('change', (e) => {
        this.updateFilter('nfqLevel', e.target.value);
      });
    }

    // Clear All Filters Buttons
    document.querySelectorAll('.btn-clear-filters').forEach(btn => {
      btn.addEventListener('click', () => this.clearAll());
    });

    // Sort Select
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
      sortSelect.value = this.currentFilters.sortBy;
      sortSelect.addEventListener('change', (e) => {
        this.updateFilter('sortBy', e.target.value);
      });
    }
  },

  /**
   * Update single filter property & notify listeners
   */
  updateFilter(key, value) {
    this.currentFilters[key] = value;
    if (key !== 'page') {
      this.currentFilters.page = 1; // Reset to page 1 on filter change
    }
    this.syncUrlParams();
    this.notify();
  },

  /**
   * Clear all active filters
   */
  clearAll() {
    this.currentFilters = {
      search: '',
      country: 'Ireland',
      level: '',
      subject: '',
      institution: '',
      studyMode: '',
      nfqLevel: '',
      sortBy: 'relevance',
      page: 1
    };

    // Reset Form Elements
    document.querySelectorAll('select').forEach(sel => sel.value = '');
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    
    // Reset Quick Chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.filter === 'all');
    });

    this.syncUrlParams();
    this.notify();
  },

  /**
   * Register change listener
   */
  onChange(fn) {
    this.listeners.push(fn);
  },

  /**
   * Notify registered listeners
   */
  notify() {
    this.listeners.forEach(fn => fn(this.currentFilters));
  }
};
