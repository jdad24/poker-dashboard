import './App.css'
import Header from './components/header';
import PlayersPage from './pages/players';
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
          <Route path="/players" element={<PlayersPage/>} />          
          <Route path="/transactions" element={<TransactionsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
