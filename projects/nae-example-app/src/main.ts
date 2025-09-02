import 'hammerjs';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {loadRemoteConfiguration} from '../../netgrif-components-core/src/lib/configuration/application-configuration';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

window['env'] = await loadRemoteConfiguration(window['env']);
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
