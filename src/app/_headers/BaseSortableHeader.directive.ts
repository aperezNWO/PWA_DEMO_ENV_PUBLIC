import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { _SortDirection, pagerotate } from "../_models/common/common";
import { _BaseModel } from "../_models/entityInfo.model";

//
export type _SortColumn               = keyof _BaseModel      | '';
//
export interface _BaseSortEvent {
	_column   :  _SortColumn;
	_direction:  _SortDirection;
}
//
@Directive({
	selector    : 'th[sortevent]',
	host        : {
		'[class.asc]'  : 'direction === "asc"',
		'[class.desc]' : 'direction === "desc"',
		'(click)'      : '_rotatePage()',
	},
})
export class BaseSortableHeader {
  //
  @Input()  sortable          :   _SortColumn    = '';
  @Input()  direction         :   _SortDirection = '';
  @Output() sortevent         =   new EventEmitter<_BaseSortEvent>();
  //
  _rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({ 
                _column   : this.sortable, 
                _direction: this.direction 
                });
  }
}
