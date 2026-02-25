import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import session from 'express-session';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration. Will implement Redis or another store later for production.
app.use(
  session({
    name: "sid",
    secret: "super-secret-key", // use env var in prod
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

const users = []; // In-memory user store. Will implement database connection later.

const requireAuth = (req, res, next) => {
  if (req.path === '/login' || req.path === '/create-account') {
    return next(); // Allow login and registration routes without authentication
  }
  if (!req.session.userId) {
    console.log('Unauthorized access attempt to:', req.path);
    return res.redirect('/login'); // Redirect to login page if not authenticated
    // return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/'); // Redirect to home if already logged in
  }
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});
app.get('/create-account', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.post('/auth/create-account', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  const existingUser = users.find(user => user.email === email); //Do not use in production, will implement database connection later.
  if (existingUser) {
    return res.status(400).json({ message: 'email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  req.session.userId = user.email; // Store email in session for simplicity
  res.json({ success: true, message: 'Login successful' });
});

app.post('/auth/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error: ", err)
      return res.status(500).json({ success: false })
    }
    // Optional but recommended: clear cookie explicitly
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: false, // true in HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    }); 

    res.json({ success: true });
  })
})

app.use(express.static(path.join(process.cwd(), 'dist')));
app.use(requireAuth); // Apply authentication middleware to all routes except login and registration

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

app.get('/api/players/transactions', (req, res) => {
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

app.get('/api/dealers/sessions', (req, res) => {
  // Mock dealer session data. Will implement database connection later.
  const sessions = [
    { id: 1, dealer: 'Dealer 1', downNumber: 1, tableNumber: 1, handsDealt: 10, totalTips: 150, gameCost: 100, startTime: '2023-01-01T18:00:00Z', endTime: '2023-01-01T22:00:00Z', notes: 'Great session!' },
    { id: 2, dealer: 'Dealer 2', downNumber: 2, tableNumber: 2, handsDealt: 15, totalTips: 250, gameCost: 150, startTime: '2023-01-02T18:00:00Z', endTime: '2023-01-02T22:00:00Z' },
    { id: 3, dealer: 'Dealer 3', downNumber: 3, tableNumber: 3, handsDealt: 8, totalTips: 185, gameCost: 75, startTime: '2023-01-03T18:00:00Z', endTime: '2023-01-03T22:00:00Z', notes: 'Rough session, lots of bad beats.' },
    { id: 4, dealer: 'Dealer 4', downNumber: 4, tableNumber: 4, handsDealt: 7, totalTips: 75, gameCost: 55, startTime: '2023-01-04T18:00:00Z', endTime: '2023-01-04T22:00:00Z' },
    { id: 5, dealer: 'Dealer 5', downNumber: 5, tableNumber: 5, handsDealt: 6, totalTips: 65, gameCost: 45, startTime: '2023-01-05T18:00:00Z', endTime: '2023-01-05T22:00:00Z' },
    { id: 6, dealer: 'Dealer 6', downNumber: 6, tableNumber: 6, handsDealt: 5, totalTips: 45, gameCost: 35, startTime: '2023-01-06T18:00:00Z', endTime: '2023-01-06T22:00:00Z' }
  ];
  res.json(sessions);
});

app.get('/{*all}', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const server = createServer(app);

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});