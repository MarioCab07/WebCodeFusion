import { NavLink } from "react-router-dom";
import Hamburguer from "../hamburguer/hamburguer";
import "./header.css"
import { useState,useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
    const token = sessionStorage.getItem('token' || '');
    const [isLogged, setIsLogged] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
  
    useEffect(() => {
      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }, [isLogged, token]);
  
    const handleDropdownOpen = () => {
      setShowDropdown(true);
      
    };
  
    const handleDropdownClose = () => {
        setShowDropdown(false);
        
      };
    return (
      <>
        <section className="header-sec">
          <Hamburguer />
          <header id="header"  onMouseLeave={handleDropdownClose}>
            <h1 id="main-title">
              <NavLink to="/">WebCodeFusion</NavLink>
            </h1>
            <ul >
               
              <NavLink to={"/learn"} onMouseEnter={handleDropdownClose}>
                <li>Aprender</li>
              </NavLink>
              {isLogged ? (
                <>
                 <NavLink to={"/community"}><li>Comunidad</li></NavLink>
                <div className="dropdown-menu-father" onMouseEnter={handleDropdownOpen}  >
                  Jugar<IoMdArrowDropdown />
                  
                    <div className={`dropdown-menu ${showDropdown ? "show":null}`}  onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose}>
                        <NavLink to={"/HyperTextRace"}>HyperTextRace</NavLink>
                        <NavLink to={"/CssGame"}>Style Paper</NavLink>
                    </div>
                  
                </div>
                </>
              ) : null}
            </ul>
            <hr />
          </header>
        </section>
      </>
    );
  };
  
  export default Header;