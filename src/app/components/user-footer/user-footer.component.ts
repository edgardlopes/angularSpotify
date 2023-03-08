import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from 'src/app/services/spotify.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent {
  exitIcon = faSignOutAlt
  user: User | undefined

  constructor(private spotifyService: SpotifyService){
    this.user = this.spotifyService.user;
  }

  logout(){
    this.spotifyService.logout()
  }

}
