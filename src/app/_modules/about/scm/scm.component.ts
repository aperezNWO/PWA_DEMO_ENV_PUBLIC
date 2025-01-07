import { Component, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Directive, EventEmitter, Input, Output            } from '@angular/core';
import { DecimalPipe                                       } from '@angular/common';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { _environment                                      } from 'src/environments/environment';
import { SiteRole } from 'src/app/_models/common/common';
//
export interface _SCMItem 
{
    id           : number;
    done         : boolean;
    name         : string;
    description  : string;
    field_1      : string;
    field_2      : string;
    field_3      : string;
    field_4      : string;
    field_5      : string;
    field_6      : string;
    field_7      : string;
  }
//
type _SortColumn = keyof _SCMItem | '';
//
interface _BaseSortEvent {
  column    : _SortColumn;
  direction: _SortDirection;
}
//
interface _BaseSearchResult {
  searchPages : _SCMItem[];
  total       : number;
}   

type _SortDirection = 'asc' | 'desc' | '';
//
const pagerotate: { [key: string]: _SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
//
interface _SearchState {
      page          : number;
      pageSize      : number;
      searchTerm    : string;
      sortColumn    : _SortColumn;
      sortDirection : _SortDirection;
}
//
function matches(scmList: _SCMItem, term: string, pipe: PipeTransform) {
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

//
@Directive({
  selector: 'th[_sortevent]',
  host: {
    '[class.asc]': '_direction === "asc"',
    '[class.desc]': '_direction === "desc"',
    '(click)': '_rotatePage()',
  },
})
class BaseSortableHeader {
  //
  @Input() sortable: _SortColumn = '';
  @Input() direction: _SortDirection = '';
  @Output() sortevent = new EventEmitter<_BaseSortEvent>();
  //
  _rotatePage() {
    this.direction = pagerotate[this.direction];
    this.sortevent.emit({
       column   : this.sortable,
       direction: this.direction
    });
  }
}

@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css']
})
export class SCMComponent {
  //
  @ViewChildren(BaseSortableHeader) headers: QueryList<BaseSortableHeader> | undefined;
  //
  public ConfigRoleString: string = SiteRole.RoleConfig.toString();
  //
  public _loading = new BehaviorSubject<boolean>(true);
  public _total   = new BehaviorSubject<number>(0);
  public _search$ = new Subject<void>();
  //
  public _Pagelist = new BehaviorSubject<_SCMItem[]>([]);
  //
  public _state: _SearchState = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  //////////////////////////////////////////////////////////
    recognition         : any;
    isListening         : boolean   = false;
    transcript          : string    = '';
    error               : string    = '';
    ListeningButtonIconOn : string  = './assets/images/mic_on.gif';
    ListeningButtonIconOff: string  = './assets/images/mic_off.gif';
    SpeakerIcon           : string  = './assets/images/speaker_on.gif';
    clearFormIcon         : string  = './assets/images/clearForm.gif';;
 
  //
  constructor(
    private pipe: DecimalPipe,
    //public _authService: AuthService,
  ) 
  {
    //
    this.InitializeSpeechRecognition();
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
  private _search(): Observable<_BaseSearchResult> {
    //
    let _searchPages: any;
    let _total: any;
    let _searchResult: _BaseSearchResult = { searchPages: _searchPages, total: _total };

    // 0. get state
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    //
    console.log("search : " + JSON.stringify(_environment.scmList));
    _searchPages   = _environment.scmList;

    // 2. filter
    _searchPages = _searchPages.filter((_searchPage: _SCMItem) => matches(_searchPage, searchTerm, this.pipe));
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
  //
  onSort({ column, direction }: _BaseSortEvent) {
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
  
  InitializeSpeechRecognition():void {
    // Initialize the SpeechRecognition object
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-CO'; // Set language
      this.recognition.interimResults = false; // Only final results
      this.recognition.maxAlternatives = 1;

      // Event handlers
      this.recognition.onresult = (event: any) => {
        //
        this.transcript = event.results[0][0].transcript;
        console.log('Transcript:', this.transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.error = event.error;
        this.isListening = false;
        console.error('Error:', this.error);
      };

      this.recognition.onend = () => {
        //
        console.log('Recognition ended.');
      };
    } else {
      alert('Speech Recognition API is not supported in your browser.');
    }
  }
  //
  startListening() {
    //
    if (this.recognition) {
      console.log('listening started');
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition) {
      console.log('listening ended');
      //
      this.isListening = false;
      this.recognition.stop()
    }
  }

  speakText() {
    if (this.transcript) {
      //
      const utterance = new SpeechSynthesisUtterance(this.transcript);
      utterance.lang = 'es-CO';
      window.speechSynthesis.speak(utterance);
      //
      this.searchTerm = this.transcript;
      //
    } else {
      alert('No text to speak!');
    }
  }

  clearText()
  {
      this.searchTerm = "";
  }
} 