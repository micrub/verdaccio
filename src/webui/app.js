import React, {Component} from 'react';
import 'element-theme-default';
import {i18n} from 'element-react';
import locale from 'element-react/src/locale/lang/en';

import {LogInContext} from './context';
import storage from './utils/storage';
import {logo} from './utils/logo';
import {login, isTokenExpire} from './utils/login';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/Login';

i18n.use(locale);

import Route from './router';

import './styles/main.scss';
import 'normalize.css';

export default class App extends Component {
  state = {
    error: {},
    logoUrl: '',
    user: {},
    scope: '',
    showLoginModal: false,
    isUserLoggedIn: false
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.setUsernameAndPassword = this.setUsernameAndPassword.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  componentDidMount() {
    this.loadLogo();
    // checks for token validity
    const token = storage.getItem('token');
    const username = storage.getItem('username');
    if (isTokenExpire(token)) {
      this.handleLogout();
    } else {
      this.setState({user: {name: username, token}});
      this.setState({isUserLoggedIn: true});
    }
  }

  async loadLogo() {
    const logoUrl = await logo();
    this.setState({logoUrl});
  }

  /**
   * Toogles the login modal
   * Required by: <LoginModal />
   */
  toggleLoginModal() {
    this.setState((prevState) => ({
      showLoginModal: !prevState.showLoginModal
    }));
    this.setState({error: {}});
  }

  /**
   * set login modal's username and password to current state
   * Required by: <LoginModal />
   */
  setUsernameAndPassword(name, e) {
    this.setState({
      [name]: e
    });
  }

  /**
   * handle login
   * Required by: <Header />
   */
  async doLogin(event) {
    event.preventDefault();
    const {username, password} = this.state;
    const {name, token, error} = await login(username, password);

    if (name && token) {
      this.setState({
        user: {
          name,
          token
        }
      });
      storage.setItem('username', name);
      storage.setItem('token', token);
      // clost login modal after successful login
      this.setState({isUserLoggedIn: true});
      this.setState({showLoginModal: false});
    }

    if (error) {
      this.setState({error});
    }
  }

  /**
   * Logouts user
   * Required by: <Header />
   */
  handleLogout() {
    storage.removeItem('username');
    storage.removeItem('token');
    this.setState({user: {}});
    this.setState({isUserLoggedIn: false});
  }

  render() {
    const {error, logoUrl, showLoginModal, user, scope, isUserLoggedIn} = this.state;
    return (
      <div className="page-full-height">
        <Header
          logo={logoUrl}
          user={user}
          scope={scope}
          toggleLoginModal={this.toggleLoginModal}
          handleLogout={this.handleLogout}
        />
        <LoginModal
          visibility={showLoginModal}
          error={error}
          onChange={this.setUsernameAndPassword}
          onCancel={this.toggleLoginModal}
          onSubmit={this.doLogin}
        />
        <LogInContext.Provider value={isUserLoggedIn}>
          <Route />
        </LogInContext.Provider>
        <Footer />
      </div>
    );
  }
}
