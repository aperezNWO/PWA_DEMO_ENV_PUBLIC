import { Component, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Directive, EventEmitter, Input, Output            } from '@angular/core';
import { DecimalPipe                                       } from '@angular/common';
import { _Route, routes                                    } from '../../../app-routing.module';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
//
type SortDirection = 'asc' | 'desc' | '';
//
type SortColumn = keyof _Route | '';
//
//
const pagerotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
//
interface SearchState {
      page          : number;
      pageSize      : number;
      searchTerm    : string;
      sortColumn    : SortColumn;
      sortDirection : SortDirection;
}
//
interface BaseSortEvent {
  column   : SortColumn;
  direction: SortDirection;
}
//
interface BaseSearchResult {
  searchPages : _Route[];
  total       : number;
}   
//
function matches(netcoreConfigPagelist: _Route, term: string, pipe: PipeTransform) {
    return (
      netcoreConfigPagelist.caption?.toLowerCase().includes(term?.toLowerCase())        
    );
}

//
@Directive({
  selector: 'th[sortevent]',
  host: {
    '[class.asc]' : 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)'     : 'rotatePage()',
  },
})
class BaseSortableHeader {
  //
  @Input() sortable   : SortColumn    = '';
  @Input() direction  : SortDirection = '';
  @Output() sortevent = new EventEmitter<BaseSortEvent>();
  //
  rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({
       column   : this.sortable,
       direction: this.direction
    });
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  //
  @ViewChildren(BaseSortableHeader) headers: QueryList<BaseSortableHeader> | undefined;
  //
  public _loading = new BehaviorSubject<boolean>(true);
  public _total   = new BehaviorSubject<number>(0);
  public _search$ = new Subject<void>();
  //
  public _Pagelist = new BehaviorSubject<_Route[]>([]);
  //
  public _state: SearchState = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  //////////////////////////////////////////////////////////
  //
  constructor(
    private pipe: DecimalPipe,
  ) 
  {
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
  }
  //
  private _search(): Observable<BaseSearchResult> {
    //
    let _searchPages: any;
    let _total: any;
    let _searchResult: BaseSearchResult = { searchPages: _searchPages, total: _total };

    // 0. get state
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. get data
    _searchPages   = routes;

    // 2. filter
    _searchPages = _searchPages.filter((_searchPage: _Route) => matches(_searchPage, searchTerm, this.pipe));
    _total       = _searchPages.length;

    // 3. paginate
    _searchPages = _searchPages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

    // 4. return
    _searchResult = { searchPages: _searchPages, total: _total };

    // 5. return
    return of(_searchResult);
  }
  //////////////////////////////////////////////////////////////////////
  // PROPERTIES
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
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  //
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }
  //
  private _set(patch: Partial<SearchState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
  //
  onSort({ column, direction }: BaseSortEvent) {
    // resetting other headers
    this.headers?.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    //
    this.sortColumn    = column;
    this.sortDirection = direction;
  }
  //////////////////////////////////////////////////////////
  speakText(param_searchTerm : string) : void 
  {
      //
      console.log("Speak Text. Caught Event");
      
      this.searchTerm = param_searchTerm;
  }
  //
  clearText() : void
  {
      this.searchTerm = "";
  }  
}

