/**
 * Personal Portfolio Website Interactive Logic
 * Alex Morgan | Lead Software Engineer & Creative Designer
 */

document.addEventListener("DOMContentLoaded", () => {
  // Select DOM Elements
  const htmlElement = document.documentElement;
  const themeMetaTag = document.querySelector('meta[name="color-scheme"]');
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main > section");
  
  const skillsCategories = document.querySelectorAll(".skills-category");
  const contactForm = document.getElementById("contact-form");
  const successBanner = document.getElementById("form-success-banner");
  const errorBanner = document.getElementById("form-error-banner");

  /* ==========================================================================
     THEME HANDLING (DARK / LIGHT TOGGLE)
     ========================================================================== */

  // Determine current effective theme (localStorage override or system preference)
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getEffectiveTheme() {
    const savedTheme = localStorage.getItem("color-scheme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    return getSystemTheme();
  }

  // Update theme classes, attributes, metadata, and toggles
  function applyTheme(theme) {
    // 1. Set data attribute on html element
    htmlElement.setAttribute("data-theme", theme);
    
    // 2. Set color-scheme meta tag to let browser adapt native controls
    if (themeMetaTag) {
      themeMetaTag.content = theme;
    }
    
    // 3. Make sure toggle button visuals align
    if (theme === "dark") {
      themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  // Initial Theme Application
  const initialTheme = getEffectiveTheme();
  applyTheme(initialTheme);

  // Toggle Theme Event
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme") || getEffectiveTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    localStorage.setItem("color-scheme", nextTheme);
    applyTheme(nextTheme);
  });

  // Watch for system preference changes and react dynamically if no explicit user override exists
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const userOverride = localStorage.getItem("color-scheme");
    if (!userOverride) {
      const nextTheme = e.matches ? "dark" : "light";
      applyTheme(nextTheme);
    }
  });


  /* ==========================================================================
     MOBILE NAVIGATION
     ========================================================================== */

  function toggleMobileMenu() {
    const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileMenuToggle.classList.toggle("active");
    mainNav.classList.toggle("active");
  }

  mobileMenuToggle.addEventListener("click", toggleMobileMenu);

  // Close mobile navigation when clicking links
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });


  /* ==========================================================================
     ACTIVE NAVIGATION LINK TRACKING & SMOOTH SCROLL
     ========================================================================== */

  // Smooth Scroll offset correction on link click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Highlight navigation item currently visible in viewport
  const navObserverOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Focus on middle segment of viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = `#${entry.target.id}`;
        navLinks.forEach(link => {
          if (link.getAttribute("href") === activeId) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));


  /* ==========================================================================
     SKILLS STAGE ANIMATIONS ON SCROLL
     ========================================================================== */

  // Skill Bar Intersection Loader
  const skillObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".skill-bar");
        bars.forEach(bar => {
          const styleAttr = bar.getAttribute("style");
          if (styleAttr && styleAttr.includes("--val")) {
            // Find custom percentage and set dynamic CSS width
            const match = styleAttr.match(/--val:\s*(\d+)%/);
            if (match && match[1]) {
              bar.style.width = `${match[1]}%`;
            }
          }
        });
        // Stop observing this category once animated
        observer.unobserve(entry.target);
      }
    });
  }, skillObserverOptions);

  skillsCategories.forEach(category => skillObserver.observe(category));


  /* ==========================================================================
     PROGRESSIVE SCROLL REVEAL FALLBACK FOR OLDER BROWSERS
     ========================================================================== */

  // Check if browser natively supports Scroll-driven CSS View Timelines
  const supportsScrollDrivenAnimations = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!supportsScrollDrivenAnimations) {
    // Set fallback classes on elements
    const elementsToReveal = document.querySelectorAll(
      ".project-card, .skills-category, .about-bio, .about-stats, .contact-info-panel, .contact-form"
    );

    // Apply base reveal CSS attributes
    elementsToReveal.forEach(el => {
      el.classList.add("js-reveal");
      
      // Inject standard fallback styles directly if not already present
      if (!document.getElementById("scroll-reveal-fallback-css")) {
        const fallbackStyle = document.createElement("style");
        fallbackStyle.id = "scroll-reveal-fallback-css";
        fallbackStyle.textContent = `
          .js-reveal {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .js-reveal.reveal-active {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        `;
        document.head.appendChild(fallbackStyle);
      }
    });

    const revealObserverOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Trigger slightly before scrolling into viewport center
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, revealObserverOptions);

    elementsToReveal.forEach(el => revealObserver.observe(el));
  }


  /* ==========================================================================
     CONTACT FORM HANDLING WITH ACCESSIBILITY & STATE WRAPPING
     ========================================================================== */

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Clear previous banners
    successBanner.style.display = "none";
    successBanner.setAttribute("aria-hidden", "true");
    errorBanner.style.display = "none";
    errorBanner.setAttribute("aria-hidden", "true");

    // Perform Custom Form Validation Checks
    let formIsValid = true;
    const inputs = contactForm.querySelectorAll(".form-control");
    
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        formIsValid = false;
        // Trigger field-specific CSS dirty checks
        input.setAttribute("placeholder", " "); // Ensure placeholder is empty
      }
    });

    if (!formIsValid) {
      // Direct focus to first invalid input field
      const firstInvalid = contactForm.querySelector(".form-control:invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Set submitting loading state
    contactForm.classList.add("submitting");
    const submitBtn = contactForm.querySelector(".form-submit-btn");
    submitBtn.setAttribute("disabled", "true");

    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute("action");

    try {
      // If it is our mock placeholder URL, simulate a realistic successful API response
      if (formAction.includes("placeholder")) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        handleSuccess();
      } else {
        // Run standard fetch request submission
        const response = await fetch(formAction, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          handleSuccess();
        } else {
          handleError();
        }
      }
    } catch (err) {
      console.error("Formspree Submission Error:", err);
      handleError();
    } finally {
      // Re-enable form controls
      contactForm.classList.remove("submitting");
      submitBtn.removeAttribute("disabled");
    }
  });

  function handleSuccess() {
    // Show success toast
    successBanner.style.display = "flex";
    successBanner.setAttribute("aria-hidden", "false");
    
    // Reset fields
    contactForm.reset();
    
    // Scroll slightly to let user read the success alert
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Fade toast out after 6 seconds
    setTimeout(() => {
      successBanner.style.display = "none";
      successBanner.setAttribute("aria-hidden", "true");
    }, 6000);
  }

  function handleError() {
    // Show error alert
    errorBanner.style.display = "flex";
    errorBanner.setAttribute("aria-hidden", "false");
    
    // Scroll slightly to let user read the error alert
    errorBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});
