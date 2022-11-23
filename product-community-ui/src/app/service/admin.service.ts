import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = "http://localhost:8582/admin"
  isAdminLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  getAdmins(): Observable<Admin> {
    return this.http.get<Admin>(this.url + "/getAdmins")
  }

  adminLogin(data: any) {
    return this.http.get(this.url + "/login/" + data.adminId + "/" + data.password, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body) {
        this.isAdminLoggedIn.next(true);
        localStorage.setItem('admin', JSON.stringify(result.body))
        this.router.navigate(['admin-dashboard']);
      } else {
        this.isLoginError.emit(true);
      }
    })
  }

  reloadDashboard() {
    if (localStorage.getItem('teacher')) {
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-dashboard']);
    }
  }

}
