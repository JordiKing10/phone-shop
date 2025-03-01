import { Component, inject, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DEFAULT_DARK_MODE } from '../../config/constants';
import { MasterStore } from '@app/store/master.store';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly renderer = inject(Renderer2);
  private readonly masterStore = inject(MasterStore);
  cartCount = this.masterStore.cartCount;
  darkMode: boolean = DEFAULT_DARK_MODE;

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
