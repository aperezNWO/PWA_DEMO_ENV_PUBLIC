import { PageSettingDictionary, PageSetting, MainPage, MainPageSettingDictionary, PageInfoSettingDictionary } from "src/app/_models/entity.model";

interface EnvironmentConfig {
    production              : boolean; 
    externalConfig          : {};                        //
    pageSettingDictionary   : PageSettingDictionary;     //
    mainPageListDictionary  : MainPageSettingDictionary; //
    //nestedPageListDictionary: PageInfoSettingDictionary; //
    jsonList                : PageSetting[];             // 
    mainPageList            : MainPage[];                //
    scmList                 : [];                        //  
}


export const _environment : EnvironmentConfig  = {
    production: true,                    // Set to true in environment.prod.ts
    externalConfig            : {},        // 
    pageSettingDictionary     : {},        //
    mainPageListDictionary    : {},        //
    /*nestedPageListDictionary  : {},      //*/
    jsonList                  : [],        // 
    mainPageList              : [],        //
    scmList                   : [],        //      
};
