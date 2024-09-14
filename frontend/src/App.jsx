import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUP from './Pages/SignUP';

function App() {

  return (
    
      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUP />} />
      </Routes>
    
  )
}

export default App
