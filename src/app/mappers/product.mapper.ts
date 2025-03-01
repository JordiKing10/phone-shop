import { ProductDTO } from '../models/product.dto';

export function mapToProductDTO(apiResponse: any): ProductDTO {
  return {
    id: apiResponse.id,
    brand: apiResponse.marca,
    model: apiResponse.modelo,
    price: apiResponse.precio,
    cpu: apiResponse.cpu,
    ram: apiResponse.ram,
    os: apiResponse.sistema_operativo,
    displayResolution: apiResponse.resolucion_pantalla,
    battery: apiResponse.bateria,
    cameras: apiResponse.camaras,
    dimensions: apiResponse.dimensiones,
    weight: apiResponse.peso,
    imageUrl: apiResponse.imagenUrl || 'assets/images/placeholder.svg',
    colors: apiResponse.options?.colors || [],
    storages: apiResponse.options?.storages || [],
  };
}
