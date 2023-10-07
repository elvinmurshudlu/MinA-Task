

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
