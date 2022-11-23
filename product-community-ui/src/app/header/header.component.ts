import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  logoutMessage: boolean = false;
  check: boolean = true;
  adminMode: boolean = false;

  constructor(private router: Router, private userService: UserService, private adminService: AdminService) {
    this.userService.isUserLoggedIn.subscribe((result) => {
      this.check = result;
      this.logoutMessage = false;
    });

    this.adminService.isAdminLoggedIn.subscribe((result) => {
      this.adminMode = result;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.check = true;
    }
    else {
      this.check = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['home']);
    this.logoutMessage = true;
    this.ngOnInit();
  }

}
