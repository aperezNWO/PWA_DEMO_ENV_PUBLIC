import { Injectable, ViewChildren, QueryList, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { _environment } from "src/environments/environment";
import { SiteRole } from "../_models/common/common";
import { AuthService } from "../_services/authService/auth.service";
import { ConfigService } from "../_services/ConfigService/config.service";
import { BaseSortableHeader, _BaseSortEvent } from "../_headers/BaseSortableHeader.directive";
import { BaseService } from "../_services/baseService/base.service";
import { _BaseModel } from "../_models/entityInfo.model";


@Injectable({
	providedIn: 'root'
})
export class BaseComponent
{
    //
    @ViewChildren(BaseSortableHeader) headers: QueryList<BaseSortableHeader> | undefined;
    //
	public PagesList!       : Observable<_BaseModel[]>;
	public total!           : Observable<number>; 
	//
	public ConfigRoleString : string = SiteRole.RoleConfig.toString(); 
    //
    constructor( public __service       : BaseService,
                 public __authService   : AuthService,
                 public __configService : ConfigService,
                 @Inject('dictionaryKey') public _dictionaryKey: string,
               )
    {
        //
        this.PagesList       = of([]);
        //
        const pageSetting    = _environment.pageSettingDictionary[_dictionaryKey];
        //
        let _environmentList : string[] = [];

        __configService.loadJsonData(pageSetting.p_Path,
                                    _environmentList).then(() => {
            //
            this.__service._SEARCH_PAGES.splice(0,this.__service._SEARCH_PAGES.length);
            //
            _environmentList.forEach((element: any) => {
                this.__service._SEARCH_PAGES.push(element);
            });
            //    
            this.PagesList  = __service.Pagelist;
            this.total      = __service.total;
        });
    }
    //
    onSort({ _column, _direction }: _BaseSortEvent) {
        // resetting other headers
        this.headers?.forEach((header) => {
            if (header.sortable !== _column) {
                header.direction= '';
            }
        });
        //
        this.__service.sortColumn    = _column;
        this.__service.sortDirection = _direction;
    }
}