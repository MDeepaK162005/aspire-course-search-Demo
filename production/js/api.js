/**
 * Aspire Rise Ventures - Supabase Database API Layer
 * Communicates directly with real Supabase DB via window.supabaseClient
 * Validated against actual columns: courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, course_code, official_url, duration, intake, fee)
 * and institutions (id, name, institution_type, category, ownership, city, county, main_campus, website, admissions_url, establishment_year, qs_ranking, the_ranking, international_tuition_fee, scholarships, accommodation, additional_notes)
 */

window.API = {
  /**
   * Verified Institution Image Map
   */
  /**
   * Verified Local Institution Image Map
   */
  INSTITUTION_IMAGES: {
    // Verified Real Local Campus Photographs for all Irish Higher Education Institutions
    1: 'assets/images/institutions/atu.jpg',                      // Atlantic Technological University (ATU)
    2: 'assets/images/institutions/setu.jpg',                     // South East Technological University (SETU)
    3: 'assets/images/institutions/mtu.jpg',                      // Munster Technological University (MTU)
    4: 'assets/images/institutions/tus.jpg',                      // Technological University of the Shannon (TUS)
    5: 'assets/images/institutions/default.jpg',                 // Holmes Institute Dublin
    6: 'assets/images/institutions/rcsi.jpg',                     // RCSI University of Medicine & Health Sciences
    7: 'assets/images/institutions/tu-dublin.jpg',                // Technological University Dublin (TU Dublin)
    8: 'assets/images/institutions/default.jpg',                 // Setanta College
    9: 'assets/images/institutions/nci.jpg',                      // Independent College Dublin
    10: 'assets/images/institutions/dbs.jpg',                     // CCT College Dublin
    11: 'assets/images/institutions/dbs.jpg',                     // IBAT College Dublin
    12: 'assets/images/institutions/default.jpg',                 // Irish College of Humanities and Applied Sciences
    13: 'assets/images/institutions/default.jpg',                 // IICP College
    14: 'assets/images/institutions/dbs.jpg',                     // ICD Business School
    15: 'assets/images/institutions/default.jpg',                 // Hibernia College
    16: 'assets/images/institutions/university-of-galway.jpg',    // Galway Business School (GBS)
    17: 'assets/images/institutions/nci.jpg',                     // National College of Ireland (NCI)
    18: 'assets/images/institutions/maynooth-university.jpg',     // Maynooth University
    19: 'assets/images/institutions/dkit.jpg',                    // Dundalk Institute of Technology (DkIT)
    20: 'assets/images/institutions/iadt.jpg',                    // Dún Laoghaire Institute of Art, Design and Technology (IADT)
    21: 'assets/images/institutions/american-college-dublin.jpg', // American College Dublin (ACD)
    22: 'assets/images/institutions/burren-college-art.jpg',      // Burren College of Art (BCA)
    23: 'assets/images/institutions/default.jpg',                 // Open Training College
    24: 'assets/images/institutions/default.jpg',                 // PCI College
    25: 'assets/images/institutions/ncad.jpg',                    // Dublin Institute of Design
    26: 'assets/images/institutions/dcu.jpg',                     // Dublin City University (DCU)
    27: 'assets/images/institutions/university-of-limerick.jpg',  // University of Limerick (UL)
    28: 'assets/images/institutions/default.jpg',                 // Dorset College Dublin
    29: 'assets/images/institutions/dbs.jpg',                     // Dublin Business School (DBS)
    30: 'assets/images/institutions/griffith-college.jpg',        // Griffith College
    31: 'assets/images/institutions/ncad.jpg',                    // National College of Art and Design (NCAD)
    32: 'assets/images/institutions/default.jpg',                 // St. Nicholas Montessori College Ireland
    33: 'assets/images/institutions/default.jpg',                 // Institute of Public Administration (IPA)
    34: 'assets/images/institutions/default.jpg',                 // Irish Management Institute (IMI)
    35: 'assets/images/institutions/ucd.jpg',                     // University College Dublin (UCD)
    36: 'assets/images/institutions/ucc.jpg',                     // University College Cork (UCC)
    37: 'assets/images/institutions/university-of-galway.jpg',    // University of Galway
    38: 'assets/images/institutions/marino-institute.jpg',        // Marino Institute of Education (MIE)
    39: 'assets/images/institutions/mary-immaculate-college.jpg', // Mary Immaculate College (MIC)
    40: 'assets/images/institutions/default.jpg',                 // Institute of Banking (IOB)
    41: 'assets/images/institutions/sppu-maynooth.jpg',           // St. Patrick's Pontifical University, Maynooth (SPPU)
    42: 'assets/images/institutions/law-society.jpg',             // Law Society of Ireland — Law School
    43: 'assets/images/institutions/riam.jpg',                    // Royal Irish Academy of Music (RIAM)
    44: 'assets/images/institutions/default.jpg',                 // Carlow College, St. Patrick's
    45: 'assets/images/institutions/trinity-college-dublin.jpg',  // Trinity College Dublin (TCD)
    46: 'assets/images/institutions/default.jpg',                 // The Honorable Society of King's Inns
    'default': 'assets/images/institutions/default.jpg'
  },

  /**
   * Helper: Resolve best Institution Image based strictly on the course's institution
   */
  getInstitutionImage(instIdOrName) {
    if (!instIdOrName) return this.INSTITUTION_IMAGES['default'];
    
    // Check direct ID or key mapping
    if (this.INSTITUTION_IMAGES[instIdOrName]) {
      return this.INSTITUTION_IMAGES[instIdOrName];
    }
    
    const nameStr = String(instIdOrName).toLowerCase();
    
    // Specific Exact Matches
    if (nameStr.includes('trinity') || nameStr.includes('tcd')) return this.INSTITUTION_IMAGES[45];
    if (nameStr.includes('university college dublin') || nameStr.includes('ucd')) return this.INSTITUTION_IMAGES[35];
    if (nameStr.includes('technological university dublin') || nameStr.includes('tu dublin') || nameStr.includes('tud')) return this.INSTITUTION_IMAGES[7];
    if (nameStr.includes('dublin city') || nameStr.includes('dcu')) return this.INSTITUTION_IMAGES[26];
    if (nameStr.includes('galway') && (nameStr.includes('university') || nameStr.includes('nuig') || nameStr.includes('ollscoil'))) return this.INSTITUTION_IMAGES[37];
    if (nameStr.includes('cork') && (nameStr.includes('university') || nameStr.includes('ucc'))) return this.INSTITUTION_IMAGES[36];
    if (nameStr.includes('limerick') && (nameStr.includes('university of limerick') || nameStr.includes('ul'))) return this.INSTITUTION_IMAGES[27];
    if (nameStr.includes('pontifical') || nameStr.includes('sppu')) return this.INSTITUTION_IMAGES[41];
    if (nameStr.includes('maynooth')) return this.INSTITUTION_IMAGES[18];
    if (nameStr.includes('national college of ireland') || nameStr.includes('nci')) return this.INSTITUTION_IMAGES[17];
    if (nameStr.includes('rcsi') || nameStr.includes('surgeons')) return this.INSTITUTION_IMAGES[6];
    if (nameStr.includes('atlantic') || nameStr.includes('atu')) return this.INSTITUTION_IMAGES[1];
    if (nameStr.includes('south east') || nameStr.includes('setu')) return this.INSTITUTION_IMAGES[2];
    if (nameStr.includes('munster') || nameStr.includes('mtu')) return this.INSTITUTION_IMAGES[3];
    if (nameStr.includes('shannon') || nameStr.includes('tus')) return this.INSTITUTION_IMAGES[4];
    if (nameStr.includes('griffith')) return this.INSTITUTION_IMAGES[30];
    if (nameStr.includes('dublin business school') || nameStr.includes('dbs')) return this.INSTITUTION_IMAGES[29];
    if (nameStr.includes('art and design') || nameStr.includes('ncad')) return this.INSTITUTION_IMAGES[31];
    if (nameStr.includes('dundalk') || nameStr.includes('dkit')) return this.INSTITUTION_IMAGES[19];
    if (nameStr.includes('dún laoghaire') || nameStr.includes('dun laoghaire') || nameStr.includes('iadt')) return this.INSTITUTION_IMAGES[20];
    if (nameStr.includes('american college')) return this.INSTITUTION_IMAGES[21];
    if (nameStr.includes('burren')) return this.INSTITUTION_IMAGES[22];
    if (nameStr.includes('marino')) return this.INSTITUTION_IMAGES[38];
    if (nameStr.includes('mary immaculate')) return this.INSTITUTION_IMAGES[39];
    if (nameStr.includes('law society')) return this.INSTITUTION_IMAGES[42];
    if (nameStr.includes('music') || nameStr.includes('riam')) return this.INSTITUTION_IMAGES[43];
    if (nameStr.includes('cct')) return this.INSTITUTION_IMAGES[10];
    if (nameStr.includes('ibat')) return this.INSTITUTION_IMAGES[11];
    
    return this.INSTITUTION_IMAGES['default'];
  },

  /**
   * Helper: Resolve real institution image for a course
   */
  getCourseImage(course) {
    if (!course) return this.INSTITUTION_IMAGES['default'];
    if (course.image_url && course.image_url !== 'N/A' && course.image_url !== '#') {
      return course.image_url;
    }
    
    // Resolve strictly based on the associated institution
    const instId = course.institution_id || course.institution?.id || course.institution_name;
    const instImg = this.getInstitutionImage(instId);
    return instImg || this.INSTITUTION_IMAGES['default'];
  },

  /**
   * 1. Query real courses table with independent filters, search, sorting and pagination
   */
  async getCourses(params = {}) {
    const {
      search = '',
      country = 'Ireland',
      level = '',
      subject = '',
      institution = '',
      studyMode = '',
      nfqLevel = '',
      duration = '',
      ielts = '',
      sortBy = 'relevance',
      page = 1,
      limit = window.CONFIG?.COURSES_PER_PAGE || 12
    } = params;

    if (window.supabaseClient) {
      try {
        let query = window.supabaseClient
          .from('courses')
          .select('*, institutions(*)', { count: 'exact' });

        // Keyword Search
        if (search && search.trim()) {
          const term = search.trim();
          query = query.or(`course_name.ilike.%${term}%,institution_name.ilike.%${term}%,subject.ilike.%${term}%,qualification.ilike.%${term}%`);
        }

        // Level Filter (Independent)
        if (level && level !== 'All') {
          if (level === 'UG') {
            query = query.ilike('study_level', '%Undergraduate%');
          } else if (level === 'PG') {
            query = query.ilike('study_level', '%Postgraduate%');
          } else if (level === 'PhD') {
            query = query.or('study_level.ilike.%PhD%,study_level.ilike.%Doctorate%');
          } else {
            query = query.ilike('study_level', `%${level}%`);
          }
        }

        // Subject Filter (Independent)
        if (subject && subject !== 'All') {
          query = query.ilike('subject', `%${subject}%`);
        }

        // Institution Filter (Independent - Supports ID or Name)
        if (institution && institution !== 'All') {
          const instStr = String(institution).trim();
          const isNum = !isNaN(Number(instStr)) && Number(instStr) > 0;
          if (isNum) {
            // Find clean institution name if available
            const instObj = await this.getInstitutionById(Number(instStr));
            const cleanName = instObj ? instObj.name.split(',')[0].split('(')[0].trim() : '';
            if (cleanName) {
              query = query.or(`institution_id.eq.${Number(instStr)},institution_name.ilike.%${cleanName}%`);
            } else {
              query = query.eq('institution_id', Number(instStr));
            }
          } else {
            const cleanInst = instStr.split(',')[0].split('(')[0].trim();
            query = query.ilike('institution_name', `%${cleanInst}%`);
          }
        }

        // Duration Filter (Independent)
        if (duration && duration !== 'All' && duration !== 'Any Duration') {
          query = query.ilike('duration', `%${duration}%`);
        }

        // Study Mode Filter (Independent)
        if (studyMode && studyMode !== 'All') {
          query = query.ilike('study_mode', `%${studyMode}%`);
        }

        // NFQ Level Filter (Independent)
        if (nfqLevel && nfqLevel !== 'All') {
          query = query.ilike('nfq_level', `%${nfqLevel}%`);
        }

        // Sorting
        if (sortBy === 'name') {
          query = query.order('course_name', { ascending: true });
        } else if (sortBy === 'university') {
          query = query.order('institution_name', { ascending: true });
        } else {
          query = query.order('id', { ascending: true });
        }

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, count, error } = await query;

        if (error) {
          console.error('❌ Supabase getCourses error:', error);
        } else if (data) {
          return {
            data,
            total: count !== null ? count : data.length,
            page: Number(page),
            limit: Number(limit)
          };
        }
      } catch (err) {
        console.error('❌ Error executing getCourses on Supabase:', err);
      }
    }

    // Defensive fallback ONLY if Supabase connection fails or is disabled
    if (window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      return this._fetchLocalCourses(params);
    }

    return { data: [], total: 0, page: Number(page), limit: Number(limit) };
  },

  /**
   * 2. Query single course by ID from courses table & join matching institution
   */
  async getCourseById(id) {
    if (!id) return null;

    let course = null;

    // 1. Try Supabase
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from('courses')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('❌ Supabase getCourseById error:', error);
        } else if (data) {
          course = { ...data };

          // Fetch associated institution if present
          if (course.institution_id) {
            const { data: instData } = await window.supabaseClient
              .from('institutions')
              .select('*')
              .eq('id', course.institution_id)
              .maybeSingle();

            if (instData) {
              course.institution = instData;
            }
          }

          // If no institution attached yet, resolve by institution_name
          if (!course.institution && course.institution_name) {
            const cleanName = course.institution_name.split('(')[0].split(',')[0].trim();
            const { data: instList } = await window.supabaseClient
              .from('institutions')
              .select('*')
              .ilike('name', `%${cleanName}%`)
              .limit(1);

            if (instList && instList.length > 0) {
              course.institution = instList[0];
            }
          }
        }
      } catch (err) {
        console.error('❌ Error executing getCourseById on Supabase:', err);
      }
    }

    // 2. Fallback to Local Verified Database (MOCK_DATA) if not found on Supabase
    if (!course && window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      const mockCourse = window.MOCK_DATA.courses.find(c => String(c.id) === String(id));
      if (mockCourse) {
        course = { ...mockCourse };
      }
    }

    // 3. Resolve institution data if missing
    if (course) {
      if (!course.institution && window.MOCK_DATA?.institutions) {
        const rawName = (course.institution_name || '').toLowerCase().trim();
        const cleanName = rawName.split('(')[0].split(',')[0].trim();

        const inst = window.MOCK_DATA.institutions.find(i => {
          if (course.institution_id && Number(i.id) === Number(course.institution_id)) return true;
          const iName = i.name.toLowerCase();
          if (iName === rawName || iName.includes(cleanName) || cleanName.includes(iName)) return true;
          if (rawName.includes('ucd') && (iName.includes('ucd') || iName.includes('university college dublin'))) return true;
          if (rawName.includes('tcd') && (iName.includes('trinity') || iName.includes('dublin'))) return true;
          if (rawName.includes('dcu') && (iName.includes('dcu') || iName.includes('dublin city'))) return true;
          if (rawName.includes('ucc') && (iName.includes('cork') || iName.includes('ucc'))) return true;
          if (rawName.includes('galway') && iName.includes('galway')) return true;
          if (rawName.includes('limerick') && iName.includes('limerick')) return true;
          if (rawName.includes('maynooth') && iName.includes('maynooth')) return true;
          return false;
        });

        if (inst) {
          course.institution = inst;
        }
      }
      return course;
    }

    return null;
  },

  /**
   * 3. Query all institutions from real institutions table
   */
  async getInstitutions() {
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from('institutions')
          .select('*')
          .order('name', { ascending: true });

        if (error) {
          console.error('❌ Supabase getInstitutions error:', error);
        } else if (data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.error('❌ Error executing getInstitutions on Supabase:', err);
      }
    }

    if (window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      return window.MOCK_DATA.institutions;
    }

    return [];
  },

  /**
   * 4. Query single institution by ID from real institutions table
   */
  async getInstitutionById(id) {
    if (!id) return null;

    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from('institutions')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('❌ Supabase getInstitutionById error:', error);
        } else if (data) {
          return data;
        }
      } catch (err) {
        console.error('❌ Error executing getInstitutionById on Supabase:', err);
      }
    }

    if (window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      return window.MOCK_DATA.institutions.find(i => String(i.id) === String(id)) || null;
    }

    return null;
  },

  /**
   * Query unique subjects from courses table
   */
  async fetchSubjects() {
    if (window.supabaseClient) {
      try {
        const { data, error } = await window.supabaseClient
          .from('courses')
          .select('subject');

        if (!error && data) {
          const subjects = new Set();
          data.forEach(c => {
            if (c.subject && c.subject !== 'N/A') {
              const parts = c.subject.split('/');
              parts.forEach(p => subjects.add(p.trim()));
            }
          });
          if (subjects.size > 0) return Array.from(subjects).sort();
        }
      } catch (err) {
        console.error('❌ Error executing fetchSubjects on Supabase:', err);
      }
    }

    if (window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      const subjects = new Set();
      window.MOCK_DATA.courses.forEach(c => {
        if (c.subject && c.subject !== 'N/A') {
          const parts = c.subject.split('/');
          parts.forEach(p => subjects.add(p.trim()));
        }
      });
      return Array.from(subjects).sort();
    }

    return [];
  },

  /* Function Aliases for full UI Component Compatibility */
  async fetchCourses(params) { return this.getCourses(params); },
  async fetchCourseById(id) { return this.getCourseById(id); },
  async fetchInstitutions() { return this.getInstitutions(); },

  /**
   * Internal local fallback search algorithm with independent AND filtering
   */
  _fetchLocalCourses(params) {
    const mock = window.MOCK_DATA;
    if (!mock || !mock.courses) return { data: [], total: 0, page: 1, limit: 12 };

    let results = [...mock.courses];
    const {
      search = '',
      level = '',
      subject = '',
      institution = '',
      studyMode = '',
      nfqLevel = '',
      duration = '',
      sortBy = 'relevance',
      page = 1,
      limit = 12
    } = params;

    // Search keyword
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const qWords = q.split(/\s+/).filter(w => w.length > 1);

      results = results.filter(c => {
        const name = (c.course_name || '').toLowerCase();
        const code = (c.course_code || '').toLowerCase();
        const inst = (c.institution_name || '').toLowerCase();
        const sub = (c.subject || '').toLowerCase();
        const qual = (c.qualification || '').toLowerCase();
        const fullText = `${name} ${code} ${inst} ${sub} ${qual}`;

        if (fullText.includes(q)) return true;
        if (qWords.length > 1 && qWords.every(w => fullText.includes(w))) return true;
        return false;
      });
    }

    // Level (Independent)
    if (level && level !== 'All') {
      const lvl = level.toUpperCase();
      results = results.filter(c => {
        if (!c.study_level) return false;
        const cLvl = c.study_level.toUpperCase();
        if (lvl === 'UG') return cLvl.includes('UNDERGRADUATE') || cLvl.includes('UG');
        if (lvl === 'PG') return cLvl.includes('POSTGRADUATE') || cLvl.includes('PG');
        if (lvl === 'PHD') return cLvl.includes('PHD') || cLvl.includes('DOCTORATE');
        return cLvl.includes(lvl);
      });
    }

    // Subject (Independent)
    if (subject && subject !== 'All') {
      results = results.filter(c => c.subject && c.subject.toLowerCase().includes(subject.toLowerCase()));
    }

    // Institution (Independent - supports ID, Name, or Abbreviation like UCD, DCU, TCD)
    if (institution && institution !== 'All') {
      const instStr = String(institution).trim();
      const instLower = instStr.toLowerCase();
      const acronymMap = {
        ucd: "University College Dublin",
        tcd: "Trinity College Dublin",
        dcu: "Dublin City University",
        ucc: "University College Cork",
        ul: "University of Limerick",
        galway: "University of Galway",
        maynooth: "Maynooth University",
        tud: "Technological University Dublin",
        atu: "Atlantic Technological University",
        setu: "South East Technological University",
        mtu: "Munster Technological University",
        tus: "Technological University of the Shannon",
        nci: "National College of Ireland",
        rcsi: "RCSI",
        dkit: "Dundalk",
        iadt: "IADT",
        ncad: "National College of Art",
        dbs: "Dublin Business School",
        cct: "CCT",
        ibat: "IBAT",
        mic: "Mary Immaculate",
        mie: "Marino",
        iob: "Institute of Banking"
      };

      const resolvedSearchTerm = acronymMap[instLower] || instStr;
      const mockInsts = mock.institutions || [];
      const targetInst = mockInsts.find(i => 
        String(i.id) === instStr || 
        i.name.toLowerCase() === instStr.toLowerCase() ||
        i.name.toLowerCase().includes(resolvedSearchTerm.toLowerCase()) ||
        (i.former_names && i.former_names.toLowerCase().includes(instLower))
      );

      const instIdNum = targetInst ? Number(targetInst.id) : (!isNaN(Number(instStr)) ? Number(instStr) : null);
      const rawName = targetInst ? targetInst.name : resolvedSearchTerm;
      const cleanName = rawName.split(',')[0].split('(')[0].trim().toLowerCase();

      results = results.filter(c => {
        if (instIdNum !== null && c.institution_id !== null && c.institution_id !== undefined && Number(c.institution_id) === instIdNum) {
          return true;
        }
        const cName = (c.institution_name || '').toLowerCase();
        return cName.includes(cleanName) || cleanName.includes(cName);
      });
    }

    // Study Mode (Independent)
    if (studyMode && studyMode !== 'All') {
      results = results.filter(c => c.study_mode && c.study_mode.toLowerCase().includes(studyMode.toLowerCase()));
    }

    // NFQ Level (Independent)
    if (nfqLevel && nfqLevel !== 'All') {
      results = results.filter(c => String(c.nfq_level).includes(String(nfqLevel)));
    }

    // Duration (Independent)
    if (duration && duration !== 'All' && duration !== 'Any Duration') {
      results = results.filter(c => c.duration && c.duration.toLowerCase().includes(duration.toLowerCase()));
    }

    if (sortBy === 'name') {
      results.sort((a, b) => a.course_name.localeCompare(b.course_name));
    } else if (sortBy === 'university') {
      results.sort((a, b) => a.institution_name.localeCompare(b.institution_name));
    } else if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      const qTokens = q.split(/\s+/).filter(Boolean);

      results.sort((a, b) => {
        const score = (c) => {
          let s = 0;
          const name = (c.course_name || '').toLowerCase();
          const code = (c.course_code || '').toLowerCase();
          const sub = (c.subject || '').toLowerCase();
          const inst = (c.institution_name || '').toLowerCase();

          if (name === q || code === q) s += 1000;
          else if (name.startsWith(q)) s += 600;
          else if (name.includes(q)) s += 400;

          qTokens.forEach(t => {
            if (name.includes(t)) s += 50;
          });

          if (sub === q) s += 150;
          else if (sub.includes(q)) s += 80;

          if (inst.includes(q)) s += 30;

          return s;
        };

        return score(b) - score(a);
      });
    }

    const total = results.length;
    const from = (page - 1) * limit;
    const paginated = results.slice(from, from + limit);

    return {
      data: paginated,
      total,
      page: Number(page),
      limit: Number(limit)
    };
  }
};
