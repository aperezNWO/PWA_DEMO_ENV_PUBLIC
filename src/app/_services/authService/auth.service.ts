import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const authConfig = {
  // Replace with your provider's details
  issuer: 'https://your-oauth-provider.com/auth/realms/your-realm',
  clientId: 'your-client-id',
  redirectUri: 'http://localhost:4200/callback', // Adjust port if needed
  responseType: 'code',
  scope: 'openid profile email offline_access', // Adjust scopes as needed
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //
  private _loggedUser : boolean = false;
  public userName     : string | undefined;
  public password     : string | undefined;
  public fullUserName : string | undefined;
  public userRoles    : string | undefined;
  //
  constructor(
    private http: HttpClient,
    //@Inject(OAuthService) private oauthService: OAuthService
  ) 
  {
    //this.oauthService.configure(authConfig);
    //this.oauthService.initImplicitFlow();
  }
  //
  canActivate(): boolean {
    //if (this.oauthService.hasValidAccessToken()) {
      return true;
    //} else {
    //  this.router.navigate(['/login']);
    //  return false;
    // }
  }
  // Methods for login, logout, retrieving user info, access token, etc. (see below)
  public get loggedUser()    : boolean  { 
    return this._loggedUser;
  }
  //
  public set loggedUser(value : boolean) { 
    this._loggedUser = value;
  }
  //
  matchRoles(pageRoles: string): boolean {
    //
    let bMatchRoles = false;
    //
    if (pageRoles == '0')
        return true; 
    
    if (pageRoles == this.userRoles) 
        return true;
    //
    return bMatchRoles;
  }
}