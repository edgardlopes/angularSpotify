import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  constructor(private router: Router, private spotifyService: SpotifyService){}

  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token')

    if(!token) {
      return this.unauthenticated()
    }

    return new Promise(res => {
      const createdUser = this.spotifyService.initUser()
      if(!!createdUser) {
        res(true)
      } else {
        res(false)
      }
    });
  }

  unauthenticated() {
    localStorage.clear()
    this.router.navigate(['/login'])
    return false
  }
}
