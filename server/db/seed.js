const products = {
  g1: [
    { name: 'Keys', price: 300.00 },
    { name: 'Pipes', price: 25.25 },
    { name: 'Pedal', price: 69.95 }
  ],
  g2: [
    { name: 'Aspirin', price: 6.59 },
    { name: 'Claritin', price: 18.46 },
    { name: 'Theraflu', price: 7.49 }
  ],
  g3: [
    { name: 'Pan', price: 45.88 },
    { name: 'Organic Eggs', price: 3.45 }
  ],
  g4: [
    { name: 'Stop Sign', price: 36.00 },
    { name: 'Traffic Warning Sign', price: 17.55 },
    { name: 'School Bus', price: 31875.00 }
  ],
  g5: [
    { name: 'Laundry Detergent', price: 11.99 },
    { name: 'Fabric Softener', price: 7.31 },
    { name: 'Clothes Pins', price: 8.47 },
    { name: 'Laundry Basket', price: 13.99 }
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
