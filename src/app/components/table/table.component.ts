import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Tabulator as TypeTabulator, TabulatorFull as Tabulator,ColumnDefinition} from 'tabulator-tables';
import * as XLSX from 'xlsx';
import {IData,} from "../../Interfaces/Interface";
import {MapService} from "../../services/map.service";
import {ChartService} from "../../services/chart.service";
import {ModalService} from "../../services/modal.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'mina-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild('table') table !: ElementRef

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
        this.mapService.changeWkt(cell.getRow().getData()['wkt'])
      }},
    {title:'',formatter:this.deleteIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
        this.tabulatorTable.deleteRow(cell.getRow().getIndex())
      }},
    {title:'',formatter:this.editIcon, width:40, hozAlign:"center",cellClick:(e,cell)=>{
          this.modalData = cell.getRow().getData()
          this.modalServ.setOpen(true,cell.getRow().getData())
      }},
  ]

  data :IData[] = []
  constructor(private  mapService:MapService,private chartServ:ChartService , private modalServ:ModalService,private messageService: MessageService) {
    this.modalServ.transferredData.subscribe(data=>{
      this.addRow(data)
      this.modalServ.setOpen(false)
    })

  }

  onFileChange(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.data = (XLSX.utils.sheet_to_json(worksheet, )).reverse() as  IData[];
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
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Row was added' });
    }else if(this.modalData){
      const olderData = this.modalData
      const newData = {...event}
      this.tabulatorTable.updateData([olderData,newData])
      this.messageService.add({ severity: 'success', summary: 'Changed', detail: 'Row was changed' });

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
  openModal(){
      this.modalServ.setOpen(true)
  }
  analysisOne(){
    const filteredData : IData[] = this.tabulatorTable.getData('visible')

    if(!filteredData.length) {
      this.messageService.add({ severity: 'warn', summary: 'Boş cədvəl', detail: 'Cədvələ məlumat əlavə edin' });

      return
    }

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
        let labelItem = "Status-" + key + ": " + pergentage.toFixed(2) +"%"
        label.push(labelItem)
        data.push(counter[key])
      }

    }
    this.chartServ.addChartDetails({type:'pie',data:data,labels:label})
  }
  analysisTwo(){
    const filteredData : IData[] = this.tabulatorTable.getData('visible')

    if(!filteredData.length) {
      this.messageService.add({ severity: 'warn', summary: 'Boş cədvəl', detail: 'Cədvələ məlumat əlavə edin' });

      return
    }

    const counter:{[key:string]:any} = {}

    const data = []
    const label = []

    filteredData.forEach((data,i)=>{

      if(counter[data.status]){
        counter[data.status] += +(data.len || 0)
      }else {
        counter[data.status] = +(data.len || 0)
      }

    })

    for (let key in counter){
        label.push("Status-" +key)
        data.push(counter[key])

    }
    this.chartServ.addChartDetails({type:'bar',data:data,labels:label})
  }

}
