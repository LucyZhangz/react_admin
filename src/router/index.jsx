import App from "../App";
import NotFound from "../pages/notFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Layout from "../pages/layout/Layout";
const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/not" element={<NotFound />}></Route>
        <Route path="/layout" element={<Layout />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  </Router>
);

export default routes;
