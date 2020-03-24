import {NgModule} from '@angular/core';
import {Platform} from './platform';

// TODO PlatformModule sa pouziva
@NgModule({
  providers: [Platform]
})
export class PlatformModule {}


export * from './platform';
export * from './features';
