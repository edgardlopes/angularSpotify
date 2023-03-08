import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newSong } from '../common/factories';
import { Song } from '../types/Song';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = new BehaviorSubject<Song>(newSong());

  timerId: any = null

  constructor(private spotifyService: SpotifyService) { 
    this.getPlayingSong()

  }

  async getPlayingSong() {
    clearTimeout(this.timerId)

    const song = await this.spotifyService.getPlayingSong()
    this.setCurrentSong(song)

    this.timerId = setInterval(async () => {
      const song = await this.spotifyService.getPlayingSong();
      this.setCurrentSong(song)
    }, 3000);
  }

  async setCurrentSong(song: Song) {
    this.currentSong.next(song)
  }



}
