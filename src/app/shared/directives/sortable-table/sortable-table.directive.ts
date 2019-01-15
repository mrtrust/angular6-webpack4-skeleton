import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpParams } from '@angular/common/http';
import { ColumnSortedEventInterface } from '../../../core/interfaces/column-sorted-event.interface';
import { SortService } from '../../../core/services/sort.service';

@Directive({
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {
  @Input('sortable-table')
  filter: HttpParams;
  @Input('source')
  source: string;
  @Output('sortable-tableChange')
  filterChange = new EventEmitter<HttpParams>();
  @Output()
  onSort = new EventEmitter();

  columnSortedSubscription: Subscription;

  constructor(public sortService: SortService) {
  }

  ngOnInit() {
    this.columnSortedSubscription = this.sortService.getColumnSourceObservable(this.source).subscribe(event => {

      if (this.filter) {
        const sort: ColumnSortedEventInterface = event;
        this.filter = this.filter
          .set('sort-by', event.sortColumn)
          .set('sort-order', event.sortDirection);
        this.filterChange.emit((this.filter));
      }
      this.onSort.emit();
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
