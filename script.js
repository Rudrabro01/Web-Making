/**
 * RANGOLI ADDS — Interactive Scripts & Micro-interactions
 * Minimal Editorial Portfolio Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initStickyHeader();
  initMobileNavigation();
  initPortfolioFilters();
  initLightboxModal();
  initFaqAccordion();
  initQuoteForm();
  initFloatingPill();
  initSmoothScroll();
});

/**
 * 1. IntersectionObserver for Reveal Animations
 * Implements useInViewAnimation() behavior requested in specification
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 2. Sticky Header with Scroll Detection
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!hamburgerBtn || !mobileDrawer) return;

  const toggleMenu = () => {
    const isOpen = hamburgerBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  const closeMenu = () => {
    hamburgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/**
 * 4. Portfolio Category Filtering
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCats = item.getAttribute('data-category') || '';
        if (filterVal === 'all' || itemCats.includes(filterVal)) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/**
 * 5. Interactive Lightbox Modal
 */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const portfolioCards = document.querySelectorAll('.portfolio-item');

  if (!modal || !lightboxImg) return;

  const openLightbox = (item) => {
    const imgUrl = item.getAttribute('data-img') || item.querySelector('img').src;
    const title = item.getAttribute('data-title') || '';
    const category = item.getAttribute('data-category-name') || '';
    const desc = item.getAttribute('data-desc') || '';

    lightboxImg.src = imgUrl;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxBadge.textContent = category;
    lightboxDesc.textContent = desc;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  portfolioCards.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * 6. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      item.classList.toggle('active', !isActive);
      trigger.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
    });
  });
}

/**
 * 7. Quote Form Validation & Clean Success Message
 */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const successBox = document.getElementById('form-success-box');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form || !successBox) return;

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length === 10;
  };

  const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('fullName');
    const nameGroup = nameInput.closest('.form-group');
    if (!nameInput.value.trim()) {
      nameGroup.classList.add('has-error');
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
      nameInput.classList.remove('is-invalid');
    }

    // Phone validation
    const phoneInput = document.getElementById('phoneNumber');
    const phoneGroup = phoneInput.closest('.form-group');
    if (!validatePhone(phoneInput.value.trim())) {
      phoneGroup.classList.add('has-error');
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneGroup.classList.remove('has-error');
      phoneInput.classList.remove('is-invalid');
    }

    // Email validation
    const emailInput = document.getElementById('emailAddress');
    const emailGroup = emailInput.closest('.form-group');
    if (!validateEmail(emailInput.value.trim())) {
      emailGroup.classList.add('has-error');
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
      emailInput.classList.remove('is-invalid');
    }

    // Service validation
    const serviceInput = document.getElementById('serviceRequired');
    const serviceGroup = serviceInput.closest('.form-group');
    if (!serviceInput.value) {
      serviceGroup.classList.add('has-error');
      serviceInput.classList.add('is-invalid');
      isValid = false;
    } else {
      serviceGroup.classList.remove('has-error');
      serviceInput.classList.remove('is-invalid');
    }

    if (!isValid) return;

    // Extract form data
    const customerName = nameInput.value.trim();
    const customerMobile = phoneInput.value.trim();
    const customerEmail = emailInput.value.trim() || 'Not specified';
    const service = serviceInput.value;
    
    const quantityInput = document.getElementById('quantity');
    const sizeInput = document.getElementById('sizeFormat');
    const budgetInput = document.getElementById('budget');
    const messageInput = document.getElementById('message');

    const quantity = quantityInput ? (quantityInput.value.trim() || 'Not specified') : 'Not specified';
    const sizeFormat = sizeInput ? (sizeInput.value.trim() || 'Not specified') : 'Not specified';
    const budget = budgetInput ? (budgetInput.value.trim() || 'Not specified') : 'Not specified';
    const customerMessage = messageInput ? (messageInput.value.trim() || 'None provided') : 'None provided';

    // Format the WhatsApp message exactly as requested
    const messageText = 
`Hello Rangoli Adds 👋

I would like to request a quote.

Customer Details:
Name: ${customerName}
Mobile: ${customerMobile}
Email: ${customerEmail}

Requirement:
Service/Product: ${service}
Quantity: ${quantity}
Size/Format: ${sizeFormat}
Budget: ${budget}

Additional Details:
${customerMessage}

Please contact me regarding this quotation.

Thank you.`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919028245110?text=${encoded}`;

    // Open WhatsApp in new tab / mobile app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Update fallback link on success card
    const directLink = document.getElementById('direct-whatsapp-btn');
    if (directLink) {
      directLink.href = whatsappUrl;
    }

    // Hide form, show clean success message
    form.style.display = 'none';
    successBox.classList.add('visible');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      successBox.classList.remove('visible');
    });
  }
}

/**
 * 8. Floating Pill Navigation Visibility Logic
 * Disappears smoothly when near bottom or top to avoid visual overlapping
 */
function initFloatingPill() {
  const pill = document.getElementById('floating-pill-nav');
  if (!pill) return;

  const handlePillVisibility = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Hide if in the first 250px or if scrolled into contact/footer
    if (scrollY < 250 || (scrollY + windowHeight > docHeight - 450)) {
      pill.style.opacity = '0';
      pill.style.pointerEvents = 'none';
      pill.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
      pill.style.opacity = '1';
      pill.style.pointerEvents = 'auto';
      pill.style.transform = 'translateX(-50%) translateY(0)';
    }
  };

  window.addEventListener('scroll', handlePillVisibility, { passive: true });
  handlePillVisibility();
}

/**
 * 9. Smooth Scroll for Anchor Links with Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
