import { useState, useEffect } from "react";
import { getTagsByQuery } from "../../../../services/api.services";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import "./tags.css";

const Tags = ({setTagSeach,scrollRef}) => {
  const initialOffset = 0;
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [maxData, setMax] = useState(0);
  const [changing, setChanging] = useState(true);
  const [aux,setAux]=useState('');

  const handleTagSearch = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log(aux);
    }
    const { target } = event;
    setAux(() => {
      setTagSeach(target.value);
      return target.value;
    });
    setChanging(!changing);
  };
  const forwardOffset = () => {
    
    const _o = offset + 8;
    setOffset(_o > maxData ? 0 : _o);
  };

  const backwardOffset = () => {
    
    const _o = offset - 8;
    setOffset(_o < 0 ? maxData : _o);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTagsByQuery(offset);
      setData(response.tags);
      setMax(response.count - 7);
    };

    fetchData();

   
  }, [offset]);

  

  return (
    <>
      <section className="tag-father">

        
        <button onClick={backwardOffset}>
          <FaChevronLeft size={50} color="white" />
        </button>
        <section className="tag-section">
          
                {data.map((t, index) => (
                  <button value={t.tagName} onClick={() => handleTagSearch({ target: { value: t.tagName } })}
                    key={index}
                    className={`tag-container ${hoveredIndex === index ? "expanded" : ""} `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <h3 className="tagname">{t.tagName}</h3>
                    {hoveredIndex === index && (
                      <>
                        <h4>Apertura:{t.opening}</h4>
                        <h4>Cierre: {t.closing}</h4>
                        <h4>Funcionamiento: {t.functioning}</h4>
                        
                      </>
                    )}
                  </button>
                ))}
              
           
        </section>
        <button onClick={forwardOffset}>
          <FaChevronRight size={50} color="white" />
        </button>
      </section>
    </>
  );
};

export default Tags;