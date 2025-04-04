import { PageSettingDictionary, PageSetting, MainPage, MainPageSettingDictionary } from "src/app/_models/entity.model";

interface EnvironmentConfig {
    production              : boolean; 
    externalConfig          : {};                        //
    pageSettingDictionary   : PageSettingDictionary;     //
    mainPageListDictionary  : MainPageSettingDictionary; //
    jsonList                : PageSetting[];             // 
    mainPageList            : MainPage[];                //
    scmList                 : [];                        //  
}


export const _environment : EnvironmentConfig  = {
    production: true,                    // Set to true in environment.prod.ts
    externalConfig          : {},        // 
    pageSettingDictionary   : {},        //
    mainPageListDictionary  : {},        //
    jsonList                : [],        // 
    mainPageList            : [],        //
    scmList                 : [],        //      
};
