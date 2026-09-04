/**
 * Aspire Rise Ventures - Premium Interactive Cursor Animation (Desktop Only)
 * Smooth trailing follower & ambient glow effect using requestAnimationFrame
 */

(function () {
  // Capability & preference checks
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReducedMotion) {
    return; // Do not initialize on mobile/touch/reduced motion
  }

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let glowX = -100;
  let glowY = -100;
  let isVisible = false;
  let rafId = null;

  // DOM elements
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';

  document.body.appendChild(glow);
  document.body.appendChild(follower);

  // Linear interpolation for smooth trailing motion
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateCursor() {
    if (!isVisible) {
      rafId = requestAnimationFrame(updateCursor);
      return;
    }

    // Smooth lerp (trailing effect)
    followerX = lerp(followerX, mouseX, 0.22);
    followerY = lerp(followerY, mouseY, 0.22);

    glowX = lerp(glowX, mouseX, 0.12);
    glowY = lerp(glowY, mouseY, 0.12);

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

    rafId = requestAnimationFrame(updateCursor);
  }

  // Event Listeners
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      follower.classList.add('is-active');
      glow.classList.add('is-active');
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    follower.classList.remove('is-active');
    glow.classList.remove('is-active');
  }, { passive: true });

  // Hover detection for interactive controls
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, select, textarea, .btn, .chip, .course-card, .tab-btn, .accordion-trigger');
    if (target) {
      follower.classList.add('hovering');
      glow.classList.add('hovering');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, input, select, textarea, .btn, .chip, .course-card, .tab-btn, .accordion-trigger');
    if (target) {
      follower.classList.remove('hovering');
      glow.classList.remove('hovering');
    }
  }, { passive: true });

  // Start Animation Loop
  rafId = requestAnimationFrame(updateCursor);
})();
