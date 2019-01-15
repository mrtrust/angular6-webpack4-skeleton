import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'defaultDate'
})
export class DefaultDatePipe extends DatePipe implements PipeTransform {
  dateFormat = 'MM/dd/yyyy';

  transform(value: any, args?: any): any {
    return super.transform(value, this.dateFormat);
  }
}
