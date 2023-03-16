import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy{
  track = newSong();
  isPlaying = false;

  subs: Subscription[] = []

  prevIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;
  
  constructor(private playerService: PlayerService) {

  }

  ngOnInit(): void {
    this.getCurrentTrack()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  getCurrentTrack() {
    const sub = this.playerService.currentSong.subscribe(track => {
      this.track = track
    })

    const playingSub = this.playerService.isPlaying.subscribe(isPlaying => {
      this.isPlaying = isPlaying
    })

    this.subs.push(sub)
  }

  previousSong() {
    this.playerService.previousSong()
  }

  nextSong() {
    this.playerService.nextSong()
  }

  playPause() {
    this.playerService.playPause()
  }


}
