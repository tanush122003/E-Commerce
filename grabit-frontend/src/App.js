import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Featured from './pages/Featured/Featured';
import Men from './pages/Men/Men';
import Women from './pages/Women/Women';
import Kids from './pages/Kids/Kids';
import Hero from './pages/Hero/Hero';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Hoodies from './pages/Men/Hoodies';
import Pants from './pages/Men/Pants';
import Shirts from './pages/Men/Shirts';
import Register from './pages/Register/Register';
import { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
import UserDashboard from './pages/roles/user/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ErrorPage from './pages/Error/ErrorPage';
import AdminDashboard from './pages/roles/admin/AdminDashboard';
import AdminRoute from './components/ProtectedRoute/AdminRoute';
import AdminDetails from './pages/roles/admin/AdminDetails';
import CreateProduct from './pages/roles/admin/AddProduct';
import AllProducts from './pages/roles/admin/AllProducts';
import AllProductsPublic from './pages/AllProducts/AllProductsPublic';
import Dresses from './pages/Women/Dresses';
import WomenPants from './pages/Women/WomenPants';
import Skirts from './pages/Women/Skirts';
import AddCategory from './pages/roles/admin/AddCategory';
import 'antd/dist/antd'
import SingleProductAdmin from './pages/roles/admin/SingleProductUpdateAdmin';
import SingleProductUpdateAdmin from './pages/roles/admin/SingleProductUpdateAdmin';
import SearchResults from './pages/AllProducts/SearchResults/SearchResults';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutSecondVersion from './pages/Cart/CheckoutSecondVersion';
import Order from './pages/roles/user/Order/UserOrders';
import UserOrders from './pages/roles/user/Order/UserOrders';
import UserAccountDetails from './pages/roles/user/AccountDetails/UserAccountDetails';

function App() 
{
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<><Navbar /><Footer/></>}>
          <Route path='/' element={<><Hero /><Featured /></>} />
          <Route path='/home' element={<ProtectedRoute />}>
            <Route path='' element={<Homepage />} />
            <Route path='' element={<Homepage />} />
          </Route>
          <Route path='/dashboard' element={<ProtectedRoute />}>
            <Route path='user' element={<UserDashboard />}> 
            <Route path='account-details' element={<UserAccountDetails />} />
            <Route path='orders' element={<UserOrders />} />
          </Route>
            <Route path='cart' element={<CartPage />} />
            <Route path='cart/checkout' element={<CheckoutSecondVersion />} replace />
          </Route>
          <Route path='all-products' element={<><AllProductsPublic/></>} />
          <Route path='search-results' element={<><SearchResults/></>} />
          <Route path='single-product/:id' element={<><SingleProductPage/></>} />
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />}>
              <Route index element={<AdminDetails />} />
              <Route path='add-product' element={<CreateProduct />} />
              <Route path='all-products' element={<AllProducts />} />
              <Route path='add-category' element={<AddCategory />} />
              <Route path='product/:id' element={<SingleProductUpdateAdmin />} />
            </Route>
          </Route>

          <Route path='men/all-products' element={<Men />}/>
            <Route path='men/hoodies' element={<Hoodies />} />
            <Route path='men/pants' element={<Pants />} />
            <Route path='men/shirts' element={<Shirts />} />
            <Route path='women/all-products' element={<Women />} />
            <Route path='women/dresses' element={<Dresses />} />
            <Route path='women/pants' element={<WomenPants />} />
            <Route path='women/skirts' element={<Skirts />} />
          <Route path='/women' element={<Women />} />
          <Route path='/kids/all-products' element={<Kids />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='*' element={<ErrorPage />} replace />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
