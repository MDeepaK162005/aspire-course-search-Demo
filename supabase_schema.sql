-- =================================================================
-- ASPIRE RISE VENTURES - SUPABASE DATABASE SCHEMA & SEED SCRIPT
-- Contains relational schema: institutions, courses, course_requirements
-- =================================================================

-- 1. INSTITUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.institutions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    institution_type TEXT,
    category TEXT,
    ownership TEXT,
    city TEXT,
    county TEXT,
    main_campus TEXT,
    website TEXT,
    admissions_url TEXT,
    establishment_year TEXT,
    qs_ranking TEXT,
    the_ranking TEXT,
    international_tuition_fee TEXT,
    scholarships TEXT,
    accommodation TEXT,
    additional_notes TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES public.institutions(id) ON DELETE CASCADE,
    institution_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    qualification TEXT,
    nfq_level TEXT,
    subject TEXT,
    study_level TEXT,
    study_mode TEXT,
    course_code TEXT,
    official_url TEXT,
    duration TEXT,
    intake TEXT,
    fee TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schema Evolution Migrations (Safe for existing live databases)
ALTER TABLE public.institutions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. ENABLE ROW LEVEL SECURITY (RLS) FOR PUBLIC SELECT
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access Institutions" ON public.institutions FOR SELECT USING (true);
CREATE POLICY "Public Read Access Courses" ON public.courses FOR SELECT USING (true);

