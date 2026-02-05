import { Component, EventEmitter, Output, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { WizardStateService } from '../../services/wizard-state.service';

declare var lucide: any;

@Component({
  selector: 'app-posicion-global',
  templateUrl: './posicion-global.component.html',
  styleUrls: ['./posicion-global.component.scss']
})
export class PosicionGlobalComponent implements AfterViewInit, OnDestroy, OnInit {
  @Output() next = new EventEmitter<void>();
  @Output() goToPotencialFinanciero = new EventEmitter<void>();
  private iconsInitialized = false;

  // Vista interna: dashboard general o detalle de cuentas
  view: 'dashboard' | 'accounts' = 'dashboard';
  selectedAccount: 'principal' | 'familiar' = 'principal';

  // Saldos base de las cuentas
  private readonly saldoCuentaPrincipalBase = 35000;
  private readonly saldoCuentaFamiliarBase = 5800;

  saldoCuentaPrincipal = this.saldoCuentaPrincipalBase;
  saldoCuentaFamiliar = this.saldoCuentaFamiliarBase;
  saldoTotal = this.saldoCuentaPrincipalBase + this.saldoCuentaFamiliarBase;

  // Movimiento del préstamo completado
  showLoanMovement = false;
  lastLoanAmount: number | null = null;

  get saldoTotalFormatted(): string {
    return this.saldoTotal.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  get saldoCuentaPrincipalFormatted(): string {
    return this.saldoCuentaPrincipal.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  get saldoCuentaFamiliarFormatted(): string {
    return this.saldoCuentaFamiliar.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  get lastLoanAmountFormatted(): string {
    if (!this.lastLoanAmount) {
      return '0,00';
    }
    return this.lastLoanAmount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private wizardState: WizardStateService
  ) {}

  ngAfterViewInit(): void {
    // Inicializar iconos de Lucide después de que la vista se renderice
    this.initializeIcons();
  }

  ngOnInit(): void {
    // Escuchar cambios para reflejar el préstamo completado en las cuentas
    this.wizardState.state$.subscribe(state => {
      const loanAmount = state.loanCompleted && state.loanAmount ? state.loanAmount : 0;

      this.saldoCuentaPrincipal = this.saldoCuentaPrincipalBase + loanAmount;
      this.saldoCuentaFamiliar = this.saldoCuentaFamiliarBase;
      this.saldoTotal = this.saldoCuentaPrincipal + this.saldoCuentaFamiliar;

      this.showLoanMovement = !!state.loanCompleted && !!state.loanAmount;
      this.lastLoanAmount = state.loanAmount ?? null;
      this.cdr.markForCheck();
    });

    // Si venimos desde la confirmación de préstamo con "Ver ingreso en la cuenta",
    // abrir directamente la vista de cuentas de la cuenta principal
    const openAccounts = sessionStorage.getItem('open-accounts-from-loan');
    if (openAccounts === 'true') {
      sessionStorage.removeItem('open-accounts-from-loan');
      this.view = 'accounts';
      this.selectedAccount = 'principal';
    }
  }

  ngOnDestroy(): void {
    // Limpiar iconos si es necesario
    if (typeof lucide !== 'undefined' && lucide.destroyIcons) {
      lucide.destroyIcons();
    }
  }

  private initializeIcons(): void {
    if (typeof lucide !== 'undefined') {
      // Esperar a que Angular termine de renderizar
      setTimeout(() => {
        try {
          // Limpiar iconos existentes si hay
          const existingIcons = document.querySelectorAll('[data-lucide] svg');
          existingIcons.forEach(svg => {
            if (svg.parentElement && svg.parentElement.tagName === 'I') {
              svg.remove();
            }
          });
          
          // Crear nuevos iconos
          lucide.createIcons();
          this.iconsInitialized = true;
          this.cdr.detectChanges();
        } catch (error) {
          console.warn('Error initializing Lucide icons:', error);
        }
      }, 200);
    }
  }

  onIrAContratar(): void {
    this.next.emit();
  }

  // Navegar a la posición de cuentas desde las filas de Cuenta Sabadell / Cuenta familiar
  onVerPosicionCuentaPrincipal(): void {
    this.view = 'accounts';
    this.selectedAccount = 'principal';
    this.initializeIcons();
    this.cdr.markForCheck();
  }

  onVerPosicionCuentaFamiliar(): void {
    this.view = 'accounts';
    this.selectedAccount = 'familiar';
    this.initializeIcons();
    this.cdr.markForCheck();
  }

  onVolverDesdePosicionCuentas(): void {
    this.view = 'dashboard';
    this.initializeIcons();
    this.cdr.markForCheck();
  }

  selectAccount(type: 'principal' | 'familiar'): void {
    if (this.selectedAccount !== type) {
      this.selectedAccount = type;
      this.initializeIcons();
      this.cdr.markForCheck();
    }
  }

  onAccountsCarouselScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) {
      return;
    }

    const scrollLeft = target.scrollLeft;
    const maxScroll = target.scrollWidth - target.clientWidth;

    if (maxScroll <= 0) {
      return;
    }

    const ratio = scrollLeft / maxScroll;
    const newSelected: 'principal' | 'familiar' = ratio > 0.5 ? 'familiar' : 'principal';

    if (newSelected !== this.selectedAccount) {
      this.selectedAccount = newSelected;
      this.cdr.markForCheck();
    }
  }

  onIrAPotencialFinanciero(): void {
    // Navegación inteligente: si ya tiene scoring, ir al resultado (paso 6), sino al guide panel (paso 4)
    const state = this.wizardState.getCurrentState();
    if (state.hasUpdatedPotential) {
      this.wizardState.setCurrentStep(6); // Resultado directo
    } else {
      this.wizardState.setCurrentStep(4); // Guide panel
    }
  }

  onVolverInicio(): void {
    // Volver al inicio (paso 1)
    // En este caso ya estamos en el inicio, pero podría navegar a otra sección
  }

  onIrAPrestamoPreconcedido(): void {
    // Ir directamente al proceso de préstamo con seguro (onboarding → simulación → documentación → firma)
    this.wizardState.setCurrentStep(3);
    sessionStorage.setItem('from-prestamo-modal', 'true');
  }
}
