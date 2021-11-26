import logo from './logo.svg';
import './App.css';
import Home from './components/base/Home/Home'
import UserHome from './components/users/UserHome/UserHome'
import SignIn from './components/users/SignIn/SignIn';
import SignUp from './components/users/SignUp/SignUp';
import Profile from './components/users/Profile/Profile';
import { BrowserRouter, Routes, Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path = "/user-main" element={<UserMain/>}/>  */}
          <Route path = "/" element={<Home/>}/> 

          <Route path = "/signin" element={<SignIn/>}/>
          <Route path = "/signup" element={<SignUp/>}/>

          <Route path = "/user-home/:userName" element={<UserHome/>}/> 

          <Route path = "/profile/:userName" element={<Profile/>}/>

          {/* <Route path = "*" element={<Home/>}/>  */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;