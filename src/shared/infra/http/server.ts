import 'reflect-metadata';

import express from 'express';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello Dev' }));

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
