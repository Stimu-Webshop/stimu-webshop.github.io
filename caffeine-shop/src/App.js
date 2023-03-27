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
import Coffee from './pages/Coffee';
import EnergyDrinks from './pages/EnergyDrinks';
import PWO from './pages/PWO';
import RegisteryPage from './pages/RegisteryPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import LoginSuccess from './pages/LoginSuccess';
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
          <Route path="productpage/:id" element={<ProductPage />} />  
          <Route path="coffee" element={<Coffee />} />
          <Route path="energydrinks" element={<EnergyDrinks />} />
          <Route path="pwo" element={<PWO />} />
          <Route path="register" element ={<RegisteryPage />} />
          <Route path="login" element = { <LoginPage />} />
          <Route path="cartpage" element = { <CartPage />} />
          <Route path="loginsuccess" element = {<LoginSuccess/>} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
