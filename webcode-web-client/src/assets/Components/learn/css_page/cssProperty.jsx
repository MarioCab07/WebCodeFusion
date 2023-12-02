import { useEffect, useState } from "react";
import { getPropertiesByQuery } from "../../../../services/api.services";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";


const Property =()=>{
    const initialOffset=0;
    const [data,setData]=useState([]);
    const [offset,setOffset]=useState(initialOffset);
    const [hoveredIndex,setHoveredIndex]=useState(null);
    const [maxData, setMax] = useState(0);

    const forwardOffset = () => {
    
        const _o = offset + 6;
        setOffset(_o > maxData ? 0 : _o);
      };
    

      const backwardOffset = () => {
    
        const _o = offset - 6;
        setOffset(_o < 0 ? maxData : _o);
      };
    useEffect(()=>{
        const fetchData = async()=>{
          const response=  await getPropertiesByQuery(offset);
          setData(response.properties);
          setMax(response.count - 6);
        }

        fetchData();
        
    },[offset])


    return (
        <>
        
        <section className="tag-father">

            <button onClick={backwardOffset}>
            <FaChevronLeft size={50} color="white" />

            </button>

            <section className="tag-section">

                {data.map((t,index)=>{

                    return(  <button value={t.property} key={index} className={`tag-container ${hoveredIndex===index ? "expanded" :""}`} onMouseEnter={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)}>

                    <h3 className="tagname">{t.property}</h3>
                    {hoveredIndex ===index &&(
                        <>
                        <h4>Descripcion: {t.description}</h4>
                        <h4>Sintaxis: {t.sintaxis} </h4>
                        </>
                    )}
                </button>)
                  
                })}
            </section>
            <button onClick={forwardOffset}>
          <FaChevronRight size={50} color="white" />
        </button>
        </section>
       
        
        </>
       
    )
}


export default Property;