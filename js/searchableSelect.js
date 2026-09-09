/**
 * Aspire Rise Ventures - Combobox / Searchable Input Select UI Component
 * Provides a direct searchable input field with a dropdown popup list and visible down arrow.
 * Matches Education Matters-style searchable dropdown UX pattern.
 */

window.SearchableSelect = class SearchableSelect {
  constructor(selectElement, options = {}) {
    this.selectEl = selectElement;
    if (!this.selectEl) return;

    this.placeholder = options.placeholder || 'Search or select...';
    this.defaultLabel = options.defaultLabel || 'All';
    this.onChangeCallback = options.onChange || null;

    this.optionsData = []; // Array of { value, label, searchText }
    this.selectedValue = this.selectEl.value || '';

    this.wrapperEl = null;
    this.inputGroupEl = null;
    this.inputEl = null;
    this.arrowBtnEl = null;
    this.dropdownListEl = null;

    this.buildUI();
    this.bindEvents();
  }

  setOptions(items) {
    this.optionsData = items;
    this.renderOptions(this.optionsData);
    this.syncFromSelect();
  }

  buildUI() {
    // Hide original select element
    this.selectEl.style.display = 'none';

    // Remove old wrapper if re-initializing
    if (
      this.selectEl.nextSibling &&
      this.selectEl.nextSibling.classList &&
      this.selectEl.nextSibling.classList.contains('combobox-wrapper')
    ) {
      this.selectEl.nextSibling.remove();
    }

    // Create Combobox Container Wrapper
    this.wrapperEl = document.createElement('div');
    this.wrapperEl.className = 'combobox-wrapper';

    // Input Group (Input + Down Arrow)
    this.inputGroupEl = document.createElement('div');
    this.inputGroupEl.className = 'combobox-input-group';

    // Searchable Input
    this.inputEl = document.createElement('input');
    this.inputEl.type = 'text';
    this.inputEl.className = 'combobox-input';
    this.inputEl.placeholder = this.placeholder;
    this.inputEl.setAttribute('autocomplete', 'off');
    this.inputEl.setAttribute('autocorrect', 'off');
    this.inputEl.setAttribute('spellcheck', 'false');
    this.inputEl.setAttribute('aria-expanded', 'false');
    this.inputEl.setAttribute('role', 'combobox');

    // Down Arrow Button
    this.arrowBtnEl = document.createElement('button');
    this.arrowBtnEl.type = 'button';
    this.arrowBtnEl.className = 'combobox-arrow-btn';
    this.arrowBtnEl.setAttribute('tabindex', '-1');
    this.arrowBtnEl.setAttribute('aria-label', 'Toggle dropdown');

    const arrowIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowIcon.setAttribute('class', 'combobox-arrow-icon');
    arrowIcon.setAttribute('width', '16');
    arrowIcon.setAttribute('height', '16');
    arrowIcon.setAttribute('fill', 'none');
    arrowIcon.setAttribute('viewBox', '0 0 24 24');
    arrowIcon.setAttribute('stroke', 'currentColor');
    arrowIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>';

    this.arrowBtnEl.appendChild(arrowIcon);
    this.inputGroupEl.appendChild(this.inputEl);
    this.inputGroupEl.appendChild(this.arrowBtnEl);

    // Dropdown List Panel
    this.dropdownListEl = document.createElement('ul');
    this.dropdownListEl.className = 'combobox-dropdown-list';
    this.dropdownListEl.setAttribute('role', 'listbox');

    this.wrapperEl.appendChild(this.inputGroupEl);
    this.wrapperEl.appendChild(this.dropdownListEl);

    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(this.wrapperEl, this.selectEl.nextSibling);
    }
  }

  renderOptions(items) {
    this.dropdownListEl.innerHTML = '';

    if (!items || items.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'combobox-empty-item';
      emptyLi.textContent = 'No matching options found';
      this.dropdownListEl.appendChild(emptyLi);
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      const isSelected = String(item.value) === String(this.selectedValue);
      li.className = `combobox-option-item${isSelected ? ' selected' : ''}`;
      li.dataset.value = item.value;
      li.textContent = item.label;
      li.setAttribute('role', 'option');

      li.addEventListener('mousedown', (e) => {
        // Prevent input blur before click fires
        e.preventDefault();
      });

      li.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectOption(item.value, item.label);
      });

      this.dropdownListEl.appendChild(li);
    });
  }

  filterOptions(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      this.renderOptions(this.optionsData);
      return;
    }

    const filtered = this.optionsData.filter(item => {
      const textToSearch = (item.searchText || item.label || '').toLowerCase();
      const valStr = String(item.value || '').toLowerCase();
      return textToSearch.includes(q) || valStr.includes(q);
    });

    this.renderOptions(filtered);
  }

  selectOption(value, label) {
    this.selectedValue = value;
    this.selectEl.value = value;
    this.inputEl.value = value === '' ? '' : label;

    this.close();

    // Dispatch change event on underlying select
    const event = new Event('change', { bubbles: true });
    this.selectEl.dispatchEvent(event);

    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }
  }

  syncFromSelect() {
    const val = this.selectEl.value;
    this.selectedValue = val;
    const found = this.optionsData.find(item => String(item.value) === String(val));
    if (found) {
      this.inputEl.value = found.value === '' ? '' : found.label;
    } else if (val) {
      this.inputEl.value = val;
    } else {
      this.inputEl.value = '';
    }

    this.dropdownListEl.querySelectorAll('.combobox-option-item').forEach(li => {
      li.classList.toggle('selected', String(li.dataset.value) === String(val));
    });
  }

  open() {
    // Close any other open dropdowns first
    document.querySelectorAll('.combobox-wrapper.open').forEach(el => {
      if (el !== this.wrapperEl) el.classList.remove('open');
    });

    this.wrapperEl.classList.add('open');
    this.inputEl.setAttribute('aria-expanded', 'true');
    // Always show full list when opening
    this.renderOptions(this.optionsData);
    // Scroll selected option into view
    requestAnimationFrame(() => {
      const selected = this.dropdownListEl.querySelector('.selected');
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    });
  }

  close() {
    this.wrapperEl.classList.remove('open');
    this.inputEl.setAttribute('aria-expanded', 'false');
  }

  toggle() {
    if (this.wrapperEl.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  bindEvents() {
    // Focus opens the dropdown and selects all text
    this.inputEl.addEventListener('focus', () => {
      this.open();
      this.inputEl.select();
    });

    // Click opens the dropdown (if not already open)
    this.inputEl.addEventListener('click', () => {
      if (!this.wrapperEl.classList.contains('open')) {
        this.open();
      }
    });

    // Typing filters options in real time
    this.inputEl.addEventListener('input', (e) => {
      const typed = e.target.value;
      if (!this.wrapperEl.classList.contains('open')) this.open();
      this.filterOptions(typed);

      // Check if typed text exactly matches an option
      const matched = this.optionsData.find(opt =>
        opt.label.toLowerCase() === typed.trim().toLowerCase() ||
        (opt.value && String(opt.value).toLowerCase() === typed.trim().toLowerCase())
      );

      if (matched) {
        this.selectEl.value = matched.value;
        this.selectedValue = matched.value;
        if (this.onChangeCallback) this.onChangeCallback(matched.value);
      } else if (typed.trim() === '') {
        // Empty input clears the filter
        this.selectEl.value = '';
        this.selectedValue = '';
        if (this.onChangeCallback) this.onChangeCallback('');
      }
    });

    // Arrow button toggles open/close
    this.arrowBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.wrapperEl.classList.contains('open')) {
        this.close();
      } else {
        this.open();
        this.inputEl.focus();
      }
    });

    // Click outside closes dropdown
    document.addEventListener('click', (e) => {
      if (!this.wrapperEl.contains(e.target)) {
        this.close();
        // Clear partial text if nothing was actually selected
        if (!this.selectedValue && this.inputEl.value.trim()) {
          this.inputEl.value = '';
        }
      }
    });

    // Escape closes dropdown
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.wrapperEl.classList.contains('open')) {
        this.close();
        this.inputEl.blur();
      }
    });
  }
};
