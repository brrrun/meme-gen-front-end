import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

const MEME_API = "https://api.memegen.link";

function Meme() {

    const [memes, setMemes] = useState(); 
        
        // fetch all meme image templates from API and store them on useState
    useEffect(()=>{
        axios.get(`${MEME_API}/templates`).then((response)=>{
            const images = response.data;
            setMemes(images);
        })
        .catch((error) => console.log(error));
    }, [])
 
        // render all fetched images for user picking
  return (
    <div>
      <h1 className="get-header">Choose Your Image!</h1>
        {memes && 
      <div className="meme-blank">
        {memes.map((meme, index)=>{
        return(
            <div key={index}>
              <div className="get-card">
                <div>
                  <img className = "meme-blank-img" src={meme.blank}/>
                </div>
                <div>
                  <Link to={`/createpage/${meme.id}`} className="get-button"> Use this image</Link>
                </div>
              </div>
        </div> 
          )
      })}
        </div>}
    </div>
  )
}

export default Meme