import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sigin from '@/templates/authentication/Sigin';
import Signup from '@/templates/authentication/Signup';
import ForgotPassword from '@/templates/authentication/ForgotPassword';
import Starter from '@/templates/pages/Starter';
import { ReactNode } from 'react';
import Index from '@/templates/dashboard/Index';

interface PrivateRouteProps {

  children: ReactNode;

}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};


const Urls = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Starter />}/>
        <Route path='/auth'>
          <Route path="login" element={<Sigin />} />
          <Route path="register" element={<Signup />} />
          <Route path="reset-password" element={<ForgotPassword />} />
        </Route>

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Index />
            </PrivateRoute>
          }
        />

        {/* Redirection par défaut */}
        {/* <Route path="/" element={<Navigate to="/auth/login" replace />} /> */}
        {/* <Route path="*" element={<Navigate to="/auth/login" replace />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>

    </BrowserRouter>
  );
};

export default Urls;