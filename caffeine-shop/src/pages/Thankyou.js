import React from "react";
import '../styles/Thankyou.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function Thankyou() {
    return (
        <div className="thanks-container">
        <h1>Kiitos ostoksestasi!</h1>
        <div className="thanks">
        <div className="left">
            <img src="https://www.students.oamk.fi/~n2rusa00/Stimu/Stimu%20product%20pictures/stimu_teleportti.jpg" />
        </div>
        <div className="right">
            Viritä teleport -vastaanottimesi ja tuotteet toimitetaan sinulle seuraavan tunnin kuluessa.
            <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
        </div>
        
        
        </div></div>
    );
    }