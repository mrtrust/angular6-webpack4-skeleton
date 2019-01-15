import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnSortedEventInterface } from '../interfaces/column-sorted-event.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SortService {

  private columnSortedSource = new Subject<ColumnSortedEventInterface>();
  private columnSortedSources = {}; //Subject<ColumnSortedEventInterface>[];

  private columnSorted$ = this.columnSortedSource.asObservable();
  private columnSortedObservables = {};

  columnSorted(event: ColumnSortedEventInterface, source: string = 'DEFAULT') {
    if (source === 'DEFAULT') {
      this.columnSortedSource.next(event);
    } else {
      this.getColumnSourceSource(source).next(event);
    }
  }

  getColumnSourceSource(name: string) {
    if (name in this.columnSortedSources) {
      return this.columnSortedSources[name];
    }
    return this.columnSortedSources[name] = new Subject<ColumnSortedEventInterface>();

  }

  getColumnSourceObservable(name: string = 'DEFAULT') {
    if (name === 'DEFAULT') {
      return this.columnSorted$;
    }

    if (name in this.columnSortedObservables) {
      return this.columnSortedObservables[name];
    }
    return this.columnSortedObservables[name] = this.getColumnSourceSource(name);

  }
}
