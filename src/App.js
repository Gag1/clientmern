import './App.css';
import {BrowserRouter as Router, Navigate, Route,Routes } from 'react-router-dom';
import Register from './compontents/register';
import Login from './compontents/login';
import Profile from './compontents/profile';
import ProtectedRoute from './routes/protectedRoute';
import ConfirmEmail from './compontents/confirmEmail';
import ForgotPassword from './compontents/forgotPassword';

function App() {

  const loggedIn = localStorage.getItem('loggedIn');
  return (
       <Router>
         <Routes>
                <Route element={<ProtectedRoute />} >
                  <Route element={<Profile />} path="/profile" />
                  <Route element={<Profile />} path="/" />
                </Route> 
            
             <Route path="/register" element={loggedIn ?  <Profile /> : <Register />} />
             <Route path="/login" element={loggedIn ? <Profile />: <Login />} />
             <Route path="/confirmation" element={<ConfirmEmail />} />
             <Route path="/forgotpassword" element={<ForgotPassword />} />

         </Routes>
      </Router>
  );
  
}

export default App;
