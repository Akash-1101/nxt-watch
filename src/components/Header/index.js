import {Link, Redirect} from 'react-router-dom'
import {React} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {VscAccount} from 'react-icons/vsc'
import './index.css'

const Header = props => {
  const {history} = props
  const LogoutFun = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-main-container">
      <Link to="/" className="header-container">
        <img
          alt="website logo"
          className="home-page-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <div className="header-Items-lg-container">
          <button label="b" data-testid="theme" className="theme-container">
            <FaMoon id="b" />
          </button>
          <img
            alt="profile"
            className="profile-img1"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          />
        </div>
      </Link>
      <button onClick={LogoutFun} className="logOutBtn" type="button">
        Logout
      </button>
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button className="logOutBtn" type="button">
              Logout
            </button>
          }
        >
          {close => (
            <>
              <div>
                <p>Are you sure you want to logout?</p>
              </div>
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button onClick={LogoutFun} className="logOutBtn" type="button">
                Logout
              </button>
            </>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default Header
