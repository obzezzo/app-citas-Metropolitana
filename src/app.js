import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import profileRoutes from './routes/profile.routes.js'
import medicosRoutes from './routes/medicos.routes.js'
import citasRoutes from './routes/citas.routes.js'
import misCitasRoutes from './routes/miscitas.routes.js'
import Especialidades from './routes/especialidades.routes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json()); // Para que las peticiones post se reciban con json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Para poder leer las cookies con json

app.use('/api', authRoutes); // Las rutas /register y /login
app.use('/api/profile', profileRoutes); // Las rutas de profile
app.use('/api', medicosRoutes); // Las rutas de profile
app.use('/api', Especialidades); // Las rutas de profile
app.use('/api', citasRoutes); // Las rutas del área de citas médicas
app.use('/api', misCitasRoutes); // Las rutas del área de citas médicas

export default app;