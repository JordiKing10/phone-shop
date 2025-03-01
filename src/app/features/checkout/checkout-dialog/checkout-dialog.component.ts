import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '@app/services/order.service';
import { MasterStore } from '@app/store/master.store';

@Component({
  selector: 'app-checkout-dialog',
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.scss',
})
export class CheckoutDialogComponent {
  private readonly orderService = inject(OrderService);
  private readonly masterStore = inject(MasterStore);
  private readonly dialogRef = inject(MatDialogRef<CheckoutDialogComponent>);

  isProcessing = signal(true);
  isSuccess = signal(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.processOrder();
  }

  processOrder(): void {
    this.orderService.processOrder(this.data).subscribe({
      next: () => {
        this.isProcessing.set(false);
        this.isSuccess.set(true);
        this.masterStore.cart.set([]); // Vacía el carrito tras la compra
      },
      error: () => {
        this.isProcessing.set(false);
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
