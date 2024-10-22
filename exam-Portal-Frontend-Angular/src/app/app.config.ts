import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './services/AuthIntercepter';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule
  ]
};
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

