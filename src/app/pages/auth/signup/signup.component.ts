import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserCredential } from '@firebase/auth-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
          ),
        ],
      ],
      name: [null, Validators.required],
    });
  }
  onSignupClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      this.signup();
    }
  }

  signup() {
    this._authService.signup(this.email.value, this.password.value).pipe(
      switchMap((user: any) => {
        return this._authService.createUser(
          user.user.uid,
          this.name.value,
          this.email.value
        );
      })
    ).subscribe(()=>{});
  }
  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Password not valid';
  }

  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }

  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }
  get name() {
    return this.formGroup.controls['name'] as FormControl;
  }
}
