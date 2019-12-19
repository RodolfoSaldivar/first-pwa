import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';


import Profile from './components/Profile'
import List from './components/List'
import Home from './components/Home'

// const ITEMS_URL = "http://[YOUR LOCAL IP ADDRESS]:4567/items.json"

export default () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/list" exact component={List} />
      <Route path="/profile" exact component={Profile} />
    </div>
  </Router>
);
