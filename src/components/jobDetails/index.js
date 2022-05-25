import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobDetails = props => {
  const {job} = props
  const {
    company_logo_url: companyLogoUrl,
    company_website_url: companyWebsiteUrl,
    employment_type: employmentType,
    job_description: jobDescription,
    location,
    rating,
    package_per_annum: packagePerAnnum,
    title,
  } = job

  return (
    <div className="details">
      <div className="job-223">
        <div className="job-1">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="icon"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="star" />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-44">
          <div className="job-33">
            <p className="job-title">
              <ImLocation />
              {location}
            </p>
            <p className="job-title">
              {' '}
              <BsBriefcase /> {employmentType}
            </p>
          </div>
          <p className="job-title">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="job-item-details">
          <h1 className="job-title">Description</h1>
          <a className="job-title" href={companyWebsiteUrl}>
            Visit
          </a>
        </div>

        <p className="job-rating">{jobDescription}</p>
        <h1 className="job-title">Skills</h1>
        <h1 className="job-title">Life at Company</h1>
        <h1 className="job-title">Similar Jobs</h1>
        <h1 className="job-title">Description</h1>
        <h1 className="job-title">Description</h1>
        <h1 className="job-title">Description</h1>
        <h1 className="job-title">Description</h1>
      </div>
    </div>
  )
}

export default JobDetails
