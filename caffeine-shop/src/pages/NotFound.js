import React from 'react'
import catimg from "../img/404-kissa.png"
import "../styles/NotFound.scss"

export default function NotFound() {
  return (
    <div class="notfound"><img src={catimg} alt="cat" />
    <h1>404 - sivua ei löytynyt!</h1>
    </div>
  )
}
