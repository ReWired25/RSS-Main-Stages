export interface Iproduct {
  [index: string]: string | number | boolean;
  Category: string;
  Model: string;
  Family: string;
  Socket: string;
  Core: number;
  Treads: number;
  'Base Rate': string;
  'Max Rate': string;
  PCE: string;
  Memory: string;
  Package: string;
  Cooler: string | boolean;
  GPU: string | boolean;
  TDP: number;
  Price: number;
  Popularity: number;
}

export interface IfilterTemplate {
  [index: string]: string[];
  Category: string[];
  Socket: string[];
  PCE: string[];
  Memory: string[];
  Package: string[];
  Cooler: string[];
  GPU: string[];
}
