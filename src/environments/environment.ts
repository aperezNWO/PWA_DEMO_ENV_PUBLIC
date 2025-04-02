import { PageSettingDictionary, PageSetting, mainpage, MainPageSettingDictionary } from "src/app/_models/entity.model";

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
    mainPageList            : mainpage[];        //
    mainPageListDictionary  : MainPageSettingDictionary;
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
    LLMList                 : [],        // 
    mainPageList            : [],
    mainPageListDictionary  : {},        //
};
