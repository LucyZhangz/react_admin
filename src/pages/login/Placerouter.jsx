import { Children } from 'react';
import {Navigate} from 'react-router'
function Placerouter(){
    const isToken=localStorage.getItem('VITE_ADMIN_TOKEN')
    if(isToken){
        return  <Navigate to='/home'/>
    }else{
        return <Navigate to='/login' replace/>
    }
}
export default Placerouter;