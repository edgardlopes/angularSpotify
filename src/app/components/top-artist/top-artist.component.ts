import { Component } from '@angular/core';
import { newArtist } from 'src/app/common/factories';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artist } from 'src/app/types/Artist';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent {
    artist: Artist = newArtist();

    constructor(private spotifyService: SpotifyService) {
      this.getTopArtist()
    }

    async getTopArtist() {
      const artists = await this.spotifyService.getTopArtists(1, 0)
      
      this.artist = artists[0] || newArtist();
    }
}
