import { Component, OnInit } from '@angular/core';
import { WizardStateService } from './services/wizard-state.service';

@Component({
  selector: 'app-root',
  template: `
    <app-login *ngIf="!isAuthenticated" (loggedIn)="onLoggedIn()"></app-login>
    <app-wizard *ngIf="isAuthenticated"></app-wizard>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Tu Potencial Financiero';
  isAuthenticated = false;

  constructor(private wizardState: WizardStateService) {}

  ngOnInit(): void {
    this.isAuthenticated = sessionStorage.getItem('pcs-authenticated') === 'true';
  }

  onLoggedIn(): void {
    // En cada login reiniciamos el estado del flujo (saldos, flags de préstamo, etc.)
    this.wizardState.reset();
    this.isAuthenticated = true;
    sessionStorage.setItem('pcs-authenticated', 'true');
  }
}
