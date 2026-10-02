/**
 * Nirveen Interior Studio - Main Client-Side JavaScript
 * Chennai, Tamil Nadu, India
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initEnquiryModal();
  initMobileNav();
  initPortfolioFilter();
  initBlogReader();
  initForms();
  highlightActiveNav();
});

/* --------------------------------------------------------------------------
   1. Page Loader
   -------------------------------------------------------------------------- */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('loaded');
    setTimeout(() => {
      if (loader.parentNode) {
        loader.style.display = 'none';
      }
    }, 500);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 350));
    // Fallback timer
    setTimeout(hideLoader, 1500);
  }
}

/* --------------------------------------------------------------------------
   2. Initial Enquiry Modal
   -------------------------------------------------------------------------- */
function initEnquiryModal() {
  const modal = document.getElementById('enquiry-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const dialog = modal.querySelector('.modal-dialog');
  const triggerBtns = document.querySelectorAll('.js-open-enquiry');

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Open on button triggers
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Automatically show on initial visit if not shown in current tab session
  const hasShown = sessionStorage.getItem('nirveen_popup_seen');
  if (!hasShown) {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem('nirveen_popup_seen', 'true');
    }, 1100);
  }
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking any nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggle.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Portfolio Filter Tabs
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !portfolioCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Blog Articles Data & Reader Modal
   -------------------------------------------------------------------------- */
const blogArticles = {
  1: {
    title: "10 Things to Consider Before Starting Your Home Interior Project in Chennai",
    category: "Planning & Design",
    date: "Chennai Interior Guide",
    content: `
      <p>Planning home interiors in Chennai requires balancing modern aesthetics with local climatic realities like humidity, coastal air, and intense summer heat.</p>
      
      <h3>1. Moisture-Resistant & Marine Materials</h3>
      <p>Due to coastal weather, standard commercial particle boards often fail or sag over time. For Chennai homes, always prioritize BWP (Boiling Water Proof) or BWR (Boiling Water Resistant) marine-grade plywood, especially for modular kitchens and bathroom vanities.</p>

      <h3>2. Cross-Ventilation & Natural Daylight</h3>
      <p>Chennai apartments benefit tremendously from layouts that do not obstruct balcony air paths. Plan your TV units and tall crockery cupboards away from primary airflow channels.</p>

      <h3>3. False Ceiling Height & Fan Drop</h3>
      <p>Ensure your POP or gypsum false ceiling leaves at least 9 to 9.5 feet of clear headroom so ceiling fans circulate air effectively without creating a claustrophobic feel.</p>

      <h3>4. Electrical Points & Appliance Load Planning</h3>
      <p>Modern homes require dedicated 16A points for air conditioners, heavy kitchen appliances, and chimney ducting. Map your electrical layout before starting civil or carpentry work.</p>

      <h3>5. Turnkey Single-Window Accountability</h3>
      <p>Managing individual carpenters, electricians, painters, and POP labor separately leads to timeline delays and finger-pointing. A turnkey partner like Nirveen Interior Studio coordinates the entire project under one roof.</p>
    `
  },
  2: {
    title: "How to Plan a Practical 2 BHK Interior Design",
    category: "Space Optimization",
    date: "Space Planning",
    content: `
      <p>A standard 2 BHK flat in Chennai typically ranges from 750 sq.ft to 1,050 sq.ft. The secret to an uncluttered home is smart vertical storage and dual-purpose furniture.</p>

      <h3>1. Floor-to-Ceiling Wardrobes with Lofts</h3>
      <p>Do not waste the top 2 feet below the ceiling. Loft cabinets provide essential storage for suitcases, festival items, and extra linens while keeping the bedroom footprint clean.</p>

      <h3>2. Wall-Mounted TV Unit with Concealed Wiring</h3>
      <p>Avoid bulky floor credenzas. A sleek wall-mounted back panel with a floating console gives the living room an expansive, airy feel.</p>

      <h3>3. L-Shaped Modular Kitchen Flow</h3>
      <p>Maintain the golden work triangle (Refrigerator, Sink, Hob). Use tandem drawers and wire pull-outs to maximize corner spaces.</p>

      <h3>4. Light Neutral Color Palette</h3>
      <p>Whites, soft greys, and warm wood accents visually expand compact living and dining spaces, reflecting natural light throughout the flat.</p>
    `
  },
  3: {
    title: "Modular Kitchen vs Custom Furniture: What Should You Choose?",
    category: "Materials & Craftsmanship",
    date: "Material Comparison",
    content: `
      <p>Homeowners often debate between factory-made modular systems and custom on-site carpentry. The most practical approach is often a hybrid solution.</p>

      <h3>Factory Modular Precision</h3>
      <p>Modular systems excel at standard cabinet sizes, precision edge-banding, and branded hardware fittings (Hettich, Hafele, Blum) that open and close smoothly for decades.</p>

      <h3>Custom On-Site Carpentry</h3>
      <p>Homes in Chennai frequently have uneven wall angles, protruding structural columns, or unique beam heights. Custom carpentry ensures exact wall-to-wall fitting with zero awkward gaps.</p>

      <h3>The Nirveen Hybrid Advantage</h3>
      <p>We combine modular precision for high-usage areas (kitchen carcases and drawers) with skilled on-site carpentry for master bedroom wardrobes, fluted wall paneling, and custom prayer units.</p>
    `
  },
  4: {
    title: "How Much Does Home Interior Design Cost in Chennai?",
    category: "Pricing & Budgeting",
    date: "Cost Breakdown",
    content: `
      <p>Understanding interior costs prevents mid-project surprises. In Chennai, basic quality residential interiors generally start from ₹3 Lakhs, scaling based on flat configuration and materials.</p>

      <h3>Basic Scope (Starting from ₹3 Lakhs)</h3>
      <p>Covers essential modular kitchen carcase and shutters, 2 basic wardrobes, TV unit, and basic electrical modifications for a 2 BHK apartment.</p>

      <h3>Comprehensive Semi-Turnkey (₹5 to ₹8 Lakhs)</h3>
      <p>Adds full lofts, hydraulic storage beds, gypsum false ceiling with warm LED cove lights, premium laminate finishes, and comprehensive wall painting.</p>

      <h3>Full Turnkey Premium (₹9 Lakhs & Above)</h3>
      <p>Includes designer foyer partition, acrylic or PU finish kitchen, wallpaper/fluted charcoal paneling, custom sofa, dining set, curtains, and complete handover.</p>
    `
  }
};

