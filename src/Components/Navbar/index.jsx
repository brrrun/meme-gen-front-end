import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <img className="corner-meme" src="images/crazy-face-meme.png" />
        <div className="navbar-links">
          <Link to="/" className="homepage-link"> HOMEPAGE |</Link>
          <Link to="getpage" className="get-link"> GET |</Link>
          <Link to="/createpage" className="create-link"> CREATE |</Link>
          <Link to="/mymemes" className="favourites-link"> FAVOURITES</Link>
        </div>
    </nav>
  )
}

export default Navbar