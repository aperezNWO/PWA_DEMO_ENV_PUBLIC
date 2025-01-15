import { PipeTransform                        } from "@angular/core";
import { _environment                         } from "../../../environments/environment";
import { _SortColumn } from "src/app/_headers/BaseSortableHeader.directive";

//
export enum SiteRole
{
    RoleAnonyumous = 0,
    RoleAdmin      = 1,
    RoleMarketing  = 2,
    RoleConfig     = 3,
    RoleEducation  = 4
}
//
export type SiteRoleType   = SiteRole; 
//
export interface PageInfo
{
    url          : string;
    text         : string;
    pageRoles    : string;
}
//
export interface UserInfo
{
    userId     : number;
    fullName   : string;
    userName   : string;
    pwd        : string;
    userRoles  : string;
}
//
//
export class  LoginInfo
{
    //
    constructor(
        public    P_LOGIN_NAME       : string,
        public    P_LOGIN_PASSWORD   : string,
    )
    {
        //
    }
}
//
export type UserInfoType   = UserInfo; 
//
export type _SortDirection = 'asc' | 'desc' | '';
//
export const pagerotate: { [key: string]: _SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
//
export const compare = (v1: string | number | boolean, v2: string | number | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
//
export interface _BaseModel 
{
    id               : number;
    done             : boolean;
    name             : string;
    description      : string;
    field_1          : string;
    field_2          : string;
    field_3          : string;
    field_4          : string;
    field_5          : string;
    field_6          : string;
    field_7          : string;
    field_8          : string;
    field_9          : string;
    field_10         : string;
}

export interface _BaseSearchResult {
    searchPages : _BaseModel[];
    total       : number;
}   

export interface PageSetting {
    f_Name           : string;
    p_Path           : string;
}
//
export interface PageSettingDictionary {
   [key: string]: PageSetting;
}
 
//
export interface _SearchState {
	page          : number;
	pageSize      : number;
	searchTerm    : string;
	sortColumn    : _SortColumn;
	sortDirection : _SortDirection;
}
//
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
//
export function matches(netcoreConfigPagelist: _BaseModel, term: string, pipe: PipeTransform) {
	return (
		netcoreConfigPagelist.name.toLowerCase().includes(term?.toLowerCase())        ||
		netcoreConfigPagelist.description.toLowerCase().includes(term?.toLowerCase()) ||
		netcoreConfigPagelist.field_1?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_2?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_3?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_4?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_5?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_6?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_7?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_8?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_9?.toLowerCase().includes(term?.toLowerCase())    ||
		netcoreConfigPagelist.field_10?.toLowerCase().includes(term?.toLowerCase())    
	);
}

export const ENV_LIST_ANGULAR_DEMO      = 'ANGULAR_DEMO';

export const ENV_LIST_CPP_DEMO          = 'CPP_DEMO';

export const ENV_LIST_NETCORE_DEMO      = 'NETCORE_DEMO';

export const ENV_LIST_NODEJS_DEMO       = 'NODEJS_DEMO';

export const ENV_LIST_SPRING_BOOT_DEMO  = 'SPRING_BOOT_DEMO';

export const ENV_LIST_MARKETING_DEMO    = 'MARKETING_DEMO';

export const ENV_LIST_NODEJS_CONFIG     = 'NODEJS_CONFIG';

export const ENV_LIST_NETCORE_CONFIG    = 'NETCORE_CONFIG';

export const ENV_LIST_ANGULAR_CONFIG    = 'ANGULAR_CONFIG';

export const ENV_LIST_SPRING_BOOT_CONFIG  = 'SPRING_BOOT_CONFIG';

export const ENV_LIST_ANGULAR_EDU         = 'ANGULAR_EDU';
