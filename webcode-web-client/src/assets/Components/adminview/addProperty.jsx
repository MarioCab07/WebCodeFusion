import { useEffect, useState } from "react";
import { SaveProperty } from "../../../services/api.services";
import { FaCheck } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";
import "./adminview.css"

const AddProperty=()=>{

    const Token = sessionStorage.getItem("token"||"");

    const initialFormData ={
        property:"",
        description:"",
        values:"",
        sintaxis:""
    }

    const [formData,setFormData]=useState(initialFormData);
    const [errors,setErrors]=useState([]);
    const [showError,setShowError]=useState(false);
    const [inserted,setInserted]=useState(false);

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleReset=()=>{
        setFormData(initialFormData)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await SaveProperty(formData,Token);

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

    useEffect(()=>{
        console.log(formData);
    },[formData])

    return (
        
        <>
        <form action="" onSubmit={handleSubmit}>
            <div className="inputs">
            <div className="input">
                    <label htmlFor="property">Propiedad:</label>
                    <input type="text" name="property" onChange={handleChange} value={formData.property} />
                </div>
                <div className="input">
                    <label htmlFor="description">Descripcion:</label>
                    <input type="text" name="description" onChange={handleChange} value={formData.description} />
                </div>

                <div className="input">
                    <label htmlFor="values">Valores:</label>
                    <input type="text" name="values" onChange={handleChange} value={formData.values} />
                </div>
                <div className="input">
                    <label htmlFor="sintaxis">Sintaxis:</label>
                    <input type="text" name="sintaxis" onChange={handleChange} value={formData.sintaxis} />
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
            <h3>Propiedad Agregada</h3>
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

export default AddProperty;