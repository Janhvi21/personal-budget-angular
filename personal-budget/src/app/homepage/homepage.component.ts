import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { isEmptyObject } from 'jquery';
import { DataService } from '../data.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  private svg;
  private margin = 50;
  private width = 750;
  private height = 470;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(public dataService: DataService) {}
  ngAfterViewInit(): void {
    // service call only if data is empty
    console.log('After View');
    if (
      isEmptyObject(this.dataService.data) ||
      isEmptyObject(this.dataService.dataSource)
    ) {
      this.dataService.getData();
    } else {
    }
    this.createSvg();
    this.createColors();

    setTimeout(() => {
      this.createChart();
      this.drawChart();
    }, 50);
  }
  // Using Chart.js
  createChart(): void {
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataService.dataSource,
    });
  }
  // Using D3
  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }
  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.dataService.data.map((d) => d.value))
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00',
      ]);
  }
  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    this.svg
      .selectAll('pieces')
      .data(pie(this.dataService.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.dataService.data))
      .enter()
      .append('text')
      .text((d) => d.data.labels)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 10);
  }
}
