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
    { id: 5, name: 'David', email: 'david@example.com', phone: '555-456-7890' },
    { id: 6, name: 'Eve', email: 'eve@example.com', phone: '555-321-0987' },
    { id: 7, name: 'Frank', email: 'frank@example.com', phone: '555-789-0123' },
    { id: 8, name: 'Grace', email: 'grace@example.com', phone: '555-234-5678' }
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
    { id: 5, name: 'Dealer 5', email: '', phone: '555-456-7890', status: 'Inactive' },
    { id: 6, name: 'Dealer 6', email: 'dealer6@example.com', phone: '555-123-4567', status: 'Active' }
  ];
  res.json(dealers);
});

app.get('/api/transactions', (req, res) => {
  // Mock transaction data. Will implement database connection later.
  const transactions = [
    { id: 1, player: 'Alice', buyInAmount: 100, buyInMethod: 'Cash', rebuyAmount: 50, rebuyMethod: 'Cash', cashoutAmount: 150, cashoutMethod: 'Cash', time: '2023-01-01' },
    { id: 2, player: 'Bob', buyInAmount: 200, buyInMethod: 'Credit Card', rebuyAmount: 100, rebuyMethod: 'Credit Card', cashoutAmount: 300, cashoutMethod: 'Credit Card', time: '2023-01-02' },
    { id: 3, player: 'Charlie', buyInAmount: 300, buyInMethod: 'Cash', rebuyAmount: 150, rebuyMethod: 'Cash', cashoutAmount: 450, cashoutMethod: 'Cash', time: '2023-01-03' },
    { id: 4, player: 'Henry', buyInAmount: 400, buyInMethod: 'Credit Card', rebuyAmount: 200, rebuyMethod: 'Credit Card', cashoutAmount: 600, cashoutMethod: 'Credit Card', time: '2023-01-04' },
    { id: 5, player: 'Alice', buyInAmount: 150, buyInMethod: 'Cash', rebuyAmount: 75, rebuyMethod: 'Cash', cashoutAmount: 225, cashoutMethod: 'Cash', time: '2023-01-05' },
    { id: 6, player: 'Bob', buyInAmount: 250, buyInMethod: 'Credit Card', rebuyAmount: 125, rebuyMethod: 'Credit Card', cashoutAmount: 375, cashoutMethod: 'Credit Card', time: '2023-01-06' },
    { id: 7, player: 'Charlie', buyInAmount: 350, buyInMethod: 'Cash', rebuyAmount: 175, rebuyMethod: 'Cash', cashoutAmount: 525, cashoutMethod: 'Cash', time: '2023-01-07' },
    { id: 8, player: 'Henry', buyInAmount: 450, buyInMethod: 'Credit Card', rebuyAmount: 225, rebuyMethod: 'Credit Card', cashoutAmount: 675, cashoutMethod: 'Credit Card', time: '2023-01-08' },
    { id: 9, player: 'David', buyInAmount: 500, buyInMethod: 'Cash', rebuyAmount: 250, rebuyMethod: 'Cash', cashoutAmount: 750, cashoutMethod: 'Cash', time: '2023-01-09' },
    { id: 10, player: 'Eve', buyInAmount: 600, buyInMethod: 'Credit Card', rebuyAmount: 300, rebuyMethod: 'Credit Card', cashoutAmount: 900, cashoutMethod: 'Credit Card', time: '2023-01-10' },
    { id: 11, player: 'Frank', buyInAmount: 700, buyInMethod: 'Cash', rebuyAmount: 350, rebuyMethod: 'Cash', cashoutAmount: 1050, cashoutMethod: 'Cash', time: '2023-01-11' },
    { id: 12, player: 'Grace', buyInAmount: 800, buyInMethod: 'Credit Card', rebuyAmount: 400, rebuyMethod: 'Credit Card', cashoutAmount: 1200, cashoutMethod: 'Credit Card', time: '2023-01-12' }
  ];
  res.json(transactions);
});

app.get('/{*all}', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});