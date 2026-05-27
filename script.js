const products = [
  {id:1,name:'Farm Eggs (dozen)',price:'$4.50',category:'eggs'},
  {id:2,name:'Whole Milk (1L)',price:'$3.25',category:'animals'},
  {id:3,name:'Handmade Soap',price:'$6.00',category:'arts'}
];

const productsEl = document.getElementById('products');
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
let activeCategory = 'all';

const themes = [
  {accent:'#2b8a3e',bg:'#f5f9f1',card:'#ffffff',text:'#20372e',muted:'#5a6b58',bodyFont:'Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif',headingFont:'Georgia,serif'},
  {accent:'#c1593c',bg:'#fff8f2',card:'#fffefc',text:'#3f2215',muted:'#7a5f50',bodyFont:'Roboto,system-ui,Segoe UI,Arial,sans-serif',headingFont:'"Playfair Display",Georgia,serif'},
  {accent:'#3b5fa3',bg:'#f3f7ff',card:'#ffffff',text:'#1f324f',muted:'#566b8a',bodyFont:'"Open Sans",system-ui,Segoe UI,Roboto,Arial,sans-serif',headingFont:'"Montserrat",sans-serif'},
  {accent:'#8a3ca1',bg:'#faf4ff',card:'#ffffff',text:'#3e2a4d',muted:'#7c6590',bodyFont:'"Poppins",system-ui,Segoe UI,Roboto,Arial,sans-serif',headingFont:'"Merriweather",serif'}
];

function applyTheme() {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--accent', theme.accent);
  rootStyle.setProperty('--bg', theme.bg);
  rootStyle.setProperty('--card', theme.card);
  rootStyle.setProperty('--text-color', theme.text);
  rootStyle.setProperty('--muted', theme.muted);
  rootStyle.setProperty('--body-font', theme.bodyFont);
  rootStyle.setProperty('--heading-font', theme.headingFont);
}

function render(list) {
  productsEl.innerHTML = '';
  if (!list.length) {
    productsEl.innerHTML = '<p>No products match your search.</p>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';

    if (window.innerWidth <= 600) {
      card.style.width = '100%';
      const h = 120;
      card.innerHTML = `
        <div class="product-image" style="height:${h}px">${p.name.split(' ')[0]}</div>
        <h4 class="product-title">${p.name}</h4>
        <div class="product-meta">
          <div class="price">${p.price}</div>
          <a class="btn" href="mailto:info@threesprings.example?subject=Order%20request%20for%20${encodeURIComponent(p.name)}&body=Hi,%0A%0AI'd%20like%20to%20order%20%3A%20${encodeURIComponent(p.name)}.%0AQuantity:%20%0APickup%20or%20Delivery:%20%0A%0AThanks,">Buy</a>
        </div>
      `;
    } else {
      const w = Math.floor(Math.random() * (340 - 180 + 1)) + 180;
      const h = Math.floor(Math.random() * (220 - 80 + 1)) + 80;
      card.style.width = `${w}px`;
      card.innerHTML = `
        <div class="product-image" style="height:${h}px">${p.name.split(' ')[0]}</div>
        <h4 class="product-title">${p.name}</h4>
        <div class="product-meta">
          <div class="price">${p.price}</div>
          <a class="btn" href="mailto:info@threesprings.example?subject=Order%20request%20for%20${encodeURIComponent(p.name)}&body=Hi,%0A%0AI'd%20like%20to%20order%20%3A%20${encodeURIComponent(p.name)}.%0AQuantity:%20%0APickup%20or%20Delivery:%20%0A%0AThanks,">Buy</a>
        </div>
      `;
    }

    productsEl.appendChild(card);
  });
}

function applyFilters() {
  let list = products.slice();
  if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
  render(list);
}

filterBtns.forEach(b => {
  b.addEventListener('click', () => {
    filterBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    activeCategory = b.dataset.cat;
    applyFilters();
  });
});

applyTheme();
applyFilters();
