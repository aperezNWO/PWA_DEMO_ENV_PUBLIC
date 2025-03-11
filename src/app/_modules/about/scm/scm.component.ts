import { Component,  QueryList, ViewChildren               } from '@angular/core';
import { _environment                                      } from 'src/environments/environment';
import { SiteRole                                          } from 'src/app/_models/common/common';
import { SearchService                                     } from 'src/app/_services/searchService/search.service';
import { _BaseModel                                        } from 'src/app/_models/common/entityInfo.model';
import { _BaseSortEvent, BaseSortableHeader                                    } from 'src/app/_headers/sortable.directive';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css']
})
export class SCMComponent {
  //
 	public __pages!:     Observable<_BaseModel[]>;
	public __total!:     Observable<number>;
  //
  @ViewChildren(BaseSortableHeader) _headers: QueryList<BaseSortableHeader> | undefined;
  //
  public ConfigRoleString: string = SiteRole.RoleConfig.toString();
 //////////////////////////////////////////////////////////
  //
  constructor(
    public searchService         : SearchService
  ) 
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
  //////////////////////////////////////////////////////////
  speakText(param_searchTerm : string) : void 
  {
      //
      console.log("Speak Text. Caught Event");
      
      this.searchService.searchTerm = param_searchTerm;
  }
  //
  clearText() : void
  {
      this.searchService.searchTerm = "";
  }
} 