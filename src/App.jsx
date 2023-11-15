import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'
import Meme from './Pages/GetPage'
import CreatePage from './Pages/CreatePage'
import MyMemesPage from './Pages/MyMemesPage'

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/mymemes" element={<MyMemesPage/>}/>
      <Route path="/mymemes/:id" element={<MyMemesPage/>}/>
      <Route path="/getpage" element={<Meme/>}/>
      <Route path="/createpage/:memeId" element={<CreatePage/>}/>
      </Routes>
    </div>
  )
}

export default App
