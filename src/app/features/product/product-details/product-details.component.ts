import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../../../models/product.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  product = signal<ProductDTO | null>(null);

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getProductById(productId)
        .subscribe((product) => this.product.set(product));
    }
  }
}
