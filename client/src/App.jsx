import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import AddProduct from './pages/AddProduct';
import ProductUpdate from './pages/ProductUpdate';
 



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/add-product' element={<AddProduct />} ></Route>
        <Route path='/product-update/:id' element={<ProductUpdate />} ></Route>
        <Route path='/payment_success' element={<PaymentSuccess />} ></Route>
        <Route path='/payment_cancel' element={<PaymentCancel />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;