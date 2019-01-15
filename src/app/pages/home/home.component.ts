import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Pagination } from "../../core/models/pagination.model";
import { FormControl } from "@angular/forms";
import { Report } from "../../core/models/report.model";
import { ReportService } from "../../core/services/report.service";
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";

/**
 * Component for home
 */
@Component({
  styleUrls: ['home.component.styl'],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  reports: Array<Report>;
  pagination: Pagination;
  reportFilterParams = new HttpParams()
    .set('sort-by', 'name')
    .set('sort-order', 'ASC'); //set default sorting
  reportFilter = {};
  searchField: FormControl;

  constructor(public reportService: ReportService) {
  }

  ngOnInit() {
    this.getAll();
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.reportFilterParams = this.reportFilterParams.set('name', query)
          .set('page', '1');
        this.getAll();
      });
  }

  getAll(page: number = 1) {
    this.reportFilterParams = this.reportFilterParams.set('page', page.toString());
    //update httpParams
    Object.keys(this.reportFilter).forEach((key) => {
      this.reportFilterParams = this.reportFilterParams.set(key, this.reportFilter[key].toString());
    });
    this.reportService.getAll(this.reportFilterParams)
      .subscribe(
        (contents) => {
          this.pagination = contents.pagination;
          this.reports = contents.data;
        });
  }
}
