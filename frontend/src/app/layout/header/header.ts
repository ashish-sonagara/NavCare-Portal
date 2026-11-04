import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly router = inject(Router);
  readonly sessionService = inject(SessionService);

  constructor() {}

  logout(): void {
    this.sessionService.removeLoggedInUser();
    void this.router.navigateByUrl('/login');
  }
}
