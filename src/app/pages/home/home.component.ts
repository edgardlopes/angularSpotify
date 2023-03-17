import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Song } from 'src/app/types/Song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  iconPlay = faPlay


  songs: Song[] = []
  currentSong = newSong()

  subs: Subscription[] = []

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.getSongs()
  }

  async getSongs() {
    this.songs = await this.spotifyService.getLikedSongs();
  }

  playSong(song: Song) {
    console.log('here')
    this.spotifyService.playSong(song);
    this.playerService.setCurrentSong(song);
  }

}
