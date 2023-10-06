import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {IData} from "../../Interfaces/Interface";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IMultiSelectOption, IMultiSelectSettings} from "ngx-bootstrap-multiselect";

@Component({
  selector: 'mina-modal-prime',
  templateUrl: './modal-prime.component.html',
  styleUrls: ['./modal-prime.component.scss']
})
export class ModalPrimeComponent implements OnInit  {
  data : IData | null  = null

  @Output() onAddData = new EventEmitter()
  visible: boolean = false;
  constructor(private modalServ:ModalService ) {
    this.modalServ.modalData.subscribe(data=>{
      this.data = data
      this.formGroup = new FormGroup({
        'len':new FormControl(this.data ===null ? '' :this.data.len,[Validators.required]),
        'status':new FormControl(this.data ===null ? null : this.data.status,[Validators.required])
      })
    })

  }
  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.modalServ.isModalOpened.subscribe(isOpen=>{
      this.visible = isOpen
    })



  }






  modalRef !:NgbModalRef

  formGroup !: FormGroup

  myOptions : IMultiSelectOption[] =[
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ]





  open() {
  }

  selectSettings : IMultiSelectSettings = {
    checkedStyle:'glyphicon',
    selectionLimit:1,
    autoUnselect:true,
    closeOnSelect:true
  }

  addData(){
    if(this.formGroup.valid){
      const newData : IData = this.data === null ?  {id:0,len:'',wkt:'',status: 0} : {...this.data}
      newData.len = this.formGroup.value.len
      newData.status = this.formGroup.value.status
      // this.onAddData.emit(newData)

      this.modalServ.sendData(newData)
      this.modalRef.close()
      this.formGroup.setValue({len: '',status: null})
    }
  }


  testFunction(){
    this.open()
  }

}
