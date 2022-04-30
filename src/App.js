import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <NavBar />
            <LoadingBar
        color='#f11946'
        progress={10} 
      />
          <Routes>
            {/* <News pageSize={9} country="in" category="general" /> */}
            <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general"/>}></Route>
            <Route exact path="/business" element={<News key="business" pageSize={9} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={9} country="in" category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News key="general" pageSize={9} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News key="health" pageSize={9} country="in" category="health"/>}></Route>
            <Route exact path="/science" element={<News key="science" pageSize={9} country="in" category="science"/>}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize={9} country="in" category="sports"/>}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={9} country="in" category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
