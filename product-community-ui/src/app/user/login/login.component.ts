import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true
  validMail: string = '^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})$';
  passMatch: boolean = true
  isPresent: boolean = false;
  allUsers: any = []

  userAuthError: boolean = false;

  loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.pattern(this.validMail)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  signupForm = new FormGroup({
    signupEmailId: new FormControl('', [Validators.required, Validators.pattern(this.validMail)]),
    signupPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  newUser = new User()

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void { }

  switchToSignup() {
    this.showLogin = false
  }
  switchToLogin() {
    this.showLogin = true
  }

  checkPass() {
    if (this.signupForm.get('signupPassword')?.value == this.signupForm.get('confirmPassword')?.value) {
      this.passMatch = true
    }
    else {
      this.passMatch = false
    }
  }

  onLoginSubmit() {
    this.userService.userLogin(this.loginForm.value);
    this.userService.isUserLoginError.subscribe((isError) => {
      if (isError) {
        this.userAuthError = true;
      }
    })
  }

  onSignupSubmit() {
    const x: string = this.signupForm.value.signupEmailId as string
    var present: boolean = false
    this.allUsers.forEach(function (item: any) {
      if (item.userEmail === x) {
        present = true
      };
    });
    if (!present) {
      this.isPresent = false
      this.newUser.userEmail = this.signupForm.value.signupEmailId as string
      this.newUser.firstName = this.signupForm.value.firstName as string
      this.newUser.lastName = this.signupForm.value.lastName as string
      this.newUser.password = this.signupForm.value.signupPassword as string
      this.userService.saveUser(this.newUser).subscribe((data: any) => {
        this.newUser = data
      });
      this.switchToLogin()
    }
    else {
      this.isPresent = true
    }


  }

  get emailId() { return this.loginForm.get('emailId') }
  get password() { return this.loginForm.get('password') }
  get signupEmailId() { return this.signupForm.get('signupEmailId') }
  get signupPassword() { return this.signupForm.get('signupPassword') }
  get firstName() { return this.signupForm.get('firstName') }
  get lastName() { return this.signupForm.get('lastName') }
  get confirmPassword() { return this.signupForm.get('confirmPassword') }

}
