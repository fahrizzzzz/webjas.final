// ========================================
// JASWEB.CO - Static Website JavaScript
// ========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initFAQAccordion();
  initCharacterCounter();
  initSmoothScroll();
  initContactForm();
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isOpen = this.getAttribute('data-state') === 'open';
      
      // Close all other items
      faqTriggers.forEach(t => {
        if (t !== this) {
          t.setAttribute('data-state', 'closed');
          t.nextElementSibling.style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      if (isOpen) {
        this.setAttribute('data-state', 'closed');
        content.style.maxHeight = '0';
      } else {
        this.setAttribute('data-state', 'open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// ========================================
// Character Counter for Textarea
// ========================================
function initCharacterCounter() {
  const textarea = document.querySelector('#message');
  const counter = document.querySelector('#char-counter');
  
  if (textarea && counter) {
    textarea.addEventListener('input', function() {
      const length = this.value.length;
      counter.textContent = `${length}/500 karakter`;
      
      // Change color when approaching limit
      if (length > 450) {
        counter.style.color = 'hsl(0, 100%, 60%)';
      } else if (length > 400) {
        counter.style.color = 'hsl(40, 100%, 50%)';
      } else {
        counter.style.color = '';
      }
    });
  }
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Contact Form Handler
// ========================================
function initContactForm() {
  const form = document.querySelector('#contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
      };
      
      // Simple validation
      if (!data.name || !data.email || !data.service || !data.message) {
        showNotification('Mohon lengkapi semua field!', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Mengirim...</span>';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual submission logic)
      setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
        form.reset();
        document.querySelector('#char-counter').textContent = '0/500 karakter';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;padding:0;margin-left:1rem;">✕</button>
  `;
  
  // Styles
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: '100',
    animation: 'slideIn 0.3s ease',
    maxWidth: '400px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  });
  
  // Type-specific styles
  if (type === 'success') {
    notification.style.background = 'hsl(160, 84%, 39%)';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.background = 'hsl(0, 84%, 60%)';
    notification.style.color = 'white';
  } else {
    notification.style.background = 'hsl(220, 20%, 20%)';
    notification.style.color = 'white';
    notification.style.border = '1px solid hsl(180, 100%, 50%)';
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);