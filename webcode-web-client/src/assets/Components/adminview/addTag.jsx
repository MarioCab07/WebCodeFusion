import  {  useState } from "react";
import { SaveTag } from "../../../services/api.services";
import { FaCheck } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineRestartAlt } from "react-icons/md";

const AddTag = () => {

    const Token=sessionStorage.getItem('token' || '');
  const initialFormData = {
    tagName: "",
    opening: "",
    closing: "",
    sintaxis: "",
    functioning: "",
    example: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const [showError,setShowError]=useState(false);
  const [inserted,setInserted]=useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset=()=>{
    setFormData(initialFormData)
  }

  const handleTextareaChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });


  };

  const handleSubmit =async (e) => {
    e.preventDefault();
   const response = await SaveTag(formData,Token);

   if(response[0]===400){
    
    setErrors(response[1]);
    setShowError(true);
    setInserted(false);
   }else if(response[0]===201){
    setErrors([]);
    setShowError(false);
    setInserted(true);
   }

    
  };






  return (
    <>
      <form onSubmit={handleSubmit} id="TagForm">
        <div className="inputs">
          <div className="input">
            <label htmlFor="tagName">Etiqueta:</label>
            <input value={formData.tagName} id="tagName" type="text" name="tagName" onChange={handleChange} />
          </div>

          <div className="input">
            <label htmlFor="opening">Apertura:</label>
            <input value={formData.opening} type="text" name="opening" id="opening" onChange={handleChange} />
          </div>

          <div className="input">
            <label htmlFor="closing">Cierre:</label>
            <input value={formData.closing} id="closing" type="text" name="closing" onChange={handleChange} />
          </div>

          <div className="input">
            <label htmlFor="sintaxis">Sintaxis:</label>
            <input value={formData.sintaxis} type="text" name="sintaxis" id="sintaxis" onChange={handleChange} />
          </div>

         

          <div className="input">
            <label htmlFor="functioning">Funcion:</label>
            <textarea
              name="functioning"
              id="functioning"
              onChange={handleTextareaChange}
              value={formData.functioning}
              rows={10}  
              cols={60}
            />
          </div>
          <div  className="input">
            <label htmlFor="example">Ejemplo:</label>
            <textarea
              name="example"
              id="example"
              onChange={handleTextareaChange}
              value={formData.example}
              rows={10}  
              cols={60}
            />
          </div>
        </div>


        {showError ? 
        <div className="error-div"> 
        <hr />
            <h3>*Debes cumplir estos requisitos: </h3>
        <ul>
            {errors.map((t,index)=>{
                return (
                    
                        <li key={index}>{t.message}</li>
                    
                )
        })}
        </ul>
        </div>
         : null}

            {inserted ?<div className="inserted-div">
           <span><FaCheck size={30} color="green"/></span> 
           <span><h3>Etiqueta Agregada</h3></span> 

            
            </div>:null }

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
  );
};

export default AddTag;