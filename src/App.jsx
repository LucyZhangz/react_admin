import {Outlet} from 'react-router-dom'
import routes from './router/index'
import './App.css'
function App() {
  return (
    <div className='App'>
     <Outlet />
    </div>
  )
}

export default App
