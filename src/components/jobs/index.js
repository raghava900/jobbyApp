import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../header'
import Pro from '../pro'
import JobProps from '../jobProps'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial[0],
    jobList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtTokenJob = Cookies.get('jwt_token')
    const jobsApiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtTokenJob}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
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
      <button type="button" className="bon" onClick={() => this.getJobsList()}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="job-container" testId="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {searchInput, jobList} = this.state
    const searchResult = jobList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const noJobs = searchResult.length > 0

    return noJobs ? (
      <div className="job-container">
        <ul>
          {searchResult.map(item => (
            <JobProps key={item.id} jobDetails={item} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-pic"
        />
        <h1 className="job-heading-1">No Jobs Found</h1>
        <p className="job-subheading">
          We could not find any jobs. Try other filters
        </p>
        <button
          type="button"
          className="bon"
          onClick={() => this.getJobsList()}
        >
          Retry
        </button>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, jobList} = this.state
    const searchResult = jobList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="job-container">
        <Header />
        <div className="jobs-main">
          <div className="main-1">
            <Pro />
            <hr className="line" />
            <ul>
              <li>
                <h1 className="job-title">Type of Employment</h1>
                <input type="checkbox" id="full time" value="checkbox1" />
                <label htmlFor="full time" className="job-rating">
                  Full Time
                </label>
              </li>
              <li>
                <input type="checkbox" id="part time" value="checkbox2" />
                <label htmlFor="part time" className="job-rating">
                  Part Time
                </label>
              </li>
              <li>
                <input type="checkbox" id="Freelance" value="checkbox3" />
                <label htmlFor="Freelance" className="job-rating">
                  Freelance
                </label>
              </li>
              <li>
                <input type="checkbox" id="internship" value="checkbox4" />
                <label htmlFor="internship" className="job-rating">
                  Internship
                </label>
              </li>
            </ul>
            <hr className="line" />
            <ul>
              <h1 className="job-title">Salary Range</h1>
              <li>
                <input
                  type="radio"
                  id="10LPA"
                  name="salary"
                  value="package10"
                />
                <label htmlFor="10LPA" className="job-rating">
                  10LPA and above
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="20LPA"
                  name="salary"
                  value="package20"
                />
                <label htmlFor="20LPA" className="job-rating">
                  20LPA and above
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="30LPA"
                  name="salary"
                  value="package30"
                />
                <label htmlFor="30LPA" className="job-rating">
                  30LPA and above
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="40LPA"
                  name="salary"
                  value="package40"
                />
                <label htmlFor="40LPA" className="job-rating">
                  40LPA and above
                </label>
              </li>
            </ul>
          </div>
          <div className="employment">
            <input
              type="search"
              placeholder="search"
              onChange={this.onChangeInput}
              className="search-icon"
            />
            <ul>
              {searchResult.map(item => (
                <JobProps key={item.id} jobDetails={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
