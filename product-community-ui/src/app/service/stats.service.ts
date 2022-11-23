import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  url = "http://localhost:8582/stats"

  constructor(private http: HttpClient) { }
  
  getStats(){
    return this.http.get(this.url + "/getStats")
  }
}
