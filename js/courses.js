/**
 * Aspire Rise Ventures - Courses Result Rendering & Pagination
 * Renders Course Cards Grid adhering to Section 10 Information Architecture & UI Standards
 */

window.COURSES = {
  container: null,
  countContainer: null,
  paginationContainer: null,

  init() {
    this.container = document.querySelector('#courses-grid');
    this.countContainer = document.querySelector('#results-count');
    this.paginationContainer = document.querySelector('#pagination-container');

    // Subscribe to filter changes
    window.FILTERS.onChange((filters) => {
      this.loadCourses(filters);
    });

    // Initial Load
    this.loadCourses(window.FILTERS.currentFilters);
  },

  /**
   * Fetch & Render Courses
   */
  async loadCourses(filters) {
    if (!this.container) return;

    // Show Loading Skeleton
    window.UI.renderSkeletons(this.container, 6);

    try {
      const response = await window.API.fetchCourses(filters);

      if (!response || !response.data || response.data.length === 0) {
        window.UI.renderEmptyState(this.container, () => window.FILTERS.clearAll());
        this.updateCount(0);
        if (this.paginationContainer) this.paginationContainer.innerHTML = '';
        return;
      }

      this.renderGrid(response.data);
      this.updateCount(response.total);
      this.renderPagination(response.total, response.page, response.limit);

    } catch (err) {
      console.error('Failed to load courses:', err);
      window.UI.renderErrorState(this.container);
    }
  },

  /**
   * Safe formatter ensuring fallback 'N/A' and avoiding null/undefined/NaN/[object Object]
   */
  formatValue(val, fallback = 'N/A') {
    if (val === null || val === undefined || val === 'null' || val === 'undefined' || val === '[object Object]' || Number.isNaN(val)) {
      return fallback;
    }
    if (typeof val === 'object') return fallback;
    const str = String(val).trim();
    if (str === '' || str === 'N/A' || str === '#') return fallback;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Render Course Cards Grid with image media banner & full metadata
   */
  renderGrid(courses) {
    let html = '';

    courses.forEach((course, index) => {
      const courseName = this.formatValue(course.course_name, 'Degree Programme');
      const instName = this.formatValue(course.institution_name || course.institution?.name, 'Irish Higher Education Institution');
      const location = course.institution?.city ? `${this.formatValue(course.institution.city)}, Ireland` : 'Ireland';
      const qualification = this.formatValue(course.qualification, 'Degree');
      
      const rawLevel = this.formatValue(course.study_level, 'Postgraduate');
      const levelBadge = rawLevel === 'UG' ? 'Undergraduate' : rawLevel === 'PG' ? 'Postgraduate' : rawLevel;

      const rawNfq = this.formatValue(course.nfq_level, 'Level 9');
      const nfqClean = String(rawNfq).replace(/^Level\s*/i, '');

      const duration = this.formatValue(course.duration, '1 Year (Full-Time)');
      const intake = this.formatValue(course.intake, 'September / January');
      const fee = this.formatValue(course.fee || course.institution?.international_tuition_fee, '€12,500 - €18,500');
      const englishReq = this.formatValue(course.ielts || course.requirements?.ielts_overall, 'IELTS 6.5');

      // Resolve relevant course / university image
      const courseImgUrl = window.API?.getCourseImage ? window.API.getCourseImage(course) : 'assets/images/placeholder.svg';

      html += `
        <article class="course-card stagger-item" style="animation-delay: ${index * 0.05}s">
          <div class="course-card-media">
            <img 
              src="${courseImgUrl}" 
              alt="${courseName} - ${instName}" 
              class="course-card-img" 
              loading="lazy"
              onerror="this.onerror=null; this.src='assets/images/placeholder.svg';"
            >
            <div class="course-card-media-overlay">
              <span class="course-media-pill" title="${instName}">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                ${instName}
              </span>
            </div>
          </div>

          <div class="course-card-body">
            <div class="course-card-header">
              <h3 class="course-title">
                <a href="course-details.html?id=${course.id}">${courseName}</a>
              </h3>

              <div class="institution-meta-row">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>${instName}</span>
                <span class="location-badge">&bull; ${location}</span>
              </div>

              <div class="card-tags-row">
                <span class="tag-badge tag-badge-primary">${levelBadge}</span>
                <span class="tag-badge">${qualification}</span>
                <span class="tag-badge">Level ${nfqClean}</span>
              </div>
            </div>

            <div class="card-details-grid">
              <div class="detail-item">
                <span class="detail-item-label">Tuition Fee</span>
                <span class="detail-item-value detail-item-value-highlight">${fee}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Duration</span>
                <span class="detail-item-value">${duration}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">Next Intake</span>
                <span class="detail-item-value">${intake}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-label">English Req.</span>
                <span class="detail-item-value">${englishReq}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <a href="course-details.html?id=${course.id}" class="btn-card-details">
              View Course Details
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
            <button class="btn-shortlist" title="Shortlist Course" onclick="this.classList.toggle('active'); window.UI.showToast(this.classList.contains('active') ? 'Course saved to shortlist' : 'Course removed from shortlist')">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.5 3H6.5C5.67 3 5 3.67 5 4.5v16.5l7-3 7 3V4.5c0-.83-.67-1.5-1.5-1.5z"/>
              </svg>
            </button>
          </div>
        </article>
      `;
    });

    this.container.innerHTML = html;
  },

  /**
   * Update Total Count Header
   */
  updateCount(total) {
    if (this.countContainer) {
      this.countContainer.textContent = `${total} ${total === 1 ? 'Course' : 'Courses'} Found`;
    }
  },

  /**
   * Render Pagination Controls
   */
  renderPagination(total, currentPage, limit) {
    if (!this.paginationContainer) return;

    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) {
      this.paginationContainer.innerHTML = '';
      return;
    }

    let html = `
      <button class="btn btn-outline btn-sm page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
        Previous
      </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `
          <button class="btn btn-outline btn-sm page-btn ${i === currentPage ? 'btn-primary' : ''}" data-page="${i}">
            ${i}
          </button>
        `;
      } else if (
        (i === 2 && currentPage > 3) ||
        (i === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        html += `<span style="padding: 0 0.5rem; color: var(--color-slate-400);">...</span>`;
      }
    }

    html += `
      <button class="btn btn-outline btn-sm page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
        Next
      </button>
    `;

    this.paginationContainer.innerHTML = html;

    // Bind Pagination click listeners
    this.paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (page && !btn.disabled) {
          window.FILTERS.updateFilter('page', page);
          const resultsSec = document.querySelector('#search-results-section');
          if (resultsSec) resultsSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};
