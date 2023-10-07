import { Injectable } from '@angular/core';
import { Subject} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  wktCoordinates = new Subject<string>()
  constructor(private messageService:MessageService) { }


  changeWkt(wkt:string){
    if(wkt ===''){
      this.messageService.add({ severity: 'warn', summary: 'No Wkt', detail: 'Wkt is not available!' });

    }
    this.wktCoordinates.next(wkt)
  }
}
