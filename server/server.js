import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
app.use(cors());

const server = createServer(app);

app.get('/users', (req, res) => {
  // Mock user data. Will implement database connection later.
  const users = [
    { id: 1, name: 'Alice', phone: '123-456-7890', notes: 'Loves poker' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.json(users);
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});