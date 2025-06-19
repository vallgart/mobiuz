const popupOverlay = document.getElementById('esim-popup-overlay');
const popup = document.getElementById('esim-popup');
const popupClose = document.getElementById('esim-popup-close');
const openPopupBtns = document.querySelectorAll('.open-popup');
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');
const btn = document.getElementById('esim-popup-btn');

// Примечания (аккордеон)
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach(header => {
  header.addEventListener('click', function () {
    const item = this.closest('.accordion-item');
    const wasActive = item.classList.contains('active');
    accordions.forEach(h => h.closest('.accordion-item').classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// FAQ (аккордеон)
const faqs = document.querySelectorAll('.faq-question');
faqs.forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    faqs.forEach(b => b.closest('.faq-item').classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// Попап
if (popupOverlay && popup && popupClose) {
  openPopupBtns.forEach(btn => btn.addEventListener('click', openEsimPopup));
  popupClose.addEventListener('click', closeEsimPopup);
  popupOverlay.addEventListener('mousedown', e => {
    if (!popup.contains(e.target)) closeEsimPopup();
  });
  // Скрываем попап при инициализации
  closeEsimPopup();
}

// Управление попапом
function openEsimPopup() {
  popupOverlay.style.display = 'flex';
  popup.style.display = 'flex';
}
function closeEsimPopup() {
  popupOverlay.style.display = 'none';
  popup.style.display = 'none';
}

// Блокировка кнопки
function toggleButtonState() {
  if (checkbox1.checked && checkbox2.checked) {
    btn.classList.remove('disabled');
    btn.setAttribute('tabindex', '0');
  } else {
    btn.classList.add('disabled');
    btn.setAttribute('tabindex', '-1');
  }
}
// Если чекбоксы и кнопка присутствуют — вешаем обработчики
if (checkbox1 && checkbox2 && btn) {
  checkbox1.addEventListener('change', toggleButtonState);
  checkbox2.addEventListener('change', toggleButtonState);
  toggleButtonState();
  // Не даём кликать по неактивной кнопке
  btn.addEventListener('click', function (e) {
    if (btn.classList.contains('disabled')) e.preventDefault();
  });
}

function openEsimPopup() {
  popupOverlay.style.display = 'flex';
  popup.style.display = 'flex';
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
}

function closeEsimPopup() {
  popupOverlay.style.display = 'none';
  popup.style.display = 'none';
  document.body.classList.remove('no-scroll');
  document.documentElement.classList.remove('no-scroll');
}

document.querySelectorAll('.close-popup-on-anchor').forEach(link => {
  link.addEventListener('click', function () {
    closeEsimPopup();
    // Без setTimeout якорь не всегда срабатывает, если попап оверлеем закрывает страницу
    setTimeout(() => {
      location.hash = this.getAttribute('href');
    }, 20);
  });
});



