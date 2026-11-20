import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// ✅ CORS configurado EXCLUSIVAMENTE para Angular en puerto 4200
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Endpoint: Obtener todos los gastos ordenados por fecha descendente
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Endpoint: Crear un nuevo gasto (para futuras pruebas)
app.post('/api/expenses', async (req, res) => {
  try {
    const { description, amount, category, userId } = req.body;
    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        category,
        userId: userId || 1 // Temporal: usuario hardcodeado
      }
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Error al crear el gasto' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  console.log(`📊 Prisma Studio: npx prisma studio`);
});
