import { useEffect, useState } from "react";
import { GetTag } from "../../../../services/api.services";
import "./tagSearch.css"


const TagSearch=({tagComp="",setTagSearch,scrollRef})=>{

    const[tag,setTag]=useState(tagComp);
    const[newTag,setNewTag]=useState([{}]);
    const[showResult,setShow]=useState(false);
    const [notFound,setNotFound]=useState(false);
    const [use,setUse]=useState(true);
    const [aux,setAux]=useState('');
    const [showCard,setShowCard]=useState(false)

    const fetchTag= async(e)=>{
        e.preventDefault();
        const response = await GetTag(tag);
        
        if(response){
            setNewTag(response);
            setShowCard(true)
            
            
        }else{
            setShow(false);
            setNotFound(true);
        }
        
    }
    const handleDelete=()=>{
        setTagSearch(null);
        setShow(false);
        setNewTag([{}])
        setShowCard(false);
        setAux('')
    }

    useEffect(()=>{
        if(aux){
            setTag(aux);
        }

        if(!tagComp){
            setUse(false)
        }else{
            setUse(true)
            setTag(tagComp);
        }

        if(newTag){
            setShow(true);
            setNotFound(false);
            
        }else{
            
            setShow(false);
        }

        
    },[newTag,tagComp,aux])

    const handleChange =(e)=>{
        
        setAux(e.target.value);
    }

    return (
        <section ref={scrollRef} className="tag-search" onSubmit={fetchTag}>
    
            <form action="" >
        
        <input type="text" name="tag" placeholder="Search..." onChange={handleChange} value={ use ? tagComp:aux} />
        <div className="btn-div">
        
        <button type="submit" className="search">Buscar</button>
        <button onClick={handleDelete} type="button" className="delete">Borrar</button>
        </div>
       
            </form>

            
            {showCard &&
  (showResult ? (
    <>
      <div className="search-result">
        <h2>Etiqueta: {newTag.tagName}</h2>
        <h3>Apertura: {newTag.opening}</h3>
        <h3>Cierre: {newTag.closing}</h3>
        <h3>Funcion: {newTag.functioning} </h3>
        <h3>Sintaxis: {newTag.example}</h3>
        <h3>Ejemplo:</h3>
        <div className="div-example" dangerouslySetInnerHTML={{ __html: newTag.example }} />
      </div>
    </>
  ) : notFound ? (
    <h3>Etiqueta no encontrada</h3>
  ) : null)}


        </section>
    )
}


export default TagSearch;