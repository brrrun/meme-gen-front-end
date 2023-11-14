import { Link } from "react-router-dom"

function Homepage() {
  return (
    <div className="home-page">
        <img className="home-logo-image" src="images/crazy-face-meme.png" />
        <h1 className="home-title">MEMEZARD</h1>
        <h2 className="home-description">Create Your Own Meme!</h2>
        <Link to="getpage" className="get-home-button"> START </Link>
    </div>
  )
}

export default Homepage