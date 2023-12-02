import {  useState } from "react";
import { SaveLength } from "../../../services/api.services";
import { FaCheck } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

import "./adminview.css"

const AddLength =()=>{

    const Token = sessionStorage.getItem("token"||"");
    const initalFormData ={
        lenght:"",
        description:"",
        type:""
    }

    const [formData,setFormData]=useState(initalFormData);
    const [errors,setErrors]=useState([]);
    const [showError,setShowError]=useState(false);
    const [inserted,setInserted]=useState(false);

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleReset =()=>{
        setFormData(initalFormData)
    }

    
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const response = await SaveLength(formData,Token);

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
                    <label htmlFor="lenght">Longitud:</label>
                    <input type="text" name="lenght" onChange={handleChange} value={formData.lenght} />
                </div>

                <div className="input">

            <label htmlFor="description">Description:</label>
        <textarea
            name="description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            rows={10}  
            cols={40}

            />

        </div>

        <div className="input">

            <label htmlFor="type">Tipo:</label>
        <select name="type" id="select" onChange={handleChange}>
            <option value={""}>-</option>
            <option value="Relative">Relative</option>
            <option value="Absolute">Absolute</option>

        </select>

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
            <h3>Longitud Agregada</h3>
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

export default AddLength;