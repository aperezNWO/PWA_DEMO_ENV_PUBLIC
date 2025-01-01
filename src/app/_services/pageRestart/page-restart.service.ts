import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class PageRestartService {
  constructor(private router: Router) {}

  // Method 1: Simple page reload
  reloadPage() {
    window.location.reload();
  }

  // Method 2: Reload current route
  async reloadCurrentRoute() {
    const currentUrl = this.router.url;
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(currentUrl);
  }

  // Method 3: Reload with query params refresh
  reloadWithQueryParamsRefresh() {
    const currentUrl = window.location.href;
    window.location.href = currentUrl;
  }
}