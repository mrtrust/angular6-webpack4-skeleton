import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CORE_SERVICES } from './services/services';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { CORE_PIPES } from './pipes/pipes';

/**
 * Core module that you can import only one time into the main module of the app SPA.
 * If you try to import it again, you'll get a runtime error.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CORE_PIPES
  ],
  declarations: [
    CORE_PIPES
  ],
  providers: [
    CORE_SERVICES,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
