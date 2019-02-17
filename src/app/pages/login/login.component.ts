import { Component, OnInit, Input } from '@angular/core';
import { TargetState, StateService } from '@uirouter/core';
import { finalize } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authentication.service';

/**
 * Component for login
 */
@Component({
  styleUrls: ['login.component.styl'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  @Input() returnTo: TargetState;
  credentials = {login: null, password: null};
  authenticating: boolean;
  errorMessage: string;
  passwordFieldType: string = 'password';
  loginForm: FormGroup;

  constructor(public authService: AuthenticationService,
              public $state: StateService,
              public fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
    this.onChanges();
  }

  initForm() {
    this.loginForm = this.fb.group({
      password: ['', [
        Validators.required,
        //Validators.minLength(6)
      ]
      ],
      email: ['', [
        Validators.required, Validators.email
      ]
      ]
    });
  }

  onChanges(): void {
    this.loginForm.valueChanges.subscribe(val => {
      const controls = this.loginForm.controls;
      Object.keys(controls)
        .forEach(controlName => {
          if (controls[controlName].hasError('invalid')) {
            delete controls[controlName].errors['invalid'];
            controls[controlName].updateValueAndValidity();
          }
        });
    });
  }

  login() {
    //prevent login if form is invalid
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    this.errorMessage = null;
    this.authenticating = true;

    const returnToOriginalState = () => {
      const state = this.returnTo.state();
      const params = this.returnTo.params();
      const options = Object.assign({}, this.returnTo.options(), {reload: true});
      this.$state.go(state, params, options);
    };

    this.authService.login(this.loginForm.get('email').value as string,
      this.loginForm.get('password').value as string)
      .pipe(finalize(() => {
          this.authenticating = false;
        }
      ))
      .subscribe(
        //() => {
        //this.$state.go('app.home')
        //},
        returnToOriginalState,
        () => {
          //this.errorMessage = "Email and/or password are incorrect";
          this.errorMessage = 'Sorry, something went wrong, please try again later.';
          Object.keys(controls)
            .forEach(controlName => controls[controlName].setErrors({invalid: true}));
        },
      );
  }

  toggleVisibility() {
    switch (this.passwordFieldType) {
      case 'text':
        this.passwordFieldType = 'password';
        break;
      case 'password':
        this.passwordFieldType = 'text';
    }
  }
}
