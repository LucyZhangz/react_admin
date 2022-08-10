import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/index";
import "antd/dist/antd.css";
import { Provider } from 'react-redux';
import store from './store/index'
import {BrowserRouter} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>

        <Router />
    </Provider>

);
