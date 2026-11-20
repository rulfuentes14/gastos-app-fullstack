/*import { Component } from '@angular/core';

@Component({
  selector: 'app-layout.component',
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
*/

import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // Usamos Signals (novedad de Angular moderno) para el estado del sidebar
  isSidebarCollapsed = signal(false);
  currentYear = new Date().getFullYear();

  toggleSidebar() {
    this.isSidebarCollapsed.update(val => !val);
  }
}
