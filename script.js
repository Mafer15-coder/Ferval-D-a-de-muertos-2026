const data = window.FERVAL_DATA;
const grid = document.querySelector('#productGrid');
const individualGrid = document.querySelector('#individualGrid');

function cardTemplate(p, i) {
  return `<article class="product-card" data-index="${i}" tabindex="0"><img src="${p.image}" alt="${p.title}" loading="lazy"><div class="product-card__content"><span class="product-card__tag">${p.tag}</span><h3>${p.title}</h3><div class="product-card__bottom"><p>${p.short}</p><span class="price">${p.price}</span></div></div></article>`;
}

grid.innerHTML = data.products.map(cardTemplate).join('');
individualGrid.innerHTML = data.individuals.map(([name, price]) => `<div class="individual-item"><span>${name}</span><strong>${price}</strong></div>`).join('');

const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modalImg');
const modalTag = document.querySelector('#modalTag');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const modalIncludes = document.querySelector('#modalIncludes');
const modalPrice = document.querySelector('#modalPrice');

function openModal(index) {
  const p = data.products[index];
  modalImg.src = p.image;
  modalImg.alt = p.title;
  modalTag.textContent = p.tag;
  modalTitle.textContent = p.title;
  modalText.textContent = p.text;
  modalIncludes.textContent = p.includes;
  modalPrice.textContent = p.price;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.index));
  card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(card.dataset.index); });
});

document.querySelector('.modal__close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const whatsappBtn = document.querySelector('#whatsappBtn');
const message = encodeURIComponent('Hola Ferval, quiero hacer un pedido de la colección Donde viven los recuerdos 2026. ¿Me ayudas a confirmar disponibilidad, personalización y entrega?');
whatsappBtn.href = `https://wa.me/${data.whatsapp}?text=${message}`;
