import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, navigate } from "react"


const MEME_API = "https://api.memegen.link"

const REST_API = "https://memezard-backend.onrender.com"
// "https://memezard-backend.onrender.com"


function CreatePage() {

    const {memeId} = useParams()    

    const navigate = useNavigate()
    
    const [topText, setTopText] = useState(" ");              // user Top Text
    const [bottomText, setBottomText] = useState(" ");        // user Bottom Text
    const [previewMeme, setPreviewMeme] = useState();                    // meme Preview
    const [selectedFont, setSelectedFont] = useState('impact');          // user Font
    const [selectedExtension, setSelectedExtension] = useState("jpg");   // user Extension
    const [selectedWidth, setSelectedWidth] = useState(500);            // selected Width

        // Fetching selected meme image and adding custom text on it
    useEffect(()=>{
        axios.get(`${MEME_API}/images/${memeId}/${topText}/${bottomText}.${selectedExtension}?&font=${selectedFont}&width=${selectedWidth}`).then((response)=>{
            setPreviewMeme(response.data);
        })
        .catch((error) => console.log(error));
    }, [])
    

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
        "500",
        "300",
        "150"
    ]
    const handleWidthChange = (e) => {
        setSelectedWidth(e.target.value);
      };

      const handleSaveMeme = (e) => {
        e.preventDefault()
        // Create the new meme's object with its new properties
        const newMeme = {
            imgLink: `${MEME_API}/images/${memeId}/${topText}/${bottomText}.png`,
            favourite: false,
            deleted: false
          };

          // Posting created meme to the json server
        axios.post(`${REST_API}/created`, newMeme).then((response) => {
            navigate("/mymemes");
        })
        .catch((error) => {console.error(error);
        });
} 
  

  return ( 
    <div className="create-main"> 
        <h3 className="create-header">CREATE YOUR</h3>
        {!previewMeme &&
        <p>Sorry, there was an error!</p>}
        <div className="create-imgbox">
            {previewMeme && 
            <div> <img className="create-img" src={`${MEME_API}/images/${memeId}/${topText}/${bottomText}.${selectedExtension}?&font=${selectedFont}&width=${selectedWidth}`}/>
            </div>
            }
        </div>
        <form onSubmit={handleSaveMeme}>
            <label> Top Text: <input type="text" name="top" value={topText} onChange={(e)=>setTopText(e.target.value)}/></label> <br />
            <label> Bottom Text: <input type="text" name="bottom" value={bottomText} onChange={(e)=>setBottomText(e.target.value)}/></label> <br />
            <label> Text Font: <select value={selectedFont} onChange={handleFontChange}>{fontOptions.map((font, index) => (<option key={index} value={font}>{font}
            </option>))} </select></label> <br />
            <label> Extension: <select value={selectedExtension} onChange={handleExtensionChange}>{extensions.map((extension, index) => (<option key={index} value={extension}>{extension}
            </option>))} </select></label> <br />
            <label> Width: <select value={selectedWidth} onChange={handleWidthChange}>{widths.map((width, index) => (<option key={index} value={width}>{width}
            </option>))} </select></label> <br />
            <button className="create-button" type="submit">Save your Awesome meme!</button>
            </form>

    </div> 
  ) 
}

export default CreatePage

