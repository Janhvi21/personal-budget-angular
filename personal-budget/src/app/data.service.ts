import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

export class element {
  value: '';
  labels: '';
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#98abc5',
          '#8a89a6',
          '#7b6888',
          '#6b486b',
          '#a05d56',
          '#d0743c',
          '#ff8c00',
        ],
      },
    ],
    labels: [],
  };
  public data = [];
  public result;
  constructor(private http: HttpClient) {}

  getData(){
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        const ele = new element();
        ele.value = res.myBudget[i].budget;
        ele.labels = res.myBudget[i].title;
        this.data.push(ele);
      }
    });
  }
}
