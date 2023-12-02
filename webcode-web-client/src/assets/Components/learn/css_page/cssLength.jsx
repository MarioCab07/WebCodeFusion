import { useEffect, useState } from "react";
import { GetLength } from "../../../../services/api.services";
import "./length.css"

const Length =()=>{

const initialDta=[];

const [relative,setRelative]=useState(initialDta);
const [absolute,setAbsolute]=useState(initialDta);
const [hoveredIndex,setHoveredIndex]=useState(null);
const [fetchedData,setFetched]=useState(false);


const fetchRelative =async()=>{
const response = await GetLength("relative");
setRelative(response)
}

const fetchAbsolute =async()=>{
const response = await GetLength("absolute")
setAbsolute(response);
}

useEffect(() => {
// Lógica para verificar si data está vacío o no
if (relative.length > 0 && absolute.length >0) {
setFetched(true);
}
}, [relative,absolute]);

useEffect(()=>{

if(!fetchedData){
fetchRelative();
fetchAbsolute();
}
},[fetchedData])

return(
<>

<section className="length-father">
<article className="length-container">
<h3>Relativas</h3>
<article className="rel">
{relative.map((t,index)=>{
return(
<button value={t.property} key={index} className={`tag-container ${hoveredIndex===index ? "expanded" :""}`} onMouseEnter={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)}>

<h4 className="tagname">{t.length}</h4>
{hoveredIndex ===index &&(
<>
<h4>Descripcion: {t.description}</h4>
</>
)}
</button>
)
})}
</article>
</article>

<div className="vertical-line"></div>

<article className="length-container">
<h3>Absolutas</h3>
<article className="abs">
{absolute.map((t,index)=>{
return (
<button value={t.property} key={index} className={`tag-container ${hoveredIndex===index+10 ? "expanded" :""}`} onMouseEnter={()=>setHoveredIndex(index+10)} onMouseLeave={()=>setHoveredIndex(null)}>

<h4 className="tagname">{t.length}</h4>
{hoveredIndex ===index+10 &&(
<>
<h4>Descripcion: {t.description}</h4>
</>
)}
</button>
)
})}
</article>
</article>
</section>

</>
)
}

export default Length;
