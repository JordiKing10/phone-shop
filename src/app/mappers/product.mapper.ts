import { ProductDTO } from '../models/product.dto';

export function mapToProductDTO(apiResponse: any): ProductDTO {
  return {
    id: apiResponse.id,
    brand: apiResponse.brand,
    model: apiResponse.model,
    price: apiResponse.price,
    cpu: apiResponse.cpu,
    ram: apiResponse.ram,
    os: apiResponse.os,
    displayResolution: apiResponse.displayResolution,
    battery: apiResponse.battery,
    cameras: apiResponse.primaryCamera || apiResponse.secondaryCamera || '',
    dimensions: apiResponse.dimentions,
    weight: apiResponse.weight
  };
}
