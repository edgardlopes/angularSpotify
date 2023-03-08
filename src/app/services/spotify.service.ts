import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { User } from '../types/User';
import { parseSpotifyArtist, parseSpotifyPlaylist, parseSpotifyTrack, ParseSpotifyUser } from '../common/spotifyHelper';
import { Playlist } from '../types/Playlist';
import { Router } from '@angular/router';
import { Artist } from '../types/Artist';
import { Song } from '../types/Song';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify() ;
  user: User | undefined;

  constructor(private router: Router) {
    
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

  async getUserPlaylist(limit = 50, offset = 0): Promise<Playlist[]> {
    const playlists = await this.spotifyApi
      .getUserPlaylists(this.user?.id, {
        limit,
        offset
      })  
    return playlists.items.map(parseSpotifyPlaylist)
  }

  async getTopArtists(limit = 10, offset = 0): Promise<Artist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit, offset })

    return artists.items.map(parseSpotifyArtist)
  }

  async getLikedSongs(limit = 50, offset = 0): Promise<Song[]> {
    const songs = await this.spotifyApi.getMySavedTracks({ limit, offset })

    return songs.items.map(({track}) => parseSpotifyTrack(track))
  } 

  async getPlayingSong(): Promise<Song> {
    const song = await this.spotifyApi.getMyCurrentPlayingTrack();

    return parseSpotifyTrack(song.item!);

  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  async playSong(song: Song) {
    await this.spotifyApi.queue(song.id);
    await this.spotifyApi.skipToNext();
  }

}
