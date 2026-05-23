const products = [
  {id:1,name:'Farm Eggs (dozen)',price:'$4.50',category:'eggs'},
  {id:2,name:'Whole Milk (1L)',price:'$3.25',category:'animals'},
  {id:3,name:'Heirloom Tomatoes (lb)',price:'$2.75',category:'produce'},
  {id:4,name:'Raw Honey (12oz)',price:'$9.00',category:'produce'},
  {id:5,name:'Mixed Vegetables (box)',price:'$12.00',category:'produce'},
  {id:6,name:'Handmade Soap',price:'$6.00',category:'arts'}
];

const productsEl = document.getElementById('products');
const searchEl = document.getElementById('search');
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
let activeCategory = 'all';

function render(list){
  productsEl.innerHTML = '';
  if(!list.length){
    productsEl.innerHTML = '<p>No products match your search.</p>';
    return;
  }
  list.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    // For small devices make cards full width with a comfortable image height.
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
      // random width between 180 and 340px, random image height between 80 and 220px
      const w = Math.floor(Math.random() * (340 - 180 + 1)) + 180;
      const h = Math.floor(Math.random() * (220 - 80 + 1)) + 80;
      card.style.width = w + 'px';
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

function applyFilters(){
  const q = searchEl.value.trim().toLowerCase();
  let list = products.slice();
  if(activeCategory !== 'all') list = list.filter(p=>p.category === activeCategory);
  if(q) list = list.filter(p=> (p.name + ' ' + p.desc + ' ' + (p.category||'')).toLowerCase().includes(q));
  render(list);
}

filterBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    filterBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    activeCategory = b.dataset.cat;
    applyFilters();
  });
});

searchEl.addEventListener('input', ()=>{ applyFilters(); });

// initialize
render(products);
