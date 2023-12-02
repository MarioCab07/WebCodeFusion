import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from '../header/header';
import axios from 'axios';
import './user_profile.css'

const UserProfile = () => {
    const Token=sessionStorage.getItem('token' || '');
    const [IsAdmin,setIsAdmin]=useState(false);
    const [isLogged,setIsLogged]=useState(false);
    const [userData, setUserData] = useState({
        usuario: 'Nombre del Usuario',
        tipoUsuario: 'user',
        puntosAcumulados: 0,
    });

    useEffect(() => {
        const fetchUser=async()=>{
        const response=await findMe(Token);
        if(!response){
            return
        }
        if(response.data.roles[1]==="admin"){
            setIsAdmin(true);
        }
        }
          fetchUser();
          if(Token){
            setIsLogged(true)
        }else{
            setIsLogged(false)
        }
    },[isLogged,Token])
      
      useEffect(() => {
        
        axios.get('tu/api/endpoint/puntos')
          .then(response => {
            setUserData(prevState => ({
              ...prevState,
              puntosAcumulados: response.data.puntos,
            }));
          })
          .catch(error => {
            console.error('Error al obtener los puntos', error);
          });
      }, []);
    
    return(
        <>
            <body className="profile-page">
                <Header />
                <div className='profile-div'>

                    <div className="profile-content">
                {isLogged ? (
                    <>
                        <section className="profile">
                            
                            <div className='user-stats'>
                                <h2>Nombre del usuario:</h2>
                            </div>
                            <section className="experience">
                                <div className='skill'>
                                    <p><span>HTML</span></p>
                                    <div className="progress" > </div>
                                </div>
                                <div className='skill'>
                                    <p><span>CSS</span></p>
                                    <div className="progress" > </div>
                                </div>
                            </section>
                    </section>
                    </>
                ) : (
                    <>
                        <section className="forbidden-content">
                            <section className="forbidden">
                                <FaLock size={80} />
                                <h3>No tienes permiso para ver esta página</h3>
                                <NavLink className={"button"} to={Token ? "/learn/html" : "/"}><FaArrowLeft size={40} /></NavLink>
                            </section>
                        </section>
                    </>    
                )}
                    </div>
                </div>
            </body>
        </>
    )
}

export default UserProfile;