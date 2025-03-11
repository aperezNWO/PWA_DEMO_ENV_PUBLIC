import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { _BaseModel                             } from "../_models/common/entityInfo.model";

// 1.
export type _SortDirection = 'asc' | 'desc' | '';
export type _SortColumn    = keyof _BaseModel | '';
// 2. 
export const pagerotate: { [key: string]: _SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
// 3.
export interface _BaseSortEvent {
  _column    : _SortColumn;
  _direction: _SortDirection;
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