function initBlogReader() {
  const modal = document.getElementById('blog-reader-modal');
  if (!modal) return;

  const titleEl = document.getElementById('reader-title');
  const metaEl = document.getElementById('reader-meta');
  const bodyEl = document.getElementById('reader-body');
  const closeBtn = modal.querySelector('.modal-close-btn');

  const openReader = (id) => {
    const article = blogArticles[id];
    if (!article) return;

    titleEl.textContent = article.title;
    metaEl.innerHTML = `<span>${article.category}</span> · <span>${article.date}</span> · <span>Nirveen Interior Studio</span>`;
    bodyEl.innerHTML = article.content;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeReader = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-read-blog').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-blog-id');
      openReader(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeReader);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeReader();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeReader();
  });
}

/* --------------------------------------------------------------------------
   6. Form Validation & Submissions
   -------------------------------------------------------------------------- */
function initForms() {
  const forms = document.querySelectorAll('form[data-handle-submit="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');

      if (!nameInput || !nameInput.value.trim()) {
        alert('Please enter your full name.');
        nameInput?.focus();
        return;
      }

      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 10) {
        alert('Please enter a valid 10-digit mobile number so our team can reach you.');
        phoneInput?.focus();
        return;
      }

      // Show submission state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending Enquiry...';
      }

      setTimeout(() => {
        // Find or create success message
        const successBanner = form.parentElement.querySelector('.form-success-banner');
        if (successBanner) {
          form.style.display = 'none';
          successBanner.classList.add('active');
        } else {
          alert('Thank you! Your enquiry has been received. Our team will contact you shortly.');
          form.reset();
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }, 700);
    });
  });
}

/* --------------------------------------------------------------------------
   7. Highlight Active Navigation
   -------------------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('#')[0];

    if (
      (currentPath === '' || currentPath === 'index.html') && (targetFile === 'index.html' || targetFile === './' || targetFile === '/')
    ) {
      if (!href.includes('#')) {
        link.classList.add('active');
      }
    } else if (targetFile === currentPath) {
      link.classList.add('active');
    }
  });
}
