/**
 * Aspire Rise Ventures - Application Entry Point
 * Orchestrates component initialization based on active HTML page.
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Aspire Rise Ventures Course Search Portal Initialized');

  // Initialize Global UI Components (Header scroll, drawers, accordions, tabs)
  if (window.UI) {
    window.UI.initGlobalUI();
  }

  // Determine current page context
  const isDetailsPage = window.location.pathname.includes('course-details.html');

  if (isDetailsPage) {
    // Course Details Page Flow
    if (window.COURSE_DETAILS) {
      await window.COURSE_DETAILS.init();
    }
  } else {
    // Main Search Homepage Flow
    if (window.FILTERS) {
      await window.FILTERS.init();
    }
    if (window.SEARCH) {
      window.SEARCH.init();
    }
    if (window.COURSES) {
      window.COURSES.init();
    }
  }
});
