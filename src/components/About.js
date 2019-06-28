import React, { Component } from 'react';
import logo from '../logo.svg';
import Title from "./Title";

class Inicio extends Component {
  render () {
    return (
        <div className="container my-3">
          <Title name="About of" title="our website" />
          <div className="row">
            <div className="col-11 mx-auto my-3 about-info text-center">
              <img className="img-logo App-logo" src="/imagenes/logo_react.png" alt="logo_react"/>
              <img className="img-logo" src="/imagenes/logo_firebase.png" alt="logo_firebase"/>
            </div>
            <div className="col-11 mx-auto my-3 about-info text-center">
            <p>Our website is developed with <code>ReactJS</code> and <code>Firebase</code></p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              >
              Learning ReactJS
              </a> | <a
                className="App-link"
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                >
                How use Firebase?
                </a>
            </div>
          </div>
        </div>
    );
  }
}

export default Inicio;
