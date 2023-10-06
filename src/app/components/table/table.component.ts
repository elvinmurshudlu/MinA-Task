import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Tabulator as TypeTabulator, TabulatorFull as Tabulator,ColumnDefinition} from 'tabulator-tables';
import * as XLSX from 'xlsx';
import {IData, IModifyData} from "../../Interfaces/Interface";
import {ModalComponent} from "../modal/modal.component";
import {MapService} from "../../services/map.service";
import {ChartService} from "../../services/chart.service";

@Component({
  selector: 'mina-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild('table') table !: ElementRef
  @ViewChild(ModalComponent,{static:false}) childrenModal !:ModalComponent

  tabulatorTable !:TypeTabulator

  modalData:IData | null = null
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
        // console.log(cell.getRow().getData()['wkt'])
        this.mapService.changeWkt(cell.getRow().getData()['wkt'])

      }},
    {title:'',formatter:this.deleteIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
        this.tabulatorTable.deleteRow(cell.getRow().getIndex())

      }},
    {title:'',formatter:this.editIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{


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


  addRow(event:IData){
    if(this.modalData == null){
      const lastData  = this.tabulatorTable.getData()[0] as IData
      event.id = (lastData?.id || 0) +1
      this.tabulatorTable.addRow(event,true)
    }else if(this.modalData){
      const olderData = this.modalData
      const newData = {...event}
      this.tabulatorTable.updateData([olderData,newData])
    }
    this.modalData = null
  }

  generateTable(){
    this.tabulatorTable = new Tabulator(this.table.nativeElement, {
      data:this.data,
      importFormat:"array",
      columns:this.columns,
      pagination:true,
      paginationSize:8,
      paginationSizeSelector:[8, 10,15,20],
    });





  }




  ngAfterViewInit() {
    this.generateTable()

  }


  constructor(private  mapService:MapService,private chartServ:ChartService) {
  }

  currentData(){
    console.log(JSON.stringify(this.tabulatorTable.getData('visible')))

  }

  analysisOne(){
    const filteredData : IData[] = this.tabulatorTable.getData('visible')

    const counter:{[key:string]:any} = {total:0}

    const data = []
    const label = []

    filteredData.forEach((data,i)=>{

      if(counter[data.status]){
        counter[data.status] +=1
      }else {
        counter[data.status] =1
      }
      counter['total'] +=1

    })

    for (let key in counter){

      if (key !="total"){
        let pergentage = (counter[key] / counter['total'])*100
        let labelItem = key + ": " + pergentage +"%"
        label.push(labelItem)
        data.push(counter[key])
      }

    }

    // console.log(counter,label,data)


    this.chartServ.addChartDetails({type:'pie',data:data,labels:label})

  }
  analysisTwo(){
    const filteredData : IData[] = this.tabulatorTable.getData('visible')

    const counter:{[key:string]:any} = {}

    const data = []
    const label = []

    filteredData.forEach((data,i)=>{

      if(counter[data.status]){
        counter[data.status] +=1
      }else {
        counter[data.status] = +(data.len || 0)
      }
      counter['total'] +=1

    })

    for (let key in counter){

      if (key !="total"){
        let pergentage = (counter[key] / counter['total'])*100
        let labelItem = key + ": " + pergentage +"%"
        label.push(labelItem)
        data.push(counter[key])
      }

    }

    // console.log(counter,label,data)


    this.chartServ.addChartDetails({type:'bar',data:data,labels:label})

  }


}
