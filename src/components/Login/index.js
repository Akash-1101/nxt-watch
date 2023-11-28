import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    Ischecked: false,
    errorMsg: '',
    showSubmitError: false,
  }

  onchangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log('hii')
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickBox = () => {
    this.setState(prevState => ({Ischecked: !prevState.Ischecked}))
  }

  render() {
    const {Ischecked, errorMsg, showSubmitError} = this.state
    const a = Ischecked ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-main-container">
        <div className="login-card">
          <img
            alt="website logo"
            className="login-page-logo-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <form onSubmit={this.onClickLogin} className="login-form-container">
            <label className="userNameEl" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="inputElName"
              placeholder="Username"
              id="username"
              type="text"
              onChange={this.onchangeUserName}
            />
            <br />
            <label className="userNameEl" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="inputElName"
              placeholder="Password"
              id="password"
              type={a}
              onChange={this.onchangePassword}
            />
            <br />
            <input
              onChange={this.onClickBox}
              className="check-box-El"
              id="showPass"
              type="checkbox"
            />
            <label htmlFor="showPass">Show Password</label>
            <br />
            <button className="login-btn" type="submit">
              Login
            </button>
            {showSubmitError ? <p>{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
