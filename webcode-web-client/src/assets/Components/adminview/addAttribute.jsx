import { useState } from "react";
import { SaveAttribute } from "../../../services/api.services";
import { FaCheck } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";


const AddAttribute =()=>{

    const Token = sessionStorage.getItem('token' || '');
    const initalFormData ={
        name:"",
        meaning:"",
        example:""

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
        const response = await SaveAttribute(formData,Token);

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

   

    return(
        <>
        <form action="" id="AddForm" onSubmit={handleSubmit}>
        <div className="inputs">
                <div className="input">
                    <label htmlFor="name">Nombre:</label>
              
                    <input type="text" name="name" onChange={handleChange} value={formData.name}/>
                    </div>

                <div className="input">

                    <label htmlFor="meaning">Significado:</label>
                    <textarea
              name="meaning"
              id="meaning"
              onChange={handleChange}
              value={formData.meaning}
              rows={10}  
              cols={40}
            />
                   
                    </div>
                    
                    <div className="input">
                    <label htmlFor="example">Ejemplo:</label>
                    <textarea
              name="example"
              id="example"
              onChange={handleChange}
              value={formData.example}
              rows={10}  
              cols={40}
            />
                   
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
            <h3>Atributo Agregado</h3>
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

export default AddAttribute;