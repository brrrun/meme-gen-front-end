import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"


const MEME_API = "https://api.memegen.link"

const REST_API = "http://localhost:5005"

function MyMemes() {

  const [savedMemes, setSavedMemes] = useState();               // created memes on JSON file
  const [isFavourite, setIsFavourite] = useState(false);

    // FECTH INITIAL DATA OF THE JSON!? --> MY MEMES PAGE 
    
     useEffect(()=>{
        axios.get(`${REST_API}/tasks`).then((response)=>{
          const created = response.data;
          setSavedMemes(created);
        })
        .catch((error) => console.log(error));
    }, []) 
  
    // Favourite on/off
    const handleToggle = () => {
      setIsFavourite(!isFavourite);
    }


  return (
    <div className="mymemes-main">
      <div className="mymemes-column">
        {savedMemes &&
        savedMemes.map((meme, id)=>{
          return(
            <div key={id}>
              <Link> <img src={meme.imgLink} /> </Link>
            </div>
          )
        })}
      </div>

        

      <div> 
      <h2>Your new meme rocks!</h2> 
        {savedMemes && 
        savedMemes.filter((meme)=> meme.id === savedMemes.length).map((filteredMeme)=>{
          return(
            <div key={filteredMeme.id}>
              <img src={filteredMeme.imgLink} />
              <button onClick={handleToggle}> {isFavourite? "Remove Fav" : "Add Fav"} </button>
              <button> Delete </button>
            </div>
          )})}
        
      </div>
    </div>
  )
}

export default MyMemes