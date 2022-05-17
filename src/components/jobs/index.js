import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../header'
import JobProps from '../jobProps'
import Pro from '../pro'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobList: [], searchInput: ''}

  componentDidMount() {
    this.getJobsList()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

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
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-pic"
    />
  )

  renderLoaderView = () => (
    <div className="job-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {searchInput, jobList} = this.state
    const searchResult = jobList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="job-container">
        <Header />
        <div className="main">
          <div className="main-1">
            <Pro />
            <hr className="line" />
            <h1 className="job-title">Type of Employment</h1>
            <input type="checkbox" id="full time" value="label" />
            <label htmlFor="full time" className="job-rating" value="label">
              Full Time
            </label>
            <input type="checkbox" id="part time" value="label" />
            <label htmlFor="full time" className="job-rating">
              Part Time
            </label>
            <input type="checkbox" id="Freelance" value="label" />
            <label htmlFor="full time" className="job-rating">
              Freelance
            </label>
            <input type="checkbox" id="internship" value="label" />
            <label htmlFor="full time" className="job-rating">
              Internship
            </label>
            <hr className="line" />
            <h1 className="job-title">Salary Range</h1>
            <input type="radio" id="10LPA" value="label" />
            <label htmlFor="10LPA" className="job-rating">
              10LPA and above
            </label>
            <input type="radio" id="20LPA" value="label" />
            <label htmlFor="20LPA" className="job-rating">
              20LPA and above
            </label>
            <input type="radio" id="30LPA" value="label" />
            <label htmlFor="30LPA" className="job-rating">
              30LPA and above
            </label>
            <input type="radio" id="40LPA" value="label" />
            <label htmlFor="40LPA" className="job-rating">
              40LPA and above
            </label>
          </div>
          <div>
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeInput}
              placeholder="Search"
              className="search-1"
            />
            <div>
              <ul>
                {searchResult.map(item => (
                  <JobProps Key={item.id} jobDetails={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
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
}

export default Jobs
