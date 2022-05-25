import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Profile from '../profile'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Pro extends Component {
  state = {apiStatus: apiStatusConstants.initial, profileArray: []}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const JWT = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      //   const updatedData = fetchedData.profile_details.map(pink => ({
      //     profileImageUrl: pink.profile_image_url,
      //     name: pink.name,
      //     shortBio: pink.short_bio,
      //   }))
      const updatedData = fetchedData.profile_details
      this.setState({
        profileArray: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileArray} = this.state
    return (
      <div className="pro-1">
        {/* {profileArray.map(each => <Profile key={each.id} product={each} />)} */}
        <Profile product={profileArray} />
      </div>
    )
  }

  renderFailure = () => (
    <div className="job-container">
      <button type="button" className="bon" onClick={() => this.getProfile()}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="job-container" testId="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default Pro
