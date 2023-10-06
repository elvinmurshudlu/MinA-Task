import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {IData} from "../Interfaces/Interface";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isModalOpened = new Subject<boolean >()
  modalData = new BehaviorSubject<null|IData>(null)

  transferredData = new Subject<IData>()

  constructor() { }

  setOpen(isOpen:boolean,data:null|IData=null){
    this.isModalOpened.next(isOpen)
    this.modalData.next(data)
  }

  sendData(data:any){
    this.transferredData.next(data)

  }




}
