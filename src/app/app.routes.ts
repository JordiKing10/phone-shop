import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductDetailsComponent } from './features/product/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];

export const appRouting = provideRouter(routes);
