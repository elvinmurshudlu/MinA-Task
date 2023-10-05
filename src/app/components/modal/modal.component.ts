import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {IMultiSelectOption, IMultiSelectSettings} from "ngx-bootstrap-multiselect";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IData} from "../../Interfaces/Interface";

@Component({
  selector: 'mina-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges{
  @Input() data :IData  = {id:0,status:null,len:''}
  @Output() onAddData = new EventEmitter()
  @ViewChild('content') content !: TemplateRef<any>

  modalRef !:NgbModalRef

  formGroup !: FormGroup

  myOptions : IMultiSelectOption[] =[
    { id: 0, name: '0' },
    { id: 1, name: '1' },
    { id: 2, name: '2' },
  ]

  ngOnChanges() {
    this.formGroup = new FormGroup({
      'len':new FormControl(this.data.len,[Validators.required]),
      'status':new FormControl(this.data.status == null ? {} : this.data.status,[Validators.required])
    })
  }




  constructor(private modalService: NgbModal) {}

  open() {
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
  }

  selectSettings : IMultiSelectSettings = {
    checkedStyle:'glyphicon',
    selectionLimit:1,
    autoUnselect:true
  }

  addData(){
    if(this.formGroup.valid){
      this.data.len = this.formGroup.value.len || ''
      this.data.status = this.formGroup.value?.status || 0
      this.onAddData.emit({status:'new',data:this.data})
      this.modalRef.close()
      this.formGroup.setValue({len: '',status: null})
    }

  }


  testFunction(){
    this.open()
  }

}
