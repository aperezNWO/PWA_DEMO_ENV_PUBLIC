export enum LogType {
      Info  = 1
    , Debug = 2
    , Error = 3
};
//
export interface LogEntry {
  id_Column   :string;
  pageName    :string;
  accessDate  :string;
  ipValue     :string;
}
//
export interface PersonEntity 
{
    id_Column       : string;
    ciudad          : string;
    nombreCompleto  : string;
}
//
export class _vertexSize
{
    //
    constructor(public _index : number, public _value : string)
    {
        //
    }
}
//
export class  SearchCriteria
{
    //
    constructor(
        public    P_DATA_SOURCE_ID   : string,
        public    P_ID_TIPO_LOG      : string,
        public    P_ROW_NUM          : string,
        public    P_FECHA_INICIO     : string,
        public    P_FECHA_FIN        : string,
        public    P_FECHA_INICIO_STR : string,
        public    P_FECHA_FIN_STR    : string  
    )
    {
        //
    }
}
//
export class SortInfo 
{
    constructor (
         public value    :string
        ,public swap     :boolean
    )
    {
        //
    }
}
//
export class _languageName
{
    //
    constructor(public _index : number, public _value : string, public _selected : boolean)
    {
        //
    }
}
//
export class ListItem
{
    //
    constructor(public _index : number, public _value : string, public _selected : boolean)
    {
        //
    }
}
//
export class DiskInfo
{
    //
    constructor(public value : number, public graph : string)
    {
        //
    }
}
//
export interface HanoiStep
{
    //
    n    : number;
    from : string;
    to   : string;
}

export interface _BaseModel 
{
    id               : number;
    done             : boolean;
    name             : string;
    description      : string;
    field_1          : string;
    field_2          : string;
    field_3          : string;
    field_4          : string;
    field_5          : string;
    field_6          : string;
    field_7          : string;
    field_8          : string;
    field_9          : string;
    field_10         : string;
}