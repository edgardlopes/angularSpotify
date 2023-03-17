import { Component, EventEmitter, Input, Output } from '@angular/core';
import { newArtist } from 'src/app/common/factories';
import { Artist } from 'src/app/types/Artist';

@Component({
  selector: 'app-artist-image-item',
  templateUrl: './artist-image-item.component.html',
  styleUrls: ['./artist-image-item.component.scss']
})
export class ArtistImageItemComponent {

  @Input()
  imageUrl = ''

  @Output()
  artistClicked = new EventEmitter<void>()

  onClick() {
    this.artistClicked.emit()
  }

}
