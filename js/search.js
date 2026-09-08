/**
 * Aspire Rise Ventures - Hero Search & Quick Filter Chips Handler
 * Manages 8 Hero Search Panel Fields & Quick Filter Chips independently
 */

window.SEARCH = {
  init() {
    this.bindHeroSearch();
    this.bindQuickChips();
    this.bindResetButton();
  },

  /**
   * Bind Hero Form & "Search Courses" Button
   */
  bindHeroSearch() {
    const form = document.querySelector('#hero-search-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.executeSearch();
    });

    const searchBtn = document.querySelector('#hero-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.executeSearch();
      });
    }
  },

  executeSearch() {
    const level = document.querySelector('#hero-level-select')?.value || '';
    const subject = document.querySelector('#hero-subject-select')?.value || '';
    const institution = document.querySelector('#hero-institution-select')?.value || '';
    const duration = document.querySelector('#hero-duration-select')?.value || '';
    const keyword = document.querySelector('#hero-keyword-input')?.value || '';

    // Update global filter state
    if (window.FILTERS) {
      window.FILTERS.currentFilters.level = level;
      window.FILTERS.currentFilters.subject = subject;
      window.FILTERS.currentFilters.institution = institution;
      window.FILTERS.currentFilters.duration = duration;
      window.FILTERS.currentFilters.search = keyword;
      window.FILTERS.currentFilters.page = 1;

      window.FILTERS.syncControlsUI();
      window.FILTERS.syncUrlParams();
      window.FILTERS.notify();
    }

    // Smooth scroll to Search Results section
    const resultsSec = document.querySelector('#search-results-section');
    if (resultsSec) {
      resultsSec.scrollIntoView({ behavior: 'smooth' });
    }
  },

  /**
   * Bind Reset Filters button in hero
   */
  bindResetButton() {
    const resetBtn = document.querySelector('#btn-reset-hero');
    if (!resetBtn) return;

    resetBtn.addEventListener('click', () => {
      if (window.FILTERS) {
        window.FILTERS.clearAll();
      }
    });
  },

  /**
   * Bind Quick Filter Chips (All, UG, PG, Engineering, Business, CS, Medicine, Affordable)
   */
  bindQuickChips() {
    const chips = document.querySelectorAll('.chip-btn');
    if (!chips.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filterType = chip.dataset.type;
        const value = chip.dataset.value;

        if (filterType === 'all') {
          window.FILTERS.clearAll();
        } else if (filterType === 'level') {
          window.FILTERS.updateFilter('level', value);
        } else if (filterType === 'subject') {
          window.FILTERS.updateFilter('subject', value);
        } else if (filterType === 'fee' && value === 'affordable') {
          window.FILTERS.updateFilter('search', 'affordable');
        }

        const resultsSec = document.querySelector('#search-results-section');
        if (resultsSec) {
          resultsSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};

