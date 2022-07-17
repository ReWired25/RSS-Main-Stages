// export interface IAppController {
//   valueFilter(): HTMLDivElement;
//   rangeFilter(): HTMLDivElement;
//   sort(): HTMLDivElement;
//   search(): HTMLDivElement;
//   reset(): void;
//   cart(): HTMLDivElement;
// }

export interface Iproduct {
  [index: string]: string | number | boolean;
  category: string;
  name: string;
  family: string;
  socket: string;
  core: number;
  treads: number;
  baseRate: string;
  maxRate: string;
  pce: string;
  memory: string;
  package: string;
  cooler: boolean;
  gpu: string | boolean;
  tdp: string;
  price: string;
  popularity: number;
}

export interface IfilterTemplate {
  [index: string]: string[];
  Category: string[];
  PCE: string[];
  Memory: string[];
  Package: string[];
  GPU: string[];
}
