import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:8582/user"
  isUserLoggedIn = new BehaviorSubject<boolean>(false)
  isUserLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.url + "/getUsers")
  }

  userLogin(data: any) {
    return this.http.get(this.url + "/login/" + data.emailId + "/" + data.password, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body) {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['all-products']);
      } else {
        this.isUserLoginError.emit(true);
      }
    }, (error) => {
      this.router.navigate(['error-page'])
    })
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "/register", user)
  }
}
