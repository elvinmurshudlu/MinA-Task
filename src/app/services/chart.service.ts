import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IChartInformation} from "../Interfaces/Interface";




@Injectable({
  providedIn: 'root'
})
export class ChartService {

  chartInformation = new Subject<IChartInformation>()

  constructor() { }


  addChartDetails(details:IChartInformation){
    this.chartInformation.next(details)

  }


}
