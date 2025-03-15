import { InjectionToken } from "@angular/core";
import { _environment                         } from "../../environments/environment";
import { _BaseModel                           } from "./entityInfo.model";

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
export interface PageSetting {
    f_Name           : string;
    p_Path           : string;
}
//
export interface PageSettingDictionary {
   [key: string]: PageSetting;
}
//
export const PAGE_ID   = new InjectionToken<string>('PAGE_ID'); 
export const PAGE_SIZE = new InjectionToken<number>('PAGE_SIZE'); 
//
export const ENV_LIST_SCM_CONFIG         = 'SCM_CONFIG';

export const ENV_LIST_ANGULAR_EDU        = 'ANGULAR_EDU';

export const ENV_LIST_ANGULAR_DEMO       = 'ANGULAR_DEMO';

export const ENV_LIST_CPP_DEMO           = 'CPP_DEMO';

export const ENV_LIST_NETCORE_DEMO       = 'NETCORE_DEMO';

export const ENV_LIST_NODEJS_DEMO        = 'NODEJS_DEMO';

export const ENV_LIST_SPRING_BOOT_DEMO   = 'SPRING_BOOT_DEMO';

export const ENV_LIST_DJANGO_PYTHON_DEMO = 'DJANGO_PYTHON_DEMO';









