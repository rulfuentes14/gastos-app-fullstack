import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExpensesService, Expense } from '../../core/services/expenses.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe], // 👈 Importa DatePipe para formatear fechas
  templateUrl: './dashboard.component.html' // 👈 Usa templateUrl, NO template inline
})
export class DashboardComponent implements OnInit {
  private expensesService = inject(ExpensesService);
  
  expenses: Expense[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadExpenses();
  }

  private loadExpenses(): void {
    this.loading = true;
    this.error = null;
    
    this.expensesService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando gastos:', err);
        this.error = err.message || 'No se pudo conectar con el servidor';
        this.loading = false;
      }
    });
  }
}