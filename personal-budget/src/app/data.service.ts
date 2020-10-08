import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public data = [];
  public result;
  constructor(private http: HttpClient) {}

  getData() {
    this.data = [];
    const promise = new Promise((resolve, reject) => {
      this.http
        .get('http://localhost:3000/budget')
        .toPromise()
        .then((res: any) => {
          this.data = res.myBudget;
          resolve();
        });
    });
    return promise;
  }
}
