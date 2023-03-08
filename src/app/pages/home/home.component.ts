import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private spotifyService: SpotifyService) {
  }
  ngOnInit(): void {
    this.getSongs()
  }

  async getSongs() {
    this.songs = await this.spotifyService.getLikedSongs();
  }

  getArtists(song: Song) {
    return song.artists.map(artist => artist.name).join(', ')
  }

  playSong(song: Song) {
    this.spotifyService.playSong(song);
  }
}
