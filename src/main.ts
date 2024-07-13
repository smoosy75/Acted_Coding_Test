import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Importez provideHttpClient
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Utilisez bootstrapApplication pour démarrer l'application et fournir HttpClientModule via provideHttpClient
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers, // Assurez-vous d'inclure les providers existants
    provideHttpClient(), // Utilisez provideHttpClient ici
  ],
}).catch((err) => console.error(err));
