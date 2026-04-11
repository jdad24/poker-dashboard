import './App.css'
import Header from './components/header';
import AdminPage from './pages/admin';
import CreateAccountPage from './pages/create-account';
import LoginPage from './pages/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<AdminPage/>} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
