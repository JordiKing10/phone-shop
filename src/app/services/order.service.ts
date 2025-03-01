import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //TODO: Implementar la lógica de procesamiento de la orden
  processOrder(orderData: any): Observable<{ success: boolean }> {
    console.log('Data:', orderData);
    return of({ success: true }).pipe(delay(3000));
  }
}
