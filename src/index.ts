import express from 'express';
import atmRoutes from './routes/atmRoutes';

const app = express();
app.use(express.json());
app.use('/atm', atmRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
