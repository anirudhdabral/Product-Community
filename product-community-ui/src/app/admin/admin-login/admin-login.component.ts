import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent implements OnInit {
  authError: boolean = false;

  adminLoginForm = new FormGroup({
    adminId: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(999999)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.adminService.adminLogin(this.adminLoginForm.value);
    this.adminService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = true;
      }
    })
  }

  get adminid() { return this.adminLoginForm.get('adminId') }
  get password() { return this.adminLoginForm.get('password') }

}
