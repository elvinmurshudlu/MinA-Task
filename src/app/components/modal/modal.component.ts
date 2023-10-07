import {
  Component,
  OnInit,
} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {IMultiSelectOption, IMultiSelectSettings} from "ngx-bootstrap-multiselect";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IData} from "../../Interfaces/Interface";
import {ModalService} from "../../services/modal.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'mina-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements   OnInit{
  data : IData | null  = null
  visible: boolean = false;
  constructor(private modalServ:ModalService ,private messageService: MessageService) {
    this.modalServ.modalData.subscribe(data=>{
      this.data = data
      this.formGroup = new FormGroup({
        'len':new FormControl(this.data ===null ? '' :this.data.len,[Validators.required]),
        'status':new FormControl(this.data ===null ? null : this.data.status,[Validators.required])
      })
    })

  }

  ngOnInit() {
    this.modalServ.isModalOpened.subscribe(isOpen=>{
      this.visible = isOpen
    })
  }

  formGroup !: FormGroup

  myOptions : IMultiSelectOption[] =[
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ]
  selectSettings : IMultiSelectSettings = {
    checkedStyle:'glyphicon',
    selectionLimit:1,
    autoUnselect:true,
    closeOnSelect:true,

  }

  addData(){
    if(this.formGroup.valid){
      const newData : IData = this.data === null ?  {id:0,len:'',wkt:'',status: 0} : {...this.data}
      newData.len = this.formGroup.value.len
      newData.status = this.formGroup.value.status
      this.modalServ.sendData(newData)
      this.formGroup.setValue({len: '',status: null})
    }else {
      this.messageService.add({ severity: 'error', summary: 'Tamamlanmadı', detail: 'Len və Status məlumatlarını əlavə edin' });
    }
  }

  closeModal(){
    this.modalServ.setOpen(false)
  }

}
