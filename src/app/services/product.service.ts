import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ProductDTO } from '../models/product.dto';
import { mapToProductDTO } from '../mappers/product.mapper';
import { API_BASE_URL, CACHE_EXPIRATION } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cache: { [key: string]: { data: ProductDTO | ProductDTO[]; timestamp: number } } = {};

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<ProductDTO[]> {
    const cacheKey = 'product_list';
    if (this.cache[cacheKey] && Date.now() - this.cache[cacheKey].timestamp < CACHE_EXPIRATION) {
      return of(this.cache[cacheKey].data as ProductDTO[]);
    }

    return this.http.get<any[]>(`${API_BASE_URL}/product`).pipe(
      map(response => response.map(mapToProductDTO)),
      map(products => {
        this.cache[cacheKey] = { data: products, timestamp: Date.now() };
        return products;
      })
    );
  }

  getProductById(id: string): Observable<ProductDTO> {
    const cacheKey = `product_${id}`;
    if (this.cache[cacheKey] && Date.now() - this.cache[cacheKey].timestamp < CACHE_EXPIRATION) {
      return of(this.cache[cacheKey].data as ProductDTO);
    }

    return this.http.get<any>(`${API_BASE_URL}/product/${id}`).pipe(
      map(mapToProductDTO),
      map(product => {
        this.cache[cacheKey] = { data: product, timestamp: Date.now() };
        return product;
      })
    );
  }
}
