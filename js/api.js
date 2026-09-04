/**
 * Aspire Rise Ventures - Supabase Database API Layer
 * Communicates directly with real Supabase DB via window.supabaseClient
 * Validated against actual columns: courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, course_code, official_url, duration, intake, fee)
 * and institutions (id, name, institution_type, category, ownership, city, county, main_campus, website, admissions_url, establishment_year, qs_ranking, the_ranking, international_tuition_fee, scholarships, accommodation, additional_notes)
 */

window.API = {
  /**
   * 1. Query real courses table with filters, search, sorting and pagination
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
      sortBy = 'relevance',
      page = 1,
      limit = window.CONFIG?.COURSES_PER_PAGE || 12
    } = params;

    if (window.supabaseClient) {
      try {
        let query = window.supabaseClient
          .from('courses')
          .select('*, institutions(*)', { count: 'exact' });

        // Keyword Search against actual existing columns
        if (search && search.trim()) {
          const term = search.trim();
          query = query.or(`course_name.ilike.%${term}%,institution_name.ilike.%${term}%,subject.ilike.%${term}%,qualification.ilike.%${term}%`);
        }

        // Level Filter mapping to actual database study_level values
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

        // Subject Filter against subject column
        if (subject && subject !== 'All') {
          query = query.ilike('subject', `%${subject}%`);
        }

        // Institution Filter against institution_name column
        if (institution && institution !== 'All') {
          const cleanInst = institution.split('(')[0].trim();
          query = query.ilike('institution_name', `%${cleanInst}%`);
        }

        // Study Mode Filter against study_mode column
        if (studyMode && studyMode !== 'All') {
          query = query.ilike('study_mode', `%${studyMode}%`);
        }

        // NFQ Level Filter against nfq_level column
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
          // If institutions join is null (because institution_id is null in DB), match institution by name
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
      const inst = window.MOCK_DATA.institutions.find(i => i.name.toLowerCase() === course.institution_name.toLowerCase()) || {};
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
              // Extract sub-disciplines if slash-separated
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
   * Internal local fallback search algorithm
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
      sortBy = 'relevance',
      page = 1,
      limit = 12
    } = params;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(c =>
        c.course_name.toLowerCase().includes(q) ||
        c.institution_name.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.qualification.toLowerCase().includes(q)
      );
    }

    if (level && level !== 'All') {
      results = results.filter(c => c.study_level.toUpperCase().includes(level.toUpperCase()));
    }

    if (subject && subject !== 'All') {
      results = results.filter(c => c.subject.toLowerCase().includes(subject.toLowerCase()));
    }

    if (institution && institution !== 'All') {
      results = results.filter(c => c.institution_name.toLowerCase().includes(institution.toLowerCase()));
    }

    if (studyMode && studyMode !== 'All') {
      results = results.filter(c => c.study_mode.toLowerCase().includes(studyMode.toLowerCase()));
    }

    if (nfqLevel && nfqLevel !== 'All') {
      results = results.filter(c => String(c.nfq_level).includes(String(nfqLevel)));
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
