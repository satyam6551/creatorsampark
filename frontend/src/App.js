import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import Home from './pages/Home';
import Creators from './pages/Creators';
import CreatorDetail from './pages/CreatorDetail';
import Campaigns from './pages/Campaigns';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creators/:id" element={<CreatorDetail />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </Router>
    </AuthProvider>
  );
}

export default App;
