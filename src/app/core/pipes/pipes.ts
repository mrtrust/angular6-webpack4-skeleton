/**
 * Array of core pipes for the app SPA
 */
import { DefaultDatePipe } from './default-date.pipe';
import { DefaultDateTimePipe } from './default-date-time.pipe';

export const CORE_PIPES: Array<any> = [
  DefaultDatePipe,
  DefaultDateTimePipe
];
