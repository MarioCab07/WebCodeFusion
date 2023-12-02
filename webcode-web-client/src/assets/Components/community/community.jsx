import "./community.css";
import { useEffect, useState } from "react";
import {
  saveComment,
  saveResponse,
  likeComment,
  getAllComments,
} from "../../../services/api.services";
import Header from "../header/header";
import { format, parseISO } from "date-fns";
import { GrLike } from "react-icons/gr";
import { saveGame } from "../../../services/api.services";

const Community = () => {
    const Juego={
        name:"HyperText",
        puntuation:120
    }


  const Token = sessionStorage.getItem("token") || "";
  const initialFormData = {
    content: "",
  };
  const maxContentLength = 180;
 
  const [formData, setFormData] = useState(initialFormData);
  const [commentSaved, setSaveComment] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyMenus, setReplyMenus] = useState({});
  const [replyFormData, setReplyFormData] = useState(initialFormData);
  const [visibleResponses, setVisibleResponses] = useState({});

  const fetchData = async () => {
    const response = await getAllComments();
    const updatedComments = response.data.comments.map((comment) => ({
      ...comment,
      liked: comment.likes.includes(Token),
    }));
    setComments(updatedComments);
  };

  const handleChange = (e) => {
    const newContent = e.target.value.slice(0, maxContentLength);
    setFormData({ ...formData, [e.target.name]: newContent });
  };

  const handleReplyChange = (e) => {
    const newContent = e.target.value.slice(0, maxContentLength);
    setReplyFormData({ ...replyFormData, content: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await saveComment(formData, Token);
    if (response.status === 201) {
      setSaveComment(true);
     
    }
  };

  const handleLike = async (commentId) => {
    const response = await likeComment(commentId, Token);
    if (response.status === 200) {
      fetchData();
    }
  };

  const handleReplySubmit = async (commentId) => {
    const response = await saveResponse(replyFormData, Token, commentId);
    if (response.status === 200) {
      fetchData();
     
    }
    window.location.reload();
  };

  const handleReplyClick = (commentId) => {
    setReplyMenus((prevMenus) => ({
      ...prevMenus,
      [commentId]: !prevMenus[commentId],
    }));
  };

  const handleToggleResponses = (commentId) => {
    setVisibleResponses((prevVisibleResponses) => ({
      ...prevVisibleResponses,
      [commentId]: !prevVisibleResponses[commentId],
    }));
  };

  useEffect(() => {

    saveGame(Juego,Token);

    if (Token) {
      setAllowed(true);
      fetchData();
    } else {
      setAllowed(false);
    }
  }, [allowed, Token]);

  useEffect(() => {
    if (commentSaved) {
      setTimeout(() => {
        setSaveComment(false);
        window.location.reload();
      }, 1000);
    }
  }, [commentSaved]);

  return (
    <>
      <section className="community-page">
        <Header />

        <section className="community-content">
          {allowed ? (
            <>
              <h2 className="comment-title">Comunidad</h2>

              <form className="community-form" onSubmit={handleSubmit}>
                <textarea
                  name="content"
                  placeholder="Comentar"
                  value={formData.content}
                  onChange={handleChange}
                  cols={80}
                  rows={20}
                />
                <button id="comment-btn" type="submit">Publicar</button>
              </form>

              {commentSaved ? <h3>Comentario Publicado</h3> : null}

              <section className="comment-section">
                {comments.map((t, index) => {
                  const parsedDate = parseISO(t.createdAt);

                  return (
                    <article className="comment" key={index} id={t._id}>
                      <div className="comment-header">
                        <h3>{t.user.username}</h3>
                        <h4>{format(parsedDate, "MMMM dd, yyyy h:mm a")}</h4>
                      </div>

                      <div className="comment-content">
                        <p>{t.content}</p>
                        <div className="comment-response">
                          <button onClick={() => handleReplyClick(t._id)}>
                            Responder
                          </button>

                        {t.responses.length>0 ?    <button onClick={() => handleToggleResponses(t._id)}>
                            Mirar Respuestas {t.responses.length}
                          </button>: null}
                          
                       
                        </div>

                        {replyMenus[t._id] && (
                          <div className="reply-menu">
                            <textarea
                              name={`content`}
                              placeholder="Responder"
                              onChange={(e) => handleReplyChange(e)}
                            />
                            <button id="reply-btn"
                              type="button"
                              onClick={() => handleReplySubmit(t._id)}
                            >
                              Enviar respuesta
                            </button>
                          </div>
                        )}

                        
                        {visibleResponses[t._id] && (
                          <div className="responses-section">
                            <h4>Respuestas:</h4>

                            <div className="responses">
                            {t.responses.map((response, responseIndex) => (
                              <div key={responseIndex} className="response">
                                {response.user.username}:{response.content}
                                
                              </div>
                            ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="likes-div">

                        <div className="likes-amount">
                        <GrLike /> {t.likes.length}
                        </div>
                      
                        <button onClick={() => handleLike(t._id)}>
                         Me gusta
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          ) : (
            <article>Necesitas hacer login</article>
          )}
        </section>
      </section>
    </>
  );
};

export default Community;