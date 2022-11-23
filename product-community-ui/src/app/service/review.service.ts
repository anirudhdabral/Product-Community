import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url = "http://localhost:8582/review"
  constructor(private http: HttpClient, private router: Router) { }

  getReviews() {
    return this.http.get(this.url + "/getReviews")
  }

  getReview(code: string): Observable<Review> {
    // this.http.get<Review>(this.url + "/" + code).subscribe((result: any) => {
    // }, (error) => {
    //   this.router.navigate(['error-page'])
    // });
    return this.http.get<Review>(this.url + "/" + code);
  }

  deleteReview(id: any): Observable<Review> {
    return this.http.delete<Review>(this.url + "/delete/" + id);
  }

  approveReview(id: any): Observable<Review> {
    return this.http.put<Review>(this.url + "/approveReview/" + id, Review);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.url + "/addReview", review)
  }




}
