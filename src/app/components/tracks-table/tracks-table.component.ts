import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { Song } from 'src/app/types/Song';

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss']
})
export class TracksTableComponent implements OnDestroy, OnInit {

  @Input()
  tracks: Song[] = []

  @Output()
  onPlaySong = new EventEmitter<Song>()

  subs: Subscription[] = []

  iconPlay = faPlay

  currentSong = newSong()

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getCurrentSong()
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  playSong(song: Song){
    this.onPlaySong.emit(song)
  }

  getArtists(song: Song) {
    return song.artists.map(artist => artist.name).join(', ')
  }

  getCurrentSong() {
    const sub = this.playerService.currentSong.subscribe(song => {
      this.currentSong = song
    })

    this.subs.push(sub)
  }

}
