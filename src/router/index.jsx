import App from "../App";
import {Navigate} from 'react-router'
import Placerouter from '../pages/login/Placerouter'
import NotFound from "../pages/notFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "../pages/layout/Layout";

const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
       {/* <Route path="/Placerouter" element={<Placerouter />}></Route> */}
        <Route path="/home" element={<Home />}>
        </Route>
      </Route>
      <Route path="/not" element={<NotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </Router>
);
export default routes;
