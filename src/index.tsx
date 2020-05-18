import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';

import logo from './logo.svg';
import styles from './Styles/App.css';

ReactDOM.render(
  <div className={styles.App}>
    <header>
      <img src={logo} className={styles.logo} alt="logo" />
      <div className={styles.title}>Time Recorder</div>
    </header>
    <main>
      <Routes />
    </main>
    <footer>
      Created by <span className={styles.author}>R-Imai</span>
    </footer>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
