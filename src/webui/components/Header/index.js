import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'element-react';
import {getRegistryURL} from '../../utils/url';
import classes from './header.scss';
import './logo.png';

const Header = ({logo, scope, user, handleLogout, toggleLoginModal}) => {
  const registryUrl = getRegistryURL();
  return (
    <header className={classes.header}>
      <div className={classes.headerWrap}>
        <img src={logo} className={classes.logo} />
        <figure>
          npm set {scope}registry {registryUrl}
          <br />
          npm adduser --registry {registryUrl}
        </figure>

        <div className={classes.headerRight}>
          {user.name ? (<div className="user-logged">
            <span
              className="user-logged-greetings"
              style={{marginRight: '10px'}}
            >
              Hi, {user.name}
            </span>
            <Button
              className={`${classes.headerButton} header-button-logout`}
              type="danger"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>) : (<Button
            className={`${classes.headerButton} header-button-login`}
            onClick={() => toggleLoginModal()}
          >
            Login
          </Button>)}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleLoginModal: PropTypes.func.isRequired
};

export default Header;
