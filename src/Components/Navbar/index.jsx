import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="homepage-link"><img className="corner-meme" src="./../../images\homepage icon.png"/></Link>
        <div className="navbar-links">
          <Link to="getpage" className="get-link"> NEW MEME </Link> 
          <p>|</p>
          <Link to="/mymemes" className="favourites-link"> MY MEMES</Link>
        </div>
    </nav>
  )
}

export default Navbar