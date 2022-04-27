import logo from './logo.svg';
import './App.css';
import Router from "./components/Router";
import { notificationAPIContext } from "./context/notificationAPIContext";
import { feedAPIContext } from "./context/feedAPIContext";
import React, {useState} from "react";

function App() {
  const [notifications, setNotifications] = useState([])
  const [blogs, setBlogs] = useState([])
  return (
    <notificationAPIContext.Provider value={{notifications, setNotifications}}>
      <feedAPIContext.Provider value={{blogs, setBlogs}}>
        <Router />
      </feedAPIContext.Provider>
    </notificationAPIContext.Provider>
  );
}

export default App;
