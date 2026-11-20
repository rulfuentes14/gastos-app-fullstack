// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Auth {}

import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal privada que guarda el estado de autenticación
  private isAuthenticatedSignal = signal<boolean>(false);
  
  // Signal pública de solo lectura para que otros componentes la observen
  isLoggedIn = computed(() => this.isAuthenticatedSignal());

  constructor(private router: Router) {
    // Aquí podrías verificar si hay un token en localStorage/cookies al iniciar
    const token = localStorage.getItem('gastos_app_token');
    if (token) {
      this.isAuthenticatedSignal.set(true);
    }
  }

  login(email: string, password: string): boolean {
    // TODO: En el futuro, aquí harás una petición HTTP a tu API Node.js
    // Por ahora, simulamos un login exitoso si los datos no están vacíos
    if (email && password) {
      localStorage.setItem('gastos_app_token', 'simulated-jwt-token-123');
      this.isAuthenticatedSignal.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('gastos_app_token');
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
}

