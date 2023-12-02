
import { useNavigate} from 'react-router-dom'
import {  useState } from "react";
import { login } from "../../../services/api.services";
import { useEffect } from 'react';
import "./login.css"
import { findMe } from '../../../services/api.services';



import Header from '../header/header';




const LogIn = () => {
    const navigate= useNavigate();

   
  const admin="admin";
  
    const initalFormData ={
        identifier:"",
        password:""
    }

  const [FormData, setFormData] = useState(initalFormData);
  const [success,setSuccess]=useState(false);
  const [roles,setRoles]=useState([]);
  const [token,setToken]=useState("");
  const [user,setUser]=useState("");
  
 const [error,setError]= useState(false); 

 

 const handleChange =(e)=>{
    setFormData({
        ...FormData,[e.target.name]:e.target.value
    })

    setError(false)
 }

 const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await login(FormData);
        if(response===404 || !response){
          
          setError(true)
      }else{
        setToken(response.token);
        
        const info = await findMe(response.token);
        
        setUser(info.data.username)
      setRoles(info.data.roles)
        setSuccess(true);

        
      }


    }catch(error){
        console.log(error);
    }

 }

 

 useEffect(()=>{
  const saveSession=()=>{

    sessionStorage.setItem('token',token);
    sessionStorage.setItem('roles',JSON.stringify(roles));
    sessionStorage.setItem("user",user);
  
   }

  if (success) {

    
    saveSession();
    

    if(roles.includes(admin)){
      
      navigate("/admin")
    }else{
      navigate("/learn")
    }

    
  }else{
    
    sessionStorage.setItem('token','');
  sessionStorage.setItem('roles',[]);
  sessionStorage.setItem("user","");
  }

 
  
 },[success,navigate,roles,user,token])
 

  

  return (
    <>

    <section className="log-sec">
      <Header/>
        <article className="logIn">
          <h4>LogIn</h4>
          <form action="" className="log-form" onSubmit={handleSubmit}>
            <input
             id='identifier'
             name='identifier'
             placeholder='Username or email'
             type='text'
             value={FormData.identifier}
             onChange={handleChange}
            />
            <input
             id='password'
             name='password'
             placeholder='Password'
             type='password'
             value={FormData.password}
             onChange={handleChange}
            />

            {error ? <article className='error-art'>*User or password incorrect</article>:undefined}

            <button id="submit-btn" type="submit" >
              LogIn
            </button>
          </form>
        </article>
        </section> 
    
     
       


      
    </>
  );
};

export default LogIn;