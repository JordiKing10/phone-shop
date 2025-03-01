import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../../../models/product.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  products = signal<ProductDTO[]>([]);
  searchTerm = signal<string>('');
  pageIndex = signal<number>(0);
  pageSize = signal<number>(8);

  filteredProducts = computed(() =>
    this.products().filter(
      (product) =>
        product.brand.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        product.model.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  paginatedProducts = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredProducts().slice(start, start + this.pageSize());
  });

  constructor() {
    this.productService
      .getProducts()
      .subscribe((products) => this.products.set(products));

    effect(() => {
      this.searchTerm.set(this.searchService.searchTerm());
    });
  }

  onPageChange(event: any): void {
    this.pageIndex.set(event.pageIndex);

    const productListContainer = document.querySelector(
      '.product-list-container'
    );
    if (productListContainer) {
      productListContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getProductImage(product: ProductDTO): string {
    return product.imageUrl && product.imageUrl.trim() !== ''
      ? product.imageUrl
      : 'assets/placeholder.svg';
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }
}
