import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"


const MEME_API = "https://api.memegen.link"

const REST_API = "http://localhost:5005"

function TEST() {

    const [savedMemes, setSavedMemes] = useState()               // created memes on JSON file

    // FECTH INITIAL DATA OF THE JSON!? --> MY MEMES PAGE
     useEffect(()=>{
        axios.get(`${REST_API}/tasks`).then((response)=>{
          setSavedMemes(response.data);
        })
    }, []) 

    /*             setSavedMemes = [...savedMemes, response.data]; */
    
  return (
    <div className="mymemes-main">
      <div className="mymemes-column">
        <p>a map list of the already created memes should be here (shown in a row)</p>
      </div>
      <div>
      <h2>Your new meme rocks!</h2>
        <p>new meme should be rendered here</p>
      </div>
    </div>
  )
}

export default TEST