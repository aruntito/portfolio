/**
 * Founder Digital Identity System — Core Interaction Controller
 * morgan.sys | Systems, Automation, Branding, and Growth
 */

document.addEventListener("DOMContentLoaded", () => {
  const htmlElement = document.documentElement;
  const themeMetaTag = document.querySelector('meta[name="color-scheme"]');
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main > section");
  
  const contactForm = document.getElementById("contact-form");
  const successBanner = document.getElementById("form-success-banner");
  const errorBanner = document.getElementById("form-error-banner");

  /* ==========================================================================
     SILENT THEME PERSISTENCE & CONTROL
     ========================================================================== */

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

  function applyTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    
    if (themeMetaTag) {
      themeMetaTag.content = theme === "dark" ? "dark" : "light dark";
    }
    
    themeToggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light perspective" : "Switch to dark perspective"
    );
  }

  // Init Theme
  const activeTheme = getEffectiveTheme();
  applyTheme(activeTheme);

  // Toggle Action
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme") || getEffectiveTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    localStorage.setItem("color-scheme", nextTheme);
    applyTheme(nextTheme);
  });

  // Observe OS Theme Alterations
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const customConfig = localStorage.getItem("color-scheme");
    if (!customConfig) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });


  /* ==========================================================================
     SMOOTH SCROLL CORRECTION WITH CAPSULE OFFSET
     ========================================================================== */

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight + 24; // Capsule spacing margin
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  /* ==========================================================================
     HIGH-PERFORMANCE INTERSECTION NAVIGATION TRACKING
     ========================================================================== */

  const navObserverOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px", // Focus tracking on high-status middle segment
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
     PROGRESSIVE SCROLL REVEAL FALLBACK (ATMOSPHERIC TRANSITION)
     ========================================================================== */

  const supportsScrollDrivenAnimations = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!supportsScrollDrivenAnimations) {
    const revealCandidates = document.querySelectorAll(
      ".philosophy-card, .briefing-item, .intel-column, .connect-brief, .connect-form-panel"
    );

    // Apply baseline CSS variables dynamically for fallback browsers
    revealCandidates.forEach(el => {
      el.classList.add("js-reveal-quiet");
      
      if (!document.getElementById("scroll-reveal-fallback-css")) {
        const styleTag = document.createElement("style");
        styleTag.id = "scroll-reveal-fallback-css";
        styleTag.textContent = `
          .js-reveal-quiet {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .js-reveal-quiet.reveal-active-quiet {
            opacity: 1;
            transform: translateY(0);
          }
        `;
        document.head.appendChild(styleTag);
      }
    });

    const revealObserverOptions = {
      root: null,
      rootMargin: "0px 0px -12% 0px", // Early quiet triggers
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active-quiet");
          observer.unobserve(entry.target);
        }
      });
    }, revealObserverOptions);

    revealCandidates.forEach(el => revealObserver.observe(el));
  }


  /* ==========================================================================
     TACTILE SECURE FORM CONTROLS & RESPONSE SIMULATORS
     ========================================================================== */

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Clear alerts
    successBanner.style.display = "none";
    successBanner.setAttribute("aria-hidden", "true");
    errorBanner.style.display = "none";
    errorBanner.setAttribute("aria-hidden", "true");

    // Strict validation check
    let formIsValid = true;
    const inputs = contactForm.querySelectorAll(".form-input");
    
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        formIsValid = false;
        input.setAttribute("placeholder", " "); // Force validation bounds visual check
      }
    });

    if (!formIsValid) {
      const firstInvalid = contactForm.querySelector(".form-input:invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submission states trigger
    contactForm.classList.add("submitting");
    const submitBtn = contactForm.querySelector(".submit-btn");
    submitBtn.setAttribute("disabled", "true");

    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute("action");

    try {
      if (formAction.includes("placeholder")) {
        // High-status operational delay simulation
        await new Promise(resolve => setTimeout(resolve, 1400));
        handleSuccess();
      } else {
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
      console.error("Secure Transmission Error:", err);
      handleError();
    } finally {
      contactForm.classList.remove("submitting");
      submitBtn.removeAttribute("disabled");
    }
  });

  function handleSuccess() {
    successBanner.style.display = "flex";
    successBanner.setAttribute("aria-hidden", "false");
    contactForm.reset();
    
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    setTimeout(() => {
      successBanner.style.display = "none";
      successBanner.setAttribute("aria-hidden", "true");
    }, 5000);
  }

  function handleError() {
    errorBanner.style.display = "flex";
    errorBanner.setAttribute("aria-hidden", "false");
    errorBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});
