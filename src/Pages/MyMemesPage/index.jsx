import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const REST_API = "https://memezard-backend.onrender.com";
/* For changing between local, faster testing and online rendering
https://memezard-backend.onrender.com
https://localhost:5005  */


function MyMemes() {
    const [savedMemes, setSavedMemes] = useState();       // created memes 
    const [savedFavs, setSavedFavs] = useState();         // favoured memes
    const [mainMeme, setMainMeme] = useState();           // middle page meme
    const [favouriteKey, setFavouriteKey] = useState();   // favourite property of current main meme
    const [memeId, setMemeId] = useState();               // id property of current main meme
    

      // Fetch all memes, created single main meme, and create useStates of favourite & deleted properties
      async function getMemes(){
        try{
        let response = await axios.get(`https://memezard-backend.onrender.com/created`); 
        const created = response.data;
        setSavedMemes(created);
        let favouriteMemes = created.filter((meme)=>{
          return meme.favourite;
        })
        setSavedFavs(favouriteMemes);
        if(created && created.length > 0){
        setMainMeme(created[created.length -1].imgLink);
        setFavouriteKey(created[created.length -1].favourite);
        setMemeId(created[created.length -1].id)
        }}
        catch(error){
          console.log(error);
        }
      } 
    useEffect(() => {
      getMemes()
    }, []);


          // setting main meme when clicking on a side bar meme
    const handleView = (id, link, favourite) => { 
      console.log(id, link, favourite)
      setMainMeme(link); 
      setMemeId(id);
      setFavouriteKey(favourite);
     } 

          // favourite button logic
     const  handleToggleUpd = (id) => {
      console.log(id);
      axios.put(`${REST_API}/created/${id}`, {imgLink: mainMeme, favourite: !favouriteKey, id: memeId})
      .then(()=>{
        axios
        .get(`${REST_API}/created`)
        .then((response) => {
          const created = response.data;
          setSavedMemes(created);
          let favouriteMemes = created.filter((meme)=>{
            return meme.favourite;
          })
          setSavedFavs(favouriteMemes);
          setFavouriteKey(!favouriteKey);
        })

     })}

          // delete button logic      
     const handleToggleDel = (id) => {
      console.log(id);
      axios.delete(`${REST_API}/created/${id}`).then(()=>{
        axios
        .get(`${REST_API}/created`)
        .then((response) => {
          const created = response.data;
          setSavedMemes(created);
          let favouriteMemes = created.filter((meme)=>{
            return meme.favourite;
          })
          setSavedFavs(favouriteMemes);
          if(created && created.length > 0){
            setMainMeme(created[created.length -1].imgLink);
            setFavouriteKey(created[created.length -1].favourite);
            setMemeId(created[created.length -1].id)
          } else{
            setMainMeme("");
            setFavouriteKey("");
            setMemeId("")
          }
        })
      })
      };   
    
    
  return (  
    /* Left column with all created memes, centered main meme, and right column fav memes */
    <div className="mymemes-main"> 
      <div className="created-memes"> 
        <h3 className="created-header">Created memes</h3>
      {savedMemes && 
        savedMemes.map((filteredMemes)=>{
          return(
            <div key={filteredMemes.id}>
              <img className="saved-memes" src={filteredMemes.imgLink} onClick={()=>handleView(filteredMemes.id, filteredMemes.imgLink, filteredMemes.favourite)} />
            </div>
          )})} 
      </div>

      <div className="mymemes-created">
      <h2 className="mymemes-header">YOUR MEME ROCKS!</h2> 
        <div className="selected-section"> 
          <div className="selectedmeme-box">
            <img className="selected-meme" src={mainMeme}/>
          </div>
          <div> 
            <button className="fav-button" onClick={() => handleToggleUpd(memeId)}> {favouriteKey ? "❤️" : "♡"}</button>
          </div>
          <div>
            <button className="delete-button" onClick={() => handleToggleDel(memeId)}> Delete </button>
          </div>
        </div> 
      </div>

      <div className="fav-section">
        <h3 className="favourites-header">Favourites</h3>
        <div>
        {savedFavs &&  
          savedFavs.map((filteredFavs)=>{
           return(
            <div key={filteredFavs.id}>
              <img className="fav-images" src={filteredFavs.imgLink} onClick={()=>handleView(filteredFavs.id, filteredFavs.imgLink, filteredFavs.favourite)} />
            </div>
          )})}
      </div> 
      </div>
    </div>
  )
}

export default MyMemes;