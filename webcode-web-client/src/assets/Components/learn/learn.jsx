import HtmlMenu from "./htmlMenu/htmlMenu";
import Header from "../header/header";
import "./learn.css"
import { useState } from "react";
import CssMenu from "./css_page/cssMenu"
const Learn =()=>{

    const [section,setSection]=useState('html');

    return(
        <>


    <section className="learn-main">
    <Header/>

<div className="section-div">
    <button className={`html ${section === 'html' ? 'active' : ''}`}
    onClick={() => setSection('html')}
>HTML</button>
    <button className={`css ${section === 'css' ? 'active' : ''}`}
    onClick={() => setSection('css')}>CSS</button>
</div>

{section==='html' ? <HtmlMenu/>
:<CssMenu/> }

    </section>

        </>
       
    )
}

export default Learn;