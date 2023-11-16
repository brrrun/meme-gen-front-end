import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const MEME_API = "https://api.memegen.link";

const REST_API = "https://memezard-backend.onrender.com";

function MyMemes() {
  const [savedMemes, setSavedMemes] = useState([]); // created memes on JSON file
  const [isFavourite, setIsFavourite] = useState(false);

  /*   const { id } = useParams(); */

  // FECTH INITIAL DATA OF THE JSON!? --> MY MEMES PAGE

  useEffect(() => {
    axios
      .get(`${REST_API}/created`)
      .then((response) => {
        const created = response.data;
        setSavedMemes(created);
        console.log(created);
      })
      .catch((error) => console.log(error));
  }, []);

  // Favourite on/off
  /*   const handleToggle = () => {
    setIsFavourite(!isFavourite);
  }; */

  /*const handleDelete = (savedMemesId) => {
      const deletedMemes = savedMemes.filter(savedMemes => savedMemes.id !== savedMemesId);
      setSavedMemes(deletedMemes);*/

  const navigate = useNavigate();

  const updateFavoriteStatus = (favId) => {
    let favMeme = savedMemes.find((id) => {
      return id === favId;
    });
    // Update the favorite status on the server
    const newFavoriteStatus = !isFavourite;

    axios
      .put(`${REST_API}/created/${favId}`, {
        ...favMeme,
        isFavourite: newFavoriteStatus,
      })
      .then(() =>
        axios.get(`${REST_API}/created`).then((response) => {
          const created = response.data;
          setSavedMemes(created);
          console.log(created);
        })
      )
      .catch((error) => console.log(error));
  };

  const deleteMeme = (id) => {
    axios
      .delete(`${REST_API}/created/${id}`)
      .then(() => {
        axios
        .get(`${REST_API}/created`)
        .then((response) => {
          const created = response.data;
          setSavedMemes(created);
          console.log(created);
        })
        .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error)); // Api não tem Delete (nem Put)
  };

  return (
    <div className="mymemes-main">
      {/*<h2 className="mymemes-header"> Created Memes </h2>*/}
      <div className="mymemes-column">
        <h2> My Memes </h2>
        {savedMemes &&
          savedMemes.map((meme, id) => {
            return (
              <div key={id}>
                <Link>
                  {" "}
                  <img className="saved-images" src={meme.imgLink} />{" "}
                </Link>
              </div>
            );
          })}
      </div>

      <div className="new-meme">
        {savedMemes &&
          savedMemes
            .filter((meme) => meme.id === savedMemes.length)
            .map((filteredMeme) => {
              return (
                <div key={filteredMeme.id}>
                  <img className="created-image" src={filteredMeme.imgLink} />
                  <div className="mymemes-button">
                    <button
                      className="favourite-button"
                      onClick={() => updateFavoriteStatus(filteredMeme.id)}
                    >
                      {filteredMeme.isFavourite ? "❤️" : "♡"}
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteMeme(filteredMeme.id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default MyMemes;