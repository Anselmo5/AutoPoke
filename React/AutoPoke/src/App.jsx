import React from 'react'
import Header from './components/Header'
import Home from './page/Home/Home'
import { BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import About from './page/About/About';
import Ranking from './page/Ranking/Ranking';
import Conquista from './page/Conquistes/Conquista';
import Formulario from './page/Formulario/Formulario';
import User from './page/User/User';
import Cadastro from "./page/Cadastro/Cadastro";
import Login from './page/Login/Login';
import Jogo from './page/Game/Game';


function App() {
  return (
    <>
       <BrowserRouter>
          <Routes>
             <Route path='/' element={<Home/>} />  
             <Route path='/About' element={<About/>} />  
             <Route path='/Ranking' element={<Ranking/>} />  
             <Route path='/Conquiste' element={<Conquista/>} />  
             <Route path='/Contact' element={<Formulario/>} /> 
             <Route path='/Login'element={<Login/>} />
             <Route path='/Perfil' element={<User/>} />
             <Route path='/Cadastro' element={<Cadastro/>}/>
             <Route path='/Jogo' element={<Jogo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
