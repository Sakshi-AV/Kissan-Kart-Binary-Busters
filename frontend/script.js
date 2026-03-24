
// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────
const farmers = [
  { id: 1, name: "Ravi Kumar", location: "Tumkur, Karnataka", icon: "🧑‍🌾", color: "#4A7C59", speciality: "Organic Vegetables", rating: 4.9, products: 18, sales: 1240, bio: "3rd-generation farmer specializing in chemical-free vegetables. All crops grown with traditional Nati methods." },
  { id: 2, name: "Sunita Devi", location: "Kolar, Karnataka", icon: "👩‍🌾", color: "#C0392B", speciality: "Seasonal Fruits", rating: 4.8, products: 12, sales: 890, bio: "Sunita runs a 10-acre orchard focused on heirloom fruit varieties and zero-waste farming." },
  { id: 3, name: "Mohan Patel", location: "Dharwad, Karnataka", icon: "🧑‍🌾", color: "#5C3D2E", speciality: "Grains & Pulses", rating: 4.7, products: 9, sales: 630, bio: "Known for Jowar and Ragi grown on black cotton soil, the way his ancestors did for centuries." },
  { id: 4, name: "Lakshmi Rao", location: "Hassan, Karnataka", icon: "👩‍🌾", color: "#7FB3C8", speciality: "Dairy & Herbs", rating: 4.9, products: 6, sales: 980, bio: "Produces A2 milk from indigenous Malnad Gidda cows. Also grows medicinal herbs and spices." },
];

