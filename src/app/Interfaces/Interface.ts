export interface IModifyData{
  status:"new" | "modify",
  data:IData
}


export interface IData {
  id  :number,
  len ?:string,
  wkt ?:string,
  status :number |null | undefined
}
