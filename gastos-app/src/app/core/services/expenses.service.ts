import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz del modelo (esto debería venir de tu backend Prisma)
export interface Expense {
  id: number;
  description: string;
  amount: number; // Prisma Decimal se serializa como número en JSON
  date: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/expenses'; // Cambia esto por la URL real de tu API Node.js // 👈 URL del backend Node.js

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  createExpense(expense: Omit<Expense, 'id'>): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
}
