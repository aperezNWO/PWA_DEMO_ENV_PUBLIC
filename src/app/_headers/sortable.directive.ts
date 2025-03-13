import { Directive, Input, Output, EventEmitter, PipeTransform } from "@angular/core";
import { _BaseModel                                            } from "../_models/common/entityInfo.model";

// 1.
export type _SortDirection = 'asc' | 'desc'   | '';
export type _SortColumn    = keyof _BaseModel | '';
// 2. 
export const pagerotate: { [key: string]: _SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
// 3.
export interface _BaseSortEvent {
  _column    : _SortColumn;
  _direction : _SortDirection;
}
// 1.
export interface _BaseSearchResult {
  searchPages : _BaseModel[];
  total       : number;
} 
// 2.
export interface _SearchState {
    page          : number;
    pageSize      : number;
    searchTerm    : string;
    sortColumn    : _SortColumn;
    sortDirection : _SortDirection;
}
// 3.
export const compare = (v1: string | number | boolean, v2: string | number | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
// 4.
export function sort(pagelist: _BaseModel[], column: _SortColumn, direction: string): _BaseModel[] {
  if (direction === '' || column === '') {
    return pagelist;
  } else {
    return [...pagelist].sort((a, b) => { 
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
// 5.
export function matches(scmList: _BaseModel, term: string, pipe: PipeTransform) {
  return (
    scmList.name?.toLowerCase().includes(term?.toLowerCase())        ||       
    scmList.description?.toLowerCase().includes(term?.toLowerCase()) ||              
    scmList.field_1?.toLowerCase().includes(term?.toLowerCase())     ||    
    scmList.field_2?.toLowerCase().includes(term?.toLowerCase())     ||    
    scmList.field_3?.toLowerCase().includes(term?.toLowerCase())     ||  
    scmList.field_4?.toLowerCase().includes(term?.toLowerCase())     || 
    scmList.field_5?.toLowerCase().includes(term?.toLowerCase())     || 
    scmList.field_6?.toLowerCase().includes(term?.toLowerCase())     || 
    scmList.field_7?.toLowerCase().includes(term?.toLowerCase())     
  );
}
// 4. 
@Directive({
  selector: 'th[sortevent]',
  //standalone: true, // ???
  host: {
    '[class.asc]'  : 'direction === "asc"',
    '[class.desc]' : 'direction === "desc"',
    '(click)'      : 'rotatePage()',
  },
})
export class BaseSortableHeader {
  //
  @Input() sortable  : _SortColumn = '';
  @Input() direction : _SortDirection = '';
  @Output() sortevent = new EventEmitter<_BaseSortEvent>();
  //
  rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({
       _column   : this.sortable,
       _direction: this.direction
    });
  }
}
