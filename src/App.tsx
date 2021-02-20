import React, { Component } from 'react';
import AppProvider from './AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <div className="app">
          <Header />
          <Main />
          <Footer />
        </div>
      </AppProvider>
    );
  }
}

export default App;
