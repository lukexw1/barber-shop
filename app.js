// app.js
document.addEventListener('DOMContentLoaded', () => {
  /* ====== Hero slider ====== */
  // Укажите сюда свои изображения (пути) — относительные или абсолютные
  const slides = [
    'work1.jpeg',
  ];

  const heroBg = document.getElementById('heroBg');
  let current = 0;
  let autoplayInterval = 5000;
  let timer = null;
  const setSlide = (index) => {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    // плавный переход: меняем background-image
    heroBg.style.backgroundImage = `url('${slides[current]}')`;
  };

  // Initialize
  setSlide(0);

  // Auto play
  const startAuto = () => {
    stopAuto();
    timer = setInterval(() => setSlide(current + 1), autoplayInterval);
  };
  const stopAuto = () => {
    if (timer) { clearInterval(timer); timer = null; }
  };

  // Controls
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  prevBtn && prevBtn.addEventListener('click', () => { setSlide(current - 1); startAuto(); });
  nextBtn && nextBtn.addEventListener('click', () => { setSlide(current + 1); startAuto(); });

  // Pause on hover
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAuto);
    heroSection.addEventListener('mouseleave', startAuto);
  }
  startAuto();

  /* ====== Reviews logic ====== */
  const goodBtn = document.getElementById('goodReviewBtn');
  const badBtn = document.getElementById('badReviewBtn');
  const goodActions = document.getElementById('goodActions');
  const badForm = document.getElementById('badForm');
  const complaintForm = document.getElementById('complaintForm');
  const complaintResult = document.getElementById('complaintResult');
  const complaintCancel = document.getElementById('complaintCancel');

  const hideAll = () => {
    goodActions && goodActions.classList.add('hidden');
    badForm && badForm.classList.add('hidden');
    if (goodActions) goodActions.setAttribute('aria-hidden','true');
    if (badForm) badForm.setAttribute('aria-hidden','true');
  };

  goodBtn && goodBtn.addEventListener('click', () => {
    hideAll();
    goodActions && (goodActions.classList.remove('hidden'), goodActions.setAttribute('aria-hidden','false'));
  });

  badBtn && badBtn.addEventListener('click', () => {
    hideAll();
    badForm && (badForm.classList.remove('hidden'), badForm.setAttribute('aria-hidden','false'));
  });

  complaintCancel && complaintCancel.addEventListener('click', () => {
    hideAll();
    complaintResult && (complaintResult.textContent = '');
  });

  // Simple client-side validation and demonstration "submit"
  complaintForm && complaintForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('complaintName').value.trim();
    const phone = document.getElementById('complaintPhone').value.trim();
    const text = document.getElementById('complaintText').value.trim();

    if (!name || !phone || !text) {
      complaintResult.textContent = 'Пожалуйста, заполните все поля.';
      complaintResult.style.color = 'crimson';
      return;
    }
    // Basic phone validation (пример)
    const digits = phone.replace(/\D/g,'');
    if (digits.length < 7) {
      complaintResult.textContent = 'Пожалуйста, проверьте номер телефона.';
      complaintResult.style.color = 'crimson';
      return;
    }

    // Здесь: отправьте данные на ваш сервер (fetch), пока — просто демонстрация:
    console.log('Complaint submitted', {name, phone, text, when: new Date().toISOString()});
    complaintResult.textContent = 'Спасибо — мы получили вашу заявку и свяжемся с вами.';
    complaintResult.style.color = 'green';
    complaintForm.reset();

    // Если понадобится — можно отправить fetch('/api/complaint', {method:'POST', body:...})
  });

  /* ====== Highlight nav on scroll (simple) ====== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = {
    hero: document.getElementById('hero'),
    services: document.getElementById('services'),
    about: document.getElementById('about-location'),
    contact: document.getElementById('contact')
  };

  const updateActiveNav = () => {
    const y = window.scrollY + window.innerHeight/3;
    if (sections.contact && y >= sections.contact.offsetTop) active = 'contact';
    else if (sections.about && y >= sections.about.offsetTop) active = 'about';
    else if (sections.services && y >= sections.services.offsetTop) active = 'services';
    else active = 'hero';
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href').includes(active));
    });
  };
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav);
});
lastScroll = 0
const nav = document.querySelector(".main-nav")
window.addEventListener('scroll', () =>{
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll >= 80) {
    // скроллим вниз → показываем меню
      nav.classList.add("show");
    } 
    else if (currentScroll < lastScroll){
    // скроллим вверх → прячем меню
      nav.classList.remove("show");
    }
    lastScroll = currentScroll;
});