/*
MIT License

Copyright (c) [2023-2024] [WebCodeFusion]
*/

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './css_game.css'
import Header from '../header/header';
import axios from 'axios';
import { saveGame } from '../../../services/api.services';
import { rankedGames } from '../../../services/api.services';
import { LuCrown } from "react-icons/lu";

const CssGame = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCodeInput, setCssCodeInput] = useState('');
  const [nivel, setNivel] = useState(1);
  const [problem, setProblem] = useState('');
  const totalLevels = 20;
  const [puntos, setPuntos] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const Token=sessionStorage.getItem('token' || '');
  const [IsAdmin,setIsAdmin]=useState(false);
  const [isLogged,setIsLogged]=useState(false);
  const [puntosGuardados, setPuntosGuardados] = useState(false);
  const [respuestaEnviada, setRespuestaEnviada] = useState(Array(totalLevels).fill(false));
  const [Userpoints, setUserpoints] = useState(0);
  const [games,setGames]=useState([]);
  const [fetchedGames,setFetched]=useState(false);
  const Juego = {
    name: "StylePaper",
    puntuation: puntos,
  };
  const nonJump = (input) => {
    if (typeof input === "string") {
      return input.replace(/\n\s*/g, "");
    } else {
      console.error("El input no es una cadena de texto.");
      return input;
    }
  };
  
  const calculatePoints = () => {
    const totalPoints = 1000;
    const totalLevels = 20;
  
    let puntos = totalPoints / totalLevels;
  
    return puntos;
  };

  useEffect(() => {
    const fetchUser=async()=>{
      const response=await findMe(Token);
      if(!response){
          return
      }
      if(response.data.roles[1]==="admin"){
          setIsAdmin(true);
      }
    }
      fetchUser();
      if(Token){
        setIsLogged(true)
      }else{
        setIsLogged(false)
      }
  },[isLogged,Token])

  useEffect(() => {
    switch (nivel) {
      case 1:
        setHtmlCode('<div class="box"></div>');
        setProblem('Añádele la clase "cuadrado" un color (rojo) y un tamaño de height: 10px * weight: 10px.\n\nRecomendable hacer uso del orden de: height: 10px , width: 10px, background-color: red');
        break;
      case 2:
        setHtmlCode('<header>\n   <h1>Mi Página Web</h1> \n</header>');
        setProblem('Estiliza el título para que tenga un color diferente al predeterminado.\n\nRecomendable hacer uso del orden para el header: text-align: center, background-color: #ccfff5, padding: 20px, luego para el h1 hacer uso de: color: #3366cc y margin: 0');
        break;
      case 3:
        setHtmlCode('<ul>\n        <li class="rojo">Elemento 1</li>\n        <li class="azul">Elemento 2</li>\n        <li class="amarillo">Elemento 3</li> \n</ul>');
        setProblem('Estiliza los elementos de la lista para que tengan un fondo de color diferente.\n\nRecomendable hacer uso del orden del ul: list-style-type: none, padding: 0, background-color: #333, y para la ul y li usar: padding: 10px, margin-bottom: 5px, border-radius: 4px y para los 3 colores usar: color: red, color: blue, color: yellow');
        break;
      case 4:
        setHtmlCode('<a href="https://www.ejemplo.com" target="_blank">Visitar Ejemplo</a> ');
        setProblem('Estiliza el enlace para que tenga un color diferente al predeterminado y que cambie de color cuando se coloque sobre él (hover).\n\nRecomendable hacer uso del orden del a: color: #0077cc, text-decoration: none y para el a:hover: color: #ff8c1a; ');
        break;
      case 5:
        setHtmlCode('<figure>\n    <img src="imagen.jpg" alt="Descripción de la imagen">\n    <figcaption>Figura 1: Descripción de la imagen</figcaption> \n</figure>');
        setProblem('Estiliza la imagen para que tenga un borde y el pie de página para que esté centrado y tenga un color diferente.\n\nRecomendable hacer uso del orden del figure: border: 1px solid #ddd, padding: 10px, text-align: center, para el figure img: nwidth: 60%, border: 2px solid #333, border-radius: 8px, y para el figure figcaption: margin-top: 8px, color: #555, font-style: italic ');
        break;
      case 6:
        setHtmlCode('<body> <h1>Título de la Página</h1> <p>Este es un párrafo de ejemplo.</p></body>');
        setProblem('Haga que el fondo del cuerpo (<body>) sea de color azul claro. Estilice el título (<h1>) para que tenga un color de texto blanco, un tamaño de fuente de 24px y esté centrado en la página.Aplique un margen de 20px alrededor del párrafo (<p>) y establezca el color del texto a gris oscuro.\n\nHacer uso de las siguientes caracteísticas para el <body>\nbackground-color, margin, display, flex; flex-direction, align-items, justify-content, height'); 
        break;
      case 7:
        setHtmlCode('<table>       <thead>          <tr>            <th>Nombre</th>           <th>Edad</th>           <th>País</th>           </tr>        </thead>       <tbody>         <tr>           <td>Juan</td>            <td>25</td>            <td>Argentina</td>         </tr>          <tr>           <td>Maria</td>           <td>30</td>           <td>España</td>         </tr>        </tbody>      </table>      ');
        setProblem('Estiliza la tabla para que tenga bordes y colores alternados en las filas.\n\nRecomendable hacer uso del orden de table: width: 100%, border-collapse: collapse, margin-top: 20px, para el th: background-color: #f2f2f2, border: 1px solid #ddd, padding: 8px, tbody tr:nth-child(odd): background-color: #f9f9f9, para el td: border: 1px solid #ddd, padding: 8px, td:first-child: font-weight: bold, para el tbody tr:nth-child(even): background-color: #e6e6e6 ');
        break;
      case 8:
        setHtmlCode('<button type="button">Haz clic</button> ');
        setProblem('Estiliza el botón para que tenga un fondo de color y un color de texto diferentes. Añade un estilo adicional cuando el ratón se coloca sobre él (hover).\n\nRecomendable hacer uso del orden del button:hover: background-color: #2c3e50, color: #ecf0f1 ');
        break;
      case 9:
        setHtmlCode('<video width="320" height="240" controls>      <source src="video.mp4" type="video/mp4">      Tu navegador no soporta el elemento de video.      </video>      ');
        setProblem('Estiliza el elemento de video para que tenga un borde y un fondo diferente. Asegúrate de proporcionar un mensaje alternativo si el navegador no admite el video.\n\nRecomendable hacer uso del orden del video: border: 2px solid #e74c3c, background-color: #ecf0f1, width: 100%, max-width: 800px ');
        break;
      case 10:
        setHtmlCode('<article>    <h2>Título del Artículo</h2>    <p>Contenido del artículo...</p>     <footer>        Publicado el <time datetime="2023-01-01">1 de enero de 2023</time> por Autor.        </footer>     </article>     ');
        setProblem('Estiliza el artículo y los elementos internos para que tengan un diseño atractivo.\n\nRecomendable hacer uso del orden del article: max-width: 600px, margin: 20px auto, padding: 20px, background-color: #f8f8f8, border-radius: 10px, para el article h2: ncolor: #333, border-bottom: 2px solid #3498db, padding-bottom: 10px, para el article p: line-height: 1.6, color: #555, y para el article footer: margin-top: 15px, color: #888, font-size: 0.8em ');
        break;
      case 11:
        setHtmlCode('<p>Soy un texto</p>');
        setProblem('Estiliza el párrafo para que tenga un fondo de color diferente y márgenes.\n\nRecomendable hacer uso del orden del p: background-color: #f2f2f2, padding: 10px, margin: 10px 0;, border: 5px solid #ddd ');
        break;
      case 12:
        setHtmlCode('<a href="#">Ir a Sección</a>');
        setProblem('Estiliza el enlace para que tenga un color diferente y un estilo de texto específico. Añade un estilo adicional cuando el enlace se coloca sobre él (hover).\n\nRecomendable hacer uso del orden del a: color: #0077cc, text-decoration: none, font-weight: bold, transition: color 0.3s, y para el a:hover: color: #004466');
        break;
      case 13:
        setHtmlCode('<img src="imagen.jpg" alt="Descripción">');
        setProblem('Estiliza la imagen para que tenga un borde y un tamaño específico.\n\nRecomendable hacer uso del orden del img: border: 2px solid #333, max-width: 100%, height: auto');
        break;
      case 14:
        setHtmlCode('<hr>');
        setProblem('Estiliza la línea de salto de línea para que tenga un espacio entre elementos específico.\n\nRecomendable hacer uso del orden del hr: nmargin: 20px 0, border: none, height: 2px, background-color: #333');
        break;
      case 15:
        setHtmlCode('<body><h1>Bienvenido a Mi Página</h1><p>Esta es una página de ejemplo con un título y un párrafo.</p></body>');
        setProblem('Estiliza la celda para que tenga un fondo de color diferente y un borde.\n\nRecomendable hacer uso del orden del body: background-color: #f0f0f0, para el p: border: 1px solid #999, padding: 10px, background-color: #fff;');
        break;
      case 16:
        setHtmlCode('<h2>Subtítulo</h2>');
        setProblem('Estiliza el subtítulo para que tenga un color y tamaño específicos.\n\nRecomendable hacer uso del orden de h2: color: blue, font-size: 24px');
        break;
      case 17:
        setHtmlCode('<input type="submit" value="Enviar">');
        setProblem('Estiliza el botón para que tenga un color de fondo y un borde.\n\nRecomendable hacer uso del orden del input[type="submit"]: background-color: #4caf50, color: white, border: 2px solid #4caf50, padding: 10px 20px, cursor: pointer');
        break;
      case 18:
        setHtmlCode('<input type="checkbox" id="miCheckbox" name="miCheckbox" checked>');
        setProblem('Estiliza la casilla para que tenga un estilo personalizado.\n\nRecomendable hacer uso del orden del input[type="checkbox"]: width: 20px, height: 20px, border: 2px solid #3498db, background-color: #ffffff, border-radius: 5px, cursor: pointer');
        break;
      case 19:
        setHtmlCode('<strong>Texto en negrita</strong>');
        setProblem('Estiliza el texto para que tenga un color específico diferente al predeterminado.\n\nRecomendable hacer uso del orden del strong: color: #ff0000;');
        break;
      case 20:
        setHtmlCode('<body><p>¡Hola, mundo!</p></body>');
        setProblem('Estiliza el encabezado para que tenga un fondo y un color de texto personalizado.\n\nRecomendable hacer uso del orden del body: background-color: #e6f7ff, para el p: font-size: 24px, color: #0080ff, text-align: center, padding: 20px, border: 2px solid #004080, background-color: #b3e0ff');
        break;
    }
  }, [nivel]);

  const handleOutput = (e) => {
    if (respuestaEnviada[nivel - 1]) {
      console.log('Respuesta ya enviada para este nivel');
      return;
    }
    
    const iframe = document.getElementById("output");
    iframe.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCodeInput + "</style>";
    
    validarRespuesta(cssCodeInput, puntos, setPuntos);
    
    setRespuestaEnviada((prevRespuestas) => {
      const newRespuestas = [...prevRespuestas];
      newRespuestas[nivel - 1] = true;
      return newRespuestas;
    });
  };


  const obtenerRespuestaCorrecta = (nivel) => {
    switch (nivel) {
      case 1:
        return '.box {\nheight: 10px;\nwidth: 10px;\nbackground-color: red;\n}';
  
      case 2:
        return 'header {\ntext-align: center;\nbackground-color: #ccfff5;\npadding: 20px;\n}\n\nheader h1 {\ncolor: #3366cc;\nmargin: 0;\n}';
      
      case 3:
        return 'ul {\nlist-style-type: none;\npadding: 0;\nbackground-color: #333;\n}\n\nul li {\npadding: 10px;\nmargin-bottom: 5px;\nborder-radius: 4px;\n}\n\nul li.rojo {\ncolor: red;\n}\n\nul li.azul {\ncolor: blue;\n}\n\nul li.amarillo {\ncolor: yellow;\n}';

      case 4:
        return 'a {\ncolor: #0077cc;\ntext-decoration: none;\n}\n\na:hover {\ncolor: #ff8c1a;\n}';

      case 5: 
        return 'figure {\nborder: 1px solid #ddd;\npadding: 10px;\ntext-align: center;\n}\n\nfigure img {\nwidth: 60%;\nborder: 2px solid #333;\nborder-radius: 8px;\n}\n\nfigure figcaption {\nmargin-top: 8px;\ncolor: #555;\nfont-style: italic;\n}';

      case 6: 
        return 'body {\nbackground-color: lightblue;\nmargin: 0;\ntext-align: center;\nheight: 5vh;\n}\n\nh1 {\ncolor: white;\nfont-size: 24px;\n}\n\np {\nmargin: 20px;\ncolor: darkgray;\n}';
        
      case 7: 
        return 'table {\nwidth: 100%;\nborder-collapse: collapse;\nmargin-top: 20px;\n}\n\nth {\nbackground-color: #f2f2f2;\nborder: 1px solid #ddd;\npadding: 8px;\n}\n\ntbody tr:nth-child(odd) {\nbackground-color: #f9f9f9;\n}\n\ntd {\nborder: 1px solid #ddd;\npadding: 8px;\n}\n\ntd:first-child {\nfont-weight: bold;\n}\n\ntbody tr:nth-child(even) {\nbackground-color: #e6e6e6;\n}';

      case 8: 
        return 'button:hover {\nbackground-color: #2c3e50;\ncolor: #ecf0f1;\n}';

      case 9: 
        return 'video {\nborder: 2px solid #e74c3c;\nbackground-color: #ecf0f1;\nwidth: 100%;\nmax-width: 800px;\n}';

      case 10: 
        return 'article {\nmax-width: 600px;\nmargin: 20px auto;\npadding: 20px;\nbackground-color: #f8f8f8;\nborder-radius: 10px;\n}\n\narticle h2 {\ncolor: #333;\nborder-bottom: 2px solid #3498db;\npadding-bottom: 10px;\n}\n\narticle p {\nline-height: 1.6;\ncolor: #555;\n}\n\narticle footer {\nmargin-top: 15px;\ncolor: #888;\nfont-size: 0.8em;\n}';

      case 11: 
        return 'p {\nbackground-color: #f2f2f2;\npadding: 10px;\nmargin: 10px 0;\nborder: 5px solid #ddd;\n}';

      case 12: 
        return 'a {\ncolor: #0077cc;\ntext-decoration: none;\nfont-weight: bold;\ntransition: color 0.3s;\n}\n\na:hover {\ncolor: #004466;\n}';

      case 13: 
        return 'img {\nborder: 2px solid #333;\nmax-width: 100%;\nheight: auto;\n}';

      case 14: 
        return 'hr {\nmargin: 20px 0;\nborder: none;\nheight: 2px;\nbackground-color: #333;\n}';

      case 15: 
        return 'body {\nbackground-color: #f0f0f0;\n}\n\np {\nborder: 1px solid #999;\npadding: 10px;\nbackground-color: #fff;\n}';

      case 16: 
        return 'h2 {\ncolor: blue;\nfont-size: 24px;\n}';

      case 17: 
        return 'input[type="submit"] {\nbackground-color: #4caf50;\ncolor: white;\nborder: 2px solid #4caf50;\npadding: 10px 20px;\ncursor: pointer;\n}';

      case 18: 
        return 'input[type="checkbox"] {\nwidth: 20px;\nheight: 20px;\nborder: 2px solid #3498db;\nbackground-color: #ffffff;\nborder-radius: 5px;\ncursor: pointer;\n}';

      case 19: 
        return 'strong {\ncolor: #ff0000;\n}';
      
      case 20: 
        return 'body {\nbackground-color: #e6f7ff;\n}\n\np {\nfont-size: 24px;\ncolor: #0080ff;\ntext-align: center;\npadding: 20px;\nborder: 2px solid #004080;\nbackground-color: #b3e0ff;\n}';
      }
  };

  const validarRespuesta = (cssCode, puntos, setPuntos) => {
  if (cssCode !== undefined && cssCode !== null) {
    const respuestaCorrecta = obtenerRespuestaCorrecta(nivel);

    const esCorrecto = nonJump(cssCode.trim().toLowerCase()) === nonJump(respuestaCorrecta.trim().toLowerCase());

    setRespuestas([...respuestas, { cssCode, esCorrecto }]);

    if (esCorrecto) {
      setPuntos(puntos + 50);
    }
  } else {
    console.error('Error: cssCode es undefined');
  }
};
  
  const handlePrevLevel = () => {
    if (nivel > 1) {
      setNivel(nivel - 1);
    }
  };

  const handleNextLevel = () => {
    if (nivel < totalLevels) {
      setNivel(nivel + 1);
      setRespuestaEnviada((prevRespuestas) => {
        const newRespuestas = [...prevRespuestas];
        newRespuestas[nivel] = false;
        return newRespuestas;
      });
    }
  };

  const finalizarJuego = async () => {
    console.log(puntos);
    console.log(Juego);
  if (!puntosGuardados && isLogged) {
    try {
      const puntos = calculatePoints();
      setUserpoints(puntos);

      if (!puntosGuardados) {
        setPuntosGuardados(true);

        
        const response = await saveGame(Juego, Token);
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor', error);
    }
  }
};

useEffect(()=>{

  const fetchGames = async()=>{
    const response = await rankedGames("StylePaper");
    console.log(response.data.game);
    if(response.status===200){
      setGames(response.data.game)
      setFetched(true);
    }
  }

  if(isLogged && !fetchedGames){
    fetchGames();
  }
},[games,isLogged,fetchedGames])
  
  return(    
    <body className="game-page">
      <Header />

      <div className="game-div">

        <div className="game-content">

          {isLogged ? (
            <div className="game">
              <div className="flex p-4 place-content-evenly border-0 bg-blue-950">
                <h1 className='m-0 text-white'>Style Paper</h1>
              </div>
              <div className="extra-controls">
                <button className="prelevel" onClick={handlePrevLevel}> ◄ </button>
                <select className="level" value={nivel} onChange={(e) => setNivel(parseInt(e.target.value, 10))}>
                  {Array.from({ length: totalLevels }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Level {index + 1}
                    </option>
                  ))}
                </select>
                <button className="nextlevel" onClick={handleNextLevel}> ► </button>
              </div>
              <div className='task-area'>
                <textarea className="Task" value={problem}></textarea>
              </div>
              <div className='progressbar'>
              <progress value={calculatePoints()} max={1000} className='h-6'></progress>
              </div>
              <div className="playground">
                <div className="left">
                  <label>HTML</label>
                  <textarea name="html" onChange={(e) => setHtmlCode(e.target.value)} value={htmlCode} readOnly></textarea>
                  <label>CSS</label>
                  <textarea name="css" onChange={(e) => setCssCodeInput(e.target.value)}></textarea>
                </div>
                <div className="right">
                  <p className="puntos-text">Puntos: {puntos}</p>
                  <button onClick={handleOutput} >Run</button>
                  {nivel === totalLevels && (<button onClick={finalizarJuego} className="finalizar">Finalizar</button>)}
                  <iframe id="output"></iframe>
                </div>
              </div>

              <section className='ranking-section'>
       
       <article className='ranking'>
       <div className='ranking-title'>

<h3>Ranking </h3>
<LuCrown color='yellow'/>
</div>
 
       
         <div className='rank-labels'>
               <h3>User</h3>
               <h3>Puntuacion</h3>
               </div>
         {games.map((t,index)=>{
           return(
             <>
           
             <div key={index} className='rank-info'>
          
            <h4> {index+1}.  {t.user.username}</h4>
             <h4> {t.puntuation}</h4>
           

             
              
             </div>
            

             </>
           )
         })}
       </article>
       </section>
            </div>
          ) : (
          <>
            <section className="forbidden-content">
              <section className="forbidden">
                <FaLock size={80} />
                <h3>No tienes permiso para ver esta página</h3>
                <NavLink className={"button"} to={Token ? "/learn/html" : "/"}><FaArrowLeft size={40} /></NavLink>
              </section>
            </section>
            </>
        )}
        </div>
      </div>
      
    </body>
  )
}


export default CssGame;
