
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Background from './components/Background'



function App() {
  

  return (
   <>
   <div className=' relative'>
  <Background/>

   <Navbar/>
   <Manager/>
   <Footer/>
   
   </div>
   
   </>
  )
}

export default App
