import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { RecentSearchComponent } from 'src/app/components/recent-search/recent-search.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { ArtistImageItemComponent } from 'src/app/components/artist-image-item/artist-image-item.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistComponent,
    ArtistImageItemComponent,
    TopArtistsComponent,
    RightPanelComponent,
    RecentSearchComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
