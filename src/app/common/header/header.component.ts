import { Component, Renderer2, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DEFAULT_DARK_MODE } from '../../config/constants';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatSlideToggleModule,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  darkMode: boolean = DEFAULT_DARK_MODE;
  cartCount = signal(0);

  constructor(
    private readonly renderer: Renderer2,
    private readonly cartService: CartService
  ) {
    this.cartService
      .getCartCount()
      .subscribe((count) => this.cartCount.set(count));
  }

  ngOnInit(): void {
    this.setTheme(this.darkMode);
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.setTheme(this.darkMode);
  }

  setTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    if (isDark) {
      this.renderer.removeClass(htmlElement, 'light-mode');
      this.renderer.addClass(htmlElement, 'dark-mode');
    } else {
      this.renderer.removeClass(htmlElement, 'dark-mode');
      this.renderer.addClass(htmlElement, 'light-mode');
    }
  }
}
