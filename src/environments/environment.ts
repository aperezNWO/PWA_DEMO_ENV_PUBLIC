interface EnvironmentConfig {
    production              : boolean; 
    externalConfig          : {};                //
    //pageSettingDictionary   : PageSettingDictionary;
    /*
    currentUserId           : number;
    currentUserRoles        : string;     
    usersInfo               : [];                // 
    routesList              : [];                // 
    usersList               : [];                // 
    usersDictionary         : [];                // 
    jsonList                : PageSetting[];     // */
    scmList                 : [],                //  
    LLMList                 : []                 //
}


export const _environment : EnvironmentConfig  = {
    production: true, // Set to true in environment.prod.ts
    externalConfig          : {},        // 
    //pageSettingDictionary   : {},
    /*
    currentUserId           : 0,       
    currentUserRoles        : "",      
    usersInfo               : [],        // 
    routesList              : [],        // 
    usersList               : [],        // 
    usersDictionary         : [],        // 
    jsonList                : [],        // */
    scmList                 : [],                //      
    LLMList               : []         // 
};
