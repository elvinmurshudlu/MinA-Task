import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  wktCoordinates = new Subject<string>()
  constructor() { }


  changeWkt(wkt:string){
    this.wktCoordinates.next(wkt)
  }
}
