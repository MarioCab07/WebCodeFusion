import "./signup.css"
import { register } from "../../../services/api.services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../header/header";


const SignUp=()=>{

    const navigate= useNavigate();

    const initialFormData ={
        username:"",
        email:"",
        password:""
    }

    const [formData,setformData]= useState(initialFormData);
    const [arrayErrors,setArrayE]=useState([{}]);
    const [showErrors,setErrors]= useState(false);
    const [showConflict,setShowConflict]=useState(false);
    const [conflict,setConflict]=useState(null);

    const handleChange =(e)=>{
        setformData({
            ...formData,[e.target.name]:e.target.value
        })
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();

        try{
            const response = await register(formData);
            
            if(response[0]===400){
               
                setErrors(true);
                setArrayE(response[1]);
                setShowConflict(false);
                setConflict([])
            }
            
            if(response[0]===409){
                
                setShowConflict(true);
                setConflict(response[1])
                setErrors(false);
                setArrayE([]);

            }

            if(response[0]===201){
                setErrors(false);
                setShowConflict(true);
                    
                setConflict("Usuario Creado");
                

                setTimeout((()=>{
                   
                    navigate("/login")
                }),2000)
            }
            


        }catch(error){
            console.log(error);
            
        }
    }


    return(
        <>
        <section className="sign-sec">

           <Header/>
        
       
        <article className="sign-art">
            

            <div className="title-info">
                <h3 className="title">Create a new Account</h3>
                <span>Already a member? <a className="log-link" href="/login">Log In</a></span> 
            </div>

            <div className="formcontainer">
            <form action="" className="sign-form" onSubmit={handleSubmit}>
                <div className="sign-inputs">

                <div className="input-info">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                </div>

                <div className="input-info">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="input-info">
                <label htmlFor="password">Passsword</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                </div>

                
                </div>

                
                
                
                <button id="sub-btn" type="submit">Create Account</button>
            </form>
           

                {showErrors ? <article className="errors-art">
                <h4>You need to follow this requirements:</h4>
                <ul>
                    {arrayErrors.map(t=>{
                        return <li key={t.index}>{t.message}</li>
                    })}
                </ul>
                </article>:null
                     }

              
                
                
        {showConflict ? <article className="conflict">*{conflict}</article>:null}
                
            </div>



            
            
        </article>

        
        </section>
        </>
    )
}

export default SignUp;