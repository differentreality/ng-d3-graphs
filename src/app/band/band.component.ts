import { Component, OnInit, Input } from '@angular/core';
import { GraphOptions } from 'src/shared/models/graph-options.interface';
import * as d3 from 'd3';
import { ScaleOrdinal } from 'd3';

interface LabelsAndData {
  x: any;
  low: any;
  high: any;
}
@Component({
  selector: 'ng-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss']
})
export class BandComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  @Input() options: GraphOptions = { width: 300, height: 300, yAxisLabel: ''};
  labelsAndData: LabelsAndData[] = [];


  constructor() { }

  ngOnInit() {
    console.log(this.labels);
    console.log(this.data);
    this.labelsAndData = this.combineLabelsDataToOne();
    this.iniGraph();
  }

  private combineLabelsDataToOne(): LabelsAndData[] {
    const N = this.labels.length;
    const result: LabelsAndData[] = [];
    for (let index = 0; index < N; index++) {
      result.push({
        x: this.labels[index],
        low: this.data[index].low,
        high: this.data[index].high,
      });
    }
    return result;
  }

  private iniGraph() {

    const margin = { top: 20, right: 30, bottom: 50, left: 20 },
      height = 500,
      width = 800;

    const svg = d3
      .select('#band')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xRange = [margin.left];
    const xFactor = width / this.labels.length;
    for (let index = 1; index < this.labels.length; index++) {
      const factor = xFactor * index + margin.left;
      xRange.push(factor);
    }

    const x: ScaleOrdinal<any, any> = d3
      .scaleOrdinal()
      .domain(this.labels)
      .range(xRange);

    const y = d3.scaleLinear()
      .domain([d3.min(this.data, d => d.low), d3.max(this.data, d => d.high)]).nice(5)
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / this.labels.length)
            .tickSizeOuter(0)
        )
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(45)translate(-3, 10)')
        .style('text-anchor', 'start');

    svg.append('g')
      .call(xAxis);


    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(this.options.yAxisLabel));

    svg.append('g')
      .call(yAxis);

    const curve: any = d3.curveStep;
    const area = d3.area<LabelsAndData>()
      .curve(curve)
      .x(d => x(d.x))
      .y0(d => y(d.low))
      .y1(d => y(d.high));

    svg.append('path')
      .datum(this.labelsAndData)
      .attr('fill', 'steelblue')
      .attr('d', area);

    svg.append('path')
      .datum(this.combineLabelsDataToOne)
      .attr('fill', 'steelblue')
      .attr('d', area);

  }

}
