import {  useState } from "react";
import "./adminview.css"
import { saveSelector } from "../../../services/api.services";
import { FaCheck } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

const AddSelector=()=>{
    
const Token = sessionStorage.getItem('token'||'');
const initalFormData={
    selector:"",
    description:""
};

const [formData,setFormData]=useState(initalFormData);
const [errors,setErrors]=useState([]);
const [showError,setShowError]=useState(false);
const [inserted,setInserted]=useState(false);

const handleChange =(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}


const handleReset =()=>{
    setFormData(initalFormData)
}


const handleSubmit=async(e)=>{
    e.preventDefault();
    const response =await saveSelector(formData,Token);

    if(response[0]===400){
        setErrors(response[1]);
        setShowError(true);
        setInserted(false);

    }else if(response[0]===201){
        setErrors([]);
        setShowError(false);
        setInserted(true);
    }
    
    
}



    return (
        <>
        <form action="" id="AddForm" onSubmit={handleSubmit}>
            <div className="inputs">
                <div className="input">
                    <label htmlFor="selector">Selector:</label>
                    <input type="text" name="selector" onChange={handleChange} value={formData.selector}/>
                    </div>
                <div className="input">
                    <label htmlFor="description">Descripcion:</label>
                    <input type="text" name="description" onChange={handleChange} value={formData.description}/>
                    </div>
               
            </div>

           {showError ? <div className="error-div">
            <hr />
            <h3>*Debes cumplir estos requisitos</h3>
            <ul>
                {errors.map((t,index)=>{
                    return (
                        <li key={index}>{t.message}</li>
                    )
                })}
            </ul>
           </div>:null } 

           {inserted ? <div className="inserted-div">
            <FaCheck size={30} color="green"/>
            <h3>Selector Agregado</h3>
           </div>:null}

        <div className="opt-btn">
        <button type="submit">
                    Agregar  <FaFileUpload size={25}/>
                </button>
                <button type="button" onClick={handleReset}>
                    Reiniciar <MdOutlineRestartAlt size={25}/>
                </button>

        </div>

        </form>
        </>
    )
}


export default AddSelector;