import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  public baseUrl: string = '';
  public reportUrl: string = '';
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    // Create HttpClient that ignores interceptors if any
    this.httpClient = new HttpClient(handler);
  }

  loadConfig(): Promise<void> {
    return lastValueFrom(this.httpClient.get<any>('/assets/config.json'))
      .then(config => {
        this.baseUrl = config.baseUrl;
        this.reportUrl = config.reportUrl;
      })
      .catch((error) => {
        console.error('Could not load config file', error);
        return Promise.reject(error);
      });
  }
}



// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { provideAnimations } from '@angular/platform-browser/animations';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideRouter(routes), provideHttpClient(),  ]
// };
