import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartCount = signal(0);

  getCartCount(): Observable<number> {
    return of(this.cartCount());
  }

  addToCart(): void {
    this.cartCount.set(this.cartCount() + 1);
  }
}
