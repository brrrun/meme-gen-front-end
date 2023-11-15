import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"


const MEME_API = "https://api.memegen.link"

const REST_API = "http://localhost:5005"


function CreatePage() {

    const {memeId} = useParams()    

    
    const [topText, setTopText] = useState("Top Text");              // user Top Text
    const [bottomText, setBottomText] = useState("Bottom Text");        // user Bottom Text
    const [previewMeme, setPreviewMeme] = useState();                    // meme Preview
    const [selectedFont, setSelectedFont] = useState('impact');          // user Font
    const [selectedExtension, setSelectedExtension] = useState("jpg");   // user Extension
    const [selectedWidth, setSelectedWidth] = useState(800);            // selected Width

        // Fetching selected meme image and adding custom text on it
    useEffect(()=>{
        axios.get(`${MEME_API}/images/${memeId}/${topText}/${bottomText}.${selectedExtension}?&font=${selectedFont}&width=${selectedWidth}`).then((response)=>{
            setPreviewMeme(response.data);
        })
        .catch((error) => console.log(error));
    }, [])
    
      


    ///////////////////////////////////////  
    // CANT USE "?" ON TEXT
    
    const handleSaveMeme = () => {
        // Create the new meme's object with its new properties
        const newMeme = {
            imgLink: `${MEME_API}/images/${memeId}/${topText}/${bottomText}.png`,
            favourite: false
          };

          // Posting created meme to the json server
        axios.post(`${REST_API}/created`, newMeme).then((response) => {

        })
        .catch((error) => {console.error(error);
        });
} 
  
      /////////////////////////////////////////////////////////////////////////////
        // Font input

    const fontOptions = [
        "impact", 
        "kalam",
        "titilliumweb",
        "titilliumweb-thin",
        "notosans",
        "segoe"]
    const handleFontChange = (e) => {
        setSelectedFont(e.target.value);
      };

        // Extension input
    const extensions = [
        "jpg",
        "png",
        "gif"
]
    const handleExtensionChange = (e) => {
        setSelectedExtension(e.target.value);
      };

        // Width input
    const widths = [
        "800",
        "500",
        "300",
        "150"
    ]
    const handleWidthChange = (e) => {
        setSelectedWidth(e.target.value);
      };

    

  return ( 
    <div className="create-main"> 
        <h1>Create Page</h1>
        {!previewMeme &&
        <p>Sorry, there was an error!</p>}
        {previewMeme && 
        <div> <img src={`${MEME_API}/images/${memeId}/${topText}/${bottomText}.${selectedExtension}?&font=${selectedFont}&width=${selectedWidth}`}/>
        </div>
        }
        <form onSubmit={handleSaveMeme}>
            <label> Top Text: <input type="text" name="top" value={topText} onChange={(e)=>setTopText(e.target.value)}/></label> <br />
            <label> Bottom Text: <input type="text" name="bottom" value={bottomText} onChange={(e)=>setBottomText(e.target.value)}/></label> <br />
            <label> Text Font: <select value={selectedFont} onChange={handleFontChange}>{fontOptions.map((font, index) => (<option key={index} value={font}>{font}
            </option>))} </select></label> <br />
            <label> Extension: <select value={selectedExtension} onChange={handleExtensionChange}>{extensions.map((extension, index) => (<option key={index} value={extension}>{extension}
            </option>))} </select></label> <br />
            <label> Width: <select value={selectedWidth} onChange={handleWidthChange}>{widths.map((width, index) => (<option key={index} value={width}>{width}
            </option>))} </select></label> <br />
            <button type="submit">Save your Awesome meme!</button>
            </form>

    </div> 
  ) 
}

export default CreatePage