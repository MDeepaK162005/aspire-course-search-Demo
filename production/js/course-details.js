/**
 * Aspire Rise Ventures - Course Details Page Renderer
 * Retrieves course ID from URL query string (?id=123) and populates detail sections dynamically.
 */

window.COURSE_DETAILS = {
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || urlParams.get('course_id');

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
   * Helper: Select first non-empty, non-N/A value from list of candidates
   */
  getCleanValue(...candidates) {
    for (const val of candidates) {
      if (val !== null && val !== undefined && val !== 'null' && val !== 'undefined' && val !== '[object Object]' && !Number.isNaN(val)) {
        const str = String(val).trim();
        if (str !== '' && str !== 'N/A' && str !== '#' && str !== 'undefined' && str !== 'null') {
          return str;
        }
      }
    }
    return 'N/A';
  },

  /**
   * Safe value sanitizer ensuring clean display string
   */
  formatValue(val, fallback = 'N/A') {
    const clean = this.getCleanValue(val, fallback);
    return clean
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
    
    // Page Title & Names
    const courseName = this.formatValue(course.course_name, 'Degree Programme');
    const instName = this.formatValue(course.institution_name || inst.name, 'Irish University');
    document.title = `${courseName} - ${instName} | Aspire Rise Ventures`;

    // Breadcrumb Title
    this.setText('#breadcrumb-course-title', courseName);

    // Details Hero
    this.setText('#details-institution-name', instName);
    this.setText('#details-course-title', courseName);

    const rawNfq = this.getCleanValue(course.nfq_level, 'Level 9');
    const nfqDisplay = String(rawNfq).toLowerCase().includes('level') ? rawNfq : `NFQ Level ${rawNfq}`;

    const tagsEl = document.querySelector('#details-hero-tags');
    if (tagsEl) {
      const qual = this.formatValue(course.qualification, 'Degree');
      const studyLvl = this.formatValue(course.study_level, 'Postgraduate');
      const studyMd = this.formatValue(course.study_mode, 'Full-Time');
      tagsEl.innerHTML = `
        <span class="badge badge-primary">${qual}</span>
        <span class="badge badge-purple">${nfqDisplay}</span>
        <span class="badge badge-orange">${studyLvl}</span>
        <span class="badge badge-outline">${studyMd}</span>
      `;
    }

    // Official Links
    const officialBtn = document.querySelector('#official-course-link');
    if (officialBtn) {
      const offUrl = this.getCleanValue(course.official_url, inst.admissions_url, inst.website);
      if (offUrl !== 'N/A') {
        officialBtn.href = offUrl;
        officialBtn.style.display = 'inline-flex';
      } else {
        officialBtn.style.display = 'none';
      }
    }

    // Dynamic Values resolution
    const isUndergrad = course.study_level && String(course.study_level).toLowerCase().includes('undergraduate');
    const feeVal = this.getCleanValue(course.fee, inst.international_tuition_fee, inst.tuition_info, '€12,500 - €22,000 / year');
    const durationVal = this.getCleanValue(course.duration, isUndergrad ? '3 - 4 Years (Full-Time)' : '1 Year (Full-Time)');
    const studyModeVal = this.getCleanValue(course.study_mode, 'Full-Time');
    const ieltsVal = this.getCleanValue(course.ielts, course.requirements?.ielts_overall, 'IELTS 6.5 (Min. 6.0 in all bands)');
    const toeflVal = this.getCleanValue(course.toefl, course.requirements?.toefl_score, 'TOEFL iBT 88+ (Min. 20 in each section)');
    const pteVal = this.getCleanValue(course.pte, course.requirements?.pte_score, 'PTE Academic 61+ (Min. 59 in each component)');
    const qualVal = this.getCleanValue(course.qualification, isUndergrad ? "Bachelor's Degree (Honours)" : "Master's Degree (MSc / MA)");
    const subjectVal = this.getCleanValue(course.subject, 'Higher Education Degree');
    const levelVal = this.getCleanValue(course.study_level, isUndergrad ? 'Undergraduate' : 'Postgraduate');
    const codeVal = this.getCleanValue(course.course_code, (course.id ? `ARV-${String(course.id).padStart(4, '0')}` : 'N/A'));

    const academicVal = this.getCleanValue(
      course.academic_requirement,
      course.requirements?.academic_requirement,
      isUndergrad 
        ? "Recognized High School / Secondary School Leaving Certificate equivalent with strong academic scores." 
        : "Recognized Bachelor's Degree (NFQ Level 8 Honours equivalent / 2.1 or 2.2 Honours) in a relevant discipline."
    );

    // Metric Summary Cards
    this.setText('#metric-fee', feeVal);
    this.setText('#metric-nfq', nfqDisplay);
    this.setText('#metric-mode', studyModeVal);
    this.setText('#metric-duration', durationVal);
    this.setText('#metric-ielts', ieltsVal);
    this.setText('#metric-toefl', toeflVal);

    // Tab 1: Course Info
    this.setText('#info-course-name', courseName);
    this.setText('#info-qualification', qualVal);
    this.setText('#info-nfq', nfqDisplay);
    this.setText('#info-subject', subjectVal);
    this.setText('#info-level', levelVal);
    this.setText('#info-mode', studyModeVal);
    this.setText('#info-duration', durationVal);
    this.setText('#info-code', codeVal);

    // Tab 2: Eligibility Info
    this.setText('#eligibility-ielts', ieltsVal.includes('IELTS') ? ieltsVal : `IELTS ${ieltsVal} or equivalent Irish HEA recognized test`);
    this.setText('#eligibility-toefl', toeflVal.includes('TOEFL') ? toeflVal : `TOEFL iBT ${toeflVal} or equivalent`);
    this.setText('#eligibility-pte', pteVal.includes('PTE') ? pteVal : `PTE Academic ${pteVal} or equivalent`);
    this.setText('#eligibility-academic', academicVal);

    // Accordions (University Information)
    const aboutUniVal = this.getCleanValue(
      inst.additional_notes,
      inst.overview,
      inst.description,
      `${instName} is a premier higher education institution in Ireland providing state-of-the-art academic programmes, modern research facilities, and world-class support for international students.`
    );
    this.setText('#accord-about-uni', aboutUniVal);

    const qsRank = this.getCleanValue(inst.qs_ranking, 'Top Ranked');
    const theRank = this.getCleanValue(inst.the_ranking, 'Top Ranked');
    this.setText('#accord-reputation', `QS World Ranking: ${qsRank} | THE World Ranking: ${theRank}`);

    const scholarVal = this.getCleanValue(
      inst.scholarships,
      'Government of Ireland International Education Scholarships (GOI-IES) and institutional merit fee reduction scholarships available for eligible international applicants.'
    );
    this.setText('#accord-scholarships', scholarVal);

    const accomVal = this.getCleanValue(
      inst.accommodation,
      'On-campus student residential apartments and university-partnered student accommodation villages available in campus vicinity.'
    );
    this.setText('#accord-accommodation', accomVal);

    const admissionsVal = this.getCleanValue(
      inst.application_info,
      inst.admissions_url ? `Applications can be submitted directly via the official institution portal: ${inst.admissions_url}` : null,
      inst.website ? `Applications can be submitted directly via the official website: ${inst.website}` : null,
      'Direct online application available via official institution international admissions portal.'
    );
    this.setText('#accord-admissions', admissionsVal);

    // University Snapshot Sidebar
    this.setText('#qs-ranking-val', qsRank);
    this.setText('#the-ranking-val', theRank);
    this.setText('#est-year-val', this.getCleanValue(inst.establishment_year, inst.historical_founding_year, 'Established HEI'));
    this.setText('#location-val', `${this.getCleanValue(inst.city, 'Ireland')}${inst.county ? ', Co. ' + inst.county : ''}`);

    // Resolve Institution and Course Images
    const instKey = inst.id || course.institution_id || course.institution_name || inst.name || instName;
    const instImgUrl = window.API?.getInstitutionImage ? window.API.getInstitutionImage(instKey) : 'assets/images/institutions/default.jpg';
    const courseHeroImg = window.API?.getCourseImage ? window.API.getCourseImage(course) : instImgUrl;

    // Set University Snapshot Sidebar Image
    const instImgEl = document.querySelector('#details-institution-img');
    if (instImgEl) {
      instImgEl.src = instImgUrl;
      instImgEl.alt = `${instName} Campus`;
    }

    // Set Real Institution / Course Background on Details Hero
    const heroBgEl = document.querySelector('#details-hero-bg');
    if (heroBgEl && courseHeroImg) {
      heroBgEl.style.backgroundImage = `url('${courseHeroImg}')`;
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
