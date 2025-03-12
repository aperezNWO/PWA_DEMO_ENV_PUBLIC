import { DecimalPipe                       } from "@angular/common";
import { Inject, Injectable, PipeTransform } from "@angular/core";
import { _SortDirection           } from "src/app/_headers/sortable.directive";
import { _BaseModel               } from "src/app/_models/common/entityInfo.model";
import { _environment             } from "src/environments/environment";
import { PAGE_ID, PAGE_SIZE       } from "src/app/_models/common/common";
import { ConfigService            } from "../ConfigService/config.service";
import { BehaviorSubject, Subject, tap, debounceTime, switchMap, delay, Observable, of } from "rxjs";

// 0.
export type _SortColumn               = keyof _BaseModel      | '';
// 1.
interface _BaseSearchResult {
	searchPages : _BaseModel[];
	total       : number;
} 
// 2.
interface _SearchState {
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
function matches(scmList: _BaseModel, term: string, pipe: PipeTransform) {
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

@Injectable({
  providedIn: 'root'
})
export class SearchService  {
	// 1.
	public _loading               = new BehaviorSubject<boolean>(true);
	public _search$               = new Subject<void>();
	private _Pagelist             = new BehaviorSubject<_BaseModel[]>([]);
	public _total                 = new BehaviorSubject<number>(0);
	// 1.
	private  _environmentList : string[] = [];
	// 2. 
	public _state: _SearchState = {
		page          : 1,
		pageSize      : 4,
		searchTerm    : '',
		sortColumn    : '',
		sortDirection : '',
	};
	// 3.
	// public _SEARCH_PAGES          : _BaseModel[] = [];
	// 4.
	constructor(@Inject(PAGE_ID) 
				private PAGE_ID           : string,
				@Inject(PAGE_SIZE) 
				private PAGE_SIZE         : number,
				private pipe              : DecimalPipe,
				private __configService   : ConfigService
	) 
	{
		//
		this.GetData(PAGE_ID);
		//
		this.pageSize = PAGE_SIZE;

	}
	// 4. Get Data
	private GetData(PAGE_ID : string):void{
			// 1. get data 
			const pageSetting    = _environment.pageSettingDictionary[PAGE_ID ];
			//
			this.__configService.loadJsonData(pageSetting.p_Path,
			this._environmentList).then(() => {
					//
					console.log("json data : " + JSON.stringify(this._environmentList));
					//
					this._search$
					.pipe(
						tap(() => this._loading!.next(true)),
						debounceTime(200),
						switchMap(() => this._search()),
						delay(200),
						tap(() => this._loading!.next(false)),
					)
					.subscribe((result) => {
						this._Pagelist!.next(result.searchPages);
						this._total!.next(result.total);
					});
				//
				this._search$.next();
			});
	}						
	// 5. 
	public _search(): Observable<_BaseSearchResult> {
		//
	    let _searchPages  : _BaseModel[] = [];
		let _total        : any;
		let _searchResult : _BaseSearchResult = { searchPages: _searchPages, total: _total };

		// 0. get state
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. get data 
		this._environmentList.forEach((element: any) => {
				_searchPages.push(element);
		});

		// 2. filter
		_searchPages = _searchPages.filter((_searchPage: _BaseModel) => matches(_searchPage, searchTerm, this.pipe));
		_total       = _searchPages.length;

		// 3. paginate
		_searchPages = _searchPages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

		// 4. return
		_searchResult = { searchPages: _searchPages, total: _total };

		// 5. return
		return of(_searchResult);
	}
	//////////////////////////////////////////////////////////////////////
	// 6. PROPERTIES
	//////////////////////////////////////////////////////////////////////
	//
	get total() {
		return this._total!.asObservable();
	}
	//
	get loading() {
		return this._loading!.asObservable();
	}
	//
	public get Pagelist() {
		return this._Pagelist!.asObservable();
	}
	//
	public set Pagelist(value: any) {
		this._Pagelist! = value;
	}
	//
	get page() {
		return this._state.page;
	}
	//
	set page(page: number) {
		this._set({ page });
	}
	//
	public get pageSize() {
		return this._state.pageSize;
	}
	//
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	//
	get searchTerm() {
		return this._state.searchTerm;
	}
	//
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	//
	set sortColumn(sortColumn: _SortColumn) {
		this._set({ sortColumn });
	}
	//
	set sortDirection(sortDirection: _SortDirection) {
		this._set({ sortDirection });
	}
	//
	private _set(patch: Partial<_SearchState>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}
	 //////////////////////////////////////////////////////////
	 public speakText(param_searchTerm : string) : void 
	 {
		 //
		 console.log("Speak Text. Caught Event");
		 
		 this.searchTerm = param_searchTerm;
	 }
	 //
	 public clearText() : void
	 {
		 this.searchTerm = "";
	 }
}
