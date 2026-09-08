/**
 * Aspire Rise Ventures - Course Details Page Renderer
 * Retrieves course ID from URL query string (?id=123) and populates detail sections.
 */

window.COURSE_DETAILS = {
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
      this.renderNotFound("No course ID provided.");
      return;
    }

    try {
      const course = await window.API.fetchCourseById(courseId);
      if (!course) {
        this.renderNotFound("Course requested could not be found in our database.");
        return;
      }

      this.renderPage(course);
    } catch (err) {
      console.error("Error loading course details:", err);
      this.renderNotFound("Failed to load details due to a connection error.");
    }
  },

  /**
   * Safe value sanitizer ensuring clean display string
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
   * Render Page Data into HTML elements
   */
  renderPage(course) {
    const inst = course.institution || {};
    
    // Page Title
    const courseName = this.formatValue(course.course_name, 'Course Details');
    const instName = this.formatValue(course.institution_name || inst.name, 'Irish University');
    document.title = `${courseName} - ${instName} | Aspire Rise Ventures`;

    // Breadcrumb Title
    this.setText('#breadcrumb-course-title', courseName);

    // Details Hero
    this.setText('#details-institution-name', instName);
    this.setText('#details-course-title', courseName);

    const rawNfq = this.formatValue(course.nfq_level, 'Level 9');
    const nfqDisplay = String(rawNfq).toLowerCase().includes('level') ? rawNfq : `NFQ Level ${rawNfq}`;

    const tagsEl = document.querySelector('#details-hero-tags');
    if (tagsEl) {
      tagsEl.innerHTML = `
        <span class="badge badge-primary">${this.formatValue(course.qualification, 'Qualification')}</span>
        <span class="badge badge-purple">${nfqDisplay}</span>
        <span class="badge badge-orange">${this.formatValue(course.study_level, 'Undergraduate / Postgraduate')}</span>
        <span class="badge badge-outline">${this.formatValue(course.study_mode, 'Full-Time')}</span>
      `;
    }

    // Official Links
    const officialBtn = document.querySelector('#official-course-link');
    if (officialBtn) {
      if (course.official_url && course.official_url !== 'N/A' && course.official_url !== '#') {
        officialBtn.href = course.official_url;
        officialBtn.style.display = 'inline-flex';
      } else {
        officialBtn.style.display = 'none';
      }
    }

    // Metric Cards
    this.setText('#metric-fee', this.formatValue(course.fee || inst.international_tuition_fee, '€12,500 - €18,500'));
    this.setText('#metric-nfq', nfqDisplay);
    this.setText('#metric-mode', this.formatValue(course.study_mode, 'Full-Time'));
    this.setText('#metric-duration', this.formatValue(course.duration, '1 Year (Full-Time)'));
    this.setText('#metric-ielts', this.formatValue(course.requirements?.ielts_overall, 'IELTS 6.5'));
    this.setText('#metric-toefl', this.formatValue(course.requirements?.toefl_score, 'TOEFL 88+'));

    // Tab 1: Course Info
    this.setText('#info-course-name', courseName);
    this.setText('#info-qualification', this.formatValue(course.qualification, 'Degree'));
    this.setText('#info-nfq', nfqDisplay);
    this.setText('#info-subject', this.formatValue(course.subject, 'Higher Education Degree'));
    this.setText('#info-level', this.formatValue(course.study_level, 'Undergraduate / Postgraduate'));
    this.setText('#info-mode', this.formatValue(course.study_mode, 'Full-Time'));
    this.setText('#info-duration', this.formatValue(course.duration, '1 Year (Full-Time)'));
    this.setText('#info-code', this.formatValue(course.course_code, 'N/A'));

    // Tab 2: Eligibility Info
    this.setText('#eligibility-ielts', this.formatValue(course.requirements?.ielts_overall, 'Standard Irish Higher Education English Requirement (IELTS 6.5 or equivalent)'));
    this.setText('#eligibility-toefl', this.formatValue(course.requirements?.toefl_score, 'Standard TOEFL iBT score (88+) or equivalent'));
    this.setText('#eligibility-pte', this.formatValue(course.requirements?.pte_score, 'Standard PTE Academic score (61+) or equivalent'));
    this.setText('#eligibility-academic', this.formatValue(course.requirements?.academic_requirement, `Recognized Bachelor's degree (for Postgraduate) or Leaving Cert / High School equivalent (for Undergraduate).`));

    // Accordions (University Information)
    this.setText('#accord-about-uni', this.formatValue(inst.additional_notes, `${instName} is a premier higher education institution in Ireland providing state-of-the-art academic programmes and research options for international students.`));
    this.setText('#accord-reputation', `QS Ranking: ${this.formatValue(inst.qs_ranking, 'Top Ranked')} | THE Ranking: ${this.formatValue(inst.the_ranking, 'Top Ranked')}`);
    this.setText('#accord-scholarships', this.formatValue(inst.scholarships, 'Institutional Merit Scholarships and Government of Ireland International Education Scholarships available for eligible international candidates.'));
    this.setText('#accord-accommodation', this.formatValue(inst.accommodation, 'On-campus student residence halls and partner private student accommodation complexes available across Dublin and campus regions.'));
    this.setText('#accord-admissions', this.formatValue(inst.application_info, `Applications can be submitted directly via the official institution portal: ${inst.admissions_url || inst.website || 'Official Website'}`));

    // University Rankings Sidebar
    this.setText('#qs-ranking-val', this.formatValue(inst.qs_ranking, 'Top Ranked'));
    this.setText('#the-ranking-val', this.formatValue(inst.the_ranking, 'Top Ranked'));
    this.setText('#est-year-val', this.formatValue(inst.establishment_year || inst.historical_founding_year, 'Established HEI'));
    this.setText('#location-val', `${this.formatValue(inst.city, 'Ireland')}${inst.county ? ', Co. ' + inst.county : ''}`);

    const instKey = inst.id || course.institution_id || course.institution_name || inst.name || instName;
    const instImgUrl = window.API?.getInstitutionImage ? window.API.getInstitutionImage(instKey) : 'assets/images/institutions/default.jpg';

    // Set University Snapshot Sidebar Image
    const instImgEl = document.querySelector('#details-institution-img');
    if (instImgEl) {
      instImgEl.src = instImgUrl;
      instImgEl.alt = `${instName} Campus`;
    }

    // Set Subtle Transparent Institution Background Watermark on Hero
    const heroBgEl = document.querySelector('#details-hero-bg');
    if (heroBgEl && instImgUrl) {
      heroBgEl.style.backgroundImage = `url('${instImgUrl}')`;
    }
  },

  setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  },

  renderNotFound(msg) {
    document.title = "Course Not Found | Aspire Rise Ventures";
    
    // Hide details hero & metrics section if present
    const hero = document.querySelector('.details-hero');
    if (hero) hero.style.display = 'none';

    const metrics = document.querySelector('.metrics-section');
    if (metrics) metrics.style.display = 'none';

    const main = document.querySelector('main');
    if (main) {
      main.style.gridTemplateColumns = '1fr';
      main.innerHTML = `
        <div class="container" style="padding: 5rem 1rem; text-align: center; max-width: 600px; margin: 0 auto;">
          <div style="width: 64px; height: 64px; background: var(--color-orange-100); color: var(--color-orange-500); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h2 style="font-size: 1.85rem; font-weight: 800; color: var(--color-navy-800); margin-bottom: 0.75rem;">Course Not Found</h2>
          <p style="color: var(--color-slate-600); margin-bottom: 2rem; font-size: 1rem; line-height: 1.6;">${msg}</p>
          <a href="index.html" class="btn btn-primary" style="padding: 0.85rem 2rem; font-weight: 700;">Return to Course Search</a>
        </div>
      `;
    }
  }
};
