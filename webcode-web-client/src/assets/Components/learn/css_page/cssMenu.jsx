import Selectors from "./cssSelector";
import "./cssMenu.css"
import { useState } from "react";
import Property from "./cssProperty";
import Length from "./cssLength";

const CssMenu = () => {

    const [section,setSection]=useState('selectors');

    const handleSection=(e)=>{
        setSection(e.target.value)
        
    }


    return(
        <>
            
            <section className="css-menu">


            <article className="css-intro-card">
            <h3>Que es CSS</h3>    

        <div className="css-intro-info">
            <p>Hojas de estilo en casquete (CSS) es un lenguaje de hoja de estilos utilizado para describir la presentación de un documento escrito en HTML o XML (incluyendo dialectos XML como SVG, MathML o XHTML). CSS describe cómo los elementos deben ser renderdos en pantalla, en papel, en el habla o en otros medios.</p>
            <p>Después de CSS 2.1, el alcance de la especificación aumentó significativamente y el progreso en diferentes módulos CSS comenzó a diferir tanto, que se hizo más efectivo para desarrollar y publicar recomendaciones por separado por módulo.</p>
        </div>

            </article>      


        <ul>

            <li><button className={section==='selectors' ? 'active':null} value={"selectors"} onClick={handleSection}>Selectores</button></li>
            <li><button className={section==='properties' ? 'active':null} value={"properties"} onClick={handleSection} >Propiedades</button></li>
            <li><button className={section==='lengths' ? 'active':null} value={"lengths"} onClick={handleSection}>Longitudes</button></li>
        </ul>

        {section ==='selectors' ? <Selectors/>:null}
        {section ==='properties' ? <Property/>:null}
        {section === 'lengths' ? <Length/>:null}
            
            </section>
        </>
    )
}

export default CssMenu;