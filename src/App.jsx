import './App.css';
import Home from './components/visitors/home/Home'
import UserHome from './components/users/userHome/UserHome'
import AdminHome from './components/admins/adminHome/AdminHome'
import SignIn from './components/visitors/signIn/SignIn';
import SignUp from './components/visitors/signUp/SignUp';
import UserProfile from './components/users/profile/UserProfile';
import AddCar from "./components/admins/car/AddCar";
import VisitorCar from './components/visitors/car/Car';
import UserCar from './components/users/car/UserCar';
import RentCar from './components/users/car/RentCar';
import UserOrders from './components/users/orders/UserOrders';
import AdminCar from './components/admins/car/AdminCar'
import AdminProfile from "./components/admins/profile/AdminProfile";
import AdminOrders from "./components/admins/orders/AdminOrders";
import EditCar from "./components/admins/car/EditCar"

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/" element={<Home/>}/>
                    <Route path = "/signin" element={<SignIn/>}/>
                    <Route path = "/signup" element={<SignUp/>}/>
                    <Route path = "/car/:carId" element={<VisitorCar/>}/>

                    <Route path = "/userhome/:userName" element={<UserHome/>}/>
                    <Route path = "/userprofile/:userName" element={<UserProfile/>}/>
                    <Route path = "/addcar/:userName" element={<AddCar/>}/>
                    <Route path = "/usercar/:carId/:userName" element={<UserCar/>}/>
                    <Route path = "/rentcar/:carId/:userName" element={<RentCar/>}/>
                    <Route path = "/user/orders/:userName" element={<UserOrders/>}/>

                    <Route path = "/adminhome/:userName" element={<AdminHome/>}/>
                    <Route path = "/admincar/:carId/:userName" element={<AdminCar/>}/>
                    <Route path = "/adminprofile/:userName" element={<AdminProfile/>}/>
                    <Route path = "/admin/orders/:userName" element={<AdminOrders/>}/>
                    <Route path = "/editcar/:carId/:userName" element={<EditCar/>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;