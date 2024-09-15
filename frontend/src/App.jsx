import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUP from './Pages/SignUP';
import EmailVerification from './Pages/EmailVerification';

function App() {
  return (
    <div>
      {/* Content visible only on desktop (medium screens and larger) */}
      <div className="hidden md:block">
        <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/email-verification" element={<EmailVerification />} />
        </Routes>
      </div>

      {/* Message visible only on mobile (small screens) */}
      <div className="md:hidden flex justify-center items-center h-screen bg-gray-100">
        <p className="text-center text-lg font-semibold">
          This website is only accessible from a desktop device.
        </p>
      </div>
    </div>
  );
}

export default App;
