import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export interface NavItem {
  label: string;
  path: string;
}

/**
 * Sidebar + content shell shared by the Admin and Staff panels.
 * Each panel supplies its title and sidebar items through route `data`,
 * so adding a sidebar entry later is a one-line change in that panel's routes file.
 */
@Component({
  selector: 'app-panel-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './panel-layout.html',
  styleUrl: './panel-layout.scss',
})
export class PanelLayout {
  private readonly route = inject(ActivatedRoute);
  protected readonly title: string = this.route.snapshot.data['title'];
  protected readonly nav: NavItem[] = this.route.snapshot.data['nav'];
}
