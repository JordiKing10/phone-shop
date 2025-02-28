import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [HeaderComponent, SearchComponent],
  exports: [HeaderComponent, SearchComponent]
})
export class CommonModule {}
