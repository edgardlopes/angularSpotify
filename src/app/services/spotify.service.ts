import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { User } from '../types/User';
import { ParseSpotifyUser } from '../common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify() ;
  user: User | undefined;

  constructor() {
    
  }

  async initUser() {
    if(this.user) {
      return true
    }

    const token = localStorage.getItem('token')

    if(!token) {
      return false
    }

    try {
      this.initializeAccessToken(token)
      await this.getSpotifyUser()

      return !!this.user;
    } catch (error) {
      return false
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe()
    this.user = ParseSpotifyUser(userInfo);
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`
    const responseType = `response_type=token&show_dialog=true`
    
    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }

  verifyCallbackToken() {
    if(!window.location.hash) {
      return ''
    }

    const url =  new URL(window.location.href.replace('#', '?'))
    const accessToken = url.searchParams.get('access_token')
    const tokenType = url.searchParams.get('token_type')
    const expiresIn = url.searchParams.get('expires_in')

    return accessToken
  }

  initializeAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token)
    localStorage.setItem('token', token)
  }

}
