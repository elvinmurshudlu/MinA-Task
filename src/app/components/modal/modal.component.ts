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
  @Input() data :IData | null  = null
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
      'len':new FormControl(this.data ===null ? '' :this.data.len,[Validators.required]),
      'status':new FormControl(this.data ===null ? {} : this.data.status,[Validators.required])
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

      const newData = this.data === null ?  {id:0,len:'',wkt:'',status: 0} : {...this.data}
      newData.len = this.formGroup.value.len
      newData.status = this.formGroup.value.status
      this.onAddData.emit({status:this.data === null ? 'new' : 'modify',data:newData})
      this.modalRef.close()
      this.formGroup.setValue({len: '',status: null})


    }

  }


  testFunction(){
    this.open()
  }

}
