import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LinkMenu from './Components/LinkMenu'

import MainPage from './Pages/MainPage';
import CalcPage from './Pages/CalcPage';
import SettingPage from './Pages/SettingPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/calc" component={CalcPage}/>
        <Route exact path="/setting" component={SettingPage}/>
        <Route exact path="" component={MainPage}/>
      </Switch>
      <LinkMenu />
    </Router>
  )
}

export default Routes;