const products = [
  { id: 1, name: "Organic Tomatoes", emoji: "🍅", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop", farmerId: 1, price: 35, oldPrice: 60, unit: "kg", category: "vegetables", organic: true, discount: "42% off", rating: 4.8, reviews: 128, location: "Tumkur", desc: "Sun-ripened, hand-picked tomatoes grown without any chemical pesticides. Rich in lycopene and natural sweetness that supermarket tomatoes can't match.", harvestDate: "Today", stock: "Available", delivery: "Same Day" },
  { id: 2, name: "Alphonso Mangoes", emoji: "🥭", img: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400&h=300&fit=crop", farmerId: 2, price: 180, oldPrice: 280, unit: "kg", category: "fruits", organic: false, discount: "36% off", rating: 4.9, reviews: 87, location: "Kolar", desc: "Authentic Alphonso variety harvested at peak ripeness. Sweet, aromatic, and absolutely nothing like the artificially ripened ones in stores.", harvestDate: "Yesterday", stock: "Limited", delivery: "Next Day" },
  { id: 3, name: "Finger Millet (Ragi)", emoji: "🌾", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", farmerId: 3, price: 55, oldPrice: 90, unit: "kg", category: "grains", organic: true, discount: "39% off", rating: 4.7, reviews: 64, location: "Dharwad", desc: "Stone-ground Ragi from organic fields. Naturally high in calcium and iron — a traditional superfood.", harvestDate: "3 days ago", stock: "Available", delivery: "2 Days" },
  { id: 4, name: "A2 Cow Milk", emoji: "🥛", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop", farmerId: 4, price: 70, oldPrice: 95, unit: "litre", category: "dairy", organic: true, discount: "26% off", rating: 4.9, reviews: 203, location: "Hassan", desc: "Pure A2 beta-casein milk from Malnad Gidda cows. Unhomogenized, lightly pasteurized, and delivered fresh each morning.", harvestDate: "Today", stock: "Available", delivery: "Morning" },
  { id: 5, name: "Fresh Spinach", emoji: "🥬", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop", farmerId: 1, price: 20, oldPrice: 40, unit: "bunch", category: "vegetables", organic: true, discount: "50% off", rating: 4.6, reviews: 94, location: "Tumkur", desc: "Freshly harvested baby spinach with crisp leaves. Grown in raised beds with rainwater harvesting.", harvestDate: "Today", stock: "Available", delivery: "Same Day" },
  { id: 6, name: "Papaya", emoji: "🍈", img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=300&fit=crop", farmerId: 2, price: 40, oldPrice: 70, unit: "kg", category: "fruits", organic: false, discount: "43% off", rating: 4.5, reviews: 52, location: "Kolar", desc: "Tree-ripened papaya, sweet and buttery. Rich in papain enzymes. Picked only when fully mature.", harvestDate: "Today", stock: "Available", delivery: "Next Day" },
];

const reviews = [
  { name: "Priya S.", product: "Organic Tomatoes", stars: 5, text: "Finally tomatoes that taste like tomatoes! The difference from supermarket ones is night and day. Will order every week.", color: "#4A7C59" },
  { name: "Vikram N.", product: "A2 Cow Milk", stars: 5, text: "My children refuse to drink regular milk now. Richer, creamier, and you can taste the difference. Ravi's packaging is also zero plastic!", color: "#C0392B" },
  { name: "Ananya M.", product: "Alphonso Mangoes", stars: 5, text: "Sunita's mangoes are ridiculous. Sweet, fragrant, and the price is unbelievably fair. Buying 5 kg next time.", color: "#7FB3C8" },
  { name: "Suresh K.", product: "Ragi", stars: 4, text: "Great quality ragi, makes the softest mudde. Love that I know exactly which farm it came from.", color: "#5C3D2E" },
  { name: "Deepa R.", product: "Spinach", stars: 5, text: "The spinach stays fresh for 4 days in the fridge. I've never seen that with store-bought. Clearly freshly picked.", color: "#E8A020" },
  { name: "Arjun T.", product: "Moringa Leaves", stars: 5, text: "Ordered for the first time, got delivery the same day. Leaves were so fresh they were still slightly warm from the sun.", color: "#4A7C59" },
];

const compareData = [
  { item: "🍅 Tomatoes (1 kg)", farmlink: "₹35", market: "₹60", save: "₹25 (42%)" },
  { item: "🥭 Mangoes (1 kg)", farmlink: "₹180", market: "₹280", save: "₹100 (36%)" },
  { item: "🌾 Ragi (1 kg)", farmlink: "₹55", market: "₹90", save: "₹35 (39%)" },
  { item: "🥛 A2 Milk (1 L)", farmlink: "₹70", market: "₹95", save: "₹25 (26%)" },
  { item: "🥬 Spinach (bunch)", farmlink: "₹20", market: "₹40", save: "₹20 (50%)" },
  { item: "🍈 Papaya (1 kg)", farmlink: "₹40", market: "₹70", save: "₹30 (43%)" },
];

const timelineSteps = [
  { title: "Order Confirmed", time: "8:14 AM", desc: "Payment received. Ravi Kumar notified to begin harvest.", done: true, icon: "✅" },
  { title: "Farmer Harvesting", time: "9:30 AM", desc: "Ravi picked 2 kg tomatoes, spinach, and moringa — all fresh from the field.", done: true, icon: "🌾" },
  { title: "Quality Check & Packing", time: "11:00 AM", desc: "Produce inspected by FarmLink quality team. Packed in biodegradable bags.", done: true, icon: "📦" },
  { title: "Picked Up by Driver", time: "12:45 PM", desc: "Suresh Nayak collected your order from Tumkur. All items temperature-safe.", done: true, icon: "🏍" },
  { title: "Out for Delivery", time: "1:15 PM", desc: "Your order is 14 km away. Suresh is on route via Tumkur–Bengaluru highway.", active: true, icon: "🚛" },
  { title: "Delivered", time: "~4:30 PM", desc: "You'll receive an OTP confirmation on delivery.", icon: "🏠" },
];

// ─── RENDER TRACKING ───
async function renderTracking() {
  renderTimeline();
  renderMap();
  startCountdown();
  animateSpeed();
  // Poll live location every 5s
  setInterval(() => fetchTrack(), 5000);
  fetchTrack(); // Initial
}

async function changeLang(lang) {
  try {
    localStorage.setLang = lang;
    const res = await fetch(`http://localhost:5500/api/lang/${lang}`);
    const data = await res.json();

    // Update ALL translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (data[key]) el.innerHTML = data[key];
    });

    // Nav buttons
    document.querySelectorAll('nav button').forEach(btn => {
      const key = btn.textContent.toLowerCase().replace(/ /g, '');
      if (data[key]) btn.textContent = data[key];
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(btn => {
      const text = btn.textContent.trim();
      const key = text.toLowerCase().replace(/ /g, '').replace(/🥦|🍎|🌾|🥛|🌿/g, '');
      if (data[key]) btn.innerHTML = data[key];
    });

    // Section titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
      const text = title.textContent.toLowerCase();
      if (text.includes('harvest')) title.innerHTML = data.todaysHarvest || title.innerHTML;
      if (text.includes('farmers')) title.innerHTML = data.meetOurFarmers || title.innerHTML;
    });

    // Hero
    document.querySelector('.hero h1').innerHTML = data.heroTitle || '';
    document.querySelector('.hero p').textContent = data.heroSub || '';

    // Hero buttons
    document.querySelector('.btn-primary').textContent = data.shopNow || '';
    document.querySelector('.btn-outline').textContent = data.meetFarmers || '';

    // Cart
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) cartBtn.firstChild.textContent = data.cart || 'Cart';

    showToast("🌍 Language changed to " + lang.toUpperCase());
  } catch (err) {
    console.log(err);
  }
}

function toggleLangMenu() {
  document.querySelector('.lang-dropdown').classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-dropdown')) {
    document.querySelector('.lang-dropdown')?.classList.remove('active');
  }
});

function currentLangText(text) {
  document.getElementById('currentLang').textContent = text.split(' ')[1];
  document.querySelector('.lang-dropdown').classList.remove('active');
}

// Init lang
window.addEventListener('load', () => {
  const savedLang = localStorage.getLang || 'en';
  currentLangText('🇮🇳 ' + savedLang.toUpperCase());
  changeLang(savedLang);
});

async function fetchTrack(orderId = 'FL-2847') {
  try {
    const res = await fetch(`http://localhost:5500/api/track/${orderId}`);
    const data = await res.json();
    // Update map, ETA, speed (mock impl - extend as needed)
    document.getElementById('liveSpeed').textContent = data.speed + ' km/h';
    console.log('Live track:', data);
  } catch (err) {
    console.log('Track error:', err);
  }
}


async function payNow(amount) {
  const res = await fetch("/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  const data = await res.json();

  const options = {
    key: "rzp_test_4vAu6m8oq1E4z6",
    amount: data.amount,
    currency: "INR",
    name: "FarmLink",
    description: "Fresh Farm Produce",
    order_id: data.id,

    handler: async function (response) {
      const verifyRes = await fetch("/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
      const verifyData = await verifyRes.json();
      alert("Payment Successful! Order ID: " + verifyData.paymentId);
    },

    theme: {
      color: "#4A7C59",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

function renderTimeline() {
  document.getElementById('timelineSteps').innerHTML = timelineSteps.map(s => {
    const cls = s.done ? 'done' : s.active ? 'active' : 'pending';
    return `
      <div class="tl-step ${cls}">
        <div class="tl-dot">${s.done ? '✓' : s.active ? s.icon : s.icon}</div>
        <div class="tl-content">
          <div class="tl-row">
            <div class="tl-step-title">${s.title}</div>
            <div class="tl-time">${s.time}</div>
          </div>
          <div class="tl-desc">${s.desc}</div>
        </div>
      </div>`;
  }).join('');
}

function renderMap() {
  const canvas = document.getElementById('mapCanvas');
  if (!canvas) return;
  // Real OpenStreetMap embed: bounding box covers Tumkur → Bengaluru route
  // Markers: Tumkur (13.3409,77.1009) = farm origin, Bengaluru (12.9716,77.5946) = destination
  canvas.innerHTML = `
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=76.9%2C12.85%2C77.7%2C13.45&layer=mapnik&marker=13.3409%2C77.1009"
      style="width:100%;height:100%;border:none;"
      allowfullscreen
      loading="lazy"
      title="Delivery route map from Tumkur to Bengaluru"
    ></iframe>`;
}

function startCountdown() {
  const el = document.getElementById('etaCountdown');
  if (!el) return;
  // Target: ~2h 18m from now (simulated)
  let totalSecs = 2 * 3600 + 18 * 60 + 40;
  function tick() {
    if (totalSecs <= 0) { el.innerHTML = `<div style="color:var(--harvest);font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;">Arriving now!</div>`; return; }
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    el.innerHTML = `
      <div class="countdown-block"><div class="countdown-val">${String(h).padStart(2,'0')}</div><div class="countdown-lbl">hrs</div></div>
      <div class="countdown-block"><div class="countdown-val">${String(m).padStart(2,'0')}</div><div class="countdown-lbl">min</div></div>
      <div class="countdown-block"><div class="countdown-val">${String(s).padStart(2,'0')}</div><div class="countdown-lbl">sec</div></div>`;
    totalSecs--;
  }
  tick();
  setInterval(tick, 1000);
}

function animateSpeed() {
  const speeds = [28, 31, 35, 32, 30, 33, 36, 34, 29, 32];
  let i = 0;
  setInterval(() => {
    const el = document.getElementById('liveSpeed');
    if (el) el.textContent = speeds[i % speeds.length] + ' km/h';
    i++;
  }, 2800);
}

// ──────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────
let cart = [];
let activeFilter = 'all';

// ──────────────────────────────────────────────
// RENDER
// ──────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map(p => {
    const farmer = farmers.find(f => f.id === p.farmerId);
    return `
      <div class="product-card" onclick="openModal(${p.id})">
        <div class="product-img" style="background:${farmer.color}18;padding:0;overflow:hidden;">
          ${p.organic ? `<span class="organic-badge">Organic</span>` : ''}
          ${p.discount ? `<span class="discount-badge">${p.discount}</span>` : ''}
          <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none';this.parentNode.style.fontSize='4rem';this.parentNode.innerHTML+='${p.emoji}'"/>
        </div>
        <div class="product-body">
          <div class="farmer-meta">
            <div class="farmer-avatar" style="background:${farmer.color};">${farmer.name.split(' ').map(n=>n[0]).join('')}</div>
            <span class="farmer-name">${farmer.name}</span>
          </div>
          <div class="product-name">${p.name}</div>
          <div class="product-location">${p.location}</div>
          <div class="product-footer">
            <div class="price-block">
              <span class="price-current">₹${p.price}</span>
              <span class="price-old">₹${p.oldPrice}</span>
              <span class="price-unit">per ${p.unit}</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
              <div class="stars">⭐ ${p.rating} <span>(${p.reviews})</span></div>
              <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id})">+</button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderFarmers() {
  document.getElementById('farmerGrid').innerHTML = farmers.map(f => `
    <div class="farmer-card">
      <div class="farmer-card-top">
        <div class="farmer-icon" style="background:${f.color}18;font-size:1.8rem;">${f.icon}</div>
        <div>
          <div class="farmer-card-name">${f.name}</div>
          <div class="farmer-card-loc">📍 ${f.location}</div>
        </div>
      </div>
      <div class="farmer-card-bio">${f.bio}</div>
      <div class="farmer-card-footer">
        <div class="farmer-stat"><div class="farmer-stat-val">⭐ ${f.rating}</div><div class="farmer-stat-lbl">Rating</div></div>
        <div class="farmer-stat"><div class="farmer-stat-val">${f.products}</div><div class="farmer-stat-lbl">Products</div></div>
        <div class="farmer-stat"><div class="farmer-stat-val">${f.sales}</div><div class="farmer-stat-lbl">Orders</div></div>
        <div class="farmer-stat"><div class="farmer-stat-val">${f.speciality.split(' ')[0]}</div><div class="farmer-stat-lbl">Specialty</div></div>
      </div>
    </div>
  `).join('');
}

function renderReviews() {
  document.getElementById('reviewGrid').innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-top">
        <div class="review-avatar" style="background:${r.color};">${r.name[0]}</div>
        <div>
          <div class="reviewer-name">${r.name}</div>
          <div class="review-product">on ${r.product}</div>
          <div class="stars" style="margin-top:4px;">${'⭐'.repeat(r.stars)}</div>
        </div>
      </div>
      <div class="review-text">"${r.text}"</div>
    </div>
  `).join('');
}

function renderCompare() {
  document.getElementById('compareTable').innerHTML = compareData.map(r => `
    <div class="compare-row">
      <div class="compare-cell">${r.item}</div>
      <div class="compare-cell compare-best">${r.farmlink}</div>
      <div class="compare-cell">${r.market}</div>
      <div class="compare-cell compare-best">${r.save}</div>
    </div>
  `).join('');
}



// ──────────────────────────────────────────────
// FILTER & SEARCH
// ──────────────────────────────────────────────
function setFilter(cat, el) {
  activeFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyFilter();
}

function filterProducts(query) {
  applyFilter(query);
}

function applyFilter(query = '') {
  let list = products;
  if (activeFilter !== 'all') {
    if (activeFilter === 'organic') list = list.filter(p => p.organic);
    else list = list.filter(p => p.category === activeFilter);
  }
  if (query) list = list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  renderProducts(list);
}

// ──────────────────────────────────────────────
// CART
// ──────────────────────────────────────────────
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  showToast(`${p.emoji} ${p.name} added to basket!`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
  renderCartBody();
}

function renderCartBody() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🧺</div><div>Your basket is empty</div><div style="font-size:0.78rem;margin-top:6px;color:#bbb;">Add fresh produce to get started</div></div>`;
    footer.innerHTML = '';
    return;
  }
  body.innerHTML = cart.map(i => `
    <div class="cart-item">
      <div class="cart-item-icon">${i.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-farmer">from ${farmers.find(f=>f.id===i.farmerId).name}</div>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${i.id},-1)">−</button>
          <span class="qty-val">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i.id},1)">+</button>
        </div>
      </div>
      <div>
        <div class="cart-item-price">₹${i.price * i.qty}</div>
        <div style="font-size:0.7rem;color:#bbb;margin-top:2px;">₹${i.price}/${i.unit}</div>
      </div>
    </div>
  `).join('');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  footer.innerHTML = `
    <div class="cart-total-row">
      <span class="cart-total-lbl">Subtotal</span>
      <span class="cart-total-val">₹${subtotal}</span>
    </div>
    <div style="font-size:0.75rem;color:#aaa;text-align:right;margin-bottom:14px;">+ Free delivery on orders above ₹300</div>
    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout →</button>
  `;
}

function toggleCart() {
  const el = document.getElementById('cartOverlay');
  el.classList.toggle('open');
  renderCartBody();
}

function checkout() {
  cart = [];
  updateCartUI();
  toggleCart();
  showToast('🎉 Order placed! Farmer notified.');
  setTimeout(() => { showPage('tracking'); }, 1200);
}

async function checkout() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const cod = confirm('Pay with Razorpay or Cash on Delivery (COD)?');
  if (cod === false) {
    // Cash on Delivery
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total, payment: 'COD' })
    });
    cart = [];
    updateCartUI();
    toggleCart();
    showToast('✅ COD Order placed! Delivery partner notified.');
    showPage('tracking');
    return;
  }

  try {
    // Razorpay flow
    const orderRes = await fetch('/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total })
    });
    const orderData = await orderRes.json();

    const options = {
      key: "rzp_test_4vAu6m8oq1E4z6",
      amount: orderData.amount,
      currency: "INR",
      name: "FarmLink",
      description: "Fresh Farm Produce",
      order_id: orderData.id,
      handler: async function (response) {
        const verifyRes = await fetch('/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response)
        });
        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart, total, payment: 'Razorpay' })
          });
          cart = [];
          updateCartUI();
          toggleCart();
          showToast('✅ Payment Success! Order confirmed.');
          showPage('tracking');
        }
      },
      theme: { color: "#4A7C59" }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Checkout error:', err);
    showToast('Payment failed - try COD');
  }
}
// ──────────────────────────────────────────────
// MODAL
// ──────────────────────────────────────────────
function openModal(id) {
  const p = products.find(x => x.id === id);
  const farmer = farmers.find(f => f.id === p.farmerId);
  const hero = document.getElementById('modalHero');
  document.getElementById('modalEmoji').textContent = '';
  hero.style.background = `${farmer.color}22`;
  hero.style.backgroundImage = `url('${p.img}')`;
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center';
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-name">${p.name}</div>
    <div class="modal-farmer">🧑‍🌾 ${farmer.name} · ${p.location}</div>
    <div class="modal-desc">${p.desc}</div>
    <div class="modal-specs">
      <div class="spec-item"><div class="spec-lbl">Harvested</div><div class="spec-val">${p.harvestDate}</div></div>
      <div class="spec-item"><div class="spec-lbl">Stock</div><div class="spec-val">${p.stock}</div></div>
      <div class="spec-item"><div class="spec-lbl">Delivery</div><div class="spec-val">${p.delivery}</div></div>
      <div class="spec-item"><div class="spec-lbl">Type</div><div class="spec-val">${p.organic ? '🌿 Organic' : 'Conventional'}</div></div>
    </div>
    <div class="modal-footer">
      <div>
        <div class="modal-price">₹${p.price} <span class="modal-price-unit">/ ${p.unit}</span></div>
        <div style="font-size:0.75rem;color:var(--red-tomato);font-weight:600;">MRP ₹${p.oldPrice} · You save ${p.discount}</div>
      </div>
      <button class="btn-primary" onclick="addToCart(${p.id});closeModal();">Add to Basket 🛒</button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');

  if (name === 'farmer-dashboard') renderFarmerDashboard();
  if (name === 'customer-dashboard') renderCustomerDashboard();

  document.querySelectorAll('nav button:not(.cart-btn)').forEach(b => b.classList.remove('active'));

  window.scrollTo(0,0);
}
function renderFarmerDashboard() {
  const farmerId = 1;

  const myProducts = products.filter(p => p.farmerId === farmerId);

  document.getElementById('farmerProductList').innerHTML = myProducts.map(p => `
    <div class="cart-item">
      <div>${p.emoji}</div>
      <div class="cart-item-info">
        <div>${p.name}</div>
        <div style="font-size:0.8rem;color:#888;">₹${p.price}/${p.unit}</div>
      </div>
      <button onclick="deleteProduct(${p.id})">❌</button>
    </div>
  `).join('');
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    renderProducts(products);
    renderFarmerDashboard();
    showToast('❌ Product removed');
  }
}

async function renderCustomerDashboard() {
  try {
    const res = await fetch('/api/orders');
    const orders = await res.json();
    document.getElementById('customerOrders').innerHTML = orders.map(o => `
      <div class="cart-item">
        <div>📦</div>
        <div class="cart-item-info">
          <div>${o.id}</div>
          <div style="font-size:0.8rem;color:#888;">${o.items.map(i=>i.emoji + ' ' + i.name).join(', ')}</div>
          <div style="font-size:0.8rem;color:#888;">Status: ${o.status}</div>
        </div>
        <div>₹${o.total}</div>
      </div>
    `).join('') || '<div>No orders yet</div>';
  } catch (err) {
    document.getElementById('customerOrders').innerHTML = '<div>Loading orders...</div>';
  }
}
// ──────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2500);
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
renderProducts(products);
renderFarmers();
renderReviews();
renderCompare();
renderTracking();

