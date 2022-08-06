import App from '../App';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from '../views/Login'
import Home from '../views/Home';
const routes =()=>(
   <Router>
     <Routes>
      <Route path='/' element={<App/>}>
      </Route>
      <Route path='/login' element={<Login/>}>
      </Route>
      <Route path='/home' element={<Home/>}>
      </Route>
     </Routes>
   </Router>
) 

export default routes;