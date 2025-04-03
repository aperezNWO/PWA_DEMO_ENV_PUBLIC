import { PageSettingDictionary, PageSetting, MainPage, MainPageSettingDictionary } from "src/app/_models/entity.model";

interface EnvironmentConfig {
    production              : boolean; 
    externalConfig          : {};                //
    pageSettingDictionary   : PageSettingDictionary;
    mainPageListDictionary  : MainPageSettingDictionary;
    currentUserId           : number;
    currentUserRoles        : string;     
    usersInfo               : [];                // 
    usersDictionary         : [];                // 
    routesList              : [];                // 
    usersList               : [];                // 
    jsonList                : PageSetting[];     // 
    mainPageList            : MainPage[];        //
    scmList                 : [],                //  
    LLMList                 : []                 //
}


export const _environment : EnvironmentConfig  = {
    production: true,                    // Set to true in environment.prod.ts
    externalConfig          : {},        // 
    pageSettingDictionary   : {},
    mainPageListDictionary  : {},
    currentUserId           : 0,       
    currentUserRoles        : "",      
    usersInfo               : [],        // 
    usersDictionary         : [],        // 
    routesList              : [],        // 
    usersList               : [],        // 
    jsonList                : [],        // 
    mainPageList            : [],
    scmList                 : [],        //      
    LLMList                 : [],        // 
};
