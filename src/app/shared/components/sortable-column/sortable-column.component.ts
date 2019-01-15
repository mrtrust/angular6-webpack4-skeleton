import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SortService } from '../../../core/services/sort.service';
import { Subscription } from 'rxjs';

/**
 * Sortable column
 */
@Component({
  selector: '[sortable-column]',
  templateUrl: 'sortable-column.component.html',
  styleUrls: ['sortable-column.component.styl'],
  //encapsulation: ViewEncapsulation.None,
})
export class SortableColumnComponent implements OnInit, OnDestroy {
  @Input('sortable-column')
  columnName: string;
  @Input('source')
  source: string;
  @Input('sort-direction')
  sortDirection: string = '';
  @Input('start-direction')
  startDirection: string = 'ASC';

  startDirectionSort: string;
  columnSortedSubscription: Subscription;

  constructor(public sortService: SortService, public host: ElementRef) {
  }

  @HostListener('click')
  sort() {
    if (this.startDirectionSort && ['ASC', 'DESC'].includes(this.startDirectionSort)) {
      this.sortDirection = this.startDirectionSort;
      this.startDirectionSort = null;
    } else {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }
    this.sortService.columnSorted({sortColumn: this.columnName, sortDirection: this.sortDirection}, this.source);
  }

  ngOnInit() {
    if (this.sortDirection) {
      this.sortDirection = this.sortDirection.toUpperCase();
    }
    if (this.startDirection) {
      this.startDirection = this.startDirection.toUpperCase();
      //copy startDirection to internal property, because we will clear it after 1t use
      this.startDirectionSort = this.startDirection;
    }
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.getColumnSourceObservable(this.source).subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
        //return startDirection when another sort applied
        this.startDirectionSort = this.startDirection;
      }
    });

    if (this.sortDirection) {
      //this.sort();
    }
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }
}
