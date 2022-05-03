import "./App.css";

import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar'
const App =()=>{
  // apiKey= process.env.REACT_APP_NEWS_API
  const apiKey = process.env.REACT_APP_NEWS_API;
  // apiKey= "3f74eb4f14cd47bc9e3ca1d196b0ebaf"
    return (
      <div>
        <BrowserRouter>
            <NavBar />
            {/* <LoadingBar
        color='#f11946'
        progress={10} 
      /> */}
          <Routes>
            {/* <News pageSize={9} country="in" category="general" /> */}
            <Route exact path="/" element={<News apiKey={apiKey} key="general" pageSize={9} country="in" category="general"/>}></Route>
            <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={9} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={9} country="in" category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News apiKey={apiKey} key="general" pageSize={9} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={9} country="in" category="health"/>}></Route>
            <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={9} country="in" category="science"/>}></Route>
            <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={9} country="in" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={9} country="in" category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  
}
export default App