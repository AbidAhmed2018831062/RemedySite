import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import AddMedicine from './Component/AddMedicine';
import DoctorList from './Component/Doctor/DoctorList';
import Home from './Component/Home';
import LogIn from './Component/Login';
import Header from './Component/Navigate';
import Medicine from './Component/ShowMedicine';
import Cart from './Component/Users/Cart';
import Checkout from './Component/Users/Checkout';
function App() {
  return (
   <div>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Remedy</title>
            </Helmet>
      <Header/>
       <Routes>
       <Route path="/" element={<Home/>}></Route>
      <Route path="/medicine/:id" element={<Medicine/>}></Route>
     
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/newmedicine" element={<AddMedicine/>}></Route>
      <Route path="/users/cart" element={<Cart/>}></Route>
      <Route path="/doctor/list" element={<DoctorList/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      

     </Routes>
  
   </div>
  );
}

export default App;
