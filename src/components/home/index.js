import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container-1">
      <Link to="/">
        <Header />
        <div className="bg-img">
          <ul className="list-2">
            <li>
              {' '}
              <h1 className="text-1">Find The Job That Fits Your Life</h1>
            </li>
            <li>
              <p className="text-2">
                Millions of people are searching for jobs,salary
                <br /> information, company reviews.Find the job that fits
                <br />
                abilities and potential
              </p>
            </li>

            <Link to="/jobs">
              <li>
                <button type="button" className="btn">
                  {' '}
                  Find Jobs
                </button>
              </li>
            </Link>
          </ul>
        </div>
      </Link>
    </div>
  )
}

export default Home
