import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {
  readonly sessionService = inject(SessionService);
  readonly isUserLoggedIn = signal<boolean>(this.sessionService.isLoggedIn());
}
