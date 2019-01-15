import { Component } from '@angular/core';

/**
 * Module used to display an error page when you are navigating to a wrong route
 * (or not defined into `app.routing.ts`)
 */
@Component({
  //selector: 'mmw-not-found',
  template: '<h3>Error 404: Not found</h3>'
})
export class NotFoundComponent {
}
