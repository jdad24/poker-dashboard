import './App.css'
import Header from './components/header';
import AdminPage from './pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
