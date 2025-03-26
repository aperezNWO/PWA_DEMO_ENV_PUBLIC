import { InjectionToken                       } from "@angular/core";
import { _environment                         } from "../../environments/environment";
import { _BaseModel                           } from "./entity.model";

////////////////////////////////////////////////////////////////////////////

//
export const PAGE_ID     = new InjectionToken<string>('PAGE_ID'); 
export const PAGE_SIZE   = new InjectionToken<number>('PAGE_SIZE');
export const PAGE_TITLE  = new InjectionToken<number>('PAGE_TITLE');
export const SEARCH_TERM = new InjectionToken<string>('SEARCH_TERM');  

////////////////////////////////////////////////////////////////////////////

export const ENV_LIST_SCM_CONFIG         = 'SCM_CONFIG';

export const ENV_LIST_ANGULAR_EDU        = 'ANGULAR_EDU';

export const ENV_LIST_ANGULAR_DEMO       = 'ANGULAR_DEMO';

export const ENV_LIST_CPP_DEMO           = 'CPP_DEMO';

export const ENV_LIST_NETCORE_DEMO       = 'NETCORE_DEMO';

export const ENV_LIST_NODEJS_DEMO        = 'NODEJS_DEMO';

export const ENV_LIST_SPRING_BOOT_DEMO   = 'SPRING_BOOT_DEMO';

export const ENV_LIST_DJANGO_PYTHON_DEMO = 'DJANGO_PYTHON_DEMO';

////////////////////////////////////////////////////////////////////////////







