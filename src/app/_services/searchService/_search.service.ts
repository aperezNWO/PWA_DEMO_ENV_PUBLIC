import { DecimalPipe                           } from "@angular/common";
import { Inject, Injectable                    } from "@angular/core";
import { _BaseModel                            } from "src/app/_models/entity.model";
import { _environment                          } from "src/environments/environment";
import { PAGE_ID, PAGE_SIZE, SEARCH_TERM       } from "src/app/_models/common";
import { ConfigService                                                                       } from "../ConfigService/config.service";
import { BackendService                                                                      } from "../BackendService/backend.service";
import { SpeechService                                                                       } from "../speechService/speech.service";
import { BehaviorSubject, Subject, tap, debounceTime, switchMap, delay, Observable, of       } from "rxjs";
import { _SearchState, _BaseSearchResult, matches, _SortColumn, _SortDirection, sort         } from "src/app/_directives/sortable.directive";

@Injectable({
  providedIn: 'root'
})
export class _SearchService  {
	// 1.
	public _loading               = new BehaviorSubject<boolean>(true);
	public _search$               = new Subject<void>();
	private _Pagelist             = new BehaviorSubject<_BaseModel[]>([]);
	public _total                 = new BehaviorSubject<number>(0);
	private _pageTitle            : string = "";
	private _PAGE_ID              : string = "";
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
	// 4.
	constructor(@Inject(PAGE_ID) 
				private PAGE_ID           : string,
				@Inject(PAGE_SIZE) 
				private PAGE_SIZE         : number,
				@Inject(SEARCH_TERM) 
				private SEARCH_TERM       : string,
				private pipe              : DecimalPipe,
				private __configService   : ConfigService,
				private backendService    : BackendService,
				private speechService     : SpeechService,
	) 
	{
		//
		this.GetData(PAGE_ID);
		//
		this.pageSize   = PAGE_SIZE;
		//
		this.searchTerm = SEARCH_TERM;
	}
	// 4. Get Data
	private GetData(PAGE_ID : string):void{

		this.__configService._loadMainPages().then( ()=> 
		{
				// 1. get data 
				this.pageTitle       = _environment.mainPageListDictionary[PAGE_ID ].page_name;
				const pageSetting    = _environment.mainPageListDictionary[PAGE_ID ];
				//
				this.__configService.loadJsonData(pageSetting.pages[0].url,
				this._environmentList).then(() => {
					/*
						In Angular and RxJS (Reactive Extensions for JavaScript), the pipe method is a core feature of Observables . 
						It allows you to combine multiple RxJS operators (like map, filter, debounceTime, etc.) 
						into a sequence or pipeline, which processes the data emitted by the Observable in a declarative way.
						The pipe method is used to apply transformations, filtering, error handling, 
						and other operations to the stream of data emitted by the Observable. 
						It makes Observables highly flexible and powerful for handling asynchronous data streams.
					*/
					this._search$
					.pipe(
					  tap(() => this._loading!.next(true)), // Step 1: Set loading state to true
					  debounceTime(200),                    // Step 2: Wait for 200ms of inactivity before proceeding
					  switchMap(() => this._search()),      // Step 3: Perform the search and cancel previous searches
					  delay(200),                           // Step 4: Add a 200ms delay after the search completes
					  tap(() => this._loading!.next(false)) // Step 5: Set loading state to false
					)
					.subscribe((result) => {                    // Step 6: Handle the search result
					  this._Pagelist!.next(result.searchPages); // Emit the list of pages
					  this._total!.next(result.total);          // Emit the total number of results
					});
					//
					this._search$.next();
					//
					console.info("speak " + this.pageTitle);
					//
					console.info("log   " + this.pageID);
					//
					this.speechService.speakTextCustom(this.pageTitle);
					//
					this.backendService.SetLog(this.pageTitle,this.pageID);
			    });
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

		// 2. sort
		_searchPages = sort(_searchPages, sortColumn, sortDirection);

		// 3. filter
		_searchPages = _searchPages.filter((_searchPage: _BaseModel) => matches(_searchPage, searchTerm, this.pipe));
		_total       = _searchPages.length;

		// 4. paginate
		_searchPages = _searchPages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

		// 5. return
		_searchResult = { searchPages: _searchPages, total: _total };

		// 5. return
		return of(_searchResult);
	}
	//////////////////////////////////////////////////////////////////////
	// 6. PROPERTIES
	//////////////////////////////////////////////////////////////////////
	//
	public get pageID()
	{
		return this._PAGE_ID;
	}
	public set pageID(value : string)
	{
		this._PAGE_ID = value;
	}
	//
	public get pageTitle()
	{
		return this._pageTitle
	}
	public set pageTitle(value : string)
	{
		this._pageTitle = value;
	}
	//
	public get total() {
		return this._total!.asObservable();
	}
	//
	public get loading() {
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
	public get page() {
		return this._state.page;
	}
	//
	public set page(page: number) {
		this._set({ page });
	}
	//
	public get pageSize() {
		return this._state.pageSize;
	}
	//
	public set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	//
	public get searchTerm() {
		return this._state.searchTerm;
	}
	//
	public set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	//
	public set sortColumn(sortColumn: _SortColumn) {
		this._set({ sortColumn });
	}
	//
	public set sortDirection(sortDirection: _SortDirection) {
		this._set({ sortDirection });
	}
	//
	public _set(patch: Partial<_SearchState>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}
	//////////////////////////////////////////////////////////
	public speakText(param_searchTerm : string) : void 
	{
		 //
		 //console.log("Speak Text. Caught Event");
		 
		 this.searchTerm = param_searchTerm;
	}
	//
	public clearText() : void
	{
		 this.searchTerm = "";
	}
}
