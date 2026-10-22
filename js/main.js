/**
 * Green Way Tours (جرين واي للسياحة) - Official Evergreen Logic
 * Features: Static Profile, Smooth Navigation, FAQ Accordion, Inquiry Form & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- FAQ Accordion Logic ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });

  // --- Contact & Inquiry Form Submission ---
  const contactForm = document.getElementById('contactForm');
  const inquireViaWaBtn = document.getElementById('inquireViaWaBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const service = document.getElementById('contactService').value;

      showToast(`شكراً لك أ/ ${name}! تم استلام استفسارك بخصوص (${service}). سيتواصل معك أحد مستشاري جرين واي قريباً.`, 'success');
      contactForm.reset();
    });
  }

  // WhatsApp Direct Inquiry Button
  if (inquireViaWaBtn) {
    inquireViaWaBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName')?.value.trim() || 'عميل محترم';
      const phone = document.getElementById('contactPhone')?.value.trim() || '-';
      const service = document.getElementById('contactService')?.value || 'استفسار عام';
      const msg = document.getElementById('contactMsg')?.value.trim() || 'أود معرفة المزيد من التفاصيل';

      const waMsg = `السلام عليكم ورحمة الله، شركة جرين واي للسياحة (ترخيص فئة أ):%0A` +
        `👤 الاسم: ${name}%0A` +
        `📞 الهاتف: ${phone}%0A` +
        `💼 نوع الخدمة المطلوبة: ${service}%0A` +
        `📝 تفاصيل الاستفسار: ${msg}`;

      window.open(`https://wa.me/201222244258?text=${waMsg}`, '_blank');
    });
  }

  // --- Toast Notification System ---
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // --- Navbar Sticky & Scroll-to-Top ---
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinksList = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.style.display = 'flex';
    } else {
      navbar?.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.style.display = 'none';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (window.scrollY >= secTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinksList.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Hamburger Navigation ---
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
});
