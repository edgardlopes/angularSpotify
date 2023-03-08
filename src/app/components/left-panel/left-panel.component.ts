import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from 'src/app/types/Playlist';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {
  homeIcon = faHome
  homeSearch = faSearch
  homeArtists = faGuitar
  playlist = faMusic

  activeMenu = 'Home'

  userPlaylists: Playlist[] = []

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.fetchPlaylists()
  }

  buttonClick(button: string) {
    this.activeMenu = button
    this.router.navigateByUrl('player/home')
  }

  async fetchPlaylists() {
    this.userPlaylists = await this.spotifyService.getUserPlaylist();
  }
}
