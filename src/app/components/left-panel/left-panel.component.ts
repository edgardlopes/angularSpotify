import { Component } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

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

  buttonClick(button: string) {
    this.activeMenu = button
  }
}
