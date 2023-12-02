/*
MIT License

Copyright (c) [2023-2024] [WebCodeFusion]
*/

import Header from "../header/header";
import "./adminview.css";
import { NavLink } from "react-router-dom";
import {useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import AddTag from "./addTag";
import AddSelector from "./addSelector";
import AddAttribute from "./addAttribute";
import AddLength from "./addLenght";
import AddProperty from "./addProperty";



const AdminView=()=>{
    
    const Token=sessionStorage.getItem('token' || '');
    
    const [roles,setRoles]=useState([]);
    const [visible,setVisible]=useState(false);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState('seccion1');

  const handleClick = (seccion) => {
    setSeccionSeleccionada(seccionSeleccionada === seccion ? null : seccion);
  };
    

    useEffect(()=>{
        
        

        if(Token){
            const roles = JSON.parse(sessionStorage.getItem('roles'))
           
           setRoles(roles);
            setVisible(true);

        }else{
            
            setVisible(false)
        }
        
    },[Token]);

    useEffect(()=>{

        if(roles){
            if(roles.includes("admin")){
                setVisible(true)
            }else{
                setVisible(false)
            }
            
        }
    },[roles])




    return(
        <section className="admin-view ">
            <Header/>


     
      <div className="admin-div">
      
      <section className="admin-content">

{visible ?
<>
<div>
<h2 className="admin-title">Insercion de Datos</h2>
      <div className="options-div">
        <h3
          onClick={() => handleClick('seccion1')}
          className={seccionSeleccionada === 'seccion1' ? 'active' : ''}
        >
          Agregar Etiquetas
        </h3>
        <h3
          onClick={() => handleClick('seccion2')}
          className={seccionSeleccionada === 'seccion2' ? 'active' : ''}
        >
          Agregar Selectores
        </h3>


        <h3 onClick={()=>handleClick('seccion3')} className={seccionSeleccionada==='seccion3' ? 'active' : ''}>Agregar Atributos</h3>

        <h3 onClick={()=>handleClick('seccion4')} className={seccionSeleccionada==='seccion4' ? 'active' : ''}>Agregar Longitudes</h3>

        <h3 onClick={()=>handleClick('seccion5')} className={seccionSeleccionada==='seccion5' ? 'active' : ''}>Agregar Propiedades</h3>




      </div>

      <div className="option-content">
        {seccionSeleccionada === 'seccion1' && (
         
            <AddTag />
          
        )}

        {seccionSeleccionada === 'seccion2' && (
          
            <AddSelector/>
          
        )}

        {seccionSeleccionada === 'seccion3' && (
          
          <AddAttribute/>
        
      )}

{seccionSeleccionada === 'seccion4' && (
          
          <AddLength  />
        
      )}
      {seccionSeleccionada === 'seccion5' && (
          
          <AddProperty  />
        
      )}


      </div>
    </div>



</>
:
 <section className="forbidden">
    <FaLock size={80}/>
    <h3>No tienes permiso para ver esta pagina</h3>
    
    <NavLink className={"button"} to={Token ? "/learn/html":"/"}><FaArrowLeft size={40}/></NavLink>
</section>}
</section>
      </div>
       
        
       

        </section>
    )
}

export default AdminView;