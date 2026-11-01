import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DesignHeaderService } from '../../core/services/design-header.service';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly router = inject(Router);
  readonly sessionService = inject(SessionService);
  readonly designHeader = inject(DesignHeaderService);

  constructor() {
    effect(() => {
      const user = this.sessionService.getLoggedInUser();
      this.designHeader.setHeaderStyle(user?.role);
    });
  }

  logout(): void {
    this.sessionService.removeLoggedInUser();
    void this.router.navigateByUrl('/login');
  }
}
