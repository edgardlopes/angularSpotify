import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private spotifyService: SpotifyService, private router: Router){
  }

  ngOnInit(): void {
    this.verifyCallbackToken()
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl()
  }

  verifyCallbackToken() {
    const token = this.spotifyService.verifyCallbackToken()

    if(token) {
      this.spotifyService.initializeAccessToken(token)
      this.router.navigate(['/player/home'])
    }
  }



}
