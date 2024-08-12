// Device Name / Floor Dimension / Power / Cost / Release Date
// MegapackXL 40FT x 10FT 4 MWh $120,000 2022
// Megapack2 30FT x 10FT 3 MWh $80,000 2021
// Megapack 30FT x 10FT 2 MWh $50,000 2005
// PowerPack 10FT x 10FT 1 MWh $10,000 2000
// Transformer 10FT x 10FT -0.5MWh $10,000 -

export const deviceData = [
  {
    name: 'MegapackXL',
    description: 'Latest features and best performance.',
    xDimension: 40, // in feet
    yDimension: 10, // in feet
    power: 4, // in MWh
    cost: 120_000, // in $USD
    releaseDate: '2022',
    type: 'battery',
    image: 'megapackxl.jpg',
  },
  {
    name: 'Megapack2',
    description: 'High power demands and medium-sized deployments.',
    xDimension: 30, // in feet
    yDimension: 10, // in feet
    power: 3, // in MWh
    cost: 80_000, // in $USD
    releaseDate: '2021',
    type: 'battery',
    image: 'megapack.jpg',
  },
  {
    name: 'Megapack',
    description: 'Medium power demands for simple deployments.',
    xDimension: 30, // in feet
    yDimension: 10, // in feet
    power: 2, // in MWh
    cost: 50_000, // in $USD
    releaseDate: '2005',
    type: 'battery',
    image: 'megapack.jpg',
  },
  {
    name: 'PowerPack',
    description: 'Low power demands for small deployments.',
    xDimension: 10, // in feet
    yDimension: 10, // in feet
    power: 1, // in MWh
    cost: 10_000, // in $USD
    releaseDate: '2000',
    type: 'battery',
    image: 'powerpack.jpg',
  },
  {
    name: 'Transformer',
    description: 'Supporting hardware for industrial batteries.',
    xDimension: 10, // in feet
    yDimension: 10, // in feet
    power: -0.5, // in MWh
    cost: 10_000, // in $USD
    releaseDate: '-',
    type: 'transformer',
    image: 'transformer.jpg',
  },
];
