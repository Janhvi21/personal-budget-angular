import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
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
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        //this.data.value[i] = res.data.myBudget[i].budget;
        //this.data.labels[i] = res.data.myBudget[i].title;
      }
      this.createChart();
      //createChartD3();
    });
  }
  createChart() {
    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: this.dataSource,
    });
  }
}
