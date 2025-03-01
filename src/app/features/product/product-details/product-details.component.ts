import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductDTO } from '../../../models/product.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MasterStore } from '@app/store/master.store';

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
  public readonly masterStore = inject(MasterStore);

  readonly product = signal<ProductDTO | null>(null);

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product.set(product);

        this.masterStore.setColor(
          product.colors?.length ? product.colors[0] : null
        );

        this.masterStore.setStorage(
          product.storages?.length ? product.storages[0] : null
        );
      });
    }
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (!currentProduct) return;

    this.masterStore.addToCart({
      id: currentProduct.id,
      brand: currentProduct.brand,
      model: currentProduct.model,
      price: currentProduct.price,
    });
  }
}
