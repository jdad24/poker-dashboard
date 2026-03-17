import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';
import session from 'express-session';
import helmet from 'helmet';
import AuthRouter from './routes/auth.ts'
import APIRouter from './routes/api.ts'

dotenv.config()

const app = express();
app.use(helmet())
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

app.use('/auth', AuthRouter)

const requireAuth = (req, res, next) => {
  if (req.path === '/login' || req.path === '/create-account' || req.path.startsWith('/auth')) {
    return next(); // Allow login and registration routes without authentication
  }
  if (!req.session.email) {
    console.log('Unauthorized access attempt to:', req.path);
    return res.redirect('/login'); // Redirect to login page if not authenticated
    // return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.get('/', (req, res) => {
  if (!req.session.email) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});


app.get('/login', (req, res) => {
  if (req.session.email) {
    return res.redirect('/'); // Redirect to home if already logged in
  }
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});
app.get('/create-account', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.use(express.static(path.join(process.cwd(), 'dist')));
// app.use(requireAuth); // Apply authentication middleware to all routes except login and registration

app.get('/profile', requireAuth, (req, res) => {
    if (req.session.email) {
        return { loggedIn: true, email: req.session.email }
    } else {
        return { loggedIn: false }
    }
})

app.use('/api', requireAuth, APIRouter)

app.get('/{*all}', requireAuth, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const server = createServer(app);

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});