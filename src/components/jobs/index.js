import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../header'
import Pro from '../pro'
import JobProps from '../jobProps'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

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
    radioInput: '',
    checkboxInputs: [],
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
    const {checkboxInputs, radioInput, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
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

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsList)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsList,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({
          checkboxInputs: filteredData,
        }),
        this.onGetJobDetails,
      )
    }
  }

  onSubmitSearchInput = () => {
    this.getJobsList()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
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
      <div>
        <ul>
          {searchResult.map(item => (
            <JobProps key={item.id} jobDetails={item} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
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

  onGetCheckBoxesView = () => (
    <ul className="check-boxes-container">
      {employmentTypesList.map(eachItem => (
        <li key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="job-rating" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonsView = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.salaryRangeId}>
          <input
            className="radio"
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label className="job-rating" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

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
    const {searchInput} = this.state
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
                {this.onGetCheckBoxesView()}
              </li>
            </ul>
            <hr className="line" />
            <ul>
              <h1 className="job-title">Salary Range</h1>
              {this.onGetRadioButtonsView()}
            </ul>
          </div>
          <div className="employment">
            <div className="search-input">
              <input
                type="search"
                value={searchInput}
                placeholder="search"
                onChange={this.onChangeInput}
                onKeyDown={this.onEnterSearchInput}
                className="search-bar"
              />
              <button
                type="button"
                testid="searchButton"
                className="bro"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.renderProductDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
