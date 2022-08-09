import App from "../App";
import NotFound from "../pages/notFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "../pages/layout/Layout";
import Basic from "../pages/Basic/Basic";
import Changetpassword from '../pages/Changetpassword/Changetpassword'

const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Basic />}></Route>
        <Route path="/paddword" element={<Changetpassword />}></Route>
     
      </Route>
      <Route path="/not" element={<NotFound />}></Route>
      <Route path="/login" element={<Login />}></Route>
     
      <Route path="/home" element={<Home />}></Route>
     

    </Routes>
  </Router>
);

export default routes;
