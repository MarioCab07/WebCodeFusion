import { useEffect, useState } from "react";
import { GetAllSelectors } from "../../../../services/api.services";

const Selectors =()=>{

const [data,setData]=useState([]);
const [hoveredIndex, setHoveredIndex] = useState(null);
const [fetchedData,setFetched]=useState(false);
const fetchData =async()=>{
const response= await GetAllSelectors();
setData(response.selectors);
}

useEffect(() => {
// Lógica para verificar si data está vacío o no
if (data.length > 0) {
setFetched(true);
}
}, [data]);
useEffect(() => {
// Llamar a fetchData solo si fetchedData es falso
if (!fetchedData) {
fetchData();
}
}, [fetchedData]);
return(
<>
<section className="tag-father">

<section className="tag-section">
{data.map((t,index)=>{
return (
<button key={index} className={`tag-container ${hoveredIndex === index ? "expanded" : ""} `}
onMouseEnter={() => setHoveredIndex(index)}
onMouseLeave={() => setHoveredIndex(null)}
>
<h3 className="tagname">{t.selector}</h3>
{hoveredIndex===index &&(
<>
<h3>{t.description}</h3>
</>
)}
</button>
)
})}
</section>

</section>
</>
)
}

export default Selectors;