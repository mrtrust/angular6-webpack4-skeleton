import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

//import { Observable, Subscription } from 'rxjs';
import { exhaustMap, filter, map, pairwise, skipWhile, startWith, tap } from 'rxjs/internal/operators';
import { fromEvent } from 'rxjs';

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {

  @Input()
  scrollCallback;

  @Input('immediate-callback')
  immediateCallback;

  @Input()
  scrollPercent = 70;

  scrollEvent$;

  userScrolledDown$;

  requestStream$;

  requestOnScroll$;

  constructor(public elm: ElementRef) {
  }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.streamScrollEvents();
    this.requestCallbackOnScroll();
  }

  registerScrollEvent() {
    this.scrollEvent$ = fromEvent(window, 'scroll');
  }

  streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .pipe(
        map((e: any): ScrollPosition =>
          ({
            sH: e.target.scrollingElement.scrollHeight,
            sT: e.target.scrollingElement.scrollTop,
            cH: e.target.scrollingElement.clientHeight
          })
        ),
        pairwise(),
        filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
      );
  }

  requestCallbackOnScroll() {

    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$
        .pipe(
          startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]),
        );
    }

    this.requestOnScroll$
      .pipe(
        exhaustMap(() => this.scrollCallback())
      )
      .subscribe();

  }

  isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
  };

  isScrollExpectedPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  };
}
