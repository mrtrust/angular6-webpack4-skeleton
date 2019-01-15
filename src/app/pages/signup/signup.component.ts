import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '@uirouter/core';
import { finalize, switchMap } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { AuthenticationService } from '../../core/services/authentication.service';
import { IUser } from '../../core/interfaces/user.interface';


/**
 * Component for sign up
 */
@Component({
  styleUrls: ['signup.component.styl'],
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {
  signining: boolean;
  errorMessage: string;
  signupForm: FormGroup;

  constructor(public userService: UserService, // @TODO: change to AuthService when registration is readted
              public authService: AuthenticationService,
              public $state: StateService,
              public fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      password: ['', [
        Validators.required,
        // Validators.minLength(6)
      ]
      ],
      email: ['', [
        Validators.required, Validators.email
      ],
      ],
      name: ['', [
        Validators.required
      ],
      ]
    });
  }

  signup() {
    // prevent login if form is invalid
    if (this.signupForm.invalid) {
      const controls = this.signupForm.controls;
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }
    this.errorMessage = null;
    this.signining = true;

    const user = new User({
      name: this.signupForm.get('name').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    } as IUser);

    this.userService.create(user)
      .pipe(finalize(() => {
          this.signining = false;
        }),
        switchMap(() => this.authService.login(user.email, user.password))
      )
      .subscribe(
        () => {
          this.$state.go('app.home', null, {reload: true});
        },
        () => {
          this.errorMessage = 'Sorry, something went wrong, please try again later.';
          //this.errorMessage = "Please check your data and try again";
        },
      );
  }


}
