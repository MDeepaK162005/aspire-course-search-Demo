/**
 * Aspire Rise Ventures - Filter Management Module
 * Supports independent, combinable, and flexible search across all dimensions
 */

window.FILTERS = {
  currentFilters: {
    search: '',
    country: 'Ireland',
    level: '',
    subject: '',
    institution: '',
    duration: '',
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
    this.syncControlsUI();
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
    if (urlParams.has('duration')) this.currentFilters.duration = urlParams.get('duration');
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
   * Populate Subject & Institution Select controls dynamically & independently
   */
  async populateDropdowns() {
    const subjects = await window.API.fetchSubjects();
    const institutions = await window.API.fetchInstitutions();

    // 1. Populate Hero Subject Dropdown
    const heroSubjectSelect = document.querySelector('#hero-subject-select');
    if (heroSubjectSelect) {
      let options = '<option value="">All Fields</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject.toLowerCase() === sub.toLowerCase() ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      heroSubjectSelect.innerHTML = options;
    }

    // 2. Populate Hero Institution Dropdown
    const heroInstSelect = document.querySelector('#hero-institution-select');
    if (heroInstSelect) {
      let options = '<option value="">All Universities</option>';
      institutions.forEach(inst => {
        const isSel = String(this.currentFilters.institution) === String(inst.id) ||
                      this.currentFilters.institution.toLowerCase() === inst.name.toLowerCase();
        options += `<option value="${inst.id}" ${isSel ? 'selected' : ''}>${inst.name}</option>`;
      });
      heroInstSelect.innerHTML = options;
    }

    // 3. Populate Sidebar Subject Select
    const sidebarSubjectSelect = document.querySelector('#filter-subject-select');
    if (sidebarSubjectSelect) {
      let options = '<option value="">All Fields</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject.toLowerCase() === sub.toLowerCase() ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      sidebarSubjectSelect.innerHTML = options;
    }

    // 4. Populate Sidebar Institution Select
    const sidebarInstSelect = document.querySelector('#filter-institution-select');
    if (sidebarInstSelect) {
      let options = '<option value="">All Universities & Colleges</option>';
      institutions.forEach(inst => {
        const isSel = String(this.currentFilters.institution) === String(inst.id) ||
                      this.currentFilters.institution.toLowerCase() === inst.name.toLowerCase();
        options += `<option value="${inst.id}" ${isSel ? 'selected' : ''}>${inst.name}</option>`;
      });
      sidebarInstSelect.innerHTML = options;
    }
  },

  /**
   * Synchronize input control UI values with currentFilters state
   */
  syncControlsUI() {
    // Level
    const heroLevel = document.querySelector('#hero-level-select');
    if (heroLevel) heroLevel.value = this.currentFilters.level;
    const sidebarLevel = document.querySelector('#filter-level-select');
    if (sidebarLevel) sidebarLevel.value = this.currentFilters.level;

    // Subject
    const heroSub = document.querySelector('#hero-subject-select');
    if (heroSub) heroSub.value = this.currentFilters.subject;
    const sidebarSub = document.querySelector('#filter-subject-select');
    if (sidebarSub) sidebarSub.value = this.currentFilters.subject;

    // Institution
    const heroInst = document.querySelector('#hero-institution-select');
    if (heroInst) heroInst.value = this.currentFilters.institution;
    const sidebarInst = document.querySelector('#filter-institution-select');
    if (sidebarInst) sidebarInst.value = this.currentFilters.institution;

    // Duration
    const heroDur = document.querySelector('#hero-duration-select');
    if (heroDur) heroDur.value = this.currentFilters.duration;

    // Search Keyword
    const heroKw = document.querySelector('#hero-keyword-input');
    if (heroKw) heroKw.value = this.currentFilters.search;
    const sidebarKw = document.querySelector('#filter-search-input');
    if (sidebarKw) sidebarKw.value = this.currentFilters.search;
    const mobileKw = document.querySelector('#mobile-search-input');
    if (mobileKw) mobileKw.value = this.currentFilters.search;

    // Study Mode
    const modeSelect = document.querySelector('#filter-mode-select');
    if (modeSelect) modeSelect.value = this.currentFilters.studyMode;

    // NFQ
    const nfqSelect = document.querySelector('#filter-nfq-select');
    if (nfqSelect) nfqSelect.value = this.currentFilters.nfqLevel;

    // Sort
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) sortSelect.value = this.currentFilters.sortBy;
  },

  /**
   * Bind event listeners to controls
   */
  bindEvents() {
    // 1. Hero Controls (Live updating + independent)
    const heroLevelSelect = document.querySelector('#hero-level-select');
    if (heroLevelSelect) {
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

    const heroInstitutionSelect = document.querySelector('#hero-institution-select');
    if (heroInstitutionSelect) {
      heroInstitutionSelect.addEventListener('change', (e) => {
        this.updateFilter('institution', e.target.value);
      });
    }

    const heroDurationSelect = document.querySelector('#hero-duration-select');
    if (heroDurationSelect) {
      heroDurationSelect.addEventListener('change', (e) => {
        this.updateFilter('duration', e.target.value);
      });
    }

    const heroKeywordInput = document.querySelector('#hero-keyword-input');
    if (heroKeywordInput) {
      let timer;
      heroKeywordInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateFilter('search', e.target.value.trim());
        }, 300);
      });
    }

    // 2. Sidebar Controls (Live updating + independent)
    const filterSearchInput = document.querySelector('#filter-search-input');
    if (filterSearchInput) {
      let timer;
      filterSearchInput.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateFilter('search', e.target.value.trim());
        }, 300);
      });
    }

    const mobileSearchInput = document.querySelector('#mobile-search-input');
    if (mobileSearchInput) {
      let timer;
      mobileSearchInput.addEventListener('input', (e) => {
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
      levelSelect.addEventListener('change', (e) => {
        this.updateFilter('level', e.target.value);
      });
    }

    const studyModeSelect = document.querySelector('#filter-mode-select');
    if (studyModeSelect) {
      studyModeSelect.addEventListener('change', (e) => {
        this.updateFilter('studyMode', e.target.value);
      });
    }

    const nfqSelect = document.querySelector('#filter-nfq-select');
    if (nfqSelect) {
      nfqSelect.addEventListener('change', (e) => {
        this.updateFilter('nfqLevel', e.target.value);
      });
    }

    // Clear All Filters Buttons
    document.querySelectorAll('.btn-clear-filters, #sidebar-clear-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.clearAll();
      });
    });

    // Sort Select
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
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
    this.syncControlsUI();
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
      duration: '',
      studyMode: '',
      nfqLevel: '',
      sortBy: 'relevance',
      page: 1
    };

    // Reset All Inputs & Selects
    document.querySelectorAll('select').forEach(sel => sel.value = '');
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => input.value = '');
    
    // Reset Quick Chips
    document.querySelectorAll('.chip-btn').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.type === 'all' || chip.dataset.value === 'all');
    });

    this.syncControlsUI();
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

