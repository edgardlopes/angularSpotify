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
  isPlaying = new BehaviorSubject<boolean>(false);

  timerId: any = null
  playingPollId = null




  constructor(private spotifyService: SpotifyService) { 
    this.getPlayingSong()
  }

  async getPlayingSong() {
    clearTimeout(this.timerId)

    const song = await this.spotifyService.getPlayingSong()
    this.setCurrentSong(song)

    this.timerId = setInterval(async () => {
      const song = await this.spotifyService.getPlayingSong();
      const isPlaying = await this.spotifyService.isPlaying()
      
      this.setCurrentSong(song)
      this.setPlaying(isPlaying)
    }, 3000);
  }

  async setPlaying(playing: boolean) {
    this.isPlaying.next(playing)
  }

  async setCurrentSong(song: Song) {
    this.currentSong.next(song)
  }

  previousSong() {
    this.spotifyService.previousSong()
  }

  nextSong() {
    this.spotifyService.nextSong()
  }

  playPause() {
    console.log('isPLaying', this.isPlaying.value)
    
    if(this.isPlaying.value) {
      this.spotifyService.pause()
    } else {
      this.spotifyService.play()
    }

  }

  


}
