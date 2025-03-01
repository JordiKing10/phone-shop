import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from './common/common.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
