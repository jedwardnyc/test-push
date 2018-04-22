const products = {
  g1: [
    { name: 'Keys', price: 300.00, imgUrl:'http://www.picserver.org/images/highway/phrases/product.jpg', description:'product description' },
    { name: 'Pipes', price: 25.25, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Pedal', price: 69.95, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' }
  ],
  g2: [
    { name: 'Aspirin', price: 6.59, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Claritin', price: 18.46, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Theraflu', price: 7.49, imgUrl:'http://www.picserver.org/images/highway/phrases/product.jpg', description:'product description' }
  ],
  g3: [
    { name: 'Pan', price: 45.88, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Organic Eggs', price: 3.45, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' }
  ],
  g4: [
    { name: 'Stop Sign', price: 36.00, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Traffic Warning Sign', price: 17.55, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'School Bus', price: 31875.00, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' }
  ],
  g5: [
    { name: 'Laundry Detergent', price: 11.99, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Fabric Softener', price: 7.31, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Clothes Pins', price: 8.47, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' },
    { name: 'Laundry Basket', price: 13.99, imgUrl: 'http://www.picserver.org/images/highway/phrases/product.jpg', description: 'product description' }
  ]
};

const categories = {
  g1: { name: 'Organs' },
  g2: { name: 'Drugs' },
  g3: { name: 'Poaching' },
  g4: { name: 'Trafficking' },
  g5: { name: 'Laundering' }
};

module.exports = {
  products,
  categories
};
