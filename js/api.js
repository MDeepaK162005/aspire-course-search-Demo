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
    // Verified Local Campus Images
    1: 'assets/images/institutions/atu.jpg',
    2: 'assets/images/institutions/setu.jpg',
    3: 'assets/images/institutions/mtu.jpg',
    4: 'assets/images/institutions/tus.jpg',
    5: 'assets/images/institutions/default.jpg',
    6: 'assets/images/institutions/rcsi.jpg',
    7: 'assets/images/institutions/tu-dublin.jpg',
    8: 'assets/images/institutions/default.jpg',
    9: 'assets/images/institutions/default.jpg',
    10: 'assets/images/institutions/dbs.jpg',
    11: 'assets/images/institutions/dbs.jpg',
    12: 'assets/images/institutions/default.jpg',
    13: 'assets/images/institutions/default.jpg',
    14: 'assets/images/institutions/dbs.jpg',
    15: 'assets/images/institutions/default.jpg',
    16: 'assets/images/institutions/university-of-galway.jpg',
    17: 'assets/images/institutions/nci.jpg',
    18: 'assets/images/institutions/maynooth-university.jpg',
    19: 'assets/images/institutions/dkit.jpg',
    20: 'assets/images/institutions/iadt.jpg',
    21: 'assets/images/institutions/default.jpg',
    22: 'assets/images/institutions/university-of-galway.jpg',
    23: 'assets/images/institutions/default.jpg',
    24: 'assets/images/institutions/default.jpg',
    25: 'assets/images/institutions/ncad.jpg',
    26: 'assets/images/institutions/dcu.jpg',
    27: 'assets/images/institutions/university-of-limerick.jpg',
    28: 'assets/images/institutions/default.jpg',
    29: 'assets/images/institutions/dbs.jpg',
    30: 'assets/images/institutions/griffith-college.jpg',
    31: 'assets/images/institutions/ncad.jpg',
    32: 'assets/images/institutions/default.jpg',
    33: 'assets/images/institutions/default.jpg',
    34: 'assets/images/institutions/default.jpg',
    35: 'assets/images/institutions/ucd.jpg',
    36: 'assets/images/institutions/ucc.jpg',
    37: 'assets/images/institutions/university-of-galway.jpg',
    38: 'assets/images/institutions/trinity-college-dublin.jpg',
    39: 'assets/images/institutions/university-of-limerick.jpg',
    40: 'assets/images/institutions/default.jpg',
    41: 'assets/images/institutions/maynooth-university.jpg',
    42: 'assets/images/institutions/default.jpg',
    43: 'assets/images/institutions/trinity-college-dublin.jpg',
    44: 'assets/images/institutions/setu.jpg',
    45: 'assets/images/institutions/trinity-college-dublin.jpg',
    46: 'assets/images/institutions/default.jpg',
    'default': 'assets/images/institutions/default.jpg'
  },

  /**
   * Verified Subject / Category Image Map
   */
  SUBJECT_IMAGES: {
    'computer science': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    'artificial intelligence': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    'data analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'data science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'cybersecurity': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'software engineering': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'business': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'finance': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'accounting': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'management': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'engineering': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'mechanical engineering': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    'civil engineering': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    'electronic': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'medicine': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    'health': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    'nursing': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    'pharmacy': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    'science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'biotechnology': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    'law': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    'education': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'arts': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    'humanities': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    'music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'psychology': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    'default': 'assets/images/institutions/default.jpg'
  },

  /**
   * Helper: Resolve best Institution Image
   */
  getInstitutionImage(instIdOrName) {
    if (!instIdOrName) return this.INSTITUTION_IMAGES['default'];
    if (this.INSTITUTION_IMAGES[instIdOrName]) {
      return this.INSTITUTION_IMAGES[instIdOrName];
    }
    const nameStr = String(instIdOrName).toLowerCase();
    if (nameStr.includes('trinity') || nameStr.includes('tcd')) return this.INSTITUTION_IMAGES[45];
    if (nameStr.includes('ucd') || nameStr.includes('university college dublin')) return this.INSTITUTION_IMAGES[35];
    if (nameStr.includes('tu dublin') || nameStr.includes('technological university dublin')) return this.INSTITUTION_IMAGES[7];
    if (nameStr.includes('dcu') || nameStr.includes('dublin city')) return this.INSTITUTION_IMAGES[26];
    if (nameStr.includes('galway')) return this.INSTITUTION_IMAGES[37];
    if (nameStr.includes('cork') || nameStr.includes('ucc')) return this.INSTITUTION_IMAGES[36];
    if (nameStr.includes('limerick') || nameStr.includes('ul')) return this.INSTITUTION_IMAGES[27];
    if (nameStr.includes('maynooth')) return this.INSTITUTION_IMAGES[18];
    if (nameStr.includes('nci') || nameStr.includes('national college of ireland')) return this.INSTITUTION_IMAGES[17];
    if (nameStr.includes('rcsi')) return this.INSTITUTION_IMAGES[6];
    if (nameStr.includes('atu') || nameStr.includes('atlantic')) return this.INSTITUTION_IMAGES[1];
    if (nameStr.includes('setu') || nameStr.includes('south east')) return this.INSTITUTION_IMAGES[2];
    if (nameStr.includes('mtu') || nameStr.includes('munster')) return this.INSTITUTION_IMAGES[3];
    if (nameStr.includes('tus') || nameStr.includes('shannon')) return this.INSTITUTION_IMAGES[4];
    if (nameStr.includes('griffith')) return this.INSTITUTION_IMAGES[30];
    if (nameStr.includes('dbs') || nameStr.includes('dublin business school')) return this.INSTITUTION_IMAGES[29];
    if (nameStr.includes('ncad')) return this.INSTITUTION_IMAGES[31];
    if (nameStr.includes('dkit') || nameStr.includes('dundalk')) return this.INSTITUTION_IMAGES[19];
    if (nameStr.includes('iadt')) return this.INSTITUTION_IMAGES[20];
    return this.INSTITUTION_IMAGES['default'];
  },

  /**
   * Helper: Resolve best Course Image
   */
  getCourseImage(course) {
    if (!course) return this.SUBJECT_IMAGES['default'];
    if (course.image_url && course.image_url !== 'N/A' && course.image_url !== '#') {
      return course.image_url;
    }
    const combined = `${course.subject || ''} ${course.course_name || ''}`.toLowerCase();
    for (const [key, url] of Object.entries(this.SUBJECT_IMAGES)) {
      if (key !== 'default' && combined.includes(key)) {
        return url;
      }
    }
    const instId = course.institution_id || course.institution?.id || course.institution_name;
    return this.getInstitutionImage(instId);
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
            query = query.eq('institution_id', Number(instStr));
          } else {
            const cleanInst = instStr.split('(')[0].trim();
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

    if (window.supabaseClient) {
      try {
        const { data: course, error } = await window.supabaseClient
          .from('courses')
          .select('*, institutions(*)')
          .eq('id', id)
          .single();

        if (error) {
          console.error('❌ Supabase getCourseById error:', error);
        } else if (course) {
          if (!course.institutions && course.institution_name) {
            const cleanName = course.institution_name.split('(')[0].trim();
            const { data: instData } = await window.supabaseClient
              .from('institutions')
              .select('*')
              .ilike('name', `%${cleanName}%`)
              .limit(1);

            if (instData && instData.length > 0) {
              course.institution = instData[0];
            }
          } else {
            course.institution = course.institutions;
          }

          return course;
        }
      } catch (err) {
        console.error('❌ Error executing getCourseById on Supabase:', err);
      }
    }

    if (window.CONFIG?.USE_MOCK_FALLBACK && window.MOCK_DATA) {
      const course = window.MOCK_DATA.courses.find(c => String(c.id) === String(id));
      if (!course) return null;
      const inst = window.MOCK_DATA.institutions.find(i => 
        (course.institution_id && i.id === course.institution_id) ||
        i.name.toLowerCase() === course.institution_name.toLowerCase()
      ) || {};
      return { ...course, institution: inst };
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
      results = results.filter(c =>
        (c.course_name && c.course_name.toLowerCase().includes(q)) ||
        (c.institution_name && c.institution_name.toLowerCase().includes(q)) ||
        (c.subject && c.subject.toLowerCase().includes(q)) ||
        (c.qualification && c.qualification.toLowerCase().includes(q))
      );
    }

    // Level (Independent)
    if (level && level !== 'All') {
      results = results.filter(c => c.study_level && c.study_level.toUpperCase().includes(level.toUpperCase()));
    }

    // Subject (Independent)
    if (subject && subject !== 'All') {
      results = results.filter(c => c.subject && c.subject.toLowerCase().includes(subject.toLowerCase()));
    }

    // Institution (Independent - supports ID or Name)
    if (institution && institution !== 'All') {
      const instStr = String(institution).toLowerCase().trim();
      const isNum = !isNaN(Number(instStr)) && Number(instStr) > 0;
      if (isNum) {
        results = results.filter(c => Number(c.institution_id) === Number(instStr));
      } else {
        results = results.filter(c => {
          const cInst = (c.institution_name || '').toLowerCase();
          return cInst.includes(instStr);
        });
      }
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
