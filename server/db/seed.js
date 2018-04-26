const bcrypt = require('bcryptjs');

const products = {
  g1: [
    { name: 'Heritage System Ultra Bundle', price: 10790.00, imgUrl:'https://cdnm2-kraftmusic.netdna-ssl.com/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/H/A/HAM-XK5MDLA3HSYSUB.jpg', description:'product description' },
    { name: 'Antique Restored Wooden Organ Pipes', price: 95.00, imgUrl: 'https://ssli.ebayimg.com/images/g/9JEAAOSwAwFaoty2/s-l640.jpg', description: 'product description' },
    { name: '17-note MIDI Controller Pedalboard', price: 599.95, imgUrl: 'http://www.viscountinstruments.com/media/catalog/product/p/e/ped.-27n.-rad.-conc.-oak_1.jpg', description: 'product description' }
  ],
  g2: [
    { name: 'Aspirin', price: 6.59, imgUrl: 'https://cdn1.medicalnewstoday.com/content/images/headlines/317/317459/bottle-of-aspirin.jpg', description: 'product description' },
    { name: 'Claritin', price: 18.46, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81POrtyaaCL._SL1500_.jpg', description: 'product description' },
    { name: 'Theraflu', price: 7.49, imgUrl:'https://cdn7.bigcommerce.com/s-d8qut8/images/stencil/1024x1024/products/1069/2246/theraflu_daytime_8.3_oz__27345.1502391107.jpg', description:'product description' }
  ],
  g3: [
    { name: 'Stainless Steel 4-Egg Poacher', price: 45.88, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71kIwLof2nL._SX355_.jpg', description: 'product description' },
    { name: 'Microwave Egg Poacher', price: 3.45, imgUrl: 'https://www.poundstretcher.co.uk/media/catalog/product/cache/1/image/686x/9df78eab33525d08d6e5fb8d27136e95/i/m/img_5023.jpg', description: 'product description' }
  ],
  g4: [
    { name: 'Stop Sign', price: 36.00, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41WWgjM5MHL._SX342_.jpg', description: 'product description' },
    { name: 'Speed Limit Sign', price: 17.55, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41hHsm6ZbFL._SL500_AC_SS350_.jpg', description: 'product description' },
    { name: 'School Bus', price: 31875.00, imgUrl: 'https://www.njpacoop.org/themes/njpa/images/bus.png', description: 'product description' }
  ],
  g5: [
    { name: 'Liquid Detergent', price: 11.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81KvbE7oTeL._SY355_.jpg', description: 'product description' },
    { name: 'Fabric Softener', price: 7.31, imgUrl: 'https://images.jet.com/md5/99bce3f41315108652cb9b621ff1aa21.1500', description: 'product description' },
    { name: 'Clothes Pins', price: 8.47, imgUrl: 'https://www.bhphotovideo.com/images/images500x500/General_Brand_GS4850SM_Clothes_Pins_221600.jpg', description: 'product description' },
    { name: 'Laundry Basket', price: 13.99, imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/71iP9In6gvL._SL1500_.jpg', description: 'product description' }
  ]
};

const categories = {
  g1: { name: 'Organs' },
  g2: { name: 'Drugs' },
  g3: { name: 'Poaching' },
  g4: { name: 'Trafficking' },
  g5: { name: 'Laundering' }
};

const hashedAdminPW = bcrypt.hashSync('admin', 8)
const hashedUserPW = bcrypt.hashSync('test', 8)

const users = { 
  g1: { firstname: 'Admin', lastname: 'Test', email: 'admin@test.com', password: hashedAdminPW, isAdmin: true },
  g2: { firstname: 'User', lastname: 'Test', email: 'not_admin@test.com', password: hashedUserPW, isAdmin: false }
}

module.exports = {
  products,
  categories,
  users
};
