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
    if (!window.location || !window.location.href || window.location.href === 'about:blank') return;
    try {
      const url = new URL(window.location.href);
      Object.keys(this.currentFilters).forEach(key => {
        const val = this.currentFilters[key];
        if (val && val !== 'All' && val !== 1 && val !== 'relevance' && val !== 'Ireland') {
          url.searchParams.set(key, val);
        } else {
          url.searchParams.delete(key);
        }
      });
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, '', url);
      }
    } catch (err) {
      // Ignore URL sync errors in non-browser test environment
    }
  },

  heroSearchableInst: null,
  sidebarSearchableInst: null,
  heroSearchableSub: null,
  sidebarSearchableSub: null,
  heroSearchableLvl: null,
  sidebarSearchableLvl: null,

  /**
   * Populate Subject & Institution Select controls dynamically & independently
   */
  async populateDropdowns() {
    const subjects = await window.API.fetchSubjects();
    const institutions = await window.API.fetchInstitutions();

    // Short display names & acronym mapping for clean rendering & search matching
    const INSTITUTION_SHORT_NAMES = {
      1: "Atlantic Technological University (ATU)",
      2: "South East Technological University (SETU)",
      3: "Munster Technological University (MTU)",
      4: "Technological University of the Shannon (TUS)",
      6: "RCSI University of Medicine & Health Sciences",
      7: "Technological University Dublin (TU Dublin)",
      9: "Independent College Dublin",
      10: "CCT College Dublin",
      11: "IBAT College Dublin",
      16: "University of Galway",
      17: "National College of Ireland (NCI)",
      18: "Maynooth University",
      19: "Dundalk Institute of Technology (DkIT)",
      20: "Dun Laoghaire Institute of Art, Design & Tech (IADT)",
      25: "National College of Art & Design (NCAD)",
      26: "Dublin City University (DCU)",
      27: "University of Limerick (UL)",
      29: "Dublin Business School (DBS)",
      30: "Griffith College",
      35: "University College Dublin (UCD)",
      36: "University College Cork (UCC)",
      37: "University of Galway",
      38: "Marino Institute of Education (MIE)",
      39: "Mary Immaculate College (MIC)",
      40: "Institute of Banking (IOB)",
      41: "St. Patrick's Pontifical University, Maynooth",
      43: "Law Society of Ireland",
      45: "Trinity College Dublin (TCD)",
      46: "Honorable Society of King's Inns"
    };

    const instOptions = [
      { value: '', label: 'All Universities & Institutions', searchText: 'All Universities Institutions Ireland' },
      { value: 'Ireland', label: 'Ireland (All Institutions)', searchText: 'Ireland Irish Higher Education All' }
    ];

    institutions.forEach(inst => {
      const formattedLabel = INSTITUTION_SHORT_NAMES[inst.id] || inst.name;
      const searchText = `Ireland ${inst.name} ${formattedLabel} ${inst.former_names || ''} ${inst.city || ''}`;
      instOptions.push({
        value: String(inst.id),
        label: formattedLabel,
        searchText: searchText
      });
    });

    // 2. Format Specializations
    const subjectOptions = [
      { value: '', label: 'All Specializations', searchText: 'All Specializations Fields of Study' }
    ];
    subjects.forEach(sub => {
      subjectOptions.push({
        value: sub,
        label: sub,
        searchText: sub
      });
    });

    // 3. Format Course Levels
    const levelOptions = [
      { value: '', label: 'All Levels', searchText: 'All Levels Undergraduate Postgraduate PhD Doctorate' },
      { value: 'UG', label: 'Undergraduate (UG)', searchText: 'Undergraduate UG Bachelor Honours Level 8' },
      { value: 'PG', label: 'Postgraduate (PG)', searchText: 'Postgraduate PG Master MSc MA Diploma Level 9' },
      { value: 'PhD', label: 'PhD / Doctorate', searchText: 'PhD Doctorate Research Level 10' }
    ];

    // 1. Populate Hero Specializations Dropdown with SearchableSelect
    const heroSubjectSelect = document.querySelector('#hero-subject-select');
    if (heroSubjectSelect) {
      let options = '<option value="">All Specializations</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject.toLowerCase() === sub.toLowerCase() ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      heroSubjectSelect.innerHTML = options;

      if (window.SearchableSelect) {
        this.heroSearchableSub = new window.SearchableSelect(heroSubjectSelect, {
          placeholder: 'e.g. Computer Science, Business, Medicine...',
          defaultLabel: 'All Specializations',
          onChange: (val) => this.updateFilter('subject', val)
        });
        this.heroSearchableSub.setOptions(subjectOptions);
      }
    }

    // 2. Populate Hero Countries / Institution Dropdown with SearchableSelect
    const heroInstSelect = document.querySelector('#hero-institution-select');
    if (heroInstSelect) {
      let options = '<option value="">All Countries & Universities</option>';
      institutions.forEach(inst => {
        const formattedLabel = INSTITUTION_SHORT_NAMES[inst.id] || inst.name;
        const isSel = String(this.currentFilters.institution) === String(inst.id) ||
                      this.currentFilters.institution.toLowerCase() === inst.name.toLowerCase();
        options += `<option value="${inst.id}" ${isSel ? 'selected' : ''}>${formattedLabel}</option>`;
      });
      heroInstSelect.innerHTML = options;

      if (window.SearchableSelect) {
        this.heroSearchableInst = new window.SearchableSelect(heroInstSelect, {
          placeholder: 'e.g. UCD, Trinity, DCU, Maynooth...',
          defaultLabel: 'All Universities',
          onChange: (val) => this.updateFilter('institution', val)
        });
        this.heroSearchableInst.setOptions(instOptions);
      }
    }

    // 3. Populate Hero Level Select with SearchableSelect
    const heroLevelSelect = document.querySelector('#hero-level-select');
    if (heroLevelSelect && window.SearchableSelect) {
      this.heroSearchableLvl = new window.SearchableSelect(heroLevelSelect, {
        placeholder: 'e.g. Undergraduate, Postgraduate, PhD...',
        defaultLabel: 'All Levels',
        onChange: (val) => this.updateFilter('level', val)
      });
      this.heroSearchableLvl.setOptions(levelOptions);
    }

    // 4. Populate Sidebar Subject Select with SearchableSelect
    const sidebarSubjectSelect = document.querySelector('#filter-subject-select');
    if (sidebarSubjectSelect) {
      let options = '<option value="">All Specializations</option>';
      subjects.forEach(sub => {
        const sel = this.currentFilters.subject.toLowerCase() === sub.toLowerCase() ? 'selected' : '';
        options += `<option value="${sub}" ${sel}>${sub}</option>`;
      });
      sidebarSubjectSelect.innerHTML = options;

      if (window.SearchableSelect) {
        this.sidebarSearchableSub = new window.SearchableSelect(sidebarSubjectSelect, {
          placeholder: 'Search or select specializations...',
          defaultLabel: 'All Specializations',
          onChange: (val) => this.updateFilter('subject', val)
        });
        this.sidebarSearchableSub.setOptions(subjectOptions);
      }
    }

    // 5. Populate Sidebar Level Select with SearchableSelect
    const sidebarLevelSelect = document.querySelector('#filter-level-select');
    if (sidebarLevelSelect && window.SearchableSelect) {
      this.sidebarSearchableLvl = new window.SearchableSelect(sidebarLevelSelect, {
        placeholder: 'Search or select level...',
        defaultLabel: 'All Levels',
        onChange: (val) => this.updateFilter('level', val)
      });
      this.sidebarLevelSelect = sidebarLevelSelect;
      this.sidebarSearchableLvl.setOptions(levelOptions);
    }

    // 6. Populate Sidebar Institution Select with SearchableSelect
    const sidebarInstSelect = document.querySelector('#filter-institution-select');
    if (sidebarInstSelect) {
      let options = '<option value="">All Countries & Universities</option>';
      institutions.forEach(inst => {
        const formattedLabel = INSTITUTION_SHORT_NAMES[inst.id] || inst.name;
        const isSel = String(this.currentFilters.institution) === String(inst.id) ||
                      this.currentFilters.institution.toLowerCase() === inst.name.toLowerCase();
        options += `<option value="${inst.id}" ${isSel ? 'selected' : ''}>${formattedLabel}</option>`;
      });
      sidebarInstSelect.innerHTML = options;

      if (window.SearchableSelect) {
        this.sidebarSearchableInst = new window.SearchableSelect(sidebarInstSelect, {
          placeholder: 'Search or select countries...',
          defaultLabel: 'All Countries & Universities',
          onChange: (val) => this.updateFilter('institution', val)
        });
        this.sidebarSearchableInst.setOptions(instOptions);
      }
    }
  },

  /**
   * Synchronize input control UI values with currentFilters state
   */
  syncControlsUI() {
    // Level
    const heroLevel = document.querySelector('#hero-level-select');
    if (heroLevel) heroLevel.value = this.currentFilters.level;
    if (this.heroSearchableLvl) this.heroSearchableLvl.syncFromSelect();

    const sidebarLevel = document.querySelector('#filter-level-select');
    if (sidebarLevel) sidebarLevel.value = this.currentFilters.level;
    if (this.sidebarSearchableLvl) this.sidebarSearchableLvl.syncFromSelect();

    // Subject
    const heroSub = document.querySelector('#hero-subject-select');
    if (heroSub) heroSub.value = this.currentFilters.subject;
    if (this.heroSearchableSub) this.heroSearchableSub.syncFromSelect();

    const sidebarSub = document.querySelector('#filter-subject-select');
    if (sidebarSub) sidebarSub.value = this.currentFilters.subject;
    if (this.sidebarSearchableSub) this.sidebarSearchableSub.syncFromSelect();

    // Institution
    const heroInst = document.querySelector('#hero-institution-select');
    if (heroInst) heroInst.value = this.currentFilters.institution;
    if (this.heroSearchableInst) this.heroSearchableInst.syncFromSelect();

    const sidebarInst = document.querySelector('#filter-institution-select');
    if (sidebarInst) sidebarInst.value = this.currentFilters.institution;
    if (this.sidebarSearchableInst) this.sidebarSearchableInst.syncFromSelect();

    // Duration
    const heroDur = document.querySelector('#hero-duration-select');
    if (heroDur) heroDur.value = this.currentFilters.duration;

    // Search Keyword
    const heroKw = document.querySelector('#hero-keyword-input');
    const heroClearBtn = document.querySelector('#hero-keyword-clear-btn');
    if (heroKw) {
      heroKw.value = this.currentFilters.search;
      if (heroClearBtn) {
        heroClearBtn.style.display = this.currentFilters.search ? 'flex' : 'none';
      }
    }
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
    const heroKeywordClearBtn = document.querySelector('#hero-keyword-clear-btn');
    if (heroKeywordInput) {
      let timer;
      heroKeywordInput.addEventListener('input', (e) => {
        if (heroKeywordClearBtn) {
          heroKeywordClearBtn.style.display = e.target.value ? 'flex' : 'none';
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.updateFilter('search', e.target.value.trim());
        }, 300);
      });
    }
    if (heroKeywordClearBtn) {
      heroKeywordClearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.updateFilter('search', '');
        if (heroKeywordInput) heroKeywordInput.focus();
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

    // Reset SearchableSelect combobox UI instances
    const searchableInstances = [
      this.heroSearchableInst, this.sidebarSearchableInst,
      this.heroSearchableSub, this.sidebarSearchableSub,
      this.heroSearchableLvl, this.sidebarSearchableLvl
    ];
    searchableInstances.forEach(inst => {
      if (inst) {
        inst.selectedValue = '';
        if (inst.inputEl) inst.inputEl.value = '';
        inst.renderOptions(inst.optionsData);
      }
    });

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

