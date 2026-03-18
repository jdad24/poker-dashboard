import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    email?: string; // add any custom session properties here
  }
}