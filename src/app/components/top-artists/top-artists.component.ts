import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artist } from 'src/app/types/Artist';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  artists: Artist[] = []

  constructor(private spotifyService: SpotifyService){

  }

  ngOnInit(): void {
    this.fetchTopArtists()
  }

  async fetchTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
    console.log(this.artists)
  }

  

}
