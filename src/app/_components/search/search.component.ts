import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable                         } from 'rxjs';
import { _BaseSortEvent, BaseSortableHeader } from 'src/app/_headers/sortable.directive';
import { SiteRole                           } from 'src/app/_models/common/common';
import { _BaseModel                         } from 'src/app/_models/common/entityInfo.model';
import { SearchService                      } from 'src/app/_services/searchService/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {

  //
  public __pages!:     Observable<_BaseModel[]>;
  public __total!:     Observable<number>;
  //
  @ViewChildren(BaseSortableHeader) _headers: QueryList<BaseSortableHeader> | undefined;;  
  //
  public ConfigRoleString: string = SiteRole.RoleConfig.toString();

  constructor(public searchService         : SearchService)
  {
    //
    this.__pages     = this.searchService.Pagelist;
		this.__total     = this.searchService.total;
  }

  //
  onSort({ _column, _direction }: _BaseSortEvent) {
    // resetting other headers
    this._headers?.forEach((__header) => {
      if (__header.sortable !== _column) {
        __header.direction = '';
      }
    });
    //
    this.searchService.sortColumn    = _column;
    this.searchService.sortDirection = _direction;
  }
 }