-- SEED DATA FOR INSTITUTIONS
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (1, 'Atlantic Technological University (ATU)', 'Technological University', 'Galway, Sligo, Letterkenny', 'Not Ranked (TU Category)', '1001-1200th (THE World University Rankings 2025/2026)', '€12,000 - €14,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (2, 'South East Technological University (SETU)', 'Technological University', 'Waterford & Carlow', 'Not Ranked (TU Category)', '1001-1200th (THE World University Rankings 2025/2026)', '€12,500 - €15,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (3, 'Munster Technological University (MTU)', 'Technological University', 'Cork & Tralee', 'Not Ranked (TU Category)', '1001-1200th (THE World University Rankings 2025/2026)', '€13,000 - €15,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (4, 'Technological University of the Shannon: Midlands Midwest (TUS)', 'Technological University', 'Athlone & Limerick', 'Not Ranked (TU Category)', '1001-1200th (THE World University Rankings 2025/2026)', '€12,500 - €15,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (5, 'Holmes Institute Dublin', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€8,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (6, 'RCSI University of Medicine and Health Sciences', 'University', 'Dublin', '#701-750 (Top 250 in Medicine)', '201-250th (THE World University Rankings 2025/2026)', '€26,000 - €58,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (7, 'Technological University Dublin (TU Dublin)', 'Technological University', 'Dublin', '#791-800 (QS World University Rankings 2026)', '801-1000th (THE World University Rankings 2025/2026)', '€13,500 - €16,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (8, 'Setanta College', 'Private/Independent Higher-Education Institution', 'Thurles', 'Not Ranked', 'Not Ranked', '€6,500 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (9, 'Independent College (Independent College Dublin)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€8,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (10, 'CCT College Dublin (College of Computing Technology)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked (Specialist ICT College)', 'Not Ranked', '€9,500 - €14,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (11, 'IBAT College Dublin (Institute of Business and Technology)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€8,500 - €13,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (12, 'Irish College of Humanities and Applied Sciences (ICHAS)', 'Private/Independent Higher-Education Institution', 'Limerick & Dublin', 'Not Ranked', 'Not Ranked', '€7,500 - €11,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (13, 'IICP College (Institute of Integrative Counselling and Psychotherapy)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€7,500 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (14, 'ICD Business School', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€8,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (15, 'Hibernia College', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked (Specialist Online HEI)', 'Not Ranked', '€8,000 - €10,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (16, 'Galway Business School (GBS)', 'Private/Independent Higher-Education Institution', 'Galway', 'Not Ranked', 'Not Ranked', '€7,500 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (17, 'National College of Ireland (NCI)', 'College', 'Dublin', '5-Star QS Stars Rating for Employability & Facilities', 'Not Ranked', '€11,000 - €15,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (18, 'Maynooth University (National University of Ireland, Maynooth)', 'University', 'Maynooth', '#721-730 (QS World University Rankings 2026)', '401-500th (THE World University Rankings 2025/2026)', '€15,000 - €19,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (19, 'Dundalk Institute of Technology (DkIT)', 'Institute of Technology', 'Dundalk', 'Not Ranked', 'Not Ranked', '€11,500 - €13,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (20, 'Dún Laoghaire Institute of Art, Design and Technology (IADT)', 'Institute of Technology', 'Dún Laoghaire', 'Not Ranked', 'Not Ranked', '€13,500 - €15,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (21, 'American College Dublin (ACD)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€10,500 - €15,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (22, 'Burren College of Art (BCA)', 'Specialist Higher-Education Institution', 'Ballyvaughan', 'Degrees awarded by University of Galway (#275 QS)', 'Degrees awarded by University of Galway', '€18,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (23, 'Open Training College (OTC)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', 'Not Applicable (Domestic/EU sector focus)')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (24, 'PCI College', 'Private/Independent Higher-Education Institution', 'Dublin, Cork, Limerick, Kilkenny, Athlone', 'Not Ranked', 'Not Ranked', '€7,500 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (25, 'Dublin Institute of Design (DID)', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€7,900 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (26, 'Dublin City University (DCU)', 'University', 'Dublin', '#408 (QS World University Rankings 2026)', '351-400th (THE World University Rankings 2025/2026)', '€16,000 - €24,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (27, 'University of Limerick (UL)', 'University', 'Limerick', '~#388 (QS World University Rankings 2026)', '501-600th (THE World University Rankings 2025/2026)', '€16,500 - €49,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (28, 'Dorset College Dublin', 'Private/Independent Higher-Education Institution', 'Dublin', 'Not Ranked', 'Not Ranked', '€8,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (29, 'Dublin Business School (DBS)', 'Private/Independent Higher-Education Institution', 'Dublin', '5-Star QS Stars Rating', 'Not Ranked', '€10,500 - €14,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (30, 'Griffith College', 'Private/Independent Higher-Education Institution', 'Dublin, Cork, Limerick', 'Not Ranked (Independent College)', 'Not Ranked', '€12,000 - €15,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (31, 'National College of Art and Design (NCAD)', 'Specialist Higher-Education Institution', 'Dublin', 'Top 100 Worldwide for Art & Design (QS Subject Rankings)', 'Not Ranked', '€16,500 - €18,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (32, 'St. Nicholas Montessori College Ireland (SNMCI)', 'Private/Independent Higher-Education Institution', 'Dún Laoghaire', 'Not Ranked', 'Not Ranked', '€8,500 - €10,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (33, 'Institute of Public Administration (IPA)', 'Specialist Higher-Education Institution', 'Dublin', 'Affiliated with University College Dublin (#100 QS)', 'Affiliated with University College Dublin', '€7,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (34, 'Irish Management Institute (IMI)', 'Specialist Higher-Education Institution', 'Dublin & Cork', 'Financial Times Global Top 50 in Executive Education (Ranked with UCC)', 'Degrees awarded by University College Cork', '€12,500 - €33,000 (Executive Master''s / MBA)')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (35, 'University College Dublin, National University of Ireland, Dublin', 'University', 'Dublin', '#100 (QS World University Rankings 2026)', '201-250th (THE World University Rankings 2025/2026)', '€22,600 - €59,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (36, 'University College Cork, National University of Ireland, Cork', 'University', 'Cork', '#220 (QS World University Rankings 2026)', '351-400th (THE World University Rankings 2025/2026)', '€18,500 - €48,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (37, 'University of Galway (Ollscoil na Gaillimhe)', 'University', 'Galway', '#275 (QS World University Rankings 2026)', '351-400th (THE World University Rankings 2025/2026)', '€18,500 - €52,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (38, 'Marino Institute of Education (MIE)', 'College', 'Dublin', 'Affiliated with Trinity College Dublin (#75 QS)', 'Affiliated with Trinity College Dublin', '€14,000 - €16,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (39, 'Mary Immaculate College (MIC)', 'College', 'Limerick & Thurles', 'Not Ranked', 'Not Ranked', '€12,500 - €14,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (40, 'Institute of Banking (IOB)', 'Specialist Higher-Education Institution', 'Dublin', 'Degrees awarded by University College Dublin (#100 QS)', 'Degrees awarded by University College Dublin', '€6,500 - €13,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (41, 'St. Patrick''s Pontifical University, Maynooth (SPPU)', 'University', 'Maynooth', 'Not Ranked (Ecclesiastical University)', 'Not Ranked', '€10,000 - €13,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (42, 'Law Society of Ireland — Law School', 'Specialist Higher-Education Institution', 'Dublin', 'Not Ranked (Specialist Law School)', 'Not Ranked', '€10,800 (PPC Solicitor Qualification)')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (43, 'Royal Irish Academy of Music (RIAM)', 'Specialist Higher-Education Institution', 'Dublin', 'Top 50 Worldwide for Performing Arts (QS Subject Rankings)', 'Affiliated with Trinity College Dublin', '€17,500 - €18,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (44, 'Carlow College, St. Patrick''s', 'Private/Independent Higher-Education Institution', 'Carlow', 'Not Ranked', 'Not Ranked', '€9,500 - €12,500 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (45, 'Trinity College Dublin, the University of Dublin', 'University', 'Dublin', '#75 (QS World University Rankings 2026)', '173rd (THE World University Rankings 2025/2026)', '€20,600 - €55,000 per year')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.institutions (id, name, institution_type, city, qs_ranking, the_ranking, international_tuition_fee)
VALUES (46, 'The Honorable Society of King''s Inns', 'Specialist Higher-Education Institution', 'Dublin', 'Not Ranked (Specialist Law Body)', 'Not Ranked', '€13,400 (Degree of Barrister-at-Law)')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- SEED DATA FOR COURSES
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (1, NULL, 'Trinity College Dublin', 'Computer Science', 'BA (Moderatorship)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/computer-science/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (2, NULL, 'Trinity College Dublin', 'Computer Science and Business', 'BA (Moderatorship)', 'Level 8', 'Computer Science / Business', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/computer-science-and-business/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (3, NULL, 'Trinity College Dublin', 'Computer Engineering', 'BEng / MEng', 'Level 8 / 9', 'Engineering / CS', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/engineering/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (4, NULL, 'Trinity College Dublin', 'Management Science and Information Systems Studies (MSISS)', 'BSc', 'Level 8', 'Data Analytics / IS', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/management-science-and-information-systems-studies/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (5, NULL, 'Trinity College Dublin', 'MSc in Computer Science (Data Science)', 'MSc', 'Level 9', 'Data Science / CS', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/computer-science---data-science-strand-msc--pgrad-dip/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (6, NULL, 'Trinity College Dublin', 'MSc in Computer Science (Intelligent Systems)', 'MSc', 'Level 9', 'Artificial Intelligence / ML', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/computer-science---intelligent-systems-strand-msc--pgrad-dip/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (7, NULL, 'Trinity College Dublin', 'MSc in Applied Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/applied-artificial-intelligence-msc/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (8, NULL, 'Trinity College Dublin', 'MSc in Quantum Science and Technology', 'MSc', 'Level 9', 'Physics / CS', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/quantum-science-and-technology-msc/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (9, NULL, 'Trinity College Dublin', 'Medicine', 'MB BCh BAO', 'Level 8', 'Medicine', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/medicine/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (10, NULL, 'Trinity College Dublin', 'Dental Science', 'BDentSc', 'Level 8', 'Dentistry', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/dental-science/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (11, NULL, 'Trinity College Dublin', 'Pharmacy', 'BSc / MPharm', 'Level 8 / 9', 'Pharmacy', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/pharmacy/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (12, NULL, 'Trinity College Dublin', 'Law (LL.B.)', 'LL.B.', 'Level 8', 'Law', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/law/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (13, NULL, 'Trinity College Dublin', 'Bachelor in Business Studies (BBS)', 'BBS', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.tcd.ie/courses/undergraduate/courses/business-studies/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (14, NULL, 'Trinity College Dublin', 'MSc in Finance', 'MSc', 'Level 9', 'Finance', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/finance-msc/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (15, NULL, 'Trinity College Dublin', 'MSc in Digital Marketing Strategy', 'MSc', 'Level 9', 'Marketing', 'Postgraduate', 'Full-Time', 'https://www.tcd.ie/courses/postgraduate/courses/digital-marketing-strategy-msc/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (16, NULL, 'University College Dublin', 'BSc Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/bsc-computer-science', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (17, NULL, 'University College Dublin', 'BSc Computer Science with Data Science', 'BSc (Hons)', 'Level 8', 'Data Science', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/bsc-computer-science-data-science', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (18, NULL, 'University College Dublin', 'MSc Computer Science (Negotiated Learning)', 'MSc', 'Level 9', 'Computer Science / AI', 'Postgraduate', 'Full-Time', 'https://www.ucd.ie/courses/msc-computer-science-negotiated-learning', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (19, NULL, 'University College Dublin', 'MSc Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.ucd.ie/courses/msc-artificial-intelligence', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (20, NULL, 'University College Dublin', 'MSc Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.ucd.ie/courses/msc-cybersecurity', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (21, NULL, 'University College Dublin', 'BEng/MEng Biomedical Engineering', 'BEng / MEng', 'Level 8 / 9', 'Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ucd.ie/courses/beng-biomedical-engineering', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (22, NULL, 'University College Dublin', 'Bachelor of Architecture (BArch / BSc Arch)', 'BSc / MArch', 'Level 8 / 9', 'Architecture', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ucd.ie/courses/bsc-architecture', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (23, NULL, 'University College Dublin', 'Bachelor of Commerce (BCom)', 'BCom (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/bachelor-of-commerce', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (24, NULL, 'University College Dublin', 'BSc Economics and Finance', 'BSc (Hons)', 'Level 8', 'Economics / Finance', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/bsc-economics-and-finance', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (25, NULL, 'University College Dublin', 'BCL Bachelor of Civil Law', 'BCL (Hons)', 'Level 8', 'Law', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/bcl-law', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (26, NULL, 'University College Dublin', 'MB BCh BAO Medicine', 'MB BCh BAO', 'Level 8', 'Medicine', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/medicine-undergraduate', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (27, NULL, 'University College Dublin', 'MVB Veterinary Medicine', 'MVB', 'Level 8', 'Veterinary Medicine', 'Undergraduate', 'Full-Time', 'https://www.ucd.ie/courses/veterinary-medicine', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (28, NULL, 'University College Dublin', 'MSc Business Analytics (Smurfit)', 'MSc', 'Level 9', 'Business Analytics / Data', 'Postgraduate', 'Full-Time', 'https://www.smurfitschool.ie/programmes/masters/mscinbusinessanalytics/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (29, NULL, 'University College Dublin', 'MSc Quantitative Finance (Smurfit)', 'MSc', 'Level 9', 'Finance / Math', 'Postgraduate', 'Full-Time', 'https://www.smurfitschool.ie/programmes/masters/mscinquantitativefinance/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (30, NULL, 'University College Dublin', 'Executive MBA (Smurfit)', 'MBA', 'Level 9', 'Business Administration', 'Postgraduate', 'Part-Time', 'https://www.smurfitschool.ie/programmes/thesmurfitmba/executivemba/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (31, NULL, 'University College Cork', 'BSc Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck401/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (32, NULL, 'University College Cork', 'BSc Data Science and Analytics', 'BSc (Hons)', 'Level 8', 'Data Science', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck411/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (33, NULL, 'University College Cork', 'MSc Computing Science', 'MSc', 'Level 9', 'Computer Science', 'Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ckr40/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (34, NULL, 'University College Cork', 'MSc Data Science and Analytics', 'MSc', 'Level 9', 'Data Science', 'Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ckr28/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (35, NULL, 'University College Cork', 'MSc Cyber Risk for Business', 'MSc', 'Level 9', 'Cybersecurity / Business', 'Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ckr68/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (36, NULL, 'University College Cork', 'BEng/MEng Process & Chemical Engineering', 'BEng / MEng', 'Level 8 / 9', 'Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ck600/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (37, NULL, 'University College Cork', 'BSc Architecture (joint with MTU)', 'BSc (Hons)', 'Level 8', 'Architecture', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck606/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (38, NULL, 'University College Cork', 'MB BCh BAO Medicine', 'MB BCh BAO', 'Level 8', 'Medicine', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck701/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (39, NULL, 'University College Cork', 'BPharm Pharmacy', 'BPharm / MPharm', 'Level 8 / 9', 'Pharmacy', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ck703/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (40, NULL, 'University College Cork', 'BCL Law', 'BCL (Hons)', 'Level 8', 'Law', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck301/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (41, NULL, 'University College Cork', 'BComm Bachelor of Commerce', 'BComm (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.ucc.ie/en/ck201/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (42, NULL, 'University College Cork', 'MSc Finance (Banking and Risk Management)', 'MSc', 'Level 9', 'Finance', 'Postgraduate', 'Full-Time', 'https://www.ucc.ie/en/ckr04/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (43, NULL, 'University of Galway', 'BSc Computer Science and Information Technology', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/computer-science-and-information-technology.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (44, NULL, 'University of Galway', 'BSc Artificial Intelligence and Data Analytics', 'BSc (Hons)', 'Level 8', 'Artificial Intelligence / DS', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/artificial-intelligence-and-data-analytics.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (45, NULL, 'University of Galway', 'MSc Computer Science (Data Analytics)', 'MSc', 'Level 9', 'Data Analytics / CS', 'Postgraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/postgraduate-taught-courses/computer-science-data-analytics.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (46, NULL, 'University of Galway', 'MSc Computer Science (Artificial Intelligence)', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/postgraduate-taught-courses/artificial-intelligence.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (47, NULL, 'University of Galway', 'MSc Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/postgraduate-taught-courses/cybersecurity.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (48, NULL, 'University of Galway', 'BEng/MEng Biomedical Engineering', 'BEng / MEng', 'Level 8 / 9', 'Biomedical Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/biomedical-engineering.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (49, NULL, 'University of Galway', 'MB BCh BAO Medicine', 'MB BCh BAO', 'Level 8', 'Medicine', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/medicine.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (50, NULL, 'University of Galway', 'BCL Law', 'BCL (Hons)', 'Level 8', 'Law', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/law.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (51, NULL, 'University of Galway', 'Bachelor of Commerce (BComm)', 'BComm (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/courses/undergraduate-courses/commerce.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (52, NULL, 'University of Galway', 'BBS in International Hotel Management (Shannon College)', 'BBS (Hons)', 'Level 8', 'Hotel Management', 'Undergraduate', 'Full-Time', 'https://www.universityofgalway.ie/shannoncollege/programmes/bachelor-of-business-studies-in-international-hotel-management/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (53, NULL, 'Maynooth University', 'BSc Computer Science and Software Engineering', 'BSc (Hons)', 'Level 8', 'Computer Science / SE', 'Undergraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/bsc-computer-science-and-software-engineering', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (54, NULL, 'Maynooth University', 'BSc Data Science', 'BSc (Hons)', 'Level 8', 'Data Science', 'Undergraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/bsc-data-science', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (55, NULL, 'Maynooth University', 'MSc Computer Science (Software Engineering)', 'MSc', 'Level 9', 'Software Engineering', 'Postgraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/postgraduate-studies/courses/msc-computer-science-software-engineering', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (56, NULL, 'Maynooth University', 'MSc Computer Science (Applied AI)', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/postgraduate-studies/courses/msc-computer-science-applied-artificial-intelligence', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (57, NULL, 'Maynooth University', 'BEng/MEng Electronic Engineering', 'BEng / MEng', 'Level 8 / 9', 'Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/beng-electronic-engineering', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (58, NULL, 'Maynooth University', 'Bachelor of Business Studies (BBS)', 'BBS (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/bachelor-business-studies-business-and-management', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (59, NULL, 'Maynooth University', 'BCL Law and Criminology', 'BCL (Hons)', 'Level 8', 'Law / Criminology', 'Undergraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/bcl-law-and-criminology', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (60, NULL, 'Maynooth University', 'BEd Primary Teaching (Froebel)', 'BEd (Hons)', 'Level 8', 'Primary Education', 'Undergraduate', 'Full-Time', 'https://www.maynoothuniversity.ie/study-maynooth/find-course/bed-primary-teaching-froebel', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (61, NULL, 'Dublin City University', 'BSc in Computer Applications', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/school-computing/computer-applications', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (62, NULL, 'Dublin City University', 'BSc in Data Science', 'BSc (Hons)', 'Level 8', 'Data Science', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/school-computing/data-science', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (63, NULL, 'Dublin City University', 'MSc in Computing (Artificial Intelligence)', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.dcu.ie/courses/postgraduate/school-computing/msc-computing', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (64, NULL, 'Dublin City University', 'MSc in Computing (Blockchain / Secure Software)', 'MSc', 'Level 9', 'Cybersecurity / Blockchain', 'Postgraduate', 'Full-Time', 'https://www.dcu.ie/courses/postgraduate/school-computing/msc-computing', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (65, NULL, 'Dublin City University', 'BEng in Electronic and Computer Engineering', 'BEng (Hons)', 'Level 8', 'Electronic Engineering / CS', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/school-electronic-engineering/electronic-and-computer-engineering', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (66, NULL, 'Dublin City University', 'Bachelor of Business Studies (BBS)', 'BBS (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/dcu-business-school/business-studies', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (67, NULL, 'Dublin City University', 'BSc in Aviation Management', 'BSc (Hons)', 'Level 8', 'Aviation / Business', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/dcu-business-school/aviation-management-aviation-management-pilot-studies', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (68, NULL, 'Dublin City University', 'Bachelor of Education (BEd Primary)', 'BEd (Hons)', 'Level 8', 'Primary Education', 'Undergraduate', 'Full-Time', 'https://www.dcu.ie/courses/undergraduate/institute-education/bachelor-education-primary', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (69, NULL, 'Dublin City University', 'MSc in Finance', 'MSc', 'Level 9', 'Finance', 'Postgraduate', 'Full-Time', 'https://www.dcu.ie/courses/postgraduate/dcu-business-school/msc-finance', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (70, NULL, 'University of Limerick', 'BSc in Immersive Software Engineering (ISE)', 'BSc / MSc', 'Level 8 / 9', 'Software Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ul.ie/courses/lm125', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (71, NULL, 'University of Limerick', 'BSc in Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.ul.ie/courses/lm121', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (72, NULL, 'University of Limerick', 'BSc in Cyber Security & IT Forensics', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.ul.ie/courses/bachelor-science-cyber-security-it-forensics', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (73, NULL, 'University of Limerick', 'MSc in Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.ul.ie/gps/course/artificial-intelligence-msc', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (74, NULL, 'University of Limerick', 'BEng/MEng in Aeronautical Engineering', 'BEng / MEng', 'Level 8 / 9', 'Aeronautical Engineering', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.ul.ie/courses/lm116', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (75, NULL, 'University of Limerick', 'Bachelor of Architecture (BArch)', 'BArch (Hons)', 'Level 8', 'Architecture', 'Undergraduate', 'Full-Time', 'https://www.ul.ie/courses/lm099', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (76, NULL, 'University of Limerick', 'BM BS Bachelor of Medicine, Bachelor of Surgery (GEM)', 'BM BS', 'Level 8', 'Medicine', 'Postgraduate Entry', 'Full-Time', 'https://www.ul.ie/courses/lm101', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (77, NULL, 'University of Limerick', 'Bachelor of Business Studies (BBS)', 'BBS (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.ul.ie/courses/lm050', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (78, 6, 'RCSI University of Medicine and Health Sciences', 'MB BCh BAO Medicine (5/6 Year)', 'MB BCh BAO', 'Level 8', 'Medicine', 'Undergraduate', 'Full-Time', 'https://www.rcsi.com/dublin/undergraduate/medicine', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (79, 6, 'RCSI University of Medicine and Health Sciences', 'MB BCh BAO Medicine (Graduate Entry)', 'MB BCh BAO', 'Level 8', 'Medicine', 'Postgraduate Entry', 'Full-Time', 'https://www.rcsi.com/dublin/undergraduate/graduate-entry-medicine', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (80, 6, 'RCSI University of Medicine and Health Sciences', 'BSc in Pharmacy (MPharm)', 'BSc / MPharm', 'Level 8 / 9', 'Pharmacy', 'Undergraduate / Postgraduate', 'Full-Time', 'https://www.rcsi.com/dublin/undergraduate/pharmacy', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (81, 6, 'RCSI University of Medicine and Health Sciences', 'BSc in Physiotherapy', 'BSc (Hons)', 'Level 8', 'Physiotherapy', 'Undergraduate', 'Full-Time', 'https://www.rcsi.com/dublin/undergraduate/physiotherapy', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (82, 6, 'RCSI University of Medicine and Health Sciences', 'MSc in Artificial Intelligence in Medicine', 'MSc', 'Level 9', 'AI in Medicine / Healthcare', 'Postgraduate', 'Full-Time', 'https://www.rcsi.com/dublin/postgraduate/taught-courses/artificial-intelligence-in-medicine', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (83, NULL, 'Technological University Dublin', 'BSc (Hons) in Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.tudublin.ie/study/undergraduate/courses/computer-science-tu856/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (84, NULL, 'Technological University Dublin', 'BSc (Hons) in Cybersecurity', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.tudublin.ie/study/undergraduate/courses/cybersecurity-tu863/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (85, NULL, 'Technological University Dublin', 'MSc in Computer Science (Data Science)', 'MSc', 'Level 9', 'Data Science', 'Postgraduate', 'Full-Time', 'https://www.tudublin.ie/study/postgraduate/courses/computer-science-data-science-tu259/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (86, NULL, 'Technological University Dublin', 'MSc in Applied Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.tudublin.ie/study/postgraduate/courses/applied-artificial-intelligence-tu260/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (87, NULL, 'Technological University Dublin', 'BArch Bachelor of Architecture', 'BArch (Hons)', 'Level 8', 'Architecture', 'Undergraduate', 'Full-Time', 'https://www.tudublin.ie/study/undergraduate/courses/architecture-tu832/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (88, NULL, 'Technological University Dublin', 'BSc (Hons) in Human Nutrition and Dietetics', 'BSc (Hons)', 'Level 8', 'Dietetics / Nutrition', 'Undergraduate', 'Full-Time', 'https://www.tudublin.ie/study/undergraduate/courses/human-nutrition-and-dietetics-tu870/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (89, NULL, 'Technological University Dublin', 'Bachelor of Business (Hons)', 'BBus (Hons)', 'Level 8', 'Business', 'Undergraduate', 'Full-Time', 'https://www.tudublin.ie/study/undergraduate/courses/business-and-management-tu901/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (90, NULL, 'Munster Technological University', 'BSc (Hons) in Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.mtu.ie/courses/mt800/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (91, NULL, 'Munster Technological University', 'BSc (Hons) in Cybersecurity', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.mtu.ie/courses/mt801/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (92, NULL, 'Munster Technological University', 'MSc in Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.mtu.ie/courses/msc-in-artificial-intelligence/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (93, NULL, 'Munster Technological University', 'MSc in Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.mtu.ie/courses/msc-in-cybersecurity/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (94, NULL, 'Munster Technological University', 'BSc (Hons) in Nautical Science (NMCI)', 'BSc (Hons)', 'Level 8', 'Maritime / Navigation', 'Undergraduate', 'Full-Time', 'https://www.nmci.ie/nauticalscience', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (95, NULL, 'Technological University of the Shannon', 'BSc (Hons) in Software Design with AI', 'BSc (Hons)', 'Level 8', 'Software Engineering / AI', 'Undergraduate', 'Full-Time', 'https://www.tus.ie/courses/us821/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (96, NULL, 'Technological University of the Shannon', 'BSc (Hons) in Cybersecurity', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.tus.ie/courses/us823/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (97, NULL, 'Technological University of the Shannon', 'MSc in Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.tus.ie/courses/msc-artificial-intelligence/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (98, NULL, 'Technological University of the Shannon', 'BA (Hons) in Fine Art (LSAD)', 'BA (Hons)', 'Level 8', 'Fine Art', 'Undergraduate', 'Full-Time', 'https://www.tus.ie/courses/us801/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (99, NULL, 'Atlantic Technological University', 'BSc (Hons) in Computing in Data Science and AI', 'BSc (Hons)', 'Level 8', 'Data Science / AI', 'Undergraduate', 'Full-Time', 'https://www.atu.ie/courses/au601', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (100, NULL, 'Atlantic Technological University', 'BSc (Hons) in Cyber Security & Digital Forensics', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.atu.ie/courses/au602', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (101, NULL, 'Atlantic Technological University', 'MSc in Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.atu.ie/courses/msc-in-artificial-intelligence', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (102, NULL, 'Atlantic Technological University', 'BSc (Hons) in Furniture Design and Manufacture', 'BSc (Hons)', 'Level 8', 'Furniture Design', 'Undergraduate', 'Full-Time', 'https://www.atu.ie/courses/au480', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (103, NULL, 'Atlantic Technological University', 'BEd (Hons) in Home Economics & Biology (St Angela''s)', 'BEd (Hons)', 'Level 8', 'Teacher Education', 'Undergraduate', 'Full-Time', 'https://www.stangelas.ie/programmes/bed-home-economics-biology/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (104, NULL, 'South East Technological University', 'BSc (Hons) in Computer Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.setu.ie/courses/se601', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (105, NULL, 'South East Technological University', 'BSc (Hons) in Cybercrime and IT Security', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.setu.ie/courses/se603', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (106, NULL, 'South East Technological University', 'MSc in Computing (Enterprise Software / Data Science)', 'MSc', 'Level 9', 'Computer Science / Data', 'Postgraduate', 'Full-Time', 'https://www.setu.ie/courses/msc-in-computing-enterprise-software-systems', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (107, NULL, 'South East Technological University', 'BEng (Hons) in Aerospace Engineering', 'BEng (Hons)', 'Level 8', 'Aerospace Engineering', 'Undergraduate', 'Full-Time', 'https://www.setu.ie/courses/se701', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (108, NULL, 'Dundalk Institute of Technology', 'BSc (Hons) in Computing in Data Science and AI', 'BSc (Hons)', 'Level 8', 'Data Science / AI', 'Undergraduate', 'Full-Time', 'https://www.dkit.ie/courses/school-of-informatics-and-creative-arts/computing-science-and-mathematics/bsc-hons-in-computing-in-data-science-and-artificial-intelligence.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (109, NULL, 'Dundalk Institute of Technology', 'BSc (Hons) in Computing in Cybersecurity', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.dkit.ie/courses/school-of-informatics-and-creative-arts/computing-science-and-mathematics/bsc-hons-in-computing-in-cybersecurity-and-computing-infrastructure.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (110, NULL, 'Dundalk Institute of Technology', 'MSc in Computing in Medical Device Software Engineering', 'MSc', 'Level 9', 'Software Engineering / Medical', 'Postgraduate', 'Full-Time', 'https://www.dkit.ie/courses/school-of-informatics-and-creative-arts/computing-science-and-mathematics/msc-in-computing-in-medical-device-software-engineering.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (111, NULL, 'Dún Laoghaire Institute of Art, Design and Technology', 'BSc (Hons) in Creative Computing', 'BSc (Hons)', 'Level 8', 'Creative Computing / CS', 'Undergraduate', 'Full-Time', 'https://www.iadt.ie/courses/creative-computing/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (112, NULL, 'Dún Laoghaire Institute of Art, Design and Technology', 'BSc (Hons) in Applied Psychology', 'BSc (Hons)', 'Level 8', 'Psychology / Cyberpsychology', 'Undergraduate', 'Full-Time', 'https://www.iadt.ie/courses/applied-psychology/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (113, NULL, 'Dún Laoghaire Institute of Art, Design and Technology', 'BA (Hons) in Film and Television Production', 'BA (Hons)', 'Level 8', 'Film Production', 'Undergraduate', 'Full-Time', 'https://www.iadt.ie/courses/film-television-production/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (114, NULL, 'Dún Laoghaire Institute of Art, Design and Technology', 'MSc in User Experience (UX) Design', 'MSc', 'Level 9', 'UX Design / Tech', 'Postgraduate', 'Full-Time', 'https://www.iadt.ie/courses/msc-user-experience-design/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (115, NULL, 'National College of Art and Design', 'BA (Hons) in Interaction Design', 'BA (Hons)', 'Level 8', 'Interaction Design / UX', 'Undergraduate', 'Full-Time', 'https://www.ncad.ie/study-at-ncad/undergraduate-courses/school-of-design/interaction-design/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (116, NULL, 'National College of Art and Design', 'MSc in Medical Device Design', 'MSc', 'Level 9', 'Product Design / Medical', 'Postgraduate', 'Full-Time', 'https://www.ncad.ie/postgraduate/school-of-design/msc-medical-device-design/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (117, NULL, 'National College of Art and Design', 'BA (Hons) in Fine Art', 'BA (Hons)', 'Level 8', 'Fine Art', 'Undergraduate', 'Full-Time', 'https://www.ncad.ie/study-at-ncad/undergraduate-courses/school-of-fine-art/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (118, NULL, 'Mary Immaculate College', 'Bachelor of Education (B.Ed. Primary Teaching)', 'B.Ed. (Hons)', 'Level 8', 'Primary Education', 'Undergraduate', 'Full-Time', 'https://www.mic.ul.ie/study-at-mic/undergraduate/bachelor-of-education', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (119, NULL, 'Mary Immaculate College', 'BA (Hons) in Liberal Arts', 'BA (Hons)', 'Level 8', 'Arts / Humanities', 'Undergraduate', 'Full-Time', 'https://www.mic.ul.ie/study-at-mic/undergraduate/bachelor-of-arts', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (120, NULL, 'Mary Immaculate College', 'Professional Master of Education (PME Primary)', 'PME', 'Level 9', 'Teacher Education', 'Postgraduate', 'Full-Time', 'https://www.mic.ul.ie/study-at-mic/postgraduate/professional-master-of-education-primary', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (121, NULL, 'Marino Institute of Education', 'Bachelor in Education (B.Ed. Primary Teaching)', 'B.Ed. (Hons)', 'Level 8', 'Primary Education', 'Undergraduate', 'Full-Time', 'https://www.mie.ie/en/study_with_us/undergraduate_programmes/bachelor_in_education/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (122, NULL, 'Marino Institute of Education', 'BSc in Education Studies', 'BSc (Hons)', 'Level 8', 'Education Studies', 'Undergraduate', 'Full-Time', 'https://www.mie.ie/en/study_with_us/undergraduate_programmes/bsc_in_education_studies/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (123, NULL, 'Royal Irish Academy of Music', 'Bachelor in Music Performance', 'BMus (Hons)', 'Level 8', 'Music Performance', 'Undergraduate', 'Full-Time', 'https://www.riam.ie/tertiary-courses/bachelor-in-music-performance', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (124, NULL, 'Royal Irish Academy of Music', 'Master in Music Performance', 'MMus', 'Level 9', 'Music Performance', 'Postgraduate', 'Full-Time', 'https://www.riam.ie/tertiary-courses/master-in-music-performance', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (125, NULL, 'National College of Ireland', 'BSc (Hons) in Data Science', 'BSc (Hons)', 'Level 8', 'Data Science', 'Undergraduate', 'Full-Time', 'https://www.ncirl.ie/Courses/Course-Details/course/BSCHDS', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (126, NULL, 'National College of Ireland', 'BSc (Hons) in Cybersecurity', 'BSc (Hons)', 'Level 8', 'Cybersecurity', 'Undergraduate', 'Full-Time', 'https://www.ncirl.ie/Courses/Course-Details/course/BSCHCS', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (127, NULL, 'National College of Ireland', 'MSc in Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.ncirl.ie/Courses/Course-Details/course/MSCAI', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (128, NULL, 'National College of Ireland', 'MSc in Data Analytics', 'MSc', 'Level 9', 'Data Analytics', 'Postgraduate', 'Full-Time', 'https://www.ncirl.ie/Courses/Course-Details/course/MSCDA', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (129, NULL, 'National College of Ireland', 'MSc in Fintech', 'MSc', 'Level 9', 'Fintech / Financial Tech', 'Postgraduate', 'Full-Time', 'https://www.ncirl.ie/Courses/Course-Details/course/MSCFT', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (130, NULL, 'St. Patrick''s Pontifical University, Maynooth', 'Baccalaureate in Theology (BD)', 'BD (Hons)', 'Level 8', 'Theology', 'Undergraduate', 'Full-Time', 'https://www.sppu.ie/courses/baccalaureate-in-theology', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (131, NULL, 'St. Patrick''s Pontifical University, Maynooth', 'BA in Theology and Arts', 'BA (Hons)', 'Level 8', 'Theology / Arts', 'Undergraduate', 'Full-Time', 'https://www.sppu.ie/courses/ba-in-theology-and-arts', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (132, NULL, 'St. Patrick''s Pontifical University, Maynooth', 'Master of Arts in Theology', 'MA', 'Level 9', 'Theology', 'Postgraduate', 'Full-Time', 'https://www.sppu.ie/courses/master-of-arts-in-theology', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (133, NULL, 'Institute of Public Administration', 'Bachelor of Arts (Hons) in Public Management', 'BA (Hons)', 'Level 8', 'Public Administration', 'Undergraduate', 'Part-Time / Blended', 'https://www.ipa.ie/undergraduate/bachelor-of-arts-hons-in-public-management.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (134, NULL, 'Institute of Public Administration', 'Master of Public Management (MPM)', 'MPM', 'Level 9', 'Public Management', 'Postgraduate', 'Part-Time / Blended', 'https://www.ipa.ie/postgraduate/master-of-public-management.html', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (135, 46, 'The Honorable Society of King''s Inns', 'Degree of Barrister-at-Law (BL)', 'Degree of Barrister-at-Law', 'Level 9', 'Law / Advocacy', 'Postgraduate', 'Full-Time / Modular', 'https://www.kingsinns.ie/education/courses/barrister-at-law-degree', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (136, 46, 'The Honorable Society of King''s Inns', 'Diploma in Legal Studies', 'Diploma in Legal Studies', 'Level 7 / 8', 'Law', 'Postgraduate Conversion', 'Modular', 'https://www.kingsinns.ie/education/courses/diploma-in-legal-studies', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (137, 42, 'Law Society of Ireland — Law School', 'Professional Practice Course (PPC)', 'Solicitor Qualification', 'Level 9', 'Legal Practice', 'Postgraduate', 'Full-Time', 'https://www.lawsociety.ie/education--cpd/Law-School/professional-practice-course', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (138, 42, 'Law Society of Ireland — Law School', 'Master of Laws (LL.M. Advanced Legal Practice)', 'LL.M.', 'Level 9', 'Law', 'Postgraduate', 'Blended', 'https://www.lawsociety.ie/education--cpd/Law-School/Diploma-Centre/llm-advanced-legal-practice', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (139, 30, 'Griffith College', 'BSc (Hons) in Computing Science', 'BSc (Hons)', 'Level 8', 'Computer Science', 'Undergraduate', 'Full-Time', 'https://www.griffith.ie/find-a-course/bsc-hons-computing-science', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (140, 30, 'Griffith College', 'MSc in Applied Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.griffith.ie/find-a-course/msc-applied-artificial-intelligence', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (141, 30, 'Griffith College', 'MSc in Big Data Management and Analytics', 'MSc', 'Level 9', 'Data Science', 'Postgraduate', 'Full-Time', 'https://www.griffith.ie/find-a-course/msc-big-data-management-and-analytics', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (142, 30, 'Griffith College', 'MSc in Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.griffith.ie/find-a-course/msc-cybersecurity', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (143, 30, 'Griffith College', 'LL.B. (Hons) Bachelor of Laws', 'LL.B. (Hons)', 'Level 8', 'Law', 'Undergraduate', 'Full-Time', 'https://www.griffith.ie/find-a-course/llb-hons-law', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (144, NULL, 'Dublin Business School', 'BSc (Hons) in Computing (Data Analytics)', 'BSc (Hons)', 'Level 8', 'Data Science / CS', 'Undergraduate', 'Full-Time', 'https://www.dbs.ie/course/undergraduate/bsc-(hons)-computing-(data-analytics)', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (145, NULL, 'Dublin Business School', 'MSc in Applied Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.dbs.ie/course/postgraduate/msc-applied-artificial-intelligence', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (146, NULL, 'Dublin Business School', 'MSc in Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.dbs.ie/course/postgraduate/msc-cybersecurity', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (147, NULL, 'Dublin Business School', 'Master of Business Administration (MBA)', 'MBA', 'Level 9', 'Business Administration', 'Postgraduate', 'Full-Time', 'https://www.dbs.ie/course/postgraduate/master-of-business-administration-(mba)', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (148, NULL, 'Dublin Business School', 'BA (Hons) in Psychology', 'BA (Hons)', 'Level 8', 'Psychology', 'Undergraduate', 'Full-Time', 'https://www.dbs.ie/course/undergraduate/ba-(hons)-psychology', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (149, NULL, 'CCT College Dublin', 'BSc (Hons) in Artificial Intelligence', 'BSc (Hons)', 'Level 8', 'Artificial Intelligence', 'Undergraduate', 'Full-Time', 'https://www.cct.ie/courses/bsc-hons-artificial-intelligence/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (150, NULL, 'CCT College Dublin', 'BSc (Hons) in Software Development', 'BSc (Hons)', 'Level 8', 'Software Engineering', 'Undergraduate', 'Full-Time', 'https://www.cct.ie/courses/bsc-hons-software-development/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (151, NULL, 'CCT College Dublin', 'MSc in Applied Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'https://www.cct.ie/courses/msc-in-applied-artificial-intelligence/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (152, NULL, 'CCT College Dublin', 'MSc in Cybersecurity', 'MSc', 'Level 9', 'Cybersecurity', 'Postgraduate', 'Full-Time', 'https://www.cct.ie/courses/msc-in-cybersecurity/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (153, NULL, 'CCT College Dublin', 'MSc in Data Analytics', 'MSc', 'Level 9', 'Data Analytics', 'Postgraduate', 'Full-Time', 'https://www.cct.ie/courses/msc-in-data-analytics/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (154, 15, 'Hibernia College', 'Professional Master of Education (PME in Primary Education)', 'PME', 'Level 9', 'Primary Teacher Education', 'Postgraduate', 'Blended Learning', 'https://www.hiberniacollege.com/courses/professional-master-of-education-primary/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (155, 15, 'Hibernia College', 'Professional Master of Education (PME in Post-Primary Education)', 'PME', 'Level 9', 'Post-Primary Teacher Education', 'Postgraduate', 'Blended Learning', 'https://www.hiberniacollege.com/courses/professional-master-of-education-post-primary/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (156, 15, 'Hibernia College', 'BSc (Hons) in General Nursing', 'BSc (Hons)', 'Level 8', 'Nursing / Healthcare', 'Undergraduate', 'Blended Learning', 'https://www.hiberniacollege.com/courses/bsc-hons-in-nursing/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (157, 8, 'Setanta College', 'BSc (Hons) in Strength and Conditioning', 'BSc (Hons)', 'Level 8', 'Sports Science / S&C', 'Undergraduate', 'Blended Learning', 'https://www.setantacollege.com/courses/bsc-hons-strength-and-conditioning/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (158, 8, 'Setanta College', 'MSc in Performance Coaching', 'MSc', 'Level 9', 'Performance Coaching', 'Postgraduate', 'Blended Learning', 'https://www.setantacollege.com/courses/msc-performance-coaching/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (159, NULL, 'Irish Management Institute', 'The IMI Executive MBA (awarded by UCC)', 'Executive MBA', 'Level 9', 'Executive Leadership', 'Postgraduate', 'Part-Time Executive', 'https://www.imi.ie/programmes/the-imi-executive-mba/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (160, NULL, 'Irish Management Institute', 'MSc in Data Business', 'MSc', 'Level 9', 'Data Analytics / Business', 'Postgraduate', 'Part-Time Executive', 'https://www.imi.ie/programmes/msc-in-data-business/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (161, NULL, 'Burren College of Art', 'MFA in Studio Art (awarded by University of Galway)', 'MFA', 'Level 9', 'Fine Art / Studio Art', 'Postgraduate', 'Full-Time', 'https://www.burrencollege.ie/programmes/mfa-ma-in-studio-art/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, official_url, duration)
VALUES (162, NULL, 'Burren College of Art', 'MFA in Art & Ecology (awarded by University of Galway)', 'MFA', 'Level 9', 'Art and Ecology', 'Postgraduate', 'Full-Time', 'https://www.burrencollege.ie/programmes/mfa-ma-in-art-ecology/', 'N/A')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, course_code, official_url, duration, image_url)
VALUES (163, 35, 'University College Dublin', 'MSc Advanced Artificial Intelligence', 'MSc', 'Level 9', 'Artificial Intelligence', 'Postgraduate', 'Full-Time', 'T413', 'https://www.ucd.ie/courses/msc-advanced-artificial-intelligence', 'N/A', 'assets/images/courses/msc-advanced-artificial-intelligence.jpg')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, course_code, official_url, duration, image_url)
VALUES (164, 35, 'University College Dublin', 'MSc Financial Data Science (Smurfit)', 'MSc', 'Level 9', 'Finance / Data Science', 'Postgraduate', 'Full-Time', 'B746', 'https://www.smurfitschool.ie/programmes/masters/mscinfinancialdatascience/', 'N/A', 'assets/images/courses/msc-financial-data-science.jpg')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
INSERT INTO public.courses (id, institution_id, institution_name, course_name, qualification, nfq_level, subject, study_level, study_mode, course_code, official_url, duration, image_url)
VALUES (165, 35, 'University College Dublin', 'MSc Statistical Data Science', 'MSc', 'Level 9', 'Data Science', 'Postgraduate', 'Full-Time', 'T387', 'https://www.ucd.ie/courses/msc-statistical-data-science', 'N/A', 'assets/images/courses/msc-statistical-data-science.jpg')
ON CONFLICT (id) DO UPDATE SET course_name = EXCLUDED.course_name;
