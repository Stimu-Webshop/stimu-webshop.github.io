import './App.scss';
import {Routes, Route} from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <>
      <Navbar />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="productpage" element={<ProductPage />} /> 
        </Routes>
      <Footer />
    </>
  );
}

export default App;
