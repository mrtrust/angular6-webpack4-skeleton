import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../../core/models/pagination.model';

/**
 * Pagination
 */
@Component({
  selector: 'pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.styl'],
})
export class PaginationComponent implements OnInit {
  @Input()
  pagination: Pagination = new Pagination();
  @Output()
  onPageChange: EventEmitter<any> = new EventEmitter<any>();
  public page: number;

  constructor() {

  }

  ngOnInit() {


  }

  goPage(targetPage: number) {
    let {page, perPage} = this.pagination;

    if (targetPage < 1 || targetPage > this.lastPage()) {
      this.page = page;
      return;
    }

    page = this.pagination.page = targetPage;
    this.onPageChange.emit(page);

  }

///

  lastPage() {
    const {totalItems, perPage} = this.pagination;

    return Math.ceil(totalItems / perPage) || 0;
  }

  pageFirstRowIndex() {
    const {page, perPage} = this.pagination;

    return (page - 1) * perPage + 1 || 0;
  }

  pageLastRowIndex() {
    const {perPage, totalItems} = this.pagination;
    let lastRowIndex = this.pageFirstRowIndex() + perPage - 1;

    return (lastRowIndex < totalItems ? lastRowIndex : totalItems) || 0;
  }

}
