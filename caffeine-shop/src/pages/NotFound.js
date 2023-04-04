import React from 'react'
import catimg from "../img/404-kissa.png"
import "../styles/NotFound.scss"

export default function NotFound() {
  return (
    <>
    <div class="notfound">404</div>
    <img src={catimg} alt="cat" />
    </>
  )
}
