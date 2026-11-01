import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DesignHeaderService {
  readonly headerStyle = signal<string>('');

  setHeaderStyle(role: string | undefined): void {
    this.headerStyle.set(role ?? '');
  }
}
