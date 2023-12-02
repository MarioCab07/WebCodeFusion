
/*
MIT License

Copyright (c) [2023-2024] [WebCodeFusion]
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./assets/Components/main_page/main_page";
import LogIn from "./assets/Components/login/login";
import SignUp from "./assets/Components/signup/signup";
import CssGame from "./assets/Components/css_game/css_game";
import HtmlInterface from "./assets/Components/html_game/html_interface/HtmlInterface";
import UserProfile from "./assets/Components/userprofile/user_profile";
import './App.css'
import Learn from "./assets/Components/learn/learn";
import Community from "./assets/Components/community/community";


import AdminView from "./assets/Components/adminview/adminview";




function App() {
  
  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<LogIn /> }/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/HyperTextRace" element={<HtmlInterface/>}/>
        





        <Route path="/learn" element={<Learn/>}/>
        <Route path="/admin" element={<AdminView />}/>
        <Route path="/User" element={<UserProfile/>}/>

        <Route path="/CssGame" element={<CssGame/>}/>
        <Route path="/community" element={<Community/>}/>

      </Routes> 

      
      </BrowserRouter>
      
    
      
    </>
  )
}

export default App
