import 'express-session';

declare module 'express-session' {
  interface SessionData {
    email?: string; // add any custom session properties here
  }
}

type THIS_SHOULD_ERROR = number extends string ? true : false;