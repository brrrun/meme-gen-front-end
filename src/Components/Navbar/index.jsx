import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="homepage-link"><img className="corner-meme" src="./../../images\homepage icon.png"/></Link>
        <div className="navbar-links">
            <Link to="/mymemes" className="favourites-link"> MEMES</Link>
            <p>|</p>
            <Link to="getpage" className="get-link"> NEW </Link> 
        </div>
    </nav>
  )
}

export default Navbar