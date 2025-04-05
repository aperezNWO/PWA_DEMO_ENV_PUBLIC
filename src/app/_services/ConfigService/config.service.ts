import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { _environment   } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MainPage, PageSetting } from 'src/app/_models/entity.model';
import { PAGE_ANGULAR_DEMO_INDEX } from 'src/app/_models/common';


@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  //
  constructor( protected http  : HttpClient
              ,public    route : ActivatedRoute) 
  {
    //
  } 
  // ONLY HAPPENS ONCE ON APPMODULE LOADING
  loadJsonData(p_Path: string, array : string[]) {
    return this.http.get(p_Path).toPromise()
      .then((data: any) => {
          //
          data.forEach((element: any) => {
            //
            array.push(element);
          });
      })
      .catch(error => {
        console.error('Error loading configuration:', error);
      });
  }  
  // ONLY HAPPENS ONCE ON APPMODULE LOADING
  loadConfig() {
    return this.http.get('./assets/config/_config.json').toPromise()
      .then((data: any) => {
          //
          ////console.log("loading configuration...");
          //
          _environment.externalConfig = data; // Assign loaded data to environment variable
      })
      .catch(error => {
        console.error('Error loading configuration:', error);
      });
  }
  //
  _loadMainPages() : Promise<void> 
  {
    return new Promise((resolve) => 
    {
        //
        this.http.get('./assets/config/_mainPages.json').toPromise()
        .then((data: any) => {
            //
            _environment.mainPageList = data; // Assign loaded data to environment variable
            //
            _environment.mainPageList.forEach((element: MainPage) => {
              //
              _environment.mainPageListDictionary[element.log_name] = element;
            });

                      
            //
            resolve();

        })
        .catch(error => {
          console.error('Error loading configuration:', error);
        });
    });
  };
  //
  getConfigValue(key: string) {
    //
    let jsonData : string = JSON.parse(JSON.stringify(_environment.externalConfig))[key];
    //
    ////console.log(jsonData);
    //
    ////console.log('Reading config : ' + key + ', value :' + jsonData)
    //
    return jsonData;
  }
   /**
   * Generates a random GUID.
   * @returns A string representing the generated GUID.
   */
  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0; // Generate a random number between 0 and 15
      const value = char === 'x' ? random : (random & 0x3) | 0x8; // Ensure 'y' is one of [8, 9, A, B]
      return value.toString(16); // Convert to hexadecimal
    });
  }
  // 
  queryUrlParams(paraName: string):string {
     //
     let returnValue = ""; 
     //
     this.route.queryParams.subscribe(params => {
      //
      returnValue = params[paraName] ? params[paraName] : "" ;
      //
      //console.log("query param : " + returnValue);
    });
    //
    return returnValue;
  }
  ///////////////////////////////////////////////////////////////
}
