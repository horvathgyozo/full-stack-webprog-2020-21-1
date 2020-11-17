import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

import { User } from '@core/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected as: AuthService,
    private ns : NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login (form: FormGroup) {
    if (form.valid) {
      this.as.login(<User>form.value);
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}
