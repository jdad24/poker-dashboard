import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';

const app = express();
app.use(cors());

const server = createServer(app);

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/api/players', (req, res) => {
  // Mock player data. Will implement database connection later.
  const players = [
    { id: 1, name: 'Alice', email: 'alice@example.com', phone: '123-456-7890', notes: 'Loves poker' },
    { id: 2, name: 'Bob', email: 'bob@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', phone: '555-123-4567' },
    { id: 4, name: 'Henry', email: 'henry@example.com', phone: '555-987-6543' },
  ];
  res.json(players);
});

app.get('/api/dealers', (req, res) => {
  // Mock dealer data. Will implement database connection later.
  const dealers = [
    { id: 1, name: 'Dealer 1', email: 'dealer1@example.com', phone: '223-456-7890', status: 'Active', notes: 'Loves poker' },
    { id: 2, name: 'Dealer 2', email: 'dealer2@example.com', phone: '098-112-9321', status: 'Active', notes: 'Gross runouts' },
    { id: 3, name: 'Dealer 3', email: 'dealer3@example.com', phone: '155-423-9511', status: 'Inactive' },
    { id: 4, name: 'Dealer 4', email: 'dealer4@example.com', phone: '555-987-6353', status: 'Active' },
  ];
  res.json(dealers);
});

app.get('/api/transactions', (req, res) => {
  // Mock transaction data. Will implement database connection later.
  const transactions = [
    { id: 1, user: 'Alice', buyInAmount: 100, buyInMethod: 'Cash', rebuyAmount: 50, rebuyMethod: 'Cash', cashoutAmount: 150, cashoutMethod: 'Cash', time: '2023-01-01' },
    { id: 2, user: 'Bob', buyInAmount: 200, buyInMethod: 'Credit Card', rebuyAmount: 100, rebuyMethod: 'Credit Card', cashoutAmount: 300, cashoutMethod: 'Credit Card', time: '2023-01-02' },
    { id: 3, user: 'Charlie', buyInAmount: 300, buyInMethod: 'Cash', rebuyAmount: 150, rebuyMethod: 'Cash', cashoutAmount: 450, cashoutMethod: 'Cash', time: '2023-01-03' },
    { id: 4, user: 'Henry', buyInAmount: 400, buyInMethod: 'Credit Card', rebuyAmount: 200, rebuyMethod: 'Credit Card', cashoutAmount: 600, cashoutMethod: 'Credit Card', time: '2023-01-04' },
  ];
  res.json(transactions);
});

app.get('/{*all}', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});