import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {ChartService} from "../../services/chart.service";
@Component({
  selector: 'mina-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{

  selectedChart !:'pie' | 'bar' | null

  constructor(private chartSer:ChartService) {
  }

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  pieChartLegend = true;
  pieChartPlugins = [];


  barChartLegend = false;
  barChartPlugins = [];

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,

  };


  chartLabels:string[] = [ ];
  chartDatasets :{data:number[]}[] = [ {
    data: [ ]
  } ];




  ngOnInit() {
    this.chartSer.chartInformation.subscribe(detail=>{
      this.selectedChart = detail.type
      this.chartLabels = detail.labels;
      this.chartDatasets = [{data: detail.data}]


    })
  }



}
