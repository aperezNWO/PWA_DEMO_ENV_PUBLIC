import { PageSetting, PageSettingDictionary } from "src/app/_models/common/common";

interface EnvironmentConfig {
    production              : boolean; 
    externalConfig          : {};                //
    pageSettingDictionary   : PageSettingDictionary;
    currentUserId           : number;
    currentUserRoles        : string;     
    usersInfo               : [];                // 
    usersDictionary         : [];                // 
    routesList              : [];                // 
    usersList               : [];                // 
    jsonList                : PageSetting[];     // 
    scmList                 : [],                //  
    LLMList                 : []                 //
}


export const _environment : EnvironmentConfig  = {
    production: true, // Set to true in environment.prod.ts
    externalConfig          : {},        // 
    pageSettingDictionary   : {},
    currentUserId           : 0,       
    currentUserRoles        : "",      
    usersInfo               : [],        // 
    usersDictionary         : [],        // 
    routesList              : [],        // 
    usersList               : [],        // 
    jsonList                : [],        // 
    scmList                 : [],        //      
    LLMList                 : []         // 
};
