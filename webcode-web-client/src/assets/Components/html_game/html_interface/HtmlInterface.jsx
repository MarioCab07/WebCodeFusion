/*
MIT License

Copyright (c) [2023-2024] [WebCodeFusion]
*/

import React, { useState, useEffect } from 'react';
import './gameone.css';
import axios from 'axios';  // Importa axios si aún no lo has hecho
import { GetProblem } from '../../../../services/api.services';
import Header from '../../header/header';
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { addLineBreaks } from '../../../../services/api.services';
import { findMe } from '../../../../services/api.services';
import { NavLink } from 'react-router-dom';
import { saveGame } from '../../../../services/api.services';
import { rankedGames } from "../../../../services/api.services";
import { LuCrown } from "react-icons/lu";


const HtmlInterface = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const totalLevels = 35;
  const [htmlCode, setHtmlCode] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [problem, setProblem] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');
  const [buttonText, setButtonText] = useState('Check');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isGameDisabled, setIsGameDisabled] = useState(false);
  const [puntosGuardados, setPuntosGuardados] = useState(false);
  const [explanationExpanded, setExplanationExpanded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const Token = sessionStorage.getItem('token' || '');
  const [userpoints, setUserpoints] = useState(0);
  const [games,setGames]=useState([]);
  const [fetchedGames,setFetched]=useState(false);

  const Juego = {
    name:"HyperText",
    puntuation:userpoints
  }

  saveGame(Juego, Token);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await findMe(Token);
      if (!response) {
        return;
      }
      if (response.data.roles[1] === "admin") {
        setIsAdmin(true);
      }
    }
    fetchUser();
    if (Token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [isLogged, Token])

  useEffect(() => {
    const fetchData = async () => {
      const problemData = await GetProblem(currentLevel);
      setProblem(problemData);
      setIsCorrectAnswer(null);
      setFeedbackMessage('');
      setFeedbackColor('');
      setHtmlCode('');
      run();
    };

    fetchData();
  }, [currentLevel, isLogged, Token]);

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
    const totalLevels = 35;
  
    let points = Math.floor((totalPoints / totalLevels) * (currentLevel - 1));

  return points >= 0 ? points : 0;
  };

  const handlePrevLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < totalLevels) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const handleClearClick = () => {
    setHtmlCode('');
    setIsCorrectAnswer(null);
    setFeedbackMessage('');
    setFeedbackColor('');
  };

  const handleExampleClick = (exampleText) => {
    setHtmlCode((prevHtmlCode) => prevHtmlCode + exampleText + '\n');
  };

  const yesJump = (resolucion) => {
    if (resolucion) {
      const saltos = resolucion.replace(/\\n/g, "\n");
      return saltos;
    }
    return '';
  };

  const handleCheckClick = () => {
    if (attempts < 5 && !isGameDisabled) {
      const userAnswerValue = nonJump(document.getElementById('html-code').value);
      const userAnswerArray = userAnswerValue.split(';').map(line => line.trim()).filter(line => line !== '');

      let points = 0;

      if (
        userAnswerArray.length > 0 &&
        (
          userAnswerArray.length === 1 && userAnswerArray[0] === problem.correctSolution ||
          (problem.posibleSolutions && Array.isArray(problem.posibleSolutions) && (
            problem.posibleSolutions.some(possibleSolution => {
              const trimmedSolution = possibleSolution.trim();
              return userAnswerArray.includes(trimmedSolution);
            })
          ))
        )
      ) {
        // Respuesta correcta
        setButtonText('Correcto');
        setFeedbackMessage('Correcto');
        setFeedbackColor('bg-green-500');

        // Calcular y actualizar puntos según la dificultad
        points = calculatePoints();
        setScore(score + points);

        // Mover al siguiente nivel después de 1 segundo
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setHtmlCode('');
        }, 1000);
      } else {
        // Respuesta incorrecta
        setButtonText('Incorrecto');
        setFeedbackMessage('Incorrecto');
        setFeedbackColor('bg-red-500');
        setAttempts(attempts + 1);

        // Si se alcanzan los intentos máximos, desactiva el juego temporalmente
        if (attempts === 4) {
          setIsGameDisabled(true);
          setTimeout(() => {
            setIsGameDisabled(false);
            setAttempts(0);
            setHtmlCode('');
          }, 7000);
        }
      }

      // Restablecer texto del botón y feedback después de 2 segundos
      setTimeout(() => {
        setButtonText('Check');
        setFeedbackMessage('');
        setFeedbackColor('');
      }, 2000);
    }
  };

  const finalizarJuego = async () => {
    if (!puntosGuardados && isLogged) {
      try {
        const points = calculatePoints();  // Calcular puntos aquí
        setUserpoints(points);  // Almacenar puntos en userpoints
        const response = await saveGame(Juego, Token)
      } catch (error) {
        console.error('Error al comunicarse con el servidor', error);
      }
    }
  };

  const run = () => {
    const output = document.getElementById('output');
    output.contentDocument.body.innerHTML = htmlCode;
  };

  const handleRunClick = () => {
    run();
    setIsCorrectAnswer(null);
    setFeedbackMessage('');
    setFeedbackColor('');
  };


  useEffect(()=>{

    const fetchGames = async()=>{
      const response = await rankedGames("Style Paper");
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

  return (
    <div className='game-content'>
      <Header />

      {isLogged ? (
        <>
          <div className='flex p-4 place-content-evenly border-0 bg-blue-950'>
            <h1 className='m-0 text-white'>HyperTextRace</h1>

            <div >
            <div className='text-white text-2xl '> Puntos: {calculatePoints()}</div>
            </div>

            <section className='flex'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-l ' onClick={handlePrevLevel}>
                ◄
              </button>
              <select
                className='bg-gray-300 text-gray-700 px-4 py-2'
                value={currentLevel}
                onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10))}
              >
                {Array.from({ length: totalLevels }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Level {index + 1}
                  </option>
                ))}
              </select>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-r' onClick={handleNextLevel}>
                ►
              </button>
            </section>
          </div>

          <div className={'container ' + (isGameDisabled ? 'disabled' : ' ')}>
            <div className='left'>
              {problem ? (
                <>
                  <label className='pl-4 text-[white] flex items-center h-[30px]'>Level: {problem.level}</label>
                  <div className={'w-full text-black text-lg ml-0 mr- mt-0 mb-2 px-4 py-2.5 border-0 bg-slate-50 h-min ' + (isCorrectAnswer === true ? 'bg-green-500' : isCorrectAnswer === false ? 'bg-red-500' : '')}>
                    <p>{problem.problem}</p>
                    {currentLevel <= 29 ? (
                      <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => handleExampleClick(yesJump((problem.example)))}
                        className='relative'
                      >
                        Ejemplo: {addLineBreaks(problem.example)}
                        {isHovered && problem.functioning && (
                          <div className='absolute bg-white p-2 mt-2 border border-gray-300 shadow'>
                            {problem.functioning}
                          </div>
                        )}
                      </button>
                    ) : (
                      <>
                        <label className='block mt-2 mb-0 text-[white]'>Etiquetas a usar:</label>
                        <div className='flex items-center mb-2'>
                          {problem.tag.split(';').map((tag, index) => (
                            <span key={index} className='mr-2 mb-2 px-2 py-1 border border-gray-300 shadow-md inline-block'>{'<' + tag.trim() + '>'}  </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                </>
              ) : (
                <p>Cargando problema...</p>
              )}

              <label className='flex place-content-evenly'>
                HTML
                <button className='bg-green-500 rounded-2xl px-2' onClick={handleRunClick}>Ejecutar</button>
                <button className='bg-red-500 rounded-2xl px-2' onClick={handleClearClick}>Limpiar</button>
              </label>
              <textarea
                id='html-code'
                className='textarea'
                onChange={(e) => setHtmlCode(e.target.value)}
                value={htmlCode}
                onKeyUp={run}
              ></textarea>
              {problem ? (
                <>
                  <div className='mt-4'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded w-full'
                      onClick={() => setExplanationExpanded(!explanationExpanded)}
                    >
                      Ayuda
                    </button>
                    {explanationExpanded && (
                      <textarea
                        id='explanation-code'
                        className='textarea'
                        value={yesJump(problem?.explanation)}
                        readOnly
                        style={{ height: 'auto', minHeight: '250px' }}
                      ></textarea>
                    )}
                  </div>
                </>
              ) : (
                <p>Cargando pista...</p>
              )}

            </div>

            <div className='right'>
              <label>
                <i className='fa-solid fa-code'></i>Output
              </label>
              <iframe id='output' className='iframe'></iframe>

              <div className='mt-4'>
                <button className={'bg-blue-500 text-white px-4 py-2 rounded w-full' + feedbackColor} onClick={handleCheckClick}>
                  {buttonText}
                </button>
                {currentLevel === totalLevels && (<button onClick={finalizarJuego} className="finalizar">Finalizar</button>)}
              </div>

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
        </>
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
  );
}

export default HtmlInterface;
