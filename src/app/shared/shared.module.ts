import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UIRouterModule } from '@uirouter/angular';
import { FormsModule } from '@angular/forms';
import { SHARED_COMPONENTS } from './components/components';
import { SHARED_DIRECTIVES } from './directives/directives';
import { ModalProfileComponent } from "./components/modal-profile/modal-profile.component";

/**
 * Shared module that you can import everywhere, because it haven't providers.
 * It contains navbar, page-header and so on.
 */
@NgModule({
  imports: [
    CommonModule,
    UIRouterModule,
    FormsModule,
    NgbModule, // without forRoot, because this is a child module
  ],
  exports: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES
  ],
  declarations: [
    SHARED_COMPONENTS,
    SHARED_DIRECTIVES
  ],
  entryComponents: [
    ModalProfileComponent,
  ],
  providers: []
})
export class SharedModule {
}
