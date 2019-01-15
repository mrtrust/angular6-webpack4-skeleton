import { Component, OnInit, Input } from '@angular/core';
import { finalize, switchMap } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authentication.service';


/**
 * Component for forget password
 */
@Component({
  styleUrls: ['forget-password.component.styl'],
  templateUrl: 'forget-password.component.html'
})
export class ForgetPasswordComponent implements OnInit {
  restoring: boolean;
  errorMessage: string;
  forgetPassordForm: FormGroup;
  step: number = 1;

  constructor(public authService: AuthenticationService,
              public fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgetPassordForm = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ],
      ],
    });
  }

  forgetPassword() {
    //prevent login if form is invalid
    if (this.forgetPassordForm.invalid) {
      const controls = this.forgetPassordForm.controls;
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }
    this.errorMessage = null;
    this.restoring = true;

    this.authService.forgetPassword(this.forgetPassordForm.get('email').value as string)
      .pipe(finalize(() => {
          this.restoring = false;
        }),
      )
      .subscribe(
        () => {
          this.step = 2;
        },
        () => {
          this.errorMessage = 'Email does not exist or we cannot restore password for this email.';
        },
      );
  }


}
