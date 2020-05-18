import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import appStyles from '../Styles/App.css';

type Props = {}

type State = {
  isShow: boolean
}

class LinkMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: false
    };
  }

  render() {
    const pathname = window.location.pathname;
    return (
      <div className={appStyles['menu-bar']}>
        <button
          className={appStyles['menu-button']}
          onClick={() => {this.setState({isShow: !this.state.isShow})}}
        >
          { this.state.isShow ? '▶' : '◀' }
        </button>
        { this.state.isShow ? (
          <div className={appStyles['menu-bar-button-space']}>
            { pathname !== '/' && pathname !== '' ? (
              <Link to="/">
                <button
                  onClick={() => {this.setState({isShow: false})}}
                  className={appStyles['to-top-button']}
                >
                  TopPage
                </button>
              </Link>
            ) : ''}
            { pathname !== '/calc' ? (
              <Link to="/calc">
                <button
                  onClick={() => {this.setState({isShow: false})}}
                  className={appStyles['to-calc-button']}
                >
                  CalcPage
                </button>
              </Link>
            ) : ''}
            { pathname !== '/setting' ? (
              <Link to="/setting">
                <button
                  onClick={() => {this.setState({isShow: false})}}
                  className={appStyles['to-setting-button']}
                >
                  Setting
                </button>
              </Link>
            ) : ''}
          </div>
        ): ''}
      </div>
    )
  }
}

export default LinkMenu;
