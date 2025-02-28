import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { appRouting } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    appRouting
  ]
};
