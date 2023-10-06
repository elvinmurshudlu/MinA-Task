export interface IModifyData{
  status:"new" | "modify",
  data:IData
}


export interface IData {
  id  :number,
  len ?:string,
  wkt ?:string,
  status :number
}
// status :number |null | undefined


export interface IChartInformation{
  type:'pie' | 'bar',
  data:number[],
  labels:string[]
}
