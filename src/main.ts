import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'src/environments/environment.prod';

import { AppModule } from './app/app.module';

if (environment.production) {
  console.log('### production');
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch(err => console.error(err));
