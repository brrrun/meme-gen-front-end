import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"


const MEME_API = "https://api.memegen.link"

const REST_API = "http://localhost:5005"

function MyMemes() {

    const [savedMemes, setSavedMemes] = useState();               // created memes on JSON file
    const [savedFavs, setSavedFavs] = useState();
    const [mainMeme, setMainMeme] = useState();
    const [isFavourite, setIsFavourite] = useState();
    const [favouriteKey, setFavouriteKey] = useState();
    const [memeId, setMemeId] = useState();
    
      // Fetch all memes, created single main meme, and create useStates of favourite & deleted properties
    useEffect(() => {
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
        }})
      .catch((error) => console.log(error));
    }, []);

      // CRIAR USEEFFECT PARA QUANDO O MAINMEME FOR ALTERADO, ATUALIZAR TAMBÉM O STATE DO favourite E DO memeId
  

        // A TENTAR ATUALIZAR O MEMEID COM O CLICK NAS IMAGENS
    const handleView = (e) => { 
      setMainMeme(e.target.src); 
      //setMemeId(e.target.id)
     } 


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
          if(created && created.length > 0){
            setMainMeme(created[created.length -1].imgLink);
            setFavouriteKey(created[created.length -1].favourite);
            setMemeId(created[created.length -1].id)
          }
        })

     })}

      
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
      /*if (!mainMeme) {
        return;
      }
      setSavedMemes((prevSavedMemes) => {
        const memeIndex1 = prevSavedMemes.findIndex((meme) => meme.imgLink === mainMeme);
    
        if (memeIndex1 !== -1) {
          const updatedMemes = [...prevSavedMemes];
          updatedMemes[memeIndex1] = { ...updatedMemes[memeIndex1], deleted: true };
    
          axios
            .put(`${REST_API}/created/${memeId}`, updatedMemes[memeIndex1])
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => console.log(error));
    
          setSavedFavs((prevSavedFavs) => {
            const memeIndex2 = prevSavedFavs.findIndex((meme) => meme.imgLink === mainMeme);
            if (memeIndex2 !== -1) {
              const updatedFavs = [...prevSavedFavs];
              updatedFavs[memeIndex2] = { ...updatedFavs[memeIndex2], deleted: true };
    
              axios
                .put(`${REST_API}/created/${memeId}`, updatedFavs[memeIndex2])
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => console.log(error));
            }
            return updatedFavs; 
          });
          return updatedMemes;
        }
        // Return the previous state if the meme is not found
        return prevSavedMemes;*/
      };
    
    
    
  return (
    <div className="mymemes-main">
      <div>
      <p>Favourites</p> 
      {savedFavs &&  
        savedFavs.map((filteredFavs)=>{
          return(
            <div key={filteredFavs.id}>
              <img src={filteredFavs.imgLink} onClick={handleView} />
            </div>
          )})} 
      </div>


      <div className="mymemes-column"> 
        <p>Created memes</p>
      {savedMemes && 
        savedMemes.map((filteredMemes)=>{
          return(
            <div key={filteredMemes.id}>
              <img src={filteredMemes.imgLink} onClick={handleView} />
            </div>
          )})} 
      </div>


      <div className="mymemes-column">
      <h2>Your new meme rocks!</h2> 
        <div> <img src={mainMeme}/> 
        <button onClick={() => handleToggleUpd(memeId)}> {favouriteKey ? "❤️" : "♡"}</button>
        <button onClick={() => handleToggleDel(memeId)}> Delete </button>
        </div> 
        
      </div>
    </div>
  )
}

export default MyMemes