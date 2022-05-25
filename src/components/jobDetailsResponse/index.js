import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobDetails from '../jobDetails'
import Header from '../header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, list: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtTokenJob = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtTokenJob}`,
      },
      method: 'GET',
    }

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.job_details
      //   const updatedSkills = data.job_details.skills.map(item => (
      //     <p>{item.name}</p>
      //   ))
      this.setState({list: updatedData, apiStatus: apiStatusConstants.success})
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="job-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-pic"
      />
      <h1 className="job-heading-1">Oops! Something Went Wrong</h1>
      <p className="job-subheading">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="bon"
        onClick={() => this.getJobDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="job-container" testId="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {list} = this.state
    return <JobDetails job={list} />
  }

  renderProductItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-container">
        <Header />
        {this.renderProductItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
