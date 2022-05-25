import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const Logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container-1">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="icon-1"
        />
      </Link>
      <ul className="list">
        <Link to="/">
          <li>
            <p className="text">Home</p>
          </li>
        </Link>
        <Link to="/jobs">
          <li className="text">Jobs</li>
        </Link>
      </ul>{' '}
      <button type="button" className="btn" onClick={Logout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
