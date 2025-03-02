import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MasterStore } from '@app/store/master.store';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly dialog = inject(MatDialog);
  private readonly masterStore = inject(MasterStore);

  readonly cart = this.masterStore.cart;
  readonly cartCount = this.masterStore.cartCount;

  getTotalPrice(): number {
    return this.cart().reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  updateQuantity(itemId: string, change: number): void {
    const updatedCart = this.cart().map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    this.masterStore.cart.set(updatedCart);
  }

  removeItem(itemId: string): void {
    const updatedCart = this.cart().filter((item) => item.id !== itemId);
    this.masterStore.cart.set(updatedCart);
  }

  clearCart(): void {
    this.masterStore.cart.set([]);
  }

  openConfirmationDialog(): void {
    if (this.cartCount() === 0) {
      return;
    }
    this.dialog.open(CheckoutDialogComponent, {
      width: '400px',
      data: {
        total: this.getTotalPrice(),
        cart: this.cart().map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        cartCount: this.cartCount(),
      },
      disableClose: true,
    });
  }
}
