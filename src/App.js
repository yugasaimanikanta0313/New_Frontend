import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify';
import Success from './components/Success';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AddArt from './components/AddArt';
import ViewArts from './components/ViewArts';
import ViewArt from './components/ViewArt';
import UpdateArt from './components/UpdateArt';
import Shop from './components/shop';
import UserViewArts from './components/UserViewArts';
import UserViewArt from './components/UserViewArt';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import { getSession } from './utils/cookieUtils'; 
import GetAllUsers from './components/GetAllUsers';
import ProfileUpdate from './components/ProfileUpdate';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
    const userId = getSession('userId');
    return (
        <Router>
            <>
                <Routes>
                
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/adminHome" element={<AdminHome />} />
                    <Route path="/userHome" element={<UserHome />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/userviewarts' element={<UserViewArts />} />
                    <Route path="/profileupdate" element={<ProfileUpdate />} /> 
                    {/* <Route path='/userviewart/:artId' element={<UserViewArt />} /> */}
                    <Route path="/art/:artId" element={<UserViewArt />} />
                    {/* <Route path="/wishlist/" element={<Wishlist />} /> */}
                    <Route path="/view-all-users" element={<GetAllUsers />} />
                    <Route path="/wishlist" element={<Wishlist userId={userId} />} /> {/* Ensure userId is passed */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add-art" element={<AddArt />} />
                    <Route path="/view-art" element={<ViewArts />} />
                    <Route path="/view-art/:artId" element={<ViewArt />} />
                    <Route path="/arts/update/:artId" element={<UpdateArt />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
                </>
            
        </Router>
    );
}

export default App;