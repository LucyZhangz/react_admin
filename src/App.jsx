import {Outlet} from 'react-router-dom'
import routes from './router/index'
import React from 'react';
import Language from './components/Language';
function App() {
  return (
    <div className='App'>
      <Outlet />
 
      
    </div>
  )
}
export default App;
