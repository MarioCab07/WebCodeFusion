import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./hamburguer.css"
import { findMe } from "../../../services/api.services";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";



const Hamburguer =()=>{
    const navigate =useNavigate();
    const [menuOpen,setMenuOpen]= useState(false);
    const token= sessionStorage.getItem('token'||'');
    const [isAdmin,setIsAdmin]=useState(false);
    const [isLogged,setIsLogged]=useState(false);

    const toggleMenu =()=>{
        const state=menuOpen;

        setMenuOpen(!state)
        
    }

    

    const logout=()=>{
        sessionStorage.setItem('token',"");
        sessionStorage.setItem('roles',[]);
        navigate("/login")
    }


    useEffect(()=>{

        const fetchUser=async()=>{
            const response=await findMe(token);
            if(!response){
                return
            }
            if(response.data.roles[1]==="admin"){
                setIsAdmin(true);
            }
            

        }

        fetchUser();
        if(token){
            
            setIsLogged(true)
        }else{
            setIsLogged(false)
        }
       


    },[isLogged,token])
   
    return (
        <>

        <div className="hamburguer" onClick={toggleMenu} >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>

        
        
        <nav className={`toggle-menu ${menuOpen ? 'open':''}`}>
            <div className="arrow-container"><IoCloseOutline style={{ fontSize: '2em' }} className="arrow" onClick={toggleMenu}/></div>

            <div className="toggle-div">
            <ul className="menu-options">
            
                <li>
                   <NavLink to={"/"}>Home</NavLink> </li>

                  {isLogged ? 
                  <>
                  <li> <NavLink to={"/HyperTextRace"}>HyperTextRace</NavLink>
                   </li> 
                   <li> <NavLink to={"/CssGame"}>Style Paper</NavLink>
                   </li> 
                  </>
                  : 
                  <>
                  <li> <NavLink to={"/login"}>Log In</NavLink> </li>
                  <li> <NavLink to={"/Signup"}>Sign Up</NavLink> </li>
                  </>
                  
                  
                  } 
               
               
                <li><NavLink to={"/learn"}>Aprender</NavLink></li>
                {isAdmin ? <li><NavLink to={"/admin"}>Admin</NavLink></li>:null}
                
            </ul>

                  {isLogged ?  <div className="logout" onClick={logout}>
                  <button >Log Out  </button>
                  <CiLogout size={30} />
                  </div>:null}
                  </div>
            
        </nav>
        </>
    )
}

export default Hamburguer;