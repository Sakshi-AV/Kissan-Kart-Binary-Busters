const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Razorpay = require('razorpay');

const app = express();
const PORT = 5500;

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));
app.use(bodyParser.json());
app.use(express.static('../frontend')); // Serve frontend files

// ─────────────────────────────
// IN-MEMORY DATA (matching frontend mocks)
// ─────────────────────────────
let farmers = [
  { id: 1, name: "Ravi Kumar", location: "Tumkur, Karnataka", icon: "🧑‍🌾", color: "#4A7C59", speciality: "Organic Vegetables", rating: 4.9, products: 18, sales: 1240, bio: "3rd-generation farmer specializing in chemical-free vegetables. All crops grown with traditional Nati methods." },
  { id: 2, name: "Sunita Devi", location: "Kolar, Karnataka", icon: "👩‍🌾", color: "#C0392B", speciality: "Seasonal Fruits", rating: 4.8, products: 12, sales: 890, bio: "Sunita runs a 10-acre orchard focused on heirloom fruit varieties and zero-waste farming." },
  { id: 3, name: "Mohan Patel", location: "Dharwad, Karnataka", icon: "🧑‍🌾", color: "#5C3D2E", speciality: "Grains & Pulses", rating: 4.7, products: 9, sales: 630, bio: "Known for Jowar and Ragi grown on black cotton soil, the way his ancestors did for centuries." },
  { id: 4, name: "Lakshmi Rao", location: "Hassan, Karnataka", icon: "👩‍🌾", color: "#7FB3C8", speciality: "Dairy & Herbs", rating: 4.9, products: 6, sales: 980, bio: "Produces A2 milk from indigenous Malnad Gidda cows. Also grows medicinal herbs and spices." },
];

