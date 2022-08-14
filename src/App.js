import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import AddMedicine from './Component/AddMedicine';
import AdminLogin from './Component/AdminLogin/AdminLogin';
import BlogPosts from './Component/BlogPosts';
import Denied from './Component/Denied';
import DoctorList from './Component/Doctor/DoctorList';
import DoctorOWnProfile from './Component/Doctor/DoctorOwnProfile';
import AddPost from './Component/Doctor/NewPost';
import VerifyDoctor from './Component/Doctor/VerifyDoctor';
import DoctorProfile from './Component/DoctorProfile';
import Home from './Component/Home';
import LogIn from './Component/Login';
import Header from "./Component/Navigate";
import Register from './Component/Register';
import SearchResult from './Component/SearchResults';
import Medicine from './Component/ShowMedicine';
import ShowSinglePost from './Component/ShowSinglePost';
import Successful from './Component/Successful';
import AddReview from './Component/Users/AddReview';
import AppointMent from './Component/Users/Appointment';
import Cart from './Component/Users/Cart';
import Checkout from './Component/Users/Checkout';
import UserProfile from './Component/Users/UserProfile';
function App() {
  return (
    <div className="App">
       <Helmet>
                <meta charSet="utf-8" />
                <title>Trendews</title>
            </Helmet>
      <Header/>
       <Routes>
         <Route path="/" element={<Home/>}></Route>
      <Route path="/medicine/:id" element={<Medicine/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/newmedicine" element={<AddMedicine/>}></Route>
      <Route path="/users/cart" element={<Cart/>}></Route>
      <Route path="/doctor/list" element={<DoctorList/>}></Route>
      <Route path="/doctor/doctorprofile/:id" element={<DoctorProfile/>}></Route>
      <Route path="/doctor/posts/:id" element={<ShowSinglePost/>}></Route>
      <Route path="/doctor/doctorownprofile" element={<DoctorOWnProfile/>}></Route>
      <Route path="/verifydoctor" element={<VerifyDoctor/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      <Route path="/doctor/write" element={<AddPost/>}></Route>
      <Route path="/doctor/posts" element={<BlogPosts/>}></Route>
      <Route path="/search/:search" element={<SearchResult/>}></Route>
      <Route path="/appointment/:id" element={<AppointMent/>}></Route>
      <Route path="/userprofile" element={<UserProfile/>}></Route>
      <Route path="/successful" element={<Successful/>}></Route>
    
      <Route path="/doctor/addreview" element={<AddReview/>}></Route>
      <Route path="/denied" element={<Denied/>}></Route>
      <Route path="/admin/login" element={<AdminLogin/>}></Route>
     </Routes>
    </div>
  );
}
export default App;
