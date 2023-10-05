import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Tabulator as TypeTabulator, TabulatorFull as Tabulator,ColumnDefinition} from 'tabulator-tables';
import * as XLSX from 'xlsx';
import {IData, IModifyData} from "../../Interfaces/Interface";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'mina-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit{
  @ViewChild('table') table !: ElementRef
@ViewChild(ModalComponent,{static:false}) childrenModal !:ModalComponent


  tabulatorTable !:TypeTabulator

  modalData:IData = {id:1,len:'',wkt:'',status:null}
  geoMapIcon = function(){
    return "<i class='pi pi-map-marker'></i>";
  };
  deleteIcon = function(){
    return "<i class='pi pi-delete-left'></i>";
  };
  editIcon = function(){
    return "<i class='pi pi-file-edit'></i>";
  };

  columns :ColumnDefinition[] = [{title:'Id',field:'id',headerFilter:'input',minWidth:40},
    {title:'len',field:'len',headerFilter:'input'},
    {title:'wkt',field:'wkt',headerFilter:'input'},
    {title:'status',field:'status',headerFilter:'input'},
    {title:"",formatter:this.geoMapIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
        // console.log(cell.getRow().getIndex())

      }},
    {title:'',formatter:this.deleteIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
        this.tabulatorTable.deleteRow(cell.getRow().getIndex())

      }},
    {title:'',formatter:this.editIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
        // console.log(cell.getRow().getData().name)
        console.log(cell.getRow().getIndex(),cell.getRow().getData())


          this.modalData = cell.getRow().getData()
          this.childrenModal.testFunction()

      }},
  ]

  data :IData[] = []




  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.data = (XLSX.utils.sheet_to_json(worksheet, )).reverse() as  IData[];
        console.log(this.data[0])
        this.generateTable()
      };
      reader.readAsBinaryString(file);
    }
  }


  addRow(event:IModifyData){
    if(event.status == 'new'){
      console.log(event   )
      const lastData  = this.tabulatorTable.getData()[0] as IData
      event.data.id = (lastData?.id || 0) +1
      this.tabulatorTable.addRow(event.data,true)
    }

  }

  generateTable(){
    this.tabulatorTable = new Tabulator(this.table.nativeElement, {
      data:this.data,
      importFormat:"array",
      columns:this.columns,
      pagination:true,
      paginationSize:6,
      paginationSizeSelector:[ 6, 8, 10,15,20],
    });

  }


  ngAfterViewInit() {
    this.generateTable()
  }

}