let products = [
  { id: 1, name: "Organic Tomatoes", emoji: "🍅", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop", farmerId: 1, price: 35, oldPrice: 60, unit: "kg", category: "vegetables", organic: true, discount: "42% off", rating: 4.8, reviews: 128, location: "Tumkur", desc: "Sun-ripened, hand-picked tomatoes grown without any chemical pesticides. Rich in lycopene and natural sweetness that supermarket tomatoes can't match.", harvestDate: "Today", stock: "Available", delivery: "Same Day" },
  { id: 2, name: "Alphonso Mangoes", emoji: "🥭", img: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=400&h=300&fit=crop", farmerId: 2, price: 180, oldPrice: 280, unit: "kg", category: "fruits", organic: false, discount: "36% off", rating: 4.9, reviews: 87, location: "Kolar", desc: "Authentic Alphonso variety harvested at peak ripeness. Sweet, aromatic, and absolutely nothing like the artificially ripened ones in stores.", harvestDate: "Yesterday", stock: "Limited", delivery: "Next Day" },
  { id: 3, name: "Finger Millet (Ragi)", emoji: "🌾", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", farmerId: 3, price: 55, oldPrice: 90, unit: "kg", category: "grains", organic: true, discount: "39% off", rating: 4.7, reviews: 64, location: "Dharwad", desc: "Stone-ground Ragi from organic fields. Naturally high in calcium and iron — a traditional superfood.", harvestDate: "3 days ago", stock: "Available", delivery: "2 Days" },
  { id: 4, name: "A2 Cow Milk", emoji: "🥛", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop", farmerId: 4, price: 70, oldPrice: 95, unit: "litre", category: "dairy", organic: true, discount: "26% off", rating: 4.9, reviews: 203, location: "Hassan", desc: "Pure A2 beta-casein milk from Malnad Gidda cows. Unhomogenized, lightly pasteurized, and delivered fresh each morning.", harvestDate: "Today", stock: "Available", delivery: "Morning" },
  { id: 5, name: "Fresh Spinach", emoji: "🥬", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop", farmerId: 1, price: 20, oldPrice: 40, unit: "bunch", category: "vegetables", organic: true, discount: "50% off", rating: 4.6, reviews: 94, location: "Tumkur", desc: "Freshly harvested baby spinach with crisp leaves. Grown in raised beds with rainwater harvesting.", harvestDate: "Today", stock: "Available", delivery: "Same Day" },
  { id: 6, name: "Papaya", emoji: "🍈", img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=400&h=300&fit=crop", farmerId: 2, price: 40, oldPrice: 70, unit: "kg", category: "fruits", organic: false, discount: "43% off", rating: 4.5, reviews: 52, location: "Kolar", desc: "Tree-ripened papaya, sweet and buttery. Rich in papain enzymes. Picked only when fully mature.", harvestDate: "Today", stock: "Available", delivery: "Next Day" },
];

let reviews = [
  { name: "Priya S.", product: "Organic Tomatoes", stars: 5, text: "Finally tomatoes that taste like tomatoes! The difference from supermarket ones is night and day. Will order every week.", color: "#4A7C59" },
  { name: "Vikram N.", product: "A2 Cow Milk", stars: 5, text: "My children refuse to drink regular milk now. Richer, creamier, and you can taste the difference. Ravi's packaging is also zero plastic!", color: "#C0392B" },
  { name: "Ananya M.", product: "Alphonso Mangoes", stars: 5, text: "Sunita's mangoes are ridiculous. Sweet, fragrant, and the price is unbelievably fair. Buying 5 kg next time.", color: "#7FB3C8" },
  { name: "Suresh K.", product: "Ragi", stars: 4, text: "Great quality ragi, makes the softest mudde. Love that I know exactly which farm it came from.", color: "#5C3D2E" },
  { name: "Deepa R.", product: "Spinach", stars: 5, text: "The spinach stays fresh for 4 days in the fridge. I've never seen that with store-bought. Clearly freshly picked.", color: "#E8A020" },
  { name: "Arjun T.", product: "Moringa Leaves", stars: 5, text: "Ordered for the first time, got delivery the same day. Leaves were so fresh they were still slightly warm from the sun.", color: "#4A7C59" },
];

let orders = [];

// Razorpay instance (TEST - REPLACE WITH YOUR KEYS)
const rzp = new Razorpay({
  key_id: 'rzp_test_4vAu6m8oq1E4z6',
  key_secret: 'test_secret_placeholder' // TEST MODE - bypass verification below
});

// ─────────────────────────────
// API ROUTES
// ─────────────────────────────

// Serve index.html as root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Products
app.get('/api/products', (req, res) => {
  let list = [...products];
  const { category, organic, search } = req.query;
  if (category && category !== 'all') list = list.filter(p => p.category === category);
  if (organic === 'true') list = list.filter(p => p.organic);
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json(list);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index > -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Farmers
app.get('/api/farmers', (req, res) => res.json(farmers));

// Reviews
app.get('/api/reviews', (req, res) => res.json(reviews));

// Orders
app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const { items, total, userId = 1, payment = 'Razorpay' } = req.body;
  const newOrder = {
    id: 'FL-' + Date.now(),
    items,
    total,
    payment,
    userId,
    status: 'placed',
    timestamp: new Date().toISOString()
  };
  orders.push(newOrder);
  console.log('New order:', newOrder);
  res.json({ message: 'Order created', order: newOrder });
});

// Comprehensive Language API (EN/HI/KN/MR)
app.get('/api/lang/:lang', (req, res) => {
  const langs = {
    en: {
      home: 'Home', farmers: 'Farmers', compare: 'Compare Prices', track: 'Track Order', cart: 'Cart', 
      farmerDash: 'Farmer Dashboard', customerDash: 'Customer Dashboard',
      heroTitle: 'Fresh from the field,<br>direct to you.', heroSub: 'FarmLink connects you directly with local farmers',
      shopNow: 'Shop Now →', meetFarmers: 'Meet the Farmers',
      todaysHarvest: "Today's Fresh Harvest", all: 'All', vegetables: 'Vegetables', fruits: 'Fruits', grains: 'Grains', 
      dairy: 'Dairy', organic: 'Organic Only', search: 'Search vegetables, fruits, grains…',
      customersSay: 'What customers say', meetOurFarmers: 'Meet Our Farmers',
      priceComparison: 'Price Comparison', farmLink: 'FarmLink', supermarket: 'Supermarket', youSave: 'You Save',
      liveTracking: 'Live Order Tracking', estimatedArrival: 'Estimated Arrival', deliveryPartner: 'Delivery Partner',
      callDriver: 'Call Driver', message: 'Message', vehicle: 'Vehicle', speed: 'Speed',
      orderSummary: 'Order Summary', totalOrders: 'Total Orders', totalEarnings: 'Total Earnings', activeProducts: 'Active Products',
      yourProducts: 'Your Products', orderHistory: 'Order History', totalSpent: 'Total Spent', saved: 'Saved',
      subtotal: 'Subtotal', proceedCheckout: 'Proceed to Checkout →', basket: 'Your Basket',
      addToBasket: 'Add to Basket 🛒'
    },
    hi: {
      home: 'होम', farmers: 'किसान', compare: 'मूल्य तुलना', track: 'ऑर्डर ट्रैक करें', cart: 'कार्ट', 
      farmerDash: 'किसान डैशबोर्ड', customerDash: 'ग्राहक डैशबोर्ड',
      heroTitle: 'खेत से सीधे,<br>आपके पास।', heroSub: 'फार्मलिंक आपको सीधे किसानों से जोड़ता है',
      shopNow: 'खरीदारी करें →', meetFarmers: 'मिलें किसानों से',
      todaysHarvest: 'आज का ताजा कटाई', all: 'सभी', vegetables: 'सब्जियां', fruits: 'फल', grains: 'अनाज', 
      dairy: 'डेयरी', organic: 'जैविक केवल', search: 'सब्जियां, फल, अनाज खोजें…',
      customersSay: 'ग्राहक क्या कहते हैं', meetOurFarmers: 'हमारे किसानों से मिलें',
      priceComparison: 'मूल्य तुलना', farmLink: 'फार्मलिंक', supermarket: 'सुपरमार्केट', youSave: 'आप बचाते हैं',
      liveTracking: 'लाइव ऑर्डर ट्रैकिंग', estimatedArrival: 'अनुमानित आगमन', deliveryPartner: 'डिलीवरी पार्टनर',
      callDriver: 'ड्राइवर को कॉल करें', message: 'संदेश', vehicle: 'वाहन', speed: 'गति',
      orderSummary: 'ऑर्डर सारांश', totalOrders: 'कुल ऑर्डर', totalEarnings: 'कुल कमाई', activeProducts: 'सक्रिय उत्पाद',
      yourProducts: 'आपके उत्पाद', orderHistory: 'ऑर्डर इतिहास', totalSpent: 'कुल खर्च', saved: 'बचत',
      subtotal: 'उपयोग', proceedCheckout: 'चेकआउट पर जाएं →', basket: 'आपकी टोकरी',
      addToBasket: 'टोकरी में डालें 🛒'
    },
    kn: {
      home: 'ಮುಖ್ಯಪುಟ', farmers: 'ಕಣ್ಣುಬರ', compare: 'ಬೆಲೆ ಹೋಲಿಕೆ', track: 'ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', cart: 'ಕಾರ್ಟ್', 
      farmerDash: 'ಕಣ್ಣುಬರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', customerDash: 'ಗ್ರಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      heroTitle: 'ಕ್ಷೇತ್ರದಿಂದ ನೇರವಾಗಿ,<br>ನಿಮ್ಮ ಬಳಿ.', heroSub: 'ಫಾರ್ಮ್‌ಲಿಂಕ್ ನಿಮ್ಮನ್ನು ನೇರವಾಗಿ ಸ್ಥಳೀಯ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ',
      shopNow: 'ಈಗ ಖರೀದಿಸಿ →', meetFarmers: 'ರೈತರನ್ನು ಭೇಟಿಯಾಗಿ',
      todaysHarvest: 'ಇಂದಿನ ಹೊಸ ಬೆಟ್ಟ', all: 'ಎಲ್ಲಾ', vegetables: 'ತರಕಾರಿ', fruits: 'ಹಣ್ಣುಗಳು', grains: 'ಧಾನ್ಯಗಳು', 
      dairy: 'ಹಾಲಿನ ಉತ್ಪನ್ನಗಳು', organic: 'ಜೈವಿಕ ಮಾತ್ರ', search: 'ತರಕಾರಿ, ಹಣ್ಣು, ಧಾನ್ಯಗಳನ್ನು ಹುಡುಕಿ…',
      customersSay: 'ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ', meetOurFarmers: 'ನಮ್ಮ ರೈತರನ್ನು ಭೇಟಿಯಾಗಿ',
      priceComparison: 'ಬೆಲೆ ಹೋಲಿಕೆ', farmLink: 'ಫಾರ್ಮ್‌ಲಿಂಕ್', supermarket: 'ಸೂಪರ್ ಮಾರ್ಕೆಟ್', youSave: 'ನೀವು ಉಳಿಸುತ್ತೀರಿ',
      liveTracking: 'ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್', estimatedArrival: 'ಅಂದಾಜು ಆಗಮನ', deliveryPartner: 'ಡೆಲಿವರಿ ಪಾಲುದಾರ',
      callDriver: 'ಡ್ರೈವರ್‌ಗೆ ಕರೆ ಮಾಡಿ', message: 'ಸಂದೇಶ', vehicle: 'ವಾಹನ', speed: 'ವೇಗ',
      orderSummary: 'ಆರ್ಡರ್ ಸಾರಾಂಶ', totalOrders: 'ಒಟ್ಟು ಆರ್ಡರ್‌ಗಳು', totalEarnings: 'ಒಟ್ಟು ಆದಾಯ', activeProducts: 'ಸಕ್ರಿಯ ಉತ್ಪನ್ನಗಳು',
      yourProducts: 'ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳು', orderHistory: 'ಆರ್ಡರ್ ಇತಿಹಾಸ', totalSpent: 'ಒಟ್ಟು ಖರ್ಚು', saved: 'ಸಂರಕ್ಷಿಸಿದ',
      subtotal: 'ಉಪಮೊತ್ತ', proceedCheckout: 'ಚೆಕ್‌ಔಟ್ ಮಾಡಿ →', basket: 'ನಿಮ್ಮ ಬ್ಯಾಸ್ಕೆಟ್',
      addToBasket: 'ಬ್ಯಾಸ್ಕೆಟ್‌ಗೆ ಸೇರಿಸಿ 🛒'
    },
    mr: {
      home: 'मुख्यपृष्ठ', farmers: 'शेतकरी', compare: 'किंमत तुलना', track: 'ऑर्डर ट्रॅक करा', cart: 'कार्ट', 
      farmerDash: 'शेतकरी डॅशबोर्ड', customerDash: 'ग्राहक डॅशबोर्ड',
      heroTitle: 'शेतातून थेट,<br>तुमच्यापर्यंत.', heroSub: 'फार्मलिंक तुम्हाला स्थानिक शेतकऱ्यांशी जोडते',
      shopNow: 'आता खरेदी करा →', meetFarmers: 'शेतकऱ्यांशी भेटा',
      todaysHarvest: 'आजची ताजी कापणी', all: 'सर्व', vegetables: 'भाज्या', fruits: 'फळे', grains: 'धान्य', 
      dairy: 'दुग्धजन्य', organic: 'सेंद्रिय फक्त', search: 'भाज्या, फळे, धान्य शोधा…',
      customersSay: 'ग्राहक काय म्हणतात', meetOurFarmers: 'आमच्या शेतकऱ्यांशी भेटा',
      priceComparison: 'किंमत तुलना', farmLink: 'फार्मलिंक', supermarket: 'सुपरमार्केट', youSave: 'तुम्ही वाचवाल',
      liveTracking: 'लाइव्ह ऑर्डर ट्रॅकिंग', estimatedArrival: 'अंदाजे पोहोच', deliveryPartner: 'वितरण भागीदार',
      callDriver: 'ड्रायव्हरला कॉल करा', message: 'मेसेज', vehicle: 'वाहन', speed: 'गती',
      orderSummary: 'ऑर्डर सारांश', totalOrders: 'एकूण ऑर्डर', totalEarnings: 'एकूण कमाई', activeProducts: 'सक्रिय उत्पादने',
      yourProducts: 'तुमची उत्पादने', orderHistory: 'ऑर्डर इतिहास', totalSpent: 'एकूण खर्च', saved: 'साठवले',
      subtotal: 'उपबॉट', proceedCheckout: 'चेकआउट करा →', basket: 'तुमची टोकरी',
      addToBasket: 'टोकरीत टाका 🛒'
    }
  };
  res.json(langs[req.params.lang] || langs.en);
});

// Track live location (mock real-time GPS)
app.get('/api/track/:orderId', (req, res) => {
  const mockTrack = {
    orderId: req.params.orderId,
    lat: 13.3409 + (Math.random() - 0.5) * 0.01,
    lng: 77.1009 + (Math.random() - 0.5) * 0.02,
    speed: Math.floor(25 + Math.random() * 15),
    eta: new Date(Date.now() + Math.random() * 3600000).toISOString(), // ~1hr random
    status: 'out-for-delivery',
    driver: 'Suresh Nayak'
  };
  res.json(mockTrack);
});

// Razorpay Payment
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await rzp.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'FL-' + Date.now()
    });
    res.json({ id: order.id, amount: order.amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id } = req.body;
    // TEST MODE: Bypass signature verification (no real keys needed)
    // In production: implement proper crypto.createHmac verification
    res.json({ success: true, paymentId: razorpay_payment_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FarmLink Backend running on http://localhost:${PORT}`);
  console.log('📁 Serving frontend from ../frontend');
  console.log('💳 Razorpay test keys - REPLACE in code for production');
});

module.exports = app;

