# Aspire Rise Ventures — Ireland University & Course Search Portal

This is a standalone web portal that helps students search and explore universities, institutions, and courses available in Ireland.

---

## About the Project

The Aspire Rise Ventures Ireland University & Course Search Portal is an online platform designed to make finding higher education courses in Ireland fast, simple, and intuitive.

Whether a student is looking for undergraduate degrees, postgraduate programs, or specialized certifications, this portal allows them to easily browse and compare study options. Students can type keywords into the search bar, filter courses by criteria like subject or study level, and click on any course card to open a detailed page with comprehensive course and institution details.

---

## Why This Portal?

Students planning to study in Ireland often face the challenge of searching across multiple university websites and documents to compare programs.

This portal brings course and institution information together into one centralized, searchable platform. It simplifies course discovery, helping prospective students save time and make well-informed decisions about their education path.

---

## What Can Users Do?

- **Search for Courses**: Search by course title, subject keywords, or institution name.
- **Search by Institution**: Easily find courses offered by specific universities or colleges.
- **Filter Courses**: Narrow down search results by study level (such as Undergraduate or Postgraduate) and subject areas.
- **Browse Study Levels**: Explore different qualification types across multiple academic fields.
- **View Course Details**: Access dedicated detail pages with complete information on course duration, entry requirements, tuition fees, and course overviews.
- **View Institution Profiles**: Learn about Irish universities and colleges, including their location, institution type, and official website links.
- **Reset Filters**: Clear active search filters with a single click to start a fresh search.
- **Use on Any Device**: Browse comfortably on mobile phones, tablets, laptops, and desktop screens.
- **Seamless Navigation**: Move smoothly between search results and full course detail views.

---

## How It Works

```
Student
   ↓
Search / Select Filters
   ↓
Course Results
   ↓
Select a Course
   ↓
View Course Details
```

Using the portal is straightforward:
1. A student enters keywords or selects search filters on the home page.
2. The portal instantly displays matching course results.
3. The student selects a course card from the results list.
4. The portal opens a dedicated course details page with full course and university information.

---

## Course & University Data

The portal uses Supabase to store and retrieve university/institution and course information.

The current dataset includes:
- **46 institutions** across Ireland.
- **162 courses** spanning multiple disciplines and study levels.

Supabase acts as the online database that stores the course and institution information used by the portal. All data requests are securely fetched dynamically when users search or view course details.

---

## Technologies Used

- **HTML5** — used to structure the web pages.
- **CSS3** — used to design the visual layout, custom styling, and responsive interface.
- **Vanilla JavaScript** — used to power search functionality, filter logic, navigation, and page interactions without heavy frameworks.
- **Supabase** — used to store and retrieve course and institution data.
- **Git & GitHub** — used to manage and store the project code.

---

## Project Structure

```
aspire-course-search/
├── assets/             # Logos, icons, and visual assets
├── css/                # Styling files (layout, header, cards, filters, responsive design)
├── js/                 # JavaScript modules (search, filters, Supabase client, UI logic)
├── production/         # Production-tested standalone files ready for deployment
├── scratch/            # Project notes and scratch directory
├── .env.example        # Environment variable configuration template
├── course-details.html # Dedicated course details web page
├── index.html          # Main course search web page
├── production-audit.md # Pre-production security & performance audit report
└── supabase_schema.sql # Database structure and initial dataset setup SQL script
```

**Key Components Overview:**
- **index.html** → Main course search page containing the search bar, filter sidebar, and results grid.
- **course-details.html** → Dedicated page displaying full details for a selected course and institution.
- **css/** → Styling files covering visual reset, color variables, header layout, card designs, animations, and responsive breakpoints.
- **js/** → Functional scripts handling API queries, search processing, filter state, UI rendering, custom cursor, and offline mock data fallback.
- **production/** → Production-audited distribution folder synchronized for direct deployment.
- **supabase_schema.sql** → SQL script containing database tables, relationships, indexes, and initial data definitions.

---

## How to Run Locally

Running the portal locally is simple and requires no complex installation steps:

1. **Download or Clone the Project**:
   Download the repository zip file or clone it using Git:
   ```bash
   git clone https://github.com/MDeepaK162005/aspire-course-search-Demo.git
   ```

2. **Open the Project Folder**:
   Open a terminal or command prompt and navigate into the project directory:
   ```bash
   cd aspire-course-search
   ```

3. **Start a Local Web Server**:
   To ensure JavaScript modules load correctly, start a local web server (for example, using Python):
   ```bash
   python -m http.server 8000
   ```

4. **Open the Website in Your Browser**:
   Open your browser and go to:
   ```
   http://localhost:8000/
   ```

*Note: Running the project through a local web server is recommended instead of opening `index.html` directly from your file manager to ensure browser module security rules work smoothly.*

---

## Supabase Setup

The portal connects to Supabase using the project URL and a publishable key configured in `js/config.js`.

**Security Note:**
- Only the public publishable key (`sb_publishable_...`) is included in frontend configuration.
- Private or secret keys (such as `service_role` keys, database passwords, or PostgreSQL connection strings) must **never** be placed in frontend code or uploaded to GitHub.

---

## Responsive Design

The portal is designed to work across mobile phones, tablets, laptops, and desktop screens.

Key responsive highlights:
- Mobile-friendly search inputs and collapsible filter controls.
- Adaptive grid layout for course cards across different screen resolutions.
- Responsive navigation header and footer.
- Clean and readable course detail views optimized for both touchscreens and desktop displays.

---

## User Experience

The portal user experience focuses on clean, hassle-free navigation:
- **Simple Course Discovery**: Clear layouts that make browsing courses effortless.
- **Easy Search & Filtering**: Fast, responsive results as users filter courses.
- **Clear Course Information**: Well-structured text for quick scanning of fees, requirements, and course overviews.
- **Mobile-Friendly Interface**: Smooth layout adjustments across mobile and desktop devices.
- **Easy Navigation**: Quick switching between course search and course detail views.
- **Professional Design**: Education-focused visual presentation.

---

## Project Status

Development, responsive testing, Supabase integration, functional testing, and production security/performance auditing have been completed.

The project is ready for standalone hosting/deployment.

---

## Future Improvements

Possible future enhancements for the portal:
- **Additional Course Data**: Expanding coverage to include more universities and study programs.
- **Advanced Search Options**: Adding tuition fee range filters and location-based sorting.
- **Student Shortlist**: Allowing students to bookmark or save favorite courses.
- **Course Comparison**: Enabling side-by-side comparison of multiple courses.

---

## Security Note

This project uses the Supabase publishable key for browser-based access. Private or secret Supabase keys must never be exposed in the frontend or committed to GitHub.

---

## License

License: Not specified.
