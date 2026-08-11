/**
 * Creative UI Enhancements
 * Adds smooth animations, micro-interactions, and visual effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all enhancement systems
  initializeScrollAnimations();
  initializeHoverEffects();
  initializeButtonEffects();
  initializeParallax();
  initializeIntersectionObserver();
  initializeFormEnhancements();
  addRippleEffect();
  initializeButtonParticles();
});

/**
 * Enhanced button effects with particle generation
 */
function initializeButtonParticles() {
  const buttons = document.querySelectorAll('.btn, .small-btn, .gallery-button, .search-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      
      // Create burst effect
      createBurstEffect(e.clientX - rect.left, e.clientY - rect.top, this);
      
      // Add click animation
      this.style.animation = 'buttonClick 0.3s ease-out';
    });

    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

/**
 * Create burst particles on button click
 */
function createBurstEffect(x, y, button) {
  const particleCount = 8;
  const container = button.parentElement;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 5 + Math.random() * 3;

    particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
    `;

    container.style.position = 'relative';
    container.appendChild(particle);

    // Animate particle
    let time = 0;
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      time = Date.now() - startTime;
      const progress = time / duration;

      if (progress < 1) {
        particle.style.left = (x + Math.cos(angle) * velocity * 80 * progress) + 'px';
        particle.style.top = (y + Math.sin(angle) * velocity * 80 * progress - 20 * progress * progress) + 'px';
        particle.style.opacity = 1 - progress;
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    animate();
  }
}

/**
 * Add animation keyframes for button click
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes buttonClick {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

/**
 * Intersection Observer for scroll reveal animations
 */
function initializeIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all cards and panels
  document.querySelectorAll('.card, .category-card, .gallery-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
}

/**
 * Smooth scroll behavior
 */
function initializeScrollAnimations() {
  let lastScrollTop = 0;
  const navbar = document.querySelector('.topbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        navbar.style.boxShadow = '0 12px 40px rgba(15, 23, 42, 0.15)';
      } else {
        navbar.style.boxShadow = '0 8px 32px rgba(31, 41, 55, 0.1)';
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
  }
}

/**
 * Enhanced hover effects with mouse tracking
 */
function initializeHoverEffects() {
  const cards = document.querySelectorAll('.card, .category-card, .gallery-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

/**
 * Button click effects with ripple
 */
function initializeButtonEffects() {
  const buttons = document.querySelectorAll('.btn, .small-btn, .gallery-button, .search-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);
      
      // Add glow effect
      const glow = document.createElement('div');
      glow.style.cssText = `
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        pointer-events: none;
        animation: glowPulse 0.5s ease-out;
      `;
      this.appendChild(glow);
      
      setTimeout(() => ripple.remove(), 600);
      setTimeout(() => glow.remove(), 500);
    });
  });
}

/**
 * Add ripple effect styling
 */
function addRippleEffect() {
  const style = document.createElement('style');
  style.textContent = `
    .btn, .small-btn, .gallery-button, .search-btn {
      position: relative;
      overflow: hidden;
    }

    .ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 70%);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    }

    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes glowPulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(1.1);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Parallax effect for hero section
 */
function initializeParallax() {
  const heroPanel = document.querySelector('.hero-panel');

  if (heroPanel) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      heroPanel.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
  }
}

/**
 * Form field enhancements
 */
function initializeFormEnhancements() {
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transition = 'all 0.3s ease';
      this.parentElement?.classList?.add('focused');
    });

    input.addEventListener('blur', function() {
      this.parentElement?.classList?.remove('focused');
    });

    // Add floating label effect if needed
    input.addEventListener('input', function() {
      if (this.value) {
        this.style.background = 'rgba(255, 255, 255, 1)';
      }
    });
  });
}

/**
 * Add loading animation to buttons during submission
 */
window.addLoadingState = function(button) {
  if (!button) return;

  const originalText = button.textContent;
  button.textContent = 'Loading...';
  button.disabled = true;
  button.classList.add('loading');

  return () => {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('loading');
  };
};

/**
 * Toast notification system
 */
window.showToast = function(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${
      type === 'success' ? '#10b981, #059669' :
      type === 'error' ? '#ef4444, #dc2626' :
      type === 'warning' ? '#f59e0b, #d97706' :
      '#2563eb, #1d4ed8'
    });
    color: white;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10000;
    max-width: 400px;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/**
 * Add animation styles for toast
 */
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;
document.head.appendChild(toastStyle);

/**
 * Smooth page transitions
 */
function smoothPageTransition() {
  const links = document.querySelectorAll('a[href^="./"], a[href^="/"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Don't apply transition for anchor links
      if (href.startsWith('#')) return;

      // Skip external links
      if (this.target === '_blank') return;

      // Add fade-out animation
      document.body.style.opacity = '0.8';
      document.body.style.transition = 'opacity 0.3s ease-out';
    });
  });
}

smoothPageTransition();

/**
 * Enhance product cards with rating display
 */
window.addProductRating = function(productCard, rating = 4.5) {
  const ratingContainer = document.createElement('div');
  ratingContainer.style.cssText = `
    display: flex;
    gap: 4px;
    margin-top: 8px;
  `;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.textContent = '★';
    star.style.cssText = `
      color: ${i <= Math.floor(rating) ? '#f59e0b' : 
              i - 0.5 <= rating ? '#fbbf24' : '#d1d5db'};
      font-size: 14px;
      transition: color 0.3s ease;
    `;
    ratingContainer.appendChild(star);
  }

  const ratingText = document.createElement('span');
  ratingText.textContent = `${rating} / 5`;
  ratingText.style.cssText = `
    font-size: 12px;
    color: #6b7280;
    margin-left: 4px;
  `;
  ratingContainer.appendChild(ratingText);

  const cardContent = productCard.querySelector('.card-content');
  if (cardContent) {
    cardContent.appendChild(ratingContainer);
  }
};

/**
 * Add cursor glow effect (optional - advanced)
 */
function initializeCursorGlow() {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(37, 99, 235, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
    display: none;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 10) + 'px';
    cursorGlow.style.top = (e.clientY - 10) + 'px';
  });

  // Show glow on interactive elements
  document.addEventListener('mouseenter', (e) => {
    if (e.target.closest('.btn, .card, a, button')) {
      cursorGlow.style.display = 'block';
    }
  }, true);

  document.addEventListener('mouseleave', (e) => {
    if (e.target.closest('.btn, .card, a, button')) {
      cursorGlow.style.display = 'none';
    }
  }, true);
}

// Uncomment to enable cursor glow
// initializeCursorGlow();

console.log('✨ Creative UI Enhancements loaded successfully!');
