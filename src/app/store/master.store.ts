import { Injectable, signal, computed } from '@angular/core';

interface CartItem {
  id: string;
  brand: string;
  model: string;
  price: number;
  color: { code: string; name: string };
  storage: { code: string; capacity: string };
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class MasterStore {
  readonly selectedColor = signal<{ code: string; name: string } | null>(null);
  readonly selectedStorage = signal<{ code: string; capacity: string } | null>(
    null
  );
  readonly cart = signal<CartItem[]>([]);

  readonly cartCount = computed(() =>
    this.cart().reduce((acc, item) => acc + item.quantity, 0)
  );

  //#region Methods
  setColor(color: { code: string; name: string } | null): void {
    this.selectedColor.set(color);
  }

  setStorage(storage: { code: string; capacity: string } | null): void {
    this.selectedStorage.set(storage);
  }

  addToCart(product: {
    id: string;
    brand: string;
    model: string;
    price: number;
  }): void {
    const color = this.selectedColor() ?? { code: 'default', name: 'Default' };
    const storage = this.selectedStorage() ?? {
      code: 'default',
      capacity: 'Default',
    };

    const existingItemIndex = this.cart().findIndex(
      (item) =>
        item.id === product.id &&
        item.color.code === color.code &&
        item.storage.code === storage.code
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...this.cart()];
      updatedCart[existingItemIndex].quantity += 1;
      this.cart.set(updatedCart);
    } else {
      this.cart.set([
        ...this.cart(),
        {
          id: product.id,
          brand: product.brand,
          model: product.model,
          price: product.price,
          color,
          storage,
          quantity: 1,
        },
      ]);
    }
  }

  clearCart(): void {
    this.cart.set([]);
  }

  updateCartQuantity(itemId: string, newQuantity: number): void {
    const updatedCart = this.cart().map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    this.cart.set(updatedCart);
  }

  removeFromCart(itemId: string): void {
    const updatedCart = this.cart().filter((item) => item.id !== itemId);
    this.cart.set(updatedCart);
  }

  //#endregion
}
