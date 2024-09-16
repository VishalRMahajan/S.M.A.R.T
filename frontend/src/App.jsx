import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SignUP from './Pages/SignUP';
import EmailVerification from './Pages/EmailVerification';
import ForgotPassword from './Pages/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import Dashboard from './Pages/Dashboard';
import ResetPassword from './Pages/ResetPassword';

const ProtectedRoute = ({children}) =>{
  const {isAuthenticated,user} = useAuthStore();
  
  if (!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user.isVerified){
    return <Navigate to="/verifyemail" replace />
  }

  return children;
}

const RedirectAuthenticatedUser= ({children}) =>{
  const {isAuthenticated,user} = useAuthStore();
  
  if (isAuthenticated && user.isVerified){
    return <Navigate to="/" replace/>
  }

  return children;
}

function App() {
  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      {/* Content visible only on desktop (medium screens and larger) */}
      <div className="hidden md:block">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>}/>
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUP /></RedirectAuthenticatedUser>} />
          <Route path="/verifyemail" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPassword/></RedirectAuthenticatedUser>}/>
          <Route path="/resetpassword/:token" element={<RedirectAuthenticatedUser><ResetPassword/></RedirectAuthenticatedUser>}/>
        </Routes>
        <Toaster position="top-right" reverseOrder={false}/>
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
