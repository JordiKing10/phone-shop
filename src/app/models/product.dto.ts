export interface ProductDTO {
  id: string;
  brand: string;
  model: string;
  price: number;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  cameras: string;
  dimensions: string;
  weight: string;
  imageUrl?: string;
  colors?: { code: string; name: string }[];
  storages?: { code: string; capacity: string }[];
}
