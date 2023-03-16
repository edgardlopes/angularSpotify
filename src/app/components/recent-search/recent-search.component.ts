import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent {

  recentSearch = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Eletronicas',
    'Is Vintage Culture'
  ]

  searchField = ''

  setSearch(search: string) {
    this.searchField = search
  }

  search() {
    console.log('Serching ', this.searchField)
  }

}
