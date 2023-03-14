import './App.scss';
import {Routes, Route} from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
// Pages
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      <Footer />
    </>
  );
}

export default App;
