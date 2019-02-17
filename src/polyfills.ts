/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * IE9, IE10 and IE11 requires all of the following polyfills.
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';

/**
 * IE10 and IE11 requires the following for NgClass support on SVG elements
 */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * IE10 and IE11 requires the following to support `@angular/animation`.
 *
 * Dont need to import anymore !
 * https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4
 */
//import 'web-animations-js';  // Run `npm install --save web-animations-js`.

/**
 * Evergreen browsers require these.
 */
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

/**
 * IE10 and IE11 requires the following to support `@angular/animation`.
 *
 * Dont need to import anymore !
 * https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4
 */
//import 'web-animations-js';  // Run `npm install --save web-animations-js

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js/dist/zone';
/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/it';

if ('production' === ENV) {
  // Production
} else {
  // Development
}
