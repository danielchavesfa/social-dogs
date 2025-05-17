import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserStorage from './Contexts/UserStorage';
import ProtectedRoute from './Components/HelpersComponents/ProtectedRoute';
import Header from './Components/HeaderComponents/Header';
import Footer from './Components/FooterComponents/Footer';
import Home from './Components/HomeComponents/Home';
import Login from './Components/LoginComponents/Login';
import LoginForm from './Components/LoginComponents/LoginForm';
import LoginCreate from './Components/LoginComponents/LoginCreate';
import User from './Components/UserComponents/User';
import Photo from './Components/PhotoComponents/Photo';
import UserProfile from './Components/UserComponents/UserProfile';
import NotFound from './Components/HelpersComponents/NotFound';
import LoginPasswordLost from './Components/LoginComponents/LoginPasswordLost';

function App() {
  const protectedRoutes = {
    user: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className='AppBody'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='login/*' element={<Login />}>
                <Route index element={<LoginForm />} />
                <Route path='perdeu' element={<LoginPasswordLost />} />
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='criar' element={<LoginCreate />} />
              <Route path='conta/*' element={protectedRoutes.user} />
              <Route path='foto/:id' element={<Photo />} />
              <Route path='perfil/:user' element={<UserProfile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
