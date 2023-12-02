import Tags from "./tags";
import "./htmlMenu.css"
import TagSearch from "./tagSearch";
import { useState, useRef } from "react";


const HtmlMenu =()=>{
    const [showInfo,setShowInfo]=useState(false);
    const tagSearchScrollRef = useRef(null);
    const [tagSearch, setTagSearch]=useState("");

const handleShow=()=>{
    setShowInfo(true);
}
const handleHide=()=>{
    setShowInfo(false)
}

    return (
        <>
        <section className="html-menu">
           
        

        <article className="intro-card">
            <h3>Que es HTML?</h3>

            <div className="intro-info">
                <p>“HTML (Lenguaje de Marcas de Hipertexto, del inglés HyperText Markup Language) es el componente más básico de la Web. Define el significado y la estructura del contenido web. Además de HTML, generalmente se utilizan otras tecnologías para describir la apariencia/presentación de una página web (CSS)”
</p>

<p>&quot Hipertexto ldquot& hace referencia a los enlaces que conectan páginas web entre sí, ya sea dentro de un único sitio web o entre sitios web. Los enlaces son un aspecto fundamental de la Web. Al subir contenido a Internet y vincularlo a las páginas creadas por otras personas, te conviertes en un participante activo en la «World Wide Web» (Red Informática Mundial).</p>
            </div>
        </article>

        <div onMouseEnter={handleShow} onMouseLeave={handleHide}>
        <h3 className="nav-title">
          Navega por las etiquetas{' '}
          
        </h3>

        </div>
        
        <article  className={`art-info ${showInfo ? 'visible' : ''}`}>
          Haz click sobre una etiqueta para dirigirte al buscador
        </article>

        <TagSearch tagComp={tagSearch} setTagSearch={setTagSearch} scrollRef={tagSearchScrollRef}/>
        <Tags setTagSeach={setTagSearch} scrollRef={tagSearchScrollRef}/>

        

        
        </section>
        
        </>
        
    )
}

export default HtmlMenu;