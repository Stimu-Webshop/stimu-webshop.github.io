import React from 'react'
import catimg from "../img/404-kissa.png"
import "../styles/NotFound.scss"

export default function NotFound() {
  return (
    <div class="notfound">
      <h1>404 - sivua ei löytynyt!</h1>
      <img src={catimg} alt="cat" />
    </div>
  )
}
