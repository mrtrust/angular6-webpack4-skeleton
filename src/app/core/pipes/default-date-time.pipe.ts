import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'defaultDateTime'
})
export class DefaultDateTimePipe extends DatePipe implements PipeTransform {
  dateFormat = 'MM/dd/yyyy hh:mm:ss';

  transform(value: any, args?: any): any {
    return super.transform(value, this.dateFormat);
  }
}
