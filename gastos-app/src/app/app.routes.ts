import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';  // 👈 Importar guard correcto
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  // 1. Login Público
  { 
    path: 'login', 
    component: LoginComponent 
  },

  // 2. Rutas Protegidas
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard], // 👈 Protección activada
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      
      // Lazy Loading hacia tus archivos REALES renombrados
      { 
        path: 'expenses', 
        loadComponent: () => import('./features/expenses/expenses.component').then(m => m.ExpensesComponent) 
      },
      { 
        path: 'budgets', 
        loadComponent: () => import('./features/budgets/budgets.component').then(m => m.BudgetsComponent) 
      },
      { 
        path: 'credits', 
        loadComponent: () => import('./features/credits/credits.component').then(m => m.CreditsComponent) 
      },
    ]
  },

  // 3. Wildcard
  { path: '**', redirectTo: 'login' }
];