import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [AppConfig, importProvidersFrom(HttpClientModule), provideRouter(routes),]
})
.catch(err => console.error(err));



// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { AdminProfileComponent } from './app/components/admin-profile/admin-profile.component';

// bootstrapApplication(AdminProfileComponent, {
//   providers: [provideHttpClient(), provideRouter([])],
// });
