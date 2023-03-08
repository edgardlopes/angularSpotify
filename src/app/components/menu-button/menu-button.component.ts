import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {
  @Input()
  description = ''

  @Input()
  active = false

  @Output()
  click = new EventEmitter<void>()
  
  constructor() {

  }

  onClick() {
    this.click.emit()
  }

}
