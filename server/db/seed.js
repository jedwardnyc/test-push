const bcrypt = require('bcryptjs');

const products = {
  g1: [
    { name: 'Heritage System Ultra Bundle', price: 10790.00, imgUrl:'https://cdnm2-kraftmusic.netdna-ssl.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/H/A/HAM-XK5MDLA3HSYSUB.jpg', description:'product description', availability: 'true' },
    { name: 'Antique Restored Wooden Organ Pipes', price: 95.00, imgUrl: 'https://ssli.ebayimg.com/images/g/9JEAAOSwAwFaoty2/s-l640.jpg', description: 'product description', availability: 'true' },
    { name: '17-note MIDI Controller Pedalboard', price: 599.95, imgUrl: 'http://www.viscountinstruments.com/media/catalog/product/p/e/ped.-27n.-rad.-conc.-oak_1.jpg', description: 'product description', availability: 'true' }
  ],
  g2: [
    { name: 'Aspirin', price: 6.59, imgUrl: 'https://cdn1.medicalnewstoday.com/content/images/headlines/317/317459/bottle-of-aspirin.jpg', description: 'Aspirin regimen. Safety coated. Pain reliever. Enteric.', availability: 'true' },
    {
      name: 'Claritin', price: 18.46, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81POrtyaaCL._SL1500_.jpg', description: 'Claritin is the #1 doctor recommended non - drowsy oral allergy brand.When your symptoms start, doctors recommend taking non - drowsy Claritin every day of your allergy season for continuous relief(1).', availability: 'true' },
    {
      name: 'Theraflu', price: 7.49, imgUrl: 'https://cdn7.bigcommerce.com/s-d8qut8/images/stencil/1024x1024/products/1069/2246/theraflu_daytime_8.3_oz__27345.1502391107.jpg', description: 'Theraflu Nighttime Multi-Symptom Severe Cold Lipton Green Tea Citrus, 6CT', availability: 'true' },
    { name: 'Vitafusion Gummy Vitamins for Adults Assorted Flavors', price: 13.49, imgUrl: 'https://www.cvs.com//bizcontent/merchandising/productimages/large/2791701919.jpg', description: 'MultiVites. 200% Vitamin D. Essential daily formula (This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.) New look. Same great taste. Natural colors & flavors; berry, peach & orange. 2 gummies have as much Vitamin A as 1 cup of broccoli; Vitamin C as 1 tangerine; Vitamin D as 3 oz. of salmon. Lab tested to ensure quality and potency. This product contains natural colors and flavors. Contains no wheat (gluten), milk, eggs, peanuts or soy.This product may settle during shipping.Natural colors will darken over time. This does not alter the potency of the product. Made in USA.', availability: 'true' },
    { name: 'Move Free Ultra UC-II Collagen and Hyaluronic Acid Joint Supplement', price: 32.29, imgUrl: 'https://www.cvs.com//bizcontent/merchandising/productimages/large/2052511841.jpg', description: 'Move Free Ultra UC-II Collagen and Hyaluronic Acid Joint Supplement, 30CT', availability: 'true' },
  ],
  g3: [
    { name: 'Stainless Steel 4-Egg Poacher', price: 45.88, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71kIwLof2nL._SX355_.jpg', description: 'product description', availability: 'true' },
    { name: 'Microwave Egg Poacher', price: 3.45, imgUrl: 'https://www.poundstretcher.co.uk/media/catalog/product/cache/1/image/686x/9df78eab33525d08d6e5fb8d27136e95/i/m/img_5023.jpg', description: 'product description', availability: 'true' }
  ],
  g4: [
    { name: 'Stop Sign', price: 36.00, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WWgjM5MHL._SX342_.jpg', description: 'product description', availability: 'false' },
    { name: 'Speed Limit Sign', price: 17.55, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41hHsm6ZbFL._SL500_AC_SS350_.jpg', description: 'product description', availability: 'true' },
    { name: 'School Bus', price: 31875.00, imgUrl: 'https://www.njpacoop.org/themes/njpa/images/bus.png', description: 'product description', availability: 'true' }
  ],
  g5: [
    { name: 'Liquid Detergent', price: 11.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81KvbE7oTeL._SY355_.jpg', description: 'product description', availability: 'true' },
    { name: 'Fabric Softener', price: 7.31, imgUrl: 'https://images.jet.com/md5/99bce3f41315108652cb9b621ff1aa21.1500', description: 'product description', availability: 'false' },
    { name: 'Clothes Pins', price: 8.47, imgUrl: 'https://www.bhphotovideo.com/images/images500x500/General_Brand_GS4850SM_Clothes_Pins_221600.jpg', description: 'product description', availability: 'true' },
    { name: 'Laundry Basket', price: 13.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71iP9In6gvL._SL1500_.jpg', description: 'product description', availability: 'true' }
  ]
};

const categories = {
  g1: { name: 'Organs' },
  g2: { name: 'Drugs' },
  g3: { name: 'Poaching' },
  g4: { name: 'Trafficking' },
  g5: { name: 'Laundering' }
};

const hashedAdminPW = bcrypt.hashSync('admin', 8);
const hashedUserPW = bcrypt.hashSync('test', 8);

const users = {
  g1: { firstname: 'Admin', lastname: 'Test', email: 'admin@test.com', password: hashedAdminPW, isAdmin: true },
  g2: { firstname: 'Chaehoon', lastname: 'Lim', email: 'test@test.com', password: hashedUserPW, isAdmin: false },
  g3: { firstname: 'Jacob', lastname: 'Rico', email: 'jacob@test.com', password: hashedUserPW, isAdmin: false },
  g4: { firstname: 'Baltazar', lastname: 'Villegas', email: 'baltazar@test.com', password: hashedUserPW, isAdmin: false },
}

const lineItems = {
  g1: [
    { quantity: 3, product_id: 13, order_id: 1 },
    { quantity: 2, product_id: 2, order_id: 1 },
  ],
  g2: [
    { quantity: 5, product_id: 5, order_id: 2 },
    { quantity: 1, product_id: 7, order_id: 2 }
  ],
  g3: [
    { quantity: 2, product_id: 1, order_id: 3 },
    { quantity: 9, product_id: 8, order_id: 3 },
    { quantity: 4, product_id: 4, order_id: 3 }
  ]
}

const addresses = {
  g1: {
    name: 'Home',
    line1: '699 Ocean Ave',
    line2: 'Apt 1F',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11226',
    default: true
  },
  g2: {
    name: 'Work',
    line1: '1234 Test Ave',
    line2: '',
    city: 'St Paul',
    state: 'CA',
    zip: '12345',
    default: false
  },
}

const credit_cards = {
  g1: {
    number: 4242424242424242,
    firstname: 'Test',
    lastname: 'Test',
    exp: '10/21',
  },
  g2: {
    number: 4242424242424242,
    firstname: 'Jacob',
    lastname: 'Rico',
    exp: '10/21',
  },
}

module.exports = {
  products,
  categories,
  users,
  lineItems,
  addresses,
  credit_cards
};
