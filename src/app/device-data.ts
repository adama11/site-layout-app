// Device Name / Floor Dimension / Power / Cost / Release Date
// MegapackXL 40FT x 10FT 4 MWh $120,000 2022
// Megapack2 30FT x 10FT 3 MWh $80,000 2021
// Megapack 30FT x 10FT 2 MWh $50,000 2005
// PowerPack 10FT x 10FT 1 MWh $10,000 2000
// Transformer 10FT x 10FT -0.5MWh $10,000 -

export type DeviceInfo = {
  description: string;
  abbreviation: string;
  xDimension: number;
  yDimension: number;
  power: number;
  cost: number;
  releaseDate: string;
  type: string;
  image: string;
  powerLevel: number;
  powerColor: string;
};

export const deviceData: Record<string, DeviceInfo> = {
  MegapackXL: {
    description:
      "Highest power demands, latest features, and best performance.",
    abbreviation: "MPXL",
    xDimension: 40, // in feet
    yDimension: 10, // in feet
    power: 4, // in MWh
    cost: 120_000, // in $USD
    releaseDate: "2022",
    type: "battery",
    image: "megapackxl.jpg",
    powerLevel: 4,
    powerColor: "#76e841",
  },
  Megapack2: {
    description: "High power demands and medium-sized deployments.",
    abbreviation: "MP2",
    xDimension: 30, // in feet
    yDimension: 10, // in feet
    power: 3, // in MWh
    cost: 80_000, // in $USD
    releaseDate: "2021",
    type: "battery",
    image: "megapack.jpg",
    powerLevel: 3,
    powerColor: "#00b4ff",
  },
  Megapack: {
    description: "Medium power demands for simple deployments.",
    abbreviation: "MP",
    xDimension: 30, // in feet
    yDimension: 10, // in feet
    power: 2, // in MWh
    cost: 50_000, // in $USD
    releaseDate: "2005",
    type: "battery",
    image: "megapack.jpg",
    powerLevel: 2,
    powerColor: "#00b4ff",
  },
  PowerPack: {
    description: "Low power demands for small deployments.",
    abbreviation: "PP",
    xDimension: 10, // in feet
    yDimension: 10, // in feet
    power: 1, // in MWh
    cost: 10_000, // in $USD
    releaseDate: "2000",
    type: "battery",
    image: "powerpack.jpg",
    powerLevel: 1,
    powerColor: "#00b4ff",
  },
  Transformer: {
    description: "Supporting hardware for industrial batteries.",
    abbreviation: "TX",
    xDimension: 10, // in feet
    yDimension: 10, // in feet
    power: -0.5, // in MWh
    cost: 10_000, // in $USD
    releaseDate: "-",
    type: "transformer",
    image: "transformer.jpg",
    powerLevel: 1,
    powerColor: "red",
  },
};
