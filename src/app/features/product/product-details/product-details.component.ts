import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../../../models/product.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  product = signal<ProductDTO | null>(null);
  selectedColor = signal<{ code: string; name: string }>({
    code: 'default',
    name: 'Default',
  });
  selectedStorage = signal<{ code: string; capacity: string }>({
    code: 'default',
    capacity: 'Default',
  });

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product.set(product);
        if (product.colors && product.colors.length > 0) {
          this.selectedColor.set(product.colors[0]);
        }
        if (product.storages && product.storages.length > 0) {
          this.selectedStorage.set(product.storages[0]);
        }
      });
    }
  }

  selectColor(color: { code: string; name: string }): void {
    this.selectedColor.set(color);
  }

  selectStorage(storage: { code: string; capacity: string }): void {
    this.selectedStorage.set(storage);
  }
}
