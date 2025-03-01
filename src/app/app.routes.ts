import { Routes, provideRouter } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductDetailsComponent } from './features/product/product-details/product-details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' },
];

export const appRouting = provideRouter(routes);
