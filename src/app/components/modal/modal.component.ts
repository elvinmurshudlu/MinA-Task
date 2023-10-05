import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {IMultiSelectOption, IMultiSelectSettings} from "ngx-bootstrap-multiselect";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'mina-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() lastIndex :number = 0
  @Output() onAddData = new EventEmitter()

  modalRef !:NgbModalRef

  formGroup = new FormGroup({
    'len':new FormControl('',[Validators.required]),
    'status':new FormControl({},[Validators.required])
  })

  constructor(private modalService: NgbModal) {}

  open(content:TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })


  }


  optionsModel !: number[];
  myOptions !: IMultiSelectOption[];
  selectSettings : IMultiSelectSettings = {
    checkedStyle:'glyphicon',
    selectionLimit:1,
    autoUnselect:true
  }

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
    ];
  }
  onChange() {
    // console.log(this.optionsModel);
  }


  addData(){

    if(this.formGroup.valid){

      const data :{id:any,len:any,wkt:any,status:any} = {id:600,len:'',wkt:'',status:0}

      data.id = this.lastIndex +1
      data.len = this.formGroup.value.len
      data.status = this.formGroup.value.status

      this.onAddData.emit({status:'new',data:data})

      this.formGroup.value.len = ''
      this.formGroup.value.status = {}
      this.modalRef.close()
      this.formGroup.setValue({len: '',status: {}})


    }

  }

}
