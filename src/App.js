import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ResponseList from "./components/response-list.component";
import ResponseResults from "./components/response-results.component";
import Editresponse from "./components/edit-response.component";
import Createresponse from "./components/create-response.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ResponseList} />
        <Route path="/results" component={ResponseResults} />
        <Route path="/edit/:id" component={Editresponse} />
        <Route path="/create" component={Createresponse} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
