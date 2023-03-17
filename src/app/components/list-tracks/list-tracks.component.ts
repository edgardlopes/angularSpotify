import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/common/factories';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Song } from 'src/app/types/Song';

@Component({
  selector: 'app-list-tracks',
  templateUrl: './list-tracks.component.html',
  styleUrls: ['./list-tracks.component.scss']
})
export class ListTracksComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];  

  bannerImageUrl = ''
  bannerText = ''

  tracks: Song[] = []
  currentTrack = newSong()

  playIcon = faPlay

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService) {

  }
  
  ngOnInit(): void {
    this.fetchTracks()
    
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  fetchTracks() {
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const type = params.get('type');
      const id = params.get('id');

      if(!type || !id) {
        throw new Error('opps')
      }

      this.tracks = await this.spotifyService.getTracks(type, id)

      const {url, title} = await this.spotifyService.getTitleAndBannerUrl(type, id);

      this.bannerImageUrl = url
      this.bannerText = title
    })    

    this.subs.push(sub)
  }

  

}
