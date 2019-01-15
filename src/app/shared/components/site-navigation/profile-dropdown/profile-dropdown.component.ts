import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { StateService } from '@uirouter/core';

import { TokenService } from "../../../../core/services/token.service";
import { AuthenticationService } from "../../../../core/services/authentication.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalProfileComponent } from "../../modal-profile/modal-profile.component";

/**
 * Profile dropdown in site navifation
 */
@Component({
  selector: 'profile-dropdown',
  templateUrl: 'profile-dropdown.component.html',
  styleUrls: ['profile-dropdown.component.styl'],
})
export class ProfileDropdownComponent implements OnInit {
  @Input()
  showProfile: boolean = true;
  @Output()
  showProfileChange = new EventEmitter<boolean>();

  ownUserId: number;
  isInit: boolean = false;

  constructor(public $state: StateService,
              public eRef: ElementRef,
              public tokenService: TokenService,
              public authService: AuthenticationService,
              public modalService: NgbModal) {
  }

  ngOnInit() {
    this.ownUserId = this.tokenService.getOwnUserId();
    setTimeout(() => {
      this.isInit = true; //to prevent closing imiadiatly after opening
    }, 1000);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    //hide on click outsite
    if (!this.eRef.nativeElement.contains(event.target) && this.isInit) {
      this.showProfileChange.emit(false);
    }
  }

  openOwnProfile() {
    const modalRef: NgbModalRef = this.modalService.open(ModalProfileComponent);
    this.showProfileChange.emit(false);
  }

  logOut() {
    this.authService.logout()
      .subscribe(() => {
        this.$state.go('app.login', null, {reload: true});
      });
  }
}
