import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  wktCoordinates = new BehaviorSubject('')
  constructor() { }
}
