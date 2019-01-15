import { Component, DoCheck, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';

import MenuConfig from './site-navigation.config';

/**
 * Site navigation
 */
@Component({
  selector: 'site-navigation',
  templateUrl: 'site-navigation.component.html',
  styleUrls: ['site-navigation.component.styl'],
})
export class SiteNavigationComponent implements OnInit, DoCheck {
  menu = MenuConfig;
  currentRoute: string;
  newRoute: string;
  isShowActivities: boolean = false;
  isShowProfileDropdown: boolean = false;


  constructor(public $state: StateService,) {
  }

  ngOnInit() {
    this.initMenu();
    this.currentRoute = this.$state.current.name;
    //this.showActivities();
  }

  initMenu() {
    this.menu = this.updateIsActive();
  }

  updateState(state: string) {
    this.newRoute = state;
  }

  updateIsActive() {
    const menu = this.menu || MenuConfig;
    Object.keys(menu).forEach(key => {
      const item = menu[key];
      item.isActive = this.$state.includes(item.state);
      if (item.additionStates && !item.isActive) {
        item.additionStates.forEach((x) => {
          if (this.$state.includes(x)) {
            item.isActive = true;
            return false;
          }
        });
      }
    });
    return menu;
  }

  ngDoCheck() {
    if (this.newRoute !== this.currentRoute) {
      this.menu = this.updateIsActive();
      this.currentRoute = this.newRoute;
    }
  }

  showActivities() {
    if (this.isShowActivities) {
      this.isShowActivities = false;
      this.menu.likes.isActive = false;
      return;
    }
  }

  showProfileDropdown() {
    if (this.isShowProfileDropdown) {
      this.isShowProfileDropdown = false;
      this.menu.profile.isActive = false;
    } else {
      this.isShowProfileDropdown = true;
      this.menu.profile.isActive = true;
    }
  }
}
