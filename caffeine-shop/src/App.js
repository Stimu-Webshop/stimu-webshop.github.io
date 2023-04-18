import './App.scss';
import {Routes, Route} from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
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
import RegisteryPage from './account_management/RegisteryPage';
import LoginPage from './account_management/LoginPage';
import CartPage from './pages/CartPage';
import Thankyou from './pages/Thankyou';
import AccountPage from './account_management/AccountPage';
import AdminPage from './admin_items/AdminPage';
import Management from './admin_items/Management';
import OrderAdmin from './admin_items/OrderAdmin';
import PasswordRecovery from './account_management/PasswordRecovery';
function App() {
  return (
    <>
      <Navbar />
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
          <Route path="thankyou" element = { <Thankyou />} />
          <Route path="account" element = {<AccountPage/>} />
          <Route path="login" element = {<LoginPage/>} />
          <Route path="admin" element = {<AdminPage/>}  />
          <Route path="management" element = {<Management/>} />
          <Route path="orders" element = {<OrderAdmin/>} />
          <Route path="forgotpassword" element = {<PasswordRecovery/>} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
