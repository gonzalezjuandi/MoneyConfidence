import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.isAuthenticated = sessionStorage.getItem('pcs-authenticated') === 'true';
  }

  onLoggedIn(): void {
    this.isAuthenticated = true;
    sessionStorage.setItem('pcs-authenticated', 'true');
  }
}
