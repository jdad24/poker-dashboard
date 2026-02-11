import './App.css'
import Header from './components/header';
import Users from './pages/users';
import Transactions from './pages/transactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/users" element={<Users/>} />
          <Route path="/transactions" element={<Transactions/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
