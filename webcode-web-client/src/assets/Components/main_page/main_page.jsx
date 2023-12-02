/*
MIT License

Copyright (c) [2023-2024] [WebCodeFusion]
*/

import { useEffect, useState } from "react";
import "./main_page.css"
import { NavLink } from "react-router-dom";

const Main=()=>{

    const Token = sessionStorage.getItem('token'||"");
    const [isLogged,setIsLogged]=useState(false);

    useEffect(()=>{
        if(Token){
            
            setIsLogged(true);
        }else{
            
            setIsLogged(false);
        }
    },[Token])

    return (
        <>
        <section className="main-content">
            <header className="main-header">

                {isLogged ? 
                <>
                <NavLink className={"main-btn"} to={"/learn"}>Aprender</NavLink>
                <NavLink className={"main-btn"} to={"/HyperTextRace"}>Jugar</NavLink> 
                </>
                :
                <>
                 <NavLink className="main-btn" to="login">Log In</NavLink>
                <NavLink className="main-btn" to="/signUp">Sign Up</NavLink> 
                </>
               
                }
               
                
                
                
            </header>
            <article className="info-container">

                <div className="title-container">
                <h1>WebCodeFusion</h1>
               
                <h3>Level up your coding with games,
                puzzles, and challenges</h3>
                <NavLink className="main-btn learnbtn" to="/learn">Empezar a Aprender</NavLink>
                </div>
                {/* <NavLink className="learn-btn" to="html">Start Learning</NavLink> */}
                
                
            </article>

        </section>
        </>
    )
}

export default Main;