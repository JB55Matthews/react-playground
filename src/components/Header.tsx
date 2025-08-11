import "../styles/Header.css"

function Header() {

    return (
      <div className="header-container">

        <div className="title">React Playground</div>
        <div className="name">Jason Matthews</div>

        <div className="line-container">
          <svg viewBox="0 0 600 4">
            <line x1="0" y1="2" x2="600" y2="2" />
          </svg>
        </div>
        <div className="body">
          <p>Welcome to my React Playground! This is a collection of small components I've built when I'm feeling like
            learning a new piece of React, practicing, or just have a fun idea
          </p>
          <p>Everything here are projects that would
            ideally be made in a day, so nothing is overly complicated; those are saved with their own dedicated pages. 
            Scroll through, try out what everything does, and have fun!</p>
        </div>
      </div>
    )
  }
  
  export default Header