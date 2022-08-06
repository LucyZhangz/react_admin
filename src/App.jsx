import {Outlet} from 'react-router-dom'
import routes from './router/index'
function App() {
  return (
    <div className='App'>
     <Outlet />
    </div>
  )
}

export default App;
