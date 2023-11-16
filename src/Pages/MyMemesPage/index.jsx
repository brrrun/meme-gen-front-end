import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const REST_API = "http://localhost:5005";

function MyMemes() {
  const [savedMemes, setSavedMemes] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${REST_API}/created`).then((response) => {
      const created = response.data;
      setSavedMemes(created);
    }).catch((error) => console.log(error));
  }, []);

  const handleToggle = (id) => {
    const updatedMemes = savedMemes.map((meme) =>
      meme.id === id ? { ...meme, favorite: !meme.favorite } : meme
    );

    // Move the favorite memes to the beginning of the array
    const sortedMemes = [...updatedMemes].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    setSavedMemes(sortedMemes);

    const updatedMeme = sortedMemes.find((meme) => meme.id === id);
    
    // Update the favorite status in the API
    axios.post(`${REST_API}/created/${id}`, { favorite: updatedMeme.favorite })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const deleteMeme = (id) => {
    axios.delete(`${REST_API}/created/${id}`).then(() => {
      const updatedMemes = savedMemes.filter((meme) => meme.id !== id);
      setSavedMemes(updatedMemes);
      navigate("/mymemes");
    }).catch((error) => console.log(error));
  }

  return (
    <div className="mymemes-main">
      <div className="mymemes-column">
        <h2> My Memes </h2>
        {savedMemes.map((meme) => (
          <div key={meme.id}>
            <Link>
              <img className={`saved-images ${meme.favorite ? "favorite" : ""}`} src={meme.imgLink} />
            </Link>
          </div>
        ))}
      </div>
      <div className="new-meme">
        {savedMemes.map((filteredMeme) => (
          <div key={filteredMeme.id}>
            <img className="created-image" src={filteredMeme.imgLink} />
            <div className="mymemes-button">
              <button className="favourite-button" onClick={() => handleToggle(filteredMeme.id)}>
                {filteredMeme.favorite ? "❤️" : "♡"}
              </button>
              <button className="delete-button" onClick={() => deleteMeme(filteredMeme.id)}> Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyMemes;