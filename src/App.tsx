import './App.css'
import Header from './components/header';
import UsersPage from './pages/users';
import AdminPage from './pages/admin';
import TransactionsPage from './pages/transactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AdminPage/>} />
          <Route path="/users" element={<UsersPage/>} />          
          <Route path="/transactions" element={<TransactionsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
